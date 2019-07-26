package com.each.flashSale.redis;

public interface KeyPrefix {
	public int expireSeconds(); //过期时间，0代表永不过期

	public String getPrefix(); //key的前缀
}
