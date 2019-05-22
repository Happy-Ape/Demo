$(function(){
	jQuery.support.cors = true;

	var token=$.cookie('peoplemessage');
	var open=1;
	var opens=1;
	var openf=1;
	var str=10;
	var ststre=6;
	$("#oversouson").click(function(){
		$(this).attr("class","oversouspan");
		$("#oversoustw").removeClass("oversouspan");
		$("#oversoussor").removeClass("oversouspan");
		$("#oversoustws").removeClass("oversouspan");
		$("#overlist").hide();
		$("#overliss").hide();
		$("#overlis").show();
	});
	$("#oversoustw").click(function(){
		ststre=6;
		$(this).attr("class","oversouspan");
		$("#oversouson").removeClass("oversouspan");
		$("#oversoussor").removeClass("oversouspan");
		$("#oversoustws").removeClass("oversouspan");
		$("#overlis").hide();
		$("#overliss").hide();
		$("#overlist").show();
		$("#formorlist .forminlist").remove();
		owlis(ststre);
	});
	$("#oversoustws").click(function(){
		ststre=7;
		$(this).attr("class","oversouspan");
		$("#oversouson").removeClass("oversouspan");
		$("#oversoussor").removeClass("oversouspan");
		$("#oversoustw").removeClass("oversouspan");
		$("#overlis").hide();
		$("#overliss").hide();
		$("#overlist").show();
		$("#formorlist .forminlist").remove();
		owlis(ststre);
	});
	$("#oversoussor").click(function(){
		$(this).attr("class","oversouspan");
		$("#oversouson").removeClass("oversouspan");
		$("#oversoustw").removeClass("oversouspan");
		$("#oversoustws").removeClass("oversouspan");
		$("#overlis").hide();
		$("#overlist").hide();
		$("#overliss").show();
	});
	owlis(ststre);
	function owlis(ststre){
		$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/"+ststre+"/"+open+"/"+str+"/0/0",
		data:{token:token,mintime:new Date().getTime(),isRefound:-1},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				gadget_m_remv($("#formorlist"));
				formorlist(data);
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
					//formorlist
					gadget_err_m("暂无数据",$("#formorlist"))
				}
				
		},
		error:function(){
			gadget_err_m("暂无数据",$("#formorlist"))
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
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/"+ststre+"/"+open+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					formorlist(data);
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
			url:url+"/cli/order/getTypeOrders/"+ststre+"/"+open+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					formorlist(data);
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
			url:url+"/cli/order/getTypeOrders/"+ststre+"/"+open+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					formorlist(data);
					$("#isdangq").html(open)
				}else{
					$(".forminlist").remove();
					$("#formorlist").append("<h4 id='formorlisthf'>没有新订单o(︶︿︶)o</h4>");
					//alert("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	function formorlist(data){
				$("#formorlist .forminlist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="forminlist"><h5>订单号：<span>';
					html+=data.lists[i].ordercode;
					html+='</span>时间<span>';
					html+=data.lists[i].endtime;
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
					html+='</span></h5><h3>快递名称：<span>';
					html+=gadget_split(data.lists[i].shippingname,",",0);
					html+='</span>快递单号：<span>';
					html+=data.lists[i].shippingcode;
					
					html+='</span><a>';
					if(data.lists[i].state==6){
						html+='[订单已完成]';
					};
					if(data.lists[i].state==7){
						html+='[订单已评价]';
					};
					
					html+='</a> <a target="_blank" href="../kdlook.html?i='+data.lists[i].orderid+'"> 查看物流>></a></h3><h3>买家留言:<span>';
					if(data.lists[i].buyermessage==null){
						html+=" ";
					}else{
						html+=data.lists[i].buyermessage;
					};
					html+='</span></h3><div class="lismin"><table cellspacing="0" border="1"><thead><tr>';
					html+='<th class="lismtd">图片</th><th class="lismaxb">商品</th><th class="lismtd">数量</th>';
					html+='<th class="lismtd">价格</th><th>备注</th><th class="lismaxb">合计</th><th>收货地址</th>';
					html+='</tr></thead><tbody>';
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
					
					html+='</tbody></table></div></div>';
				};
				$("#formorlist").append(html);
			
	};
	$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/-2/"+opens+"/"+str+"/0/0",
		data:{token:token,mintime:new Date().getTime(),isRefound:-1},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var seller=1;
				oversoussor(data,seller);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyoipik").html(st);
					$("#isodangq").html("1");
			};
		},
		error:function(){
			
		}
	});
	//下一页 
	$("#cmaisomop").click(function(){
		opens=parseInt($("#isodangq").html())+1;
		if(opens>$("#ismyoipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-2/"+opens+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var seller=1;
					oversoussor(data,seller);
					$("#isodangq").html(opens);
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
	$("#cmaisompa").click(function(){
		opens=parseInt($("#isodangq").html())-1;
		if(opens<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-2/"+opens+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var seller=1;
					oversoussor(data,seller);
					$("#isodangq").html(opens);
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
		if(opens>$("#ismyoipik").html()){
			opens=$("#ismyoipik").html();
		};
		if(opens<"1"){
			opens="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-2/"+opens+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					var seller=1;
					oversoussor(data,seller);
					$("#isodangq").html(opens);
				}else{
					$(".forminlist").remove();
					$("#formorlist").append("<h4 id='formorlisthf'>没有新订单o(︶︿︶)o</h4>");
					//alert("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	function oversoussor(data,seller){
		if(seller==1){
			$("#formorlis .forminlist").remove();
		}else{
			$("#formorliss .forminlist").remove();
		};
		var html='';
		for(var i=0;i<data.lists.length;i++){
					html+='<div class="forminlist"><h5>订单号：<span>';
					html+=data.lists[i].ordercode;
					html+='</span>时间<span>';
					html+=data.lists[i].closetime;
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
					html+='</span></h5>';
					html+='<h3>买家留言:<span>';
					if(data.lists[i].buyermessage==null){
						html+=" ";
					}else{
						html+=data.lists[i].buyermessage;
					};
					html+='</span><a>[已取消]</a></h3><div class="lismin"><table cellspacing="0" border="1"><thead><tr>';
					html+='<th class="lismtd">图片</th><th class="lismaxb">商品</th><th class="lismtd">数量</th>';
					html+='<th class="lismtd">价格</th><th>备注</th><th class="lismaxb">合计</th><th>取消理由</th>';
					html+='</tr></thead><tbody>';
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
						
						if(seller==1){
							if(data.lists[i].sellercancel==null){
								data.lists[i].sellercancel=" ";
							};
							html+=data.lists[i].sellercancel;
						}else{
							if(data.lists[i].buyernick==null){
								data.lists[i].buyernick=" ";
							};
							html+=data.lists[i].buyernick;
						};
						html+='</td>';
					};
					html+='</tr>';
					};
					html+='</tbody></table></div></div>';
		};
		
		if(seller==1){
			$("#formorlis").append(html);
		}else{
			$("#formorliss").append(html);
		};
	};
	$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/-1/"+openf+"/"+str+"/0/0",
		data:{token:token,mintime:new Date().getTime(),isRefound:-1},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var seller=0;
				oversoussor(data,seller);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismysipik").html(st);
					$("#issdangq").html("1");
			};
		},
		error:function(){
			
		}
	});
	//下一页 
	$("#cmaissmop").click(function(){
		openf=parseInt($("#issdangq").html())+1;
		if(openf>$("#ismysipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-1/"+openf+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var seller=0;
					oversoussor(data,seller);
					$("#issdangq").html(openf);
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
	$("#cmaissmpa").click(function(){
		openf=parseInt($("#issdangq").html())-1;
		if(openf<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-1/"+openf+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var seller=0;
					oversoussor(data,seller);
					$("#issdangq").html(openf);
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
		if(openf>$("#ismysipik").html()){
			openf=$("#ismysipik").html();
		};
		if(openf<"1"){
			openf="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/-1/"+openf+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					var seller=0;
					oversoussor(data,seller);
					$("#issdangq").html(openf);
				}else{
					$(".forminlist").remove();
					$("#formorlist").append("<h4 id='formorlisthf'>没有新订单o(︶︿︶)o</h4>");
					//alert("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
})








