package com.each.flashSale.redis;

public class MiaoshaUserKey extends BasePrefix {

	public static final int TOKEN_EXPIRE = 3600 * 24 * 2; // 默认cookie在redis中保存两天（过期时间）

	private MiaoshaUserKey(int expireSeconds, String prefix) {
		super(expireSeconds, prefix);
	}

	public static MiaoshaUserKey token = new MiaoshaUserKey(TOKEN_EXPIRE, "tk");// prefix=tk
	public static MiaoshaUserKey getById = new MiaoshaUserKey(0, "id");// prefix=id
}
