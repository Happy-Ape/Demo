$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var nowPage=1;
	var str="1";//每页条数
	var open="";//当前页数
	$("#istxtxx").click(function(){
		$("#istxtbig").hide();
	});
	$.ajax({
		type:"get",
		url:url+"/cli/dc/getAllComments/0/0/"+nowPage+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
			icenneww(data);
			var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1")
			}else{
				//.icenbant
				gadget_err_m("暂无数据",$(".icenbant"),"100px");
				$(".cmaisp").hide();
			};
		},
		error:function(){
			gadget_err_m("获取失败，请刷新重试",$(".icenbant"),"100px");
			$(".cmaisp").hide();
		}
	});
		//下一页
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/dc/getAllComments/0/0/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					icenneww(data);
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
			url:url+"/cli/dc/getAllComments/0/0/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					icenneww(data)
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
		open=$(".cmaisp input[type='number']").val()
		if(open==""){
			return false;
		};
		if(open>$("#ismyipik").html()){
			open=$("#ismyipik").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/dc/getAllComments/0/0/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					icenneww(data);
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
	function icenneww(data){
			$(".icenneww").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="icenneww"><div class="icentime"><p><a href="../Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid+'">';
					html+=data.lists[i].drugName;
					html+='</a></p></div><div class="icenstatet"><p>';
					if(data.lists[i].dctype==3){
						html+="好评";
					};
					if(data.lists[i].dctype==2){
						html+="中评";
					};
					if(data.lists[i].dctype==1){
						html+="差评";
					};
					html+='</p></div><div class="icenstateb"><p>';
					html+=data.lists[i].txtcontent;
					html+='</p></div><div class="icensxia"><p>';
					
					if(data.lists[i].pid==-1){
						html+="未回复";
					};
					if(data.lists[i].pid==1){
						html+="已回复";
					};
					html+='</p></div><div class="icensxia">';
					html+='<a class="icensxiamin" name="';
					html+=data.lists[i].commentid;
					html+='">查看详情</a></div></div>';
				};
				$(".icennewwm").after(html);
				$(".icensxiamin").click(function(){
					$("#istxtop").html("");
					$(".istxto p").html("");
					$(".istxtt a").remove();
					$("#iststboon").html("");
					$(".istxts p").html("");
					$("#istxtbig").show();
					///cli/dc/getDetail/2
					var getDetail=$(this).attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/dc/getDetail/"+getDetail,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								if(data.lists.length==1){
									
									$("#istxtop").html(data.lists[0].createdtime);
									$(".istxto p").html(data.lists[0].txtcontent);
									if(data.lists[0].imagescontent!=""&&data.lists[0].imagescontent!=null){
										var arr=data.lists[0].imagescontent.split(";");
										
										var hm='';
										for(var c=0;c<arr.length;c++){
											hm+='<a href="';
											hm+=arr[c];
											hm+='" target="_blank"><img src="';
											hm+=arr[c];
											hm+='" /></a>';
										};
										$(".istxtt").append(hm);
									};
								};
								if(data.lists.length==2){
									
									$("#istxtop").html(data.lists[0].createdtime);
									$(".istxto p").html(data.lists[0].txtcontent);
									if(data.lists[0].imagescontent!=""&&data.lists[0].imagescontent!=null){
										var arr=data.lists[0].imagescontent.split(";");
										var hm='';
										for(var c=0;c<arr.length-1;c++){
											hm+='<a href="';
											hm+=arr[c];
											hm+='" target="_blank"><img src="';
											hm+=arr[c];
											hm+='" /></a>';
										};
										$(".istxtt").append(hm);
									};
									$("#iststboon").html(data.lists[1].createdtime);
									$(".istxts p").html(data.lists[1].txtcontent);
								};
							};
						},
						error:function(){
							
						}
					});
				});
			
	};
})
