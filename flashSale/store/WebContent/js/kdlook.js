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
				var html='<p>订单号：<span>';
				html+=data.pojo.ordercode;
				pay_code=data.pojo.ordercode;
				pay_orderid=data.pojo.orderid;
				html+='</span>';
				html+='</p>';
				$("#banover").append(html);
				var htm='';
				htm+='<p><span>收货信息：</span>';
				var endaddr=data.pojo.endaddr.split("=");
				htm+='姓名：'+endaddr[0]+" 地址："+endaddr[1]+" 电话："+endaddr[2]+" 邮编："+endaddr[3];
				htm+='</p>';
				htm+='<p><span>配送方式：</span>';
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
				htm+='</p>';
				$("#addssr").append(htm);
				get_kd({"name":gadget_split(data.pojo.shippingname,",",1),"code":data.pojo.shippingcode})
				//get_kd({"name":"YD","code":"3959951110944"})
			}else{
				gadget_popupfs("暂无订单信息，是否返回上一页",2,-1,0,"返回上一页");
			};
		},
		error:function(){
			gadget_back_remove();
			gadget_popupfs("网络错误，请刷新重试",2,0,0,"刷新");
		}
	})

function get_kd(kd_o){
	gadget_err_m("请稍等...",$("#ordermo"),"80px",ut+"/imgeas/serch.gif");
	$.ajax({
		type:"get",
		url:url+"/other/order/queryShip?shipName="+kd_o.name+"&shipCode="+kd_o.code+"&time="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_m_remv($("#ordermo"));
			data=JSON.parse(data);
			if(data.Success==true&&data.State!=0){
					var html='';
					for(var i=0;i<data.Traces.length;i++){
						html+='<tr><td class="kd_o_td"><a class="kd_color ';
						if(i==data.Traces.length-1){
						html+='kd_last_a';
						};
						html+='"></a>';
						if(i!=data.Traces.length-1){
							html+='<a class="kd_hr"></a>';
						};
						html+='</td><td>';
						html+=data.Traces[i].AcceptTime;
						html+='</td><td>';
						html+=data.Traces[i].AcceptStation;
						html+='</td></tr>';
					};
					$("#kd_body").append(html);
			}else{
				gadget_err_m(data.Reason,$("#ordermo"),"80px");
			};
		},
		error:function(){
			gadget_m_remv($("#ordermo"));
			gadget_err_m("网络错误，请刷新重试",$("#ordermo"),"80px");
		}
	});
};

})
