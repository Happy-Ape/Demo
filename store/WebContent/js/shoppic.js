$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	$(".myform").attr("action",url+"/file/cliTxtpicUpload");
	$(".myform input[name=url]").val(ut+"/merchant/min.html");
	
	$(".myform input[type='file']").change(function(){
		var ind=$(this).parents(".proishlis").index();
			console.log(ind+"--------------");
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
					$(".proishlis").eq(ind).children(".propic").children("img").attr("src",bgo[1]);
					$(".myform [type=file]").removeAttr("disabled");
					ind=null;
				};
				
			};
			
		});
		return false;
	});
	$.ajax({
		type:"get",
		url:url+"/cli/sellUser/getInfo",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var imagelist=data.pojo.imagelist.split(",");
				for(var i=0;i<$(".proishlis").length;i++){
					if(imagelist[i]!=" "){
						$(".proishlis").eq(i).children(".propic").children("img").attr("src",imagelist[i]);
					};
					
				};
			};
		},
		error:function(){
			gadget_popupt("加载失败，请刷新重试");
		}
	});
	$("#mysub").click(function(){
		var pics="";
		for(var i=0;i<$(".proishlis").length;i++){
			pics+=$(".proishlis").eq(i).children(".propic").children("img").attr("src")+",";
		};
		pics=pics.substring(0,pics.length-1);
		
		var crr=pics.split(",");
		for(var d=0;d<crr.length;d++){
			if(crr[d]=="../imgeas/moreimg.jpg"||crr[d]=="../imgeas/yuanq.gif"){
				crr[d]=" ";
			};
		};
		
		var imagelist="";
		for(var a=0;a<crr.length;a++){
			imagelist+=crr[a]+",";
		};
		imagelist=imagelist.substring(0,imagelist.length-1);
		
		$.ajax({
			type:"post",
			url:url+"/cli/sellUser/updateUserInf?token="+token+"&imagelist="+imagelist,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("提交成功");
					setTimeout(relo,3000);
					function relo(){
						window.location.reload();
					};
				}else{
					gadget_popupt("提交失败，请刷新重试.")
				}
			},
			error:function(){
				gadget_popupt("提交失败，请刷新重试")
			}
		});
	});
	
})
