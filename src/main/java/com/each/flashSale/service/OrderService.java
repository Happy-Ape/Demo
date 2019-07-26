package com.each.flashSale.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.each.flashSale.dao.OrderDao;
import com.each.flashSale.pojo.MiaoshaOrder;
import com.each.flashSale.pojo.MiaoshaUser;
import com.each.flashSale.pojo.OrderInfo;
import com.each.flashSale.redis.GoodsKey;
import com.each.flashSale.redis.OrderKey;
import com.each.flashSale.redis.RedisService;
import com.each.flashSale.vo.GoodsVo;

@Service
public class OrderService {

	@Autowired
	OrderDao orderDao;

	@Autowired
	RedisService redisService;

	// 通过userid和goodsid查询订单，判断某人是都已经秒杀过某商品，做不能重复秒杀功能
	public MiaoshaOrder getSeckillOrderByUserIdGoodsId(long userId, long goodsId) {
		// 从redis取秒杀订单缓存
		return redisService.get(OrderKey.getMiaoshaOrderByUidGid, "" + userId + "_" + goodsId, MiaoshaOrder.class);

	}

	// 同一个事务，在order_info表和miaosha_order表中必须同时插入数据成功，否则回滚
	@Transactional
	public OrderInfo createOrder(MiaoshaUser user, GoodsVo goods) {
		OrderInfo orderInfo = new OrderInfo();
		orderInfo.setCreateDate(new Date());
		orderInfo.setDeliveryAddrId(111111L);
		orderInfo.setGoodsCount(1);
		orderInfo.setGoodsId(goods.getId());
		orderInfo.setGoodsName(goods.getGoodsName());
		orderInfo.setGoodsPrice(goods.getMiaoshaPrice());
		orderInfo.setOrderChannel(1);
		orderInfo.setStatus(0);
		orderInfo.setUserId(user.getId());
		orderDao.insert(orderInfo);
		MiaoshaOrder miaoshaOrder = new MiaoshaOrder();
		miaoshaOrder.setGoodsId(goods.getId());
		miaoshaOrder.setOrderId(orderInfo.getId());
		miaoshaOrder.setUserId(user.getId());
		orderDao.insertMiaoshaOrder(miaoshaOrder);
		redisService.set(OrderKey.getMiaoshaOrderByUidGid, "" + user.getId() + "_" + goods.getId(), miaoshaOrder);
		return orderInfo;

	}

	// 根据id查询订单
	public OrderInfo getOrderById(long orderId) {
		return orderDao.getOrderById(orderId);
	}

}
