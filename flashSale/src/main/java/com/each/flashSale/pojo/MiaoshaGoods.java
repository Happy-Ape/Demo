package com.each.flashSale.pojo;

import java.util.Date;

public class MiaoshaGoods {
	private Long id;
	private Long goodsId;
	private Double miaosha_price;
	private Integer stockCount;
	private Date startDate;
	private Date endDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getGoodsId() {
		return goodsId;
	}
	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}
	public Integer getStockCount() {
		return stockCount;
	}
	public void setStockCount(Integer stockCount) {
		this.stockCount = stockCount;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Double getMiaosha_price() {
		return miaosha_price;
	}
	public void setMiaosha_price(Double miaosha_price) {
		this.miaosha_price = miaosha_price;
	}
	
}
