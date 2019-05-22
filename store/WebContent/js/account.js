$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var stae=-1;
	var open=1;
	var str=10;
	$(".icejfcx span").click(function(){
		$(this).addClass("icejfbck");
		$(this).siblings("span").removeClass("icejfbck");
		$("#tbody tr").remove();
		open=1;
		if($(this).index()==0){
			stae=-1;
			oneback(stae,open)
		};
		if($(this).index()==1){
			stae=1;
			oneback(stae,open)
		};
		if($(this).index()==2){
			stae=0;
			oneback(stae,open)
		};
	});
	oneback(stae,open)
	function oneback(stae,open){
		gadget_m_remv($("#myfeedback"));
		$(".cmaisp").show();
	$.ajax({
		type:"get",
		url:url+"/cli/FB/getMy/"+stae+"/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				backlis(data);
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
				//#tbody
				gadget_err_m("暂无数据",$("#myfeedback"));
				$(".cmaisp").hide();
			};
			
		},
		error:function(){
			gadget_err_m("网络错误，请重试",$("#myfeedback"));
			$(".cmaisp").hide();
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
					backlis(data);
					$("#isdangq").html(open)
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
					backlis(data);
					$("#isdangq").html(open);
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
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
					backlis(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	
	function backlis(data){
		$("#tbody tr").remove();
		var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<tr><td>';
					html+=data.lists[i].title;
					html+='</td><td>';
					html+=data.lists[i].submittime;
					html+='</td><td>';
					if(data.lists[i].state==0){
						html+='待处理';
					};
					if(data.lists[i].state==1){
						html+='已回复';
					};
					html+='</td><td><a target="_blank" href="';
					html+="../feedbackmore.html?id="+data.lists[i].feedbackid;
					html+='">查看详情</a></td></tr>';
				};
				$("#tbody").append(html);
	}
})
