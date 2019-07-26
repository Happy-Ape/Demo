package com.each.flashSale.redis;

public class MiaoshaKey extends BasePrefix {

	private MiaoshaKey(Integer expireSeconds, String prefix) {
		super(expireSeconds, prefix);
	}

	public static MiaoshaKey isGoodsOver = new MiaoshaKey(0, "go");
	public static MiaoshaKey getMiaoshaPath = new MiaoshaKey(60, "mp");
	public static MiaoshaKey getMiaoshaVerifyCode = new MiaoshaKey(300, "mv");
}
