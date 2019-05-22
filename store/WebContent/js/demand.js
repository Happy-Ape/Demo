$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	function geturlname(name){
		var sear=window.location.search;
		if(sear==null||sear==""){
			sear="?type=1";
		};
		sear=sear.split(name);
		sear=sear[1].split("?");
		sear=sear[0].split("=")
		sear=sear[1];
		return sear;
	};
	var state=geturlname("type")
	if(state!=0&&state!=1&&state!=-1&&state!=-2){
		state=1;
	};
	if(state==1){
		$(".mylisp span").eq(0).addClass("mylisspan");
	};
	if(state==-1){
		$(".mylisp span").eq(1).addClass("mylisspan");
	};
	if(state==0){
		$(".mylisp span").eq(2).addClass("mylisspan");
	};
	if(state==-2){
		$(".mylisp span").eq(3).addClass("mylisspan");
	};
	$.ajax({
		type:"get",
		url:url+"/cli/userneed/getall/2/"+open+"/"+str+"/"+state+"/2?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				tbodyslis(data);
				var st="";
					st=Number(data.other)/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				errlis("暂无信息");
			};
		},
		error:function(){
			errlis("获取失败，请刷新重试");
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
			url:url+"/cli/userneed/getall/2/"+open+"/"+str+"/"+state+"/2?token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					tbodyslis(data);
					$("#isdangq").html(open)
				}else{
					errlis("暂无信息");
				}
			},
			error:function(){
				errlis("获取失败，请刷新重试");
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
			url:url+"/cli/userneed/getall/2/"+open+"/"+str+"/"+state+"/2?token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					tbodyslis(data);
					$("#isdangq").html(open);
				}else{
					errlis("暂无信息");
				}
			},
			error:function(){
					errlis("获取失败，请刷新重试");
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
			url:url+"/cli/userneed/getall/2/"+open+"/"+str+"/"+state+"/2?token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					tbodyslis(data);
					$("#isdangq").html(open)
				}else{
					errlis("暂无信息");
				};
			},
			error:function(){
					errlis("获取失败，请刷新重试");
			}
		});
	});	
	
	function errlis(errtxt){
		$("#tbodys tr").remove();
		$("#tbodybox img").attr("src","../imgeas/error.png");
		$("#tbodybox p").html(errtxt);
		$("#tbodybox").show();
		$(".cmaisp").hide();
	};
	function tbodyslis(data){
				$("#tbodys tr").remove();
				$("#tbodybox").hide();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<tr name="';
					html+=data.lists[i].userNeedId;
					html+='"><td class="listh"><a target="_blank" href="../buydetails.html?name='+encodeURI(data.lists[i].drugName)+'&need='+data.lists[i].userNeedId+'&user='+data.lists[i].userId+'">';
					html+=data.lists[i].drugName;
					html+='</a></td><td>';
					html+=data.lists[i].drugSpecifications;
					html+='</td><td>';
					html+=data.lists[i].number;
					html+='</td><td>';
					html+=data.lists[i].drugPrice;
					html+='</td><td>';
					html+=data.lists[i].createDate;
					html+='</td><td class="lisfh">';
					if(state==-2){
						html+=data.lists[i].handleResult;
					};
					html+='</td><td>';
					if(state==0){
						html+='<span class="removebtn">删除</span><a href="buydemand.html?type=';
						html+=data.lists[i].userNeedId;
						html+='"><span>修改</span></a>';
					};
					if(state==1){
						html+='<span class="offbtn">下架</span><span class="removebtn">删除</span><a href="buydemand.html?type=';
						html+=data.lists[i].userNeedId;
						html+='"><span>修改</span></a>';
					};
					if(state==-1){
						html+='<span class="onbtn">上架</span><span class="removebtn">删除</span><a href="buydemand.html?type=';
						html+=data.lists[i].userNeedId;
						html+='"><span>修改</span></a>';
					};
					if(state==-2){
						html+='<span class="removebtn">删除</span><a href="buydemand.html?type=';
						html+=data.lists[i].userNeedId;
						html+='"><span>修改</span></a>';
					};
					html+='</td></tr>';
				};
				$("#tbodys").append(html)
				$(".offbtn").click(function(){
					var obj=$(this).parent("td").parent("tr");
					var ulid=obj.attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/userneed/changestate/"+ulid+"/0?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								obj.remove();
								gadget_popupt("下架成功");
							}else{
								gadget_popupt("下架失败，"+data.message);
							};
						},
						error:function(){
							gadget_popupt("下架失败，请刷新重试");
						}
							
					});
					
				});
				$(".removebtn").click(function(){
					var obj=$(this).parent("td").parent("tr");
					var ulid=obj.attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/userneed/delete/"+ulid+"?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								obj.remove();
								gadget_popupt("删除成功");
							}else{
								gadget_popupt("删除失败",data.message);
							};
						},
						error:function(){
							gadget_popupt("删除失败，请刷新重试");
						}
					});
					
				});				
				$(".onbtn").click(function(){
					var obj=$(this).parent("td").parent("tr");
					var ulid=obj.attr("name");
					$.ajax({
						type:"get",
						url:url+"/cli/userneed/changestate/"+ulid+"/1?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								obj.remove();
								gadget_popupt("上架成功");
							}else{
								gadget_popupt("上架失败，"+data.message)
							};
						},
						error:function(){
							gadget_popupt("上架失败，请刷新重试");
						}
					});
				});				
				
	};
	
	
})
