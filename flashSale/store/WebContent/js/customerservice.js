$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
 	var orderid=getUrlParamo("orderid");
 	var sellUserId=getUrlParamo("sell");
 	var drugId=getUrlParamo("drug");
 	var orderCode="";
 	if(orderid==null||sellUserId==null||drugId==null||orderid==""||sellUserId==""||drugId==""){
 		gadget_popupfs("商品信息有误，是否返回上一页?",2,-1,0,"返回上一页");
 	};
 	gadget_back("加载中...");
 	$.ajax({
 		type:"get",
 		url:url+"/cli/order/getOrderDetail/"+orderid+"/"+sellUserId+"/"+drugId+"?mintime="+new Date().getTime()+"&token="+token,
 		dataType:"json",
 		success:function(data){
 			gadget_back_remove();
 			if(data.code==1){
 				orderCode=data.message;
 				$("#mybtn").show();
 				$("#serr h4").html("订单号："+data.message);
 				$("#serl img").attr("src",data.pojo.imagePath);
 				$("#serr h5").html("商品名："+data.pojo.drugname);
 				$("#nump").html("数量："+data.pojo.num);
 				$("#numpt").html("小计："+data.pojo.totalfee+"元");
 				$("#numps").html("备注："+data.pojo.actcontent);
 			}else{
 				$("#mybtn").hide();
 				gadget_popupfs("商品信息有误，是否返回上一页?",2,-1,0,"返回上一页");
 			};
 		},
 		error:function(){
 			gadget_back_remove();
 			$("#mybtn").hide();
 			gadget_popupfs("网络错误，是否刷新重试?",2,0,0,"刷新");	
 		}
 	});
 	
 	
 	
 	
 	/*$("#serl img").attr("src",pic);
 	$("#serr h4").html("订单号："+orderCode);
 	$("#serr h5").html("商品名："+shopname);
 	$("#nump").html("数量："+num);*/
 	
	$(".xzly span").click(function(){
		$(this).addClass("mysopan");
		$(this).siblings("span").removeClass("mysopan")
	});
	$("#myform").attr("action",url+"/file/cliTxtpicUpload");
	$("#myform input[name=url]").val(ut+"/min.html");
		$("#myform input[type='file']").change(function(){
			if($(".myimg").length>3){
				gadget_popupt("请删除一张图片后，再上传");
				return false;
			};
		$(this).parent("#myform").siblings("img").attr("src","../imgeas/yuanq.gif");
		$(this).parent("#myform").submit();
		var indx=1;
		$("#myform [type='file']").attr("disabled","disabled");
		$("#ifr").load(function(){
			//console.log($("#bgo").val())
			var bgo=$("#bgo").val();
			if(bgo!=""){
				//console.log(bgo)
//				?pic=http://7xloj2.com1.z0.glb.clouddn.com/1481009450439
				bgo=bgo.split("=");
				if(bgo[1]!=""&&indx==1){
					$("#myfils img").attr("src","../imgeas/tjtup.png");
					$("#myform [type=file]").removeAttr("disabled");
					var html='<div class="myimg" title="点击删除"><img src="';
					html+=bgo[1];
					html+='"/></div>';
					$("#myfils").after(html);
					$(".myimg").click(function(){
						$(this).remove();
					}); 
					indx=3;
				};
				
			};
		});
		return false;
	});
	
	$("#mybtn").click(function(){
		var submittxt=encodeURI($("#submitTxt").val());
		if(submittxt==""){
			$(".mytxt p span").show();
			return false;
		}else{
			$(".mytxt p span").hide();
		};
		var submitimages="";
		if($(".myimg").length>0){
			for(var i=0;i<$(".myimg").length;i++){
				submitimages+=$(".myimg").eq(i).children("img").attr("src")+",";
			};
		};
		submitimages=submitimages.substring(0,submitimages.length-1);
		$.ajax({
			type:"post",
			url:url+"/cli/aftersale/save?token="+token+"&ordercode="+orderCode+"&orderid="+orderid+"&selluserid="+sellUserId+"&drugid="+drugId+"&submittxt="+submittxt+"&submitimages="+submitimages,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupfs("提交成功，是否返回订单页面?",2,"order.html",0,"返回订单页面");
				}else{
					gadget_popups("提交失败"+data.message);
				};
			},
			error:function(){
				gadget_popupt("提交失败，请重新访问本页面");
			}
		});
	})
})
