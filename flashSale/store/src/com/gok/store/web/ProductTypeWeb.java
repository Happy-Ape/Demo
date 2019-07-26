package com.gok.store.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.gok.store.dao.ProductTypeDao;
import com.gok.store.pojo.ProductTypeVo;
import com.sun.xml.internal.bind.v2.runtime.Location;

/**
 * Servlet implementation class ProductTypeWeb
 */
@WebServlet("/ProductTypeWeb")
public class ProductTypeWeb extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ProductTypeDao productTypeDao = new ProductTypeDao();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ProductTypeWeb() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// ´¦ÀípostÂÒÂë
		request.setCharacterEncoding("utf-8");
		String m = request.getParameter("m");
		if ("treelist".equals(m)) {

			List<ProductTypeVo> lists = productTypeDao.treelist();

			String res = JSON.toJSONString(lists);
			response.setContentType("application/json;charset=utf-8");
			response.getWriter().print(res);
		} else if ("add".equals(m)) {
			String pid = request.getParameter("pid");
			String name = request.getParameter("name");
			int i = productTypeDao.save(pid, name);
			if (i > 0) {
				response.sendRedirect("http://localhost:8080/store/page/producttype2.html");
			} else {
				response.getWriter().println("<script>alert(¡®Ìí¼ÓÊ§°Ü¡¯);</script>");
			}
		} else if ("del".equals(m)) {
			String pid = request.getParameter("id");
			int id = Integer.parseInt(pid);
			int ppid = productTypeDao.getPid(id);
			int i = productTypeDao.remove(id);
			if (i > 0) {
				response.sendRedirect("http://localhost:8080/store/page/producttype2.html");
			} else {
				response.getWriter().println("<script>alert(¡®É¾³ýÊ§°Ü¡¯);</script>");
			}
		} else if ("update".equals(m)) {
			String pid = request.getParameter("pid1");
			String name = request.getParameter("name1");
			int id = Integer.parseInt(pid);
			int i = productTypeDao.update(id, name);
			if (i > 0) {
				response.sendRedirect("http://localhost:8080/store/page/producttype2.html");
			} else {
				response.getWriter().println("<script>alert(¡®ÐÞ¸ÄÊ§°Ü¡¯);</script>");
			}
		} else if ("addHeader".equals(m)) {
			String name = request.getParameter("name2");
			int i = productTypeDao.addHeader(name);
			if (i > 0) {
				response.sendRedirect("http://localhost:8080/store/page/producttype2.html");
			} else {
				response.getWriter().println("<script>alert(¡®Ìí¼ÓÊ§°Ü¡¯);</script>");
			}
		} else if ("getPid".equals(m)) {
			String pid = request.getParameter("id");
			int id = Integer.parseInt(pid);
			int ppid = productTypeDao.getPid(id);
			response.getWriter().println(ppid);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}
