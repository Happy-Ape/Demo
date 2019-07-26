package com.each.flashSale.vo;

import java.util.Date;

import com.each.flashSale.pojo.Goods;
/*
 * 商品列表数据类
 */
public class GoodsVo extends Goods {
	private Integer stockCount;
	private Date startDate;
	private Date endDate;
	private Double miaoshaPrice;

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

	public Double getMiaoshaPrice() {
		return miaoshaPrice;
	}

	public void setMiaoshaPrice(Double miaosha_price) {
		this.miaoshaPrice = miaosha_price;
	}

}
