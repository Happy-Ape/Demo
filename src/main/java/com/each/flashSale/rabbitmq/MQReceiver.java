package com.each.flashSale.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.each.flashSale.pojo.MiaoshaOrder;
import com.each.flashSale.pojo.MiaoshaUser;
import com.each.flashSale.pojo.OrderInfo;
import com.each.flashSale.redis.RedisService;
import com.each.flashSale.service.GoodsService;
import com.each.flashSale.service.MiaoshaService;
import com.each.flashSale.service.OrderService;
import com.each.flashSale.vo.GoodsVo;

@Service
public class MQReceiver {
	// 日志
	private static Logger log = LoggerFactory.getLogger(MQReceiver.class);

	@Autowired
	RedisService redisService;

	@Autowired
	GoodsService goodsService;

	@Autowired
	OrderService orderService;
	@Autowired
	MiaoshaService miaoshaService;

	// 监听RabbitMq
	@RabbitListener(queues = MQConfig.MIAOSHA_QUEUE)
	public void receive(String message) {
		log.info("receive message:" + message);// 打印日志结果
		MiaoshaMessage miaoshaMessage = RedisService.stringToBean(message, MiaoshaMessage.class);// 将string转成bean
		MiaoshaUser user = miaoshaMessage.getUser();// 得到user
		long goodsId = miaoshaMessage.getGoodsId();// 得到商品id

		// 判断商品库存
		GoodsVo goods = goodsService.getGoodsVoByGoodsId(goodsId);
		int stock = goods.getStockCount();
		// 如果库存（stock）空了，就秒杀失败
		if (stock <= 0) {
			return;
		}
		// 判断是否已经秒杀过了
		MiaoshaOrder order = orderService.getSeckillOrderByUserIdGoodsId(user.getId(), goodsId);
		if (order != null) {
			return;
		}
		// 减库存 下订单 写入秒杀订单
		OrderInfo orderInfo = miaoshaService.seckill(user, goods);
	}
}
