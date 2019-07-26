$(function(){
	
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	$("#button").click(function(){
		if($("#olbap input").val()==""){
			gadget_popupt("标题不能为空");
			return false;
		};
		if($("#editor-trigger").val().length<46){
			gadget_popupt("内容太少了，多写点吧");
			return false;
		};
		//.length 45
		var content=$("#editor-trigger").val();
		var title=$("#olbap input").val();
		$.ajax({
			type:"post",
			url:url+"/cli/SN/save",
			data:{token:token,title:title,content:content,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("提交成功");
					window.location.href="snotice.html";
				};
			},
			error:function(){
				
			}
		});
		
	});
})
