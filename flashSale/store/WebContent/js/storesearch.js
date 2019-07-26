$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=15;
	var search=window.location.search;
		search=decodeURI(search);
		search=search.split("=");
		//alert(search[1]);
		$("#search").html(search[1]);
		var drugKey=search[1];
		drugKey=decodeURI(drugKey);
		if(drugKey==undefined){
			drugKey="药";
		};
		//alert(drugKey);
		$.ajax({
			type:"get",
			url:url+"/cli/homeDrug/getOne/23",
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					
					var htm='';
					if(data.lists[0].length>10){
						data.lists[0].length=10
					};
					for(var i=0;i<data.lists[0].length;i++){
						htm+='<div class="lislik"><div class="lislikle"><img src="';
						htm+=data.lists[0][i].listimg;
						htm+='" /></div><div class="lislikri"><p><a href="';
						htm+='Product.html?drugid='+data.lists[0][i].drugid+'&selluserid='+data.lists[0][i].sellUserId;
						htm+='">';
						htm+=data.lists[0][i].aliascn;
						htm+='</a></p><p>';
						htm+=data.lists[0][i].manufacturer;
						htm+='</p><p>规格：';
						htm+=data.lists[0][i].specification;
						htm+='</p><p>价格：￥<span>';
						if(data.lists[0][i].sellPrice==0){
							data.lists[0][i].sellPrice="登录可见";
						};
						htm+=data.lists[0][i].sellPrice;
						htm+='</span></p></div></div>';
					};
					$("#smore").append(htm);
				};
			},
			error:function(){
				
			}
		});
		
		
		
		$.ajax({
			type:"get",
			url:url+"/IS/querys/"+open+"/"+str,
			data:{key:drugKey,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				
				console.log(data)
				if(data.code==0){
					$("#sererr").hide();
					slistr(data);
					var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					//console.log(data.message+"message");
					//console.log(st+"st");
					$("#ismyipiks").html(st);
					$("#isdangqs").html("1");
				}else{
					$("#sererr .sererrpic img").attr("src","imgeas/error.png");
					$("#sererr .sererrtxt p").html("搜索失败，换个关键词试试");
				};
			},
			error:function(){
				$("#sererr .sererrpic img").attr("src","imgeas/error.png");
				$("#sererr .sererrtxt p").html("搜索失败，换个关键词试试");
			}
		});
		//下一页
	$("#cmaismops").click(function(){
		open=parseInt($("#isdangqs").html())+1;
		if(open>$("#ismyipiks").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/IS/querys/"+open+"/"+str,
			data:{key:drugKey,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==0){
					slistr(data);
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
			url:url+"/IS/querys/"+open+"/"+str,
			data:{key:drugKey,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==0){
					slistr(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	//跳转
	$("#ismytzans").click(function(){
		open=Number($(".cmaisps input[type='number']").val());
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
			url:url+"/IS/querys/"+open+"/"+str,
			data:{key:drugKey,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==0){
					slistr(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
		function slistr(data){
			
					$("#slist .slistmore").remove();
					var html='';
					for(var i=0;i<data.lists.length;i++){
						html+='<div class="slistmore" name="'+data.lists[i].selluserid+'">';
						if(data.lists[i].state!=61){
							html+='<div class="storeste"><p>暂停营业</p></div>';
						};
						
						html+='<div class="listmoreimg"><img src="';
						if(data.lists[i].imagelist==null||data.lists[i].imagelist==""){
							html+='imgeas/muyou.png';
						}else{
							var imagelis=data.lists[i].imagelist.split(",");
							html+=imagelis[0];
						};
						html+='" /></div><div class="listmoretxt"><p><a target="_blank" href="';
						html+='shopdetails.html?us='+data.lists[i].selluserid;
						html+='">';
						html+=data.lists[i].sellername;
						html+='</a></p>';
						if(data.lists[i].experiencevalue!=null&&data.lists[i].experiencevalue!=""){
							var other=data.lists[i].experiencevalue;
							html+=expsn(other);
						};
						html+='<p>商品描述：<span>';
						if(data.lists[i].avgscore!=""&&data.lists[i].avgscore!=null){
						var avgscore=data.lists[i].avgscore.split(",");
						html+=avgscore[2];
						html+='</span>物流评分：<span>';
						html+=avgscore[0];
						html+='</span>服务评分：<span>';
						html+=avgscore[1];
					}else{
						html+='--';
						html+='</span>物流评分：<span>';
						html+='--';
						html+='</span>服务评分：<span>';
						html+='--';
					};
						html+='</span></p><p>详细地址:';
						if(data.lists[i].selleraddress==null){
							data.lists[i].selleraddress="--";
						};
						html+=data.lists[i].selleraddress;
						html+='</p></div>';
						if(data.lists[i].havacoupons==1){
							html+='<div class="listhaveq"><p>优惠券</p></div>';
							html+='<div class="listqboxe">';
							html+='<div class="qboxeli"><div class="quanmon"><p>￥99</p></div><div class="quanmonmor"><p>优惠券：满<span>9999</span>元可用</p><p>2017-03-31至2017-04-08</p></div><div class="quanmorbtn"><a>领取</a></div></div>';
							html+='<div class="qboxeli"></div>';
							html+='<div class="qboxeli"></div>';
							html+='<div class="qboxgif"><img src="imgeas/serch.gif" /><p></p></div>';
							html+='</div>';
						};
						html+='<div class="listmorebt"><a target="_blank" href="';
						html+='shopdetails.html?us='+data.lists[i].selluserid;
						html+='">进入店铺</a></div></div>';
					};
					$("#slist").append(html);
				$(".listhaveq").click(function(e){
					e.stopPropagation();
					var listqboxe=$(this).siblings(".listqboxe");
					listqboxe.children(".qboxeli").remove();
					listqboxe.show();
					listqboxe.children(".qboxgif").show();
					listqboxe.children("p").hide();
					var suseid=$(this).parents(".slistmore").attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/coupons/getBySuid/"+suseid+"?mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							if(data.code==1){
								var lishtml='';
								for(var v=0;v<data.lists.length;v++){
								if(data.lists[v].content==0){
									//免运费
									lishtml+='<div class="qboxeli"><div class="quanmon"><p>';
									lishtml+='免运费';
									lishtml+='</p></div><div class="quanmonmor"><p>优惠券：';
									lishtml+='满任意金额可用';
									lishtml+='</p><p>';
								}else{
									var arr=data.lists[v].content.split("-");
									lishtml+='<div class="qboxeli"><div class="quanmon"><p>￥';
									lishtml+=arr[1];
									lishtml+='</p></div><div class="quanmonmor"><p>优惠券：';
									lishtml+='满<span>';
									lishtml+=arr[0];
									lishtml+='</span>元可用';
									lishtml+='</p><p>';
								};
									var begindate=data.lists[v].begindate.split(" ");
									var enddate=data.lists[v].enddate.split(" ");
									lishtml+=begindate[0];
									lishtml+='至';
									lishtml+=enddate[0];
									lishtml+='</p></div><div class="quanmorbtn"><a class="quanbotn" name="'+data.lists[v].couponsid+'">领取</a></div></div>';
								};
								listqboxe.append(lishtml);
								listqboxe.children(".qboxgif").hide();
								$(".quanbotn").click(function(){
									if(token==""||token==null||token==undefined){
										gadget_popupfs("登录后才能领取优惠券，",2,"login.html","","去登录");
										return false;
									};
									var $this=$(this);
									var couponsid=$(this).attr("name");
									$.ajax({
										type:"get",
										url:url+"/cli/coupons/insertCoupons/"+couponsid+"?token="+token+"&mintime="+new Date().getTime(),
										dataType:"json",
										success:function(data){
											gadget_login(data);
											if(data.code==1){
												gadget_popupt("优惠券领取成功");
												$this.parents(".qboxeli").remove();
											}else{
												if(data.message!=undefined){
													gadget_popupt(data.message);
												};
											};
										},
										error:function(){
											gadget_popupt("领取失败，请重试");
										}
									});
								});
							}else{
								listqboxe.children(".qboxgif").children("img").hide();
								listqboxe.children(".qboxgif").children("p").show().html("优惠券被领完了");
							};
						},
						error:function(){
							listqboxe.children(".qboxgif").children("img").hide();
							listqboxe.children(".qboxgif").children("p").show().html("获取优惠券失败，请重试");
						}
					});
				});
				$("body").click(function(){
					$(".listqboxe").hide();
				});
				$(".listqboxe").click(function(e){
					e.stopPropagation();
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
