$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;

	$.ajax({
		type:"get",
		url:url+"/cli/CD/getSUCollectDrug/"+open+"/"+str,
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
				//#banlisu
				gadget_err_m("暂无数据",$("#banlisu"),"100px");
				$(".cmaisop").hide();
			};
		},
		error:function(){
			gadget_err_m("网络错误，请重试",$("#banlisu"),"100px");
			$(".cmaisop").hide();
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
			url:url+"/cli/CD/getSUCollectDrug/"+open+"/"+str,
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
			url:url+"/cli/CD/getSUCollectDrug/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					liklis(data);
					$("#isodangq").html(open);
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	$("#ismyotzan").click(function(){
		open=$(".cmaisop input[type='number']").val()
		if(open==""){
			return false;
		};
		if(open>$("#ismyoipik").html()){
			open=$("#ismyoipik").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/CD/getSUCollectDrug/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					liklis(data);
					$("#isodangq").html(open)
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	function liklis(data){
		$("#banlisu .banlistum").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="banlistum" name="';
					html+=data.lists[i].selluserid;
					html+='"><div class="banpicl"><img src="';
					if(data.lists[i].mydrugimages==""||data.lists[i].mydrugimages==null||data.lists[i].mydrugimages==1){
						if(data.lists[i].listimg!=""||data.lists[i].listimg!=null){
							var mydrugimages=data.lists[i].listimg.split(",");
							html+=mydrugimages[0];
						}else{
							html+='../imgeas/muyou.png';
						};
					}else{
							var mydrugimages=data.lists[i].mydrugimages.split(",");
							html+=mydrugimages[0];
					};
					
					html+='" /></div><div class="banpinam"><h5><a href="';
					html+='../Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
					html+='" target="_blank">';
					html+=data.lists[i].aliascn;
					html+='</a></h5><p><span>￥';
					if(data.lists[i].activityid!=-1&&data.lists[i].actState!=-1&&data.lists[i].discountprice!=0){
						html+=data.lists[i].discountprice;
						html+='</span>';
						html+='<s>￥';
						html+=data.lists[i].sellprice;
						html+='</s>';
					}else{
						html+=data.lists[i].sellprice;
						html+='</span>';
					};
					html+='</p><p>规格：';
					html+=data.lists[i].specification;
					html+='</p></div><div class="banpilik">';
					if(data.lists[i].activityid!=-1&&data.lists[i].activityid!=0&&data.lists[i].actState!=-1){
						if(data.lists[i].actType!=null){
							if(data.lists[i].actType==1){
								//折扣
							var actCentent=data.lists[i].actCentent.split(";");
							var actentent=actCentent[0].split(",");
							var acttent=actCentent[1].split(",");
							for(var c=0;c<actentent.length;c++){
								html+='<span>买';
								html+=actentent[c];
								html+='个';
								html+=Number(acttent[c])/10;
								html+='折</span>';
							};
							};
							if(data.lists[i].actType==2){
								//买赠
							var actCntent=data.lists[i].actCentent.split(";");
							var acentent=actCntent[0].split(",");
							var actent=actCntent[1].split(",");
							for(var c=0;c<acentent.length;c++){
								html+='<span>买';
								html+=acentent[c];
								html+='赠';
								html+=Number(actent[c]);
								html+='</span>';
							};
							};
						};
					}else{
						html+='<span>暂无活动</span>';
					};
					
					html+='</div><div class="banpimore"><p>';
					html+=data.lists[i].endUserNum;
					html+='</p></div><div class="banpigo"><p>';
					html+='<span class="bangomore" name="';
					html+=data.lists[i].drugid;
					html+='">查看详情</span></p></div><div class="popelis"></div></div>';
				};
				$("#banlisu").append(html);
					$(".popelis").click(function(event){
						event.stopPropagation();
					});
					$("#body").click(function(){
						$(".popelis").hide();
					});
				$(".bangomore").click(function(event){
					event.stopPropagation();
						$(".popelis").hide();
						$(this).parents(".banpigo").siblings(".popelis").show();
					var obj=$(this).parents(".banpigo").siblings(".popelis");
					var drugId=$(this).attr("name");
					var sellUserId=$(this).parents(".banlistum").attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/CD/getCollectDrugUsersInf/"+drugId+"/"+sellUserId,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								obj.children(".popelist").remove();
								var htm='';
								for(var c=0;c<data.lists.length;c++){
									htm+='<div class="popelist"><p>';
									if(data.lists[c].endname==null){
										data.lists[c].endname="--";
									};
									htm+=data.lists[c].endname;
									htm+='</p>';
									var fba=data.lists[c].growthvalue;
									htm+=grow(fba);
									htm+='<p>最后交易：</p><p>';
									if(data.lists[c].lasttradetime==null){
										data.lists[c].lasttradetime="--";
									};
									htm+=data.lists[c].lasttradetime;
									htm+='</p></div>';
								};
								obj.append(htm)
							};
						},
						error:function(){
							
						}
					});
				});
	};
	function grow(fba){
		if(fba<=10){
			htm='<img src="../imgeas/buyer/br1.gif" />';
		};
		if(fba>=11&&fba<=40){
			htm='<img src="../imgeas/buyer/br2.gif" />';
		};
		if(fba>=41&&fba<=90){
			htm='<img src="../imgeas/buyer/br3.gif" />';
		};
		if(fba>=91&&fba<=150){
			htm='<img src="../imgeas/buyer/br4.gif" />';
		};
		if(fba>=151&&fba<=250){
			htm='<img src="../imgeas/buyer/br5.gif" />';
		};
		if(fba>=251&&fba<=500){
			htm='<img src="../imgeas/buyer/b1.gif" />';
		};
		if(fba>=501&&fba<=1000){
			htm='<img src="../imgeas/buyer/b2.gif" />';
		};
		if(fba>=1001&&fba<=2000){
			htm='<img src="../imgeas/buyer/b3.gif" />';
		};
		if(fba>=2001&&fba<=5000){
			htm='<img src="../imgeas/buyer/b4.gif" />';
		};
		if(fba>=5001&&fba<=10000){
			htm='<img src="../imgeas/buyer/b5.gif" />';
		};
		if(fba>=10001&&fba<=20000){
			htm='<img src="../imgeas/buyer/bc1.gif" />';
		};
		if(fba>=20001&&fba<=50000){
			htm='<img src="../imgeas/buyer/bc2.gif" />';
		};
		if(fba>=50001&&fba<=100000){
			htm='<img src="../imgeas/buyer/bc3.gif" />';
		};
		if(fba>=100001&&fba<=200000){
			htm='<img src="../imgeas/buyer/bc4.gif" />';
		};
		if(fba>=200001&&fba<=500000){
			htm='<img src="../imgeas/buyer/bc5.gif" />';
		};
		if(fba>=500001&&fba<=1000000){
			htm='<img src="../imgeas/buyer/bcr1.gif" />';
		};
		if(fba>=1000001&&fba<=2000000){
			htm='<img src="../imgeas/buyer/bcr2.gif" />';
		};
		if(fba>=2000001&&fba<=5000000){
			htm='<img src="../imgeas/buyer/bcr3.gif" />';
		};
		if(fba>=5000001&&fba<=10000000){
			htm='<img src="../imgeas/buyer/bcr4.gif" />';
		};
		if(fba>10000000){
			htm='<img src="../imgeas/buyer/bcr5.gif" />';
		};
		return htm;
		
	
	}
})
