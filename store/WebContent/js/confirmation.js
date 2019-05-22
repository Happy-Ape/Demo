$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var userid=$.cookie('peopleus');
	var peopletype=$.cookie('peoplestate');
	var order="";
	var pic=0;
	var picvi=0;
	var timeTimp=getUrlParamo("key");
	
	gadget_back("生成中...");
	$.ajax({
		type:"get",
		url:url+"/cli/order/getInf?token="+token+"&timeTimp="+timeTimp+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			gadget_back_remove();
			if(data.code==1){
				order=data.pojo;
				doclism();
			}else{
				$("#rotwho").hide();
				gadget_popupf("订单已失效,请返回上一页重新结算",-1);
				
			};
		},
		error:function(){
			gadget_back_remove();
		}
	});
function doclism(){
	function mdstring(datas){
		var mdstr="";
		var drugids="";
		var mo="";
		for(var i=0;i<datas.details.length;i++){
			drugids+=datas.details[i].drugid+",";
			mo+=String(datas.details[i].price.toFixed(1));
			mo+=String(datas.details[i].num);
			if(datas.details[i].actstate==1){
				mo+=String(datas.details[i].actid);
				mo+=String(datas.details[i].acttype);
				mo+=String(datas.details[i].actlimt);
				if(datas.details[i].acttype==3||datas.details[i].acttype==4){
					mo+=String(Number(datas.details[i].actmes).toFixed(1));
				}else{
					mo+=String(datas.details[i].actmes);
				};
			};
			if(datas.details[i].actstate==1){
				mo+=String(Number(datas.details[i].totalfee).toFixed(2));
			}else{
				mo+=String((Number(datas.details[i].price)*Number(datas.details[i].num)).toFixed(2));
			};
			
		};
		drugids=drugids.substring(0,drugids.length-1);
		mdstr=String(datas.selluserid)+drugids+mo+String(datas.subtotal);
		
		mdstr = hex_md5(mdstr);
		return mdstr;
	};
	if(order==""||order==null){
		gadget_popupt("暂无待结算订单");
		return false;
	};
	
	var fault=0;
	var couponId=0;
	//$.cookie("aorder","",{path:"/"});
	order=$.parseJSON(order);
	$("#sellnam").html(order.storename);
	//console.log(mdstring(order));
	//md5str= selluserid + drugids(类似 1,2,3,4,5) + 价格+数量+活动id+活动类型+活动限购+活动内容+总价（2位小数）
	var selluserId=order.selluserid;
	var drugIds="";
	var num="";
	for(var i=0;i<order.details.length;i++){
		drugIds+=order.details[i].drugid+",";
		num+=order.details[i].num+",";
	};
	drugIds=drugIds.substring(0,drugIds.length-1);
	num=num.substring(0,num.length-1);
	//?post=30&mini=200.0&free=800.0
				var subtotal=order.buytop;
				var freebuy=getUrlparamo("free",subtotal);
				var minibuy=getUrlparamo("mini",subtotal);
				var postbuy=getUrlparamo("post",subtotal);

				aorderlis(order,postbuy,freebuy);
				if(Number(order.subtotal)<Number(freebuy)){
					var nummun=Number(order.subtotal)+Number(postbuy);
					$("#wholemin h1 span").html(nummun.toFixed(2));
				}else{
					var nummun=Number(order.subtotal);
					$("#wholemin h1 span").html(nummun.toFixed(2))
				};
	$("#isbonbig").mouseover(function(){
		if($(".isquan").html()!="优惠券"){
			$("#quxquan").show();
		};
	}).mouseleave(function(){
		$("#quxquan").hide();
	});
	$("#quxquan").click(function(){
			couponId=0;
			$(".isquan").html("优惠券");
			if(Number(order.subtotal)>Number(freebuy)){
				$("#wholemin h1 span").html(Number(order.subtotal).toFixed(2));
			}else{
				var potto=Number(order.subtotal)+Number(postbuy)
				$("#wholemin h1 span").html(potto.toFixed(2));
			};
		});
		$("#subtotla").click(function(){
			var $this=$(this);
			var ments=$this.attr("ments");
			if(ments!=2&&ments!=11&&ments!=12){
				ments=2;
			};
			var callback=function(pay_ob){
								//{id: "1", name: "微信支付", pic: "imgeas/weixin.png"}
								$this.html("【"+pay_ob.name+"】");
								$this.attr("ments",pay_ob.id);
							};
			gadget_pay(ments,1,callback);
		});
	$("#rotwho").click(function(){
		
		if(peopletype!=1){
			if(peopletype==-1){
				gadget_popupt("资质审核还未通过，不允许提交订单");
			};
			if(peopletype==2){
				gadget_popupt("当前状态不允许提交订单");
			};
			return false;
		};
		var paymentval=$("#subtotla").attr("ments");
		if(paymentval!=11&&paymentval!=12){
			paymentval=2
		};
		var buyermessage=$("#whomore textarea").val();
		var buyernick=$.cookie('peoplecompanyname');
		var endaddsdr=$("#endnameg").html()+"="+$("#citybigg").html()+"="+$("#endphoneg").html()+"="+$("#endzipg").html();
		var md5str=mdstring(order);
		var corder={
				"couponid":couponId,
				"selluserid":order.selluserid,
				"payment":order.subtotal,
				"paymenttype":paymentval,
				"buyermessage":buyermessage,
				"buyernick":buyernick,
				"endaddressid":fault,
				"endaddr":endaddsdr,
				"details":order.details,
				"hasaftersale":0
			};
			
		if(corder.endaddr=="==="||corder.endaddr==""){
				gadget_popupt("请填写收货地址");
				return false;
			};
			var actId="";
			var actname='';
			for(var i=0;i<order.details.length;i++){
				actId+=order.details[i].actid+",";
				actname+=order.details[i].drugname+",";
			};
			actId=actId.substring(0,actId.length-1);
			actname=actname.substring(0,actname.length-1);
			gadget_back("提交中");
		// /cli/order/create||/cli/order/kill
		var stanurl="/cli/order/create";
		if(order.standard==1){
			//普通
			stanurl="/cli/order/create";
			if(corder.details[0].acttype==3){
				corder.details[0].actid=0;
			};
		};
		if(order.standard==2){
//			/秒杀
			stanurl="/cli/order/kill";
		};
		corder=JSON.stringify(corder);
		corder=encodeURI(corder);
		
		$.ajax({
				type:"post",
				url:url+stanurl+"?token="+token+"&cliPass="+md5str+"&order="+corder+"&actId="+actId+"&mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					gadget_back_remove();
					gadget_login(data);
					if(order.standard==1){
						//普通
						if(data.code==1){
							$.cookie("aorder","",{path:"/"});
							$("#shopling").hide();
							if(paymentval==11){
								var valo={
									"action":"http://192.168./create_direct_pay_by_user-JAVA-UTF-8/alipayapi.jsp",
									"inputs":[
										["show_url",ut+"/completion.html"],
										["WIDsubject",actname],
										["WIDbody",data.other],
										["token",token],
										["type","2"],
										["order_id",data.message]
										]
									};
								formsubmitli(valo,function(){
									var callo=function(){
										window.location="icen/orderdetails.html?i="+data.message;
									};
									var callt=function(){
										var datamessage=data.message;
										var datacode=data.other;
										gadget_zfb(token, datacode, datamessage);
									};
									$("#rotwho").remove();
									$("#subtotla").unbind("click");
									gadget_popupfsev("<p style='text-align: center;line-height: 80px;font-weight: bold;'>请根据支付情况点击按钮</p>",callo,callt,"暂不支付","支付完成");
								});
							}else if(paymentval==12){
								//actname=
								actname=encodeURI(actname);
								window.location.href="weixinpay.html?e="+data.other+"&i="+data.message+"&mes="+actname;
							}else{
								window.location.href="completion.html?mes="+data.message+"&e="+data.other;
							};
						}else{
							gadget_popupt("提交失败"+data.message);
							$("#shopling").hide();
						};
					};
					if(order.standard==2){
						//秒杀、
						if(data.code==1){
							var wincils="icen/order.html?id=0";
							var popuptxts="提交成功，是否前往查看订单";
							gadget_popupfs(popuptxts,-1,wincils,"返回上一页");
							$("#shopling").hide();
						}else if(data.code==-1){//-1库存不够 1提交成功 2已经购买一次
							var popuptxts="提交失败，库存不足，是否返回上一页";
							gadget_popupfs(popuptxts,2,-1,0);
							$("#shopling").hide();
						}else if(data.code==2){
							var popuptxts="提交失败，已经秒杀过该商品，是否返回上一页";
							gadget_popupfs(popuptxts,2,-1,0);
							$("#shopling").hide();
						}else{
							var popuptxts="提交失败，非法订单";
							gadget_popupfs(popuptxts,2,-1,0);
							$("#shopling").hide();
						}
						
					};
					
					
				},
				error:function(){
					gadget_back_remove()
					gadget_popupt("提交失败，请刷新重试");
					$("#shopling").hide();
				}
			});
	});
	function getUrlparamo(name,subtotal) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = subtotal.substr(1).match(reg);  
        if (r != null) return unescape(r[2]); return null; 
    };

	function aorderlis(order,postbuy,freebuy){
		
				$("#agemons").html(postbuy);
				$("#agemax").html(freebuy);
				$("#minbuy").html(minibuy);
		$("#subtotal span").html(order.subtotal);
		pic=order.subtotal;
		picvi=order.subtotal;
		$(".shopbody").remove();
		var htlm='';
		for(var i=0;i<order.details.length;i++){
			htlm+='<div class="shopbody"><div class="shopbodymin">';
			htlm+='<div class="shopbodyo"><div class="shoppic"><img src="';
			htlm+=order.details[i].imagePath;
			htlm+='" /></div><p>';
			htlm+=order.details[i].drugname;
			htlm+='</p></div><div class="shopbodyt"><p class="shopprice">';
			htlm+=order.details[i].price;
			htlm+='</p></div><div class="shopbodys"><p>';
			htlm+=order.details[i].num;
			htlm+='</p></div><div class="shopbodyf"><p>';
			htlm+=order.details[i].actcontent;
			htlm+='</p></div></div><div class="shopboom"><p>￥<span>';
			htlm+=order.details[i].totalfee;
			htlm+='</span></p></div></div>';
		};
		$("#isbonbig").after(htlm);
	};
		
	var sellus=3;//店铺id
		//收货地址
	$("#mybtn").click(function(){
		$("#ismyfor").show();
	});
	$("#isobxx").click(function(){
		$("#ismyfor").hide();
	});
	$(".isquan").unbind("click");
	$(".isquan").click(function(event){
    	$("#discount").show();
    	$(window).scrollTop(0);
    	$(".mydiscount").remove();
		discount();
	});
	$("#couxx").click(function(){
		$("#discount").hide();
	});
	$("#dispano").click(function(){
		$("#dispant").removeClass("dispan");
		$(".mydiscount").remove();
		$(this).attr("class","dispan");
		discount();
	});	
	
	//地址
	addres();
	function addres(){
	$.ajax({
		type:"GET",
		url:url+"/cli/endUserAddr/getMyAddr",
		data:{token:token,userid:userid,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$("#receipt h5 span").html("");
				$("#receipt p").remove();
				//$("#wholemin p").remove();
				$("#citybigg").html("");
				$("#endnameg").html("");
				$("#endphoneg").html("");
				$("#endzipg").html("");
				var html='';
				var hmjk='';
				//html+='<h5>寄送到:<span></span></h5>';
				for(var i=0;i<data.lists.length;i++){
					if(data.lists[i].isdefault==1&&hmjk==""){
						
						fault=data.lists[i].endaddressid;
						hmjk+=data.lists[i].baseaddress;
					    hmjk+=data.lists[i].address;
						hmjk+='<span> ';
						hmjk+=data.lists[i].endname;
						hmjk+='</span> 电话:<i>';
						hmjk+=data.lists[i].endphone;
						hmjk+='</i> 邮编:<span>';
						hmjk+=data.lists[i].endzip;
						
						$("#citybigg").html(data.lists[i].baseaddress+data.lists[i].address);
						$("#endnameg").html(data.lists[i].endname);
						$("#endphoneg").html(data.lists[i].endphone);
						$("#endzipg").html(data.lists[i].endzip);
						
					};
					
					html+='<p><span class="citybi">';
					html+=data.lists[i].baseaddress;
					html+=data.lists[i].address;
					html+='</span><span class="endname"> ';
					html+=data.lists[i].endname;
					html+='</span> 电话:<i class="endphone">';
					html+=data.lists[i].endphone;
					html+='</i> 邮编:<span class="endzip">';
					html+=data.lists[i].endzip;
					html+='</span> <input name="';
					html+=data.lists[i].endaddressid;
					html+='" type="button" class="obbtn" value="设为默认"></p>';
				};
				$("#receipt h5 span").append(hmjk);
				$("#receipt h5").after(html);
				
				//收货地址
				$("#receipt p").click(function(){
					//fault=$(this).children(".obbtn").attr("name");
					$("#receipt h5 span").html($(this).html());
					$("#receipt h5 span input").hide();
					$("#citybigg").html($(this).children(".citybi").html());
					$("#endnameg").html($(this).children(".endname").html());
					$("#endphoneg").html($(this).children(".endphone").html());
					$("#endzipg").html($(this).children(".endzip").html());
				});
				//mouse
				$("#receipt p").mouseleave(function(){
					$(this).children(".obbtn").hide();
				}).mouseenter(function(){
					$(this).children(".obbtn").show();
				});
				$(".obbtn").click(function(){
					var oldAddrId=fault;
					var newAddrId=$(this).attr("name");
					$.ajax({
						type:"GET",
						url:url+"/cli/endUserAddr/changeDefaultAddr",
						data:{oldAddrId:oldAddrId,newAddrId:newAddrId,token:token,userid:userid,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("设置成功");
							}else{
								gadget_popupt("设置失败");
							}
						},
						error:function(){
							gadget_popupt("设置失败，请刷新重试");
						}
					});
				});
			};
		},
		error:function(){
			
		}
	});	
	};
	//新增地址
	$("#ismybtnm").click(function(){
		
		if($("#myfor input[name='endname']").val()==""){
			$(".isforred").eq(0).show();
			return false;
		}else{
			$(".isforred").eq(0).hide();
		};
		if($("#myfor input[name='endphone']").val().length==11){
			$(".isforred").eq(1).hide();
		}else{
			$(".isforred").eq(1).show();
			return false;
		};
		if($("#myfor input[name='endtel']").val()==""||$("#myfor input[name='endtel']").val().length==7){
			$(".isforred").eq(2).hide();
		}else{
			$(".isforred").eq(2).show();
			return false;
		};
		if($("#myfor input[name='endzip']").val().length!=6){
			$(".isforred").eq(3).show();
			return false;
		}else{
			$(".isforred").eq(3).hide();
		};
		if($("#myfor select[name='area']").val()==""){
			$(".isforred").eq(4).show();
			return false;
		}else{
			$(".isforred").eq(4).hide();
		};
		if($("#myfor input[name='address']").val()==""){
			$(".isforred").eq(5).show();
			return false;
		}else{
			$(".isforred").eq(5).hide();
		};
		
		var endname=$("#myfor input[name='endname']").val();
		var endphone=$("#myfor input[name='endphone']").val();
		var endzip=$("#myfor input[name='endzip']").val();
		var baseaddress=$("#myfor select[name='province']").val()+"-"+$("#myfor select[name='city']").val()+"-"+$("#myfor select[name='area']").val();
		var address=$("#myfor input[name='address']").val();
		var endtel=$("#myfor input[name='endtel']").val();
		var isdefault=0;
		endname=encodeURI(endname);
		endphone=encodeURI(endphone);
		endzip=encodeURI(endzip);
		baseaddress=encodeURI(baseaddress);
		address=encodeURI(address);
		endtel=encodeURI(endtel);
		$.ajax({
			type:"POST",
			url:url+"/cli/endUserAddr/saveEndUserAddr?userid="+userid+"&token="+token+"&endname="+endname+"&endphone="+endphone+"&endzip="+endzip+"&baseaddress="+baseaddress+"&address="+address+"&endtel="+endtel+"&isdefault="+isdefault+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#ismyfor").hide();
					addres();
					
				};
			},
			error:function(){
				
			},
		});
		
	});
	//省市
	childao_lis();
		//优惠券
		function discount(){
    		$.ajax({
    		type:"GET",
    		url:url+"/cli/EU/getAllCoupons/"+sellus,
    		data:{token:token,mintime:new Date().getTime()},
    		dataType:"json",
    		success:function(data){
    			gadget_login(data);
    			if(data.code==1){
    				var html='';
    				for(var i=0;i<data.lists.length;i++){
    					html+='<div class="mydiscount"><div class="mydiscountlef"><h2>';
    					if(data.lists[i].type==2){
    						html+='免运费';
    					};
    					if(data.lists[i].type==1){
    						var arr=data.lists[i].content.split("-");
    						html+='￥<i>';
    						html+=arr[1];
    					};
    					html+='</i></h2></div><div class="mydiscountret"><p>';
    					if(data.lists[i].type==2){
    						html+='免运费';
    					};
    					if(data.lists[i].type==1){
    						var arr=data.lists[i].content.split("-");
    						html+='满<i>';
    						html+=arr[0];
    						html+='</i>可用';
    					};
    					html+='</p><input type="button" name="';
    					html+=data.lists[i].couponsid;
    					html+='" class="tebtn" value="使用"/></div></div>';
    				};
    				$("#disct").append(html);
    				$(".tebtn").click(function(){
    					
    					$(this).siblings("p").children("i").html();// Number($("#wholemin h1 span").html())
    					if($(this).siblings("p").children("i").length!=0){
    						if(Number($(this).siblings("p").children("i").html())<=Number(pic)){
    							var picmin=Number(nummun)-Number($(this).parent().siblings(".mydiscountlef").children("h2").children("i").html());
    							$("#wholemin h1 span").html(picmin);
    							couponId=$(this).attr("name");
    							$(".isquan").html($(this).parent().siblings(".mydiscountlef").children("h2").html());
    							$("#discount").hide();
    						}else{
    							gadget_popupt("购买金额不够不能使用此优惠券");
    						};
    					}else{
    						if(picvi<Number($("#agemax").html())){
    							$(".isquan").html($(this).parent().siblings(".mydiscountlef").children("h2").html());
    							$("#wholemin h1 span").html(pic);
    							$("#discount").hide();
    						}else{
    							gadget_popupt("当前价格已经包邮");
    						};
    					};
    					
    				});
    			};
    		},
    		error:function(){}
    	});
    	};
    $("#dispant").click(function(){
		$("#dispano").removeClass("dispan");
		$(this).attr("class","dispan");
		$(".mydiscount").remove();
		$.ajax({
			type:"GET",
			url:url+"/cli/coupons/getBySuid/"+sellus+"?mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var html='';
					for(var i=0;i<data.lists.length;i++){
						html+='<div class="mydiscount"><div class="mydiscountlef"><h2>';
    					if(data.lists[i].type==2){
    						html+='免运费';
    					};
    					if(data.lists[i].type==1){
    						var arr=data.lists[i].content.split("-");
    						html+='￥';
    						html+=arr[1];
    					};
    					html+='</h2></div><div class="mydiscountret"><p>';
    					if(data.lists[i].type==2){
    						html+='免运费';
    					};
    					if(data.lists[i].type==1){
    						var arr=data.lists[i].content.split("-");
    						html+='满';
    						html+=arr[0];
    						html+='可用';
    					};
    					html+='</p><input type="button" name="';
    					html+=data.lists[i].couponsid;
    					html+='" class="teobbtn" value="领取"/></div></div>';
					};
					$("#disct").append(html);
					$(".teobbtn").click(function(){
						var couponsid=$(this).attr("name");
						$.ajax({
							type:"POST",
							url:url+"/cli/coupons/insertCoupons/"+couponsid+"?token="+token+"&mintime="+new Date().getTime(),
							dataType:"json",
							success:function(data){
								gadget_login(data);
								if(data.code==1){
									gadget_popupt("领取成功");
								};
								if(data.code==-1){
									gadget_popupt(data.message);
								};
							},
							error:function(){
								
							}
						});
					});
				};
				
			},
			error:function(){
				
			}
		});
	});
	}
})
