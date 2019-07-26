package com.each.flashSale.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
/*
 * 正则表达式校验手机号格式
 */
public class ValidatorUtil {

	private static final Pattern mobile_pattern = Pattern.compile("1\\d{10}");

	public static boolean isMobile(String src) {
		if (StringUtils.isEmpty(src)) {
			return false;
		}
		Matcher m = mobile_pattern.matcher(src);
		return m.matches();
	}
}
