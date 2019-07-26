package com.gok.store.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.gok.store.pojo.Admin;
import com.gok.store.utils.JdbcUtils;

public class AdminDao {

	public int getUser(String username, String pass) {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery(
					"select count(*) from s_admin where user='" + username + "' and password= '" + pass + "'");
			while (set.next()) {
				int i = set.getInt(1);
				return i;
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

	public Admin getAllMessage(String username) {		
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery("select * from s_admin where user='" + username + "'");
			while (set.next()) {
				Admin admin = new Admin(set.getInt(1),set.getString(2),set.getString(3),set.getString(4));
				return admin;
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
		return null;
	}

	public int save(String user, String pass,int id) {
		Connection con = null;
		Statement sta = null;
		try {
			con=JdbcUtils.getConnection();
			sta=con.createStatement();
			String sql="update s_admin set user='"+user+"', password='"+pass+"' where id="+id;
			return sta.executeUpdate(sql);
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

	public Admin getUserMessage(String id) {		
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery("select * from s_admin where id=" +id);
			while (set.next()) {
				Admin admin = new Admin(set.getInt(1),set.getString(2),set.getString(3),set.getString(4));
				return admin;
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
		return null;
	}

}
