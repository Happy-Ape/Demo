$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var stae=-1;
	var open=1;
	var str=10;
	$(".incison span").click(function(){
		$(this).addClass("mycolor");
		$(this).siblings("span").removeClass("mycolor");
		open=1;
		if($(this).index()==0){
			stae=-1;
			oneback(stae,open);
		};
		if($(this).index()==1){
			stae=1;
			oneback(stae,open);
		};
		if($(this).index()==2){
			stae=0;
			oneback(stae,open);
		};
	});
	oneback(stae,open);
	function oneback(stae,open){
		$.ajax({
		type:"get",
		url:url+"/cli/FB/getMy/"+stae+"/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				feedlis(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				$("#mytbody tr").remove();
				$(".cmaisp").hide();
				$("#errno").show();
			};
		},
		error:function(){
			gadget_popupt("请刷新重试")
		}
	});
	};

	
	
	
		//下一页
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/FB/getMy/"+stae+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					feedlis(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("暂无数据");
				}
			},
			error:function(){
				gadget_popupt("获取失败，请刷新重试");
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
			url:url+"/cli/FB/getMy/"+stae+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					feedlis(data);
					$("#isdangq").html(open);
				}else{
					gadget_popupt("暂无数据")
				}
			},
			error:function(){
				gadget_popupt("获取失败，请刷新重试")
			}
		});
	});
		//跳转
	$("#ismytzan").click(function(){
		open=Number($(".cmaisp input[type='number']").val());
		if(open==""){
			return false;
		};
		if(open>Number($("#ismyipik").html())){
			open=Number($("#ismyipik").html());
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/FB/getMy/"+stae+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					feedlis(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("暂无数据")
				}
			},
			error:function(){
				gadget_popupt("获取失败，请刷新重试")
			}
		});
	});
	function feedlis(data){
		$(".cmaisp").show();
		$("#errno").hide();
		$("#mytbody tr").remove();
		var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<tr><td class="ismygir"><p>';
					html+=data.lists[i].title;
					html+='</p></td><td><p>';
					html+=data.lists[i].submittime;
					html+='</p></td><td><p>';
					if(data.lists[i].state==0){
						html+='待回复';
					};
					if(data.lists[i].state==1){
						html+='已回复';
					};
					html+='</p></td><td class="newiscz"><p><a target="_blank" href="';
					html+='../feedbackmore.html?id='+data.lists[i].feedbackid;
					html+='">查看详情</a></p></td></tr>';
				};
				$("#mytbody").append(html);
	};
	
	
})
