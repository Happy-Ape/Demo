package com.each.flashSale.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.each.flashSale.pojo.MiaoshaUser;

@Mapper
public interface MiaoshaUserDao {

	//根据id查询user
	@Select("select * from miaosha_user where id = #{id}")
	public MiaoshaUser getById(@Param("id") long id);
}
