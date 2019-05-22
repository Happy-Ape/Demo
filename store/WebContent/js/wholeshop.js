$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	var orl="/cli/order/getTypeOrders/-5/";
	var datat={token:token,mintime:new Date().getTime(),isRefound:-1};
	//srelisk();
	var secode=getUrlParamo("code");
	if(secode!=""&&secode!=null){
		srelisk(secode);
	}else{
	$.ajax({
		type:"get",
		url:url+orl+open+"/"+str+renur(),
		data:datat,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				forlis(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyoipik").html(st);
					$("#isodangq").html("1");
				}else{
//					/formorlis
					gadget_err_m("暂无数据",$("#formorlis"));
					$(".cmaisop").hide();
				};
		},
		error:function(){
//			/gadget_popupt("请刷新重试");
			gadget_err_m("网络错误，请刷新重试",$("#formorlis"));
			$(".cmaisop").hide();
		}
	});
	};
	//下一页 
	$("#cmaisomop").click(function(){
		open=parseInt($("#isodangq").html())+1;
		if(open>$("#ismyoipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+orl+open+"/"+str+renur(),
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					forlis(data);
					$("#isodangq").html(open)
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
		open=parseInt($("#isodangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+orl+open+"/"+str+renur(),
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					forlis(data);
					$("#isodangq").html(open);
				}else{
					gadget_popupt("获取失败.")
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	$("#ismyotzan").click(function(){
		open=$(".cmaisop input[type='number']").val()
		if(open==""){
			return false;
		};
		if(open>$("#ismyoipik").html()){
			open=$("#ismyoipik").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+orl+open+"/"+str+renur(),
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#formorlisthf").remove();
					forlis(data);
					$("#isodangq").html(open)
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
	$(".oversous form").submit(function(){
		return false;
	}).keyup(function(e){
		if(e.keyCode==13){
			secode=$("#mytxt").val();
			srelisk(secode);
		};
	});
	$("#mybtn").click(function(){
		secode=$("#mytxt").val();
		srelisk(secode);
	});
	function srelisk(secode){
		
		var key=secode;
		if(key==""){
			return false;
		};
		//console.log(key+"key");
		datat={token:token,key:key,mintime:new Date().getTime(),isRefound:-1};
		open=1;
		orl="/cli/order/search/";
		$.ajax({
			type:"get",
			url:url+orl+open+"/"+str+renur(),
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_m_remv($("#formorlis"));
					$(".cmaisop").show();
					forlis(data);
					var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyoipik").html(st);
					$("#isodangq").html("1");
				}else{
					gadget_popupt("搜索失败");
				};
			},
			error:function(){
				gadget_popupt("请刷新重试");
			}
		});
	
	};
	function forlis(data){
		
		
				$("#formorlis .forminlist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="forminlist"><h5>订单号：<span>';
					html+=data.lists[i].ordercode;
					html+='</span>提交时间<span>';
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
					html+='</span>状态：<span>';
					/*订单锁定（-3）卖家取消（-2） 买家取消（-1）刚提交订单（0） 代发货（1)
					 * 卖家更新物流信息配送中 2取消订单 6已完成 3待评价-5全部*/
					if(data.lists[i].state==0){
						html+='新订单';
					};
					if(data.lists[i].state==1){
						html+='待发货';
					};
					if(data.lists[i].state==-1){
						html+='买家取消';
					};
					if(data.lists[i].state==-2){
						html+='卖家取消';
					};
					if(data.lists[i].state==2){
						html+='配送中';
					};
					
					if(data.lists[i].state==-3){
						html+='订单锁定';
					};
					if(data.lists[i].state==3){
						html+='等待评价';
					};
					if(data.lists[i].state==6){
						html+='已完成';
					};
					html+='</span></h5><h3>买家留言:<span>';
					if(data.lists[i].buyermessage==null){
						html+=" ";
					}else{
						html+=data.lists[i].buyermessage;
					};
					html+='</span></h3><div class="lismin"><table cellspacing="0" border="1">';
					html+='<thead><tr><th class="lismtd">图片</th><th class="lismaxb">商品</th>';
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
							html+='">';
							html+='<p>姓名：<span>';
							if(data.lists[i].endaddr==""||data.lists[i].endaddr==null){
								var endaddr=["--","--","--","--"];
							}else{
								var endaddr=data.lists[i].endaddr.split("=");
							};
							html+=endaddr[0];
							html+='</span></p><p>电话：<span>';
							html+=endaddr[2];
							html+='</span></p><p>邮编：<span>';
							html+=endaddr[3];
							html+='</span></p><p>地址：<span>';
							html+=endaddr[1];
							html+='</span></p></td>';
						};
						html+='</tr>';
					};
					html+='</tbody></table></div></div>';
				};
				$("#formorlis").append(html);
			
	};
	function renur(){
		if(orl=="/cli/order/search/"){
			return "";
		}else{
			return "/0/0";
		}
	};
})
