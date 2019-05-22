package com.gok.store.pojo;

import java.util.Date;

public class Product {
	private Integer nid;

	private String sname;

	private String sdescription;

	private Float nprice;

	private String simg;
	
	private String image;

	private Integer smctag;

	private String state;

	private Date dcdate;

	private String date;

	private Integer cateid;

	private String cate;
	
	private Integer number;
	
	private float totalPrice;

	public Integer getNid() {
		return nid;
	}

	public void setNid(Integer nid) {
		this.nid = nid;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getSname() {
		return sname;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public void setSname(String sname) {
		this.sname = sname == null ? null : sname.trim();
	}

	public String getSdescription() {
		return sdescription;
	}

	public void setSdescription(String sdescription) {
		this.sdescription = sdescription == null ? null : sdescription.trim();
	}

	public Float getNprice() {
		return nprice;
	}

	public void setNprice(Float nprice) {
		this.nprice = nprice;
	}

	public String getSimg() {
		return simg;
	}

	public void setSimg(String simg) {
		this.simg = simg == null ? null : simg.trim();
	}

	public Integer getSmctag() {
		return smctag;
	}

	public void setSmctag(Integer smctag) {
		this.smctag = smctag;
	}

	public Date getDcdate() {
		return dcdate;
	}

	public void setDcdate(Date dcdate) {
		this.dcdate = dcdate;
	}

	public Integer getCateid() {
		return cateid;
	}

	public void setCateid(Integer cateid) {
		this.cateid = cateid;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCate() {
		return cate;
	}

	public void setCate(String cate) {
		this.cate = cate;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}