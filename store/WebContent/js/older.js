$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var str=10;//等待发货订单
	var open="1";//等待发货订单当前页数
	var stor=10;//已取消订单
	var openo="1"//已取消订单
	var datat={token:token,mintime:new Date().getTime(),isRefound:-1};
	gadget_back("加载中...")
	$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/0/"+open+"/"+str+"/0/0",
		data:datat,
		dataType:"json",
		success:function(data){
			gadget_back_remove()
			gadget_login(data);
			if(data.code==1){
				var dat="收货地址";
				formorlist(data,dat);
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
					gadget_popups("暂无订单信息");
					$(".cmaisp").hide();
				};
		},
		error:function(){
			gadget_back_remove()
			gadget_popupfs("网络错误，请刷新重试",2,0,"取消","刷新");
			$(".cmaisp").hide();
		}
	});
	//下一页 
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/order/getTypeOrders/0/"+open+"/"+str+"/0/0",
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var dat="收货地址";
				formorlist(data,dat);
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
			url:url+"/cli/order/getTypeOrders/0/"+open+"/"+str+"/0/0",
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var dat="收货地址";
				formorlist(data,dat);
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
			url:url+"/cli/order/getTypeOrders/0/"+open+"/"+str,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					var dat="收货地址";
					formorlist(data,dat);
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
	$("#formdiv").keyup(function(e){
		if(e.keyCode==13){
			serlisd();
		};
	});
	$("#ismybtn").click(function(){
		serlisd();
	});
	function serlisd(){
		
		if($("#ismytxt").val()==""){
			return false;
		};
		var orderCode=$("#ismytxt").val();
		$.ajax({
			type:"get",
			url:url+"/cli/order/suquery/"+orderCode,
			data:{token:token},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					formorlist(data);
					$("#ismyipik").html("1");
					$("#isdangq").html("1");
				}else{
					$(".forminlist").remove();
					$("#formorlist").append("<h4 id='formorlisthf'>没有找到o(︶︿︶)o</h4>");
				};
				
			},
			error:function(){
				$(".forminlist").remove();
				$("#formorlist").append("<h4 id='formorlisthf'>搜索失败，请刷新重试o(︶︿︶)o</h4>");
			}
		});
	
	};
	function formorlist(data,dat){
		if(dat==null||dat==undefined){
			dat="收货地址"
		};
				$(".forminlist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="forminlist" name="';
					html+=data.lists[i].orderid;
					html+='"><h5>订单号：<span>';
					html+=data.lists[i].ordercode;
					html+='</span>时间<span>';
					html+=data.lists[i].createtime;
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
					html+='</span>';
					if(data.lists[i].paymenttype==11||data.lists[i].paymenttype==12){
						if(data.lists[i].paymenttime==""||data.lists[i].paymenttime==null||data.lists[i].paymenttime==undefined){
							html+='<input type="button" value="取消订单" class="myobtn" name="myobtn">';
						}else{
							html+='<input type="button" value="确认订单" class="mybtn" name="mybtn">';
							html+='<input type="button" value="取消订单" class="myobtn" name="myobtn">';
						};
					}else{
						html+='<input type="button" value="确认订单" class="mybtn" name="mybtn">';
						html+='<input type="button" value="取消订单" class="myobtn" name="myobtn">';
					};
					
					html+='</h5>';
					html+='<h3>买家留言:<span>';
					if(data.lists[i].buyermessage==null){
						html+=" ";
					}else{
						html+=data.lists[i].buyermessage;
					};
					html+='</span></h3>';
					html+='<div class="lismin">';
					html+='<table cellspacing="0" border="1"><thead><tr><th class="lismtd">图片</th>';
					html+='<th>商品</th><th class="lismtd">数量</th><th class="lismtd">价格(元)</th>';
					html+='<th>备注</th><th class="lismaxb">合计(元)<th class="lismaxb">';
					html+=dat;
					html+='</th></tr></thead><tbody>';
					for(var c=0;c<data.lists[i].details.length;c++){
						html+='<tr><td class="lismtd"><img src="';
						html+=data.lists[i].details[c].imagePath;
						html+='"/></td><td><a href="../Product.html?drugid='+data.lists[i].details[c].drugid+'&selluserid='+data.lists[i].details[c].selluserid+'">';
						html+=data.lists[i].details[c].drugname;
						html+='</a></td><td class="lismtd">';
						html+=data.lists[i].details[c].num;
						html+='</td><td class="lismtd">';
						html+=data.lists[i].details[c].price;
						html+='</td><td>';
						if(data.lists[i].details[c].actcontent==null||data.lists[i].details[c].actcontent==""){
							html+=" ";
						}else{
							html+=data.lists[i].details[c].actcontent;
						};
						html+='</td>';
						if(c==0){
							html+='<td rowspan="';
							html+=data.lists[i].details.length;
							html+='" class="lismaxb">';
							
							html+=data.lists[i].payment;
							html+='</td><td rowspan="';
							html+=data.lists[i].details.length;
							html+='">';
							
							if(data.lists[i].endaddr==""||data.lists[i].endaddr==null){
								var endaddr="--";
							}else{
								var endaddr=data.lists[i].endaddr.split("=");
							};
							html+=endaddr[1];
							html+='</td>';
						};
						
						html+='</tr>';
					};
					
					html+='</tbody></table></div><div class="isqxlang"><div class="isqxxx">';
					html+='<img src="../imgeas/chac.png" /></div><p class="isqxlangp">库存不足无法发货</p>';
					html+='<p>快递无法到达该地区</p><input type="text" placeholder="填写其他原因"/><br>';
					html+='<input type="button" class="putbutton" value="确认取消"/></div></div>';
				};
				$("#formorlist").append(html);
			$(".mybtn").click(function(){
				//确认订单
				var orderId=$(this).parents(".forminlist").attr("name");
				$.ajax({
					type:"post",
					url:url+"/cli/order/update/"+orderId+"?token="+token+"&state=1&mintime="+new Date().getTime(),
					dataType:"json",
					success:function(data){
						gadget_login(data);
						if(data.code==1){
							gadget_popups("确认订单成功");
							setTimeout(gadget_relo,3000);
						}else{
							gadget_popups("确认订单失败");
						};
					},
					error:function(){
						gadget_popups("确认失败,请刷新重试");
					}
				});
			});
			$(".myobtn").click(function(){
				//取消订单
				
				$(this).parents(".forminlist").children(".isqxlang").show();
				
				return false;
				
			
				
			});
			$(".isqxxx").click(function(){
				$(this).parent(".isqxlang").hide();
			});
			$(".isqxlang p").click(function(){
				$(this).siblings("input[type='text']").val($(this).html());
			});
			$(".putbutton").click(function(){
				var buyernick=$(this).siblings("input[type='text']").val();
				var orderId=$(this).parents(".forminlist").attr("name");
				if(buyernick==""){
					gadget_popupt("取消理由不能为空");
					return false;
				};
				///order//sellCancel/{orderId}
				$.ajax({
					type:"get",
					url:url+"/cli/order/sellCancel/"+orderId,
					data:{token:token,sellerCancel:buyernick,mintime:new Date().getTime()},
					dataType:"json",
					success:function(data){
						gadget_login(data);
						if(data.code==1){
							gadget_popups("已取消订单");
							setTimeout(gadget_relo,3000);
						}else{
							gadget_popups("取消订单失败");
						};
					},
					error:function(){
						gadget_popups("取消失败,请刷新重试");
					}
				});
			});
	};
})
