package com.each.flashSale.service;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.Random;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.each.flashSale.pojo.MiaoshaOrder;
import com.each.flashSale.pojo.MiaoshaUser;
import com.each.flashSale.pojo.OrderInfo;
import com.each.flashSale.redis.MiaoshaKey;
import com.each.flashSale.redis.RedisService;
import com.each.flashSale.utils.MD5Util;
import com.each.flashSale.utils.UUIDUtil;
import com.each.flashSale.vo.GoodsVo;

@Service
public class MiaoshaService {

	@Autowired
	GoodsService goodsService;

	@Autowired
	OrderService orderService;

	@Autowired
	RedisService redisService;

	@Transactional
	public OrderInfo seckill(MiaoshaUser user, GoodsVo goods) {
		// 减库存
		boolean success = goodsService.reduceStock(goods);
		// 如果减库存成功
		if (success) {
			// 下订单，创建数据（order_info maiosha_order两张表）
			return orderService.createOrder(user, goods);
		} else {// 否则什么都不做
			return null;
		}
	}

	/*
	 * 返回秒杀结果 orderId：成功 -1：秒杀失败 0： 排队中
	 */
	public long getMiaoshaResult(Long userId, long goodsId) {
		// 查询有没有该订单
		MiaoshaOrder order = orderService.getSeckillOrderByUserIdGoodsId(userId, goodsId);
		if (order != null) {// 秒杀成功
			return order.getOrderId();
		} else {
			boolean isOver = getGoodsOver(goodsId); // 判断是否售罄
			if (isOver) {
				return -1; // 售罄返回-1，秒杀失败
			} else {
				return 0; // 排队中
			}
		}
	}

	/*
	 * 返回是否秒杀完毕，从redis取
	 */
	private boolean getGoodsOver(long goodsId) {
		return redisService.exists(MiaoshaKey.isGoodsOver, "" + goodsId);
	}

	/*
	 * 产生秒杀的path
	 */
	public String createMiaoshaPath(MiaoshaUser user, long goodsId) {
		if (user == null || goodsId <= 0) {
			return null;
		}
		// 生成随机的字符串并加密
		String str = MD5Util.md5(UUIDUtil.uuid() + "seckill");
		// 保存到redis
		redisService.set(MiaoshaKey.getMiaoshaPath, "" + user.getId() + "_" + goodsId, str);
		return str;
	}

	/*
	 * 核对path，与redis中的path字符串核对
	 */
	public boolean checkPath(MiaoshaUser user, long goodsId, String path) {
		if (user == null || path == null) {
			return false;
		}
		String redisPath = redisService.get(MiaoshaKey.getMiaoshaPath, "" + user.getId() + "_" + goodsId, String.class);
		return path.equals(redisPath);
	}

	/*
	 * 产生验证码
	 */
	public BufferedImage createVerifyCode(MiaoshaUser user, long goodsId) {
		if (user == null || goodsId <= 0) {
			return null;
		}
		// 定义高和宽
		int width = 80;
		int height = 32;
		// 产生image
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics g = image.getGraphics();
		// 设置背景颜色
		g.setColor(new Color(0xDCDCDC));
		g.fillRect(0, 0, width, height);
		// 画边界
		g.setColor(Color.black);
		g.drawRect(0, 0, width - 1, height - 1);
		// 创建随机实例以生成代码
		Random rdm = new Random();
		// 加混乱的效果
		for (int i = 0; i < 50; i++) {
			int x = rdm.nextInt(width);
			int y = rdm.nextInt(height);
			g.drawOval(x, y, 0, 0);
		}
		// 生成随机代码
		String verifyCode = generateVerifyCode(rdm);
		g.setColor(new Color(0, 100, 0));
		g.setFont(new Font("Candara", Font.BOLD, 24));
		g.drawString(verifyCode, 8, 24);
		g.dispose();
		// 计算验证公式结果
		int rnd = calc(verifyCode);
		// 把验证码计算结果存到redis中
		redisService.set(MiaoshaKey.getMiaoshaVerifyCode, user.getId() + "," + goodsId, rnd);
		// 输出图片
		return image;
	}

	/*
	 * 计算结果，这里用ScriptEngineManager
	 */
	private static int calc(String exp) {
		try {
			ScriptEngineManager manager = new ScriptEngineManager();
			ScriptEngine engine = manager.getEngineByName("JavaScript");
			return (Integer) engine.eval(exp);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	// 加减乘
	private static char[] ops = new char[] { '+', '-', '*' };

	/**
	 * 随机生成数学公式，格式如1+2-3
	 */
	private String generateVerifyCode(Random rdm) {
		int num1 = rdm.nextInt(10);
		int num2 = rdm.nextInt(10);
		int num3 = rdm.nextInt(10);
		char op1 = ops[rdm.nextInt(3)];
		char op2 = ops[rdm.nextInt(3)];
		String exp = "" + num1 + op1 + num2 + op2 + num3;
		return exp;
	}

	/*
	 * 核对数学公式结果
	 */
	public boolean checkVerifyCode(MiaoshaUser user, long goodsId, int verifyCode) {
		// 如果未登录
		if (user == null || goodsId <= 0) {
			return false;
		}
		// 从redis取得结果
		Integer redisCode = redisService.get(MiaoshaKey.getMiaoshaVerifyCode, user.getId() + "," + goodsId,
				Integer.class);
		// 判断是否为空和是否相等
		if (redisCode == null || redisCode - verifyCode != 0) {
			return false;
		}
		// 把结果又Redis中移除
		redisService.delete(MiaoshaKey.getMiaoshaVerifyCode, user.getId() + "," + goodsId);
		return true;
	}
}
