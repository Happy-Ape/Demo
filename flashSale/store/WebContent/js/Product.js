$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var peopletype=$.cookie('peopletype');
	var sccont="";
	$("#body").click(function(){
		$("#shopmin").hide();
		$("#imgmin").hide();
	});
	$(".shopxqfl a").eq(0).click(function(){
		$(this).attr("class","shopxqfla");
		$(this).siblings().removeAttr("class","shopxqfla");
		$(".shopsuomi").css("display","block");
		$(".shoppingj").css("display","none");
		$(".shopliuc").css("display","none");
		$(".shopcity").css("display","none");
	});
	$(".shopxqfl a").eq(1).click(function(){
		$(this).attr("class","shopxqfla");
		$(this).siblings().removeAttr("class","shopxqfla");
		$(".shopsuomi").css("display","none");
		$(".shoppingj").css("display","block");
		$(".shopliuc").css("display","none");
		$(".shopcity").css("display","none");
	});
	$(".shopxqfl a").eq(2).click(function(){
		$(this).attr("class","shopxqfla");
		$(this).siblings().removeAttr("class","shopxqfla");
		$(".shopsuomi").css("display","none");
		$(".shoppingj").css("display","none");
		$(".shopliuc").css("display","block");
		$(".shopcity").css("display","none");
	});
	$(".shopxqfl a").eq(3).click(function(){
		$(this).attr("class","shopxqfla");
		$(this).siblings().removeAttr("class","shopxqfla");
		$(".shopsuomi").css("display","none");
		$(".shoppingj").css("display","none");
		$(".shopliuc").css("display","none");
		$(".shopcity").css("display","block");
	});
	
	$(".shopcart span").click(function(){
		$(this).attr("class","shopcartred");
		$(this).siblings().removeAttr("class","shopcartred");
	});
	
	
	var drugids=window.location.search;
	//?drugid=1&selluserid=3
	drugids=drugids.split("&");
	var drugid=drugids[0].split("=");
	var selluserid=drugids[1].split("=");
	drugid=drugid[1];
	selluserid=selluserid[1];
	
	//console.log(selluserid);
//	console.log(peopletype)
	//if(peopletype!=1&&peopletype!=2&&peopletype!=0){
		//	var datat={token:"",mintime:new Date().getTime()};
	//	}else{
			var datat={token:token,mintime:new Date().getTime()};
		//};
	$.ajax({
		type:"get",
		url:url+"/cli/sellDrug/getOneDrugAllInfo/"+drugid+"/"+selluserid,
		data:datat,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				//console.log(data)
				$("title").html(data.pojo.namecn);
					data.pojo.actState=get_datet(data);
					var rootid=data.pojo.rootid;
					var html='';
					html+='<div class="shopproname"><a href="shopdetails.html?us='+selluserid+'">';
					html+=data.pojo.sellername;
					html+='</a>';
					//html+='<span class="shoppan" name="s'+data.pojo.phonenum+'"><i class="iconfont">&#xe616;</i>联系店铺客服</span>';
					html+='<p>';
					var other=data.pojo.experiencevalue;
					html+=expsn(other);
					html+='</p><p class="shopcityt">商品描述：<span>';
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
					html+='<p class="shopcityt">最低发货金额¥<span>';
					if(data.pojo.minshippingprice==""||data.pojo.minshippingprice==null||data.pojo.minshippingprice==undefined){
						data.pojo.minshippingprice="--";
					};
					var minshippingprice=data.pojo.minshippingprice
					html+=data.pojo.minshippingprice;
					html+='</span> 邮费¥<span>';
					if(data.pojo.postage==""||data.pojo.postage==null||data.pojo.postage==undefined){
						data.pojo.postage="--";
					};
					html+=data.pojo.postage;
					html+='</span> (满¥<span>';
					if(data.pojo.freeshippingprice==""||data.pojo.freeshippingprice==null||data.pojo.freeshippingprice==undefined){
						data.pojo.freeshippingprice="--";
					};
					html+=data.pojo.freeshippingprice;
					html+='</span>包邮)</p>';
					html+='</span></p><p id="telmyss"><span id="shopkf" name="s'+data.pojo.phonenum+'">联系客服</span>';
					if(data.pojo.customerQQ!=""&&data.pojo.customerQQ!=null){
						customerQQ=data.pojo.customerQQ.split(",");
						for(var f=0;f<customerQQ.length;f++){
							html+='<a href="http://wpa.qq.com/msgrd?v=3&uin='+customerQQ[f]+'&site=找药吧&menu=yes"><span>QQ客服</span></a>';
						};
					};
					if(data.pojo.customerService!=""&&data.pojo.customerService!=null){
						html+='<span>联系电话：';
						customerService=data.pojo.customerService.split(",");
						for(var h=0;h<customerService.length;h++){
							html+=' ';
							html+=customerService[h];
						};
						html+='</span>';
					};
					html+='</p></div><div class="shopnice" name="';
					html+=data.pojo.activityid;
					html+='"><div class="shopimg"><div href="';
					
					if(data.pojo.mydrugimages==""||data.pojo.mydrugimages=="1"||data.pojo.mydrugimages==undefined){
						var imgpic=data.pojo.listimg;
						var imgspt=";";
					}else{
						var imgpic=data.pojo.mydrugimages;
						var imgspt=",";
					};
					imgpic=imgpic.split(imgspt);
					html+=imgpic[0];
					html+='" id="demo" style="position: relative;float:left;"><img class="shopimgbig" src="';
					html+=imgpic[0];
					html+='"><img class="shopimgbig" src="';
					html+=imgpic[0];
					html+='" style="display: none;" width="960" height="720"></div><div class="shopcityimg">';
					html+='<ul>';
					if(imgpic.length>1){
						imgpic.length=imgpic.length-1;
					};
					var ctm='';
					for(var c=0;c<imgpic.length;c++){
						html+='<li><img src="';
						html+=imgpic[c];
						html+='"></li>';
						ctm+='<img src="'+imgpic[c]+'"><br>';
					};
					if(data.pojo.drugdetail&&data.pojo.drugdetail!=""){
						$(".shopxximg").append(data.pojo.drugdetail);
					}else{
						$(".shopxximg").append(ctm);
					};
					html+='</ul></div></div><div class="shopimgnice">';
					if(data.pojo.sestate==61){
						if(data.pojo.isCollect==0){
							html+='<div id="collection"><p>点击收藏</p></div><div id="collections" style="display:none"><p>已收藏</p></div>';
						}else{
							html+='<div id="collection" style="display:none"><p>点击收藏</p></div><div id="collections"><p>已收藏</p></div>';
						};
					};
					if(data.pojo.drugtype!=2){
					html+='<span id="isotc">otc</span>';
					html+='<h5 id="namecn">';
					html+=data.pojo.namecn;
					html+='</h5>';
					};
					html+='<p>通用名：';
					html+=data.pojo.aliascn;
					html+='</p><p>采购价：';
					if(data.pojo.activityid!=0){
						if(data.pojo.actType==4||data.pojo.actType==3){
							sccont=Number(data.pojo.discountprice);
						}else{
							sccont=data.pojo.actCentent;
						};
					};
					if(data.pojo.activityid!=0&&data.pojo.actState!=-1){
						//有活动
						if(data.pojo.actType==4||data.pojo.actType==3){
							
							//特价||秒杀
							if(token==""||token==null){
								//
								/*html+='<s style="color:#d4d4d4">￥<span id="pricen">';
								html+='认证可见';
								html+='</span></s>￥<span>';
								html+='认证可见';
								html+='</span>';*/
							}else{
								if(data.pojo.sellprice==0){
									data.pojo.sellprice="认证可见";
								};
								if(data.pojo.discountprice==0){
									data.pojo.discountprice="认证可见";
								};
								if(data.pojo.actState==2||data.pojo.actState==-2){
									var actBegin=data.pojo.actBeginDate;
										actBegin=Date.parse(new Date(actBegin));
										if(actBegin<data.message){
											html+='<s style="color:#d4d4d4">￥<span id="dispri">';
											html+=data.pojo.sellprice;
											html+='</span></s>￥<span id="pricen">';
											html+=data.pojo.discountprice;
											html+='</span>';
										}else{
											html+='￥<span id="dispri">';
											html+=data.pojo.sellprice;
											html+='</span>';
										};
								}else if(data.pojo.actState==1){
									var actEnd=data.pojo.actEndDate;
										actEnd=Date.parse(new Date(actEnd));
										if(actEnd>=data.message){
											//活动进行中
											html+='<s style="color:#d4d4d4">￥<span id="dispri">';
											html+=data.pojo.sellprice;
											html+='</span></s>￥<span id="pricen">';
											html+=data.pojo.discountprice;
											html+='</span>';
										}else{
											html+='￥<span id="dispri">';
											html+=data.pojo.sellprice;
											html+='</span>';
										};
								}else{
									html+='￥<span id="dispri">';
									html+=data.pojo.sellprice;
									html+='</span>';
								};
								
							}; 
						}else{
							html+='￥<span id="dispri">';
							if(data.pojo.sellprice==0){
								data.pojo.sellprice="认证可见";
							};
							html+=data.pojo.sellprice;
							html+='</span>';
						};
					}else{
						html+='￥<span id="dispri">';
						if(data.pojo.sellprice==0){
							data.pojo.sellprice="认证可见";
						};
						html+=data.pojo.sellprice;
						html+='</span>';
					}
					if(data.pojo.actState==undefined){
						data.pojo.actState=0;
					};
					if(data.pojo.actType==undefined){
						data.pojo.actType=0;
					};
					if(data.pojo.drugtype==2){
						html+='/公斤';
					};
					html+='</p><p>当前库存：<span id="shopkuc" st="'+data.pojo.actState+'" ty="'+data.pojo.actType+'">';
					html+=get_stock(data);
					html+='</span></p><p>生产厂商：';
					html+=data.pojo.manufacturer;
					html+=' </p>';
					if(data.pojo.drugtype!=2){
						html+='<p>批准文号：';
						html+=data.pojo.codename;
						html+='</p>';
					};
					html+='<p class="shopcart">规格：<span class="shopcartred">';
					html+=data.pojo.specification;
					html+='</span></p>';
					if(data.pojo.activityid!=0&&data.pojo.actState!=-1){
						if(data.pojo.actState==2||data.pojo.actState==-2){
							var actBeginDate=data.pojo.actBeginDate;
								actBeginDate=Date.parse(new Date(actBeginDate));
								if(actBeginDate<data.message){
									html+=htmllisl(data);
								};
						};
						if(data.pojo.actState==1){
							var actEndDate=data.pojo.actEndDate;
								actEndDate=Date.parse(new Date(actEndDate));
								if(actEndDate>=data.message){
									//活动进行中
									html+=htmllisl(data);
								};
						};
					};
					html+='<span class="shopgmsl">购买数量 ';
					html+=':</span>';
					html+='<input class="shopsf" id="shopsfjia" type="button" value="+"/>';
					html+='<input id="shopval" type="number" onkeyup=checkn(this) onafterpaste=checkm(this) name="number" minnum="'+data.pojo.mindeliverynum+'" value="'+data.pojo.mindeliverynum+'"/>';
					html+='<input class="shopsf" id="shopsfjian" type="button" value="-" />';
					if(data.pojo.drugtype==2){
						html+='<span class="shopgmsl">(单位：公斤)</span>';
					};
					html+='<br>';
					if(data.pojo.sestate!=61){
						html+='<input type="submit" value="立即购买" id="mysu"/>';
						html+='<input type="button" value="加入清单列表" id="mtbn"/>';
					}else{
						if(data.pojo.actType==3){
							if(get_stock(data)<1){
								html+='<input type="submit" value="立即购买" id="mysu"/>';
							}else if(data.pojo.actState==2||data.pojo.actState==-2){
									var actBegin=data.pojo.actBeginDate;
										actBegin=Date.parse(new Date(actBegin));
										if(actBegin<data.message){
											html+='<input type="submit" value="立即购买" id="mysubmit"/>';
										}else{
											html+='<input type="submit" value="立即购买" id="mysubmit"/>';
										};
								}else if(data.pojo.actState==1){
									var actEnd=data.pojo.actEndDate;
										actEnd=Date.parse(new Date(actEnd));
										if(actEnd>=data.message){
											//活动进行中
											html+='<input type="submit" value="立即购买" id="mysubmit"/>';
										}else{
											html+='<input type="submit" value="立即购买" id="mysubmit"/>';
										};
								}else{
									html+='<input type="submit" value="立即购买" id="mysubmit"/>';
								};
						}else{
							html+='<input type="submit" value="立即购买" id="mysubmit"/>';
							html+='<input type="button" value="加入清单列表" id="mybutton"/>';
						};
					};
					
					
					html+='<div class="shoptishi"></div></div></div>';
				$(".shoppro").prepend(html);
				
					
				$(".shopsuomi").append(data.pojo.drugInf);
				$(".shopcityimg li").click(function(){
					var src=$(this).children("img").attr("src")
					$(this).css("border-color","#ff8b00");
					$(this).siblings().css("border-color","#fff");
					$(".shopimgbig").attr("src",src);
					var href=$(".shopimgbig").attr("src");
					$("#demo").attr("href",href);
					$("#demo").children("div").eq(1).children("img").attr("src",href)
		
				});
				$("#shopkf").click(function(){
					if(token!=""&&token!=null){
						$("#im_name h3").html($(this).parent("#telmyss").siblings("a").html());
						$("#my_im").show();
						$("#im_box").attr("name",$(this).attr("name"));
						$("#im_lang div").remove();
					};
				});
				$("#demo").enlarge({
					// 鼠标遮罩层样式
					shadecolor: "#FFD24D",
					shadeborder: "#FF8000",
					shadeopacity: 0.4,
					cursor: "move",
					// 大图外层样式
					layerwidth: 480,
					layerheight: 360,
					layerborder: "#DDD",
					fade: true,
					// 大图尺寸
					largewidth: 960,
					largeheight: 720,
				});
			
			//	roots(rootid);
			
				
				$("#shopsfjia").click(function(){
					var shopval=$("#shopval").val();
					shopval=parseInt(shopval)+1;
					var shopkuc=$("#shopkuc").html();
					if(shopval>=shopkuc){
						shopval=shopkuc
					}
					$("#shopval").val(shopval);
				});
				$("#shopsfjian").click(function(){
					var shopval=$("#shopval").val();
					var minnum=Number($("#shopval").attr("minnum"));
						shopval=parseInt(shopval)-1;
						if(shopval<=minnum){
							shopval=minnum;
						}
						$("#shopval").val(shopval);
				});
				$("#shopval").blur(function(){
					if(Number($(this).val())>Number($("#shopkuc").html())){
						$(this).val($("#shopkuc").html());
					};
					var minnum=Number($("#shopval").attr("minnum"));
					if(Number($(this).val())<minnum){
						$(this).val(minnum);
					};
				});
				
				$("#mybutton").click(function(){
					if(peopletype==null){
						gadget_popupt("请登录");
						window.location.href="login.html";
						return false;
					};
					if(peopletype!=1&peopletype!=2&peopletype!=0){
						gadget_popupt("仅限终端用户领取.")
						return false;
					};
					var activityid=data.pojo.activityid;
					var num=$("#shopval").val();
					if(num<1){
						return false;
					};
					///addSCItem/{drugId}/{sellUserId}/{activityId}/{num}
					$.ajax({
						type:"get",
						url:url+"/cli/SC/addSCItem/"+drugid+"/"+selluserid+"/"+activityid+"/"+num,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								$("#shopmin h5").html("加入清单列表成功！");
								$("#shopmin").show();
							}else{
								gadget_popupt("加入清单列表失败");
							};
						},
						error:function(){
							gadget_popupt("加入清单列表失败,请刷新重试");
						}
					});
				});
				$("#mysubmit").click(function(){
					if(peopletype==null){
						gadget_popupt("请登录");
						window.location.href="login.html";
						return false;
					};
					if(peopletype!=1&peopletype!=2&peopletype!=0){
						gadget_popupt("仅限终端用户.");
						return false;
					};
					var activityid=data.pojo.activityid;
					var num=$("#shopval").val();
					if(num<1){
						return false;
					};
					//drugid selluserid activityid num
					num=Number(num);
					var actType=$("#shopkuc").attr("ty")//acttype
					var imagePath=$(".shopcityimg ul li").eq(0).children("img").attr("src")//imagePath
					var drugname=$("#namecn").html()//drugname
					var price=Number($("#dispri").html())//price pricen
					var actlimt=Number($("#limcon").html())//actlimt 
					var actstate=$("#shopkuc").attr("st")//actstate
//					/sccont 活动内容
					var mystring=jjxc(activityid,actstate,actType,actlimt,sccont,price,num);
					var actcontent=getUrlParamot("give",mystring);
					var payments=getUrlParamot("payment",mystring);
					var actytype=getUrlParamot("amotype",mystring);
					payments=Number(payments).toFixed(1);
					if(payments<Number(minshippingprice)&&actytype!=1){
						gadget_popupfsev("提交失败<br>订单金额小于店铺最小发货金额！",function(){},function(){});
						return false;
					};
					var totalfee=payments;
					var standard=1;
					if(actType==3&&Number(num)<=actlimt){
						standard=2;
					};
					if(actType==undefined){actType=0}
					if(actstate==undefined){actstate=0}
					//console.log(jjxc(activityid,actstate,actType,actlimt,sccont,price,num));
					var orderrr=[{
						"num":num,
						"imagePath":imagePath,
						"drugname":drugname,
						"drugid":drugid,
						"price":price,
						"actcontent":actcontent,
						"totalfee":totalfee,
						"actid":activityid,
						"acttype":actType,
						"actlimt":actlimt,
						"actmes":sccont,
						"actstate":actstate,
						"standard":standard
					}];
					
					gadget_back("订单生成中...");
					
					$.ajax({
						type:"get",
						url:url+"/cli/order/genernatePass?token="+token+"&selluserId="+selluserid+"&drugIds="+drugid+"&nums="+num+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								var aorder={
									"couponid":0,//优惠券id
									"selluserid":parseInt(selluserid),//店铺id
									"payment":payments,//金额
									"paymenttype":"",//付款方式 可为空
									"buyermessage":"",//留言 可为空
									"buyernick":"",//用户名  可为空
									"endaddressid":"",//地址 可未空
									"endaddr":"",//收货人电话邮编 可为空
									"details":orderrr,//包括数量 价格 名字 图片 小计 说明
									"subtotal":data.message,//返回总价 
									"md5str":"",//key
									"standard":standard,//普通订单1 秒杀订单2
									"buytop":data.other,//返回店铺发货信息
									"storename":data.pojo
								};
								aorder=JSON.stringify(aorder);
								$("#car_for input[name=inf]").val(aorder);
								$("#car_for input[name=timeTimp]").val(new Date().getTime());
								$("#car_for input[name=token]").val(token);
								$("#car_for").attr("action",url+"/cli/order/saveInf");
								$("#car_for input[name=url]").val(ut+"/zhaoyb/min.html");
								$("#car_for").submit();
								$("#ifr").load(function(){
									var bgo=$("#bgo").val();
									if(bgo!=""){
										//console.log(1)
										//getUrlParamot("key",bgo);
										window.location.href="confirmation.html"+bgo;
									}else{
										gadget_popupf("订单生成失败，请刷新重试",0);
										gadget_back_remove();
									}
								});
								
							}else{
								gadget_popupf("订单生成失败，请刷新重试",0);
								gadget_back_remove();
							};
						},
						error:function(){
							gadget_popupf("订单生成失败，请刷新重试",0);
							gadget_back_remove();
						}
					});
					
					return false;
					$.ajax({
						type:"get",
						url:url+"/cli/SC/addSCItem/"+drugid+"/"+selluserid+"/"+activityid+"/"+num,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								window.location.href="shopcart.html";
							}else{
								console.log("失败"+data.message);
							};
						},
						error:function(){
							
						}
					});
				});
				
				$("#collection").click(function(){
					// url+"/cli/CD/save",
					if(token==""||token==null){
						gadget_popupt("请登录");
						return false;
					};
					$.ajax({
						type:"post",
						url:url+"/cli/CD/save?token="+token+"&drugid="+drugid+"&selluserid="+selluserid+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								$("#collection").hide();
								$("#collections").show();
							};
							if(data.code==-1){
								gadget_popupt(data.message);
							};
						},
						error:function(){
							gadget_popupt("收藏失败，请刷新重试");
						}
					});
					
				});
				$("#collections").click(function(){
					$.ajax({
						type:"get",
						url:url+"/cli/CD/cancel/"+drugid+"/"+selluserid,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								$("#collections").hide();
								$("#collection").show();
							};
						},
						error:function(){
							
						}
					});
					
				});
			}else{
				$("#shoppronot").show();
			};
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			//console.log(XMLHttpRequest+"XMLHttpRequest");
			//console.log(textStatus+"textStatus");
			//console.log(errorThrown+"errorThrown");
		}
	});
	
	function roots(rootid){
		$.ajax({
				type:"get",
				url:url+"/cli/drugHead/getHeadByRootid?rootid="+rootid,
				data:{token:token,mintime:new Date().getTime()},
				dataType:"text",
				success:function(data){
					gadget_login(data);
					//substring
					var bigtxt=data.substring(1,data.length-1)
					var txt=bigtxt.split(",");
					var htm='';
					for(var i=0;i<txt.length;i++){
						htm+='<dl><dt>';
						htm+=txt[i];
						htm+='</dt><dd></dd></dl>';
					};
					$(".shopsuomi").append(htm);
					
					$.ajax({
						type:"get",
						url:url+"/cli/drugValue/getValueByDrugId?drugid="+drugid,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								//console.log(data.value);
								var valu=data.value.split(",");
								for(var c=0;c<$(".shopsuomi dd").length;c++){
									$(".shopsuomi dd").eq(c).html(valu[c]);
								};
							};
							
						},
						error:function(){
							
						}
					});
					
				},
				error:function(){
						
				}
			});
			
	};
	
	var type=0;
	var open=1;
	var str=10;
	topjax();
	$("#shoplike").click(function(){
		$(this).attr("class","shopfff");
		$(this).siblings().removeClass("shopfff");
		type=3;
		topjax();
	});
	$("#secondary").click(function(){
		$(this).attr("class","shopfff");
		$(this).siblings().removeClass("shopfff");
		type=2;
		topjax();
	});
	$("#bad").click(function(){
		$(this).attr("class","shopfff");
		$(this).siblings().removeClass("shopfff");
		type=1;
		topjax();
	});
	$("#more").click(function(){
		$(this).attr("class","shopfff");
		$(this).siblings().removeClass("shopfff");
		type=0;
		topjax();
	});
	function topjax(){
		$.ajax({
		type:"get",
		url:url+"/cli/dc/getTypeAll/"+type+"/"+selluserid+"/"+drugid+"/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				langlis(data);
				if(type==0){
				var other=data.other;
				
	   			other=other.split(";");
				var srr=[];
				var xrr=[];
				for(var x=0;x<other.length;x++){
					var oth=other[x].split(":");
					xrr.push(oth[0]);
					srr.push(oth[1]);
				};
				for(var r=0;r<3;r++){
					if(xrr[r]!=r+1){
						xrr.splice(r,0,r+1)
						srr.splice(r,0,0)
					};
				};
				var lan=Number(srr[0])+Number(srr[1])+Number(srr[2]);
				$("#shoppj p span").eq(0).html("全部("+lan+")");
				$("#shoppj p span").eq(1).html("好评("+srr[2]+")");
				$("#shoppj p span").eq(2).html("中评("+srr[1]+")");
				$("#shoppj p span").eq(3).html("差评("+srr[0]+")");
				};
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
			url:url+"/cli/dc/getTypeAll/"+type+"/"+selluserid+"/"+drugid+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					langlis(data);
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
			url:url+"/cli/dc/getTypeAll/"+type+"/"+selluserid+"/"+drugid+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					langlis(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.");
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	//跳转
	$("#ismytzans").click(function(){
		open=$(".cmaisps input[type='number']").val()
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
			url:url+"/cli/dc/getTypeAll/"+type+"/"+selluserid+"/"+drugid+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					langlis(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.");
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});

	function langlis(data){
		console.log(data)
				$(".shoppingj .shoppjia").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="shoppjia"><div class="shoppjial"><p><span>';
					if(data.lists[i].dctype==1){
						html+='差评';
					};
					if(data.lists[i].dctype==2){
						html+='中评';
					};
					if(data.lists[i].dctype==3){
						html+='好评';
					};
					html+='</span></p></div><div class="shoppjiaz"><p><span>评价时间：';
					html+=data.lists[i].createdtime;
					html+='</span><br>';
					html+=data.lists[i].txtcontent;
					html+='</p>';
					if(data.lists[i].imagescontent!=""&&data.lists[i].imagescontent!=null){
						html+='<div class="oicdiv">';
						var imgs=data.lists[i].imagescontent.split(";");
						for(var c=0;c<imgs.length;c++){
							html+='<img src="';
							html+=imgs[c];
							html+='"/>';
						};
						html+='</div>';
					};
					if(data.lists[i].childDC!=null){
						html+='<p><span>卖家回复时间：';
						html+=data.lists[i].childDC.createdtime;
						html+='</span><br>';
						html+=data.lists[i].childDC.txtcontent;
						html+='</p>';
					};
					html+='</div><div class="shoppjiar">';
					if(data.lists[i].isanonymous==1){
						html+='<p>匿名评论…</p>';
					}else{
						html+=data.lists[i].endname;
					};
					html+='</div></div>';
				};
				$("#shoppj").after(html);
				
				// "other": 
	  			$(".oicdiv img").click(function(event){
	  				event.stopPropagation();
	  				$("#imgmin img").attr("src",$(this).attr("src"));
	  				$("#imgmin").show();
	  			});
			
	};
	
	function get_datet(data){
		var actse=2;
		var begintime=Date.parse(new Date(data.pojo.actBeginDate))
		var endtime=Date.parse(new Date(data.pojo.actEndDate))
		var mytime=data.message;
		//2没有开始 1正在进行中 -2 不可编辑 -1已经过期
		if(begintime<=mytime){
			//已经开始
			if(endtime<mytime){
				//已经结束
				actse=-1;
			}else{
				//正在进行
				actse=1;
			};
		};
		if(begintime>mytime){
			//未开始30*60*1000 1800000
			if((mytime+1800000)>begintime){
				//不可编辑
				actse=-2;
			}else{
				//未开始
				actse=2;
			};
		};
		return actse;
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
	
	function htmllisl(data){
		var html='';
									//活动进行中
									//actType 1 折扣（多种）2 买赠（多种） 4特价活动 3平台秒杀活动
									if(data.pojo.actType==1){
										//折扣
										
										var actCentent=data.pojo.actCentent.split(";");
										var trr=actCentent[0].split(",");
										var urr=actCentent[1].split(",");
										html+='<p id="actcentent">此商品';
										for(var n=0;n<trr.length;n++){
											html+='<span>购买';
											html+=trr[n];
											html+='个';
											html+=urr[n]/10;
											html+='折</span>';
										};
										html+='</p>';
										html+='<p>购买数量小于<i id="limcon" style="color:red;font-style:normal">';
										html+=data.pojo.actLimitcount;
										html+='</i>个享受活动，超出部分按结算价为准</p><p>活动时间：'+data.pojo.actBeginDate+'-'+data.pojo.actendDate+'</p>';
										html+='<div id="tyfspo"><p>折扣活动</p></div>';
									};
									if(data.pojo.actType==2){
										//买赠
										
										var actCentent=data.pojo.actCentent.split(";");
										var trr=actCentent[0].split(",");
										var urr=actCentent[1].split(",");
										html+='<p id="actcentent">此商品';
										for(var n=0;n<trr.length;n++){
											html+='<span>购买';
											html+=trr[n];
											html+='个赠送';
											html+=urr[n];
											html+='个</span>';
										};
										html+='</p>';
										html+='<p>购买数量小于<i id="limcon" style="color:red;font-style:normal">';
										html+=data.pojo.actLimitcount
										html+='</i>个享受活动，超出部分按结算价为准</p><p>活动时间：'+data.pojo.actBeginDate+'-'+data.pojo.actEndDate+'</p>';
										html+='<div id="tyfspo"><p>买赠活动</p></div>';
									};
									if(data.pojo.actType==3){
										//平台秒杀活动
										html+='<p>购买数量小于<i id="limcon" style="color:red;font-style:normal">';
										html+=data.pojo.limitbuynum
										html+='</i>个享受活动，超出限购按结算价为准</p><p>活动时间：'+data.pojo.actBeginDate+'-'+data.pojo.actEndDate+'</p>';
										html+='<div id="tyfspo"><p>秒杀活动</p></div>';
									};
									if(data.pojo.actType==4){
										//特价活动
										html+='<p>购买数量小于<i id="limcon" style="color:red;font-style:normal">';
										html+=data.pojo.limitbuynum
										html+='</i>个享受活动，超出部分按结算价为准</p><p>活动时间：'+data.pojo.actBeginDate+'-'+data.pojo.actEndDate+'</p>';
										html+='<div id="tyfspo"><p>特价活动</p></div>';
									};
									return html;
								};
	
	
function jjxc(activityid,actstate,actType,actlimt,sccont,price,num){
						var give="";//说明
						var payment=0;
						var amotype=0;
						if(activityid!=0){
							//有活动
							if(actstate==1){
								//活动开始
								if(actType==4){
									//特价
									if(num>actlimt){
										//超出限购
										payment=(price*(num-actlimt))+(sccont*actlimt);
									}else{
										payment=sccont*num;
									}
									give="折扣活动";
								}else if(actType==2){
									//买赠 : "30,10,5;12,5,1",
									sccont=sccont.split(";");
									var mrr=sccont[0].split(",");
									var zrr=sccont[1].split(",");
									
									if(num>actlimt){
										//超出限购
										var bnum=actlimt;
									}else{
										var bnum=num;
									};
									var cfn=[];
										var cfnm=0;
										var cfmax=0;
										for(var i=0;i<mrr.length;i++){
											if(Number(bnum)>=mrr[i]){
												cfn.push(mrr[i]);
											};
										};
										cfmax=Math.max.apply(null,cfn)
										var indx=jQuery.inArray(cfmax.toString(),mrr);
										give="赠送"+zrr[indx]+"个";
										
									payment=num*price;
								}else if(actType==3){
									//平台秒杀活动
									//console.log(actlimt)
									amotype=1;
									if(num>actlimt){
										//超出限购
										payment=num*price;
										give="秒杀活动，超出限购，单价￥"+price;
									}else{
										payment=num*Number(sccont);
										give="秒杀活动，单价￥"+sccont;
									};
									
								}else if(actType==1){
									//折扣活动
									sccont=sccont.split(";");
									var err=sccont[0].split(",");
									var drr=sccont[1].split(",");
									var cfn=[];
									var cfnm=0;
									var cfmax=0;
									if(num>actlimt){
										//超出限购 ": "60,20,5;50,70,80",
										var anum=num-actlimt;
										var bnum=actlimt;
										for(var i=0;i<err.length;i++){
											if(Number(bnum)>=err[i]){
												cfn.push(err[i]);
											};
										};
										cfmax=Math.max.apply(null,cfn);
										var indx=jQuery.inArray(cfmax.toString(), err);
										zhek=drr[indx];//折扣
										zhek=Number(zhek)/100;
										give=actlimt+"以内的商品，享受"+zhek*10+"折";
										payment=(bnum*price*zhek)+(anum*price);
									}else{
										
										for(var i=0;i<err.length;i++){
											if(Number(num)>=err[i]){
												cfn.push(err[i]);
											}else{
												cfn.push(1);
											}
										};
										cfmax=Math.max.apply(null,cfn);
										
										var indx=jQuery.inArray(cfmax.toString(), err);
										if(indx>=0){
											zhek=drr[indx];//折扣
											zhek=Number(zhek)/100;
											payment=num*price*zhek;
											give=actlimt+"以内的商品，享受"+zhek*10+"折";
										}else{
											zhek=1;
											payment=num*price*zhek;
											give=actlimt+"暂无";
										};
										
										
									};
									
								}else{
									//没有活动
									payment=num*price;
									give="暂无";
								}
							}else{
								//活动没开始或已结束
								payment=num*price;
								give="暂无";
							}
						}else{
							//没活动
							payment=num*price;
							give="暂无";
						}
						return "?give="+give+"&payment="+payment+"&amotype="+amotype;
					};	
function get_stock(data){
	var txt_stock="";
					if(data.pojo.actType==3){
						if(data.pojo.actState==1||data.pojo.actState==-2){
							if(data.pojo.actState==-2){
									var actBegin=data.pojo.actBeginDate;
										actBegin=Date.parse(new Date(actBegin));
										if(actBegin<data.message){
											txt_stock=data.pojo.kill_stock;
										}else{
											txt_stock=data.pojo.sellstock;
										};
								}else if(data.pojo.actState==1){
									var actEnd=data.pojo.actEndDate;
										actEnd=Date.parse(new Date(actEnd));
										if(actEnd>=data.message){
											//活动进行中
											txt_stock=data.pojo.kill_stock;
										}else{
											txt_stock=data.pojo.sellstock;
										};
								}else{
									txt_stock=data.pojo.sellstock;
								};
						}else{
							txt_stock=data.pojo.sellstock;
						};
					}else{
						txt_stock=data.pojo.sellstock;
					};
					if(txt_stock==undefined||txt_stock<0){txt_stock=0}
	return txt_stock;
};
})
