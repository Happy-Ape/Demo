package com.each.flashSale.controller;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.each.flashSale.rabbitmq.MQSender;
import com.each.flashSale.result.Result;
import com.each.flashSale.service.MiaoshaUserService;
import com.each.flashSale.vo.LoginVo;

/*
 * 登录
 */
@Controller
@RequestMapping("/login")
public class LoginController {

	private static Logger log = LoggerFactory.getLogger(LoginController.class);
	@Autowired
	MiaoshaUserService userService;
	@Autowired
	MQSender sender;

	@RequestMapping("/to_login")
	public String toLogin() {
		return "login";
	}

	@RequestMapping("/do_login")
	@ResponseBody
	public Result<String> doLogin(HttpServletResponse response, LoginVo loginVo) {
		// 输出日志
		log.info(loginVo.toString());
		// 登录
		String token = userService.login(response, loginVo);
		return Result.success(token);
	}
}