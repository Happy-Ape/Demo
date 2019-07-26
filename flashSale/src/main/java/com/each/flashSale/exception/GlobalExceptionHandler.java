package com.each.flashSale.exception;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.each.flashSale.result.CodeMsg;
import com.each.flashSale.result.Result;

/*
 * 异常处理器
 */
@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {
	@ExceptionHandler(value = Exception.class)
	public Result<String> exceptionHandler(HttpServletRequest request, Exception e) {
		e.printStackTrace();
		// 如果是全局异常，直接返回
		if (e instanceof GlobalException) {
			GlobalException ex = (GlobalException) e;
			return Result.error(ex.getCm());
			// 如果是绑定异常，可能有多个异常抛出，就得到异常，默认取第一个返回
		} else if (e instanceof BindException) {
			BindException ex = (BindException) e;
			List<ObjectError> errors = ex.getAllErrors();
			ObjectError error = errors.get(0);
			String msg = error.getDefaultMessage();// 得到异常的信息
			return Result.error(CodeMsg.BIND_ERROR.fillArgs(msg));
		} else {
			// 否则返回服务器异常
			return Result.error(CodeMsg.SERVER_ERROR);
		}
	}
}
