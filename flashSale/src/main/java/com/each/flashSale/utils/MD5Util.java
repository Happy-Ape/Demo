package com.each.flashSale.utils;

import org.apache.commons.codec.digest.DigestUtils;

public class MD5Util {
	private static final String salt = "a2c4e5b1d4"; // 自定义的盐

	public static String md5(String str) { // md5
		return DigestUtils.md5Hex(str);
	}

	public static String inputPassToFormPass(String inputPass) { // 第一次加盐，输入到后台
		String string = "" + salt.charAt(0) + salt.charAt(2) + salt.charAt(5) + inputPass + salt.charAt(3)
				+ salt.charAt(4) + salt.charAt(1);
		return md5(string);
	}

	public static String formPassToDBPass(String formPass, String salt) { // 第二次加盐，后台到数据库
		String string = "" + salt.charAt(0) + salt.charAt(2) + salt.charAt(5) + formPass + salt.charAt(3)
				+ salt.charAt(4) + salt.charAt(1);
		return md5(string);
	}

	public static String inputPassToDBPass(String inputPass, String dbSalt) { // 整合两次md5加盐
		String fromPass = inputPassToFormPass(inputPass);
		String dbPass = formPassToDBPass(fromPass, dbSalt);
		return dbPass;
	}
}
