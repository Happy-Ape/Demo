$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var orderId=getUrlParamo("i");
	var pay_code="";
	var pay_orderid="";
	var pay_cc="";
	var cds=0;
	var mestime=0;
	var begindate=0;
	gadget_back("加载中...");
	$.ajax({
		type:"GET",
		url:url+"/cli/order/getDetail/"+orderId,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_back_remove();
			gadget_login(data);
			if(data.code==1){
				$("#ordermo h5 span").html(data.pojo.sellerName);
				var html='<p>订单号：<span>';
				html+=data.pojo.ordercode;
				pay_code=data.pojo.ordercode;
				pay_orderid=data.pojo.orderid;
				html+='</span>订单状态：<span>';
				if(data.pojo.state==-1){
					html+='买家取消';
				};
				if(data.pojo.state==-2){
					html+='卖家取消';
				};
				if(data.pojo.state==-3){
					html+='订单锁定';
				};
				if(data.pojo.state==0){
					html+='等待确认';
				};
				if(data.pojo.state==1){
					html+='等待发货';
				};
				if(data.pojo.state==2){
					html+='等待收货';
				};
				if(data.pojo.state==6){
					html+='待评价';
				};
				if(data.pojo.state==7){
					html+='已完成';
				};
				html+='</span>';
				if(data.pojo.paymenttype==11||data.pojo.paymenttype==12){
					if(data.pojo.paymenttime==""||data.pojo.paymenttime==null||data.pojo.paymenttime==undefined){
							html+=' 支付情况：<span>未付款</span><a id="timstrion"></a>';
							if(data.pojo.state!=-1&&data.pojo.state!=-2&&data.pojo.state!=-3){
								cds=1;
								var begindate=Date.parse(new Date(data.pojo.createtime))/1000;
								var mestime=data.message/1000;
							}else{
								cds=0;
							};
						}else{
							html+=' 支付情况：<span>已付款</span>';
					};
				};
				html+='</p>';
				$("#banover").append(html);
				var htm='<p><span>创建时间：</span>';
				htm+=data.pojo.createtime;
				htm+='</p><p><span>收货信息：</span>';
				var endaddr=data.pojo.endaddr.split("=");
				htm+='姓名：'+endaddr[0]+" 地址："+endaddr[1]+" 电话："+endaddr[2]+" 邮编："+endaddr[3];
				htm+='</p><p><span>支付方式：</span>';
				if(data.pojo.paymenttype==11||data.pojo.paymenttype==12){
					htm+='在线支付：';
					if(data.pojo.paymenttype==11){
						htm+="支付宝";
					};
					if(data.pojo.paymenttype==12){
						htm+="微信支付";
					};
					//支付方式 1 在线支付 2货到付款 3银行转账
					if(data.pojo.paymenttime==""||data.pojo.paymenttime==null||data.pojo.paymenttime==undefined){
							htm+='<a class="topay">[去付款]</a><a class="havepay">[我已经付款]</a>';
							
						};
				};
				if(data.pojo.paymenttype==2){
					htm+='货到付款';
				};
				if(data.pojo.paymenttype==3){
					htm+='银行转账';
				};
				htm+='</p><p><span>配送方式：</span>';
				if(data.pojo.shippingname==null){
					data.pojo.shippingname="暂无";
				};
				htm+=gadget_split(data.pojo.shippingname,",",0);
				//htm+=data.pojo.shippingname;
				htm+=' <span>快递单号：</span>';
				if(data.pojo.shippingcode==null){
					data.pojo.shippingcode="暂无";
				};
				htm+=data.pojo.shippingcode;
				htm+='<a href="../kdlook.html?i='+data.pojo.orderid+'">查看物流</a></p><p><span>使用优惠券：</span>';
				if(data.pojo.couponid==0){
					htm+='--';
				}else{
					if(data.pojo.couponsContent==0){
						htm+='免运费';
					}else{
						htm+=data.pojo.couponsContent;
					};
				};
				
				htm+='</p><p><span>留言：</span>';
				if(data.pojo.buyermessage==null){
					data.pojo.buyermessage="--"
				};
				
				htm+=data.pojo.buyermessage;
				htm+='</p>';
				if(data.pojo.state==-1||data.pojo.state==-3){
					htm+='<p><span>理由：</span>';
					if(data.pojo.buyernick==null){
						data.pojo.buyernick="--";
					};
					htm+=data.pojo.buyernick;
					htm+='</p>';
				};
				if(data.pojo.state==-2){
					htm+='<p><span>理由：</span>';
					if(data.pojo.sellercancel==null){
						data.pojo.sellercancel="--";
					};
					htm+=data.pojo.sellercancel;
					htm+='</p>';
				};
				$("#addssr").append(htm);
				var htmn='';
				for(var i=0;i<data.pojo.details.length;i++){
					htmn+='<tr><td class="ormino"><img src="';
					htmn+=data.pojo.details[i].imagePath;
					htmn+='"/><p><a href="../Product.html?drugid='+data.pojo.details[i].drugid+'&selluserid='+data.pojo.details[i].selluserid+'">';
					htmn+=data.pojo.details[i].drugname;
					pay_cc+=data.pojo.details[i].drugname+",";
					htmn+='</a></p></td><td class="ormin">';
					htmn+=data.pojo.details[i].price;
					htmn+='</td><td class="ormin">';
					htmn+=data.pojo.details[i].num;
					htmn+='</td><td class="ormin">';
					htmn+=data.pojo.details[i].totalfee;
					htmn+='</td><td class="orminlas">';
					if(data.pojo.details[i].actcontent==null){
						data.pojo.details[i].actcontent="--"
					};
					htmn+=data.pojo.details[i].actcontent;
					htmn+='</td></tr>';
				};
				$("#tbody").append(htmn);
				$("#orderop span").html(data.pojo.payment);
				if(cds==1){
					if(86400-(mestime-begindate)>0){
						timer(86400-(mestime-begindate));
					}else{
						timer(0);
					};
					
				}else{
					$(".topay").hide();
				};
				$(".havepay").click(function(){
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
					var ctback=function(pay){
						if(pay.id==12){
							
							gadget_weix(pay_code,token,pay_orderid);
							
						};
						if(pay.id==11){
							gadget_zfb(token, pay_code, pay_orderid)
							
						};
					};
					gadget_pay(11,2,ctback,"请选择付款方式查询");
				});
				$(".topay").click(function(){
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
					var callbacks=function(pay){
						
						if(pay.id==12){
//							//微信
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
					gadget_pay(11,2,callbacks);
					
				});
			}else{
				gadget_popupfs("暂无订单信息，是否返回上一页",2,-1,0,"返回上一页");
			};
		},
		error:function(){
			gadget_back_remove();
			gadget_popupfs("网络错误，请刷新重试",2,0,0,"刷新");
		}
	})

function timer(intDiff){
    var selftim=window.setInterval(function(){
    var day=0,
        hour=0,
        minute=0,
        second=0;//时间默认值 
    if(intDiff > 0){
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
   // timhtml="还有"+day+"天"+hour+"小时"+minute+"分"+second+"秒";
  // console.log(timhtml)
  $("#timstrion").html("还有"+day+"天"+hour+"小时"+minute+"分"+second+"秒订单过期");
    intDiff--;
    if(intDiff<0){
    		//结束
    		$.ajax({
    			type:"get",
    			url:url+"/cli/order/cancel/"+orderId+"?token="+token+"&time="+new Date().getTime()
    			
    		});
    		$("#timstrion").html("订单已经过期");
    		$(".topay").hide();
    		window.clearInterval(selftim);
    	};
    }, 1000);
}

})
