$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	if(token==null){
		location.href="../login.html";
	};
	/*Math.formatFloat = function(f, digit){ 
    var m = Math.pow(10, digit); 
    return parseInt(f * m, 10) / m; 
};
	console.log(0.1+0.2);
	console.log(Math.formatFloat(0.1 + 0.2, 1));*/
	
	var open="1";
	var str="10";//每页条数
	//var open="";//当前页数
	var key="";
	var datat={token:token,mintime:new Date().getTime(),isRefound:-1};
	var ordurl="/cli/order/getMO/1/"+open+"/"+str;
	var coder="1";
	var state="0";
	var values=getUrlParamo("id");
	var numbers=decodeURI(getUrlParamo("number"));
	if(values==null){
		values=9;
	}
	if((/^(\+|-)?\d+$/.test(numbers))&&numbers>0){
		values="a";
	};
	if(values==9){
		$("#forpo a").eq(0).addClass("forpom");
		$(".orrdmin").remove();
		coder="1";
		open="1";
		ordurl="/cli/order/getMO/1/"+open+"/"+str;
		ajlist();
	}else if(values==-1||values==0||values==1||values==2||values==-2||values==-3||values==6||values==7||values==4||values==5){
		var ispay=0;
		var ordertype=0;
		state=values;
		if(values==7){
			$("#forpo a").eq(1).addClass("forpom");
		};
		if(values==4){
			$("#forpo a").eq(2).addClass("forpom");
			ispay=-1;
			ordertype=1;
			state=-5;
		};
		if(values==5){
			$("#forpo a").eq(3).addClass("forpom");
			ispay=1;
			ordertype=1;
			state=-5;
		};
		if(values==6){
			$("#forpo a").eq(4).addClass("forpom");
		};
		if(values==2){
			$("#forpo a").eq(5).addClass("forpom");
		};
		if(values==0){
			$("#forpo a").eq(6).addClass("forpom");
		};
		if(values==1){
			$("#forpo a").eq(7).addClass("forpom");
		};
		if(values==-1){
			$("#forpo a").eq(8).addClass("forpom");
		};
		if(values==-2){
			$("#forpo a").eq(9).addClass("forpom");
		};
		if(values==-3){
			$("#forpo a").eq(10).addClass("forpom");
		};
		open="1";
		coder="2";
		//console.log(ispay+"ispay")
		//console.log(ordertype+"ordertype")
		//console.log(state+"state")
		ordurl="/cli/order/getTypeOrders/"+state+"/"+open+"/"+str+"/"+ispay+"/"+ordertype;
		ajlist();
	}else {
		if(numbers!=""&&numbers!=null){
			key=numbers;
			//alert(key.length);
			$(".orrdmin").remove();
			open="1";
			datat={token:token,key:key,mintime:new Date().getTime(),isRefound:-1};
			ordurl="/cli/order/search/"+open+"/"+str;
			coder="3";
			ajlist();
		}else{
			$("#forpo a").eq(0).addClass("forpom");
			$(".orrdmin").remove();
			coder="1";
			open="1";
			ordurl="/cli/order/getMO/1/"+open+"/"+str;
			ajlist();
		};
	};
	
	//点击搜索
	$("#mysubmit").click(function(){
		key=$(".myforiin").val();
		if(key==""){
			return false;
		};
		window.location.href="order.html?number="+encodeURI(key);
	});
	$("#myform").keyup(function(e){
		if(e.keyCode==13){
			key=$(".myforiin").val();
			if(key==""){
				return false;
			};
			window.location.href="order.html?number="+encodeURI(key);
		};
	}).submit(function(){
		return false;
	});
	//ajlist();
	function ajlist(){
		$('html,body').animate({scrollTop:$("body").offset().top}, 500);
		//console.log(ordurl+"ordurl");
		$("#orrdserch p").html("加载中...");
		$("#serpic img").attr("src","../imgeas/serch.gif");
		$("#orrdserch").show();
	$.ajax({
		type:"GET",
		url:url+ordurl,
		data:datat,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$("#orrdserch").hide();
				$(".orrdmin").remove();
				restmore(data);
				if(data.message==null){
					data.message=0;
				};
					var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
					$("#ismyipik").html("0");
					$("#isdangq").html("0");
					$("#orrdserch p").html("暂无列表");
					$("#serpic img").attr("src","../imgeas/error.png");
			};
			
		},
		error:function(){
			$("#orrdserch p").html("加载失败，请刷新重试");
			$("#serpic img").attr("src","../imgeas/error.png");
		}
	});	
	};
	
	//下一页
	$("#cmaismop").click(function(){
		
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		
		if(coder=="1"){
			ordurl="/cli/order/getMO/1/"+open+"/"+str;
		};
		if(coder=="2"){
			ordurl="/cli/order/getTypeOrders/"+state+"/"+open+"/"+str+"/"+ispay+"/"+ordertype;
		};
		if(coder=="3"){
			ordurl="/order/search/"+open+"/"+str;
		};
		$("#orrdserch p").html("加载中...");
		$("#serpic img").attr("src","../imgeas/serch.gif");
		$("#orrdserch").show();
		$('html,body').animate({scrollTop:$("body").offset().top}, 500);
		$.ajax({
			type:"GET",
			url:url+ordurl,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#orrdserch").hide();
					$(".orrdmin").remove();
					restmore(data);
					$("#isdangq").html(open)
				}else{
					//alert("获取失败.")
					$("#orrdserch p").html("暂无列表");
					$("#serpic img").attr("src","../imgeas/error.png");
				}
			},
			error:function(){
				//alert("获取失败")
				$("#orrdserch p").html("加载失败，请刷新重试");
			    $("#serpic img").attr("src","../imgeas/error.png");
			}
		});
	})
	//上一页
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		if(coder=="1"){
			ordurl="/cli/order/getMO/1/"+open+"/"+str;
		};
		if(coder=="2"){
			ordurl="/cli/order/getTypeOrders/"+state+"/"+open+"/"+str+"/"+ispay+"/"+ordertype;
		};
		$("#orrdserch p").html("加载中...");
		$("#serpic img").attr("src","../imgeas/serch.gif");
		$("#orrdserch").show();
		$('html,body').animate({scrollTop:$("body").offset().top}, 500);
		$.ajax({
			type:"GET",
			url:url+ordurl,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#orrdserch").hide();
					$(".orrdmin").remove();
					restmore(data);
					$("#isdangq").html(open);
				}else{
					//alert("获取失败.")
					$("#orrdserch p").html("暂无列表");
					$("#serpic img").attr("src","../imgeas/error.png");
				}
			},
			error:function(){
				//alert("获取失败")
				$("#orrdserch p").html("加载失败，请刷新重试");
			    $("#serpic img").attr("src","../imgeas/error.png");
			}
		});
	});
	//跳转
	$("#ismytzan").click(function(){
		open=$(".cmaisp input[type='number']").val()
		if(open==""){
			return false;
		};
		if(open>$("#ismyipik").html()){
			open=$("#ismyipik").html();
		};
		if(open<"1"){
			open="1";
		};
		if(coder=="1"){
			ordurl="/cli/order/getMO/1/"+open+"/"+str;
		};
		if(coder=="2"){
			ordurl="/cli/order/getTypeOrders/"+state+"/"+open+"/"+str+"/"+ispay+"/"+ordertype;
		};
		$("#orrdserch p").html("加载中...");
		$("#serpic img").attr("src","../imgeas/serch.gif");
		$("#orrdserch").show();
		$('html,body').animate({scrollTop:$("body").offset().top}, 500);
		$.ajax({
			type:"GET",
			url:url+ordurl,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#orrdserch").hide();
					$(".orrdmin").remove();
					restmore(data);
					$("#isdangq").html(open)
				}else{
					//alert("获取失败.")
					$("#orrdserch p").html("暂无列表");
					$("#serpic img").attr("src","../imgeas/error.png");
				}
			},
			error:function(){
				//alert("获取失败")
				$("#orrdserch p").html("加载失败，请刷新重试");
			    $("#serpic img").attr("src","../imgeas/error.png");
			}
		});
	});
	function restmore(data){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="orrdmin">';
					if(data.lists[i].state==0||data.lists[i].state==1||data.lists[i].state==2){
						html+='<div class="removor"><div class="rexx"><img src="../imgeas/chac.png" /></div>';
						html+='<h3>取消理由</h3><p>不想买了</p><p>买错了</p>';
						html+='<form name="';
						html+=data.lists[i].orderid;
						html+='"><input type="text" maxlength="100" class="overtxt"/><br><input type="button" class="btnover" value="提交"/></form></div>';
					};
					html+='<p class="orrdminp">';
					html+='<span>订单号：';
					html+=data.lists[i].ordercode;
					html+='</span><span>';
					html+=data.lists[i].createtime;
					html+='</span>';
					if(data.lists[i].paymenttype==11||data.lists[i].paymenttype==12){
						if(data.lists[i].paymenttime==""||data.lists[i].paymenttime==null||data.lists[i].paymenttime==undefined){
							if(data.lists[i].state!=-1&&data.lists[i].state!=-2&&data.lists[i].state!=-3){
									html+='<span class="spicolor coloro" name="'+data.lists[i].ordercode+'"><a class="topay" as="'+data.lists[i].orderid+'">去付款</a></span>';
							}else{
								html+='<span class="spicolor colort" name="'+data.lists[i].ordercode+'">未付款</span>';
							};
						}else{
							html+='<span class="spicolor colors" name="'+data.lists[i].ordercode+'">已付款</span>';
						};
					}else{
						html+='<span class="spicolor colorf" name="'+data.lists[i].ordercode+'">货到付款</span>';
					};
					html+='</p><div class="orrdminri"><p class="minp">';
					if(data.lists[i].state==-1){
						html+='买家取消';
					};
					if(data.lists[i].state==0){
						html+='等待卖家确认';
						html+='<p><a class="remorder">取消订单</a></p>';
					};
					if(data.lists[i].state==1){
						html+='等待发货';
						html+='<p><a class="remorder">取消订单</a></p>';
					};
					if(data.lists[i].state==2){
						html+='配送中</p><p><a target="_blank" href="../kdlook.html?i='+data.lists[i].orderid+'">查看物流</a></p>';
						html+='<p><a class="shopmov">确认收货</a><p></p>';
					};
					if(data.lists[i].state==-2){
						html+='卖家取消</p>';
					};
					if(data.lists[i].state==-3){
						html+='订单锁定</p>';
					};
					if(data.lists[i].state==6){
						html+='等待评价</p><p><a target="_blank" href="../kdlook.html?i='+data.lists[i].orderid+'">查看物流</a></p>';
						html+='<p><a class="remarkSeller" name="';
						html+=data.lists[i].orderid;
						html+='" href="remarkSeller.html?i='+data.lists[i].orderid+'">去评价</a></p>';
						if(data.lists[i].hasaftersale==0||data.lists[i].hasaftersale==undefined){
							html+='<p><a class="terolder" data_a="'+data.lists[i].orderid+'">确认订单</a></p>';
						};
					};
					if(data.lists[i].state==7){
						html+='已评价</p><p><a target="_blank" href="../kdlook.html?i='+data.lists[i].orderid+'">查看物流</a></p>';
						if(data.lists[i].hasaftersale==0||data.lists[i].hasaftersale==undefined){
							html+='<p><a class="terolder" data_a="'+data.lists[i].orderid+'">确认订单</a></p>';
						};
					};
					if(data.lists[i].state==-1||data.lists[i].state==-2){
						if(data.lists[i].paymenttime){
							html+='<p><a class="notpay" data_a="'+data.lists[i].orderid+'">退款详情</a></p>';
						};
							
					};
					html+='<p><a class="orrdmina" name="';
					html+=data.lists[i].orderid;
					html+='" href="orderdetails.html?i='+data.lists[i].orderid+'">订单详情</a></p>';
					
					html+='</div>';
					for(var c=0;c<data.lists[i].details.length;c++){
						html+='<div class="orrdminv"><div class="orrdmino">';
						html+='<div class="orrdimg"><img src="';
						html+=data.lists[i].details[c].imagePath;
						html+='" /></div><div class="orrdp"><p><a href="../Product.html?drugid='+data.lists[i].details[c].drugid+'&selluserid='+data.lists[i].details[c].selluserid+'">';
						html+=data.lists[i].details[c].drugname;
						html+='</a></p>';
						if(data.lists[i].state==6||data.lists[i].state==7){
							if(timeleft(data.other,data.lists[i].endtime)==true){
								if(data.lists[i].details[c].isaftersale!=1&&data.lists[i].details[c].isaftersale!=-2&&data.lists[i].details[c].isaftersale!=-1&&data.lists[i].details[c].isaftersale!=2&&data.lists[i].details[c].isaftersale!=3&&data.lists[i].details[c].isaftersale!=4&&data.lists[i].details[c].isaftersale!=5){
									if(data.lists[i].hasaftersale==-1){
										html+='<p>已确认</p>';
										//hasaftersale
									}else {
										html+='<p><a style="color:red" href="customerservice.html?orderid='+data.lists[i].orderid+'&sell='+data.lists[i].details[c].selluserid+'&drug='+data.lists[i].details[c].drugid;
										html+='">申请退货</a></p>';
									};
								};
								//1审核通过 2买家已发货 3卖家确认收货 4 同意退货 5拒绝 -1取消 -2 审核不通过
								if(data.lists[i].details[c].isaftersale==-1){
									html+='<p><a style="color:red"';
									html+='">已申请退货</a></p>';
								};
								if(data.lists[i].details[c].isaftersale==1){
									html+='<p><a style="color:red"';
									html+='">已申请退货:同意退货</a></p>';
								};
								if(data.lists[i].details[c].isaftersale==-2){
									html+='<p><a style="color:red"' ;
									html+='">已申请退货：拒绝退货</a></p>';
								};
								if(data.lists[i].details[c].isaftersale==2){
									html+='<p><a style="color:red"' ;
									html+='">已申请退货：买家已发货</a></p>';
								};
								if(data.lists[i].details[c].isaftersale==3){
									html+='<p><a style="color:red"' ;
									html+='">已申请退货：卖家确认收货</a></p>';
								};
								if(data.lists[i].details[c].isaftersale==4){
									html+='<p><a style="color:red"' ;
									html+='">已申请退货：同意退款</a></p>';
								};
								if(data.lists[i].details[c].isaftersale==5){
									html+='<p><a style="color:red"';
									html+='">已申请退货：拒绝退款</a></p>';
								};
							};
						};
						html+='</div></div><div class="orrdmint"><p>';
						html+=data.lists[i].details[c].price;
						html+='</p></div><div class="orrdmins"><p>';
						html+=data.lists[i].details[c].num;
						html+='</p></div>';
						html+='<div class="orrdminf"><p>';
						/*if(data.lists[i].state==3){
							html+='<p><a class="remarkSeller" name="';
							html+=data.lists[i].orderid;
							html+='" href="remarkSeller.html">去评价</a></p>';
						};*/
						html+=data.lists[i].details[c].actcontent;
						html+='</p>'
						
						html+='</div></div>';
					};
					html+='</div>';
				};
				$("#orrdmore").append(html);
				/*$(".orrdmina").click(function(){
					var peoopoder={"orderid":$(this).attr("name")};
					$.cookie("peoopoder",JSON.stringify(peoopoder),{path:"/"});
				});*/
				
				$(".notpay").click(function(){
			var order_id=$(this).attr("data_a");
			$.ajax({
				type:"get",
				url:url+"/cli/order/getDetail/"+order_id+"?token="+token+"&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					if(data.code==1){
						var txtb='<table cellpadding="0" cellspacing="0" border="0"><tbody id="mybo_or">';
						txtb+='<tr><td class="mybo_or_a">订单号：</td><td class="mybo_or_b"><a target="_blank" href="order.html?number='+data.pojo.ordercode+'">'+data.pojo.ordercode+'</a></td></tr>';
						txtb+='<tr><td class="mybo_or_a">退款金额：</td><td class="mybo_or_b">'+data.pojo.payment+'元</td></tr>';
						txtb+='<tr><td class="mybo_or_a">通过时间：</td><td class="mybo_or_b">'+data.pojo.createtime+'</td></tr>';
						txtb+='<tr><td class="mybo_or_a">退款状态：</td><td class="mybo_or_b">';
						if(data.pojo.isbalance==1){
							txtb+='退款成功';
						}else{
							txtb+='退款中';
						};
						txtb+='</td></tr>';
						if(data.pojo.isbalance==1){
							txtb+='<tr><td class="mybo_or_a">完成时间：</td><td class="mybo_or_b">'+data.pojo.balancetime+'</td></tr>';
						};
						txtb+='</tbody></table>';
						gadget_popup_c("退款详情",["确定"],txtb)
					}else{
						gadget_popupt("暂无详细信息");
					}
				},
				error:function(){
					gadget_popupt("网络错误请刷新重试");
				}
			});
		});
				$(".terolder").click(function(){
					var txta='<h5 style="text-align: center;font-size: 14px;line-height: 30px;">是否确认订单？</h5><br><p style="font-size: 12px">注：确认操作后该订单将不能使用售后服务</p>';
					
					var order_id=$(this).attr("data_a");
					var terolderv=function(){
						gadget_back("请稍等...");
						$.ajax({
							type:"get",
							url:url+"/cli/order/orderConfirm/"+order_id+"?token="+token+"&hasaftersale=-1&time="+new Date().getTime(),
							dataType:"json",
							success:function(data){
								gadget_back_remove();
								if(data.code==1){
									gadget_popupf("确认成功",0);
								}else{
									gadget_popups("确认失败");
								};
							},
							error:function(){
								gadget_back_remove();
								gadget_popupfs("确认失败，网络错误请刷新重试",0,2,"刷新","");
								
							}
						});
					};
					gadget_popupfsev(txta,function(){},terolderv);
				});
				$(".topay").click(function(){
					var pay_orderid=$(this).attr("as");
					var pay_code=$(this).parent("span").attr("name");
					var pay_name=$(this).parents(".orrdminp").siblings(".orrdminv");
					var pay_cc="";
					for(var i=0;i<pay_name.length;i++){
						pay_cc+=pay_name.eq(i).children(".orrdmino").children(".orrdp").children("p").children("a").html()+",";
					};
					if(pay_orderid==""||pay_orderid==null||pay_orderid==undefined){
						gadget_popupfs("订单id错误，请刷新重试",2,0,0,"刷新");
						return false;
					};
					if(pay_code==""||pay_code==null||pay_code==undefined){
						gadget_popupfs("订单号错误，请刷新重试",2,0,0,"刷新");
						return false;
					};
					if(pay_cc==""||pay_cc==null||pay_cc==undefined){
						gadget_popupfs("商品信息错误，请刷新重试",2,0,0,"刷新");
						return false;
					};
					pay_cc=pay_cc.substring(0,pay_cc.length-1);
					var callback=function(pay){
						if(pay.id==12){
							//微信支付
							pay_cc=encodeURI(pay_cc);
							window.location.href=ut+"/weixinpay.html?e="+pay_code+"&i="+pay_orderid+"&mes="+pay_cc;
						};
						if(pay.id==11){
							//支付宝
						var valo={
							"action":"http://192.168./create_direct_pay_by_user-JAVA-UTF-8/alipayapi.jsp",
							"inputs":[
								["show_url",ut+"/icen/order.html"],
								["WIDsubject",pay_cc],
								["WIDbody",pay_code],
								["token",token],
								["type","2"],
								["order_id",pay_orderid]
								]
							};
							formsubmitli(valo);
						}
					};
					gadget_pay(11,2,callback);
				});
				/*$(".topaywei").click(function(){
					
				})*/
				
				$(".remorder").click(function(){
					$(this).parents(".orrdmin").children(".removor").show();
				});
				$(".rexx").click(function(){
					$(this).parent(".removor").hide();
				});
				$(".removor p").click(function(){
					$(this).siblings("form").children(".overtxt").val($(this).html());
				});
				$(".shopmov").click(function(){
					//orrdmina
					var orderId=$(this).parent("p").siblings("p").children(".orrdmina").attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/order/endConfirm/"+orderId,
						data:{token:token,state:6,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popups("确认成功,订单已完成");
								setTimeout(gadget_relo,3000);
							};
						},
						error:function(){
							gadget_popups("网络错误，请刷新重试");
						}
					});
					
				});
				$(".btnover").click(function(){
					
					var orderId=$(this).parent("form").attr("name");
					var cancelReason=$(this).siblings(".overtxt").val();
					if(cancelReason==""){
						gadget_popupt("取消理由不能为空");
						return false;
					};
					$.ajax({
						type:"get",
						url:url+"/cli/order/cancel/"+orderId,
						data:{token:token,cancelReason:cancelReason,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								if(data.message){
									gadget_popupt("提交成功,"+data.message);
								}else{
									gadget_popupt("提交成功");
								};
								setTimeout(gadget_relo,3000);
							};
						},
						error:function(){
							gadget_popupt("网络错误，请重试");
						}
					});
				});
			};
function timeleft(timeo,timet){
	//1491977499665 2017-03-15 09:38:51
	if(timeo-Date.parse(new Date(timet))>604800000){
		return false;
	}else{
		return true;
	};
};
			
			
		
})
