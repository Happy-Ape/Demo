package com.gok.store.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.gok.store.pojo.ProductTypeVo;
import com.gok.store.utils.JdbcUtils;

public class ProductTypeDao {

	public List<ProductTypeVo> treelist() {

		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		List<ProductTypeVo> lists = new ArrayList<>();
		try {
			Statement sta = con.createStatement();

			ResultSet set = sta.executeQuery("select * from product_type where pid = 0");

			while (set.next()) {
				ProductTypeVo vo = new ProductTypeVo(set.getInt(1), set.getString(2));

				lists.add(vo);

			}
			// 查找二级分类
			for (ProductTypeVo productTypeVo : lists) {
				ResultSet set1 = sta.executeQuery("select * from product_type where pid = " + productTypeVo.getId());
				List<ProductTypeVo> twoChild = new ArrayList<>();
				while (set1.next()) {
					ProductTypeVo vo = new ProductTypeVo(set1.getInt(1), set1.getString(2));
					twoChild.add(vo);

				}
				productTypeVo.setChildren(twoChild);
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

		return lists;
	}

	public int save(String pid, String name) {
		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			Statement sta = con.createStatement();
			return sta.executeUpdate("insert into product_type values(null,'" + name + "'," + pid + ")");
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public int remove(int id) {
		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		Statement sta;
		try {
			sta = con.createStatement();
			return sta.executeUpdate("delete from product_type where id=" + id+" or pid="+id);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public int update(int id, String name) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			return sta.executeUpdate("update product_type set name= '" + name + "' where id= " + id);
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public int addHeader(String name) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			return sta.executeUpdate("insert into product_type values(null, ' " + name + " ',0)");
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	public int getPid(int id) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery("select pid from product_type where id=" + id);
			while (set.next()) {
				int pid = set.getInt("pid");
				return pid;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}
}
