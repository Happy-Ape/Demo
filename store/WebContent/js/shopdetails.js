$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var peopletype=$.cookie('peopletype');
	var rootId=1;
	var open=1;
	var str=20;
	
	
	$("#bigimg").mouseleave(function(){
		$("#bigimglef").fadeOut();
		$("#bigimgrig").fadeOut();
	}).mouseenter(function(){
		$("#bigimglef").fadeIn();
		$("#bigimgrig").fadeIn();
	});
	$("#bigimglef").click(function(){
		var big=$("#bigim img").length*300;
		var margintop=$("#bigim").css("margin-top").split("p");
		margintop=Number(margintop[0])-300;
		if(margintop<=big*-1){
			margintop=0
		};
		$("#bigim").css("margin-top",margintop+"px")
	});
	$("#bigimgrig").click(function(){
		var big=$("#bigim img").length*300;
		var margintop=$("#bigim").css("margin-top").split("p");
		margintop=Number(margintop[0])+300;
		if(margintop>0){
			margintop=big*-1+300
		};
		$("#bigim").css("margin-top",margintop+"px")
	});
	function martop(){
		var big=$("#bigim img").length*300;
		var margintop=$("#bigim").css("margin-top").split("p");
		margintop=Number(margintop[0])-300;
		if(margintop<=big*-1){
			margintop=0
		}
		$("#bigim").css("margin-top",margintop+"px")
	}
	//setInterval(martop,6000);
	$("#morequan").toggle(function(){
		$("#yhquan").css("height","auto");
	},function(){
		$("#yhquan").css("height","104px");
	});
	$("#comshops").mouseleave(function(){
		$("#comlef").hide();
		$("#comrig").hide();
	}).mouseenter(function(){
		$("#comlef").show();
		$("#comrig").show();
	});
	$("#comlef").click(function(){
		if($("#shopmin .shopbox").length>6){
			$("#shopmin").css("margin-left","-1176px");
		};
	});
	$("#comrig").click(function(){
		if($("#shopmin .shopbox").length>6){
			$("#shopmin").css("margin-left","3px");
		};
		
	});
	
	function biglis(){
		var bigl=$("#biglis").css("margin-top").split("p");
		bigl=bigl[0]-30;
		var yo=$("#biglis p").length*30*-1;
		if(bigl<=yo){
			bigl=0;
		};
		$("#biglis").css("margin-top",bigl+"px");
	};
	//setInterval(biglis,4000);
	
	var selluserid=window.location.search;
		if(selluserid==""){
			return false;
		};
		selluserid=decodeURI(selluserid);
		selluserid=selluserid.split("=");
		if(selluserid[1]==""){
			return false;
		};
		selluserid=selluserid[1];
		$(".sosu .logsubt").click(function(){
			var searchs=$(this).siblings(".logtex").val();
			if(searchs.length<2){
				return false;
			};
			window.location.href="allprice.html?us="+selluserid+"&search="+searchs;
		});
		
		shoptop();
		function shoptop(){
			var htm='<p><a href="';
			htm+='shopdetails.html?us='+selluserid;
			htm+='"  class="heashopa">店铺首页</a><a href="';
			htm+='allprice.html?us='+selluserid;
			htm+='" >全部商品</a><a href="';
			htm+='comment.html?us='+selluserid;
			htm+='" >店铺评价</a><a href="';
			htm+='notice.html?us='+selluserid;
			htm+='" >店铺公告</a><a href="';
			htm+='about.html?us='+selluserid;
			htm+='" >关于我们</a></p>';
			$("#nametop").append(htm);
		};
		$.ajax({
			type:"get",
			url:url+"/cli/sellUser/getStoreAndCoupons/"+selluserid,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("title").html(data.pojo.sellername);
					if(data.pojo.state!=61){
						$("#bigmore").show();
						if(data.pojo.stopbusreason==""||data.pojo.stopbusreason==null){
							data.pojo.stopbusreason="暂无公告";
						};
						$("#shopnot p").html(data.pojo.stopbusreason);
						$(".logsubt").remove();
						$("#nametop").hide();
						$("#bigtxt").hide();
						$("#bigimg").hide()
						$("#yhquan").hide();
						$("#comshops").hide();
						$("#bigshop").hide();
					};
					var html='';
					html+='<h2>';
					html+=data.pojo.sellername;
					html+='</h2><a href="#"><img src="imgeas/zztb.png"/></a>';
					var other=data.pojo.experiencevalue;
					html+=expsn(other);
					html+='<p>商品描述：<span>';
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
					html+='</span>';
					if(data.message==1){
						html+='<span id="storlike">已收藏</span>';
						html+='<span id="shoplike" class="likeshow">收藏本店铺</span>';
					}else{
						html+='<span id="storlike" class="likeshow">已收藏</span>';
						html+='<span id="shoplike">收藏本店铺</span>';
					};
					html+='</p><p>店铺地址：<span>';
					if(data.pojo.selleraddress==undefined){
						data.pojo.selleraddress="--";
					};
					html+=data.pojo.selleraddress;
					html+='</span></p><p>最低发货金额<span>¥';
					if(data.pojo.minshippingprice==""||data.pojo.minshippingprice==null||data.pojo.minshippingprice==undefined){
						data.pojo.minshippingprice="--";
					};
					html+=data.pojo.minshippingprice;
					html+='</span>  邮费<span>¥';
					if(data.pojo.postage==""||data.pojo.postage==null||data.pojo.postage==undefined){
						data.pojo.postage="--";
					};
					html+=data.pojo.postage;
					html+='</span>  (满<span>¥';
					if(data.pojo.freeshippingprice==""||data.pojo.freeshippingprice==null||data.pojo.freeshippingprice==undefined){
						data.pojo.freeshippingprice="--";
					};
					html+=data.pojo.freeshippingprice;
					html+='</span>包邮)</p><p id="telmyss"><span id="shopkf" name="s'+data.pojo.phonenum+'">联系客服</span>';
					if(data.pojo.customerqq!=""&&data.pojo.customerqq!=null){
					customerqq=data.pojo.customerqq.split(",");
					for(var p=0;p<customerqq.length;p++){
					html+='<span><a href="http://wpa.qq.com/msgrd?v=3&uin='+customerqq[p]+'&site=找药吧&menu=yes" target="_blank">QQ客服</a></span>';
					};
					};
					if(data.pojo.customerservice!=""&&data.pojo.customerservice!=null){
						customerservice=data.pojo.customerservice.split(",");
						html+='<span>客服电话：';
						for(var t=0;t<customerservice.length;t++){
							html+=' ';
							html+=customerservice[t];
						};
						html+='</span>';
					};
					html+='</p>';
					$('#omg').append(html);
					$("#shopkf").click(function(){
						if(token==""||token==null){
							gadget_popupt("登录后可使用此功能");
							return false;
						};
						$("#my_im").show();
						$("#im_lang div").remove();
						$("#im_box").attr("name",$(this).attr("name"));
						$("#im_name h3").html($(this).parent("#telmyss").siblings("h2").html());
						
					});
					if(data.lists==null||data.lists==""){
						$("#yhquan").hide();
					}else{
					var htm='';
					for(var i=0;i<data.lists.length;i++){
						htm+='<div class="myquan" name="'+data.lists[i].couponsid+'"><div class="myquanle">';
						if(data.lists[i].type==2){
							htm+='<p><span>';
							htm+='免运费';
							htm+='</span></p></div><div class="myquanri">';
							htm+='<p><span>';
							htm+='任意金额';
						};
						if(data.lists[i].type==1){
							var content=data.lists[i].content.split("-");
							htm+='<p>￥<span>';
							htm+=content[1];
							htm+='</span></p></div><div class="myquanri">';
							htm+='<p>满<span>';
							htm+=content[0];
						};
						htm+='</span>可用</p><p>过期时间：';
						var enddate=data.lists[i].enddate.split(" ");
						htm+=enddate[0];
						htm+='</p><input type="button" value="领取" class="myquanbtn"/></div></div>';
					};
					$("#yhquan").append(htm);
					if(data.pojo.state!=61){
						$("#shoplike").remove();
					};
					$(".myquanbtn").click(function(){
						var coupons=$(this).parent(".myquanri").parent(".myquan").attr("name");
						$.ajax({
							type:"get",
							url:url+"/cli/coupons/insertCoupons/"+coupons+"?token="+token+"&mintime="+new Date().getTime(),
							dataType:"json",
							success:function(data){
								gadget_login(data);
								if(data.code==1){
									gadget_popupt("领取成功");
								}else{
									gadget_popupt("领取失败，"+data.message);
								};
							},
							error:function(){
								gadget_popupt("领取失败，请刷新重试");
							}
						});
					});
					
					
					if(data.lists.length<3){
						$('#morequan').hide();
					};
					};
					$("#shoplike").click(function(){
						if(peopletype==null){
						gadget_popupt("请登录");
						return false;
					};
					
					if(peopletype!=1&peopletype!=2&peopletype!=3){
						gadget_popupt("仅限终端用户.");
						return false;
					};
						$.ajax({
							type:"get",
							url:url+"/cli/CS/save/"+selluserid,
							data:{token:token,mintime:new Date().getTime()},
							dataType:"json",
							success:function(data){
								gadget_login(data);
									if(data.code==1){
										gadget_popupt("收藏成功");
										$("#shoplike").addClass("likeshow");
										$("#storlike").removeClass("likeshow");
									}else{
										gadget_popupt("收藏失败"+data.message);
									};
							},
							error:function(){
								gadget_popupt("收藏失败，请重试");
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
			url:url+"/cli/content/getStoreCon/"+selluserid,
			data:{mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					htm='';
					hcm='';
					if(data.lists.length==0||data.lists==null){
						$("#bigimg").hide();
					}else{
						hcm+='<div class="vig_pic_li healbao">';
					for(var v=0;v<data.lists.length;v++){
							hcm+='<a ';
							if(v==0){
								hcm+=' class="vig_pic_lia"';
							};
							hcm+='></a>';
						};
						hcm+='</div>';
					for(var i=0;i<data.lists.length;i++){
					htm+='<a  ';
					
					if(data.lists[i].url!=""&&data.lists[i].url!=null){
						htm+=' target="_blank" href="';
						htm+=data.lists[i].url;
						htm+='"';
					};
					if(data.lists[i].content!=""&&data.lists[i].content!=null){
						htm+=' target="_blank" href="';
						htm+='informationmore.html?m='+data.lists[i].contentid;
						htm+='"';
					};
					htm+=' title="';
					htm+=data.lists[i].title;
					htm+='"><img ';
					if(i==0){
						htm+='class="big_pic_show"';
					};
					htm+=' src="';
					htm+=data.lists[i].bigimage;
					htm+='" /></a>'
					};
					htm=htm+hcm;
					$("#bigim").append(htm);
					vig_pic_v(4000);
					};
				}else{
					$("#bigimg").hide();
				};
			},
			error:function(){
				
			}
		});
		$.ajax({
			type:"get",
			url:url+"/cli/SN/getAllMyNotice/"+selluserid+"/1/1/10",
			data:{mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					htm='';
					if(data.lists.length==0||data.lists==null){
						$("#bigtxt").hide();
					}else{
					for(var i=0;i<data.lists.length;i++){
						htm+='<p>公告：<a target="_blank" href="';
						htm+='informationmore.html?s='+data.lists[i].noticeid;
						htm+='" target="_blank">';
						htm+=data.lists[i].title;
						htm+='</a></p>';
					};
					$("#biglis").append(htm);
					};
				}else{
					$("#bigtxt").hide();
				};
			},
			error:function(){
				
			}
		});
		$.ajax({
			type:"get",
			url:url+"/cli/homeDrug/getSuRd/20/"+selluserid+"/1",
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var htm='';
					if(data.lists.length==0||data.lists==null){
						$('#comshops').hide();
					}else{
					for(var i=0;i<data.lists.length;i++){
						htm+='<div class="shopbox"><div class="shopimg"><a target="_blank" href="';
						htm+='Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
						htm+='"><img src="';
						var listsimg=data.lists[i].listimg.split(";")
						htm+=listsimg[0];
						htm+='"/></a></div><p><a target="_blank" href="';
						htm+='Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
						htm+='">';
						htm+=data.lists[i].aliascn;
						htm+='</a></p><p>规格:<span>';
						htm+=data.lists[i].specification;
						htm+='</span>价格:￥<span>';
						if(token==""||token==null||data.lists[i].sellPrice==0){
							data.lists[i].sellPrice="认证可见";
						};
						
						if(data.lists[i].sellPrice==undefined){
							data.lists[i].sellPrice="--";
						};
						
						htm+=data.lists[i].sellPrice;
						htm+='</span></p><p>';
						htm+=data.lists[i].manufacturer;
						htm+='</p></div>';
					};
					$('#shopmin').append(htm);
					};
				}else{
					$('#comshops').hide();
				};
			},
			error:function(){
				
			}
		});
		$.ajax({
			type:"get",
			url:url+"/cli/homeDrug/getSuRd/21/"+selluserid+"/1",
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var htm='';
					for(var i=0;i<data.lists.length;i++){
						htm+='<li class="hotshops"><p><span class="hotspan">';
						htm+=i+1;
						htm+='</span><a target="_blank" href="';
						htm+='Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
						htm+='">';
						htm+=data.lists[i].aliascn;
						htm+='</a></p><div class="hotshoplis"><div class="hotlisimg"><a target="_blank" href="';
						htm+='Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
						htm+='"><img src="';
						var listsimg=data.lists[i].listimg.split(";");
						htm+=listsimg[0];
						htm+='" /></a></div><div class="hotlistxt"><p>';
						htm+=data.lists[i].manufacturer;
						htm+='</p><p>价格：￥<span>';
						if(token==""||token==null||data.lists[i].sellPrice==0){
							data.lists[i].sellPrice="认证可见";
						};
						if(data.lists[i].sellPrice==undefined){
							data.lists[i].sellPrice="--"
						};
						htm+=data.lists[i].sellPrice;
						htm+='</span></p></div></div></li>';
					};
					$('#heashops ul').append(htm);
					$(".hotshops").mouseenter(function(){
						$(this).siblings().children(".hotshoplis").hide();
						$(this).children(".hotshoplis").show();
					});
				};
			},
			error:function(){
				
			}
		});
		$.ajax({
			type:"get",
			url:url+"/cli/sellUser/getOneCate/"+selluserid,
			data:{mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var htm='';
					for(var i=0;i<data.lists.length;i++){
						if(i==0){
							rootId=data.lists[0].cateid;
						};
						htm+='<p ';
						if(i==0){
							htm+='class="cop"';
						};
						htm+='name="';
						htm+=data.lists[i].cateid;
						htm+='">';
						htm+=data.lists[i].catename;
						htm+='</p>';
					};
					$('#healename').append(htm);
					$('#healename p').click(function(){
						$(this).addClass("cop");
						$(this).siblings("p").removeClass("cop");
						rootId=$(this).attr("name");
						open=1;
						getdrugs(rootId);
					});
					getdrugs(rootId);
				};
			},
			error:function(){
				
			}
		});
		function getdrugs(rootId){
		$.ajax({
			type:"get",
			url:url+"/cli/sellUser/getOneCateDrugs/"+selluserid+"/"+rootId+"/"+open+"/"+str,
			data:{token:token,time:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					//console.log("==========");
					shopbox(data);
					var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					
					$("#ismyipiks").html(st);
					$("#isdangqs").html("1");
				};
			},
			error:function(){
				console.log("..");
			}
		});

		};
		//下一页
	$("#cmaismops").click(function(){
		open=parseInt($("#isdangqs").html())+1;
		if(open>$("#ismyipiks").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getOneCateDrugs/"+selluserid+"/"+rootId+"/"+open+"/"+str,
			data:{token:token,time:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shopbox(data);
					$("#isdangqs").html(open)
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
	$("#cmaismpas").click(function(){
		open=parseInt($("#isdangqs").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getOneCateDrugs/"+selluserid+"/"+rootId+"/"+open+"/"+str,
			data:{token:token,time:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shopbox(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	//跳转
	$("#ismytzans").click(function(){
		open=Number($(".cmaisps input[type='number']").val());
		if(open==""){
			return false;
		};
		if(open>$("#ismyipiks").html()){
			open=$("#ismyipiks").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getOneCateDrugs/"+selluserid+"/"+rootId+"/"+open+"/"+str,
			data:{token:token,time:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shopbox(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
		function shopbox(data){
					$("#hearight .shopbox").remove();
					var htm='';
					
					for(var i=0;i<data.lists.length;i++){
						htm+='<div class="shopbox"><div class="shopimg"><a target="_blank" href="';
						htm+='Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
						htm+='"><img src="';
						var listsimg=data.lists[i].listimg.split(";")
						htm+=listsimg[0];
						htm+='"/></a></div><p><a target="_blank" href="';
						htm+='Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid;
						htm+='">';
						htm+=data.lists[i].aliascn;
						htm+='</a></p><p>';
						htm+=data.lists[i].manufacturer;
						htm+='</p><p>规格:<span>';
						htm+=data.lists[i].specification;
						htm+='</span>价格:￥<span>';
						if(token==""||token==null||data.lists[i].sellprice==0){
							data.lists[i].sellprice="认证可见";
						};
						if(data.lists[i].sellprice==undefined){
							data.lists[i].sellprice="--";
						};
						htm+=data.lists[i].sellprice;
						htm+='</span></p></div>';
					};
					
					$("#hearight").prepend(htm);
		};
		
		
		function expsn(other){
		var html='';
					if(other==0){
						html+='<img src="imgeas/chushi.png">';
					};
				if(other>=1&&other<=250){
					if(other>=1&&other<=10){
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=11&&other<=40){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=41&&other<=90){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=91&&other<=150){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=151&&other<=250){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
				};
				if(other>=251&&other<=10000){
					if(other>=251&&other<=500){
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=501&&other<=1000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=1001&&other<=2000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=2001&&other<=5000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=5001&&other<=10000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
				};
				if(other>=10001&&other<=500000){
					if(other>=10001&&other<=20000){
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=20001&&other<=50000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=50001&&other<=100000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=100001&&other<=200000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=200001&&other<=500000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
				};
				if(other>=500001){
					if(other>=500001&&other<=1000000){
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=1000001&&other<=2000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=2000001&&other<=5000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=5000001&&other<=10000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=10000001&&other<=20000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=20000001&&other<=90000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
				};
				return html;
	};
	
})
