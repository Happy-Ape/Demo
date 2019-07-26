package com.framework.demo;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.annotation.Autowired;
import framework.annotation.Controller;
import framework.annotation.RequestMapping;
import framework.annotation.RequestParam;

@Controller
@RequestMapping("/demo")
public class DemoAction {
	@Autowired
	private IDemoService demoService;

	@RequestMapping("/query.do")
	public void query(HttpServletRequest req, HttpServletResponse resp, @RequestParam("name") String name) {
		String res = demoService.get(name);
		try {
			resp.getWriter().write(res);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
