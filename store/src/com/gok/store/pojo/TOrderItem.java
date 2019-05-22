package com.gok.store.pojo;

public class TOrderItem {
	private Integer itemid;

	private Integer orderId;

	private Integer nid;

	private Integer ncount;

	private Float nprice;

	private Float ntotalprice;

	private String suser;

	private String ssname;
	
	private String sname;
	
	private String order_code;
	
	private String gmname;

	public Integer getItemid() {
		return itemid;
	}

	public void setItemid(Integer itemid) {
		this.itemid = itemid;
	}

	public String getGmname() {
		return gmname;
	}

	public void setGmname(String gmname) {
		this.gmname = gmname;
	}

	public String getOrder_code() {
		return order_code;
	}

	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getNid() {
		return nid;
	}

	public void setNid(Integer nid) {
		this.nid = nid;
	}

	
	public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

	public Integer getNcount() {
		return ncount;
	}

	public void setNcount(Integer ncount) {
		this.ncount = ncount;
	}

	public Float getNprice() {
		return nprice;
	}

	public void setNprice(Float nprice) {
		this.nprice = nprice;
	}

	public Float getNtotalprice() {
		return ntotalprice;
	}

	public void setNtotalprice(Float ntotalprice) {
		this.ntotalprice = ntotalprice;
	}

	public String getSuser() {
		return suser;
	}

	public void setSuser(String suser) {
		this.suser = suser;
	}

	public String getSsname() {
		return ssname;
	}

	public void setSsname(String ssname) {
		this.ssname = ssname;
	}

}