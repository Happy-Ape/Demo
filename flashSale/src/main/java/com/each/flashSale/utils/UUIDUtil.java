package com.each.flashSale.utils;

import java.util.UUID;

/*
 * 生成随机数
 */
public class UUIDUtil {
	public static String uuid() {
		return UUID.randomUUID().toString().replace("-", "");
	}
}
