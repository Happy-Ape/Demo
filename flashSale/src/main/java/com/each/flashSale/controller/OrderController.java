package com.each.flashSale.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.each.flashSale.pojo.MiaoshaUser;
import com.each.flashSale.pojo.OrderInfo;
import com.each.flashSale.redis.RedisService;
import com.each.flashSale.result.CodeMsg;
import com.each.flashSale.result.Result;
import com.each.flashSale.service.GoodsService;
import com.each.flashSale.service.MiaoshaUserService;
import com.each.flashSale.service.OrderService;
import com.each.flashSale.vo.GoodsVo;
import com.each.flashSale.vo.OrderDetailVo;

@Controller
@RequestMapping("/order")
public class OrderController {

	@Autowired
	MiaoshaUserService userService;

	@Autowired
	RedisService redisService;

	@Autowired
	OrderService orderService;

	@Autowired
	GoodsService goodsService;

	@RequestMapping("/detail")
	@ResponseBody
	public Result<OrderDetailVo> info(Model model, MiaoshaUser user, @RequestParam("oid") long orderId) {
		// 判断用户是否登录
		if (user == null) {
			return Result.error(CodeMsg.NO_LOGIN);
		}
		// 根据id查询到订单
		OrderInfo order = orderService.getOrderById(orderId);
		// 如果订单不存在
		if (order == null) {
			return Result.error(CodeMsg.ORDER_NOT_EXIST);
		}
		long goodsId = order.getGoodsId(); // 取得商品id
		GoodsVo goods = goodsService.getGoodsVoByGoodsId(goodsId); // 根据商品id查到商品
		// 辅助类，得到订单信息用于返回
		OrderDetailVo vo = new OrderDetailVo();
		vo.setOrder(order);
		vo.setGoods(goods);
		return Result.success(vo);
	}

}
