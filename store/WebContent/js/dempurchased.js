$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	var type=getUrlParamo("type");
	if(type==null||type==""||type!=2){
		type=1;
		$("#munumer").html("求购数量");
	}else{
		$("#munumer").html("供应数量");
	};
	if(type==1){
		$(".mylisp span").eq(0).addClass("mylisspan");
	}else{
		$(".mylisp span").eq(1).addClass("mylisspan");
	};
		lisone();
	//下一页
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		lisone();
	});
	//上一页
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		lisone();
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
		lisone();
	});
	function lisone(){
		
		gadget_back("加载中...");
		$("#tbodys tr").remove();
		$.ajax({
			type:"get",
			url:url+"/cli/userneed/getallMyPay/"+open+"/"+str+"/"+type+"?token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_back_remove()
				if(data.code==1){
					gadget_m_remv($("#tablis"))
					$(".cmaisp").show();
					tyonelis(data);
					var st="";
					st=Number(data.message)/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html(open);
				}else{
					gadget_back_remove();
					gadget_err_m('暂无列表，<a href="../demandmarket.html">去需求市场看看</a>',$("#tablis"),"100px");
					$(".cmaisp").hide();
				};
			},
			error:function(){
				gadget_back_remove();
				gadget_err_m("网络错误，请刷新重试",$("#tablis"),"100px");
				$(".cmaisp").hide();
			}
		});
	};
	
	function tyonelis(data){
		console.log(data)
		var html='';
					for(var i=0;i<data.lists.length;i++){
						if(type==1){
						html+='<tr><td><a href="../detailswanted.html?name='+encodeURI(data.lists[i].drugName)+'&need='+data.lists[i].userNeedId+'&user='+data.lists[i].userId+'">';
						}else{
						html+='<tr><td><a href="../buydetails.html?name='+encodeURI(data.lists[i].drugName)+'&need='+data.lists[i].userNeedId+'&user='+data.lists[i].userId+'">';
						};
						html+=data.lists[i].drugName;
						html+='</a></td><td>';
						html+=data.lists[i].number;
						html+='</td><td>';
						html+=data.lists[i].drugSpecifications;
						html+='</td><td>';
						var createDate=data.lists[i].createDate.split(" ");
						html+=createDate[0];
						html+='</td><td>';
						//状态，-2 审核失败 -1下架 0待审核 1正常
						if(data.lists[i].needState==-2){
							html+='审核失败';
						}else if(data.lists[i].needState==-1){
							html+='下架';
						}else if(data.lists[i].needState==0){
							html+='待审核';
						}else{
							html+='正常';
						};
						html+='</td><td>';
						html+=data.lists[i].userName;
						html+='</td><td>';
						html+=data.lists[i].userContact;
						html+='</td></tr>';
					};
					$("#tbodys").append(html);
	}
})
