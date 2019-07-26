$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	var act=getUrlParamo("act");//<!--0全部 2没有开始 1正在进行中 -1已经过期-->
	var join=getUrlParamo("join");//<!---1审核不过  -2待参与  1待审核 2审核通过 -6已取消-->
	if(act!=0&&act!=2&&act!=1&&act!=-1){
		act=0;
	};
	if(join!=-1&&join!=-2&&join!=1&&join!=2&&join!=-6){
		join=-2;
	};
	$("#actste").val(act)
	$("#joinste").val(join)
	$("#ismybutton").click(function(){
		window.location.href="fcourt.html?act="+$("#actste").val()+"&join="+$("#joinste").val();
	});
	$("#myhide").click(function(){
		$("#explains").hide();
		$("#exp textarea").val("");
		$("#mybtn").attr("name","");
	});
	$("#myxx").click(function(){
		$("#explain").hide();
		$("#ainbox h5").html("");
		$("#ainbox p").html("");
	});
	$.ajax({
		type:"get",
		url:url+"/cli/SA/getPlatformAct/"+open+"/"+str+"?actState="+act+"&joinState="+join+"&token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				coulis(data);
				var st="";
					st=Number(data.message)/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				gadget_popupt("暂无列表");
			};
		},
		error:function(){
			gadget_popupt("获取失败，请刷新重试");
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
			url:url+"/cli/SA/getPlatformAct/"+open+"/"+str+"?actState="+act+"&joinState="+join+"&token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					coulis(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("暂无列表");
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
			url:url+"/cli/SA/getPlatformAct/"+open+"/"+str+"?actState="+act+"&joinState="+join+"&token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					coulis(data);
					$("#isdangq").html(open);
				}else{
					gadget_popupt("暂无列表");
				};
			},
			error:function(){
					gadget_popupt("获取失败，请刷新重试");
			}
		});
	});		
	//跳转
	$("#ismytzan").click(function(){
		open=Number($(".cmaisp input[type='number']").val())
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
			url:url+"/cli/SA/getPlatformAct/"+open+"/"+str+"?actState="+act+"&joinState="+join+"&token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					coulis(data);
					$("#isdangq").html(open);
				}else{
					gadget_popupt("暂无列表");
				};
			},
			error:function(){
					gadget_popupt("获取失败，请刷新重试");
			}
		});
	});	
	function coulis(data){
		
		$("#mytbody tr").remove();
		var html='';
		for(var i=0;i<data.lists.length;i++){
			html+='<tr name="'+data.lists[i].activityid+'"><td class="ismyman"><p>';
			html+=data.lists[i].simpledesc;
			html+='</p></td><td><p>';
			html+=data.lists[i].begindate;
			
			
			html+='</p></td><td><p>';
			html+=data.lists[i].enddate;
			html+='</p></td><td><p>';
			//<!--0全部 2没有开始 1正在进行中 -1已经过期-->
			
			if(data.other<Date.parse(new Date(data.lists[i].begindate))&&Date.parse(new Date(data.lists[i].begindate))-data.other>1800000){
				html+="等待开始";
			};
			if(data.other>Date.parse(new Date(data.lists[i].begindate))&&data.other<Date.parse(new Date(data.lists[i].enddate))){
				html+="正在进行";
			};
			if(data.other>Date.parse(new Date(data.lists[i].enddate))){
				html+="已结束";
			};
			if(data.other<Date.parse(new Date(data.lists[i].begindate))&&Date.parse(new Date(data.lists[i].begindate))-data.other<1800000){
				html+="即将开始";
			};
			html+='</p></td><td><p>';
		
			if(data.lists[i].joinact_state==""||data.lists[i].joinact_state==null||data.lists[i].joinact_state==undefined){
				html+="待参与";
				html+='</p></td><td><p>';
				html+='<a class="explainbtn">活动说明</a>';
				if(data.lists[i].state!=-1&&data.lists[i].state!=-2&&data.other<Date.parse(new Date(data.lists[i].begindate))){
					html+='<a class="applications">申请参加</a>';
				};
				html+='</p></td></tr>';
			}else{
				//<!-data.lists[i].joinact_state--1审核不过  -2待参与  1待审核 2审核通过-->
				//<!data.lists[i].state--0全部 2没有开始 1正在进行中 -1已经过期 -->
				//活动状态 2没有开始 1正在进行中 -2 不可编辑 -1已经过期
				if(data.lists[i].joinact_state==1){
					html+="待审核";
					html+='</p></td><td><p>';
					html+='<a class="explainbtn">活动说明</a>';
					if(Date.parse(new Date(data.lists[i].begindate))-data.other>1800000){
						html+='<a class="cancel">取消参加</a>';
					};
					html+='</p></td></tr>';
				};
				if(data.lists[i].joinact_state==-2){
					html+="待参与";
					html+='</p></td><td><p>';
					html+='<a class="explainbtn">活动说明</a>';
					if(data.lists[i].state!=-1&&Date.parse(new Date(data.lists[i].begindate))-data.other>1800000){
						html+='<a class="applications">申请参加</a>';
					};
					html+='</p></td></tr>';
				};
				if(data.lists[i].joinact_state==-1){
					html+="审核未通过";
					html+='</p></td><td><p>';
					html+='<a class="explainbtn">活动说明</a>';
					html+='</p></td></tr>';
				};
				if(data.lists[i].joinact_state==2){
					html+="审核通过";
					html+='</p></td><td><p>';
					html+='<a class="explainbtn">活动说明</a>';
					if(data.lists[i].state!=-1&&data.lists[i].state!=-2&&Date.parse(new Date(data.lists[i].begindate))-data.other>1800000){
						html+='<a class="cancel">取消参加</a><a href="editprice.html?i='+data.lists[i].activityid+'">编辑商品</a>';
					};
					html+='</p></td></tr>';
				};
				if(data.lists[i].joinact_state==-6){
					html+="已取消";
					html+='</p></td><td><p>';
					html+='<a class="explainbtn">活动说明</a>';
					if(data.lists[i].state!=-1&&Date.parse(new Date(data.lists[i].begindate))-data.other>1800000){
						html+='<a class="applications">申请参加</a>';
					};
					html+='</p></td></tr>';
				};
			};
			
		};
		$("#mytbody").append(html);
		$(".explainbtn").click(function(){
			var actid=$(this).parent("p").parent("td").parent("tr").attr("name");
			$.ajax({
				type:"get",
				url:url+"/cli/SA/getInfo/"+actid+"?token="+token+"&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					gadget_login(data);
					if(data.code==1){
						$("#ainbox h5").html(data.pojo.simpledesc);
						if(data.pojo.centent==""||data.pojo.centent==null){
							data.pojo.centent="暂无说明";
						};
						$("#ainbox p").html(data.pojo.centent);
						$("#explain").show();
					}else{
						gadget_popupt("暂无活动说明");
					}
				},
				error:function(){
					gadget_popupt("获取失败，请刷新重试");
				}
			});
			
		});
		$(".applications").click(function(){
			var actid=$(this).parent("p").parent("td").parent("tr").attr("name");
			var obj=$(this).parent("p").parent("td").parent("tr");
			$.ajax({
				type:"post",
				url:url+"/cli/suJoinAct/insertAct?token="+token+"&actId="+actid+"&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					gadget_login(data);
					if(data.code==1){
						gadget_popups("已提交申请，请耐心等待审核");
						obj.remove();
					}else{
						gadget_popups("提交申请失败");
					}
				},
				error:function(){
					gadget_popups("提交申请失败，请刷新重试");
				}
			});
		});
		$(".cancel").click(function(){
			$("#explains").show();
			var actid=$(this).parent("p").parent("td").parent("tr").attr("name");
			$("#mybtn").attr("name",actid)
			
		});
	};
	$("#mybtn").click(function(){
		var refuseReason=$("#exp textarea").val();
		var actId=$(this).attr("name");
		if(refuseReason==""||refuseReason==null){
			gadget_popupt("请填写取消理由");
			return false;
		};
		$.ajax({
				type:"post",
				url:url+"/cli/suJoinAct/editAct?token="+token+"&refuseReason="+refuseReason+"&actId="+actId+"&joinactState=-6&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					gadget_login(data);
					if(data.code==1){
						gadget_popups("已取消参加");
						setTimeout(gadget_relo,3000);
					}else{
						gadget_popups("取消失败，请重试");
					};
				},
				error:function(){
					gadget_popups("取消失败，请刷新重试");
				}
			});
	})
	
})
