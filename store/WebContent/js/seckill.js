$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var activid=getUrlParamo("m");
	var peopletype=$.cookie('peopletype');
	$('html,body').animate({scrollTop:$("body").offset().top}, 500);
	if(activid==null||activid==""){
		activid=1;
	};
	$(".topbtn").click(function(){
		var maxlen=Number($("#mylisor p").length)-10;
		maxlen=maxlen*-30;
		var martop=$("#mylisor").css("margin-top");
		martop=martop.split("px");
		martop=Number(martop[0])-150;
		if(martop<=maxlen){
			martop=maxlen
		};
		$("#mylisor").css("margin-top",martop+"px");
	});
	$(".bombtn").click(function(){
		
		var martop=$("#mylisor").css("margin-top");
		martop=martop.split("px");
		martop=Number(martop[0])+150;
		if(martop>0){
			martop=0
		};
		
		$("#mylisor").css("margin-top",martop+"px");
	});	
	$(".hidebtn").click(function(){
		$("#minstorbox").hide();
		$("#showstor").show();
	});
	$("#showstor").click(function(){
		$("#minstorbox").show();
		$("#showstor").hide();
	});
	var othertime="";
	var timhtml="";
	var othstate=0;
	var tbeginoth=0;
	var obeginoth=0;
	var intDiff=0;
	function getstetime(){
	$.ajax({
		type:"get",
		url:url+"/other/getSystemTime?time="+new Date().getTime(),
		async:false,
		dataType:"json",
		success:function(data){
			if(data.code==1){
				othertime=data.other;
			}else{
				othertime=new Date().getTime();
			};
		},
		error:function(){
			othertime=new Date().getTime();
		}
	});
	}
	$.ajax({
		type:"get",
		url:url+"/cli/SA/getAllKillDrug/"+activid+"?token="+token+"&time="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				//simpledesc
				$("title").html(data.pojo.simpledesc);
				 getstetime();
				 var begindate=data.pojo.begindate;
				 var enddate=data.pojo.enddate;
				begindate=Date.parse(new Date(begindate));
				enddate=Date.parse(new Date(enddate));
			//	begindate=new Date().getTime()+40000;
				//enddate=new Date().getTime()+190000;
				 //活动进行时间
				obeginoth = Number((begindate-othertime)/1000);
				 if(othertime<begindate){
				 	//没开始
				 	othstate=0;
				 	//var intDiff = begindate-othertime;
				 	//obeginoth=intDiff/1000
				 	tbeginoth = Number((enddate-begindate)/1000);
				 	intDiff=obeginoth;
				 	timer(intDiff);
				 };
				 if(othertime>=begindate&&othertime<enddate){
				 	//正在进行
				 	othstate=1;
				 	//var intDiff = enddate-othertime;
				 	//tbeginoth=intDiff/1000;
				 	tbeginoth = Number((enddate-othertime)/1000);
				 	intDiff=tbeginoth;
				 	timer(intDiff);
				 };
				 if(othertime>=enddate){
				 	//已结束
				 	othstate=2;
				 	$("#secktit h5").html("活动已结束");
				 };
				 storlise(data)
			}else{
				gadget_popupfs("活动已结束，是否返回首页",2,"index.html",0,"返回首页");
			};
		},
		error:function(){
			gadget_popupfs("网络出现问题，是否刷新重试",2,0,0,"刷新");
		}
	});
function storlise(data){
				 var arroy=[];
				for(var oi=0;oi<data.lists.length;oi++){
					for(var ob=0;ob<data.lists.length;ob++){
						if(data.lists[oi].selluserid==data.lists[ob].selluserid){
							oi=ob;
						};
					};
					/*if(oi!=0){
						oi=oi+1;
					};*/
					arroy.push(oi);
				};
				var stornam='';
				for(var a=0;a<arroy.length;a++){
					stornam+='<p';
					if(a==0){
						stornam+=' class="lispcolor"';
					};
					stornam+='>';
					stornam+=data.lists[arroy[a]].sellername;
					stornam+='</p>';
				};
				$("#mylisor").append(stornam);
				$("#mylisor p").click(function(){
					$('html,body').animate({scrollTop:$(".storlis").eq($(this).index()).offset().top}, 500);
				});
				$(window).on("scroll",function(){
					var orp=0;
					function roll(i){
						return	$(".storlis").eq(i).offset().top;
					};
					for(var i=0;i<$("#mylisor p").length;i++){
						if($(window).scrollTop()>roll(i)-100&&$(window).scrollTop()<roll(i)+140){
							$("#mylisor p").removeClass("lispcolor");
							$("#mylisor p").eq(i).addClass("lispcolor");
						};
					};
				});
				var lism='';
				var arroys=[];
				for(var u=0;u<arroy.length;u++){
					arroys.push(arroy[u]+1)
				};
				arroys.splice(0,0,0);
				for(var i=0;i<arroy.length;i++){
					lism+='<div class="storlis" vc="'+data.lists[arroy[i]].selluserid+'"><div class="stornam"><h5><a href="shopdetails.html?us='+data.lists[arroy[i]].selluserid+'">';
					lism+=data.lists[arroy[i]].sellername;
					lism+='</a></h5><p>';
					lism+='最低发货金额¥';
					lism+=data.lists[arroy[i]].minshippingprice;
					lism+=' 邮费¥';
					lism+=data.lists[arroy[i]].postage;
					lism+=' (满¥';
					lism+=data.lists[arroy[i]].freeshippingprice;
					lism+='包邮)';
					lism+='</p></div><div class="lisbox">';
					var arrlenm=arroys[i+1];
					if(arroys[i+1]==undefined){
						arrlenm=arroys[i]+1;
					};
					var arrtop=arroys[i];
					if(arroys[i]==0){
						arrtop=0;
					};
					for(var t=arrtop;t<arrlenm;t++){
						
					lism+='<div class="lisboxs" ac="'+data.lists[t].drugid+'"><div class="lispics"><a href="Product.html?drugid='+data.lists[t].drugid+'&selluserid='+data.lists[t].selluserid+'"><img src="';
					if(data.lists[t].mydrugimages==""||data.lists[t].mydrugimages=="1"||data.lists[t].mydrugimages==undefined){
						var imgpic=data.lists[t].listimg;
						var imgspt=";";
					}else{
						var imgpic=data.lists[t].mydrugimages;
						var imgspt=",";
					};
					imgpic=imgpic.split(imgspt);
					lism+=imgpic[0];
					lism+='" /></a></div><div class="listxt"><ul><li><p class="fontw fontice">¥<span>';
					if(data.lists[t].discountprice==0||token==""||token==null){
						data.lists[t].discountprice="登录可见";
					};
					lism+=data.lists[t].discountprice;
					lism+='</span><s>￥<span>';
					if(data.lists[t].sellprice){
						lism+=data.lists[t].sellprice;
					}else{
						lism+="登录可见";
					};
					
					lism+='</span></s></p></li><li><p class="fontl fontascn">';
					lism+=data.lists[t].aliascn;
					lism+='</p></li><li><p class="fontl">';
					lism+=data.lists[t].specification;
					lism+='</p></li><li><p class="fontl">';
					lism+=data.lists[t].manufacturer;
					lism+='</p></li><li><p class="fontl fonttw fontcock">剩余数量：<span class="stock">';
					lism+=data.lists[t].kill_stock;
					lism+='</span> 限购：<span class="limt">';
					lism+=data.lists[t].limitbuynum;
					lism+='</span></p></li></ul></div><div class="numbtn"><div class="numbox" tock="';
					lism+=data.lists[t].sellstock;
					lism+='">';
					if(othstate==1){
						lism+='<a class="subtraction">-</a>';
						lism+='<input type="number" class="purchase" onkeyup="checkn(this)" onafterpaste="checkm(this)" value="1" minnum="1"/>';
						lism+='<a class="addition">+</a>';
						if(data.lists[t].kill_stock>0){
							lism+='</div><div class="addbox"><a class="pushcar">立即购买</a></div></div></div>';
						}else{
							lism+='</div><div class="addbox"><a class="notcolor">立即购买</a></div></div></div>';
						};
					}else{
						lism+='<a class="notcolor subtraction">-</a>';
						lism+='<input type="number"  disabled="disabled" class="notincolor purchase" onkeyup="checkn(this)" onafterpaste="checkm(this)" value="1" minnum="1"/>';
						lism+='<a class="notcolor addition">+</a>';
						lism+='</div><div class="addbox"><a class="pushcar notcolor">立即购买</a></div></div></div>';
					};
					
					
					};
					lism+='<p class="clerb"></p></div></div>';
				};
				$("#banner").append(lism);
				selnone();
				$(".subtraction").click(function(){
					if(othstate==0){
						gadget_popupt("活动还未开始");
						return false;
					};
					if(othstate==2){
						gadget_popupt("活动已结束");
						return false;
					};
					var purchasenum=Number($(this).siblings(".purchase").val());
					purchasenum=purchasenum-1;
					if(purchasenum<0){
						purchasenum=0;
					};
					$(this).siblings(".purchase").val(purchasenum);
				});
				$(".addition").click(function(){
					if(othstate==0){
						gadget_popupt("活动还未开始");
						return false;
					};
					if(othstate==2){
						gadget_popupt("活动已结束");
						return false;
					};//活动库存
					var maxputnum=$(this).parent(".numbox").parent(".numbtn").siblings(".listxt").children("ul").children("li").children(".fontl").children(".stock").html();
					var purchasenum=Number($(this).siblings(".purchase").val());//输入数量
					var maxstok=Number($(this).parent(".numbox").attr("tock"));//非活动库存
					var olimt=$(this).parents(".numbtn").siblings(".listxt").children("ul").children("li").children("p").children(".limt").html();
					olimt=Number(olimt);//限购
					//输入数量 purchasenum 60  限购 olimt 30 活动库存 maxputnum 60 非活动库存 maxstok 50 30
					purchasenum=Number(purchasenum)+1;
					purchasenum=get_purchasenum(purchasenum,olimt,maxputnum,maxstok)
					$(this).siblings(".purchase").val(purchasenum);
				});
				$(".purchase").blur(function(){
					var maxputnum=$(this).parent(".numbox").parent(".numbtn").siblings(".listxt").children("ul").children("li").children(".fontl").children(".stock").html();
					var maxstok=Number($(this).parent(".numbox").attr("tock"));
					var purchasenum=Number($(this).val());
					var olimt=$(this).parents(".numbtn").siblings(".listxt").children("ul").children("li").children("p").children(".limt").html();
					olimt=Number(olimt);
					purchasenum=get_purchasenum(purchasenum,olimt,maxputnum,maxstok);
					if(purchasenum<0){
						purchasenum=0;
					};
					$(this).val(purchasenum);
				});
				$(".pushcar").click(function(){
					console.log($(this).attr("class"))
					if(othstate==0){
						gadget_popupt("活动还未开始");
						return false;
					};
					if(othstate==2){
						gadget_popupt("活动已结束");
						return false;
					};
					if(token==""||token==null){
						gadget_popupt("请登录");
						return false;
					};
					if(peopletype!=1&peopletype!=2&peopletype!=0){
						gadget_popupt("仅限终端用户领取.")
						return false;
					};
					var drugid=Number($(this).parents(".lisboxs").attr("ac"));
					var selluserid=$(this).parents(".storlis").attr("vc");
					var num=Number($(this).parent(".addbox").siblings(".numbox").children("input").val());
					var imagePath=$(this).parent(".addbox").parent(".numbtn").siblings(".lispics").children("a").children("img").attr("src");
					var drugname=$(this).parent(".addbox").parent(".numbtn").siblings(".listxt").children("ul").children("li").children(".fontascn").html();
					var price=Number($(this).parent(".addbox").parent(".numbtn").siblings(".listxt").children("ul").children("li").children(".fontice").children("s").children("span").html());
					var actmes=$(this).parent(".addbox").parent(".numbtn").siblings(".listxt").children("ul").children("li").children(".fontice").children("span").html();
					var my_stock=$(this).parent(".addbox").parent(".numbtn").siblings(".listxt").children("ul").children("li").children(".fontcock").children(".stock").html();
					var actid=activid;
					var actlimt=$(this).parent(".addbox").parent(".numbtn").siblings(".listxt").children("ul").children("li").children(".fontcock").children(".limt").html()
					var acttype="3";
					var actstate="1";
					var actcontent="秒杀商品,秒杀单价￥"+actmes;
					var totalfee=0;
					var standard=1;
					if(num<1){
						gadget_popupt("购买数量不能小于1个");
						return false;
					};
					if(num>Number(actlimt)||my_stock<num){
						totalfee=num*price;
						actcontent="秒杀商品,超出限购单价￥"+price;
						standard=1;
					}else{
						totalfee=num*Number(actmes);
						actcontent="秒杀商品,秒杀单价￥"+actmes;
						standard=2;
					};
					var orderrr=[{
						"num":num,
						"imagePath":imagePath,
						"drugname":drugname,
						"drugid":drugid,
						"price":price,
						"actcontent":actcontent,
						"totalfee":totalfee,
						"actid":actid,
						"acttype":acttype,
						"actlimt":actlimt,
						"actmes":Number(actmes).toFixed(1),
						"actstate":actstate,
						"standard":standard
					}];
					gadget_back("正在生成订单...");
					//return false;
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
									"payment":totalfee,//金额
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
								$("#car_for input[name=url]").val(ut+"/min.html");
								$("#car_for").submit();
								$("#ifr").load(function(){
									var bgo=$("#bgo").val();
									if(bgo!=""){
										//getUrlParamot("key",bgo);
										window.location.href="confirmation.html"+bgo;
									}else{
										gadget_popupt("订单生成失败！请刷新重试");
										gadget_back_remove();
									}
								});
								
							}else{
								gadget_popupt("订单生成失败，请刷新重试");
								gadget_back_remove();
							};
						},
						error:function(){
							gadget_popupt("订单生成失败，请刷新重试");
							gadget_back_remove();
						}
					});
					
					
					
					
				});
				
				}
function selnone(){
	$(".numbtn a").attr('unselectable','on')
		.css({'-moz-user-select':'-moz-none',
		'-moz-user-select':'none', 
		'-o-user-select':'none', 
		'-khtml-user-select':'none', /* you could also put this in a class */ 
		'-webkit-user-select':'none',/* and add the CSS class here instead */ 
		'-ms-user-select':'none', 
		'user-select':'none' 
	}).bind('selectstart', function(){ 
		return false; 
		});
};
	
function timer(intDiff){
	if(othstate==0){
		var sethtml="</span>开始活动";
	}else if(othstate==1){
		var sethtml="</span>活动结束";
	}else{
		$("#secktit h5").html("活动已结束");
		return false;
	}
    var selftim=window.setInterval(function(){
    	if(intDiff<0){
    		
    	if(othstate==0){
    		othstate=1;
    		intDiff=tbeginoth;
    		
    		$("#secktit h5").html("还有<span></span>活动结束");
    		$(".numbtn a,.addbox,.purchase").removeClass("notcolor");
    		$(".purchase").removeAttr("disabled").removeClass("notincolor");
    	}else if(othstate==1){
    		othstate=2;
    		$("#secktit h5").html("活动已结束");
    		$(".numbtn a,.addbox,.purchase").addClass("notcolor");
    		$(".purchase").attr("disabled","disabled").addClass("notincolor");
    		window.clearInterval(selftim);
    	};
    };
 
    var day=0,
        hour=0,
        minute=0,
        second=0;//时间默认值 
    if(intDiff > 0){
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    timhtml="还有<span>"+day+"天"+hour+"小时"+minute+"分"+second+"秒";
    $("#secktit h5").html(timhtml+sethtml)
    intDiff--;
    }, 1000);
}

//输入数量 purchasenum 60  限购 olimt 30 活动库存 maxputnum 1 非活动库存 maxstok 50 50
function get_purchasenum(purchasenum,olimt,maxputnum,maxstok){
	if(purchasenum>olimt){
	if(purchasenum>maxstok){
			if(maxstok>=olimt){
				purchasenum=maxstok
			}else{
				if(maxputnum>=olimt){
					purchasenum=olimt;
				}else{
					purchasenum=maxputnum;
				};
			};
	}else{
			purchasenum=purchasenum;
		};
	}else{
		if(maxputnum>purchasenum){
			purchasenum=purchasenum;
		}else{
			purchasenum=maxputnum;
		};
	};
	return purchasenum;
	};	
})



