$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
//	gadget_popupt("")
//gadget_popups("")
	$("#supbox p span").click(function(){
		$(this).attr("name","");
		$(this).children("a").html("");
		$(this).hide();
		winsre();
	});
	$("#sup_rece span").click(function(){
		//票据
		$("#supreceipt").attr("name",$(this).index());
		$("#supreceipt a").html($(this).html());
		winsre();
	});
	$("#sup_quality span").click(function(){
		$("#supquality").attr("name",$(this).index());
		$("#supquality a").html($(this).html());
		winsre();
	});
	$("#myserbtn").click(function(){
		if($("#myinput").val()==""||$("#myinput").val()==null){
			return false;
		};
		$("#supnam a").html($("#myinput").val());
		winsre();
	});
	
	function winsre(){
		var supnams=encodeURI($("#supnam a").html());
		var supreceipts=$("#supreceipt").attr("name");
		var supstocks=encodeURI($("#supstock a").html());
		var suporigins=encodeURI($("#suporigin a").html());
		var supqualitys=$("#supquality").attr("name");
		window.location.href="wantbuy.html?name="+supnams+"&receipt="+supreceipts+"&stock="+supstocks+"&origin="+suporigins+"&quality="+supqualitys;
	};
	
	$.ajax({
		type:"get",
		url:url+"/cli/province/getAllProvinces?mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<span>';
					html+=data.lists[i].provincename;
					html+='</span>';
				};
				$("#sup_cty").append(html);
				$("#sup_are").append(html);
//				/$("#sup_are span:contains('"+stockPlace+"')").addClass("sup_color");
				var upma=$("#suporigin a").html();
				var snma=$("#supstock a").html();//kc
				$("#sup_are span:contains('"+snma+"')").addClass("sup_color");
				$("#sup_cty span:contains('"+upma+"')").addClass("sup_color");
				$(".sup_sbox").show();
				$("#sup_cty span").click(function(){
					$("#suporigin a").html($(this).html());
					winsre();
				});
				$("#sup_are span").click(function(){
					$("#supstock a").html($(this).html());
					winsre();
				});
				
			};
		},
		error:function(){
			
		}
	});
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
	var drugName=geturlname("name");//名称
	$("#supnam a").html(decodeURI(drugName));
	if(drugName==""||drugName==null){
		$("#supnam").hide();
	};
	var hasReceipt=geturlname("receipt");//票据
	if(hasReceipt==null){
		hasReceipt="";
	};
	
	if(hasReceipt!=0&&hasReceipt!=1&&hasReceipt!=2&&hasReceipt!=3&&hasReceipt!=""){
		hasReceipt=0;
	};
	console.log(hasReceipt)
	if(hasReceipt==""||hasReceipt==null){
		$("#supreceipt a").html("");
		$("#supreceipt").attr("name","");
	}else{
		$("#sup_rece span").eq(hasReceipt).addClass("sup_color");
	};
	if(hasReceipt==0){
		if(hasReceipt==""||hasReceipt==null){
		$("#supreceipt a").html("");
		$("#supreceipt").attr("name","");
		$("#supreceipt").hide();
	}else{
		$("#supreceipt a").html("不需要票据");
		$("#supreceipt").attr("name",0);
		//sup_color
		
	};
		
	};
	if(hasReceipt==1){
		$("#supreceipt a").html("发票");
		$("#supreceipt").attr("name",1);
	};
	if(hasReceipt==2){
		$("#supreceipt a").html("收购手续");
		$("#supreceipt").attr("name",2);
	};
	if(hasReceipt==3){
		$("#supreceipt a").html("发票或收购手续");
		$("#supreceipt").attr("name",3);
	};
	//$("#supreceipt a").html(hasReceipt)
	var stockPlace=geturlname("stock");//库存地
	$("#supstock a").html(decodeURI(stockPlace));
	if(stockPlace==""||stockPlace==null){
		$("#supstock").hide();
	};
	var originPlace=geturlname("origin");//产地
	$("#suporigin a").html(decodeURI(originPlace));
	if(originPlace==""||originPlace==null){
		$("#suporigin").hide();
	};
	var qualityStandard=geturlname("quality");//质量
	if(qualityStandard==null){
		qualityStandard="";
	};
	if(qualityStandard!=0&&qualityStandard!=1&&qualityStandard!=2&&qualityStandard!=3&&qualityStandard!=4&&qualityStandard!=5&&qualityStandard!=""){
		qualityStandard=0;
	};
	if(qualityStandard==""||qualityStandard==null){
		$("#supquality a").html("");
		$("#supquality").attr("name","");
	}else{
		$("#sup_quality span").eq(qualityStandard).addClass("sup_color");
	}
	if(qualityStandard==0){
		if(qualityStandard==""||qualityStandard==null){
		$("#supquality a").html("");
		$("#supquality").attr("name","");
		$("#supquality").hide();
	}else{
		$("#supquality a").html("待确定");
		$("#supquality").attr("name",0);
	};
		
	};
	if(qualityStandard==1){
		$("#supquality a").html("达到出口标准和药典标准");
		$("#supquality").attr("name",1);
	};
	if(qualityStandard==2){
		$("#supquality a").html("达到出口标准");
		$("#supquality").attr("name",2);
	};
	if(qualityStandard==3){
		$("#supquality a").html("达到省标");
		$("#supquality").attr("name",3);
	};
	if(qualityStandard==4){
		$("#supquality a").html("达到2010版药典标准");
		$("#supquality").attr("name",4);
	};
	if(qualityStandard==5){
		$("#supquality a").html("达到2015版药典标准");
		$("#supquality").attr("name",5);
	};
	var open=1;
	var str=20;
	$.ajax({
		type:"get",
		url:url+"/cli/userneed/getall/1/"+open+"/"+str+"/1/1?token="+token+"&drugName="+drugName+"&hasReceipt="+hasReceipt+"&stockPlace="+stockPlace+"&originPlace="+originPlace+"&qualityStandard="+qualityStandard+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				bodytlis(data);
				var st="";
					st=Number(data.other)/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				errlis("暂无信息");
			};
		},
		error:function(){
			errlis("获取失败，请刷新重试");
		}
	});
	//下一页
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/userneed/getall/1/"+open+"/"+str+"/1/1?token="+token+"&drugName="+drugName+"&hasReceipt="+hasReceipt+"&stockPlace="+stockPlace+"&originPlace="+originPlace+"&qualityStandard="+qualityStandard+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					bodytlis(data);
					$("#isdangq").html(open)
				}else{
					errlis("暂无信息");
				}
			},
			error:function(){
				errlis("获取失败，请刷新重试");
			}
		});
	});	
	//上一页
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/userneed/getall/1/"+open+"/"+str+"/1/1?token="+token+"&drugName="+drugName+"&hasReceipt="+hasReceipt+"&stockPlace="+stockPlace+"&originPlace="+originPlace+"&qualityStandard="+qualityStandard+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					bodytlis(data);
					$("#isdangq").html(open);
				}else{
					errlis("暂无信息");
				}
			},
			error:function(){
					errlis("获取失败，请刷新重试");
			}
		});
	});	
	//跳转
	$("#ismytzan").click(function(){
		open=Number($(".cmaisp input[type='number']").val())
		if(open==""){
			return false;
		};
		if(open>$("#ismyipik").html()){
			open=$("#ismyipik").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/userneed/getall/1/"+open+"/"+str+"/1/1?token="+token+"&drugName="+drugName+"&hasReceipt="+hasReceipt+"&stockPlace="+stockPlace+"&originPlace="+originPlace+"&qualityStandard="+qualityStandard+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					bodytlis(data);
					$("#isdangq").html(open)
				}else{
					errlis("暂无信息");
				};
			},
			error:function(){
					errlis("获取失败，请刷新重试");
			}
		});
	});	
	
	
	
	function errlis(errtxt){
		$("#tbodyt tr").remove();
		$("#tbodybox img").attr("src","imgeas/error.png");
		$("#tbodybox p").html(errtxt);
		$("#tbodybox").show();
		$(".cmaisp").hide();
	};

	function bodytlis(data){
				$("#tbodyt tr").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<tr><td><p>';
					html+=data.lists[i].drugName;
					html+='</p></td><td><p>';
					html+=data.lists[i].drugSpecifications;
					html+='</p></td><td><p>';
					var numbersv=data.lists[i].number.split(",");
					if(numbersv.length>1){
						numbersv=numbersv[0]+numbersv[1];
					}else{
						numbersv=numbersv[0];
					};
					html+=numbersv;
					html+='</p></td><td><p>';
					html+=data.lists[i].originPlace;
					html+='</p></td><td><p>';
					html+=data.lists[i].stockPlace;
					html+='</p></td><td><p>';
					html+=data.lists[i].userName;
					html+='</p></td><td><p>';
					if(data.lists[i].userContact==""||data.lists[i].userContact==null){
						data.lists[i].userContact="登录可见";
					};
					html+=data.lists[i].userContact;
					html+='</p></td><td><p><a href="detailswanted.html?name='+encodeURI(data.lists[i].drugName)+'&need='+data.lists[i].userNeedId+'&user='+data.lists[i].userId+'">查看详情</a></p></td></tr>';
				};
				$("#tbodyt").append(html);
			
	};
	
	
	
})
