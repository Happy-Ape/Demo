$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var search=window.location.search;
	 
		search=decodeURI(search);
		search=search.split("=");
		conId=search[1];
		if(search[0]=="?m"){
			$.ajax({
				type:"get",
				url:url+"/cli/content/getConByConId/"+conId+"?mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					
					if(data.code==1){
						$("#banomhf").html(data.pojo.title);
						$("#bantime").html(data.pojo.createdate);
						$("#banner").append(data.pojo.content);
						$("title").html(data.pojo.title);
					};
				},
				error:function(){
					
				}
			});
		};
		if(search[0]=="?s"){
			$.ajax({
				type:"get",
				url:url+"/cli/SN/getDetail/"+conId+"?mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					if(data.code==1){
						$("#banomhf").html(data.pojo.title);
						$("#bantime").html(data.pojo.creattime);
						$("#banner").append(data.pojo.content);
						$("title").html(data.pojo.title);
					};
				},
				error:function(){
					
				}
			});
		};
		if(search[0]=="?u"){
			$.ajax({
				type:"get",
				url:url+"/cli/notice/detail/"+conId+"?mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					if(data.code==1){
						$("#banomhf").html(data.pojo.title);
						$("#bantime").html(data.pojo.creattime);
						$("#banner").append(data.pojo.content);
						$("title").html(data.pojo.title);
					};
				},
				error:function(){
					
				}
			});
		};
	
})
