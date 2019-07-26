$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	var state=0;
	$('#myuxx').click(function(){
		$("#bigimg").hide();
	});
	$("#mylis h4 span").click(function(){
		$(this).addClass("selet");
		$(this).siblings("span").removeClass("selet");
		open=1;
		if($(this).index()==0){
			state=0;
			mylism(open,state);
		};
		if($(this).index()==1){
			state=1;
			mylism(open,state);
		};
		if($(this).index()==2){
			state=-2;
			mylism(open,state);
		};
		//-1 -2 0 1
		if($(this).index()==3){
			state=-1;
			mylism(open,state);
		};
		if($(this).index()==4){
			state=2;
			mylism(open,state);
		};
		if($(this).index()==5){
			state=3;
			mylism(open,state);
		};
		if($(this).index()==6){
			state=4;
			mylism(open,state);
		};
		if($(this).index()==7){
			state=5;
			mylism(open,state);
		};
		$("#errpic_m").hide();
	});
	mylism(open,state);
	function mylism(open,state){
	$.ajax({
		type:"get",
		url:url+"/cli/aftersale/query/"+state+"/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$(".cmaisp").show();
				backlist(data);
				if(data.message==null){
					data.message=0;
				};
					var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
				
			}else{
				$(".backlis").remove();
				$(".cmaisp").hide();
				$("#errpic_m p").html("暂无数据");
				$("#errpic_m").show();
			};
		},
		error:function(){
			$("#errpic_m p").html("网络错误，请刷新重试");
			$("#errpic_m").show();
			$(".cmaisp").hide();
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
			url:url+"/cli/aftersale/query/"+state+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					
					backlist(data);
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
			url:url+"/cli/aftersale/query/"+state+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					backlist(data);
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
		open=Number($(".cmaisp input[type='number']").val());
		if(open==""){
			return false;
		};
		if(open>Number($("#ismyipik").html())){
			open=$("#ismyipik").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/aftersale/query/"+state+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					backlist(data);
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
	function backlist(data){
		
			$(".backlis").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="backlis" name="';
					html+=data.lists[i].aftersaleid;
					html+='">';
					if(data.lists[i].state==0){
						html+='<span class="backgo">同意退货</span><span class="backnot">拒绝退货</span>';
						html+='<div class="myter"><div class="terxx"><img src="../imgeas/chac.png';
						html+='" /></div><p>拒绝通过原因</p><textarea maxlength="100"></textarea><p class="mytersp">确定</p></div>';
					};
					if(data.lists[i].state==2){
						html+='<span class="car_enter car_shp" data_a="'+data.lists[i].aftersaleid+'">确认收货</span>';
					};
					if(data.lists[i].state==3){
						html+='<span class="car_enter car_shpt" data_a="'+data.lists[i].aftersaleid+'">同意退款</span>';
						html+='<span class="car_enter car_shps" data_a="'+data.lists[i].aftersaleid+'">拒绝退款</span>';
					};
					html+='<div class="backlishea"><h5>商品名：';
					html+=data.lists[i].drugName;
					html+='</h5><h5>订单号：<a class="order_cas" data_c="'+data.lists[i].drugid+'" data_b="'+data.lists[i].selluserid+'" data_a="'+data.lists[i].orderid+'" target="_blank" href="wholeshop.html?code='+data.lists[i].ordercode+'">';
					html+=data.lists[i].ordercode;
					html+='</a></h5><h5>数量：<span>';
					html+=data.lists[i].num;
					html+='</span> 单价：<span>';
					html+=data.lists[i].price;
					html+='元</span> 小计：<span>';
					html+=data.lists[i].totalFee;
					html+='元</span> 备注：<span>';
					html+=data.lists[i].actContent;
					html+='</span></h5><h5>联系人：<span>';
					html+=data.lists[i].endUserName;
					html+='</span> 联系电话：<span>';
					html+=data.lists[i].endPhoneNum;
					html+='</span></h5></div><div class="backmore"><div class="lispic"><img src="';
					var listimg=data.lists[i].image_path.split(",");
					html+=listimg[0];
					html+='" /></div><div class="backlang"><p>当前状态：<span>';
					if(data.lists[i].state==0){
						html+='待审核';
					};
					if(data.lists[i].state==1){
						html+='已同意';
					};
					if(data.lists[i].state==-1){
						html+='已取消';
					};
					if(data.lists[i].state==2){
						html+='待收货';
					};
					if(data.lists[i].state==-2){
						html+='已拒绝';
					};
					if(data.lists[i].state==3){
						html+='已收货';
					};
					if(data.lists[i].state==4){
						html+='同意退款';
					};
					if(data.lists[i].state==5){
						html+='拒绝退款';
					};
					html+='</span></p><p>申请时间：</p><p>';
					html+=data.lists[i].submittime;
					html+='</p></div><div class="backtxt"><p><span>退货理由：</span></p><p>';
					html+=data.lists[i].submittxt;
					html+='</p></div><div class="backpic">';
					if(data.lists[i].submitimages!=""&&data.lists[i].submitimages!=null){
						var submitimages=data.lists[i].submitimages.split(",");
						for(var c=0;c<submitimages.length;c++){
							html+='<div class="mypic"><img src="';
							html+=submitimages[c];
							html+='" /></div>';
						};
					};
					html+='</div></div>';
					if(data.lists[i].state==1||data.lists[i].state==-2){
						html+='<div class="storetxt"><p><span>审核时间：</span>';
						html+=data.lists[i].handletime;
						html+='</p><p><span>审核结果：</span>';
						html+=data.lists[i].result;
						html+='</p></div>';
					};
					if(data.lists[i].state==2||data.lists[i].state==3||data.lists[i].state==4||data.lists[i].state==5){
						html+='<div class="storetxt"><p><span>物流名称：</span>';
						html+=gadget_split(data.lists[i].shipname,",",0);
						html+='<a class="look_kd_s" data_a="'+gadget_split(data.lists[i].shipname,",",1)+'" data_b="'+data.lists[i].shipcode+'">[查看物流]</a></p><p><span>物流单号：</span>';
						html+=data.lists[i].shipcode;
						html+='</p><p><span>发货时间：</span>'+data.lists[i].shiptime;
						if(data.lists[i].state==3||data.lists[i].state==4||data.lists[i].state==5){
							html+=' <span> 收货时间：</span>'+data.lists[i].sellgettime;
						};
						html+='</p></div>';
					};
					html+='</div>';
				};
				$("#mylis").append(html);
				$(".look_kd_s").click(function(){
					gadget_kd_look({"name":$(this).attr("data_a"),"code":$(this).attr("data_b")});
				});
				$(".car_shpt").click(function(){
					//同意退款
					var thisafter=$(this).attr("data_a");
					var mybacklis=$(this).parents(".backlis");
					$.ajax({
						type:"post",
						url:url+"/cli/aftersale/handle?token="+token+"&aftersaleid="+thisafter+"&state=4&time="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_back_remove();
							if(data.code==1){
								gadget_popupt("同意成功");
								mybacklis.remove();
							}else{
								gadget_popupt("同意失败");
							};
						},
						error:function(){
							gadget_back_remove();
							gadget_popupt("同意失败，请刷新重试");
						}
					});
					
				});
				$(".car_shps").click(function(){
					//拒绝退款
					var thisafter=$(this).attr("data_a");
					var mybacklis=$(this).parents(".backlis");
					$.ajax({
						type:"post",
						url:url+"/cli/aftersale/handle?token="+token+"&aftersaleid="+thisafter+"&state=5&time="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_back_remove();
							if(data.code==1){
								gadget_popupt("拒绝成功");
								mybacklis.remove();
							}else{
								gadget_popupt("拒绝失败");
							};
						},
						error:function(){
							gadget_back_remove();
							gadget_popupt("拒绝失败，请刷新重试");
						}
					});
				});
				$(".car_shp").click(function(){
					var thisafter=$(this).attr("data_a");
					var mybacklis=$(this).parents(".backlis");
					gadget_back("请稍等...");
					$.ajax({
						type:"post",
						url:url+"/cli/aftersale/handle?token="+token+"&aftersaleid="+thisafter+"&state=3&time="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_back_remove();
							if(data.code==1){
								gadget_popupt("确认成功");
								mybacklis.remove();
							}else{
								gadget_popupt("确认失败");
							};
						},
						error:function(){
							gadget_back_remove();
							gadget_popupt("确认失败，请刷新重试");
						}
					});
				});
				$(".terxx").click(function(){
					$(this).parent(".myter").hide();
				});
				$(".backnot").click(function(){
					$(this).siblings(".myter").show();
				});
				$(".mypic").click(function(){
					$('#maximg img').attr("src",$(this).children("img").attr("src"));
					$("#bigimg").show();
				});
				$(".mytersp").click(function(){
					var result=$(this).siblings("textarea").val();
					if(result==""||result==null){
						gadget_popupt("请填写原因");
						return false;
					};
					var aftersaleid=$(this).parents(".backlis").attr("name");
					result="拒绝退货，"+result;
					result=encodeURI(result);
					var casobj=$(this).parent(".myter").siblings(".backlishea").children("h5").children(".order_cas")
					var order_id=casobj.attr("data_a");
					var order_code=casobj.html();
					var selluser_id=casobj.attr("data_b");
					var drug_id=casobj.attr("data_c");
					$.ajax({
						type:"post",
						url:url+"/cli/aftersale/handle?token="+token+"&selluserid="+selluser_id+"&drugid="+drug_id+"&ordercode="+order_code+"&orderid="+order_id+"&result="+result+"&aftersaleid="+aftersaleid+"&state=-2&time="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("审核完成");
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popupt("审核失败"+data.message);
							};
						},
						error:function(){
							gadget_popupt("审核失败，请刷新重试");
						}
					});
				});
				$(".backgo").click(function(){
					//order_cas
					var casobj=$(this).siblings(".backlishea").children("h5").children(".order_cas")
					var order_id=casobj.attr("data_a");
					var selluser_id=casobj.attr("data_b");
					var drug_id=casobj.attr("data_c");
					var order_id=casobj.attr("data_a");
					var order_code=casobj.html();
					var result="同意退货";
					var aftersaleid=$(this).parents(".backlis").attr("name");
					result=encodeURI(result);
					$.ajax({
						type:"post",
						url:url+"/cli/aftersale/handle?token="+token+"&selluserid="+selluser_id+"&drugid="+drug_id+"&ordercode="+order_code+"&orderid="+order_id+"&result="+result+"&aftersaleid="+aftersaleid+"&state=1&time="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("审核完成");
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popupt("审核失败"+data.message);
							};
						},
						error:function(){
							gadget_popupt("审核失败，请刷新重试");
						}
					});
					
					
				});
	};
	
})
