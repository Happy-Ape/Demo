$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var peopletype=$.cookie('peopletype');
	var caridnamtml=$.cookie('caridnamtml');
	var carid=getUrlParamo("i");
	//var carid=$.cookie('carid');
	var ob=0;
	var caid=0;
	var nowpage=1;
	var pagesize=10;
	if(carid==null||carid==""){
		carid=1;
	};
	if(caridnamtml!=null&&caridnamtml!=""){
		$("#actionhfo span").html("("+caridnamtml+")");
	};
	$.cookie("caridnamtml","",{path:"/"});
	$.cookie("carid","",{path:"/"});
	//显示
	$.ajax({
		type:"GET",
		url:url+"/cli/drug/getCategory/0?mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			var cod=0;
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<p name="99"><a class="catyen" name="';
					html+=data.lists[i].cateid;
					html+='">';
					html+=data.lists[i].catename;
					html+='</a></p>';
				};
				$("#cationhfi").after(html);
				cod=1;
				if(cod=1){
					var cad=1;
					cadfun(cad);
					function cadfun(cad){
						if(cad>$(".catyen").length){
							$(".cation a").click(function(){
								$("#actionhfo span").html("("+$(this).html()+")");
									caid=$(this).attr("name");
									carid=caid;
									exhibition(carid);
									$.ajax({
										type:"GET",
										url:url+"/cli/drug/getCategory/"+caid+"?mintime="+new Date().getTime(),
										dataType:"json",
										success:function(data){
											gadget_login(data);
											if(data.code==1){
												$(".bigationh").remove();
												var html='<div class="bigationh"><span>产品分类：</span>';
												for(var i=0;i<data.lists.length;i++){
													html+='<a name="';
													html+=data.lists[i].cateid;
													html+='">';
													html+=data.lists[i].catename;
													html+='</a>';
												};
												html+='</div>';
												$(".bigcation").prepend(html);
												$(".bigationh a").click(function(){
													$(".bigationh a").removeClass("isred");
													$("#actionhfo span").html("("+$(this).html()+")");
													$(this).attr("class","isred");
													carid=$(this).attr("name");
													exhibition(carid);
												})
											}
										},
										error:function(){
											
										}
									});
							});
						return false;
						};
						$.ajax({
						type:"GET",
						url:url+"/cli/drug/getCategory/"+cad+"?mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								var htm='';
								for(var b=0;b<data.lists.length;b++){
									htm+='<a name="';
									htm+=data.lists[b].cateid;
									htm+='">';
									htm+=data.lists[b].catename;
									htm+='</a>';
								};
									$(".catyen[name='"+cad+"']").parent("p").after(htm);
									
									cad=cad+1;
									cadfun(cad);
							};
						},
						error:function(){
						}
					});
					}
				};
			};
		},
		error:function(){
			
		}
	});
	function resop(data){
		$(".drugslis").remove();
		var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="drugslis"><img src="';
					/*if(data.lists[i].mydrugimages==1||data.lists[i].mydrugimages==""){
						var arr=data.lists[i].listimg.split(";")
						
						html+=arr[0];
					}else{
						var brr=data.lists[i].mydrugimages.split(",")
						html+=brr[0];
					};*/
					var brr=data.lists[i].listimg.split(";");
					html+=brr[0];
					html+='" /><h3><a target="_blank" href="commoditys.html?drugId='+data.lists[i].drugid+'">';
					html+=data.lists[i].aliascn;
					html+='</a></h3><span>生产厂家：';
					html+=data.lists[i].manufacturer;
					html+='</span><br><span>批准文号：';
					if(data.lists[i].codename){
						html+=data.lists[i].codename;
					}else{
						html+=' ';
					};
					html+='</span><br><span>规格：';
					html+=data.lists[i].specification;
					html+='</span><input type="button" name="';
					html+=data.lists[i].drugid;
					html+='" class="isobbtn" value="采购>>"/>';
					html+='<div class="merchant"><div class="isobxx"><img src="imgeas/baicha.png" /></div><div class="scerchshopsls"><img src="imgeas/serch.gif"/><p>暂无商家</p></div></div></div>';
				};
				$("#actionhfo").after(html);
				$("#body").scrollTop(0);
	};
	function cik(data){
				resop(data)
				//点击关闭
				$(".isobxx").click(function(){
					$(this).parent(".merchant").hide();
					$(this).parent(".merchant").children("table").remove();
					$(".drugslis").css("border-color","#d4d4d4");
					$(".scerchshopsls").hide();
					
				});
					//点击采购
					$(".isobbtn").click(function(){
						var drugid=$(this).attr("name");
						var merchant=$(this).siblings(".merchant");
						$(this).siblings(".merchant").children("table").remove();
						$(".scerchshopsls").show();
						$(".scerchshopsls img").attr("src","imgeas/serch.gif");
						$(".scerchshopsls p").hide();
						$.ajax({
							type:"GET",
							url:url+"/cli/sellUser/getSUByDrugId/"+drugid+"/1/99",
							data:{token:token,mintime:new Date().getTime()},
							dataType:"json",
							success:function(data){
								gadget_login(data);
								if(data.code==1){
									$(".scerchshopsls").hide();
									var html='';
									html+='<table cellspacing="0"><thead><tr><th class="ismyman"><p>商铺</p></th><th>';
									html+='<p>优惠券</p></th><th><p>价格（元）</p></th><th><p>库存</p></th>';
									html+='<th><p>采购数量</p></th><th><p>操作</p></th></tr></thead><tbody id="tdnonoy">';
									for(var i=0;i<data.lists.length;i++){
                    					html+='<tr name="';
                    					html+=data.lists[i].selluserid;
                    					html+='"><td><P><a target="_blank" href="shopdetails.html?us='+data.lists[i].selluserid+'">';
                    					html+=data.lists[i].sellername;
                    					html+='</a></P></td><td class="coupon">';
                    					if(data.lists[i].havacoupons==1){
                    						html+='<span class="tdcoupon">￥优惠券</span>';
                    						html+='<div class="couponlis" name="12369"></div>';
                    					};
                    					html+='</td><td><P>';
                    					if(data.lists[i].sellprice==0){
                    						data.lists[i].sellprice="认证可见";
                    					};
                    					html+=data.lists[i].sellprice;
                    					html+='</P></td><td class="stock"><P>';
                    					if(data.lists[i].sellstock==null){
                    						data.lists[i].sellstock=0;
                    					};
                    					html+=data.lists[i].sellstock;
                    					html+='</P></td><td><span class="subtraction">-</span>';
                    					html+='<input type="number" onkeyup="checkn(this)" onafterpaste="checkm(this)" class="purchase" name="purchase" minnum="'+data.lists[i].mindeliverynum+'" value="'+data.lists[i].mindeliverynum+'">';
                    					html+='<span class="addition">+</span></td><td><span class="myshopcar" name="';
                    					html+=data.lists[i].activityid;
                    					html+='">加入清单列表</span>';
                    					html+='<a target="_blank" href="Product.html?drugid='+drugid+'&selluserid='+data.lists[i].selluserid+'">详情>></a></td></tr>';
									};
									html+='</tbody></table>';
									merchant.append(html);
									//alert(merchant.html())
								}else{
									$(".scerchshopsls img").attr("src","imgeas/error.png");
									$(".scerchshopsls").show();
									$(".scerchshopsls p").show();
								};
								//加入清单列表
								$(".myshopcar").click(function(){
									if(peopletype==null){
										gadget_popupt("请登录");
										window.location.href="login.html"
										return false;
									};
									if(peopletype!=1&peopletype!=2&peopletype!=0){
										gadget_popupt("仅限终端用户")
										return false;
									};
									var activityid=$(this).attr("name");
									var selluserid=$(this).parent().parent().attr("name");
									var num=$(this).parent().parent().children().children(".purchase").val();
									var drugid=$(this).parents(".merchant").siblings(".isobbtn").attr("name");
									//console.log(selluserid+"selluserid");
									//console.log(drugid+"drugid");
									//console.log(num+"num");
									$.ajax({
										type:"GET",
										url:url+"/cli/SC/addSCItem/"+drugid+"/"+selluserid+"/"+activityid+"/"+num,
										data:{token:token,mintime:new Date().getTime()},
										dataType:"json",
										success:function(data){
											gadget_login(data);
											if(data.code==1){
												gadget_popupt("加入清单列表成功");
											}else{
												gadget_popupt("加入清单列表失败");
											};
										},
										error:function(){
											gadget_popupt("加入清单列表失败.请重试");
										}
									});
								});
								//点击优惠券
								$(".tdcoupon").click(function(){
									$(".couponlis").hide();
									if(ob==0){
										$(this).siblings(".couponlis").show();
										ob=1;
									}else{
										$(this).siblings(".couponlis").hide();
										ob=0;
									};
									var usid=$(this).parents("tr").attr("name");
									
									var coup=$(this).siblings(".couponlis");
									$.ajax({
										type:"GET",
										url:url+"/cli/coupons/getBySuid/"+usid+"?mintime="+new Date().getTime(),
										dataType:"json",
										success:function(data){
											gadget_login(data);
											if(data.code==1){
												var html='';
												for(var i=0;i<data.lists.length;i++){
													html+='<div class="couponlismin" name="';
													html+=data.lists[i].couponsid;
													html+='"><div class="minone">';
													html+='<span>￥优惠券</span></div><div class="mintw"><h5>';
													if(data.lists[i].content==0){
														html+='免运费';
													}else{
														var arr=data.lists[i].content.split("-");
														html+='满';
														html+=arr[0];
														html+='减';
														html+=arr[1];
													};
													html+='</h5><p>';
													var brr=data.lists[i].begindate.split(" ");
													html+=brr[0];
													html+='到';
													var crr=data.lists[i].enddate.split(" ")
													html+=crr[0];
													html+='</p></div><div class="minsh">';
													if(data.lists[i].limitcount==0){
														html+='<span class="minshnospan" title="剩余';
														html+=data.lists[i].limitcount;
														html+='张">以领完</span></div></div>';
													}else{
														html+='<span class="minshspan" title="剩余';
														html+=data.lists[i].limitcount;
														html+='张">领取</span></div></div>';
													};
												};
												coup.append(html);
												$(".minshspan").click(function(){
													if(peopletype==null){
														gadget_popupt("请登录");
														window.location.href="login.html"
														return false;
													}
													if(peopletype!=1&peopletype!=2&peopletype!=0){
														gadget_popupt("仅限终端用户领取")
														return false;
													}else{
														var couponsid=$(this).parent().parent().attr("name");
														$.ajax({
															type:"POST",
															url:url+"/cli/coupons/insertCoupons/"+couponsid+"?token="+token+"&mintime="+new Date().getTime(),
															dataType:"json",
															success:function(data){
																gadget_login(data);
																if(data.code==1){
																	gadget_popupt("领取成功");
																}else{
																	gadget_popupt(data.message);
																};
															},
															error:function(){
																gadget_popupt("领取失败");
															}
														});
													};
												})
											};
											
										},
										error:function(){
											
										}
									});
									
									
									
									
								});
								//采购数量-1
								$(".subtraction").click(function(){
									var subtraction=parseInt($(this).siblings(".purchase").val())-1;
									var minnum=Number($(this).siblings(".purchase").attr("minnum"))
									if(parseInt($(this).siblings(".purchase").val())<=minnum){
										subtraction=minnum;
									};
									$(this).siblings(".purchase").val(subtraction)
								});
								//采购数量+1
								$(".addition").click(function(){
									var addition=parseInt($(this).siblings(".purchase").val())+1;
									var max=$(this).parent().siblings(".stock").children("p").html();
									if(addition>=parseInt(max)){
										addition=max;
									};
									$(this).siblings(".purchase").val(addition);
								});
								$(".purchase").blur(function(){
									var minnum=Number($(this).attr("minnum"));
									var max=$(this).parent().siblings(".stock").children("p").html();
									if($(this).val()<minnum){
										$(this).val(minnum)
									};
									if($(this).val()>Number(max)){
										$(this).val(max);
									};
								})
							},
							error:function(){
							}
						});
					ob=0;
					$('.merchant').hide();
					$(".couponlis").hide();
					$(this).siblings(".merchant").show();
					$(this).parent(".drugslis").css("border-color","#33804b");
				});
			
	}
	
	//下一页
	$("#cmaismop").click(function(){
		
		nowpage=parseInt($("#isdangq").html())+1;
		if(nowpage>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getOneTypeDrugs/"+carid+"/"+nowpage+"/"+pagesize+"?mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					resop(data);
					cik(data);
					$("#isdangq").html(nowpage)
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
		nowpage=parseInt($("#isdangq").html())-1;
		if(nowpage<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getOneTypeDrugs/"+carid+"/"+nowpage+"/"+pagesize+"?mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resop(data);
					cik(data);
					$("#isdangq").html(nowpage);
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
		
		nowpage=Number($(".cmaisp input[type='number']").val());
		if(nowpage==""){
			return false;
		};
		if(nowpage>$("#ismyipik").html()){
			nowpage=$("#ismyipik").html();
		};
		if(nowpage<"1"){
			nowpage="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getOneTypeDrugs/"+carid+"/"+nowpage+"/"+pagesize+"?mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resop(data);
					cik(data);
					$("#isdangq").html(nowpage)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	})
	//药品展示
	exhibition(carid)
	function exhibition(carid){
		
		$(".drugslis").remove();
		$.ajax({
		type:"GET",
		url:url+"/cli/sellDrug/getOneTypeDrugs/"+carid+"/"+nowpage+"/"+pagesize+"?mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			
			gadget_login(data);
			if(data.code==1){
				resop(data)
				//页数
				var st="";
					st=data.message/pagesize;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
					cik(data);
				}else{
				$("#body").scrollTop(0);
				var html='<div class="drugslis" style="text-align: center;"><h4>暂无药品Σ( ° △ °|||)︴</h4></div>';
				$("#actionhfo").after(html);
			}
		},
		error:function(){
			$("#body").scrollTop(0);
			var html='<div class="drugslis" style="text-align: center;"><h4>搜索失败Σ( ° △ °|||)︴</h4></div>';
			$("#actionhfo").after(html);
		}
	});
	};
	
	
})
