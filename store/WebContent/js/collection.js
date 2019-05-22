$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	
	$(".icejfcx span").click(function(){
		$(this).addClass("icejfbck");
		$(this).siblings("span").removeClass("icejfbck");
		if($(this).index()==0){
			$("#stroelik").hide();
			$("#icejfbcks").show();
			
		};
		if($(this).index()==1){
			$("#icejfbcks").hide();
			$("#stroelik").show();
		};
	});

	$.ajax({
		type:"get",
		url:url+"/cli/CD/getEUCollectDrug/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				liklis(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyoipik").html(st);
					$("#isodangq").html("1");
			}else{
				$(".cmaisop").hide();
				$("#errmoretop").show();
			}
		},
		error:function(){
			$(".cmaisop").hide();
			$("#errmoretop").show();
		}
	});
	//下一页 
	$("#cmaisomop").click(function(){
		open=parseInt($("#isodangq").html())+1;
		if(open>$("#ismyoipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/CD/getEUCollectDrug/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					liklis(data);
					$("#isodangq").html(open)
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
	$("#cmaisompa").click(function(){
		open=parseInt($("#isodangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/CD/getEUCollectDrug/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					liklis(data);
					$("#isodangq").html(open);
				}else{
					gadget_popupt("获取失败.")
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	$("#ismyotzan").click(function(){
		open=$(".cmaisop input[type='number']").val()
		open=Number(open);
		if(open==""){
			return false;
		};
		if(open>Number($("#ismyoipik").html())){
			open=$("#ismyoipik").html();
		};
		if(open<1){
			open=1;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/CD/getEUCollectDrug/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					liklis(data);
					$("#isodangq").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});	
	
	function liklis(data){
		$(".cmaisop").show();
		$("#errmoretop").hide();
			$("#tbody tr").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<tr title="收藏时间';
					html+=data.lists[i].cdAddTime;
					html+='" name="';
					html+=data.lists[i].drugid;
					html+='"><td><img src="';
					if(data.lists[i].mydrugimages==""||data.lists[i].mydrugimages==null){
						var mydrugimages='../imgeas/muyou.png';
					}else{
						if(data.lists[i].mydrugimages==1||data.lists[i].mydrugimages==-1){
							var mydrugimages=data.lists[i].listimg.split(";");
						}else{
							var mydrugimages=data.lists[i].mydrugimages.split(",");
						};
						
						mydrugimages=mydrugimages[0];
					};
					html+=mydrugimages;
					html+='"/></td><td><a href="';
					html+='../Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
					html+='">';
					html+=data.lists[i].aliascn;
					html+='</a></td><td class="splice">';
					if(data.lists[i].activityid!=-1&&data.lists[i].activityid!=0&&data.lists[i].actState!=-1){
						if(data.lists[i].actType==1){
							var actCentent=data.lists[i].actCentent.split(";");
							var actentent=actCentent[0].split(",");
							var acttent=actCentent[1].split(",");
							for(var c=0;c<actentent.length;c++){
								html+='<p><span>买';
								html+=actentent[c];
								html+='个';
								html+=Number(acttent[c])/10;
								html+='折</span></p>';
							};
							
						};
						if(data.lists[i].actType==2){
							var actCntent=data.lists[i].actCentent.split(";");
							var acentent=actCntent[0].split(",");
							var actent=actCntent[1].split(",");
							for(var c=0;c<acentent.length;c++){
								html+='<p><span>买';
								html+=acentent[c];
								html+='赠';
								html+=Number(actent[c]);
								html+='</span></p>';
							};
						};
						
					}else{
						html+='<p><span>暂无活动</span></p>';
					};
					
					html+='</td><td class="sellprice" name="';
					
					if(data.lists[i].actState==-1){
						data.lists[i].activityid=0;
					};
					if(data.lists[i].actState==""||data.lists[i].actState==null){
						data.lists[i].activityid=0;
					};
					html+=data.lists[i].activityid;
					html+='"><p>￥<span>';
					if(data.lists[i].activityid=-1&&data.lists[i].actState!=-1&&data.lists[i].discountprice!=0){
						html+=data.lists[i].discountprice;
						html+='</span>';
						html+='<s>￥';
						html+=data.lists[i].sellprice;
						html+='</s>';
					}else{
						if(data.lists[i].sellprice==0){
							data.lists[i].sellprice="认证可见";
						};
						html+=data.lists[i].sellprice;
						html+='</span>';
					};
					
					html+='</p><p>规格:';
					html+=data.lists[i].specification;
					html+='</p><p>库存:<span class="selltock">';
					html+=data.lists[i].sellstock;
					
					html+='</span></p></td><td class="selnum"><p>';
					html+='<input type="button" class="btnja" value="+"/><input class="btmj" type="button" value="-"/>';
					html+='<input type="number" onkeyup="checkn(this)" onafterpaste="checkm(this)" class="inpnumber" minnum="'+data.lists[i].mindeliverynum+'" value="'+data.lists[i].mindeliverynum+'"/></p></td><td class="sellik" name="';
					
					html+=data.lists[i].selluserid;
					html+='">';
					html+='<p><span class="mycart" name="';
					html+='">加入清单列表</span></p><p><span class="notl">取 消 收 藏</span></p></td></tr>';
				};
				$("#tbody").append(html);
				$(".btnja").click(function(){
					var inpnumber=$(this).siblings(".inpnumber").val();
					var bignumber=$(this).parent("p").parent(".selnum").siblings(".sellprice").children("p").children(".selltock").html();
					inpnumber=Number(inpnumber);
					if(inpnumber>=Number(bignumber)){
						inpnumber=Number(bignumber);
					}else{
						inpnumber=Number(inpnumber)+1;
					};
					$(this).siblings(".inpnumber").val(inpnumber);
				});
				$(".btmj").click(function(){
					var inpnumber=$(this).siblings(".inpnumber").val();
					var minnum=Number($(this).siblings(".inpnumber").attr("minnum"));
					inpnumber=Number(inpnumber);
					if(inpnumber<=minnum){
						inpnumber=minnum;
					}else{
						inpnumber=inpnumber-1;
					};
					$(this).siblings(".inpnumber").val(inpnumber);
				});
				$(".inpnumber").blur(function(){
					var inpnumber=$(this).val();
					var bignumber=$(this).parent("p").parent(".selnum").siblings(".sellprice").children("p").children(".selltock").html();
					var minnums=Number($(this).attr("minnum"));
					inpnumber=Number(inpnumber);
					bignumber=Number(bignumber);
					if(inpnumber>=bignumber){
						inpnumber=bignumber;
						$(this).val(inpnumber);
					};
					if(inpnumber<=minnums){
						inpnumber=minnums;
						$(this).val(inpnumber);
					};
				});
			$(".mycart").click(function(){
				var activityId=$(this).parent("p").parent(".sellik").siblings(".sellprice").attr("name");
				var drug=$(this).parents("tr").attr("name");
				var selluser=$(this).parent("p").parent(".sellik").attr("name");
				var numb=$(this).parent("p").parent(".sellik").siblings(".selnum").children("p").children(".inpnumber").val();
				if(Number(numb)<=0){
					gadget_popupt("请输入正确的数量");
					return false;
				};
				$.ajax({
					type:"get",
					url:url+"/cli/SC/addSCItem/"+drug+"/"+selluser+"/"+activityId+"/"+numb,
					data:{token:token,mintime:new Date().getTime()},
					dataType:"json",
					success:function(data){
						gadget_login(data);
						if(data.code==1){
							gadget_popupt("加入清单列表成功");
							
						}else{
							gadget_popupt("加入清单列表失败",+data.message);
						};
					},
					error:function(){
						gadget_popupt("加入清单列表失败，请重试");
					}
				});
			});
			$(".notl").click(function(){
				var selluser=$(this).parent("p").parent(".sellik").attr("name");
				var drug=$(this).parents("tr").attr("name");
			//	alert(selluser+"selluser"+drug+"drug");
				$.ajax({
					type:"get",
					url:url+"/cli/CD/cancel/"+drug+"/"+selluser,
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
						gadget_popupt("取消失败,请重试");
					}
				});
			});
	};
	var nowPage=1;
	var pageSize=10;
	$.ajax({
		type:"get",
		url:url+"/cli/CS/getEUCollectStore/"+nowPage+"/"+pageSize,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			//console.log(data)
			if(data.code==1){
				stroelis(data);
				//console.log(data.message)
				var st="";
					st=data.message/pageSize;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				//gadget_popupt("暂无收藏信息");
				$(".cmaisp").hide();
				$("#errmorebom").show();
			};
		},
		error:function(){
			//gadget_popupt("暂无收藏信息");
			$(".cmaisp").hide();
			$("#errmorebom").show();
		}
	});
	//下一页 
	$("#cmaismop").click(function(){
		nowPage=parseInt($("#isdangq").html())+1;
		if(nowPage>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/CS/getEUCollectStore/"+nowPage+"/"+pageSize,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					stroelis(data);
					$("#isdangq").html(nowPage);
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
		nowPage=parseInt($("#isdangq").html())-1;
		if(nowPage<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/CS/getEUCollectStore/"+nowPage+"/"+pageSize,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					stroelis(data);
					$("#isdangq").html(nowPage);
				}else{
					gadget_popupt("获取失败.")
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	$("#ismytzan").click(function(){
		nowPage=$(".cmaisp input[type='number']").val()
		nowPage=Number(nowPage);
		if(nowPage==""){
			return false;
		};
		if(nowPage>Number($("#ismyipik").html())){
			nowPage=$("#ismyipik").html();
		};
		if(nowPage<1){
			nowPage=1;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/CS/getEUCollectStore/"+nowPage+"/"+pageSize,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					stroelis(data);
					$("#isdangq").html(nowPage)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});	
	function stroelis(data){
		$(".cmaisp").show();
		$("#errmorebom").hide();
		$("#stroelik .stroelis").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="stroelis" name="';
					html+=data.lists[i].selluserid;
					html+='"><div class="piclis"><img src="';
					if(data.lists[i].imagelist!=null&&data.lists[i].imagelist!=""){
						var imagelists=data.lists[i].imagelist.split(",");
						html+=imagelists[0];
					}else{
						html+='../imgeas/muyou.png';
					};
					html+='" /></div><div class="txtlis"><h3><a href="';
					html+='../shopdetails.html?us='+data.lists[i].selluserid;
					html+='">';
					html+=data.lists[i].sellername;
					html+='</a></h3><p>商品描述：<span>';
					if(data.lists[i].avgscore!=""&&data.lists[i].avgscore!=null){
						var avgscore=data.lists[i].avgscore.split(",");
						html+=avgscore[2];
						html+='</span>物流评分：<span>';
						html+=avgscore[0];
						html+='</span>服务评分：<span>';
						html+=avgscore[1];
					}else{
						html+='--';
						html+='</span>物流评分：<span>';
						html+='--';
						html+='</span>服务评分：<span>';
						html+='--';
					};
					html+='</span></p><p>店铺地址：';
					if(data.lists[i].selleraddress==null||data.lists[i].selleraddress==""){
						data.lists[i].selleraddress="--";
					};
					html+=data.lists[i].selleraddress;
					html+='</p></div><div class="quanlis">';
					if(data.lists[i].havacoupons==1){
						html+='<p class="quanlisp"><span>￥优惠券</span></p><div class="quanlist"></div>';
					};
					html+='</div><div class="strolis"><p><span class="notlike">取消收藏</span></p></div></div>';
				};
				$("#stroelik").prepend(html);
				$(".notlike").click(function(){
					//alert($(this).parents(".stroelis").attr("name"));
					var sellUserid=$(this).parents(".stroelis").attr("name");
					var obj=$(this).parents(".stroelis");
					$.ajax({
						type:"get",
						url:url+"/cli/CS/cancel",
						data:{token:token,sellUserid:sellUserid,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("取消成功");
								obj.remove();
							}else{
								gadget_popupt("取消失败");
							};
						},
						error:function(){
							gadget_popupt("取消失败，请重试");
						}
					});
				});
				
	$(".quanlisp span").click(function(){
		$(this).parent("p").siblings(".quanlist").show();
		var sells=$(this).parents(".stroelis").attr("name");
		var obj=$(this).parent("p").siblings(".quanlist");
		$.ajax({
			type:"get",
			url:url+"/cli/coupons/getBySuid/"+sells,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					obj.children(".minquan").remove();
					htm='';
					for(var c=0;c<data.lists.length;c++){
						htm+='<div class="minquan"><div class="minle"><h5>';
						if(data.lists[c].type==1){
							var arr=data.lists[c].content.split("-");
    						htm+='￥';
    						htm+=arr[1];
						};
						if(data.lists.type==2){
							htm+='免运费';
						};
						htm+='</h5><p>满<span>';
						if(data.lists[c].type==1){
							var arr=data.lists[c].content.split("-");
    						htm+=arr[0];
						};
						if(data.lists[c].type==2){
							htm+='0';
						}
						htm+='</span>可用</p>';
						htm+='<p>过期时间：';
						var enddate=data.lists[c].enddate.split(" ");
						htm+=enddate[0];
						htm+='</p></div><div class="minri">';
						htm+='<p><span class="minrispan" name="';
						htm+=data.lists[c].couponsid;
						htm+='">领取</span></p></div></div>';
					};
					obj.append(htm);
					$(".minrispan").click(function(){
						var couponsid=$(this).attr("name");
						$.ajax({
							type:"post",
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
								gadget_popupt("领取失败，请重试");
							}
						});
					});
				};
			},
			error:function(){
				
			}
		});
	});
	$(".quanlis").click(function(event){
		event.stopPropagation();
	});
	$("#body").click(function(){
		$(".quanlist").hide();
	});
				
				
			
	};
	
})
