package com.each.flashSale.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.each.flashSale.redis.RedisService;

@Service
public class MQSender {

	@Autowired
	AmqpTemplate amqpTemplate;
	// 日志
	private static Logger log = LoggerFactory.getLogger(MQSender.class);

	// 发送消息
	public void sendMiaoshaMessage(MiaoshaMessage message) {
		// 将对象转成string，这里就直接用我们在redisService里写的方法
		String msg = RedisService.beanToString(message);
		// 打印日志
		log.info("send message:" + msg);
		// 绑定队列，发送消息
		amqpTemplate.convertAndSend(MQConfig.MIAOSHA_QUEUE, msg);
	}

}
