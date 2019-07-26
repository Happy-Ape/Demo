$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	//var token="s14841833497212589";
	var open=1;
	var str=12;
	$(".icejfcx span").click(function(){
		$(".icejfcx span").removeClass("icejfbck");
		$(this).addClass("icejfbck");
		if($(this).index()==0){
			$("#tabup").hide();
			$("#tablis").show();
		};
		if($(this).index()==1){
			$("#tablis").hide();
			$("#tabup").show();
			$("#ismysub").hide();
			$("#ismybtn").show();
			$("#tabtit").val("");
			$("#redmon").val("");
			$("#editor-trigger").val("");
			$(".wangEditor-txt").html("");
		};
	});
	
	$("#ismybtn").click(function(){
		//alert($("#editor-trigger").val());
		//alert($("#tabtit").val());
		if($("#tabtit").val()==""||$("#tabtit").val()==null){
			gadget_popupt("请填写标题");
			return false;
		};
		if($("#tabtit").val().length>50){
			gadget_popupt("标题过长");
			return false;
		};
		if($("#editor-trigger").val()==""||$("#editor-trigger").val()==null){
			gadget_popupt("请填写内容");
			return false;
		};
		if($("#redmon").val()==""||$("#redmon").val()==null){
			gadget_popupt("日期格式不正确");
			return false;
		};
		var title=$("#tabtit").val();
		var content=$("#editor-trigger").val();
		var expiredtime=$("#redmon").val();
		//alert(expiredtime);
		if($.browser.msie) {
    		//alert("此浏览器为 IE")
    		if(jQuery.param({"content":content}).length>=1774){
    			gadget_popupt("内容太长");
    			return false;
    		};
			};
		//alert(jQuery.param({"content":content}).length);
		var _json = jQuery.param({"token":token,"title":title,"content":content,"expiredtime":expiredtime,"mintime":new Date().getTime()});
		//alert(_json.length);
		$.ajax({
			type:"post",
			url:url+"/cli/sn/save?"+_json,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("提交成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popups("提交失败，"+data.message);
				};
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				gadget_popups("提交失败，请刷新重试");
				console.log(XMLHttpRequest+"=XMLHttpRequest")
				console.log(XMLHttpRequest.status+"=XMLHttpRequest.status")
				console.log(XMLHttpRequest.readyState+"=XMLHttpRequest.readyState")
				console.log(textStatus+"=textStatus")
				console.log(errorThrown+"=errorThrown")
			}
		});
		
	});
	
	$.ajax({
		type:"get",
		url:url+"/cli/sn/getAll/"+open+"/"+str+"?token="+token,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				others(data);
				var st="";
					st=data.other/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			};
			
		},
		error:function(){
			
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
			url:url+"/cli/sn/getAll/"+open+"/"+str+"?token="+token,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					others(data);
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
			url:url+"/cli/sn/getAll/"+open+"/"+str+"?token="+token,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					others(data);
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
			url:url+"/cli/sn/getAll/"+open+"/"+str+"?token="+token,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					others(data);
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
	
	function others(data){
		$("#tabliso .tablist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="tablist" name="';
					html+=data.lists[i].sellerNeedsId;
					html+='">';
					if(data.lists[i].state==-1){
						html+='<div class="statbox"><p>已取消</p></div>';
					};
					html+='<p class="tablistps">浏览次数：<span>';
					html+=data.lists[i].count;
					html+='</span></p><div class="tabtitle"><p>过期时间：';
					html+=data.lists[i].expiredtime;
					html+='</p><h5><a href="../requirementsdetails.html?nd='+data.lists[i].sellerNeedsId+'&tp='+data.lists[i].type+'">';
					html+=data.lists[i].title;
					html+='</a></h5></div><div class="tabbtn"><p>';
					html+='<span class="edits">编 辑</span>';
					if(data.lists[i].state==0){
						html+='<span class="Revoke">取 消</span>';
					};
					if(data.lists[i].state==-1){
						html+='<span class="recovery">恢 复</span>';
					};
					html+='</p></div></div>';
				};
				$("#tabliso").append(html);
				$(".edits").click(function(){
					$("#tabup").show();
					$("#tablis").hide();
					$("#ismybtn").hide();
					$("#ismysub").hide();
					$("#ismysub").attr("name",$(this).parents(".tablist").attr("name"));
					
					$.ajax({
						type:"get",
						url:url+"/cli/sn/getDetail/"+$(this).parents(".tablist").attr("name"),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								$("#ismysub").show();
								$("#tabtit").val(data.pojo.title);
								$("#redmon").val(data.pojo.expiredtime);
								$("#editor-trigger").val(data.pojo.content);
								$(".wangEditor-txt").html(data.pojo.content)
							};
						},
						error:function(){
							
						}
					});
				});
				$(".Revoke").click(function(){
					//state 1 不显示 -1显示 
					//alert($(this).parents(".tablist").attr("name"));
					var stat=$(this).parents(".tablist").attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/sn/changeState/1/"+stat+"?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popups("撤销成功");
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popups("撤销失败"+data.message);
							};
						},
						error:function(){
							gadget_popupt("撤销失败,请刷新重试");
						}
					});
				});
				$(".recovery").click(function(){
					var stat=$(this).parents(".tablist").attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/sn/changeState/-1/"+stat+"?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popups("恢复显示成功");
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popups("恢复显示失败"+data.message);
							};
						},
						error:function(){
							gadget_popupt("恢复显示失败,请刷新重试");
						}
					});
				});
				
				
				
	};
	
	$("#ismysub").click(function(){
		if($("#tabtit").val()==""||$("#tabtit").val()==null){
			gadget_popupt("请填写标题");
			return false;
		};
		if($("#editor-trigger").val()==""||$("#editor-trigger").val()==null){
			gadget_popupt("请填写内容");
			return false;
		};
		if($("#redmon").val()==""||$("#redmon").val()==null){
			gadget_popupt("日期格式正确");
			return false;
		};
		if($(this).attr("name")==""||$(this).attr("name")==null){
			gadget_popupt("信息编号不正确，请刷新重试");
			return false;
		};
		var title=$("#tabtit").val();
		var content=$("#editor-trigger").val();
		var expiredtime=$("#redmon").val();
		var sellerNeedsId=$(this).attr("name");
		var postjson = jQuery.param({"token":token,"sellerNeedsId":sellerNeedsId,"title":title,"content":content,"expiredtime":expiredtime,"mintime":new Date().getTime()});
		$.ajax({
			type:"post",
			url:url+"/cli/sn/update?"+postjson,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("编辑成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popups("编辑失败",+data.message);
				};
			},
			error:function(){
				gadget_popupt("编辑失败,请刷新重试");
			}
		});
		
	});
})
