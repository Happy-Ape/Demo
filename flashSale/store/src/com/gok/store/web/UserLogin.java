package com.gok.store.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.gok.store.dao.UserDao;
import com.gok.store.pojo.TUser;

/**
 * Servlet implementation class UserLogin
 */
@WebServlet("/UserLogin")
public class UserLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
	UserDao dao = new UserDao();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UserLogin() {
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
		// System.out.println(username+" "+pass);
		int i = dao.login(username, pass);
		if (i == 1) {
			TUser user = dao.getAllMessage(username);
			session.setAttribute("user", user);
			session.setAttribute("ulogin", 1);
			response.getWriter().print(session.getAttribute("ulogin"));
		} else if (i == -1) {
			response.getWriter().println(i);
		} else {
			session.setAttribute("ulogin", 0);
			response.getWriter().print(session.getAttribute("ulogin"));
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
