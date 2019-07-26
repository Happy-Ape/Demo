package com.each.flashSale.rabbitmq;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MQConfig {
	public static final String MIAOSHA_QUEUE = "seckill_queue";

	/**
	 * Direct模式 交换机Exchange,返回bean对象
	 */
	@Bean
	public Queue queue() {
		return new Queue(MIAOSHA_QUEUE, true);
	}

}
