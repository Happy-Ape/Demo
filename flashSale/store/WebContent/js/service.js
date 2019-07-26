$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var state=0;
	var open=1;
	var str=10;
	$('#myuxx').click(function(){
		$("#bigimg").hide();
	});
	//刚提交 1审核通过 2买家已发货 3卖家确认收货 -1取消 -2 审核不通过
	$("#forpo span").click(function(){
		$(this).addClass("select");
		$(this).siblings("span").removeClass("select");
		open=1;
		if($(this).index()==0){
			state=0;
			oneajax(state,open);
		};
		if($(this).index()==1){
			state=1;
			oneajax(state,open);
		};
		if($(this).index()==2){
			state=-2;
			oneajax(state,open);
		};
		//-1 -2 0 1
		if($(this).index()==3){
			state=-1;
			oneajax(state,open);
		};
		if($(this).index()==4){
			state=2;
			oneajax(state,open);
		};
		if($(this).index()==5){
			state=3;
			oneajax(state,open);
		};
		if($(this).index()==6){
			state=4;
			oneajax(state,open);
		};
		if($(this).index()==7){
			state=5;
			oneajax(state,open);
		};
	});
	oneajax(state,open);
	function oneajax(state,open){
		gadget_m_remv($("#lismore"));
		$(".cmaisp").show();
		$(".mylis").remove();
	$.ajax({
		type:"get",
		url:url+"/cli/aftersale/query/"+state+"/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				lismo(data);
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
				//lismore
				gadget_err_m("暂无数据",$("#lismore"));
				$(".cmaisp").hide();
				$(".mylis").remove();
			};
		},
		error:function(){
			gadget_err_m("暂无数据",$("#lismore"));
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
		$(".mylis").remove();
		$.ajax({
			type:"GET",
			url:url+"/cli/aftersale/query/"+state+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					
					lismo(data);
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
		$(".mylis").remove();
		$.ajax({
			type:"GET",
			url:url+"/cli/aftersale/query/"+state+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					lismo(data);
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
		$(".mylis").remove();
		$.ajax({
			type:"GET",
			url:url+"/cli/aftersale/query/"+state+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					lismo(data);
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
	function lismo(data){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="mylis">';
					if(data.lists[i].state==0){
						html+='<span class="mybtn btnspan" name="';
						html+=data.lists[i].aftersaleid;
						html+='">取 消</span>';
					};
					if(data.lists[i].state==1){
						html+='<span class="kddhbtn btnspan" data_a="'+data.lists[i].ordercode+'" name="';
						html+=data.lists[i].aftersaleid;
						html+='">去发货</span>';
					};
					if(data.lists[i].state==4){
						html+='<span class="or_hbtn btnspan" data_a="'+data.lists[i].orderid+'">退款详情</span>';
					};
					html+='<div class="shopname">';
					html+='<p>商品名：<a href="';
					html+='../Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
					html+='">';
					html+=data.lists[i].aliascn;
					html+='</a></p><p>订单号：<a href="order.html?number='+data.lists[i].ordercode+'">';
					html+=data.lists[i].ordercode;
					html+='</a></p></div><div class="mylist"><div class="mypic"><img src="';
					var listimg=data.lists[i].listimg.split(",");
					html+=listimg[0];
					html+='" /></div><div class="mynum"><p>当前状态：<span>';
					//刚提交 1审核通过 2买家已发货 3卖家确认收货 -1取消 -2 审核不通过
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
						html+='已发货';
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
					html+='</p></div><div class="mylang"><p><span>退货理由:</span></p><p>';
					html+=data.lists[i].submittxt;
					html+='</p></div><div class="myimg">';
					if(data.lists[i].submitimages!=""&&data.lists[i].submitimages!=null){
						var submitimages=data.lists[i].submitimages.split(",");
						for(var c=0;c<submitimages.length;c++){
							html+='<div class="minimg"><img src="';
							html+=submitimages[c];
							html+='" /></div>';
						};
					};
					html+='</div></div>';
					if(data.lists[i].state==1||data.lists[i].state==-2){
						html+='<div class="upsork"><p><span>审核时间：</span>';
						html+=data.lists[i].handletime;
						html+='</p><p><span>审核结果：</span>';
						html+=data.lists[i].result;
						html+='</p></div>';
					};
					if(data.lists[i].state==2||data.lists[i].state==3||data.lists[i].state==4||data.lists[i].state==5){
						html+='<div class="upsork"><p><span>物流名称：</span>';
						html+=gadget_split(data.lists[i].shipname,",",0);
						html+='<a class="look_kd_s" data_a="'+gadget_split(data.lists[i].shipname,",",1)+'" data_b="'+data.lists[i].shipcode+'">[查看物流]</a></p><p><span>物流单号：</span>';
						html+=data.lists[i].shipcode;
						html+='</p><p><span>发货时间：</span>';
						html+=data.lists[i].shiptime;
						if(data.lists[i].state==3||data.lists[i].state==4||data.lists[i].state==5){
							html+=' <span> 收货时间：</span>'+data.lists[i].sellgettime;
						};
						html+='</p></div>';
					};
					html+='</div>';
				};
				$("#lismore").append(html);
			$(".look_kd_s").click(function(){
					gadget_kd_look({"name":$(this).attr("data_a"),"code":$(this).attr("data_b")});
				});
			$(".minimg").click(function(){
			$('#maximg img').attr("src",$(this).children("img").attr("src"));
				$("#bigimg").show();
			});
			
			$(".or_hbtn").click(function(){
			var order_id=$(this).attr("data_a");
			$.ajax({
				type:"get",
				url:url+"/cli/order/getDetail/"+order_id+"?token="+token+"&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					
					if(data.code==1){
						var txtb='<table cellpadding="0" cellspacing="0" border="0"><tbody id="mybo_or">';
						txtb+='<tr><td class="mybo_or_a">退款单号：</td><td class="mybo_or_b">'+data.pojo.ordercode+'</td></tr>';
						txtb+='<tr><td class="mybo_or_a">关联订单：</td><td class="mybo_or_b"><a target="_blank" href="order.html?number='+retcode(data.pojo.ordercode)+'">'+retcode(data.pojo.ordercode)+'</a></td></tr>';
						txtb+='<tr><td class="mybo_or_a">退款金额：</td><td class="mybo_or_b">'+data.pojo.details[0].totalfee+'元</td></tr>';
						txtb+='<tr><td class="mybo_or_a">通过时间：</td><td class="mybo_or_b">'+data.pojo.createtime+'</td></tr>';
						txtb+='<tr><td class="mybo_or_a">退款状态：</td><td class="mybo_or_b">';
						if(data.pojo.isbalance==1){
							txtb+='退款成功';
						}else{
							txtb+='退款中';
						};
						txtb+='</td></tr>';
						if(data.pojo.isbalance==1){
							txtb+='<tr><td class="mybo_or_a">完成时间：</td><td class="mybo_or_b">'+data.pojo.balancetime+'</td></tr>';
						};
						txtb+='</tbody></table>';
						gadget_popup_c("退款详情",["确定"],txtb);
					}else{
						gadget_popupt("暂无详细信息");
					}
				},
				error:function(){
					gadget_popupt("网络错误请刷新重试");
				}
			});
		});
			$(".kddhbtn").click(function(){
				var order_cod=$(this).attr("name");
				var order_cods=$(this).attr("data_a");
				var obj_s=$(this).parents(".mylis");
				if(order_cod==""||order_cod==undefined||order_cod==null){
					gadget_popupt("获取订单信息失败，请刷新重试");
					return false;
				};
				var txtb='<table cellpadding="0" cellspacing="0" border="0"><tbody id="mybo_or">';
						txtb+='<tr><td class="mybo_or_a">订单号：</td><td class="mybo_or_b">'+order_cods+'</td></tr>';
						txtb+='<tr><td class="mybo_or_a">物流名称：</td><td class="mybo_or_b"><div class="selt_box"><select class="selectff carname" id="tima">';
						txtb+=expresslook({"re":"0"});
						txtb+='</select><div class="selt_mypic"><img src="../imgeas/xiaj.png" /></div></div>';
						
						txtb+='</tr>';
						txtb+='<tr><td class="mybo_or_a">物流单号：</td><td class="mybo_or_b"><input oninput="if(value.length>30)value=value.slice(0,30)"  type="number" class="carnum" placeholder=""/></td></tr>';
						txtb+='</tbody></table>';
				var callback_car=function(){
					callback_car.remkt=1;
					var carnum=$(".carnum").val();
					var carname=$(".carname").val();
					if(carname==""){
						gadget_popupt("请填写物流公司名称");
						return false;
					};
					if(carnum==""){
						gadget_popupt("请填写物流单号");
						return false;
					};
					callback_car.remkt=0;
					//aftersaleid   shipname   shipcode
					var exmore=expresslook({"id":carname});
					gadget_back("请稍等...");
					$.ajax({
						type:"get",
						url:url+"/other/order/queryShip?shipName="+exmore.eg+"&shipCode="+carnum,
						dataType:"json",
						success:function(data){
							gadget_back_remove()
							data=JSON.parse(data);
							if(data.Success==true){
								if(data.State==0){
									gadget_popups(data.Reason+"请稍后重试");
								}else{
									carname=exmore.name+","+exmore.eg;
									potord();
								};
							}else{
								gadget_popups(data.Reason);
							};
						},
						error:function(){
							gadget_back_remove()
							gadget_popups("网络错误，请刷新重试");
						}
					});
					
					function potord(){
						gadget_back("请稍等...");
					$.ajax({
						type:"post",
						url:url+"/cli/aftersale/endOut?token="+token+"&aftersaleid="+order_cod+"&shipname="+carname+"&shipcode="+carnum+"&time="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_back_remove();
							if(data.code==1){
								gadget_popupt("提交成功");
								obj_s.remove();
							}else{
								gadget_popupt("提交失败");
							};
						},
						error:function(){
							gadget_back_remove();
							gadget_popupt("提交失败，请刷新重试");
						}
					});
					};
				};

				gadget_popup_c("请填写物流信息",["确定"],txtb,callback_car);
				
				
			});
			$(".mybtn").click(function(){
				var aftersaleid=$(this).attr("name");
				$.ajax({
					type:"get",
					url:url+"/cli/aftersale/endCancel/"+aftersaleid,
					data:{token:token,mintime:new Date().getTime()},
					dataType:"json",
					success:function(data){
						gadget_login(data);
						if(data.code==1){
							gadget_popupt("取消成功");
							setTimeout(gadget_relo,3000);
						}else{
							gadget_popupt("取消失败"+data.message);
						};
					},
					error:function(){
						gadget_popupt("取消失败，请刷新重试");
					}
				});
			});
	};
	
	function retcode(datacode){
		var datacode=datacode.split("_");
		return datacode[0];
	}
})
