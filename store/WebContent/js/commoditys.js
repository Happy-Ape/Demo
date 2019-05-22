$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var peopletype=$.cookie('peopletype');
	var open=1;
	var str=10;
	var banshopliefimg="";
	var drugid=window.location.search;
		if(drugid==""){
			return false;
		};
		drugid=decodeURI(drugid);
		drugid=drugid.split("=");
		if(drugid[1]==""){
			return false;
		};
		//alert(drugid[1]);
	var imgs="";
	var namecn="";
	$.ajax({
		type:"get",
		url:url+"/cli/getDrugDetailById?drugId="+drugid[1],
		data:{mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			
			if(data.code==1){
				
				namecn=data.pojo.namecn;
				var html='<h5>';
				html+=data.pojo.namecn;
				if(data.pojo.isotc==1){
					html+='<i>otc</i>';
				};
				html+='</h5><p>通 用 名：<span>';
				html+=data.pojo.aliascn;
				html+='</span></p><p>生产厂商：<span>';
				html+=data.pojo.manufacturer;
				html+='</span></p><p>批准文号：<span>';
				if(data.pojo.codename){
					html+=data.pojo.codename;
				}else{
					html+=' ';
				};
				
				html+='</span>';
				if(data.pojo.codename){
					html+='<a target="_blank" href="http://www.sda.gov.cn/WS01/CL0412/">进入药监局查询真伪</a>';
				};
				html+='</p><p>规格：<span>';
				html+=data.pojo.specification;
				html+='</span>平台销量：<span>';
				html+=data.pojo.ogisales;
				html+='</span></p>';
				$("#banshopright").append(html);
				banshopliefimg=data.pojo.images[0];
				$("#banshoplief img").attr("src",data.pojo.images[0]);
				imgs=data.pojo.images[0];
				ajlisk();
			}else{
				$("#shopspic img").attr("src","imgeas/error.png");
				$("#shopserch p").html('搜索失败，<a href="classification.html">看看其它药品吧</a>')
			}
		},
		error:function(){
			$("#shopspic img").attr("src","imgeas/error.png");
				$("#shopserch p").html('搜索失败，<a href="classification.html">看看其它药品吧</a>')
		}
	});
	
	function ajlisk(){
	$.ajax({
		type:"get",
		url:url+"/cli/sellUser/getSUByDrugId/"+drugid[1]+"/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			
			if(data.code==1){
				$("#shopserch").hide();
				shoplis(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipiks").html(st);
					$("#isdangqs").html("1");
			}else{
				$("#shopspic img").attr("src","imgeas/error.png");
				$("#shopserch p").html("暂无商家出售此药品");
				$(".cmaisps").hide();
			}
		},
		error:function(){
			
		}
	});		
	};

	
	
	
	//下一页
	$("#cmaismops").click(function(){
		open=parseInt($("#isdangqs").html())+1;
		if(open>$("#ismyipiks").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getSUByDrugId/"+drugid[1]+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shoplis(data);
					$("#isdangqs").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	//上一页
	$("#cmaismpas").click(function(){
		open=parseInt($("#isdangqs").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getSUByDrugId/"+drugid[1]+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shoplis(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	//跳转
	$("#ismytzans").click(function(){
		open=$(".cmaisps input[type='number']").val()
		if(open==""){
			return false;
		};
		if(open>$("#ismyipiks").html()){
			open=$("#ismyipiks").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getSUByDrugId/"+drugid[1]+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shoplis(data);
					$("#isdangqs").html(open)
				}else{
					gadget_popupt("获取失败.");
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	function shoplis(data){
		$("#banshoplis .shoplist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="shoplist" name="';
					html+=data.lists[i].selluserid;
					html+='"><div class="shoplistpic"><a href="Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid+'"><img src="';
					if(data.lists[i].mydrugimages==""||data.lists[i].mydrugimages==1||data.lists[i].mydrugimages==-1){
						html+=banshopliefimg;
						
					}else{
						var pic=data.lists[i].mydrugimages.split(",");
						html+=pic[0];
					};
					
					html+='" /></a></div><div class="shoplisttxt"><h5><a href="Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid+'">';
					html+=namecn;
					html+='</a></h5>';
					if(data.lists[i].havacoupons!=null&&data.lists[i].havacoupons!=0){
						html+='<div class="txtlik"><p>优惠券</p></div>';
						html+='<div class="quan">';
						html+='</div>';
					};
					html+='</div><div class="shoplistshop"><p>店铺名称：<a href="';
					html+='shopdetails.html?us='+data.lists[i].selluserid;
					html+='"><span>';
					html+=data.lists[i].sellername;
					html+='</span></a></p><p>';
					if(data.lists[i].experiencevalue==null){
						html+="--";
					}else{
						var other=data.lists[i].experiencevalue;
						html+=expsn(other);
					};
					
					html+='</p><p>商品描述：<span>';
					if(data.lists[i].avgscore!=""&&data.lists[i].avgscore!=null){
						var avgscore=data.lists[i].avgscore.split(",");
						html+=avgscore[2];
						html+='</span></p><p>物流评分：<span>';
						html+=avgscore[0];
						html+='</span></p><p>服务评分：<span>';
						html+=avgscore[1];
					}else{
						html+='--';
						html+='</span></p><p>物流评分：<span>';
						html+='--';
						html+='</span></p><p>服务评分：<span>';
						html+='--';
					};
					html+='</span></p><p>店铺地址：<span>';
					if(data.lists[i].selleraddress==null){
						data.lists[i].selleraddress="--";
					};
					html+=data.lists[i].selleraddress;
					html+='</span></p></div><div class="shoplistname"><h5>￥<span>';
					if(data.lists[i].sellprice==0){
						data.lists[i].sellprice="登录可见"
					};
					html+=data.lists[i].sellprice;
					html+='</span></h5><p>当前库存：<span>';
					html+=data.lists[i].sellstock;
					html+='</span></p></div><div class="shoplisto">';
					if(data.lists[i].sustate!=61){
						html+='<div class="notstore"><p>暂停营业</p></div>';
					};
					html+='<div class="listlik" name="';
					html+=data.lists[i].drugid;
					html+='"><p>加入收藏</p></div></div></div>';
				};
				$("#banshoplis").append(html);
				$(".txtlik").click(function(){
					$(this).siblings(".quan").show();
					//url+"/cli/coupons/getBySuid/"+usid,
					var usid=$(this).parents(".shoplist").attr("name");
					var cop=$(this).siblings(".quan");
					$.ajax({
						type:"get",
						url:url+"/cli/coupons/getBySuid/"+usid,
						data:{mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								var htm='';
								for(var c=0;c<data.lists.length;c++){
									htm+='<div class="quans" name="';
									htm+=data.lists[c].couponsid;
									htm+='"><div class="quanjg">';
									if(data.lists[c].type==1){
										var man=data.lists[c].content.split("-");
										htm+='<p>￥<span>';
										htm+=man[1];
										htm+='</span></p></div><div class="quanlis"><p>';
										htm+='满';
										htm+=man[0];
										htm+='可用';
									};
									if(data.lists[c].type==2){
										htm+='<p><span>';
										htm+='免运费';
										htm+='</span></p></div><div class="quanlis"><p>';
										htm+='免运费';
									};
									htm+='</p><p>过期时间：<br><span>';
									var enddates=data.lists[c].enddate.split(" ");
									htm+=enddates[0];
									htm+='</span></p></div><div class="quanbtn">';
									if(data.lists[c].ogistate==1){
										htm+='<input class="obtn" type="button" value="领取"/>';
									}else{
										htm+='<input class="mybtn" type="button" value="领取"/>';
									};
									htm+='</div></div>';
								};
								cop.append(htm);
								$(".obtn").click(function(){
									if(peopletype==null){
										//gadget_popupt("请登录");
										//window.location.href="login.html";
										gadget_popupfs("登录后才可领取",2,"login.html","取消","去登录");
										return false;
									};
									if(peopletype!=1&peopletype!=2&peopletype!=0){
										gadget_popupt("仅限终端用户领取.")
										return false;
									};
									var couponsid=$(this).parents(".quans").attr("name");
									var clacop=$(this);
									$.ajax({
										type:"POST",
										url:url+"/cli/coupons/insertCoupons/"+couponsid+"?token="+token+"&mintime="+new Date().getTime(),
										dataType:"json",
										success:function(data){
											gadget_login(data);
											if(data.code==1){
												gadget_popupt("领取成功");
												clacop.attr("class","mybtn");
											}else{
												gadget_popupt(data.message);
												clacop.attr("class","mybtn");
											};
										},
										error:function(){
											gadget_popupt("领取失败.");
										}
									});
								});
							};
						},
						error:function(){
							
						}
					});
				});
				$(".shoplisttxt").click(function(event){
					event.stopPropagation()
				})
				$("#body").click(function(){
					$(".quan").hide();
					$(".quan .quans").remove();
				});
				$(".listlik").click(function(){
					if(peopletype==null){
						//gadget_popupt("请登录");
						//window.location.href="login.html";
						gadget_popupfs("登录后才可收藏",2,"login.html","取消","去登录");
						return false;
					};
					if(peopletype!=1&peopletype!=2&peopletype!=0){
						gadget_popupt("仅限终端用户领取.")
						return false;
					};
					var drugids=$(this).attr("name");
					var selluserids=$(this).parents(".shoplist").attr("name");
					var obcop=$(this).children("p");
					$.ajax({
						type:"post",
						url:url+"/cli/CD/save?token="+token+"&drugid="+drugids+"&selluserid="+selluserids+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								obcop.html("已收藏");
							}else{
								if(data.message=="请不要重复添加！"){
									obcop.html("已收藏");
								}else{
									if(data.message){
										gadget_popupt(data.message);
									};
								};
								
							};
						},
						error:function(){
							
						}
					});
				});
			
	};
	
	
	function expsn(other){
		var html='';
					if(other==0){
						html+='<img src="imgeas/chushi.png">';
					};
				if(other>=1&&other<=250){
					if(other>=1&&other<=10){
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=11&&other<=40){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=41&&other<=90){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=91&&other<=150){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=151&&other<=250){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
				};
				if(other>=251&&other<=10000){
					if(other>=251&&other<=500){
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=501&&other<=1000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=1001&&other<=2000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=2001&&other<=5000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=5001&&other<=10000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
				};
				if(other>=10001&&other<=500000){
					if(other>=10001&&other<=20000){
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=20001&&other<=50000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=50001&&other<=100000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=100001&&other<=200000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=200001&&other<=500000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
				};
				if(other>=500001){
					if(other>=500001&&other<=1000000){
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=1000001&&other<=2000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=2000001&&other<=5000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=5000001&&other<=10000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=10000001&&other<=20000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=20000001&&other<=90000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
				};
				return html;
	};
	
})
