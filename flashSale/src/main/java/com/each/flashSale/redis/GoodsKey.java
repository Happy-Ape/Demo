package com.each.flashSale.redis;

public class GoodsKey extends BasePrefix {

	private GoodsKey(int expireSeconds, String prefix) {
		super(expireSeconds, prefix);
	}

	public static GoodsKey getGoodsList = new GoodsKey(60, "gl"); // 商品列表缓存到redis
	public static GoodsKey getGoodsDetail = new GoodsKey(60, "gd");// 商品详情缓存到redis
	public static GoodsKey getMiaoshaGoodsStock = new GoodsKey(0, "gs");// 商品库存缓存到redis
}
