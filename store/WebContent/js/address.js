$(function(){
	jQuery.support.cors = true;
	var htm="";//省
	var htom="";//市
	var hom="";//区
	
	var tokens=$.cookie('peoplemessage');
	var userids=$.cookie('peopleus');
			$.ajax({
				type:"GET",
				url:url+"/cli/endUserAddr/getMyAddr",
				data:{token:tokens,userid:userids,mintime:new Date().getTime()},
				dataType:"json",
				success:function(data){
					gadget_login(data);
					if(data.code==1){
					var html="";
					var isdefault="";
					for(var i=0;i<data.lists.length;i++){
						html+='<div class="icendengwdi" name="';
						html+=data.lists[i].isdefault;
						html+='"><h3><span>收货地址：</span>';
						html+=data.lists[i].address;
						html+='</h3><p>收货人姓名：';
						html+=data.lists[i].endname;
						html+='</p>';
						html+='<span>邮编：';
						html+=data.lists[i].endzip;
						html+='</span><span>联系电话：';
						html+=data.lists[i].endphone;
						html+=' ';
						html+=data.lists[i].endtel;
						html+='</span><p class="icenlasp"><span class="icenlaspan" abd="';
						html+=data.lists[i].endaddressid;
						html+='" name="';
						html+=data.lists[i].userid;
						html+='">编 辑</span>';
						html+='<span class="ispanb" name="';
						html+=data.lists[i].endaddressid;
						html+='">设为默认收货地址</span><span class="icenmyspn" name="';
						html+=data.lists[i].endaddressid;
						html+='">删 除</span></p></div>';
						if(data.lists[i].isdefault=="1"){
							isdefault=1;
						}
					}
					$(".icendengw").append(html);
					var htmm='<div class="myshouc"><img src="../imgeas/moren.png"/><p>默认地址</p></div>';
					if(isdefault=="1"){
						$(".icendengwdi").eq(0).append(htmm);
						$(".icendengwdi[name='1'] .ispanb").attr("class","issp");
						//$(".icendengwdi").eq(0).children(".issp").removeClass("ispand");
						
					};
					$(".issp").click(function(){
						gadget_popupt("已是默认地址")
					});
					
					$(".icenmyspn").click(function(){
						var tokens=$.cookie('peoplemessage');
							var enid=$(this).attr("name");
							$.ajax({
								type:"GET",
								url:url+"/cli/endUserAddr/deleteMyAddr",
								data:{endaddressid:enid,token:tokens,mintime:new Date().getTime()},
								dataType:"json",
								success:function(data){
									gadget_login(data);
									if(data.code=="1"){
										$(".bodybig p").html("删 除 成 功");
										$(".bodybig").show();
										$(".isgood").click(function(){
										self.location.href = "address.html";
										});
									}else{
										gadget_popups("删除失败"+data.message)
									}
								},
								error:function(){
									gadget_popupt("失败")
								}
							});
						})
					
					
					$(".icenlaspan").click(function(){
						var usid=$(this).attr("name");
						var tokens=$.cookie('peoplemessage');
						var enid=$(this).attr("abd");
						
						$.ajax({
							type:"GET",
							url:url+"/cli/endUserAddr/editMyAddr",
							data:{endaddressid:enid,token:tokens,mintime:new Date().getTime()},
							dataType:"json",
							success:function(data){
								gadget_login(data);
								if(data.code=="1"){
									$(".icenbigdi").show();
									$("#mybutton").hide();
									$("#isbutton").show();
									$("input[name='endname']").val(data.pojo.endname);
									$("input[name='endphone']").val(data.pojo.endphone);
									$("input[name='endtel']").val(data.pojo.endtel);
									$("input[name='endzip']").val(data.pojo.endzip);
									$("input[name='address']").val(data.pojo.address);
									var dbaseaddress=data.pojo.baseaddress.split("-");
									childao_lis({province:dbaseaddress[0],city:dbaseaddress[1],country:dbaseaddress[2]})
									
									$("#isbutton").click(function(){
										var tokens = $.cookie('peoplemessage');
										var userids=$.cookie('peopleus');
										var endname = $("input[name='endname']").val();
										//var endphone = $("input[name='endphone']").val();
										var endtel = $("input[name='endtel']").val();
										var endzip = $("input[name='endzip']").val();
										var address = $("input[name='address']").val();
										
										if(endname==""||endname==null){
											$(".icentxred").eq(0).show();
											return false;
										}else{
											$(".icentxred").eq(0).hide();
										};
										var phone=$("input[name='endphone']").val();
											if(phone && /^1[3|4|5|7|8]\d{9}$/.test(phone)){
													var endphone=$("input[name='endphone']").val();
													$(".icentxred").eq(1).hide();
											}else{
												$(".icentxred").eq(1).show();
												return false;
											};
										if(endzip==""||endzip==null||endzip.length!=6){
											//alert("请填写邮编")
											$(".icentxred").eq(3).show();
											return false;
										}else{
											$(".icentxred").eq(3).hide();
										};
										if($(".icenadds").eq(0).val()==""||$(".icenadds").eq(0).val()==null){
											$(".icentxred").eq(4).show();
											return false;
										}else{
											$(".icentxred").eq(4).hide();
										};
										if($(".icenadds").eq(1).val()==""||$(".icenadds").eq(1).val()==null){
											$(".icentxred").eq(4).show();
											return false;
										}else{
											$(".icentxred").eq(4).hide();
										};
										if($(".icenadds").eq(2).val()==""||$(".icenadds").eq(2).val()==null){
											$(".icentxred").eq(4).show();
											return false;
										}else{
											$(".icentxred").eq(4).hide();
										};
										if(address==""||address==null){
											$(".icentxred").eq(5).show();
											return false;
										}else{
											$(".icentxred").eq(5).hide();
										};
										var baseaddress = $(".more_province").val() + "-" + $(".more_city").val() + "-" + $(".more_country").val();
										endname=encodeURI(endname);
										endphone=encodeURI(endphone);
										endtel=encodeURI(endtel);
										address=encodeURI(address);
										baseaddress=encodeURI(baseaddress);
											$.ajax({
												type: "post",
												url: url+"/cli/endUserAddr/updateMyAddr?endaddressid="+enid+"&token="+tokens+"&userid="+userids+"&endname="+endname+"&endphone="+endphone+"&endtel="+endtel+"&endzip="+endzip+"&address="+address+"&baseaddress="+baseaddress+"&mintime="+new Date().getTime(),
											dataType: "json",
											success: function(data) {
												gadget_login(data);
												if(data.code=="1"){
													$(".bodybig p").html("修 改 成 功");
													$(".bodybig").show();
													self.location.href = "address.html";
												}
												//$(this).siblings().hide()
											},
												error: function() {
														gadget_popupt("失败")
											}
										});
										
										
									})
								}
								
								
							},
							error:function(){
								gadget_popupt("编辑失败")
							}
						});
					})
					
					//设为默认地址
					$(".ispanb").click(function(){
						var diname=$(".icendengwdi[name='1'] .icenlaspan").attr("abd")
							if(diname==undefined){
								diname=0;
							}
						
						var tokens = $.cookie('peoplemessage');
						var oldAddrId=diname;
						var newAddrId=$(this).attr("name");
						var userids=$.cookie('peopleus');
						$.ajax({
												type: "GET",
												url: url+"/cli/endUserAddr/changeDefaultAddr",
												data: {
													userid:userids,
													token:tokens,
													oldAddrId:oldAddrId,
													newAddrId:newAddrId,
													mintime:new Date().getTime()
											},
											dataType: "json",
											success: function(data) {
												gadget_login(data);
												//alert(data.code)
												if(data.code=="1"){
													$(".bodybig p").html("设 置 成 功");
													$(".bodybig").show();
													$(".isgood").click(function(){
														self.location.href = "address.html";
													})
													
												}
												//$(this).siblings().hide()
											},
												error: function() {
														gadget_popupt("失败")
											}
										});
					})
					
				}else{
					console.log(data);
					//.icendengw
					gadget_err_m("暂无数据",$(".icendengw"))
					
				};
				},
				error:function(){
					gadget_err_m("网络错误，请重试",$(".icendengw"))
				}
			});
	
	//提交地址
	$(".icenspan").click(function(){
		$(".icenbigdi").show();
		$("#mybutton").show();
		$("#isbutton").hide();
		for(var i=0;i<$(".icemfor").length;i++){
			$(".icemfor").eq(i).val("");
		};
		childao_lis();
	});
	$(".ichac").click(function(){
		$(".icenbigdi").hide();
	});
	
	
	$("#mybutton").click(function(){
		
		//var params=$("#myform").serialize();
			var tokens=$.cookie('peoplemessage');
			var userids=$.cookie('peopleus');
			var endname=$("input[name='endname']").val();
			if(endname==""||endname==null){
				$(".icentxred").eq(0).show();
				return false;
			}else{
				$(".icentxred").eq(0).hide();
			};
			var phone=$("input[name='endphone']").val();
			if(phone && /^1[3|4|5|7|8]\d{9}$/.test(phone)){
					var endphone=$("input[name='endphone']").val();
					$(".icentxred").eq(1).hide();
			}else{
				$(".icentxred").eq(1).show();
				return false;
			};
			var endtel=$("input[name='endtel']").val();
			var endzip=$("input[name='endzip']").val();
			
			if(endzip==""||endzip==null||endzip.length!=6){
				//alert("请填写邮编")
				$(".icentxred").eq(3).show();
				return false;
			}else{
				$(".icentxred").eq(3).hide();
			};
			if($(".icenadds").eq(0).val()==""||$(".icenadds").eq(0).val()==null){
				$(".icentxred").eq(4).show();
				return false;
			}else{
				$(".icentxred").eq(4).hide();
			};
			if($(".icenadds").eq(1).val()==""||$(".icenadds").eq(1).val()==null){
				$(".icentxred").eq(4).show();
				return false;
			}else{
				$(".icentxred").eq(4).hide();
			};
			if($(".icenadds").eq(2).val()==""||$(".icenadds").eq(2).val()==null){
				$(".icentxred").eq(4).show();
				return false;
			}else{
				$(".icentxred").eq(4).hide();
			};
			var address=$("input[name='address']").val();
			if(address==""||address==null){
				$(".icentxred").eq(5).show();
				return false;
			}else{
				$(".icentxred").eq(5).hide();
			};
			var baseaddress = $(".more_province").val() + "-" + $(".more_city").val() + "-" + $(".more_country").val();
			endname=encodeURI(endname);
			endphone=encodeURI(endphone);
			endtel=encodeURI(endtel);
			endzip=encodeURI(endzip);
			address=encodeURI(address);
			baseaddress=encodeURI(baseaddress);
			
			$.ajax({
				type:"post",
				url:url+"/cli/endUserAddr/saveEndUserAddr?token="+tokens+"&userid="+userids+"&endname="+endname+"&endphone="+endphone+"&endtel="+endtel+"&endzip="+endzip+"&address="+address+"&baseaddress="+baseaddress+"&mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					gadget_login(data);
					//alert(data.code)
					self.location.href="address.html"
					
					//$(this).siblings().hide()
				},
				error:function(){
					gadget_popupt("失败")
				}
			});
	
		
	})
	
})
