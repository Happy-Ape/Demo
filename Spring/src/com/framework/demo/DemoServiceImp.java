package com.framework.demo;

import framework.annotation.Service;

@Service
public class DemoServiceImp implements IDemoService {

	@Override
	public String get(String name) {
		String res="my name is " + name;
		return res;
	}


}
