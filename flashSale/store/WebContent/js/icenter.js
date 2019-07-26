$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	if(token==""||token==null){
		window.location.href="../login.html";
	};
	
	$.ajax({
		type:"get",
		url:url+"/cli/endUser/getInf",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				if(data.pojo.endname==""||data.pojo.endname==null){
					data.pojo.endname="****";
				};
				$(".icenbannc").html(data.pojo.endname);
				//icenbanrz
				if(data.pojo.state!=-1){
					if(data.pojo.state==1){
						$(".icenbanrz").html("已认证").attr("title","如无法使用功能，请重新登录或联系客服");
					};
					if(data.pojo.state==2){
						$(".icenbanrz").html("已禁用");
					};
					if(data.pojo.state==-2){
						$(".icenbanrz").html("未通过审核");
					};
					$(".icenbanrz").css("background-color","#FF9900");
					var fba=data.pojo.growthvalue;
					imgsr(fba);
					$("#buyname").html(data.pojo.endphonenum);
					if(data.other==null||data.other==""){
						data.other=0;
					};
					$("#buycoupon").html(data.other);
					if(data.pojo.integral==null||data.pojo.integral==""){
						data.pojo.integral=0;
					};
					$("#buyintegral").html(data.pojo.integral);
				};
			};
		},
		error:function(){
			
		}
	});
	$.ajax({
		type:"get",
		url:url+"/cli/order/endOrderNum",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var message=data.message.split(";");
				var html='';
				for(var t=0;t<message.length-1;t++){
					var age=message[t].split(":");
					if(age[0]==0){
						html+='<div class="icenbanxs"><h3>';
						html+='<a href="order.html?id=0" class="icenorder">';
						html+=age[1];
						html+='</a></h3><p>';
						html+='刚提交订单';
						html+='</p></div>';
					};
					if(age[0]==1){
						html+='<div class="icenbanxs"><h3>';
						html+='<a href="order.html?id=1" class="icenorder">';
						html+=age[1];
						html+='</a></h3><p>';
						html+='待发货订单';
						html+='</p></div>';
					};
					if(age[0]==-1){
						html+='<div class="icenbanxs"><h3>';
						html+='<a href="order.html?id=-1" class="icenorder">';
						html+=age[1];
						html+='</a></h3><p>';
						html+='买家取消订单';
						html+='</p></div>';
					};
					if(age[0]==2){
						html+='<div class="icenbanxs"><h3>';
						html+='<a href="order.html?id=2" class="icenorder">';
						html+=age[1];
						html+='</a></h3><p>';
						html+='待收货订单';
						html+='</p></div>';
					};
					if(age[0]==-2){
						html+='<div class="icenbanxs"><h3>';
						html+='<a href="order.html?id=-2" class="icenorder">';
						html+=age[1];
						html+='</a></h3><p>';
						html+='卖家取消订单';
						html+='</p></div>';
					};
					if(age[0]==-3){
						html+='<div class="icenbanxs"><h3>';
						html+='<a href="order.html?id=-3" class="icenorder">';
						html+=age[1];
						html+='</a></h3><p>';
						html+='已锁定订单';
						html+='</p></div>';
					};
					if(age[0]==6){
						html+='<div class="icenbanxs"><h3>';
						html+='<a href="order.html?id=6" class="icenorder">';
						html+=age[1];
						html+='</a></h3><p>';
						html+='等待评价订单';
						html+='</p></div>';
					};
					if(age[0]==7){
						html+='<div class="icenbanxs"><h3>';
						html+='<a href="order.html?id=7" class="icenorder">';
						html+=age[1];
						html+='</a></h3><p>';
						html+='已完成订单';
						html+='</p></div>';
					};
				};
				$(".icenbanbot .icenbantp").after(html);
			};
		},
		error:function(){
			
		}
	});
	
	
	
	function imgsr(fba){
		var orderfba=0;
		$(".icensjd").html("当前成长值"+fba);
		if(fba<=10){
			$("#buyerimg").attr("src","../imgeas/buyer/br1.gif");
			
		};
		if(fba>=11&&fba<=40){
			$("#buyerimg").attr("src","../imgeas/buyer/br2.gif");
			
		};
		if(fba>=41&&fba<=90){
			$("#buyerimg").attr("src","../imgeas/buyer/br3.gif");
			
		};
		if(fba>=91&&fba<=150){
			$("#buyerimg").attr("src","../imgeas/buyer/br4.gif");
			
		};
		if(fba>=151&&fba<=250){
			$("#buyerimg").attr("src","../imgeas/buyer/br5.gif");
			
		};
		if(fba>=251&&fba<=500){
			$("#buyerimg").attr("src","../imgeas/buyer/b1.gif");
			
		};
		if(fba>=501&&fba<=1000){
			$("#buyerimg").attr("src","../imgeas/buyer/b2.gif");
			
		};
		if(fba>=1001&&fba<=2000){
			$("#buyerimg").attr("src","../imgeas/buyer/b3.gif");
			
		};
		if(fba>=2001&&fba<=5000){
			$("#buyerimg").attr("src","../imgeas/buyer/b4.gif");
			
		};
		if(fba>=5001&&fba<=10000){
			$("#buyerimg").attr("src","../imgeas/buyer/b5.gif");
			
		};
		if(fba>=10001&&fba<=20000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc1.gif");
			
		};
		if(fba>=20001&&fba<=50000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc2.gif");
			
		};
		if(fba>=50001&&fba<=100000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc3.gif");
			
		};
		if(fba>=100001&&fba<=200000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc4.gif");
			
		};
		if(fba>=200001&&fba<=500000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc5.gif");
			
		};
		if(fba>=500001&&fba<=1000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr1.gif");
			
		};
		if(fba>=1000001&&fba<=2000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr2.gif");
			
		};
		if(fba>=2000001&&fba<=5000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr3.gif");
			
		};
		if(fba>=5000001&&fba<=10000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr4.gif");
			
		};
		if(fba>10000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr5.gif");
			
		};
		
		
		
	};
	
})
