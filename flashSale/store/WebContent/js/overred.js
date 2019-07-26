$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var str=10;
	var open="1";//当前页数
	var opens="1";//当前页数
	var openf="1";//当前页数
	$("#oversouson").click(function(){
		$(this).attr("class","oversouspan");
		$("#oversoustw").removeClass("oversouspan");
		$("#oversoussor").removeClass("oversouspan");
		$("#overlist").hide();
		$("#overliss").hide();
		$("#overlis").show();
	});
	$("#oversoustw").click(function(){
		$(this).attr("class","oversouspan");
		$("#oversouson").removeClass("oversouspan");
		$("#oversoussor").removeClass("oversouspan");
		$("#overlis").hide();
		$("#overliss").hide();
		$("#overlist").show();
	});
	$("#oversoussor").click(function(){
		$(this).attr("class","oversouspan");
		$("#oversouson").removeClass("oversouspan");
		$("#oversoustw").removeClass("oversouspan");
		$("#overlis").hide();
		$("#overlist").hide();
		$("#overliss").show();
	});
	//等待发货订单 codebtn
	gadget_back("加载中...");
	$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/1/"+open+"/"+str+"/0/0",
		data:{token:token,mintime:new Date().getTime(),isRefound:-1},
		dataType:"json",
		success:function(data){
			gadget_back_remove()
			gadget_login(data);
			if(data.code==1){
				holder(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
				}else{
					$(".cmaisp").hide();
					$("#formorlist .error_m").show();
					$("#formorlist .error_m p").html("暂无数据");
				};
		},
		error:function(){
			gadget_back_remove()
			$(".cmaisp").hide();
			$("#formorlist .error_m").show();
			$("#formorlist .error_m p").html("网络错误，请刷新重试");
		}
	});
	
	//已取消订单 -1买家取消
	$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/-3/"+openf+"/"+str+"/0/0",
		data:{token:token,mintime:new Date().getTime(),isRefound:-1},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				forlistf(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#issmyipik").html(st);
					$("#isdansgq").html("1");
			}else{
				$(".cmaissp").hide();
				$("#formorlisth .error_m").show();
				$("#formorlisth .error_m p").html("暂无数据");
			}
		},
		error:function(){
			$(".cmaissp").hide();
			$("#formorlisth .error_m").show();
			$("#formorlisth .error_m p").html("暂无数据");
		}
	});
	//下一页 买家取消
	$("#cmaissmop").click(function(){
		openf=parseInt($("#isdansgq").html())+1;
		if(openf>$("#issmyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-3/"+openf+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					forlistf(data);
					$("#isdansgq").html(openf);
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	//上一页
	$("#cmaissmpa").click(function(){
		openf=parseInt($("#isdansgq").html())-1;
		if(openf<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-3/"+openf+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					forlistf(data);
					$("#isdansgq").html(openf);
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
	$("#ismystzan").click(function(){
		
		openf=$(".cmaissp input[type='number']").val()
		if(openf==""){
			return false;
		};
		if(openf>$("#issmyipik").html()){
			openf=$("#issmyipik").html();
		};
		if(openf<"1"){
			openf="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-3/"+openf+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					
					forlistf(data);
					$("#isdansgq").html(openf);
				}else{
					$("#formorlist").remove();
					$("#overliss #formorlist").append("<h4 id='formorlisthf'>没有新订单o(︶︿︶)o</h4>");
					//alert("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	function forlistf(data){
				$("#overliss .forminlist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="forminlist" name="';
					html+=data.lists[i].orderid;
					html+='"><h5>订单号：<span>';
					html+=data.lists[i].ordercode;
					html+='</span>取消时间<span>';
					html+=data.lists[i].updatetime;
					html+='</span>类型：<span>';
					if(data.lists[i].paymenttype==11||data.lists[i].paymenttype==12){
						if(data.lists[i].paymenttime==""||data.lists[i].paymenttime==null||data.lists[i].paymenttime==undefined){
							html+='在线支付-未付款';
						}else{
							html+="在线支付-已付款";
						};
					};
					if(data.lists[i].paymenttype==2){
						html+='货到付款';
					};
					if(data.lists[i].paymenttype==3){
						html+='银行转账';
					};
					html+='</span>状态：<span>订单锁定</span><input type="button" class="myokbtn" value="确认取消" name="mybtn"></h5>';
					html+='<h3>买家留言:<span>';
					if(data.lists[i].buyermessage==null){
						html+=" ";
					}else{
						html+=data.lists[i].buyermessage;
					};
					html+='</span></h3><div class="lismin"><table cellspacing="0" border="1">';
					html+='<thead><tr><th class="lismtd">图片</th><th class="lismaxb">商品</th>';
					html+='<th class="lismtd">数量</th><th class="lismtd">价格</th><th>备注</th>';
					html+='<th class="lismaxb">合计</th><th>取消理由</th></tr></thead><tbody>';
					for(var c=0;c<data.lists[i].details.length;c++){
						html+='<tr><td class="lismtd"><img src="';
						html+=data.lists[i].details[c].imagePath;
						html+='"/></td><td class="lismaxb"><a href="../Product.html?drugid='+data.lists[i].details[c].drugid+'&selluserid='+data.lists[i].details[c].selluserid+'">';
						html+=data.lists[i].details[c].drugname;
						html+='</a></td><td class="lismtd">';
						html+=data.lists[i].details[c].num;
						html+='</td><td class="lismtd">';
						html+=data.lists[i].details[c].price;
						html+='</td><td>';
						html+=data.lists[i].details[c].actcontent;
						html+='</td>';
						if(c==0){
							html+='<td rowspan="';
							html+=data.lists[i].details.length;
							html+='" class="lismaxb">';
							html+=data.lists[i].payment;
							html+='</td><td rowspan="';
							html+=data.lists[i].details.length;
							html+='">';
							if(data.lists[i].buyernick==null){
								data.lists[i].buyernick=" ";
							};
							html+=data.lists[i].buyernick;
							html+='</td>';
						};
						html+='</tr>';
					};
					html+='</tbody></table></div></div>';
				};
				$("#overliss #formorlisth").append(html);
				$(".myokbtn").click(function(){
					//卖家确认取消
					var orderId=$(this).parents(".forminlist").attr("name");
					$.ajax({
						type:"post",
						url:url+"/cli/order/update/"+orderId+"?token="+token+"&state=-2&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("确认取消成功");
								setTimeout(gadget_relo,3000);
							};
						},
						error:function(XMLHttpRequest,textStatus,errorThrown){
							console.log(XMLHttpRequest);
            				console.log(textStatus);
            				console.log(errorThrown);
						}
					});
				});
			
	};
	//下一页 卖家取消
	$("#cmaiosmop").click(function(){
		opens=parseInt($("#isdanogq").html())+1;
		if(opens>$("#isomyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-2/"+opens+"/"+str,
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					//$("#overlist #formorlist .forminlists").remove();
					forlist(data);
					$("#isdanogq").html(opens);
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	//上一页
	$("#cmaiosmpa").click(function(){
		opens=parseInt($("#isdanogq").html())-1;
		if(opens<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-2/"+opens+"/"+str,
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					forlist(data);
					$("#isdanogq").html(opens);
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
	$("#ismyotzan").click(function(){
		opens=$(".cmaisop input[type='number']").val()
		if(opens==""){
			return false;
		};
		if(opens>$("#isomyipik").html()){
			opens=$("#isomyipik").html();
		};
		if(opens<"1"){
			opens="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-2/"+opens+"/"+str,
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					forlist(data);
					$("#isdanogq").html(opens);
				}else{
					$("#formorlist").remove();
					$("#overlist #formorlist").append("<h4 id='formorlisthf'>没有新订单o(︶︿︶)o</h4>");
					//alert("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	function forlist(data){
				$("#overlist .forminlist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="forminlist"><h5>订单号：<span>';
					html+=data.lists[i].ordercode;
					html+='</span>取消时间<span>';
					html+=data.lists[i].updatetime;
					html+='</span>类型：<span>';
					if(data.lists[i].paymenttype==11||data.lists[i].paymenttype==12){
						if(data.lists[i].paymenttime==""||data.lists[i].paymenttime==null||data.lists[i].paymenttime==undefined){
							html+='在线支付-未付款';
						}else{
							html+="在线支付-已付款";
						};
					};
					if(data.lists[i].paymenttype==2){
						html+='货到付款';
					};
					if(data.lists[i].paymenttype==3){
						html+='银行转账';
					};
					html+='</span>当前状态：<span class="onsp">';
					html+='等待买家确认';
					html+='</span></h5><h3>买家留言:<span>';
					if(data.lists[i].buyermessage==null){
						html+=" ";
					}else{
						html+=data.lists[i].buyermessage;
					};
					html+='</span></h3><div class="lismin"><table cellspacing="0" border="1">';
					html+='<thead><tr><th class="lismtd">图片</th><th class="lismaxb">商品</th>';
					html+='<th class="lismtd">数量</th><th class="lismtd">单价</th><th>备注</th>';
					html+='<th class="lismaxb">合计</th><th>取消理由</th></tr></thead><tbody>';
					
					for(var c=0;c<data.lists[i].details.length;c++){
						html+='<tr>';
						html+='<td class="lismtd"><img src="';
						html+=data.lists[i].details[c].imagePath;
						html+='"/></td><td class="lismaxb"><a href="../Product.html?drugid='+data.lists[i].details[c].drugid+'&selluserid='+data.lists[i].details[c].selluserid+'">';
						html+=data.lists[i].details[c].drugname;
						html+='</a></td><td class="lismtd">';
						html+=data.lists[i].details[c].num;
						html+='</td><td class="lismtd">';
						html+=data.lists[i].details[c].price;
						html+='</td>';
						html+='<td>';
						html+=data.lists[i].details[c].actcontent;
						html+='</td>';
						if(c==0){
							html+='<td rowspan="';
							html+=data.lists[i].details.length;
							html+='" class="lismaxb">';
							html+=data.lists[i].payment;
							html+='</td><td rowspan="';
							html+=data.lists[i].details.length;
							html+='">';
							if(data.lists[i].sellercancel==null){
								data.lists[i].sellercancel=" ";
							};
							html+=data.lists[i].sellercancel;
							html+='</td>';
						};
						html+='</tr>';
					};
					html+='</tbody></table></div></div>';
				};
				$("#overlist #formorlists").append(html);
			
	};
	//下一页 
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/1/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					holder(data);
					$("#isdangq").html(open)
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
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/1/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					holder(data);
					$("#isdangq").html(open);
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
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/1/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					holder(data);
					$("#isdangq").html(open)
				}else{
					$(".forminlist").remove();
					$("#formorlist").append("<h4 id='formorlisthf'>没有新订单o(︶︿︶)o</h4>");
					//alert("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	function holder(data){
				$("#overlis #formorlist .forminlist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="forminlist" name="';
					html+=data.lists[i].orderid;
					html+='"><h5>订单号：<span>';
					html+=data.lists[i].ordercode;
					html+='</span>确认时间<span>';
					html+=data.lists[i].updatetime;
					html+='</span>类型：<span>';
					if(data.lists[i].paymenttype==11||data.lists[i].paymenttype==12){
						if(data.lists[i].paymenttime==""||data.lists[i].paymenttime==null||data.lists[i].paymenttime==undefined){
							html+='在线支付-未付款';
						}else{
							html+="在线支付-已付款";
						};
					};
					if(data.lists[i].paymenttype==2){
						html+='货到付款';
					};
					if(data.lists[i].paymenttype==3){
						html+='银行转账';
					};
					
					html+='</span><input type="button" class="mycodebtn" value="确认发货" name="mybtn"></h5>';
					html+='<h3>买家留言:<span>';
					if(data.lists[i].buyermessage==null){
						html+=" ";
					}else{
						html+=data.lists[i].buyermessage;
					};
					html+='</span></h3><div class="lismin"><table cellspacing="0" border="1">';
					html+='<thead><tr><th class="lismtd">图片</th><th class="lismaxb">商品</th>';
					html+='<th class="lismtd">数量</th><th class="lismtd">单价</th><th>备注</th>';
					html+='<th class="lismaxb">合计</th><th>收货地址</th></tr></thead><tbody>';
					for(var c=0;c<data.lists[i].details.length;c++){
						html+='<tr><td class="lismtd"><img src="';
						html+=data.lists[i].details[c].imagePath;
						html+='"/></td><td class="lismaxb"><a href="../Product.html?drugid='+data.lists[i].details[c].drugid+'&selluserid='+data.lists[i].details[c].selluserid+'">';
						html+=data.lists[i].details[c].drugname;
						html+='</a></td><td class="lismtd">';
						html+=data.lists[i].details[c].num;
						html+='</td><td class="lismtd">';
						html+=data.lists[i].details[c].price;
						html+='</td><td>';
						html+=data.lists[i].details[c].actcontent;
						html+='</td>';
						if(c==0){
							html+='<td rowspan="';
							html+=data.lists[i].details.length;
							html+='" class="lismaxb">';
							html+=data.lists[i].payment;
							html+='</td><td rowspan="';
							html+=data.lists[i].details.length;
							html+='"><p>姓名:<span>';
							if(data.lists[i].endaddr==""||data.lists[i].endaddr==null){
								var endaddr=["--","--","--","--"];
							}else{
								var endaddr=data.lists[i].endaddr.split("=");
							};
							html+=endaddr[0];
							html+='</span></p><p>邮编:<span>';
							html+=endaddr[3];
							html+='</span></p><p>电话:<span>';
							html+=endaddr[2];
							html+='</span></p><p>地址:<span>';
							html+=endaddr[1];
							html+='</span></p></td>';
						};
						html+='</tr>';
					};
					
					html+='</tbody></table>';
					html+='</div><div class="shopcode"><div class="isxx"><img src="../imgeas/chac.png" />';
					html+='</div><form><span>快递名称:</span>';
					html+='<select class="textplace mysels"></select>';
					//html+='<input class="textplace" type="text" placeholder="快递名称"/>';
					html+='<br>';
					html+='<span>快递单号:</span><input type="text" class="textholder" placeholder="快递单号"/><br>';
					html+='<input type="button" value="确认" class="codebtn"/></form></div></div>';
				};
				$("#overlis #formorlist").append(html);
				expresslook({"obj":$(".mysels")});
			
				$(".isxx").click(function(){
					$(this).parent(".shopcode").hide();
				});
				$(".mycodebtn").click(function(){
					$(this).parents(".forminlist").children(".shopcode").show();
				});
				$(".textholder").keyup(function(){
					$(this).val($(this).val().replace(/[^\w\.\/]/ig,''))
				});
				$(".codebtn").click(function(){
					var shippingname=$(this).siblings(".textplace").val();
					var shippingcode=$(this).siblings(".textholder").val();
					var orderid=$(this).parents(".forminlist").attr("name");
						
					if(shippingname==""){
						gadget_popupt("请选择快递名称");
						return false;
					};
					if(shippingcode==""){
						gadget_popupt("请填写快递单号");
						return false;
					};
					if(orderid==""){
						gadget_popupt("订单id有误，无法确认，请刷新重试");
						return false;
					};
					var exmore=expresslook({"id":shippingname});
					
					gadget_back("请稍等...");
					$.ajax({
						type:"get",
						url:url+"/other/order/queryShip?shipName="+exmore.eg+"&shipCode="+shippingcode+"&time="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							$("#gadget_back").remove();
							data=JSON.parse(data);
							if(data.Success==true){
								if(data.State==0){
									gadget_popups(data.Reason+"请稍后重试");
								}else{
									potord();
								};
							}else{
								gadget_popups(data.Reason);
							};
						},
						error:function(){
							$("#gadget_back").remove();
							gadget_popups("网络错误，请刷新重试");
						}
					});
					
					function potord(){
						gadget_back("请稍等...");
					shippingname=exmore.name+","+exmore.eg;
					shippingname=encodeURI(shippingname);
					shippingcode=encodeURI(shippingcode);
					$.ajax({
						type:"post",
						url:url+"/cli/order/update/"+orderid+"?token="+token+"&state=2&shippingcode="+shippingcode+"&shippingname="+shippingname+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							$("#gadget_back").remove();
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("确认成功");
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popupt("确认失败");
							};
						},
						error:function(){
							$("#gadget_back").remove();
							gadget_popupt("确认失败.");
						}
					});
					};
				});
			
	};
})
