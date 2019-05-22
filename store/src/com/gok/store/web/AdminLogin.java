package com.gok.store.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.gok.store.dao.AdminDao;
import com.gok.store.pojo.Admin;

/**
 * Servlet implementation class AdminLogin
 */
@WebServlet("/AdminLogin")
public class AdminLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
	AdminDao dao = new AdminDao();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AdminLogin() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String username = request.getParameter("username");
		HttpSession session = request.getSession();
		String pass = request.getParameter("password");
		int i = dao.getUser(username, pass);
		if (i > 0) {
			Admin admin = dao.getAllMessage(username);
			session.setAttribute("admin", admin);
			session.setAttribute("login", 1);
			Cookie cookie = new Cookie("id", String.valueOf(admin.getId()));
			cookie.setMaxAge(60 * 60 * 24 * 365);
			response.addCookie(cookie);
		} else {
			session.setAttribute("login", 0);
		}
		response.getWriter().print(session.getAttribute("login"));
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
