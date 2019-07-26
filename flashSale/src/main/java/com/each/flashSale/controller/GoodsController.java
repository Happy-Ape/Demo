package com.each.flashSale.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

import com.each.flashSale.pojo.MiaoshaUser;
import com.each.flashSale.redis.GoodsKey;
import com.each.flashSale.redis.RedisService;
import com.each.flashSale.result.Result;
import com.each.flashSale.service.GoodsService;
import com.each.flashSale.service.MiaoshaUserService;
import com.each.flashSale.vo.GoodsDetailVo;
import com.each.flashSale.vo.GoodsVo;

@Controller
@RequestMapping("/goods")
public class GoodsController {

	@Autowired
	GoodsService goodsService;

	@Autowired
	MiaoshaUserService userService;

	@Autowired
	RedisService redisService;

	@Autowired
	ThymeleafViewResolver thymeleafViewResolver;

	@Autowired
	ApplicationContext applicationContext;

	/*
	 * QPS:781 5000*10 加了页面缓存Qps：1266
	 */
	// 加页面缓存
	@RequestMapping(value = "/to_list", produces = "text/html")
	@ResponseBody
	public String list(HttpServletRequest request, HttpServletResponse response, Model model, MiaoshaUser user) {
		model.addAttribute("user", user);
		// 从redis取商品列表页面缓存
		String html = redisService.get(GoodsKey.getGoodsList, "", String.class);
		// 如果不为空，就返回页面
		if (!StringUtils.isEmpty(html)) {
			return html;
		}
		// 查询商品列表
		List<GoodsVo> goods = goodsService.listGoodsVo();
		model.addAttribute("goodsList", goods);
		// return "goods_list";
		// 手动渲染页面，并存入redis缓存
		WebContext ctx = new WebContext(request, response, request.getServletContext(), request.getLocale(),
				model.asMap());
		html = thymeleafViewResolver.getTemplateEngine().process("goods_list", ctx);
		// 如果html不为空，就放入缓存，再返回html界面
		if (!StringUtils.isEmpty(html)) {
			redisService.set(GoodsKey.getGoodsList, "", html);
		}
		return html;
	}
/*
	// 加URL缓存
	@RequestMapping(value = "/to_detail/gid={goodsId}", produces = "text/html")
	@ResponseBody
	public String to_detail(HttpServletRequest request, HttpServletResponse response, Model model, MiaoshaUser user,
			@PathVariable("goodsId") long goodsId) {
		model.addAttribute("user", user);
		// 取缓存，需要存在商品id，因为不同商品有不同的页面
		String html = redisService.get(GoodsKey.getGoodsDetail, "" + goodsId, String.class);
		// 如果不为空，就返回页面
		if (!StringUtils.isEmpty(html)) {
			return html;
		}
		// 根据商品id查询商品信息
		GoodsVo goods = goodsService.getGoodsVoByGoodsId(goodsId);
		model.addAttribute("goods", goods);
		long startAt = goods.getStartDate().getTime();// 秒杀开始时间
		long endAt = goods.getEndDate().getTime();// 秒杀结束时间
		long now = System.currentTimeMillis();// 现在的时间
		int miaoshaStatus = 0; // 秒杀状态：0还没开始，1正在进行，2已经结束
		int remainSeconds = 0; // 距离秒杀开始还有多少秒，0代表开始了，就是秒杀正在进行，-1代表已经结束
		if (now < startAt) {// 秒杀还没开始，倒计时
			miaoshaStatus = 0;
			remainSeconds = (int) ((startAt - now) / 1000);
		} else if (now > endAt) {// 秒杀已经结束
			miaoshaStatus = 2;
			remainSeconds = -1;
		} else {// 秒杀进行中
			miaoshaStatus = 1;
			remainSeconds = 0;
		}
		model.addAttribute("miaoshaStatus", miaoshaStatus);
		model.addAttribute("remainSeconds", remainSeconds);
		// return "goods_detail";
		// 手动渲染页面，并存入redis缓存
		WebContext ctx = new WebContext(request, response, request.getServletContext(), request.getLocale(),
				model.asMap());
		html = thymeleafViewResolver.getTemplateEngine().process("goods_detail", ctx);
		// 如果html不为空，就放入缓存，再返回html界面
		if (!StringUtils.isEmpty(html)) {
			redisService.set(GoodsKey.getGoodsDetail, "" + goodsId, html);
		}
		return html;
	}
*/
	@RequestMapping(value = "/detail/gid={goodsId}")
	@ResponseBody
	public Result<GoodsDetailVo> detail(HttpServletRequest request, HttpServletResponse response, Model model,
			MiaoshaUser user, @PathVariable("goodsId") long goodsId) {
		// 根据商品id查询商品信息
		GoodsVo goods = goodsService.getGoodsVoByGoodsId(goodsId);
		long startAt = goods.getStartDate().getTime();// 秒杀开始时间
		long endAt = goods.getEndDate().getTime();// 秒杀结束时间
		long now = System.currentTimeMillis();// 现在的时间
		int miaoshaStatus = 0; // 秒杀状态：0还没开始，1正在进行，2已经结束
		int remainSeconds = 0; // 距离秒杀开始还有多少秒，0代表开始了，就是秒杀正在进行，-1代表已经结束
		if (now < startAt) {// 秒杀还没开始，倒计时
			miaoshaStatus = 0;
			remainSeconds = (int) ((startAt - now) / 1000);
		} else if (now > endAt) {// 秒杀已经结束
			miaoshaStatus = 2;
			remainSeconds = -1;
		} else {// 秒杀进行中
			miaoshaStatus = 1;
			remainSeconds = 0;
		}
		// 辅助类，用于返回这个数据
		GoodsDetailVo vo = new GoodsDetailVo();
		vo.setGoods(goods);
		vo.setUser(user);
		vo.setRemainSeconds(remainSeconds);
		vo.setMiaoshaStatus(miaoshaStatus);
		return Result.success(vo);
	}
}
