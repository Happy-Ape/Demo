package com.each.flashSale.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.util.StringUtils;

import com.each.flashSale.utils.ValidatorUtil;

/*
 * 总的校验登录数据的类
 */
public class IsMobileValidator implements ConstraintValidator<IsMobile, String> {

	private boolean required = false; // 默认格式错误（false）

	public void initialize(IsMobile constraintAnnotation) {
		required = constraintAnnotation.required(); // 初始化时校验数据，正确就把false改成true
	}

	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (required) {
			return ValidatorUtil.isMobile(value); // 格式错误
		} else {
			if (StringUtils.isEmpty(value)) { // 手机号为空
				return true;
			} else {
				return ValidatorUtil.isMobile(value);
			}
		}
	}

}
