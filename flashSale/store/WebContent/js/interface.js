$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	$.ajax({
		type:"get",
		url:url+"/cli/sellUser/getInfo",
		data:{token:token},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$(".wangEditor-txt").html(data.pojo.companyintroduction);
				$("#editor-trigger").val(data.pojo.companyintroduction);
			};
		},
		error:function(){
			gadget_popupt("加载失败，请刷新页面");
		}
		
	});
	
	
	
	$("#myinput input").click(function(){
		if($("#editor-trigger").val()==""){
			return false;
		};
		var triggerval=$("#editor-trigger").val();
		//var _json = jQuery.param({"token":token,"companyintroduction":triggerval,"mintime":new Date().getTime()});
		$.ajax({
			type:"post",
			url:url+"/cli/sellUser/updateUserInf",
			data:{"token":token,"companyintroduction":triggerval,"mintime":new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("设置成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popupt("设置失败,"+data.message);
				};
			},
			error:function(){
				gadget_popupt("设置失败，请重试。");
			}
		});
		
	});
})
