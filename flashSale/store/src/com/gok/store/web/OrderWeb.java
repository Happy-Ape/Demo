package com.gok.store.web;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import com.gok.store.dao.OrderDao;
import com.gok.store.pojo.Cart;
import com.gok.store.pojo.Product;
import com.gok.store.pojo.TOrder;
import com.gok.store.pojo.TOrderItem;
import com.gok.store.pojo.TUser;

/**
 * Servlet implementation class OrderWeb
 */
@WebServlet("/OrderWeb")
public class OrderWeb extends HttpServlet {
	private static final long serialVersionUID = 1L;
	OrderDao dao = new OrderDao();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public OrderWeb() {
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
		// ��ѯ�б�
		if ("list".equals(m)) {
			// ��ȡ��ҳ�Ĳ���
			// http://localhost:8080/store/ProductWeb?m=list&page=1&rows=10
			// ��Ϊ�ǿ�ܰ����Ƿ�ҳ�� ÿ�ζ��ᷢ����������� ������Ҫ��f12 ����������Ĳ����Ϳ���
			String page = request.getParameter("page");
			String name = request.getParameter("standard.name");
			String itemid = request.getParameter("standard.itemId");
			String spname = request.getParameter("standard.spName");
			List<TOrderItem> lists = null;
			if (name == null && itemid == null && spname == null) {
				lists = dao.getAll(page);
			} else {
				if (name.equals("")) {
					name = null;
				}
				if (itemid.equals("")) {
					itemid = null;
				}
				if (spname.equals("")) {
					spname = null;
				}
				lists = dao.getOrderItem(page, name, itemid, spname);
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

		} else if ("del".equals(m)) {
			String id = request.getParameter("id");
			int i = dao.remove(id);
			response.getWriter().println(i);
		} else if ("more".equals(m)) {
			String id = request.getParameter("id");
			// System.out.println(id);
			List<String> lists = new ArrayList<String>();
			TOrder order = dao.getOrder(id);
			lists.add(String.valueOf(order.getOrderId()));
			lists.add(order.getOrderCode());
			lists.add(order.getSuser());
			lists.add(order.getGmname());
			lists.add(order.getSpname());
			lists.add(order.getCate());
			lists.add(String.valueOf(order.getNmcsize()));
			lists.add(String.valueOf(order.getNtotalprice()));
			lists.add(order.getDgdate().toString());
			lists.add(order.getSpaytype());
			lists.add(order.getSsendtype());
			if (order.getSstatus().equals("1")) {
				order.setSstatus("δ���");
			}
			if (order.getSstatus().equals("2")) {
				order.setSstatus("���ͨ��");
			}
			if (order.getSstatus().equals("3")) {
				order.setSstatus("���δͨ��");
			}
			lists.add(order.getSstatus());
			lists.add(order.getSmsg());
			lists.add(order.getSauser1());
			lists.add(order.getDadate().toString());
			lists.add(order.getSsname());
			lists.add(order.getSsaddress());
			lists.add(order.getSsphone());
			lists.add(order.getSscode());
			lists.add(order.getSimg());

			response.setContentType("application/json;charset=utf-8");
			// System.out.println(lists);
			response.getWriter().print(JSON.toJSONString(lists));
		} else if ("edit".equals(m)) {
			String itemid = request.getParameter("itemid1");
			String uid = request.getParameter("uid1"); // ������
			String user = request.getParameter("user1");// �û���
			String name = request.getParameter("name1");// ��ʵ����
			String sname = request.getParameter("sname1");// ��Ʒ��
			String spnumber = request.getParameter("spnumber1");// ��Ʒ����
			String nprice = request.getParameter("nprice1");// ����
			String dgdate = request.getParameter("dgname1");// �µ�ʱ��
			String spaytype = request.getParameter("spaytype1");// ���ʽ
			// System.out.println(spaytype);
			String sendtype = request.getParameter("sendtype1");// ������ʽ
			String smsg = request.getParameter("smsg1");// ��ע
			String sstatus = request.getParameter("sstatus1");// ����״̬
			// System.out.println(sstatus);
			String sauser = request.getParameter("sauser1");// �����
			String dadate = request.getParameter("dadate1");// ���ʱ��
			String ssname = request.getParameter("ssname1");// �ջ���
			String ssaddress = request.getParameter("ssaddress1");// ��ַ
			String ssphone = request.getParameter("ssphone1");// �绰
			String sscode = request.getParameter("sscode1");// �ʱ�
			String state = null;

			float totalprice = Integer.parseInt(spnumber) * Float.parseFloat(nprice);
			int i = dao.update(uid, user, name, sname, spnumber, nprice, dgdate, spaytype, sendtype, smsg, sstatus,
					sauser, dadate, ssname, ssaddress, ssphone, sscode, totalprice, itemid);
			// System.out.println(i);
			if (i > 0) {
				response.sendRedirect("http://localhost:8080/store/page/orderlist.html");
			}
		} else if ("buy".equals(m)) {
			Map<Integer, Integer> order = new HashMap<Integer, Integer>();
			String[] data = request.getParameterValues("cart");
			String id = request.getParameter("id");
			for (int i = 0; i < data.length; i++) {
				String tmp[] = data[i].split("-");
				order.put(Integer.parseInt(tmp[1]), Integer.parseInt(tmp[0]));
			}
			List<Product> orderlist = dao.get(order);
			response.setContentType("application/json;charset=utf-8");
			// System.out.println(lists);
			response.getWriter().print(JSON.toJSONString(orderlist));
		} else if ("saveOrder".equals(m)) {
			String[] data = request.getParameterValues("order");
			int temp = 0;
			int number = 0;
			for (int i = 0; i < data.length; i++) {
				String tmp[] = data[i].split("-");
				number += Integer.parseInt(tmp[0]);
			}
			String uid = request.getParameter("uid");
			String suser = request.getParameter("suser");
			String shname = request.getParameter("shname");
			String shaddress = request.getParameter("shaddress");
			String shphone = request.getParameter("shphone");
			String shcode = request.getParameter("shcode");
			String buytype = request.getParameter("buytype");
			System.out.println(buytype);
			String totalprice = request.getParameter("totalprice");
			String liuyan = request.getParameter("liuyan");
			if(liuyan==null) {
				liuyan="��";
			}
			long code = dao.getCode() + 1;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String dgdate = sdf.format(new Date());
			temp += dao.saveOrder(code, suser, uid, dgdate, buytype, totalprice, liuyan, shname, shaddress, shphone,
					shcode, number);
			int oid = dao.getOrderId(code);
			for (int i = 0; i < data.length; i++) {
				String tmp[] = data[i].split("-");
				temp += dao.saveItem(tmp[1], tmp[0], oid);
			}
			if (temp > 0) {
				Map<String, Cart> cart = (Map<String, Cart>) request.getSession().getAttribute("cart");
				for (int i = 0; i < data.length; i++) {
					String tmp[] = data[i].split("-");
					cart.remove(tmp[1]);
				}
			}
			response.getWriter().println(temp);
		} else if ("listOrder".equals(m)) {
			HttpSession session = request.getSession();
			TUser user = (TUser) session.getAttribute("user");
			int uid = user.getUid();
			List<TOrder> lists = dao.getMyOrder(uid);
			for (TOrder o : lists) {
				if (o.getSstatus().equals("1")) {
					o.setSstatus("δ���");
				} else if (o.getSstatus().equals("2")) {
					o.setSstatus("���ͨ��");
				} else {
					o.setSstatus("���δͨ��");
				}
			}
			response.setContentType("application/json;charset=utf-8");
			// System.out.println(lists);
			response.getWriter().print(JSON.toJSONString(lists));
		} else if ("xqorder".equals(m)) {
			String id = request.getParameter("id");
			List lists = new ArrayList();
			TOrder order = dao.getOrder1(id);
			lists.add(String.valueOf(order.getOrderId()));
			lists.add(order.getOrderCode());
			lists.add(order.getSuser());
			lists.add(order.getGmname());
			lists.add(order.getSpname());
			lists.add(String.valueOf(order.getNtotalprice()));
			lists.add(order.getDgdate().toString());
			lists.add(order.getSpaytype());
			if (order.getSsendtype() == null) {
				lists.add("��");
			} else {
				lists.add(order.getSsendtype());
			}
			if (order.getSstatus().equals("1")) {
				order.setSstatus("δ���");
			}
			if (order.getSstatus().equals("2")) {
				order.setSstatus("���ͨ��");
			}
			if (order.getSstatus().equals("3")) {
				order.setSstatus("���δͨ��");
			}
			lists.add(order.getSstatus());
			if (order.getSmsg() == null) {
				lists.add("��");
			} else {
				lists.add(order.getSmsg());
			}
			if (order.getSauser1() == null) {
				lists.add("��");
			} else {
				lists.add(order.getSauser1());
			}
			lists.add(order.getDadate().toString());
			lists.add(order.getSsname());
			lists.add(order.getSsaddress());
			lists.add(order.getSsphone());
			lists.add(order.getSscode());
			List<Product> productlist = dao.getProduct(String.valueOf(order.getOrderId()));
			lists.add(productlist);
			response.setContentType("application/json;charset=utf-8");
			// System.out.println(lists);
			response.getWriter().print(JSON.toJSONString(lists));
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
