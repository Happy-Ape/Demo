package com.each.flashSale.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
/*
 * 生成jedisPool，注入到容器中
 */
@Service
public class RedisPoolFactory {
	@Autowired
	RedisConfig redisConfig;

	@Bean
	public JedisPool JedisPoolFactory() {
		JedisPoolConfig config = new JedisPoolConfig();
		config.setMaxIdle(redisConfig.getPoolMaxIdle());
		config.setMaxTotal(redisConfig.getPoolMaxTotal());
		config.setMaxWaitMillis(redisConfig.getPoolMaxWait() * 1000);
		JedisPool jp = new JedisPool(config, redisConfig.getHost(), redisConfig.getPort(),
				redisConfig.getTimeout() * 1000, redisConfig.getPassword(), 0);
		return jp;
	}
}
