package com.each.flashSale.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.each.flashSale.dao.GoodsDao;
import com.each.flashSale.pojo.MiaoshaGoods;
import com.each.flashSale.vo.GoodsVo;

@Service
public class GoodsService {

	@Autowired
	GoodsDao goodsDao;

	// 获取所有商品
	public List<GoodsVo> listGoodsVo() {
		return goodsDao.listGoodsVo();

	}

	// 指定获取商品
	public GoodsVo getGoodsVoByGoodsId(long goodsId) {
		return goodsDao.getGoodsVoByGoodsId(goodsId);
	}

	// 减库存（减的是秒杀商品表的库存，而非商品表的库存）
	public boolean reduceStock(GoodsVo goods) {
		MiaoshaGoods g = new MiaoshaGoods();
		g.setGoodsId(goods.getId());
		int result = goodsDao.reduceStock(g);
		return result > 0;
	}
}
