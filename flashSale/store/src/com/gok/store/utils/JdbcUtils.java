package com.gok.store.utils;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.sql.DataSource;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.mchange.v2.c3p0.DataSources;

public class JdbcUtils implements ServletContextListener{
    	
    private static ComboPooledDataSource ds=null;
    static{
        try{  	
    	ds=new ComboPooledDataSource();
        }catch (Exception e) {
			// TODO: handle exception
        	throw new ExceptionInInitializerError(e);
		}
    }
    public static DataSource getDateSource(){
    	return ds;
    }
    public static Connection getConnection() throws SQLException{
      return ds.getConnection();	
    }
	public static void release(Connection conn,Statement st,ResultSet rs)
	{
		if(rs!=null)
		{
			try{
				rs.close();
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			rs=null;
		}
		if(st!=null)
		{
			try{
			st.close();
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			st=null;
		}
		if(conn!=null){
			try{
			conn.close();
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
			conn=null;
		}
	}
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		System.out.println("Ïú»Ù");
		 try
	        {
	            DataSources.destroy(ds);
	        }
	        catch (Exception e)
	        {
	            e.printStackTrace();
	        }
	 
	         
	        try {
	            Thread.sleep(1000);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }
	    }
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}
}
