package com.each.flashSale.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.each.flashSale.dao.MiaoshaUserDao;
import com.each.flashSale.exception.GlobalException;
import com.each.flashSale.pojo.MiaoshaUser;
import com.each.flashSale.redis.MiaoshaUserKey;
import com.each.flashSale.redis.RedisService;
import com.each.flashSale.result.CodeMsg;
import com.each.flashSale.utils.MD5Util;
import com.each.flashSale.utils.UUIDUtil;
import com.each.flashSale.vo.LoginVo;

@Service
public class MiaoshaUserService {

	public static final String COOKI_NAME_TOKEN = "token";

	@Autowired
	MiaoshaUserDao miaoshaUserDao;

	@Autowired
	RedisService redisService;

	// 根据id查出结果,此处加对象缓存，下次登录就直接从缓存中取，不用再查数据库
	/*
	 * 对于对象级缓存，如果这里对user的密码进行了修改，我们也要去处理与这个对象有关的所有缓存，这里就是token和getbyid两个缓存，
	 * 一般的办法是删除掉对应的缓存，比如我们可以写方法直接删除getbyid缓存，下次的时候会自动重新写入，对于token，有关到user的登录，
	 * 我们只有去修改token缓存，将token缓存中的user替换掉，而不改变token（cookie）值
	 */
	public MiaoshaUser getById(long id) {
		// 取缓存
		MiaoshaUser user = redisService.get(MiaoshaUserKey.getById, "" + id, MiaoshaUser.class);
		// 如果有，就直接取出
		if (user != null) {
			return user;
		}
		// 否则从数据库中查
		user = miaoshaUserDao.getById(id);
		if (user != null) {
			redisService.set(MiaoshaUserKey.getById, "" + id, user);
		}
		return user;
	}

	// 从redis上得到token
	public MiaoshaUser getByToken(HttpServletResponse response, String token) {
		if (StringUtils.isEmpty(token)) {
			return null;
		}
		MiaoshaUser user = redisService.get(MiaoshaUserKey.token, token, MiaoshaUser.class);
		// 延长有效期，就是重新设置cookie，因为key一样，所以会覆盖之前的
		if (user != null) {
			addCookie(response, token, user);
		}
		return user;
	}

	// 登录实现
	public String login(HttpServletResponse response, LoginVo loginVo) {
		if (loginVo == null) { // 如果登录的手机号和密码为空的，就是没有传过来，就返回服务器异常
			throw new GlobalException(CodeMsg.SERVER_ERROR);
		}
		String mobile = loginVo.getMobile();
		String formPass = loginVo.getPassword();
		// 根据手机号查询数据库
		MiaoshaUser user = getById(Long.parseLong(mobile));
		// 判断手机号是否存在
		if (user == null) {
			throw new GlobalException(CodeMsg.MOBILE_NOT_EXIST);
		}
		// 验证密码，加盐
		String dbPass = user.getPassword();
		String saltDB = user.getSalt();
		String calcPass = MD5Util.formPassToDBPass(formPass, saltDB);
		if (!calcPass.equals(dbPass)) {
			throw new GlobalException(CodeMsg.PASSWORD_ERROR);
		}
		// 生成cookie
		String token = UUIDUtil.uuid();
		addCookie(response, token, user);
		return token;
	}

	// 生成cookie
	private void addCookie(HttpServletResponse response, String token, MiaoshaUser user) {
		redisService.set(MiaoshaUserKey.token, token, user); // 放进redis
		Cookie cookie = new Cookie(COOKI_NAME_TOKEN, token);
		cookie.setMaxAge(MiaoshaUserKey.token.expireSeconds());// 设置失效时间
		cookie.setPath("/");
		response.addCookie(cookie); // 加到response中
	}

}
