$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var sellU=$.cookie('peopleus');
	var open=1;
	var str=10;
	$.ajax({
		type:"get",
		url:url+"/cli/SN/getAllMyNotice/"+sellU+"/0/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				tislas(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyoipik").html(st);
					$("#isodangq").html("1");
			}else{
				gadget_popupt("暂无公告");
				$(".cmaisop").hide();
			};
		},
		error:function(){
			
		}
	});
		//下一页 
	$("#cmaisomop").click(function(){
		open=parseInt($("#isodangq").html())+1;
		if(open>$("#ismyoipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/SN/getAllMyNotice/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					tislas(data);
					$("#isodangq").html(open)
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
	$("#cmaisompa").click(function(){
		open=parseInt($("#isodangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/SN/getAllMyNotice/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					tislas(data);
					$("#isodangq").html(open);
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	$("#ismyotzan").click(function(){
		open=$(".cmaisop input[type='number']").val()
		if(open==""){
			return false;
		};
		if(open>$("#ismyoipik").html()){
			open=$("#ismyoipik").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/SN/getAllMyNotice/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					tislas(data);
					$("#isodangq").html(open)
				}else{
					gadget_popupt("获取失败.");
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	function tislas(data){
		$(".oldban .snotislas").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="snotislas" name="';
					html+=data.lists[i].noticeid;
					html+='"><p class="notss">添加日期：';
					html+=data.lists[i].creattime;
					html+='</p><p class="notss">修改日期：';
					if(data.lists[i].updatetime==null||data.lists[i].updatetime==""){
						data.lists[i].updatetime="--";
					};
					html+=data.lists[i].updatetime;
					html+='</p><h5>标题：<span><a target="_blank" href="../informationmore.html?s='+data.lists[i].noticeid+'">';
					html+=data.lists[i].title;
					html+='</a></span></h5><p class="ismtyp"><span class="icesomg" name="';
					html+=data.lists[i].state;
					html+='">修改</span>';
					if(data.lists[i].state==1){
						html+='<span class="icetopomg">取消展示</span>';
					};
					if(data.lists[i].state==-1){
						html+='<span  class="icebomomg">设为展示</span>';
					};
					html+='<span class="icepassomg">删除</span></p></div>';
				};
				$(".oldban").append(html);
				$(".icesomg").click(function(){
					///cli/SN/getDetail/｛noticeId}
					$("#iceomg").show();
					var noticeid=$(this).parents(".snotislas").attr("name");
					var state=$(this).attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/SN/getDetail/"+noticeid,
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								$("#olbap input").val(data.pojo.title);
								$(".wangEditor-txt").html(data.pojo.content);
								$("#editor-trigger").val(data.pojo.content);
								$("#button").click(function(){
									//alert($("#editor-trigger").val())
									if($("#olbap input").val()==""){
										gadget_popupt("标题不能为空");
										return false;
									};
									if($("#editor-trigger").val().length<46){
										gadget_popupt("内容太少了，多写点吧");
										return false;
									};
									var title=$("#olbap input").val();
									var content=$("#editor-trigger").val();
									
									console.log(state+"state");
									//console.log(noticeid+"noticeid");
									$.ajax({
										type:"post",
										url:url+"/cli/SN/update",
										data:{token:token,noticeid:noticeid,title:title,content:content,state:state,mintime:new Date().getTime()},
										dataType:"json",
										success:function(data){
											gadget_login(data);
											if(data.code==1){
												gadget_popupt("提交成功");
												setTimeout(gadget_relo,3000);
											};
										},
										error:function(){
											
										}
									});
								});
							};
						},
						error:function(){
							
						}
					});
					
				});
				$(".icepassomg").click(function(){
					var noticeid=$(this).parents(".snotislas").attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/SN/delete/"+noticeid,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("删除成功");
								setTimeout(gadget_relo,3000);
							};
						},
						error:function(){
							
						}
					});
				});
				$(".icetopomg").click(function(){
					var noticeid=$(this).parents(".snotislas").attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/SN/change/1/"+noticeid,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("设置成功");
								setTimeout(gadget_relo,3000);
							};
						},
						error:function(){
							
						}
					});
				});
				$(".icebomomg").click(function(){
					var noticeid=$(this).parents(".snotislas").attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/SN/change/-1/"+noticeid,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("设置成功");
								setTimeout(gadget_relo,3000);
							}
						}
					});
				});
	};
	
	$("#boxpass").click(function(){
		$("#iceomg").hide();
	});
	
	
	
	
})
