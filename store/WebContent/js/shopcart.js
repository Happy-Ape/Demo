$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var userid=$.cookie('peopleus');
	var peopletype=$.cookie('peoplestate');
	
	
	var fault=0;
	var sellus=0;
	var couponId=0;
	var pic=0;
	var picvi=0;
	/*var md5str = hex_md5("1234");*/
	var ob=0;
	//var paymenttype=2;
	var endaddressid=0;
	
	//parseInt(number)==number
//如果是true，number就是整数，否则不是整数
		
	$(window).scroll(function(){
		var scrtop=$(window).scrollTop();
		if(scrtop>230){
			$("#mybanhs").addClass("myhsmor");
		}else{
			$("#mybanhs").removeClass("myhsmor");
		};
		//要的高度=浏览器窗口高度-标签高度-标签距离顶部的高度+滚动条的高度
		
		
	});
	//
	$("#couxx").click(function(){
		$("#discount").hide();
		//alert(111)
		//$(".mydiscount").remove();
	});
	
	//结算页面
	$("#minxx").click(function(){
		$("#minban").hide();
		$(".myban").show();
		$(".isquan").html("优惠券");
	});
	//优惠券
		function discount(){
    		$.ajax({
    		type:"GET",
    		url:url+"/cli/EU/getAllCoupons/"+sellus,
    		data:{token:token,mintime:new Date().getTime()},
    		dataType:"json",
    		success:function(data){
    			gadget_login(data);
    			if(data.code==1){
    				
    				var html='';
    				for(var i=0;i<data.lists.length;i++){
    					html+='<div class="mydiscount"><div class="mydiscountlef"><h2>';
    					if(data.lists[i].type==2){
    						html+='免运费';
    					};
    					if(data.lists[i].type==1){
    						var arr=data.lists[i].content.split("-");
    						html+='￥<i>';
    						html+=arr[1];
    					};
    					html+='</i></h2></div><div class="mydiscountret"><p>';
    					if(data.lists[i].type==2){
    						html+='免运费';
    					};
    					if(data.lists[i].type==1){
    						var arr=data.lists[i].content.split("-");
    						html+='满<i>';
    						html+=arr[0];
    						html+='</i>可用';
    					};
    					html+='</p><input type="button" name="';
    					html+=data.lists[i].couponsid;
    					html+='" class="tebtn" value="使用"/></div></div>';
    				};
    				$("#disct").append(html);
    				$(".tebtn").click(function(){
    					
    					$(this).siblings("p").children("i").html();
    					if($(this).siblings("p").children("i").length!=0){
    						if(Number($(this).siblings("p").children("i").html())<=Number($("#wholemin h1 span").html())){
    							var picmin=pic-Number($(this).parent().siblings(".mydiscountlef").children("h2").children("i").html());
    							$("#wholemin h1 span").html(picmin);
    							couponId=$(this).attr("name");
    							$(".isquan").html($(this).parent().siblings(".mydiscountlef").children("h2").html());
    						}else{
    							gadget_popupt("购买金额不够不能使用此优惠券");
    						};
    					}else{
    						
    						if(picvi<Number($("#agemax").html())){
    							$(".isquan").html($(this).parent().siblings(".mydiscountlef").children("h2").html());
    							$("#wholemin h1 span").html(pic-Number($("#agemons").html()));
    						}else{
    							gadget_popupt("当前价格已经包邮");
    						};
    						
    					};
    					
    				});
    			};
    		},
    		error:function(){}
    	});
    	};

	$("#dispant").click(function(){
		$("#dispano").removeClass("dispan");
		$(this).attr("class","dispan");
		$(".mydiscount").remove();
		alert(sellus)
		$.ajax({
			type:"GET",
			url:url+"/cli/coupons/getBySuid/"+sellus+"?mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					var html='';
					for(var i=0;i<data.lists.length;i++){
						html+='<div class="mydiscount"><div class="mydiscountlef"><h2>';
    					if(data.lists[i].type==2){
    						html+='免运费';
    					};
    					if(data.lists[i].type==1){
    						var arr=data.lists[i].content.split("-");
    						html+='￥';
    						html+=arr[0];
    					};
    					html+='</h2></div><div class="mydiscountret"><p>';
    					if(data.lists[i].type==2){
    						html+='免运费';
    					};
    					if(data.lists[i].type==1){
    						var arr=data.lists[i].content.split("-");
    						html+='满';
    						html+=arr[1];
    						html+='可用';
    					};
    					html+='</p><input type="button" name="';
    					html+=data.lists[i].couponsid;
    					html+='" class="teobbtn" value="领取"/></div></div>';
					};
					$("#disct").append(html);
					$(".teobbtn").click(function(){
						var couponsid=$(this).attr("name");
						$.ajax({
							type:"POST",
							url:url+"/cli/coupons/insertCoupons/"+couponsid+"?token="+token+"&mintime="+new Date().getTime(),
							dataType:"json",
							success:function(data){
								gadget_login(data);
								if(data.code==1){
									gadget_popupt("领取成功");
								};
								if(data.code==-1){
									gadget_popupt(data.message);
								};
							},
							error:function(){
								
							}
						});
					});
				};
				
			},
			error:function(){
				
			}
		});
	});
	//
	$("#mybtn").click(function(){
		$("#ismyfor").show();
	});
	$("#isobxx").click(function(){
					$("#ismyfor").hide();
				});
	//点击结算
	$(".iscarsp").click(function(){
		$("#shopling img").attr("src","imgeas/yuanq.gif");
		$("#shopling p").html("订单生成中.....");
		$("#shopling").show();
		var tcivb=0;
		var mindenum=0;
		var agemon=0;
		var freep=0;
		for(var i=0;i<$(".ismycatocheck").length;i++){
			if($(".ismycatocheck").eq(i).is(":checked")==true){
				tcivb=tcivb+1;
				//发货金额
				mindenum=$(".ismycatocheck").eq(i).parent(".ismycato").parent(".morcatmin").siblings("h5").children(".sicoler").children(".minde").html();
				agemon=$(".ismycatocheck").eq(i).parent(".ismycato").parent(".morcatmin").siblings("h5").children(".sicoler").children(".agemon").html();
				freep=$(".ismycatocheck").eq(i).parent(".ismycato").parent(".morcatmin").siblings("h5").children(".sicoler").children(".freep").html();
			};
		};
		if(tcivb==0){
			$("#shopling").hide();
			return false;
		};
		if(Number($("#mybanhstotal").html())<=0){
			$("#shopling").hide();
			return false;
		};
		if(Number($("#mybanhstotal").html())<Number(mindenum)){
			$("#shopling").hide();
			gadget_popupt("购买金额不能小于最低发货金额");
			return false;
		};
		//发货金额
		$("#agemons").html(agemon);
		$("#agemax").html(freep);
		var selluserId=0;//店铺id
		var drugIds="";//药品id
		var num="";//数量，
		var tocheck=""; //字符串
		var morest="";//拼装活动内容
		var sellnam="";//店铺名
		var orderrr=[];//包括数量 价格 名字 图片 小计 说明
		var imagePath=[];//图片
		var drugname=[];//商品名
		var price=[];//价格
		var actContent=[];//注明
		var totalfee=[];//小计
		var nummm=[];//单个数量
		var actid=[];//活动id
		var acttype=[];//活动类型
		var actlimt=[];//活动限购
		var actmes=[];//活动内容
		var actstate=[];//活动状态
		var pricerr="";//价格
		for(var i=0;i<$(".ismycatocheck").length;i++){
				if($(".ismycatocheck").eq(i).is(":checked")==true){
					/*mybanhstotal+=Number($(".ismycatocheck").eq(i).parent().siblings(".ismycatfmin").children("p").html());*/
					var ismycatocheck=$(".ismycatocheck").eq(i).parent();
					imagePath.push(ismycatocheck.siblings(".ismycatt").children(".ismycattmin").children("a").children("img").attr("src"));
					drugname.push(ismycatocheck.siblings(".ismycatt").children(".ismycattmint").children("a").html());
					price.push(ismycatocheck.siblings(".unitprice").children("p").html());
					drugIds+=ismycatocheck.parent().attr("name")+",";
					num+=ismycatocheck.siblings(".ismycatf").children(".ismycatfnumber").val()+",";
					totalfee.push(ismycatocheck.siblings(".ismycatfmin").children("p").html());
					if(ismycatocheck.siblings(".ismycatf").children(".ismycatfnumber").val()<=0){
						$("#shopling").hide();
						gadget_popupt("请确定商品购买数量是否正确");
						return false;
					};
					nummm.push(ismycatocheck.siblings(".ismycatf").children(".ismycatfnumber").val());
					actid.push(ismycatocheck.siblings(".unitprice").attr("name"))//活动id
					if(ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("name")==3){
						var remname=ismycatocheck.siblings(".ismycatt").children(".ismycattmint").children("a").html()
						gadget_popupse("["+remname+"]为错误商品，请删除后再结算");
						
						$("#shopling").hide();
						return false;
					};
					acttype.push(ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("name"))//活动类型
					
					actlimt.push(ismycatocheck.siblings(".ismycatt").children(".ismycattmint").children("p").children("i").html())//限购数量
					actstate.push(ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("ste"));//活动状态 ismycattquan
					selluserId=ismycatocheck.siblings(".catxx").attr("name");
					sellnam=ismycatocheck.parent().siblings("h5").children("i").html();
					if(ismycatocheck.siblings(".ismycatt").children(".ismycattmint").children("p").html().length>0){
						
						var catminf=ismycatocheck.siblings(".ismycatfmin").children("p");
						
						if(catminf.attr("name")!=""&&catminf.attr("name")!=null){
							var actontent="赠送";
							actontent+=catminf.attr("name");
							actontent+="个";
							actContent.push(actontent);
						}else if(catminf.attr("act")!=""&&catminf.attr("act")!=null){
							var actontent="享受";
							actontent+=catminf.attr("act");
							actontent+="折";
							actContent.push(actontent);
						}else if(ismycatocheck.siblings(".unitprice").children("p").children("s").length!=0){
							var actontent="购买";
							actontent+=ismycatocheck.siblings(".ismycatt").children(".ismycattmint").children("p").children("i").html();
							actontent+="个以内的享受特价";
							actontent+=ismycatocheck.siblings(".unitprice").children("p").children("span").html();
							actontent+=",";
							actContent.push(actontent);
						}else{
							var actontent="暂无,";
							actContent.push(actontent);
						};
						if(ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("name")==4){//特价
							tocheck+=ismycatocheck.siblings(".unitprice").children("p").children("s").html();
							tocheck+=ismycatocheck.siblings(".ismycatf").children(".ismycatfnumber").val();
							tocheck+=ismycatocheck.siblings(".unitprice").attr("name");
							tocheck+="4";
							tocheck+=ismycatocheck.siblings(".ismycatt").children(".ismycattmint").children("p").children("i").html();
							
							tocheck+=ismycatocheck.siblings(".unitprice").children("p").children("span").html();
							tocheck+=ismycatocheck.siblings(".ismycatfmin").children("p").html();
							actmes.push(ismycatocheck.siblings(".unitprice").children("p").children("span").html())
							
						}else if(ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("name")!=0&&ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("ste")==1){
								
								var rice=ismycatocheck.siblings(".unitprice").children("p").children("span").html();
								var catnumber=ismycatocheck.siblings(".ismycatf").children(".ismycatfnumber").val();
								var	activityid=ismycatocheck.siblings(".unitprice").attr("name");
								var	obtype=ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("name");
								var	limitcount=ismycatocheck.siblings(".ismycatt").children(".ismycattmint").children("p").children("i").html()
							if(ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("name")==1){
								//1折扣 
								var zoerr="";
								var moerr="";
								for(var c=0;c<ismycatocheck.siblings(".ismycatt").children(".ismycattquan").children("span").length;c++){
									var spanleth=ismycatocheck.siblings(".ismycatt").children(".ismycattquan").children("span").eq(c).html();
									//买9个5折
										
										var spank=spanleth.split("个");
										var spane=spank[0].split("买");
										var spant=spank[1].split("折");
										moerr+=(spane[1])+",";
										zoerr+=(spant[0]*10)+",";
								};
									moerr=moerr.substring(0,moerr.length-1);
									zoerr=zoerr.substring(0,zoerr.length-1);
									morest=moerr+";"+zoerr;
									actmes.push(morest)
									var picnum=ismycatocheck.siblings(".ismycatfmin").children("p").html()
									var mo=rice+catnumber+activityid+obtype+limitcount+morest+picnum;
									tocheck+=mo;
							};
							if(ismycatocheck.siblings(".ismycatt").children(".ismycattquan").attr("name")==2){
								//2买曾
								var zorerr="";
								var morrest="";
								for(var c=0;c<ismycatocheck.siblings(".ismycatt").children(".ismycattquan").children("span").length;c++){
									var spanleth=ismycatocheck.siblings(".ismycatt").children(".ismycattquan").children("span").eq(c).html();
									//买9个5折
										var spank=spanleth.split("赠");
										var spane=spank[0].split("买");
										morrest+=(spane[1])+",";
										zorerr+=(spank[1])+",";
								};
									morrest=morrest.substring(0,morrest.length-1);
									zorerr=zorerr.substring(0,zorerr.length-1);
									morest=morrest+";"+zorerr;
									actmes.push(morest)
									var picnum=ismycatocheck.siblings(".ismycatfmin").children("p").html();
									var mo=rice+catnumber+activityid+obtype+limitcount+morest+picnum;
									tocheck+=mo;
							};
						}else{
							actmes.push("");
							tocheck+=ismycatocheck.siblings(".unitprice").children("p").children("span").html();
							tocheck+=ismycatocheck.siblings(".ismycatf").children(".ismycatfnumber").val();
							tocheck+=ismycatocheck.siblings(".ismycatfmin").children("p").html();
						};
					}else{
						actmes.push("");
							tocheck+=ismycatocheck.siblings(".unitprice").children("p").children("span").html();
							tocheck+=ismycatocheck.siblings(".ismycatf").children(".ismycatfnumber").val();
							tocheck+=ismycatocheck.siblings(".ismycatfmin").children("p").html();
							var actontent="暂无,";
							actContent.push(actontent);
						};
				};
			};
			drugIds=drugIds.substring(0,drugIds.length-1);
			num=num.substring(0,num.length-1);
			var keymd=selluserId+drugIds+tocheck;
			//shopbodyf
			
			$("#sellnam").html(sellnam);
			$("#sellnam").attr("name",selluserId);
			sellus=selluserId;
			//MD5
		$.ajax({
			type:"GET",
			url:url+"/cli/order/genernatePass",
			data:{token:token,selluserId:selluserId,drugIds:drugIds,nums:num,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#shopling").hide();
					$("#subtotal span").html(data.message);
					keymd+=data.message;
					
					var datamessage=Number(data.message);
					if(data.message<Number($("#agemax").html())){
						datamessage=Number(data.message)+Number($("#agemons").html());
					};
					picvi=data.message;
					datamessage=datamessage.toFixed(2)
					pic=datamessage;
					$("#wholemin h1 span").html(datamessage);
					//$("#minban").show();
					$(window).scrollTop(0);
					$(".myban").hide();
					
					var md5str = hex_md5(keymd);
					
					var payment=$("#wholemin h1 span").html();
			var buyermessage=$("#whomore textarea").val();
			var buyernick=$.cookie('peoplecompanyname');
			var endaddsdr=$("#endnameg").html()+"="+$("#citybigg").html()+"="+$("#endphoneg").html()+"="+$("#endzipg").html();
			var aorder={
				"couponid":couponId,//优惠券id
				"selluserid":parseInt(selluserId),//店铺id
				"payment":Number(payment),//金额
				"paymenttype":$("#payment").val(),//付款方式 可为空
				"buyermessage":buyermessage,//留言 可为空
				"buyernick":buyernick,//用户名  可为空
				"endaddressid":fault,//地址 可未空
				"endaddr":endaddsdr,//收货人电话邮编 可为空
				"details":orderrr,//包括数量 价格 名字 图片 小计 说明
				"subtotal":data.message,//返回总价 
				"md5str":md5str,//key
				"standard":1,
				"buytop":data.other,//店铺发货信息
				"storename":data.pojo
			};
			aorder=JSON.stringify(aorder);
			$("#car_for input[name=inf]").val(aorder);
			$("#car_for input[name=timeTimp]").val(new Date().getTime());
			$("#car_for input[name=token]").val(token);
			$("#car_for").attr("action",url+"/cli/order/saveInf");
			$("#car_for input[name=url]").val(ut+"/min.html");
			$("#car_for").submit();
			gadget_back("正在生成订单");
			$("#ifr").load(function(){
				var bgo=$("#bgo").val();
				if(bgo!=""){
					//getUrlParamot("key",bgo);
					window.location.href="confirmation.html"+bgo;
				}else{
					gadget_popupt("订单生成失败！请重试");
					setInterval(gadget_relo,3000);
				}
			});
			
			return false;
			$.cookie("aorder",aorder,{path:"/"});
			
			return false;
			window.location.href="confirmation.html";
			return false;
		$(".isquan").unbind("click");
	$(".isquan").click(function(event){
    	$("#discount").show();
    	$(window).scrollTop(0);
    	$(".mydiscount").remove();
		discount();
	});
	$("#dispano").click(function(){
		$("#dispant").removeClass("dispan");
		$(".mydiscount").remove();
		$(this).attr("class","dispan");
		discount();
	});		
				}else{
					$("#shopling img").attr("src","imgeas/error.png");
					$("#shopling p").html("订单生成失败，请刷新重试");
				}
				
			},
			error:function(){
				$("#shopling img").attr("src","imgeas/error.png");
				$("#shopling p").html("订单生成失败，请刷新重试");
			}
		});
		
		
		var htlm='';
		$(".shopbody").remove();
		for(var i=0;i<nummm.length;i++){
			htlm+='<div class="shopbody"><div class="shopbodymin">';
			htlm+='<div class="shopbodyo"><div class="shoppic"><img src="';
			htlm+=imagePath[i];
			htlm+='" /></div><p>';
			htlm+=drugname[i];
			htlm+='</p></div><div class="shopbodyt"><p class="shopprice">';
			htlm+=price[i];
			htlm+='</p></div><div class="shopbodys"><p>';
			htlm+=nummm[i];
			htlm+='</p></div><div class="shopbodyf"><p>';
			htlm+=actContent[i];
			htlm+='</p></div></div><div class="shopboom"><p>￥<span>';
			htlm+=totalfee[i];
			htlm+='</span></p></div></div>';
			
		};
		$("#isbonbig").after(htlm);
		
		
		
		for(var i=0;i<$(".shopprice").length;i++){
			if($(".shopprice").eq(i).children("s").length!=0){
				pricerr+=$(".shopprice").eq(i).children("s").html()+",";
			}else{
				pricerr+=$(".shopprice").eq(i).children("span").html()+",";
			};
			
		};
		//console.log(pricerr+"pricerr");//价格
		var drugid=drugIds.split(",");
		//parseInt 数量 图片 名字 drugid 价格  备注 此条商品小计 活动id 活动类型 活动限购  活动内容
		function ObjStory(nummm,imagePath,drugname,drugid,pricerr,actContent,totalfee,actid,acttype,actlimt,actmes,actstate){
        	this.num=parseInt(nummm),
        	this.imagePath=imagePath,
        	this.drugname=drugname,
        	this.drugid=parseInt(drugid),
        	this.price=Number(pricerr),
        	this.actcontent=actContent,
        	this.totalfee=parseInt(totalfee),
        	this.actid=actid,
        	this.acttype=acttype,
        	this.actlimt=actlimt,
        	this.actmes=actmes,
        	this.actstate=actstate
   		 };
   		 var pricere=pricerr.split(",");
   		 for(var r=0;r<nummm.length;r++){
   		 orderrr.push(new ObjStory(nummm[r],imagePath[r],drugname[r],drugid[r],pricere[r],actContent[r],totalfee[r],actid[r],acttype[r],actlimt[r],actmes[r],actstate[r]));
   		 };
   		 
		
	});
	//收货地址
	addres();
	function addres(){
		
	$.ajax({
		type:"GET",
		url:url+"/cli/endUserAddr/getMyAddr",
		data:{token:token,userid:userid,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$("#receipt h5 span").html("");
				$("#receipt p").remove();
				//$("#wholemin p").remove();
				$("#citybigg").html("");
				$("#endnameg").html("");
				$("#endphoneg").html("");
				$("#endzipg").html("");
				var html='';
				var hmjk='';
				//html+='<h5>寄送到:<span></span></h5>';
				for(var i=0;i<data.lists.length;i++){
					if(data.lists[i].isdefault==1){
						fault=data.lists[i].endaddressid;
						hmjk+=data.lists[i].baseaddress;
					    hmjk+=data.lists[i].address;
						hmjk+='<span> ';
						hmjk+=data.lists[i].endname;
						hmjk+='</span> 电话:<i>';
						hmjk+=data.lists[i].endphone;
						hmjk+='</i> 邮编:<span>';
						hmjk+=data.lists[i].endzip;
						$("#receipt h5 span").append(hmjk);
						$("#citybigg").html(data.lists[0].baseaddress+data.lists[0].address);
						$("#endnameg").html(data.lists[0].endname);
						$("#endphoneg").html(data.lists[0].endphone);
						$("#endzipg").html(data.lists[0].endzip);
						
					};
					if(hmjk==0){
						
					};
					html+='<p><span class="citybi">';
					html+=data.lists[i].baseaddress;
					html+=data.lists[i].address;
					html+='</span><span class="endname"> ';
					html+=data.lists[i].endname;
					html+='</span> 电话:<i class="endphone">';
					html+=data.lists[i].endphone;
					html+='</i> 邮编:<span class="endzip">';
					html+=data.lists[i].endzip;
					html+='</span> <input name="';
					html+=data.lists[i].endaddressid;
					html+='" type="button" class="obbtn" value="设为默认"></p>';
				};
				$("#receipt h5").after(html);
				
				//收货地址
				$("#receipt p").click(function(){
					
					fault=$(this).children(".obbtn").attr("name");
					$("#receipt h5 span").html($(this).html());
					$("#receipt h5 span input").hide();
					$("#citybigg").html($(this).children(".citybi").html());
					$("#endnameg").html($(this).children(".endname").html());
					$("#endphoneg").html($(this).children(".endphone").html());
					$("#endzipg").html($(this).children(".endzip").html());
				});
				//mouse
				$("#receipt p").mouseleave(function(){
					$(this).children(".obbtn").hide();
				}).mouseenter(function(){
					$(this).children(".obbtn").show();
				});
				$(".obbtn").click(function(){
					var oldAddrId=fault;
					var newAddrId=$(this).attr("name");
					$.ajax({
						type:"GET",
						url:url+"/cli/endUserAddr/changeDefaultAddr",
						data:{oldAddrId:oldAddrId,newAddrId:newAddrId,token:token,userid:userid,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("设置成功");
							};
						},
						error:function(){
							
						}
					});
				});
			};
		},
		error:function(){
			
		}
	});	
	};
	//新增地址
	$("#ismybtnm").click(function(){
		
		if($("#myfor input[name='endname']").val()==""){
			$(".isforred").eq(0).show();
			return false;
		}else{
			$(".isforred").eq(0).hide();
		};
		if($("#myfor input[name='endphone']").val().length==11){
			$(".isforred").eq(1).hide();
		}else{
			$(".isforred").eq(1).show();
			return false;
		};
		if($("#myfor input[name='endtel']").val()==""||$("#myfor input[name='endtel']").val().length==7){
			$(".isforred").eq(2).hide();
		}else{
			$(".isforred").eq(2).show();
			return false;
		};
		if($("#myfor input[name='endzip']").val().length!=6){
			$(".isforred").eq(3).show();
			return false;
		}else{
			$(".isforred").eq(3).hide();
		};
		if($("#myfor select[name='area']").val()==""){
			$(".isforred").eq(4).show();
			return false;
		}else{
			$(".isforred").eq(4).hide();
		};
		if($("#myfor input[name='address']").val()==""){
			$(".isforred").eq(5).show();
			return false;
		}else{
			$(".isforred").eq(5).hide();
		};
		
		var endname=$("#myfor input[name='endname']").val();
		var endphone=$("#myfor input[name='endphone']").val();
		var endzip=$("#myfor input[name='endzip']").val();
		var baseaddress=$("#myfor select[name='province']").val()+"-"+$("#myfor select[name='city']").val()+"-"+$("#myfor select[name='area']").val();
		var address=$("#myfor input[name='address']").val();
		var endtel=$("#myfor input[name='endtel']").val();
		var isdefault=0;
		endname=encodeURI(endname);
		endphone=encodeURI(endphone);
		endzip=encodeURI(endzip);
		baseaddress=encodeURI(baseaddress);
		address=encodeURI(address);
		endtel=encodeURI(endtel);
		$.ajax({
			type:"POST",
			url:url+"/cli/endUserAddr/saveEndUserAddr?userid="+userid+"&token="+token+"&endname="+endname+"&endphone="+endphone+"&endzip="+endzip+"&baseaddress="+baseaddress+"&address="+address+"&endtel="+endtel+"&isdefault="+isdefault+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$("#ismyfor").hide();
					addres();
					
				};
			},
			error:function(){
				
			},
		});
		
		
		
	});
	function burl(){
		
			for(var v=0;v<$(".ismycatfnumber").length;v++){
				var obj=$(".ismycatfnumber").eq(v);//数量input
				var catlen=obj.parent().siblings(".ismycatt").children(".ismycattmint").children("p").html().length;//是否有限购	
				var ismycatfnumber=obj.val();//数量字符串
				var catfn=Number(obj.val());//数量数字
				var giveht=obj.parent().siblings(".ismycatfmin").children("p");//小计
				var spanleth=obj.parent().siblings(".ismycatt").children(".ismycattquan").children("span");//活动内容
				var iscat=obj.parent().siblings(".ismycatt").children(".ismycattmint").children("p").children("i").html();//限购数量
				var unitprice=Number(obj.parent().siblings(".unitprice").children("p").children("span").html());//价格
				var ismycatfmin=0;//最后价格
				calculation(catlen,ismycatfnumber,giveht,spanleth,iscat,unitprice,ismycatfmin,obj,catfn);
				};
		
		//全选
	$(".ismycheck").click(function(){
		if($(this).is(":checked")==true){
			$(this).parent().siblings(".morcatmin").children(".ismycato").children(".ismycatocheck").attr("checked",true);
			$(this).parents(".morcat").siblings().children(".morcatmin").children(".ismycato").children(".ismycatocheck").attr("checked",false);
			$(this).parents(".morcat").siblings().children("h5").children(".ismycheck").attr("checked",false);
			mybanhstotal();
		}else{
			$(this).parent().siblings(".morcatmin").children(".ismycato").children(".ismycatocheck").attr("checked",false);
			mybanhstotal();
		};
	});
	//总价
	function mybanhstotal(){
		
		
				var mybanhstotal=0;
			for(var i=0;i<$(".ismycatocheck").length;i++){
				if($(".ismycatocheck").eq(i).is(":checked")==true){
					mybanhstotal+=Number($(".ismycatocheck").eq(i).parent().siblings(".ismycatfmin").children("p").html());
				};
			};
			$("#mybanhstotal").html(mybanhstotal);
			};
	//单选
	$(".ismycatocheck").click(function(){
		$(".ismycheck").attr("checked",false);
		if($(this).is(":checked")==true){
			$(this).parents(".morcat").siblings().children(".morcatmin").children(".ismycato").children(".ismycatocheck").attr("checked",false);
			
			mybanhstotal();
			
			
		}else{
			mybanhstotal();
		}
	});
	//计算
		function calculation(catlen,ismycatfnumber,giveht,spanleth,iscat,unitprice,ismycatfmin,obj,catfn){
			
			if(catlen>0){//有限购
			//1折扣 2买曾 0没有
			var ismycattquan=obj.parent().siblings(".ismycatt").children(".ismycattquan").attr("name");// 活动类型type
			var unitp=obj.parent().siblings(".unitprice").attr("name");//活动id activityId
			var ste=obj.parent().siblings(".ismycatt").children(".ismycattquan").attr("ste");  //活动状态  state 
			
			
			if(ismycattquan==1){
				if(ste==2||ste==-1){
					/*var */ismycatfmin=unitprice*ismycatfnumber;//计算价格
				}else{
				var zhek="1";
					//折扣
				var err=[];//买
				var drr=[];//折
				for(var c=0;c<spanleth.length;c++){
					spanleth.eq(c).html();
					var spank=spanleth.eq(c).html().split("个");
					var spane=spank[0].split("买");
					var spant=spank[1].split("折");
					err.push(spane[1]);
					drr.push(spant[0]);
				};
				if(Number(catfn)>=Number(Math.min.apply(null,err))){
					var catyj=0;
					if(Number(catfn)>Number(iscat)){
						//超出限购
						catyj=Number(catfn)-Number(iscat)
						catfn=Number(iscat);
					};
				var cfn=[];
				var cfnm=0;
				var cfmax=0;
				for(var i=0;i<err.length;i++){
					if(Number(catfn)>=err[i]){
						cfn.push(err[i]);
					};
				};
				cfmax=Math.max.apply(null,cfn);
				var indx=jQuery.inArray(cfmax.toString(), err);
				zhek=drr[indx];//折扣
				giveht.attr("act",zhek);
				/*var */ismycatfmin=unitprice*Number(catfn)*Number(zhek)/10;
					catyj=catyj*unitprice;
				ismycatfmin=ismycatfmin+catyj;
				}else{
					/*var */ismycatfmin=unitprice*ismycatfnumber;
				};
				};
				
			};
			if(ismycattquan==2){
				//买曾
				var give=0;//赠送数量
				/*var */ismycatfmin=unitprice*ismycatfnumber;
				if(ste==1){
					
					var mrr=[];
					var zrr=[];
					for(var i=0;i<spanleth.length;i++){
						spanleth.eq(i).html();
						var spank=spanleth.eq(i).html().split("赠");
						var spane=spank[0].split("买");
						mrr.push(spane[1]);
						zrr.push(spank[1]);
					};
					if(Number(catfn)>=Number(Math.min.apply(null,mrr))){
						if(catfn<=Number(iscat)){
						//没有超出限购
						var cfn=[];
						var cfnm=0;
						var cfmax=0;
						for(var i=0;i<mrr.length;i++){
							if(Number(catfn)>=mrr[i]){
								cfn.push(mrr[i]);
							};
						};
						cfmax=Math.max.apply(null,cfn)
						var indx=jQuery.inArray(cfmax.toString(),mrr);
						give=zrr[indx];
						giveht.attr("name",give);
					}else{
						giveht.attr("name","");
					};
					}else{
						giveht.attr("name","");
					};
					
				};
				
			};
			if(ismycattquan==4){
				//没有
				if(unitp!=0){
					//特价
					if(ismycatfnumber>Number(iscat)){//大于限购数量
				//ismycatfnumber=Number(iscat);判断是否有活动价格
				if(obj.parent().siblings(".unitprice").children("p").children("s").length>0){
					//当前数量减去限购数量
					var ccsl=ismycatfnumber-Number(iscat);
					//超出数量的价格
					var ccsljg=ccsl*Number(obj.parent().siblings(".unitprice").children("p").children("s").html());
					//限购数量的价格
					var ismorcat=iscat*unitprice;
					/*var */ismycatfmin=ismorcat+ccsljg;
				};
			}else{
				//小于限购数量
				/*var */ismycatfmin=unitprice*ismycatfnumber;//计算价格
			};
				};
			};
			
		}else{
	/*var */ismycatfmin=unitprice*ismycatfnumber;//计算价格 ismybtnm
		};
		ismycatfmin= ismycatfmin.toFixed(2)
		giveht.html(ismycatfmin);//小计
			mybanhstotal();//总价			
		};
//首次
		


	//减
	$(".ismycatfjf").click(function(){
		var obj=$(this);
		var catlen=$(this).parent().siblings(".ismycatt").children(".ismycattmint").children("p").html().length;//是否有限购
		var ismycatfnumber=Number($(this).siblings(".ismycatfnumber").val())-1;
		if(ismycatfnumber<Number($(this).siblings(".ismycatfnumber").attr("minnum"))){
			ismycatfnumber=Number($(this).siblings(".ismycatfnumber").attr("minnum"));
		};
		var catfn=Number(ismycatfnumber);//输入框值
		var spanleth=$(this).parent().siblings(".ismycatt").children(".ismycattquan").children("span");//活动内容
		var giveht=$(this).parent().siblings(".ismycatfmin").children("p");//小计
		if(ismycatfnumber<=1){
			ismycatfnumber=1;
		};
		var iscat= $(this).parent().siblings(".ismycatt").children(".ismycattmint").children("p").children("i").html();//限购数量
		$(this).siblings(".ismycatfnumber").val(ismycatfnumber);
		var unitprice=Number($(this).parent().siblings(".unitprice").children("p").children("span").html());
		var ismycatfmin=0;	
		var drugId=$(this).parent().parent().attr("name");
		var sellUserId=$(this).parent().siblings(".catxx").attr("name");
		var num=ismycatfnumber;
		$.ajax({
			type:"GET",
			url:url+"/cli/SC/updateItem/"+drugId+"/"+sellUserId+"/"+num,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
			},
			error:function(){
				
			},
		});
		calculation(catlen,ismycatfnumber,giveht,spanleth,iscat,unitprice,ismycatfmin,obj,catfn);

	});
	//加
	$(".ismycatfjaf").click(function(){
		var obj=$(this);
		var catlen=$(this).parent().siblings(".ismycatt").children(".ismycattmint").children("p").html().length;//是否有限购
		var maxhs=Number($(this).parent().siblings(".ismycatfstock").children("p").html());//库存
		var ismycatfnumber=Number($(this).siblings(".ismycatfnumber").val())+1;//val+1
		var catfn=Number(ismycatfnumber);//输入框值
		var giveht=$(this).parent().siblings(".ismycatfmin").children("p");//小计
		var spanleth=$(this).parent().siblings(".ismycatt").children(".ismycattquan").children("span");//活动内容
		if(ismycatfnumber>maxhs){
			ismycatfnumber=maxhs;
		};
		var iscat= $(this).parent().siblings(".ismycatt").children(".ismycattmint").children("p").children("i").html();//限购数量
		$(this).siblings(".ismycatfnumber").val(ismycatfnumber);//val赋值
		var unitprice=Number($(this).parent().siblings(".unitprice").children("p").children("span").html());// 活动价
		var ismycatfmin=0;
		/*morcatmin*/
		var drugId=$(this).parent().parent().attr("name");
		var sellUserId=$(this).parent().siblings(".catxx").attr("name");
		var num=ismycatfnumber;
		$.ajax({
			type:"GET",
			url:url+"/cli/SC/updateItem/"+drugId+"/"+sellUserId+"/"+num,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
			},
			error:function(){
				
			},
		});
		calculation(catlen,ismycatfnumber,giveht,spanleth,iscat,unitprice,ismycatfmin,obj,catfn);

	});
	//biur
	$(".ismycatfnumber").blur(function(){
		if($(this).val()==""){
			$(this).val("1")
		};
		if($(this).val()==0){
			$(this).val("1")
		};
		if(Number($(this).val())<Number($(this).attr("minnum"))){
			$(this).val($(this).attr("minnum"));
		};
		var maxhs=Number($(this).parent().siblings(".ismycatfstock").children("p").html());
		var catlen=$(this).parent().siblings(".ismycatt").children(".ismycattmint").children("p").html().length;
		var iscat= $(this).parent().siblings(".ismycatt").children(".ismycattmint").children("p").children("i").html();
		/*if(catlen>0){
			if($(this).val()>Number(iscat)){
				$(this).val(Number(iscat));
			};
		};*/
		if($(this).val()>maxhs){
			$(this).val(maxhs);
		};
		var giveht=$(this).parent().siblings(".ismycatfmin").children("p");//小计
		var spanleth=$(this).parent().siblings(".ismycatt").children(".ismycattquan").children("span");//活动内容
		var ismycatfmin=0;
		var ismycatfnumber=$(this).val();
		var catfn=Number($(this).val());
		var unitprice=Number($(this).parent().siblings(".unitprice").children("p").children("span").html());
		var obj=$(this);
		var drugId=$(this).parent().parent().attr("name");
		var sellUserId=$(this).parent().siblings(".catxx").attr("name");
		var num=ismycatfnumber;
		$.ajax({
			type:"GET",
			url:url+"/cli/SC/updateItem/"+drugId+"/"+sellUserId+"/"+num,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
			},
			error:function(){
				
			},
		});
		calculation(catlen,ismycatfnumber,giveht,spanleth,iscat,unitprice,ismycatfmin,obj,catfn)
	
	});
	};
	
	//显示需求清单
	var sex=0;
	var aroy=0;
	obsex(sex);
	
	if($(document).scrollTop()==0){
		sex=sex+1;
		obsex(sex);
		
	};
	$(window).scroll(function(){
		if($(document).scrollTop()==$(document).height()-$(window).height()){
			sex=sex+1;
			if(sex>aroy-2){
				$("#cmaismop").show();
				$("#cmaismop").html("已经没有了");
				return false;
			};
			$("#cmaismop").show();
			$("#cmaismop").html("正在加载。。。。")
			obsex(sex);
			
		};
		
	});
	
	function obsex(sex){
		
		$.ajax({
		type:"GET",
		url:url+"/cli/SC/getSCItem",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			var arroy=[0];
			if(data.code==1){
				if(sex>=data.lists.length){
					
					$("#cmaismop").show();
				$("#cmaismop").html("已经没有了");
					return false;
				};
				for(var oi=0;oi<data.lists.length;oi++){
					for(var ob=0;ob<data.lists.length;ob++){
						if(data.lists[oi].sellUserId==data.lists[ob].sellUserId){
							oi=ob;
						};
					};
					arroy.push(oi);
				};
				for(var c=1;c<arroy.length;c++){
					arroy[c]=arroy[c]+1;
				}
				aroy=arroy.length;
				var html='';
				html+='<div class="morcat"><h5>';
				if(data.lists[arroy[sex]].sustate==61){
					html+='<input class="ismycheck" type="checkbox">';
				};
				html+='店铺：<i><a href="shopdetails.html?us='+data.lists[arroy[sex]].sellUserId+'">';
				//console.log(data.lists[arroy[sex]].sellerName+"data.lists[arroy[sex]].sellerName"+sex+"arroy[sex]");
				html+=data.lists[arroy[sex]].sellerName;
				//console.log(data.lists[arroy[sex]].sellerName+"data.lists[arroy[sex]].sellerName"+sex+"arroy[sex]");
				html+='</a></i><span class="spgnum" name="s'+data.lists[arroy[sex]].phoneNum+'">联系客服</span>';
				if(data.lists[arroy[sex]].customQQ!=""&&data.lists[arroy[sex]].customQQ!=null){
					customQQ=data.lists[arroy[sex]].customQQ.split(",");
					for(var l=0;l<customQQ.length;l++){
						html+='<a href="http://wpa.qq.com/msgrd?v=3&uin='+customQQ[l]+'&site=找药吧&menu=yes"><span>QQ客服</span></a>';
						
					};
					html+='<p class="sicoler">最低发货金额¥<span class="minde">'+data.lists[arroy[sex]].mindeliverymoney+'</span> 邮费¥<span class="agemon">'+data.lists[arroy[sex]].postage+'</span> (满¥<span class="freep">'+data.lists[arroy[sex]].freeshippingprice+'</span> 包邮)</p>';
				};
				
				if(data.lists[arroy[sex]].sustate!=61){
					html+='<span>店铺暂停营业</span>';
				};
				html+='</h5>';
				for(var i=arroy[sex];i<arroy[sex+1];i++){
							html+='<div class="morcatmin" name="';
							html+=data.lists[i].drugId;
							html+='"><div class="ismorcatmin ismycato">';
							if(data.lists[i].sustate==61){
								html+='<input class="ismycatocheck" name="12" type="checkbox">';
							};
							
							html+='</div><div class="ismorcatmin ismycatt">';
							html+='<div class="ismycattmin"><a href="Product.html?drugid='+data.lists[i].drugId+'&selluserid='+data.lists[i].sellUserId+'"><img src="';
						if(data.lists[i].myDrugImages==""||data.lists[i].myDrugImages==1){
						
							if(data.lists[i].listimg==null){
								html+='imgeas/muyou.png';
							}else{
								var arr=data.lists[i].listimg.split(";");
								html+=arr[0];
							};
						}else{
							var arr=data.lists[i].myDrugImages.split(",");
							html+=arr[0];
						};
							html+='" /></a></div><div class="ismycattmint"><a href="Product.html?drugid='+data.lists[i].drugId+'&selluserid='+data.lists[i].sellUserId+'">';
							html+=data.lists[i].aliascn;
							html+='</a>';
							html+='<p>';
							if(data.lists[i].activityId!=0&&data.lists[i].state!=-1){
								//有活动
								if(data.lists[i].state==2||data.lists[i].state==-2){
									//活动没开始||不可编辑
									var actbegDate=data.lists[i].beginDate;
										actbegDate=Date.parse(new Date(actbegDate));
									if(actbegDate<data.message){
										//活动开始
										html+='购买<i>';
										html+=data.lists[i].limitCount;
										html+='</i>个以内享有优惠';
										
										html+='</p>';
										html+='</div><div class="ismycattquan" ste="';
										html+=data.lists[i].state;
										html+='" name="';
										html+=data.lists[i].type;
										html+='">';
										
										if(data.lists[i].type==1||data.lists[i].type==2){
												var type=data.lists[i].type;
												var brr=data.lists[i].centent.split(";");
												var crr=brr[0].split(",");
												var drr=brr[1].split(",");
											if(type==1){
												for(var f=0;f<crr.length;f++){
													html+='<span>买';
													html+=crr[f];
													html+='个';
													html+=drr[f]/10;
													html+='折';
													html+='</span>';
												};
												};
											if(type==2){
												for(var f=0;f<crr.length;f++){
													html+='<span>买';
													html+=crr[f];
													html+='赠';
													html+=drr[f];
													html+='</span>';
												};
											};
										};
									}else{
										//活动未开始
										html+="";
										html+='</p>';
										html+='</div><div class="ismycattquan" ste="';
										html+=data.lists[i].state;
										html+='" name="';
										html+=data.lists[i].type;
										html+='">';
										html+='<i>此活动';
										html+=data.lists[i].beginDate;
										html+='开始</i>';
										
										if(data.lists[i].type==1||data.lists[i].type==2){
												var type=data.lists[i].type;
												var brr=data.lists[i].centent.split(";");
												var crr=brr[0].split(",");
												var drr=brr[1].split(",");
											if(type==1){
												for(var f=0;f<crr.length;f++){
													html+='<span>买';
													html+=crr[f];
													html+='个';
													html+=drr[f]/10;
													html+='折';
													html+='</span>';
												};
												};
											if(type==2){
												for(var f=0;f<crr.length;f++){
													html+='<span>买';
													html+=crr[f];
													html+='赠';
													html+=drr[f];
													html+='</span>';
												};
											};
										};
									};
								};
								if(data.lists[i].state==1){
									//活动正在进行
									var actenddate=data.lists[i].endDate;
									actenddate=Date.parse(new Date(actenddate));
									if(actenddate<data.message){
										//活动结束
										html+="";
										html+='</p>';
										html+='</div><div class="ismycattquan" ste="';
										html+=data.lists[i].state;
										html+='" name="';
										html+=data.lists[i].type;
										html+='">';
									}else{
										//活动正在进行
										html+='购买<i>';
										html+=data.lists[i].limitCount;
										html+='</i>个以内享有优惠';
										html+="";
										html+='</p>';
										html+='</div><div class="ismycattquan" ste="';
										html+=data.lists[i].state;
										html+='" name="';
										html+=data.lists[i].type;
										html+='">';
										
										if(data.lists[i].type==1||data.lists[i].type==2){
												var type=data.lists[i].type;
												var brr=data.lists[i].centent.split(";");
												var crr=brr[0].split(",");
												var drr=brr[1].split(",");
											if(type==1){
												for(var f=0;f<crr.length;f++){
													html+='<span>买';
													html+=crr[f];
													html+='个';
													html+=drr[f]/10;
													html+='折';
													html+='</span>';
												};
												};
											if(type==2){
												for(var f=0;f<crr.length;f++){
													html+='<span>买';
													html+=crr[f];
													html+='赠';
													html+=drr[f];
													html+='</span>';
												};
											};
										};
									};
								};
								
							}else{
								html+="";
								html+='</p>';
								html+='</div><div class="ismycattquan" ste="';
								html+=data.lists[i].state;
								html+='" name="';
								html+=data.lists[i].type;
								html+='">';
							}
							
							
						/*if(data.lists[i].type!=0||data.lists[i].activityId==-1){
							if(data.lists[i].activityId==-1){
								html+='购买<i>';
								html+=data.lists[i].limitCount;
								html+='</i>个以内享有优惠';
							}else{
								if(data.lists[i].state==1){
									html+='购买<i>';
									html+=data.lists[i].limitCount;
									html+='</i>个以内享有优惠';
								}else{
									html+="";
								}
							}
							
						};*/
							/*html+='</p>';
							html+='</div><div class="ismycattquan" ste="';
							html+=data.lists[i].state;
							html+='" name="';
							html+=data.lists[i].type;
							html+='">';
							if(data.lists[i].state==2){
								html+='<i>此活动';
								html+=data.lists[i].beginDate;
								html+='开始</i>';
							};*/
						/*if(data.lists[i].type!=0&&data.lists[i].state!=-1){
							var type=data.lists[i].type;
							var brr=data.lists[i].centent.split(";")
							var crr=brr[0].split(",");
							var drr=brr[1].split(",");
						if(type==1){
							for(var f=0;f<crr.length;f++){
								html+='<span>买';
								html+=crr[f];
								html+='个';
								html+=drr[f]/10;
								html+='折';
								html+='</span>';
							};
							};
						if(type==2){
							for(var f=0;f<crr.length;f++){
								html+='<span>买';
								html+=crr[f];
								html+='赠';
								html+=drr[f];
								html+='</span>';
							};
						};
					};*/
					html+='</div></div><div class="ismorcatmin ismycats"><p>';
					html+=data.lists[i].specification;
					html+='</p></div><div class="ismorcatmin ismycats unitprice" name="';
					html+=data.lists[i].activityId;
					html+='"><p><span>';
					if(data.lists[i].type==4&&data.lists[i].state==1){
						//parseInt(ccc)==ccc
						if(parseInt(data.lists[i].discountPrice)==data.lists[i].discountPrice){
							html+=data.lists[i].discountPrice.toFixed(1);
						}else{
							html+=data.lists[i].discountPrice;
						};
					}else{
						if(parseInt(data.lists[i].price)==data.lists[i].price){
							html+=data.lists[i].price.toFixed(1);
						}else{
							html+=data.lists[i].price;
						};
					};
					html+='</span>';
					if(data.lists[i].type==4&&data.lists[i].state==1){
						html+='<s>';
						if(parseInt(data.lists[i].price)==data.lists[i].price){
							html+=data.lists[i].price.toFixed(1);
						}else{
							html+=data.lists[i].price;
						};
						html+='</s>';
					};
					html+='</p>';
					html+='</div><div class="ismorcatmin ismycatf ismycatfstock"><p>';
					html+=data.lists[i].stock;
					html+='</p></div><div class="ismorcatmin ismycatf">';
					html+='<span class="ismycatfjf">-</span>';
					html+='<input class="ismycatfnumber" onkeyup="checkn(this)" onafterpaste="checkm(this)" minnum="'+data.lists[i].mindeliverynum+'" type="number" value="';
					if(data.lists[i].num>data.lists[i].stock){
						data.lists[i].num=data.lists[i].stock;
					};
					html+=data.lists[i].num;
					html+='"/>';
					html+='<span class="ismycatfjaf">+</span></div>';
					html+='<div class="ismorcatmin ismycatf ismycatfmin"><p name="" act=""></p></div>';
					html+='<div class="ismorcatmin ismycatfiv"><span>加入收藏</span></div>';
					html+='<div class="catxx" name="';
					html+=data.lists[i].sellUserId;
					html+='" title="点击删除此条商品"><img src="imgeas/chac.png" /></div>';
					html+='</div>';
				};
				html+='</div>';
				$(".merchant").append(html);
				$(".spgnum").unbind("click");
				$(".spgnum").click(function(){
					$("#my_im").show();
					$("#im_box").attr("name",$(this).attr("name"));
					$("#im_name h3").html($(this).siblings("i").html());
					$("#im_lang div").remove();
				});
				$(".ismycatfjf").unbind("click");
				$(".ismycatfjaf").unbind("click");
				$(".ismycatfiv span").unbind("click");
				$(".ismycatfnumber").unbind("blur");
				$("#cmaismop").hide();
				burl();
				//calculation(catlen,ismycatfnumber,giveht,spanleth,iscat,unitprice,ismycatfmin,obj,catfn);
				$(".ismycatfiv span").click(function(){
					var drugIdn=$(this).parents(".morcatmin").attr('name');
					var sellUserIdn=$(this).parent(".ismycatfiv").siblings(".catxx").attr("name");
					$.ajax({
						type:"post",
						url:url+"/cli/CD/save?token="+token+"&drugid="+drugIdn+"&selluserid="+sellUserIdn+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("收藏成功");
							}else{
								gadget_popupt(data.message);
							};
						},
						error:function(){
							gadget_popupt("收藏失败，请重试");
						}
					});
				});
				
				//删除商品
				$(".catxx").click(function(){
					var drugId=$(this).parent(".morcatmin").attr("name");
					var sellUserId=$(this).attr("name");
					$.ajax({
						type:"GET",
						url:url+"/cli/SC/deleteItem/"+drugId+"/"+sellUserId,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("删除成功");
								setTimeout(gadget_relo,3000);
							};
						},
						error:function(){
							gadget_popupt("删除失败");
						}
					});
				});
			}else{
				$("#nomores").show();
				
				$("#cmaismop").html("以经没有更多了")
			};
			
		},
		error:function(){
			
		}
	});
	};
	
	//省市
		$.ajax({
		type:"GET",
		url:url+"/cli/province/getAllProvinces?mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			var html="";
			for(var i=0;i<data.lists.length;i++){
				html+='<option ab="';
				html+=data.lists[i].provincecode;
				html+='">';
				html+=data.lists[i].provincename
				html+='</option>';
			}
			$("#provinop").after(html)
			
			$("select[name='province']").unbind('change').bind('change',function(){
				$("#provinc").siblings().remove();
			$("#provina").siblings().remove();
				htm=$(this).val();
				var ab=$("select[name='province'] option:contains('"+htm+"')").attr("ab")
				$.ajax({
					type:"GET",
					url:url+"/cli/city/getCitiesByProvinceId/"+ab+"?mintime="+new Date().getTime(),
					dataType:"json",
					success:function(data){
						var html="";
						for(var i=0;i<data.lists.length;i++){
								html+='<option ab="';
								html+=data.lists[i].citycode;
								html+='">';
								html+=data.lists[i].cityname
								html+='</option>';
						}
							$("#provinc").after(html)
							$("select[name='city']").unbind('change').bind('change',function(){
								$("#provina").siblings().remove();
								htom=$(this).val();
								var bbc=$("select[name='city'] option:contains('"+htom+"')").attr("ab")
								$.ajax({
									type:"GET",
									url:url+"/cli/country/getCountriesByCityid/"+bbc+"?mintime="+new Date().getTime(),
									dataType:"json",
									success:function(data){
										var htm="";
										//alert(data.lists.length)
										for(var i=0;i<data.lists.length;i++){
											htm+='<option>';
											htm+=data.lists[i].countyname;
											htm+='</option>';
										}
										$("#provina").after(htm)
										$("select[name='area']").change(function(){
											hom=$(this).val();
										})
									},
									error:function(){
										console.log(3)
									}
								});
							})
							
							
					},
					error:function(){
						console.log(2)
					}
				});
			})
		},
		error:function(){
			console.log(1)
		}
	});
	
	
});
	

