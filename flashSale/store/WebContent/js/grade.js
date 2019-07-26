$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	
	function imgsr(fba){
		var orderfba=0;
		$(".icensjd").html("当前成长值"+fba);
		
		if(fba<=10){
			$("#buyerimg").attr("src","../imgeas/buyer/br1.gif");
			$(".icendjtmin").css("width",fba/10*100+"%");
			orderfba=11-fba;
		};
		if(fba>=11&&fba<=40){
			$("#buyerimg").attr("src","../imgeas/buyer/br2.gif");
			$(".icendjtmin").css("width",fba/40*100+"%");
			orderfba=41-fba;
		};
		if(fba>=41&&fba<=90){
			$("#buyerimg").attr("src","../imgeas/buyer/br3.gif");
			$(".icendjtmin").css("width",fba/90*100+"%");
			orderfba=91-fba;
		};
		if(fba>=91&&fba<=150){
			$("#buyerimg").attr("src","../imgeas/buyer/br4.gif");
			$(".icendjtmin").css("width",fba/150*100+"%");
			orderfba=151-fba;
		};
		if(fba>=151&&fba<=250){
			$("#buyerimg").attr("src","../imgeas/buyer/br5.gif");
			$(".icendjtmin").css("width",fba/250*100+"%");
			orderfba=251-fba;
		};
		if(fba>=251&&fba<=500){
			$("#buyerimg").attr("src","../imgeas/buyer/b1.gif");
			$(".icendjtmin").css("width",fba/500*100+"%");
			orderfba=501-fba;
		};
		if(fba>=501&&fba<=1000){
			$("#buyerimg").attr("src","../imgeas/buyer/b2.gif");
			$(".icendjtmin").css("width",fba/1000*100+"%");
			orderfba=1001-fba;
		};
		if(fba>=1001&&fba<=2000){
			$("#buyerimg").attr("src","../imgeas/buyer/b3.gif");
			$(".icendjtmin").css("width",fba/2000*100+"%");
			orderfba=2001-fba;
		};
		if(fba>=2001&&fba<=5000){
			$("#buyerimg").attr("src","../imgeas/buyer/b4.gif");
			$(".icendjtmin").css("width",fba/5000*100+"%");
			orderfba=5001-fba;
		};
		if(fba>=5001&&fba<=10000){
			$("#buyerimg").attr("src","../imgeas/buyer/b5.gif");
			$(".icendjtmin").css("width",fba/10000*100+"%");
			orderfba=10001-fba;
		};
		if(fba>=10001&&fba<=20000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc1.gif");
			$(".icendjtmin").css("width",fba/20000*100+"%");
			orderfba=20001-fba;
		};
		if(fba>=20001&&fba<=50000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc2.gif");
			$(".icendjtmin").css("width",fba/50000*100+"%");
			orderfba=50001-fba;
		};
		if(fba>=50001&&fba<=100000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc3.gif");
			$(".icendjtmin").css("width",fba/100000*100+"%");
			orderfba=100001-fba;
		};
		if(fba>=100001&&fba<=200000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc4.gif");
			$(".icendjtmin").css("width",fba/200000*100+"%");
			orderfba=200001-fba;
		};
		if(fba>=200001&&fba<=500000){
			$("#buyerimg").attr("src","../imgeas/buyer/bc5.gif");
			$(".icendjtmin").css("width",fba/500000*100+"%");
			orderfba=500001-fba;
		};
		if(fba>=500001&&fba<=1000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr1.gif");
			$(".icendjtmin").css("width",fba/1000000*100+"%");
			orderfba=1000001-fba;
		};
		if(fba>=1000001&&fba<=2000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr2.gif");
			$(".icendjtmin").css("width",fba/2000000*100+"%");
			orderfba=2000001-fba;
		};
		if(fba>=2000001&&fba<=5000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr3.gif");
			$(".icendjtmin").css("width",fba/5000000*100+"%");
			orderfba=5000001-fba;
		};
		if(fba>=5000001&&fba<=10000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr4.gif");
			$(".icendjtmin").css("width",fba/10000000*100+"%");
			orderfba=10000000-fba;
		};
		if(fba>10000000){
			$("#buyerimg").attr("src","../imgeas/buyer/bcr5.gif");
			$(".icendjtmin").css("width",fba/200000000*100+"%");
			orderfba=200000000-fba;
		};
		
		$(".icendjtmin").attr("title","还差"+orderfba+"成长值升级");
		
	};
	
	
	$.ajax({
		type:"get",
		url:url+"/cli/eg/getAll/"+open+"/"+str,
		data:{token:token,mintine:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				mytbody(data);
				var fba=data.other;
				imgsr(fba);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			};
			
		},
		error:function(){
			
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
			type:"get",
			url:url+"/cli/eg/getAll/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					mytbody(data);
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
			url:url+"/cli/eg/getAll/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					mytbody(data);
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
			url:url+"/cli/eg/getAll/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					mytbody(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("获取失败.")
				};
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	function mytbody(data){
				$("#mytbody tr").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<tr><td>';
					html+=data.lists[i].gettime;
					html+='</td><td>';
					html+=data.lists[i].getgrowth;
					html+='</td><td>';
					html+=data.lists[i].after;
					html+='</td><td>';
					if(data.lists[i].type==1){
						html+="订单完成获得";
					};
					if(data.lists[i].type==2){
						html+="评价完成获得";
					};
					html+='</td><td>';
					html+=data.lists[i].remark;
					html+='</td></tr>';
				};
				$("#mytbody").append(html);
			
	};
	
})
