$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	//console.log(token+"tokentokendate")
	var metype=1;
	var open=1;
	var str=10;
	$.ajax({
		type:"get",
		url:url+"/cli/sysinf/getTypeAllSysInf/"+metype+"/"+open+"/"+str+"?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				pingjlis(data);
				var st="";
					st=data.other/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					//console.log(data.message+"message");
//					console.log(st+"st");
					$("#ismyipiks").html(st);
					$("#isdangqs").html("1");
			};
		},
		error:function(){
			
		}
	});

	$("#cmaismops").click(function(){
		open=parseInt($("#isdangqs").html())+1;
		if(open>$("#ismyipiks").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sysinf/getTypeAllSysInf/"+metype+"/"+open+"/"+str+"?mintime="+new Date().getTime()+"&token="+token,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					pingjlis(data);
					$("#isdangqs").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
		//上一页
	$("#cmaismpas").click(function(){
		open=parseInt($("#isdangqs").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sysinf/getTypeAllSysInf/"+metype+"/"+open+"/"+str+"?mintime="+new Date().getTime()+"&token="+token,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					pingjlis(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.");
				};
			},
			error:function(){
				gadget_popupt("获取失败");
			}
		});
	});
	function pingjlis(data){
		$("#menew_lt .menew_lis").remove();
		$("#menew_r p").html(" ");
		var html='';
		$("#menew_r p").html(data.lists[0].content);
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="menew_lis" style="';
					if(i==0){
					html+="background-color: rgb(153, 204, 204); color: rgb(255, 255, 255);";
						
					};
					html+='"><p class="skiltim">';
					html+=data.lists[i].date;
					html+='</p><p class="sklitxt">';
					html+=data.lists[i].content;
					html+='</p></div>';
				};
				$("#menew_lt").append(html)
		$(".menew_lis").click(function(){
			$(".menew_lis").css("background-color","#fff");
			$(".menew_lis").css("color","#333");
			$("#menew_r p").html($(this).children(".sklitxt").html());
			$(this).css("background-color","#99CCCC");
			$(this).css("color","#fff");
		});
				
				
	};
	
	
	
	
})
