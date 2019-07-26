$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var ordercode=getUrlParamo("e");
	var ordername=getUrlParamo("mes");
	var codename="找药吧-订单号"+ordercode;
	var orderid=getUrlParamo("i");
	ordername=decodeURI(ordername);
	gadget_back("请稍等...");
	$.ajax({
		type:"post",
		url:url+"/cli/order/geneernateWxCode/"+orderid+"?token="+token+"&orderCode="+ordercode+"&name="+codename+"&time="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_back_remove()
			if(data.code==1){
				//成功
				weibox(ordercode,ordername,data.message,data.other,$("#banner"),callback);
			}else if(data.code==-2){
				//已经付款
				gadget_popupfs("订单已经付款",2,-1,0,"返回上一页");
			}else{
				//订单号错误不能付款
				//gadget_popupfs("订单信息错误不能付款",2,-1,0,"返回上一页");
				if(data.other){
					switch(data.other){
						case "ORDERPAID":
							gadget_popupfs("订单已经付款",2,-1,0,"返回上一页");
							break;
						case "SYSTEMERROR":
							gadget_popupfs("请求超时，请刷新重试",2,0,0,"刷新");
							break;
						case "OUT_TRADE_NO_USED":
							gadget_popupfs("订单号重复，不能付款",2,-1,0,"返回上一页");
							break;
						default:
							gadget_popupfs("订单信息错误不能付款",2,-1,0,"返回上一页");
					};
				}else{
					gadget_popupfs("订单信息错误不能付款",2,-1,0,"返回上一页");
				}
			}
		},
		error:function(){
			gadget_back_remove();
			gadget_popupfs("网络错误，请刷新重试",2,0,0,"刷新");
		}
	});
var callback = function(){
	gadget_weix(ordercode,token,orderid);
};
function weibox(orcode,orname,orpay,orpic,$obj,callback){
	$("#weibox").remove();
	var html='<div id="weibox"><div id="wei_top"><div id="wei_top_l">';
	html+='<img src="'+ut+'/imgeas/logoa.jpg" />';
	html+='</div><div id="wei_top_shop"><p> 收 银 台</p></div></div><div id="wei_title">';
	html+='<div id="wei_title_le"><p>订单编号：';
	html+=orcode;
	html+='</p><p>商品名称：';
	html+=orname;
	html+='</p></div><div id="wei_title_ri"><p>应付金额:￥<span>';
	html+=orpay;
	html+='</span></p></div></div><div id="wei_banner"><div id="wei_ban_tab">';
	html+='<a class="wei_ban_tab_c">微信支付</a></div><div id="wei_ban_t_ban">';
	html+='<div id="wei_logo"><img src="'+ut+'/imgeas/WePayLogo.png" />';
	html+='</div><div id="wei_big_pic"><img src="';
	html+=orpic;
	html+='" />';
	html+='</div><div id="wei_min_pic"><img src="'+ut+'/imgeas/wxlang.png" />';
	html+='</div></div></div><a id="wei_footer">支付完成</a></div>';
	$obj.append(html)
	$("#wei_footer").click(function(){
		callback();
	});
}
	
	
	
	
	
})
