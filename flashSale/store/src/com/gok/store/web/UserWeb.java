package com.gok.store.web;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;
import com.gok.store.dao.AdminDao;
import com.gok.store.dao.UserDao;
import com.gok.store.pojo.Admin;
import com.gok.store.pojo.TUser;

/**
 * Servlet implementation class UserWeb
 */
@WebServlet("/UserWeb")
public class UserWeb extends HttpServlet {
	private static final long serialVersionUID = 1L;
	AdminDao admin1 = new AdminDao();
	UserDao dao = new UserDao();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UserWeb() {
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
		String m = request.getParameter("m");
		if ("admin".equals(m)) {
			String id = request.getParameter("id1").trim();
			String name = request.getParameter("name1").trim();
			String user = request.getParameter("username1").trim();
			String pass1 = request.getParameter("password1").trim();
			String pass2 = request.getParameter("password2").trim();
			if (pass1.equals(pass2) == false) {
				response.getWriter().println(-2);
			} else {
				int i = admin1.save(user, pass1, Integer.parseInt(id));
				Admin a = new Admin(Integer.parseInt(id), user, pass1, name);
				HttpSession session = request.getSession();
				session.setAttribute("admin", a);
				response.getWriter().println(i);
			}
		} else if ("list".equals(m)) {
			String page = request.getParameter("page");
			String name = request.getParameter("standard.name");
			String user = request.getParameter("standard.username");
			String state = request.getParameter("standard.state");
			List<TUser> lists = null;
			if (name == null && state == null && user == null) {
				lists = dao.getAll(page);

			} else {
				if (name.equals("")) {
					name = null;
				}
				if (state.equals("")) {
					state = null;
				}
				if (user.equals("")) {
					user = null;
				}
				lists = dao.getUser(page, name, state, user);
			}
			for (int i = 0; i < lists.size(); i++) {
				if (lists.get(i).getSlock() == 1) {
					lists.get(i).setState("冻结");
				} else if (lists.get(i).getSlock() == 0) {
					lists.get(i).setState("正常");
				}
				lists.get(i).setBirth(lists.get(i).getDbirth().toString());
				lists.get(i).setRegDate(lists.get(i).getRegdate().toString());
				lists.get(i).setDldate(lists.get(i).getDlastdate().toString());
			}
			Map<String, Object> map = new HashMap<>();
			// 可以使用fastjson 可以吧对象转成json格式的数据

			map.put("total", (int) dao.getCount());
			map.put("rows", lists);
			// 响应json数据 需要制定响应头
			response.setContentType("application/json;charset=utf-8");

			response.getWriter().print(JSON.toJSONString(map));
		} else if ("add".equals(m)) {
			String user = request.getParameter("user");
			String name = request.getParameter("name");
			String password = request.getParameter("password");
			String sex = request.getParameter("sex");
			String birth = request.getParameter("birth");
			String email = request.getParameter("email");
			String phone = request.getParameter("phone");
			String address = request.getParameter("address");
			String regdate = request.getParameter("regdate");
			String state = request.getParameter("state");
			String dldate = request.getParameter("dldate");
			String nlogin = request.getParameter("nlogin");
			regdate += " 00:00:00";
			dldate += " 00:00:00";
			int i = dao.save(user, name, password, sex, birth, email, phone, address, regdate, state, dldate, nlogin);
			response.getWriter().println(i);
		} else if ("edit".equals(m)) {
			String uid = request.getParameter("uid1");
			String user = request.getParameter("user1");
			String name = request.getParameter("name1");
			String password = request.getParameter("password1");
			String sex = request.getParameter("sex1");
			String birth = request.getParameter("birth1");
			String email = request.getParameter("email1");
			String phone = request.getParameter("phone1");
			String address = request.getParameter("address1");
			String regdate = request.getParameter("regdate1");
			String state = request.getParameter("state1");
			String dldate = request.getParameter("dldate1");
			String nlogin = request.getParameter("nlogin1");
			int i = dao.update(uid, user, name, password, sex, birth, email, phone, address, regdate, state, dldate,
					nlogin);
			response.getWriter().println(i);
		} else if ("del".equals(m)) {
			String uid = request.getParameter("id");
			int i = dao.remove(uid);
			response.getWriter().println(i);
		} else if ("exit".equals(m)) {
			HttpSession session = request.getSession();
			session.setAttribute("ulogin", 0);
			TUser user = (TUser) session.getAttribute("user");
			session.removeAttribute("user");
			if (user != null) {
				int i = dao.changeDlastDate(user.getUid());
			}
			response.sendRedirect("http://localhost:8080/store/index.jsp");
		} else if ("reg".equals(m)) {
			String user = request.getParameter("user");
			String name = request.getParameter("name");
			String password = request.getParameter("password");
			String sex = request.getParameter("sex");
			String birth = request.getParameter("birth");
			String email = request.getParameter("email");
			String phone = request.getParameter("phone");
			String address = request.getParameter("address");

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String regdate = sdf.format(new Date());
			String state = "1";
			String dldate = sdf.format(new Date());
			String nlogin = "0";
			int i = dao.save(user, name, password, sex, birth, email, phone, address, regdate, state, dldate, nlogin);
			response.getWriter().println(i);
		} else if ("save".equals(m)) {
			String uid = request.getParameter("uid1");
			String name = request.getParameter("name1");
			String username = request.getParameter("username1");
			String sex = request.getParameter("sex1");
			String birth = request.getParameter("birth1");
			String email = request.getParameter("email1");
			String phone = request.getParameter("phone1");
			String address = request.getParameter("address1");
			int i = dao.userSave(uid, name, username, sex, birth, email, phone, address);
			if (i > 0) {
				HttpSession session = request.getSession();
				TUser user = dao.getAllMessage(phone);
				session.setAttribute("user", user);
			}
			response.getWriter().println(i);
		} else if ("savepass".equals(m)) {
			String password = request.getParameter("password1");
			String password1 = request.getParameter("password2");
			String password2 = request.getParameter("password0");
			String uid = request.getParameter("uid2");
			if (!password.equals(password1)) {
				response.getWriter().println(-2);
			} else {
				int i = dao.savePass(uid, password, password2);
				response.getWriter().println(i);
			}
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
