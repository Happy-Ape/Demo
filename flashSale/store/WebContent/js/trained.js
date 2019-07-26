$(function(){
	jQuery.support.cors = true;
	var tokens=$.cookie('peoplemessage');
	var peoplestate=$.cookie('peoplestate');
	var code="";
	$(".myform").attr("action",url+"/file/cliTxtpicUpload");
	$(".myform input[name=url]").val(ut+"/icen/min.html");
	/*if(peoplestate==-1){
		$("#icennum").html("通过审核后才能正常开启买卖功能");
	};*/
	
	$.ajax({
		type:"GET",
		url:url+"/cli/endUser/getQualification",
		dataType: "json",
		data:{token:tokens,mintime:new Date().getTime()},
		success:function(data){
			gadget_login(data);
			code=data.code
			if(data.code=="1"){
				if(data.pojo.businesslicense!=null){
					$(".businesslicense").attr("src",data.pojo.businesslicense);
				};
				if(data.pojo.drugbusinesslicense!=null){
					$(".drugbusinesslicense").attr("src",data.pojo.drugbusinesslicense);
				};
				if(data.pojo.gsp!=null){
					$(".gsp").attr("src",data.pojo.gsp);
				};			
				if(data.pojo.foodcirculation!=null){
					$(".foodcirculation").attr("src",data.pojo.foodcirculation);
				};
				if(data.pojo.idcard!=null){
					$(".idcard").attr("src",data.pojo.idcard);
				};
				if(data.pojo.corporatepower!=null){
					$(".corporatepower").attr("src",data.pojo.corporatepower);
				};
				if(data.pojo.equipmentbusinesslicense!=null){
					$(".equipmentbusinesslicense").attr("src",data.pojo.equipmentbusinesslicense);
				};
				switch (data.other){
				case "-1":
					$("#icennum").html("通过审核后才能正常开启买卖功能");
					break;
				case "2":
					$("#icennum").html("当前用户已被禁用");
					break;
				case "-2":
					$("#icennum").html("审核未通过，请重新提交资质");
					break;
				case "1":
					$("#icennum").html("审核已通过(如无法使用功能，请重新登录或联系客服)");
					break;
			}
			};
			//添加图片
			
		},
		error:function(){
			
		}
	});
	$("#mybutton").click(function(){
		//console.log($(".businesslicense").attr("src"));
		//console.log($(".drugbusinesslicense").attr("src"));
		var pipcsrc="../imgeas/tjtup.png";
		var picsrc="../imgeas/yuanq.gif";
		var businesslicense=$(".businesslicense").attr("src");
		var drugbusinesslicense=$(".drugbusinesslicense").attr("src");
		var gsp=$(".gsp").attr("src");
		var foodcirculation=$(".foodcirculation").attr("src");
		var idcard=$(".idcard").attr("src");
		var corporatepower=$(".corporatepower").attr("src");
		var equipmentbusinesslicense=$(".equipmentbusinesslicense").attr("src");
		if(businesslicense==pipcsrc||businesslicense==picsrc||businesslicense==""||businesslicense==null){
			gadget_popupt("请上传营业执照");
			return false;
		};
		if(drugbusinesslicense==pipcsrc||drugbusinesslicense==picsrc||drugbusinesslicense==""||drugbusinesslicense==null){
			gadget_popupt("请上传药品经营许可证");
			return false;
		};
		if(gsp==pipcsrc||gsp==picsrc||gsp==""||gsp==null){
			gadget_popupt("请上传GSP证书");
			return false;
		};
		if(foodcirculation==pipcsrc||foodcirculation==picsrc||foodcirculation==""||foodcirculation==null){
			gadget_popupt("请上传食品流通许可证");
			return false;
		};
		if(idcard==pipcsrc||idcard==picsrc||idcard==""||idcard==null){
			gadget_popupt("请上传身份证(正反面)");
			return false;
		};
		if(corporatepower==pipcsrc||corporatepower==picsrc||corporatepower==""||corporatepower==null){
			gadget_popupt("请上传法人授权委托书");
			return false;
		};
		if(equipmentbusinesslicense==pipcsrc||equipmentbusinesslicense==picsrc||equipmentbusinesslicense==""||equipmentbusinesslicense==null){
			gadget_popupt("请上传医疗器械经营企业许可证");
			return false;
		};
		$.ajax({
			type:"post",
			url:url+"/cli/endUser/saveAllQua?token="+tokens+"&businesslicense="+businesslicense+"&drugbusinesslicense="+drugbusinesslicense+"&gsp="+gsp+"&foodcirculation="+foodcirculation+"&idcard="+idcard+"&corporatepower="+corporatepower+"&equipmentbusinesslicense="+equipmentbusinesslicense,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("上传成功，我们将在48小时内通知您审核结果");
					setTimeout(gadget_relo,3000);
				};
			},
			error:function(){
				
			}
		});
		
		
	});
	
	$(".myform input[type='file']").change(function(){
		var ind=$(this).parents(".icenzizhi").index()-4;
		//console.log(ind+"--------------");
		$(this).parent(".myform").siblings("img").attr("src","../imgeas/yuanq.gif");
		$(this).parent(".myform").submit();
		$(".myform [type='file']").attr("disabled","disabled");
		$("#ifr").load(function(){
			//console.log($("#bgo").val())
			var bgo=$("#bgo").val();
			if(bgo!=""){
				//console.log(bgo)
//				?pic=http://7xloj2.com1.z0.glb.clouddn.com/1481009450439
				bgo=bgo.split("=");
				if(bgo[1]!=""&&ind!=null){
					$(".icenzizhi").eq(ind).children(".icenzizhipic").children("img").attr("src",bgo[1]);
					$(".myform [type=file]").removeAttr("disabled");
					ind=null;
				};
				
			};
			
		});
		return false;
	});	
	
	
	
	
	
/*$(".icenmyfil").change(function(){
		//var size = this.files[0].size;
		
		$(this).parent().siblings("img").attr("src","../imgeas/zhuanq.gif");
		
		var filid=$(this).attr("id");
		var ab=$(this).attr("ab");
		var tokens=$.cookie('peoplemessage');
		var index=$(this).parent().parent().parent().index();
		
		
	$(".icenzizhi").eq(index-1).children().children(".isform").ajaxSubmit({
			url: url+"/cli/endUser/saveQualification/"+ab, // 请求的url
			data:{token:tokens,code:code},
			type: "post", // 请求方式
			dataType: "json", // 响应的数据类型
			success: function(data) {
					if(data.code=="1"){
						$(".icenzizhi").eq(index-1).children().children("img").attr("src",data.message)
					};
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {
				
				//parsererror
				if(textStatus=="parsererror"){
					window.location.reload();
				}else{
					alert("数据加载失败！请刷新重试");
				}
			}
		 
	
	
	
});	
	
	
	
})*/
})
