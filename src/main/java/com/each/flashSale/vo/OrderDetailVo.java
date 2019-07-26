package com.each.flashSale.vo;

import com.each.flashSale.pojo.OrderInfo;

/*
 * 订单详情数据类
 */
public class OrderDetailVo {
	private GoodsVo goods;
	private OrderInfo order;

	public GoodsVo getGoods() {
		return goods;
	}

	public void setGoods(GoodsVo goods) {
		this.goods = goods;
	}

	public OrderInfo getOrder() {
		return order;
	}

	public void setOrder(OrderInfo order) {
		this.order = order;
	}
}
