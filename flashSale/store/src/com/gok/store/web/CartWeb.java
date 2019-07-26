package com.gok.store.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.gok.store.pojo.Cart;

/**
 * Servlet implementation class CartWeb
 */
@WebServlet("/CartWeb")
public class CartWeb extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CartWeb() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// 处理post乱码
		request.setCharacterEncoding("utf-8");
		String m = request.getParameter("m");

		if ("add".equals(m)) {
			// 获取商品id和数量
			String nid = request.getParameter("nid");
			String num = request.getParameter("num");
			String name = request.getParameter("name");
			String simg = request.getParameter("simg");
			String price = request.getParameter("price");
			// System.out.println(nid + " " + num + " " + name + " " + simg + " " + price);
			String img[] = simg.split("/");
			String image = img[img.length - 1];
			// 从session获取购物车
			Map<String, Cart> carts = (Map<String, Cart>) request.getSession().getAttribute("cart");
			if (carts == null) {
				carts = new HashMap<>();
			}
			// 判断该商品有没有
			Cart c = carts.get(nid);
			if (c == null) // 咩有 就创建一个
			{
				c = new Cart();
				// 设置信息
				c.setImg(image);
				c.setName(name);
				c.setNid(Integer.parseInt(nid));
				c.setNum(Integer.parseInt(num));
				c.setPrice(Float.parseFloat(price));
				// 注意 ！！！ 可能刚好商品数量等于==0
				// 放到购物车
				carts.put(nid, c);
			} else {
				c.setNum(c.getNum() + Integer.parseInt(num));
			}
			// 最后把map放到session

			request.getSession().setAttribute("cart", carts);

			Map<String, Cart> cart = (Map<String, Cart>) request.getSession().getAttribute("cart");
			response.setCharacterEncoding("GBK");
			response.getWriter().println("<script>alert('添加成功');history.go(-1);</script>");
		} else if ("edit".equals(m)) {
			String number = request.getParameter("number").trim();
			String id = request.getParameter("nid").trim();
			Map<String, Cart> cart1 = (Map<String, Cart>) request.getSession().getAttribute("cart");
			Cart c = cart1.get(id);
			c.setNum(Integer.parseInt(number));
			response.setCharacterEncoding("utf-8");
			String res=JSON.toJSONString(c);
			response.getWriter().println(res);
		}else if("del".equals(m)) {
			String id=request.getParameter("nid").trim();
			Map<String, Cart> cart = (Map<String, Cart>) request.getSession().getAttribute("cart");
			cart.remove(id);
			response.getWriter().println(1);
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
