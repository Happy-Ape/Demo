package com.gok.store.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.gok.store.pojo.Product;
import com.gok.store.utils.JdbcUtils;

public class ProductDao {

	public List<Product> getAll(String page) {
		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		List<Product> lists = new ArrayList<>();
		try {
			Statement sta = con.createStatement();
			ResultSet set = sta
					.executeQuery("select * from product limit " + ((Integer.parseInt(page) - 1) * 10) + ",10");
			while (set.next()) {
				Product vo = new Product();
				// 设置数据
				vo.setNid(set.getInt("nid"));
				vo.setSname(set.getString("sname"));
				vo.setSimg(set.getString("simg"));
				vo.setCateid(set.getInt("cateid"));
				vo.setNprice(set.getFloat("nprice"));
				vo.setDcdate(set.getDate("dcdate"));
				vo.setSmctag(set.getInt("smctag"));
				vo.setSdescription(set.getString("sdescription"));
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
		return lists;
	}

	public String getCate(Integer cateid) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery("select name from product_type where id=" + cateid);
			while (set.next()) {
				return set.getString("name");
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
		return null;
	}

	public Integer getCount() {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery("select count(*) from product");
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
		return null;
	}

	public List<Product> getProduct(String page, String name, String state, String cate) {

		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		List<Product> lists = new ArrayList<>();
		try {
			Statement sta = con.createStatement();
			String sql = "select * from product where 1=1";
			if (name != null) {
				sql += " and sname='" + name + "'";
			}
			if (state != null) {
				sql += " and smctag=" + state;
			}
			if (cate != null) {
				String sql1 = "select id from product_type where name='" + cate + "'";
				ResultSet rs = sta.executeQuery(sql1);
				int id = 0;
				while (rs.next()) {
					id = rs.getInt("id");
				}
				sql += " and cateid=" + id;
			}
			sql += " limit " + ((Integer.parseInt(page) - 1) * 10) + ",10";
			ResultSet set = sta.executeQuery(sql);
			while (set.next()) {
				Product vo = new Product();
				// 设置数据
				vo.setNid(set.getInt("nid"));
				vo.setSname(set.getString("sname"));
				vo.setSimg(set.getString("simg"));
				vo.setCateid(set.getInt("cateid"));
				vo.setNprice(set.getFloat("nprice"));
				vo.setDcdate(set.getDate("dcdate"));
				vo.setSmctag(set.getInt("smctag"));
				vo.setSdescription(set.getString("sdescription"));
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

	public int save(String name, String img, String cate, String price, String date, String state, String des) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String d = date + " 00:00:00";
			String sql1 = "select id from product_type where name='" + cate + "'";
			set = sta.executeQuery(sql1);
			int pid = 0;
			while (set.next()) {
				pid = set.getInt(1);
			}
			String sql = "insert into product values(null,'" + name + "','" + des + "'," + price + ",'" + img + "',"
					+ state + ",'" + d + "'," + pid + ")";
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

	public int remove(String id) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "delete from product where nid=" + id;
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

	public int update(String id, String name, String cate, String price, String state, String date, String des,
			String image) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql1 = "select id from product_type where name='" + cate + "'";
			set = sta.executeQuery(sql1);
			int pid = 0;
			while (set.next()) {
				pid = set.getInt(1);
			}
			String d = date + " 00:00:00";
			String sql = "update product set sname='" + name + "',sdescription='" + des + "',nprice=" + price
					+ ",smctag=" + state + ",dcdate='" + d + "',cateid=" + pid;
			if (image != null) {
				sql += ",simg='" + image + "'";
			}
			sql += " where nid=" + id;
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

	public List<Product> list(String data) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			List<Product> list = new ArrayList<>();
			String sql1 = "select simg,sname,nprice,nid,sdescription from product where cateid=" + data;
			ResultSet rs = sta.executeQuery(sql1);
			while (rs.next()) {
				Product vo = new Product();
				vo.setSimg(rs.getString(1));
				vo.setSname(rs.getString(2));
				vo.setNprice(rs.getFloat(3));
				vo.setNid(rs.getInt(4));
				vo.setSdescription(rs.getString(5));
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

	public Product get(String id) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select * from product where nid=" + id;
			set = sta.executeQuery(sql);
			Product vo = new Product();
			while (set.next()) {
				vo.setNid(set.getInt(1));
				vo.setSname(set.getString(2));
				vo.setSdescription(set.getString(3));
				vo.setNprice(set.getFloat(4));
				vo.setSimg(set.getString(5));
				vo.setSmctag(set.getInt(6));
				vo.setDcdate(set.getDate(7));
				vo.setCateid(set.getInt(8));
				vo.setDate(set.getString(7));
			}
			return vo;
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

	public List<Product> search(String spname) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		List<Product> lists = new ArrayList<>();
		String sql = "SELECT simg,sname,nprice,nid,sdescription from product where sname LIKE '%" + spname + "%'";
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery(sql);
			while (set.next()) {
				Product vo = new Product();
				vo.setSimg(set.getString(1));
				vo.setSname(set.getString(2));
				vo.setNprice(set.getFloat(3));
				vo.setNid(set.getInt(4));
				vo.setSdescription(set.getString(5));
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
}
