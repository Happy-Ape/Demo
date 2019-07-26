$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	//var zfburl=window.location.href; ?name=浙贝母&need=22&user=3
	var zfburl=ut+"/buydetails.html";
	function geturlname(name){
		var sear=window.location.search;
		var scrf=sear;
		if(sear==null||sear==""){
			return sear;
		};
		//?drugName =99&hasReceipt=&stockPlace=&originPlace=&qualityStandard=
		if(sear.indexOf(name)>0){
			sear=sear.split(name);
			//sear=sear[1].split("?");
			sear=sear[1].split("&")
			sear=sear[0].split("=")
			sear=sear[1];
			if(scrf.indexOf(name+"="+sear)>0){
				return sear;
			}else{
				sear="";
				return sear;
			};
		}else{
			sear="";
			return sear;
		};
	};
	var names=geturlname("name");
	var needs=geturlname("need");
	var users=geturlname("user");
	if(names==""&&needs==""&&users==""){
		return false;
	};
	if(isNaN(needs)){
		//alert("needs不是数字");
		needs=0;
	};
	if(isNaN(users)){
		//alert("users不是数字");
		users=0;
	};
	$.ajax({
		type:"get",
		url:url+"/cli/userneed/getById/"+needs+"?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			console.log(data)
			gadget_login(data);
			if(data.code==1){
				if(data.pojo.drugImages!=""&&data.pojo.drugImages!=null){
					var drugImages=data.pojo.drugImages.split(",");
					$("#buypict img").attr("src",drugImages[0]);
					var html='';
					for(var i=0;i<drugImages.length;i++){
						html+='<div class="buyimglis"><img src="';
						html+=drugImages[i];
						html+='" /></div>';
					};
					$("#buypicb").append(html);
				};
					$(".buyimglis img").click(function(){
						$("#buypict img").attr("src",$(this).attr("src"));
					});
					var hml='<li><p><span>售价:</span><a>';
					
					if(data.pojo.drugPrice==""||data.pojo.drugPrice==null){
						if(token==""||token==null){
							data.pojo.drugPrice="登录可见";
						}else{
							data.pojo.drugPrice="付款可见";
						};
					};
					hml+=data.pojo.drugPrice;
					hml+='</a></p></li><li><p><span>起售量:</span>';
					var minBuyo=data.pojo.minBuy.split(",")
					hml+=minBuyo[0]+minBuyo[1];
					hml+='</p></li><li><p><span>规格:</span>';
					hml+=data.pojo.drugSpecifications;
					hml+='</p></li><li><p><span>供应数量:</span>';
					var numbero=data.pojo.number.split(",")
					hml+=numbero[0]+numbero[1];
					hml+='</p></li><li><p><span>可供票据:</span>';
					var hasReceipt="";
					if(data.pojo.hasReceipt==0){
						hasReceipt="无票据";
					};
					if(data.pojo.hasReceipt==1){
						hasReceipt="发票";
					};
					if(data.pojo.hasReceipt==2){
						hasReceipt="收购手续";
					};
					if(data.pojo.hasReceipt==3){
						hasReceipt="发票或收购手续";
					};
					hml+=hasReceipt;
					hml+='</p></li><li><p><span>质量标准:</span>';
					var qualityStandard="";
					if(data.pojo.qualityStandard==0){
						qualityStandard="待确定";
					};
					if(data.pojo.qualityStandard==1){
						qualityStandard="达到出口标准和药典标准";
					};
					if(data.pojo.qualityStandard==2){
						qualityStandard="达到出口标准";
					};
					if(data.pojo.qualityStandard==3){
						qualityStandard="达到省标";
					};
					if(data.pojo.qualityStandard==4){
						qualityStandard="达到2010版药典标准";
					};
					if(data.pojo.qualityStandard==5){
						qualityStandard="达到2015版药典标准";
					};
					hml+=qualityStandard;
					hml+='</p></li><li><p><span>产地:</span>';
					hml+=data.pojo.originPlace;
					hml+='</p></li><li><p><span>联系人:</span>';
					hml+=data.pojo.userName;
					hml+='</p></li><li><p><span>库存地:</span>';
					hml+=data.pojo.stockPlace;
					hml+='</p></li><li><p><span>联系电话:</span>';
					if(data.pojo.userContact==""||data.pojo.userContact==null){
						hml+="登录可见";
					}else{
						console.log(data.pojo.userContact)
						if(data.pojo.userContact=="付款可见"){
							hml+=data.pojo.userContact;
							hml+='<span id="ewm_lert">[查 看]</span>';
						}else{
							hml+=data.pojo.userContact;
						};
					};
					hml+='</p></li>';
					$("#buyboxor h5").html(data.pojo.drugName);
					$("#buyboxor ul").append(hml);
					var lookPrice=data.pojo.lookPrice;
				$("#ewm_lert").click(function(){
					if(token==""||token==null){
							gadget_popupfs("您还未登陆，是否去登陆",2,"login.html",0,"去登陆");
						}else{
						$.ajax({
							type:"get",
							url:url+"/cli/user/checkOut/"+needs+"?token="+token+"&mintime="+new Date().getTime(),
							dataType:"json",
							success:function(data){
								if(data.code==1){
									//没过期  application/x-www-form-urlencoded
									//multipart/form-data
									$("#lookfo").remove();
									var htmlc='<form id="lookfo" method="get" enctype="multipart/form-data" style="display: none;">';
									htmlc+='<input type="hidden" id="show_url" name="show_url"/><input type="hidden" id="WIDsubject" name="WIDsubject"/>';
									htmlc+='<input type="hidden" id="WIDbody" name="WIDbody"/><input type="hidden" id="mytpo" name="type"/><input type="hidden" id="token" name="token"/>';
									htmlc+='<input type="hidden" id="userId" name="user"/></form>';
									$("body").append(htmlc);
									gadget_popupfsev("查看该信息需支付"+lookPrice+"元信息费，支付完成可免费查看。<br>确定跳转到支付页面？",function(){
										$("#lookfo").remove();
									},function(){
										names=decodeURI(names)
									$("#show_url").val(zfburl);
									$("#WIDsubject").val(names);
									$("#WIDbody").val(needs);
									$("#token").val(token);
									$("#userId").val(users);
									$("#mytpo").val("1");
									
								//	return false;
									//zfburl needs names token
									//zfburl=encodeURI("http://192.168./create_direct_pay")
									//var serlook="?show_url="+zfburl+"&WIDsubject="+names+"&WIDbody="+needs+"&token="+token;
									var actionl="http://192.168./create_direct_pay_by_user-JAVA-UTF-8/alipayapi.jsp";
									//alert(zfburl)
									$("#lookfo").attr("action",actionl);
									$("#lookfo").submit();
								});
								}else if(data.code==-3){
									gadget_popupfs("您已经购买过本条信息<br>如无法查看，请刷新或联系客服",2,0,0,"刷新");
								}else{
									gadget_popupfs("登陆超时，是否去登陆",2,"login.html",0,"去登陆");
								};
							},
							error:function(){
								gadget_popupt("网络错误，请重试");
							}
						});
					};
				});
				
			};
		},
		error:function(){
			
		}
	});
	$.ajax({
		type:"get",
		url:url+"/cli/userneed/getUserOther/2/"+users+"?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				var lenlis=8;
				if(data.lists.length>8){
					lenlis=8;
				}else{
					lenlis=data.lists.length;
				}
				for(var i=0;i<lenlis;i++){
					html+='<tr><td><p>';
					html+=data.lists[i].drugName;
					html+='</p></td><td><p>';
					html+=data.lists[i].drugSpecifications;
					html+='</p></td><td><p>';
					var numbers=data.lists[i].number.split(",");
					html+=numbers[0]+numbers[1];
					html+='</p></td><td><p>';
					if(data.lists[i].drugPrice==""||data.lists[i].drugPrice==null){
						data.lists[i].drugPrice="登录可见";
					};
					html+=data.lists[i].drugPrice;
					html+='</p></td><td><p>';
					html+=data.lists[i].originPlace;
					html+='</p></td><td><p>';
					html+=data.lists[i].stockPlace;
					//console.log(encodeURI(data.lists[i].drugName))
					html+='</p></td><td><a href="buydetails.html?name='+encodeURI(data.lists[i].drugName)+'&need='+data.lists[i].userNeedId+'&user='+data.lists[i].userId+'">查看详情</a></td></tr>';
				};
				$("#tbodyo").append(html)
			};
		},
		error:function(){
			
		}
	});
	
	$.ajax({
		type:"get",
		url:url+"/cli/userneed/getDrugOther/2?token="+token+"&drugname="+names+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			$("#moreug").attr("href","supplydetails.html?name="+names+"&receipt=&stock=&origin=&quality=")
			if(data.code==1){
				var html='';
				var lenlis=8;
				if(data.lists.length>8){
					lenlis=8;
				}else{
					lenlis=data.lists.length;
				};
				for(var i=0;i<lenlis;i++){
					html+='<tr><td><p>';
					html+=data.lists[i].drugName;
					html+='</p></td><td><p>';
					html+=data.lists[i].drugSpecifications;
					html+='</p></td><td><p>';
					var numbers=data.lists[i].number.split(",");
					html+=numbers[0]+numbers[1];
					html+='</p></td><td><p>';
					if(data.lists[i].drugPrice==""||data.lists[i].drugPrice==null){
						data.lists[i].drugPrice="登录可见";
					};
					html+=data.lists[i].drugPrice;
					html+='</p></td><td><p>';
					html+=data.lists[i].originPlace;
					html+='</p></td><td><p>';
					html+=data.lists[i].stockPlace;
					html+='</p></td><td><a href="buydetails.html?name='+encodeURI(data.lists[i].drugName)+'&need='+data.lists[i].userNeedId+'&user='+data.lists[i].userId+'">查看详情</a></td></tr>';
				};
				
				$("#tbodyu").append(html);
			}
		},
		error:function(){
			
		}
	});
})
