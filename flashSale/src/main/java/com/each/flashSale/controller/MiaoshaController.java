package com.each.flashSale.controller;

import java.awt.image.BufferedImage;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.each.flashSale.access.AccessLimit;
import com.each.flashSale.pojo.MiaoshaOrder;
import com.each.flashSale.pojo.MiaoshaUser;
import com.each.flashSale.rabbitmq.MQSender;
import com.each.flashSale.rabbitmq.MiaoshaMessage;
import com.each.flashSale.redis.GoodsKey;
import com.each.flashSale.redis.MiaoshaKey;
import com.each.flashSale.redis.OrderKey;
import com.each.flashSale.redis.RedisService;
import com.each.flashSale.result.CodeMsg;
import com.each.flashSale.result.Result;
import com.each.flashSale.service.GoodsService;
import com.each.flashSale.service.MiaoshaService;
import com.each.flashSale.service.MiaoshaUserService;
import com.each.flashSale.service.OrderService;
import com.each.flashSale.vo.GoodsVo;

@Controller
@RequestMapping("/seckill")
public class MiaoshaController implements InitializingBean {

	@Autowired
	MiaoshaUserService userService;

	@Autowired
	RedisService redisService;

	@Autowired
	GoodsService goodsService;

	@Autowired
	OrderService orderService;

	@Autowired
	MiaoshaService miaoshaService;

	@Autowired
	MQSender sender;
	// 标记是否售罄的map,key为商品id,value为是否售罄，true代表已秒杀完毕，false代表没有
	private Map<Long, Boolean> localOverMap = new HashMap<Long, Boolean>();

	/**
	 * 系统初始化
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		// 获得所有商品
		List<GoodsVo> goodsList = goodsService.listGoodsVo();
		// 如果为空，就直接返回
		if (goodsList == null) {
			return;
		}
		// 遍历商品，将库存放入redis
		for (GoodsVo goods : goodsList) {
			redisService.set(GoodsKey.getMiaoshaGoodsStock, "" + goods.getId(), goods.getStockCount());
			// 遍历商品的时候，就标记存入map中，初始肯定没有秒杀完毕，为false
			localOverMap.put(goods.getId(), false);

		}
	}

	/*
	 * 隐藏秒杀接口地址，添加path，判断数学公式结果,接口防刷（定义通用的注解）
	 */
	@AccessLimit(seconds = 5, maxCount = 5, needLogin = true)
	@RequestMapping(value = "/path", method = RequestMethod.GET)
	@ResponseBody
	public Result<String> getMiaoshaPath(HttpServletRequest request, MiaoshaUser user,
			@RequestParam("goodsId") long goodsId,
			@RequestParam(value = "verifyCode", defaultValue = "0") int verifyCode) {
		// 如果未登录
		if (user == null) {
			return Result.error(CodeMsg.NO_LOGIN);
		}
		// 判断数学公式结果
		boolean check = miaoshaService.checkVerifyCode(user, goodsId, verifyCode);
		// 验证失败时
		if (!check) {
			return Result.error(CodeMsg.CALE_ERROR);
		}
		// 得到path
		String path = miaoshaService.createMiaoshaPath(user, goodsId);
		return Result.success(path);
	}

	/*
	 * 秒杀实现
	 */
	@RequestMapping(value = "/{path}/do_seckill", method = RequestMethod.POST)
	@ResponseBody
	public Result<Integer> seckill(Model model, MiaoshaUser user, @RequestParam("goodsId") long goodsId,
			@PathVariable("path") String path) {
		model.addAttribute("user", user);
		// 判断是否登录
		if (user == null) {
			return Result.error(CodeMsg.NO_LOGIN);
		}
		// 验证path
		boolean check = miaoshaService.checkPath(user, goodsId, path);
		if (!check) {
			return Result.error(CodeMsg.REQUEST_ILLEGAL);
		}
		// 内存标记，减少redis访问，根据商品id取得标志，
		boolean over = localOverMap.get(goodsId);
		if (over) {// 如果为true，直接返回秒杀完毕的信息
			return Result.error(CodeMsg.SECKILL_OVER);
		}
		// 预减库存
		long stock = redisService.decr(GoodsKey.getMiaoshaGoodsStock, "" + goodsId);
		if (stock < 0) {
			// 如果库存预减到小于0的时候，就修改该商品的标志位true，代表已经秒杀完毕
			localOverMap.put(goodsId, true);
			return Result.error(CodeMsg.SECKILL_OVER);
		}
		// 判断是否已经秒杀过了
		MiaoshaOrder order = orderService.getSeckillOrderByUserIdGoodsId(user.getId(), goodsId);
		if (order != null) {
			return Result.error(CodeMsg.REPEATE_SECKILL);
		}
		// 入队Rabbitmq
		MiaoshaMessage miaoshaMessage = new MiaoshaMessage();
		miaoshaMessage.setUser(user);
		miaoshaMessage.setGoodsId(goodsId);
		sender.sendMiaoshaMessage(miaoshaMessage);
		return Result.success(0); // 0代表排队中
	}

	/*
	 * 返回orderId代表成功，返回-1代表秒杀失败，返回0代表正在排队。
	 */
	@RequestMapping(value = "/result", method = RequestMethod.GET)
	@ResponseBody
	public Result<Long> miaoshaResult(Model model, MiaoshaUser user, @RequestParam("goodsId") long goodsId) {
		model.addAttribute("user", user);
		// 如果未登录
		if (user == null) {
			return Result.error(CodeMsg.NO_LOGIN);
		}
		// 返回秒杀结果
		long result = miaoshaService.getMiaoshaResult(user.getId(), goodsId);
		return Result.success(result);
	}

	/*
	 * 验证公式
	 */
	@RequestMapping(value = "/verifyCode", method = RequestMethod.GET)
	@ResponseBody
	public Result<String> getSeckillVerifyCod(HttpServletResponse response, MiaoshaUser user,
			@RequestParam("goodsId") long goodsId) {
		// 如果未登录
		if (user == null) {
			return Result.error(CodeMsg.NO_LOGIN);
		}
		try {
			// 产生验证码
			BufferedImage image = miaoshaService.createVerifyCode(user, goodsId);
			OutputStream out = response.getOutputStream();
			ImageIO.write(image, "JPEG", out);
			out.flush();
			out.close();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			// 如果异常，返回秒杀失败
			return Result.error(CodeMsg.SECKILL_FAIL);
		}
	}
}
