$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	$("#myimgnone").click(function(){
		$("#myimg").hide();
	});
	if(window.location.search==null||window.location.search==""){
		return false;
	};
	
	var search=window.location.search.split("=");
	
	search=search[1];
	
	if(search==""||search==null){
		return false;
	};
	$.ajax({
		type:"get",
		url:url+"/cli/FB/getDetail/"+search,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$("#mytxtl h5").html(data.pojo.title);
				$("#mytxtl .timep").html("反馈时间:"+data.pojo.submittime);
				$("#mycontent p").html(data.pojo.txtcontent);
				if(data.pojo.content!=""&&data.pojo.content!=null){
					var imglis=data.pojo.content.split(",");
					var html='';
					for(var i=0;i<imglis.length;i++){
						html+='<div class="picbox"><img src="';
						html+=imglis[i];
						html+='" /></div>';
					};
					$("#mytxtl").append(html)
				};
				if(data.pojo.state==1){
					$("#replyr .timep").html("回复时间："+data.pojo.handletime);
					$(".replytxt").html(data.pojo.reply);
				}else{
					$(".replytxt").html("<p style='color:red;text-align: center'>等待回复</p>")
				};
					$(".picbox").click(function(){
						$("#bigpic").attr("src",$(this).children("img").attr("src"));
						$("#myimg").show();
					});
			};
		},
		error:function(){
		}
	});
	
})
