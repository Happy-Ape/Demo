package com.each.flashSale.redis;

public abstract class BasePrefix implements KeyPrefix {
	private int expireSeconds;
	private String prefix;

	// 构造方法，默认永不过期
	public BasePrefix(String prefix) {
		this(0, prefix);
	}

	// 构造方法，可以自行设置过期时间
	public BasePrefix(int expireSenconds, String prefix) {
		super();
		this.expireSeconds = expireSenconds;
		this.prefix = prefix;
	}

	// 默认0代表永不过期
	public int expireSeconds() {
		return expireSeconds;
	}

	//生成key的前缀，由class名+指定的prefix构成
	public String getPrefix() {
		String className = getClass().getSimpleName();
		return className + ":" + prefix;
	}

}
