$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var str=10;
	var open="1";
	gadget_back("加载中...");
	$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/2/"+open+"/"+str+"/0/0",
		data:{token:token,mintime:new Date().getTime(),isRefound:-1},
		dataType:"json",
		success:function(data){
			gadget_back_remove()
			gadget_login(data);
			if(data.code==1){
			forlist(data);
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
				gadget_err_m("暂无数据",$("#formorlist"))
			};
		},
		error:function(){
			gadget_back_remove()
			$(".cmaisp").hide();
			gadget_err_m("网络错误，请刷新重试",$("#formorlist"))
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
			url:url+"/cli/order/getTypeOrders/2/"+open+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					forlist(data);
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
			url:url+"/cli/order/getTypeOrders/2/"+open+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					forlist(data);
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
			url:url+"/cli/order/getTypeOrders/2/"+open+"/"+str+"/0/0",
			data:{token:token,mintime:new Date().getTime(),isRefound:-1},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					forlist(data);
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
	function forlist(data){
				$("#formorlist .forminlist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="forminlist"><h5>订单号：<span>';
					html+=data.lists[i].ordercode;
					html+='</span>时间<span>';
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
					html+='</span></h5><h3>快递名称：<span>';
					html+=gadget_split(data.lists[i].shippingname,",",0);
					//html+=data.lists[i].shippingname;
					html+='</span>快递单号：<span>';
					html+=data.lists[i].shippingcode;
					html+='</span><a target="_blank" href="../kdlook.html?i='+data.lists[i].orderid+'">查看物流>></a></h3><h3>买家留言:<span>';
					if(data.lists[i].buyermessage==null){
						html+=" ";
					}else{
						html+=data.lists[i].buyermessage;
					};
					html+='</span></h3><div class="lismin"><table cellspacing="0" border="1"><thead>';
					html+='<tr><th class="lismtd">图片</th><th class="lismaxb">商品</th>';
					html+='<th class="lismtd">数量</th><th class="lismtd">价格</th><th>备注</th>';
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
					html+='</tbody></table></div></div>';
				};
				$("#formorlist").append(html);
			
	};
	
})
