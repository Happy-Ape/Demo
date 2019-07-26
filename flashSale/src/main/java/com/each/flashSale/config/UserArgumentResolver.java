package com.each.flashSale.config;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.alibaba.druid.sql.visitor.functions.Length;
import com.each.flashSale.pojo.MiaoshaUser;
import com.each.flashSale.service.MiaoshaUserService;

@Service
public class UserArgumentResolver implements HandlerMethodArgumentResolver {

	@Autowired
	MiaoshaUserService userService;

	// 获取参数的类型，看是不是我们的秒杀user（MiaoshaUser），如果不是返回false，是就返回true
	public boolean supportsParameter(MethodParameter parameter) {
		Class<?> clazz = parameter.getParameterType();
		return clazz == MiaoshaUser.class;
	}

	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		// 得到request对象
		HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
		// 得到response对象
		HttpServletResponse response = webRequest.getNativeResponse(HttpServletResponse.class);
		// 从request中取token
		String paramToken = request.getParameter(MiaoshaUserService.COOKI_NAME_TOKEN);
		// 从cookie中取token
		String cookieToken = getCookieValue(request, MiaoshaUserService.COOKI_NAME_TOKEN);
		// 如果都为空，就返回null
		if (StringUtils.isEmpty(cookieToken) && StringUtils.isEmpty(paramToken)) {
			return null;
		}
		// 优先从request中取，如果paramToken为空，再去cookie中取（这是为了兼容手机端，因为有些手机端不会吧token放到cookie中，而是通过参数传）
		String token = StringUtils.isEmpty(paramToken) ? cookieToken : paramToken;
		return userService.getByToken(response, token);
	}

	// 得到cookie的值
	private String getCookieValue(HttpServletRequest request, String cookiName) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null || cookies.length <= 0) {
			return null;
		}
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(cookiName)) {
				return cookie.getValue();
			}
		}
		return null;
	}

}
