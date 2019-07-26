package com.gok.store.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.gok.store.pojo.Product;
import com.gok.store.pojo.TOrder;
import com.gok.store.pojo.TOrderItem;
import com.gok.store.pojo.TUser;
import com.gok.store.utils.JdbcUtils;

public class OrderDao {

	public List<TOrderItem> getAll(String page) {
		List<TOrderItem> lists = new ArrayList<>();
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select i.itemid,i.order_id,i.nid,i.ncount,i.nprice,i.ntotalprice,o.suser,o.ssname,p.sname,o.order_code ,u.sname from t_order_item i ,t_order o ,product p ,t_user u where i.order_id=o.order_id and p.nid=i.nid and u.suser=o.suser limit "
					+ ((Integer.parseInt(page) - 1) * 10) + ",10";
			set = sta.executeQuery(sql);
			while (set.next()) {
				TOrderItem vo = new TOrderItem();
				vo.setItemid(set.getInt(1));
				vo.setOrderId(set.getInt(2));
				vo.setNid(set.getInt(3));
				vo.setNcount(set.getInt(4));
				vo.setNprice(set.getFloat(5));
				vo.setNtotalprice(set.getFloat(6));
				vo.setSuser(set.getString(7));
				vo.setSsname(set.getString(8));
				vo.setSname(set.getString(9));
				vo.setOrder_code(set.getString(10));
				vo.setGmname(set.getString(11));
				lists.add(vo);
			}
		} catch (SQLException e1) {
			e1.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return lists;
	}

	public List<TOrderItem> getOrderItem(String page, String name, String itemid, String spname) {

		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		List<TOrderItem> lists = new ArrayList<>();
		try {
			Statement sta = con.createStatement();
			String sql = "select i.itemid,i.order_id,i.nid,i.ncount,i.nprice,i.ntotalprice,o.suser,o.ssname,p.sname,o.order_code,u.sname from t_order_item i ,t_order o ,product p,t_user u where i.order_id=o.order_id and p.nid=i.nid and u.suser=o.suser ";
			if (name != null) {
				sql += " and u.sname='" + name + "'";
			}
			if (itemid != null) {
				sql += " and o.order_code='" + itemid + "'";
			}
			if (spname != null) {
				sql += " and p.sname='" + spname + "'";
			}
			sql += " limit " + ((Integer.parseInt(page) - 1) * 10) + ",10";
			ResultSet set = sta.executeQuery(sql);
			while (set.next()) {
				TOrderItem vo = new TOrderItem();
				vo.setItemid(set.getInt(1));
				vo.setOrderId(set.getInt(2));
				vo.setNid(set.getInt(3));
				vo.setNcount(set.getInt(4));
				vo.setNprice(set.getFloat(5));
				vo.setNtotalprice(set.getFloat(6));
				vo.setSuser(set.getString(7));
				vo.setSsname(set.getString(8));
				vo.setSname(set.getString(9));
				vo.setOrder_code(set.getString(10));
				vo.setGmname(set.getString(11));
				lists.add(vo);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		// 关闭资源

		return lists;

	}

	public TOrder getOrder(String id) {
		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		try {
			TOrder vo = new TOrder();
			Statement sta = con.createStatement();
			ResultSet rs = sta.executeQuery("select nid,order_id from t_order_item where itemid=" + id);
			while (rs.next()) {
				vo.setNid(rs.getString(1));
				vo.setOrderId(rs.getInt(2));
			}
			ResultSet rs1 = sta.executeQuery("select sname,cateid,simg from product where nid=" + vo.getNid());
			while (rs1.next()) {
				vo.setSpname(rs1.getString(1));
				vo.setCateid(rs1.getString(2));
				vo.setSimg(rs1.getString(3));
			}
			ResultSet rs2 = sta.executeQuery("select name from product_type where id=" + vo.getCateid());
			while (rs2.next()) {
				vo.setCate(rs2.getString(1));
			}

			ResultSet set = sta.executeQuery("select * from t_order where order_id=" + vo.getOrderId());

			while (set.next()) {
				// 设置数据
				// vo.setOrderId(set.getInt(1));
				vo.setOrderCode(set.getString(2));
				vo.setSuser(set.getString(3));
				vo.setUid(set.getString(4));
				vo.setDgdate(set.getTimestamp(5));
				vo.setSpaytype(set.getString(6));
				vo.setSsendtype(set.getString(7));
				vo.setNmcsize(set.getInt(8));
				vo.setNtotalprice(set.getString(9));
				vo.setSstatus(set.getString(10));
				vo.setSmsg(set.getString(11));
				vo.setSauser(set.getInt(12));
				vo.setDadate(set.getTimestamp(13));
				vo.setSsname(set.getString(14));
				vo.setSsaddress(set.getString(15));
				vo.setSscode(set.getString(16));
				vo.setSsphone(set.getString(17));
			}
			ResultSet rs3 = sta.executeQuery("select sname from t_user where suser='" + vo.getSuser() + "'");
			while (rs3.next()) {
				vo.setGmname(rs3.getString(1));
			}
			ResultSet rs4 = sta.executeQuery("select name from s_admin  where id=" + vo.getSauser());
			while (rs4.next()) {
				vo.setSauser1(rs4.getString(1));
			}
			return vo;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	// 详细信息
	public TOrder getOrder1(String id) {
		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		try {
			Statement sta = con.createStatement();
			ResultSet set = sta.executeQuery("select * from t_order where order_id=" + id);
			TOrder vo = new TOrder();
			while (set.next()) {
				// 设置数据
				vo.setOrderId(set.getInt(1));
				vo.setOrderCode(set.getString(2));
				vo.setSuser(set.getString(3));
				vo.setUid(set.getString(4));
				vo.setDgdate(set.getTimestamp(5));
				vo.setSpaytype(set.getString(6));
				vo.setSsendtype(set.getString(7));
				vo.setNmcsize(set.getInt(8));
				vo.setNtotalprice(set.getString(9));
				vo.setSstatus(set.getString(10));
				vo.setSmsg(set.getString(11));
				vo.setSauser(set.getInt(12));
				vo.setDadate(set.getTimestamp(13));
				vo.setSsname(set.getString(14));
				vo.setSsaddress(set.getString(15));
				vo.setSscode(set.getString(16));
				vo.setSsphone(set.getString(17));
			}
			ResultSet rs = sta.executeQuery("select nid from t_order_item where order_id=" + id);
			while (rs.next()) {
				vo.setNid(rs.getString(1));
			}
			ResultSet rs1 = sta.executeQuery("select sname,cateid,simg from product where nid=" + vo.getNid());
			while (rs1.next()) {
				vo.setSpname(rs1.getString(1));
				vo.setCateid(rs1.getString(2));
				vo.setSimg(rs1.getString(3));
			}
			ResultSet rs2 = sta.executeQuery("select name from product_type where id=" + vo.getCateid());
			while (rs2.next()) {
				vo.setCate(rs2.getString(1));
			}
			ResultSet rs3 = sta.executeQuery("select sname from t_user where suser='" + vo.getSuser() + "'");
			while (rs3.next()) {
				vo.setGmname(rs3.getString(1));
			}
			ResultSet rs4 = sta.executeQuery("select name from s_admin  where id=" + vo.getSauser());
			while (rs4.next()) {
				vo.setSauser1(rs4.getString(1));

			}
			return vo;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public int getCount() {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery("select count(*) from t_order_item");
			while (set.next()) {
				int count = set.getInt(1);
				return count;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public int remove(String id) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "delete from t_order where order_id=" + id;
			String sql1 = "delete from t_order_item where order_id=" + id;
			int i = sta.executeUpdate(sql);
			i += sta.executeUpdate(sql1);
			System.out.println(i);
			return i;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public int update(String uid, String user, String name, String sname, String spnumber, String nprice, String dgdate,
			String spaytype, String sendtype, String smsg, String state, String sauser, String dadate, String ssname,
			String ssaddress, String ssphone, String sscode, float totalprice, String itemid) {
		// dgdate+=" 00:00:00";
		// dadate+=" 00:00:00";
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql1 = "select nid from product where sname='" + sname + "'";
			ResultSet set = sta.executeQuery(sql1);
			int nid = -1;
			while (set.next()) {
				nid = set.getInt(1);
			}
			String sql2 = "select uid from t_user where suser='" + user + "'";
			ResultSet set1 = sta.executeQuery(sql2);
			int uid1 = -1;
			while (set1.next()) {
				uid1 = set1.getInt(1);
			}
			String sql3 = "select id from s_admin where name='" + sauser + "'";
			ResultSet set2 = sta.executeQuery(sql3);
			int aid = -1;
			while (set2.next()) {
				aid = set2.getInt(1);
			}
			String sql = "update t_order set suser='" + user + "',uid='" + uid1 + "',dgdate='" + dgdate + "',spaytype='"
					+ spaytype + "',ssendtype='" + sendtype + "',nmcsize=" + spnumber + ",ntotalprice='" + totalprice
					+ "',sstatus='" + state + "',smsg='" + smsg + "',sauser=" + aid + ",dadate='" + dadate
					+ "',ssname='" + ssname + "',ssaddress='" + ssaddress + "',sscode='" + sscode + "',ssphone='"
					+ ssphone + "' where order_id=" + uid;
			int i = 0;
			i += sta.executeUpdate(sql);
			String sql4 = "update t_order_item set nid=" + nid + ",ncount=" + spnumber + ",nprice=" + nprice
					+ ",ntotalprice=" + totalprice + " where itemid =" + itemid;
			i += sta.executeUpdate(sql4);
			return i;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public List<Product> get(Map<Integer, Integer> order) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			List<Product> lists = new ArrayList<>();
			for (Map.Entry<Integer, Integer> entry : order.entrySet()) {
				int id = entry.getKey();
				int num = entry.getValue();
				String sql = "select * from product where nid=" + id;
				set = sta.executeQuery(sql);
				Product vo = new Product();
				while (set.next()) {
					vo.setNid(set.getInt(1));
					vo.setSname(set.getString(2));
					vo.setSdescription(set.getString(3));
					vo.setNprice(set.getFloat(4));
					vo.setSimg(set.getString(5));
				}
				vo.setNumber(num);
				lists.add(vo);
			}
			return lists;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public TUser getUser(String id) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select suser,uid from t_user where uid=" + id;
			set = sta.executeQuery(sql);
			TUser user = new TUser();
			while (set.next()) {
				user.setSuser(set.getString(1));
				user.setUid(set.getInt(2));
			}
			return user;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return null;
	}

	public long getCode() {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select order_code from t_order";
			set = sta.executeQuery(sql);
			long code = 0;
			while (set.next()) {
				code = Long.parseLong(set.getString(1));
			}
			return code;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return 0;
	}

	public int saveOrder(long code, String suser, String uid, String dgdate, String buytype, String totalprice,
			String liuyan, String shname, String shaddress, String shphone, String shcode, int number) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "insert into t_order values(null,'" + code + "','" + suser + "','" + uid + "','" + dgdate
					+ "','" + buytype + "'," + null + "," + number + ",'" + totalprice + "','1','" + liuyan + "',0,'"
					+ dgdate + "','" + shname + "','" + shaddress + "','" + shcode + "','" + shphone + "')";
			return sta.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public int saveItem(String nid, String number, int oid) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select nprice from product where nid=" + nid;
			set = sta.executeQuery(sql);
			float nprice = 0.0f;
			while (set.next()) {
				nprice = set.getFloat(1);
			}
			String sql1 = "insert into t_order_item values(null," + oid + "," + nid + "," + number + "," + nprice + ","
					+ (Integer.parseInt(number) * nprice) + ")";
			return sta.executeUpdate(sql1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public int getOrderId(long code) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select order_id from t_order where order_code='" + code + "'";
			set = sta.executeQuery(sql);
			int id = 0;
			while (set.next()) {
				id = Integer.parseInt(set.getString(1));
			}
			return id;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		// TODO Auto-generated method stub
		return 0;
	}

	public List<TOrder> getMyOrder(int uid) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select * from t_order where uid=" + uid;
			set = sta.executeQuery(sql);
			List<TOrder> list = new ArrayList<>();
			while (set.next()) {
				TOrder vo = new TOrder();
				vo.setOrderId(set.getInt(1));
				vo.setOrderCode(set.getString(2));
				vo.setSuser(set.getString(3));
				vo.setUid(set.getString(4));
				vo.setDgdate(set.getDate(5));
				vo.setSpaytype(set.getString(6));
				vo.setSsendtype(set.getString(7));
				vo.setSstatus(set.getString(10));
				vo.setNtotalprice(set.getString(9));
				vo.setSsname(set.getString(14));
				vo.setSsphone(set.getString(17));
				vo.setSsaddress(set.getString(15));
				vo.setSscode(set.getString(16));
				list.add(vo);
			}
			return list;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return null;
	}

	public List<Product> getProduct(String id) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			List<Product> lists = new ArrayList<>();
			String sql = "select nid,ncount,ntotalprice from t_order_item where order_id=" + id;
			set = sta.executeQuery(sql);
			List<Integer> idlist = new ArrayList<>();
			List<Integer> ncount = new ArrayList<>();
			List<Integer> totalprice = new ArrayList<>();
			while (set.next()) {
				idlist.add(set.getInt(1));
				ncount.add(set.getInt(2));
				totalprice.add(set.getInt(3));
			}
			for (int i = 0; i < idlist.size(); i++) {
				String sql1 = "select sname,nprice,simg from product where nid=" + idlist.get(i);
				ResultSet rs = sta.executeQuery(sql1);
				while (rs.next()) {
					Product vo = new Product();
					vo.setSname(rs.getString(1));
					vo.setNprice(rs.getFloat(2));
					vo.setSimg(rs.getString(3));
					vo.setNumber(ncount.get(i));
					vo.setTotalPrice(totalprice.get(i));
					lists.add(vo);

				}
			}
			return lists;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
