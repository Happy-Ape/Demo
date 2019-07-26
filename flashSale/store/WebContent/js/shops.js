$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var sellus=$.cookie('peopleus');
	var peoplestate=$.cookie('peoplestate');
	if($.cookie("peopletype")==6&&peoplestate==6){
		if($.cookie("xszdtype")!=1){
			gad_xszd_o();
		};
	}else if(peoplestate==-1||peoplestate==1||peoplestate==2||peoplestate==4){
		if($.cookie("xszdtype")!=1){
			gad_xszd_o();
		};
	};
	function socks(){
		var margint=$("#bansocks").css("margin-top");
		margint=margint.split("p");
		margint=Number(margint[0]);
		//console.log(margint+"margint")
		var lan=Number($("#bansocks p").length)*30;
		margint=margint-30;
		if(margint<=lan*-1){
			margint=0;
		};
		$("#bansocks").css("margin-top",margint+"px");
	};
	$("#myupno").click(function(){
		$("#shopup").hide();
	});
	$("#shopnobtn").click(function(){
		var stopbusreason=$("#shopno textarea").val();
		if(stopbusreason==""||stopbusreason==null){
			gadget_popupt("请填写暂停营业原因");
			return false;
		};
		// /cli/sellUser/stopBus/{type}
		stopbusreason=encodeURI(stopbusreason);
		$.ajax({
			type:"post",
			url:url+"/cli/sellUser/stopBus/2?stopbusreason="+stopbusreason+"&token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("店铺已暂停营业");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popups("暂停营业失败"+data.message);
				};
			},
			error:function(){
				gadget_popups("暂停营业失败,请刷新重试");
			}
		});
	});
	setInterval(socks,3000);
	$.ajax({
		type:"get",
		url:url+"/cli/notice/getNotices/1/10",
		data:{mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<p>公告：<a target="_blank" href="';
					html+='../informationmore.html?u='+data.lists[i].noticeid;
					html+='">';
					html+=data.lists[i].title;
					html+='</a></p>';
				};
				$("#bansocks").append(html);
			};
		},
		error:function(){
			
		}
	});
	$.ajax({
		type:"get",
		url:url+"/cli/sellUser/getStoreAndCoupons/"+sellus,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				html='<h3><a href="';
				if(data.pojo.sellername==undefined){
					html+='';
				}else{
					html+='../shopdetails.html?us='+data.pojo.selluserid;
				};
				html+='">';
				if(data.pojo.sellername==undefined){
					html+="未设置店铺名";
				}else{
					html+=data.pojo.sellername;
				};
				
				html+='</a></h3>';
				var other=data.pojo.experiencevalue;
				html+=expsn(other);
				html+='<p><a href="';
					
				
				if(data.pojo.type==6){
					html+='javascript:;';
				}else{
					html+='prompt.html';
				};
				html+='">';
				if(data.pojo.state==1||data.pojo.state==-1){
					html+='请上传资质';
				};
				if(data.pojo.state==2){
					html+='等待审核';
				};
				if(data.pojo.state==3){
					html+='审核未通过';
				};
				if(data.pojo.state==6||data.pojo.state==61||data.pojo.state==62){
					html+='审核通过';
				};
				html+='</a><a href="';
				
				html+='shoppic.html';
				html+='">查看店铺图片</a></p><p>商品描述<span>';
				if(data.pojo.avgscore!=""&&data.pojo.avgscore!=null){
						var avgscore=data.pojo.avgscore.split(",");
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
				html+='</span></p><p>店铺状态：<span>';
				if(data.pojo.state==61){
					html+='正在营业';
					html+='</span>';
					html+='<span id="bantxtup">暂停营业</span>';
				}else{
					if(data.pojo.sellername==undefined){
					html+='暂停营业';
					html+='</span>';
					}else{
					html+='暂停营业';
					html+='</span>';
					html+='<span id="bantxtonup">开启营业</span>';
					};
				};
				html+='</p>';
				$("#bantxt").append(html);
				$("#bantxtup").click(function(){
					$("#shopup").show();
				});
				$("#bantxtonup").click(function(){
					$.ajax({
						type:"post",
						cache: false,
						url:url+"/cli/sellUser/stopBus/1?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							console.log(data)
							if(data.code==1){
								gadget_popups("已开启营业");
								setTimeout(gadget_relo,3000);
							}else{
								if(data.message=="您的邮费等信息还没有设置,请设置!"){
									gadget_popupfs("您的邮费等信息还没有设置,请设置!",2,"postage.html",0,"去设置");
								}else if(data.message=="您的店铺信息还没有设置,请设置!"){
									gadget_popupfs("您的店铺信息还没有设置,请设置!",2,"bset.html",0,"去设置");
								}else{
									gadget_popups(data.message);
								};
							};
							/*if(data.code==-1){
								gadget_popups("开启营业失败");
							};*/
							/*if(data.code==-2){
								gadget_popups("开启营业失败,您还未设置店铺邮费");
								setTimeout(lohrf,3000);
								function lohrf(){
									window.location.href="postage.html";
								};
							};*/
						},
						error:function(){
							gadget_popups("开启营业失败，请刷新重试");
						}
					});
				});
			};
		},
		error:function(){
			
		}
	});
	$.ajax({
		type:"get",
		url:url+"/cli/order/getOrderTypeNum",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				
				if(data.pojo.two.length!=0){
					for(var i=0;i<data.pojo.two.length;i++){
						if(data.pojo.two[i].type==-1){
							$("#bantwo td").eq(1).html(data.pojo.two[i].num);
						};
						if(data.pojo.two[i].type==6){
							$("#bantwo td").eq(2).html(data.pojo.two[i].num);
							$("#bantwo td").eq(3).html(data.pojo.two[i].sumMoney);
						};
						if(data.pojo.two[i].type==0){
							$(".banshoplis").eq(0).children("h5").children("a").html(data.pojo.two[i].num);
						};
						if(data.pojo.two[i].type==1){
							$(".banshoplis").eq(1).children("h5").children("a").html(data.pojo.two[i].num);
						};
						if(data.pojo.two[i].type==-3){
							$(".banshoplis").eq(2).children("h5").children("a").html(data.pojo.two[i].num);
						};
					};
				};
				if(data.pojo.one.length!=0){
					for(var i=0;i<data.pojo.one.length;i++){
						if(data.pojo.one[i].type==-1){
							$("#banone td").eq(1).html(data.pojo.one[i].num);
						};
						if(data.pojo.one[i].type==6){
							$("#banone td").eq(2).html(data.pojo.one[i].num);
							$("#banone td").eq(3).html(data.pojo.one[i].sumMoney);
						};
						/*if(data.pojo.one[i].type==0){
							$(".banshoplis").eq(0).children("h5").children("a").html(data.pojo.one[i].num);
						};
						if(data.pojo.one[i].type==1){
							$(".banshoplis").eq(1).children("h5").children("a").html(data.pojo.one[i].num);
						};
						if(data.pojo.one[i].type==-3){
							$(".banshoplis").eq(2).children("h5").children("a").html(data.pojo.one[i].num);
						};*/
						
					};
				};
				if(data.pojo.three.length!=0){	
					for(var i=0;i<data.pojo.three.length;i++){
						if(data.pojo.three[i].type==-1){
							$("#banthree td").eq(1).html(data.pojo.three[i].num);
						};
						if(data.pojo.three[i].type==6){
							$("#banthree td").eq(2).html(data.pojo.three[i].num);
							$("#banthree td").eq(3).html(data.pojo.three[i].sumMoney);
						};
					};
				};	
				if(data.pojo.four.length!=0){
					for(var i=0;i<data.pojo.four.length;i++){
						if(data.pojo.four[i].type==-1){
							$("#banfour td").eq(1).html(data.pojo.four[i].num);
						};
						if(data.pojo.four[i].type==6){
							$("#banfour td").eq(2).html(data.pojo.four[i].num);
							$("#banfour td").eq(3).html(data.pojo.four[i].sumMoney);
						};
					};
				};
			};
		},
		error:function(){
			
		}
	});
	
	
	
	
	
	
	
function expsn(other){
		var html='';
					if(other==0){
						html+='<img src="../imgeas/chushi.png">';
					};
				if(other>=1&&other<=250){
					if(other>=1&&other<=10){
						html+='<img src="../imgeas/xinxing.png">';
					};
					if(other>=11&&other<=40){
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
					};
					if(other>=41&&other<=90){
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
					};
					if(other>=91&&other<=150){
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
					};
					if(other>=151&&other<=250){
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
						html+='<img src="../imgeas/xinxing.png">';
					};
				};
				if(other>=251&&other<=10000){
					if(other>=251&&other<=500){
						html+='<img src="../imgeas/zuanshi.png">';
					};
					if(other>=501&&other<=1000){
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
					};
					if(other>=1001&&other<=2000){
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
					};
					if(other>=2001&&other<=5000){
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
					};
					if(other>=5001&&other<=10000){
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
						html+='<img src="../imgeas/zuanshi.png">';
					};
				};
				if(other>=10001&&other<=500000){
					if(other>=10001&&other<=20000){
						html+='<img src="../imgeas/huangguan.png">';
					};
					if(other>=20001&&other<=50000){
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
					};
					if(other>=50001&&other<=100000){
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
					};
					if(other>=100001&&other<=200000){
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
					};
					if(other>=200001&&other<=500000){
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
						html+='<img src="../imgeas/huangguan.png">';
					};
				};
				if(other>=500001){
					if(other>=500001&&other<=1000000){
						html+='<img src="../imgeas/jinguan.png">';
					};
					if(other>=1000001&&other<=2000000){
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
					};
					if(other>=2000001&&other<=5000000){
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
					};
					if(other>=5000001&&other<=10000000){
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
					};
					if(other>=10000001&&other<=20000000){
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
					};
					if(other>=20000001&&other<=90000000){
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
						html+='<img src="../imgeas/jinguan.png">';
					};
				};
				return html;
	};
	
	
	
	
	
	
	
})
