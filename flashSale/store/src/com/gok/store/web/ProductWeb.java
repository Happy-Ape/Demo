package com.gok.store.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.gok.store.dao.ProductDao;
import com.gok.store.pojo.Product;

/**
 * Servlet implementation class ProductWeb
 */
@WebServlet("/ProductWeb")
public class ProductWeb extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ProductDao dao = new ProductDao();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ProductWeb() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// ����post����
		request.setCharacterEncoding("utf-8");
		String m = request.getParameter("m");
		// ��ѯ�б�
		if ("list".equals(m)) {
			// ��ȡ��ҳ�Ĳ���
			// http://localhost:8080/store/ProductWeb?m=list&page=1&rows=10
			// ��Ϊ�ǿ�ܰ����Ƿ�ҳ�� ÿ�ζ��ᷢ����������� ������Ҫ��f12 ����������Ĳ����Ϳ���
			String page = request.getParameter("page");
			String name = request.getParameter("standard.name");
			String state = request.getParameter("standard.state");
			String cate = request.getParameter("standard.cate");
			List<Product> lists = null;
			if (name == null && state == null && cate == null) {
				lists = dao.getAll(page);
			} else {
				if (name.equals("")) {
					name = null;
				}
				if (state.equals("")) {
					state = null;
				}
				if (cate.equals("")) {
					cate = null;
				}
				lists = dao.getProduct(page, name, state, cate);
			}
			for (int i = 0; i < lists.size(); i++) {
				if (lists.get(i).getSmctag() == 1) {
					lists.get(i).setState("�л�");
				} else {
					lists.get(i).setState("ȱ��");
				}
				lists.get(i).setDate(lists.get(i).getDcdate().toString());

				lists.get(i).setCate(dao.getCate(lists.get(i).getCateid()));
				lists.get(i).setImage("<img src='http://localhost:8080/" + lists.get(i).getSimg()
						+ "' width='100px' height='100px'/>");
			}
			// ����json����
			// �ܼ�¼��������Ҫ��ѯ���ݵ� ����Ϊ�˷��� ֱ�����ó�10
			Map<String, Object> map = new HashMap<>();
			// ����ʹ��fastjson ���԰ɶ���ת��json��ʽ������

			map.put("total", (int) dao.getCount());
			map.put("rows", lists);
			// ��Ӧjson���� ��Ҫ�ƶ���Ӧͷ
			response.setContentType("application/json;charset=utf-8");

			response.getWriter().print(JSON.toJSONString(map));

		} else if ("add".equals(m)) {
			String name = request.getParameter("name");
			String img = request.getParameter("image");
			String cate = request.getParameter("cate");
			String price = request.getParameter("price");
			String date = request.getParameter("date");
			String state = request.getParameter("state");
			String des = request.getParameter("des");
			// System.out.println(name + " " + img + " " + cate + " " + price + " " + date +
			// " " + state + " " + des);
			int i = dao.save(name, img, cate, price, date, state, des);
			if (i > 0) {
				response.sendRedirect("http://localhost:8080/store/page/productlist.html");
			}
		} else if ("del".equals(m)) {
			String id = request.getParameter("id");
			int i = dao.remove(id);
			response.getWriter().println(i);
		} else if ("edit".equals(m)) {
			String id = request.getParameter("pid1");
			String name = request.getParameter("name1");
			String cate = request.getParameter("cate1");
			String price = request.getParameter("price1");
			String state = request.getParameter("state1");
			String date = request.getParameter("date1");
			String des = request.getParameter("des1");
			String image = request.getParameter("image1");
			if ("".equals(image)) {
				image = null;
			}

			int i = dao.update(id, name, cate, price, state, date, des, image);
			if (i > 0) {
				response.sendRedirect("http://localhost:8080/store/page/productlist.html");
			} else {
				response.getWriter().println("false");
			}
		} else if ("treelist".equals(m)) {

			String data = request.getParameter("data");
			List<Product> lists = dao.list(data);
			String res = JSON.toJSONString(lists);
			response.setContentType("application/json;charset=utf-8");
			response.getWriter().print(res);
		} else if ("product".equals(m)) {
			String id = request.getParameter("data");
			Product pro = dao.get(id);
			response.setCharacterEncoding("utf-8");
			// request.setAttribute("p", pro.getSimg());
			// request.getRequestDispatcher("/product.jsp").forward(request, response);
			String res = JSON.toJSONString(pro);
			response.getWriter().println(res);
		} else if ("search".equals(m)) {
			request.setCharacterEncoding("UTF-8");
			String spname = request.getParameter("name");
			List<Product> lists = dao.search(spname);
			String res = JSON.toJSONString(lists);
			response.setContentType("application/json;charset=utf-8");
			response.getWriter().print(res);
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
