package com.each.flashSale.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.springframework.transaction.annotation.Transactional;

import com.each.flashSale.pojo.MiaoshaOrder;
import com.each.flashSale.pojo.OrderInfo;

@Mapper
public interface OrderDao {

	// 根据id和商品查询有没有订单
	@Select("select * from miaosha_order where user_id=#{userId} and goods_id=#{goodsId}")
	public MiaoshaOrder getSeckillOrderByUserIdGoodsId(@Param("userId") long userId, @Param("goodsId") long goodsId);

	// 插入订单(除支付时间）
	@Insert("insert into order_info(user_id, goods_id, delivery_addr_id,goods_name, goods_count, goods_price, order_channel, status, create_date)values(#{userId}, #{goodsId},#{deliveryAddrId},#{goodsName}, #{goodsCount}, #{goodsPrice}, #{orderChannel},#{status},#{createDate} )")
	@SelectKey(keyColumn = "id", keyProperty = "id", resultType = long.class, before = false, statement = "select last_insert_id()")
	public int insert(OrderInfo orderInfo);

	// 相应插入miaosha_order，与订单相对应
	@Insert("insert into miaosha_order (user_id, goods_id, order_id)values(#{userId}, #{goodsId}, #{orderId})")
	public int insertMiaoshaOrder(MiaoshaOrder miaoshaOrder);

	// 根据id查询订单
	@Select("select * from order_info where id=#{orderId}")
	public OrderInfo getOrderById(@Param("orderId") long orderId);

}
