$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	//var peoopoder=jQuery.parseJSON($.cookie('peoopoder'));
	var others=getUrlParamo("mes");
	var ages=getUrlParamo("e");
	
//	jQuery.parseJSON(jsonStr)
	$("#numbermin h1 a").attr("href","icen/order.html?number="+ages)
	$("#numbermin h1 a").html(ages);
	$.ajax({
		type:"GET",
		url:url+"/cli/order/getDetail/"+others,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var money=data.pojo.payment;
				var mode=data.pojo.paymenttype;
				//endaddr
				//"endaddr": "收货人=辽宁省-抚顺市-望花区2636=18783033333=666666",
				var endaddr=data.pojo.endaddr.split("=");
				
				//var addss=data.pojo.baseaddress+data.pojo.address;
				if(mode==11){
					mode="支付宝支付";
				};
				if(mode==12){
					mode="微信支付";
				};
				if(mode==2){
					mode="货到付款";
				};
				if(mode==3){
					mode="银行转账";
				};
				$("#money").html(money);
				$("#mode").html(mode);
				$("#addss").html(endaddr[1]);
			};
		},
		error:function(){
			
		}
	});
})
