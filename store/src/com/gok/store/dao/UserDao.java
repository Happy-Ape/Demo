package com.gok.store.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.gok.store.pojo.TUser;
import com.gok.store.utils.JdbcUtils;

public class UserDao {

	public List<TUser> getAll(String page) {
		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		List<TUser> lists = new ArrayList<>();
		try {
			Statement sta = con.createStatement();
			ResultSet set = sta
					.executeQuery("select * from t_user limit " + ((Integer.parseInt(page) - 1) * 10) + ",10");
			while (set.next()) {
				TUser vo = new TUser();
				// 设置数据
				vo.setUid(set.getInt("uid"));
				vo.setSuser(set.getString("suser"));
				vo.setSpwd(set.getString("spwd"));
				vo.setSname(set.getString("sname"));
				vo.setSsex(set.getString("ssex"));
				try {
					vo.setDbirth(set.getDate("dbirth"));
				} catch (Exception e) {
				}
				vo.setSemail(set.getString("semail"));
				vo.setSphone(set.getString("sphone"));
				vo.setSaddress(set.getString("saddress"));
				vo.setRegdate(set.getTimestamp("regdate"));
				vo.setSlock(set.getInt("slock"));
				vo.setDlastdate(set.getTimestamp("dlastdate"));
				vo.setNlogin(set.getInt("nlogin"));
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

	public int getCount() {
		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			set = sta.executeQuery("select count(*) from t_user");
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

	public List<TUser> getUser(String page, String name, String state, String user) {

		Connection con = null;
		try {
			con = JdbcUtils.getConnection();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		List<TUser> lists = new ArrayList<>();
		try {
			Statement sta = con.createStatement();
			String sql = "select * from t_user where 1=1";
			if (name != null) {
				sql += " and sname='" + name + "'";
			}
			if (state != null) {
				sql += " and slock=" + state;
			}
			if (user != null) {
				sql += " and suser='" + user + "'";
			}
			sql += " limit " + ((Integer.parseInt(page) - 1) * 10) + ",10";
			ResultSet set = sta.executeQuery(sql);
			while (set.next()) {
				TUser vo = new TUser();
				vo.setUid(set.getInt("uid"));
				vo.setSuser(set.getString("suser"));
				vo.setSpwd(set.getString("spwd"));
				vo.setSname(set.getString("sname"));
				vo.setSsex(set.getString("ssex"));
				vo.setDbirth(set.getDate("dbirth"));
				vo.setSemail(set.getString("semail"));
				vo.setSphone(set.getString("sphone"));
				vo.setSaddress(set.getString("saddress"));
				vo.setRegdate(set.getTimestamp("regdate"));
				vo.setSlock(set.getInt("slock"));
				vo.setDlastdate(set.getTimestamp("dlastdate"));
				vo.setNlogin(set.getInt("nlogin"));
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

	public int save(String user, String name, String password, String sex, String birth, String email, String phone,
			String address, String regdate, String state, String dldate, String nlogin) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			birth += " 00:00:00";
			String sql1 = "select count(*) from t_user where sphone='" + phone + "'";
			ResultSet set = sta.executeQuery(sql1);
			int i = 0;
			while (set.next()) {
				i = set.getInt(1);
			}
			if (i == 1) {
				return -1;
			} else {
				String sql = "insert into t_user values(null,'" + user + "','" + password + "','" + name + "','" + sex
						+ "','" + birth + "','" + email + "','" + phone + "','" + address + "','" + regdate + "',"
						+ state + ",'" + dldate + "'," + nlogin + ")";
				return sta.executeUpdate(sql);
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

	public int update(String uid, String user, String name, String password, String sex, String birth, String email,
			String phone, String address, String regdate, String state, String dldate, String nlogin) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			birth += " 00:00:00";
			String sql1 = "select count(*) from t_user where sphone='" + phone + "' and uid !=" + uid;
			ResultSet set = sta.executeQuery(sql1);
			int i = 0;
			while (set.next()) {
				i = set.getInt(1);
			}
			if (i == 1) {
				return -1;
			} else {
				String sql = "update t_user set suser='" + user + "',sname='" + name + "',spwd='" + password
						+ "',ssex='" + sex + "',dbirth='" + birth + "',semail='" + email + "',sphone='" + phone
						+ "',saddress='" + address + "',regdate='" + regdate + "',slock=" + state + ",dlastdate='"
						+ dldate + "',nlogin=" + nlogin + " where uid= " + uid;
				return sta.executeUpdate(sql);
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

	public int remove(String uid) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "delete from t_user where uid=" + uid;
			return sta.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
	}

	public int login(String username, String pass) {

		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select count(*) from t_user where sphone='" + username + "' and spwd= '" + pass + "'";
			set = sta.executeQuery(sql);
			int i = 0;
			while (set.next()) {
				i = set.getInt(1);
			}
			if (i == 1) {
				String sql1 = "select slock from t_user where sphone='" + username + "'";
				ResultSet set1 = sta.executeQuery(sql1);
				while (set1.next()) {
					int s = set1.getInt(1);
					if (s == 0) {
						String sql2 = "select nlogin from t_user where sphone='" + username + "'";
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						String dldate = sdf.format(new Date());
						String sql3 = "update t_user set dlastdate='" + dldate + "' where sphone='" + username + "'";
						ResultSet rs = sta.executeQuery(sql2);
						int loginCount = 0;
						while (rs.next()) {
							loginCount = rs.getInt(1);
						}
						loginCount += 1;
						String sql4 = "update t_user set nlogin=" + loginCount + " where sphone='" + username + "'";
						sta.executeUpdate(sql4);
						sta.executeUpdate(sql3);
						return 1;
					} else {
						return -1;
					}
				}
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

	public TUser getAllMessage(String username) {

		Connection con = null;
		Statement sta = null;
		ResultSet set = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			String sql = "select uid,suser,spwd,sname,ssex,dbirth,semail,sphone,saddress from t_user where sphone='"
					+ username + "'";
			// System.out.println(sql);
			set = sta.executeQuery(sql);

			while (set.next()) {
				TUser user = new TUser(set.getInt(1), set.getString(2), set.getString(3), set.getString(4),
						set.getString(5), set.getDate(6), set.getString(7), set.getString(8), set.getString(9));
				return user;
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

	public int changeDlastDate(Integer uid) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String dldate = sdf.format(new Date());
			String sql = "update t_user set dlastdate='" + dldate + "' where uid='" + uid + "'";
			int i = sta.executeUpdate(sql);
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

	public int userSave(String uid, String name, String username, String sex, String birth, String email, String phone,
			String address) {
		Connection con = null;
		Statement sta = null;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			birth += " 00:00:00";
			String sql = "select count(*) from t_user where sphone='" + phone + "' and uid!= " + uid;
			ResultSet set = sta.executeQuery(sql);
			int i = 0;
			while (set.next()) {
				i = set.getInt(1);
			}
			if (i != 0) {
				return -1;
			}
			String sql1 = "update t_user set sname='" + name + "',suser='" + username + "',ssex='" + sex + "',dbirth='"
					+ birth + "',semail='" + email + "',sphone='" + phone + "',saddress='" + address + "' where uid="
					+ uid;
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

	public int savePass(String uid, String password, String password2) {
		Connection con = null;
		Statement sta = null;
		String sql = "select count(*) from t_user where spwd='" + password2 + "' and uid=" + uid;
		String sql1 = "update t_user set spwd='" + password + "' where uid=" + uid;
		try {
			con = JdbcUtils.getConnection();
			sta = con.createStatement();
			ResultSet set = sta.executeQuery(sql);
			int i = 0;
			while (set.next()) {
				i = set.getInt(1);
			}
			if (i == 0) {
				return -1;
			} else {
				return sta.executeUpdate(sql1);
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

}
