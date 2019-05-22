package com.gok.store.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;
import com.gok.store.dao.AdminDao;
import com.gok.store.pojo.Admin;

/**
 * Servlet implementation class GetAdminMessageWeb
 */
@WebServlet("/AdminWeb")
public class AdminWeb extends HttpServlet {
	private static final long serialVersionUID = 1L;
	AdminDao dao = new AdminDao();
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AdminWeb() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String m = request.getParameter("m");
		if ("list".equals(m)) {
			String id = request.getParameter("id");
			HttpSession session = request.getSession();
			Admin admin=dao.getUserMessage(id);
			List <String>list=new ArrayList<>();
			list.add(String.valueOf(admin.getId()));
			list.add(admin.getName());
			list.add(admin.getUsername());
			list.add(admin.getPassword());
			response.setContentType("application/json;charset=utf-8");
			response.getWriter().print(JSON.toJSONString(list));
		} else if ("change".equals(m)) {
			HttpSession session = request.getSession();
			//session.setAttribute("login", 0);
			response.sendRedirect("http://localhost:8080/store/page/login.html");
		} else if ("exit".equals(m)) {
			HttpSession session = request.getSession();
			session.removeAttribute("login");
			session.removeAttribute("admin");
			response.sendRedirect("http://localhost:8080/store/page/login.html");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
