$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var key="";
	var pagesize="12";
	var Type="0";
	var State="0";
	var open=1;
	//
	
	//
	$("#sello").click(function(){
		$(this).attr("checked","checked");
		$("#sellt").removeAttr("checked")
		$(".buyselltp").hide();
		$(".buyselltp input").val("");
	});
	$("#sellt").click(function(){
		$(this).attr("checked","checked");
		$("#sello").removeAttr("checked")
		$(".buyselltp").show();
	});
	$("#buyxx").click(function(){
		$("#buybigd").hide();
		
	});
	$(".isbuyp span").click(function(){
		$("#buybigd").show();
	});
	//显示
	$.ajax({
		type:"GET",
		url:url+"/cli/coupons/getAllMyCoupons/"+Type+"/"+State+"/1/"+pagesize,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				resbuy(data);
				var st="";
					st=data.message/pagesize;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				gadget_err_m("暂无数据",$("#isbuy"));
				$(".cmaisp").hide();
			};
		},
		error:function(){
			gadget_err_m("网络错误，请刷新重试",$("#isbuy"));
			$(".cmaisp").hide();
		}
	});
	//搜索
	$("#isbtn").click(function(){
		Type=$("#Type").val();
		State=$("#State").val();
		console.log(Type)
		console.log(State)
		$.ajax({
		type:"GET",
		url:url+"/cli/coupons/getAllMyCoupons/"+Type+"/"+State+"/1/"+pagesize,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.code==1){
				gadget_login(data);
				resbuy(data);
				var st="";
					st=data.message/pagesize;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				gadget_popupt("搜索失败");
			};
		},
		error:function(){
			
		}
	});
	});
	//下一页
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",// /cli/sellDrug/getQuaryDrugs/{cateid}/0/1/{nowPage}/{pageSize}?token=?&key=?
			url:url+"/cli/coupons/getAllMyCoupons/"+Type+"/"+State+"/"+open+"/"+pagesize,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resbuy(data);
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
			url:url+"/cli/coupons/getAllMyCoupons/"+Type+"/"+State+"/"+open+"/"+pagesize,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resbuy(data);
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
			url:url+"/cli/coupons/getAllMyCoupons/"+Type+"/"+State+"/"+open+"/"+pagesize,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resbuy(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	})
	// -------
	function resbuy(data){
				$(".isbuyhz").remove();
				$(".isbuyhom").remove();
				var html='';
				var begindate=[];
				var enddate=[];
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="';
					if(data.lists[i].ogistate==-1){
						html+="isbuyhom";
					}else{
						html+="isbuyhz";
					};
					
					html+='" title="';
					html+=data.lists[i].simpledesc;
					html+='"><div class="isbuyhfive"><h5>';
					if(data.lists[i].content==0){
						html+='免运费';
						html+='</h5></div><div class="isbuyhp"><h5>';
						html+='任意金额可用';
					}else{
						var arr=data.lists[i].content.split("-");
						html+='￥';
						html+=arr[1];
						html+='</h5></div><div class="isbuyhp"><h5>满';
						html+=arr[0];
						html+='可用';
					};
					html+='</h5><p>有效时间</p><p>';
					begindate=data.lists[i].begindate.split(" ");
					enddate=data.lists[i].enddate.split(" ");
					html+=begindate[0];
					html+='至';
					html+=enddate[0];
					html+='</p><p>类型：';
					if(data.lists[i].type==1){
						html+='满减';
					}else{
						html+='免运费';
					}
					
					html+='</p><p>剩余张数：';
					html+=data.lists[i].limitcount
					html+='张</p></div></div>';
				};
				$("#isbuy").append(html);
			
	}
	//发布优惠券
	$("#ismybtn").click(function(){
		if($("#ismyform input[name='limitcount']").val()==""){
			$(".forp").eq(0).show();
			return false;
		}else{
			$(".forp").eq(0).hide();
		};
		if($("#sellt").attr("checked")=="checked"){
			if($("#ismyform input[name='content']").val()==""){
				$(".forp").eq(1).show();
				return false;
			}else{
				$(".forp").eq(1).hide();
			};
			if($("#ismyform input[name='conten']").val()==""){
				$(".forp").eq(1).show();
				return false;
			}else{
				$(".forp").eq(1).hide();
			};
		};
		if($("#begindate").val()==""){
			$(".forp").eq(2).show();
			return false;
		}else{
			$(".forp").eq(2).hide();
		};
		if($("#enddate").val()==""){
			$(".forp").eq(2).show();
			return false;
		}else{
			$(".forp").eq(2).hide();
		};
		if($("#ismyform input[type='text']").val().length>10){
			$(".forp").eq(3).show();
			return false;
		}else{
			$(".forp").eq(3).hide();
		}
		var begindate=$("#begindate").val();
		var enddate=$("#enddate").val();
		var limitcount=$("#ismyform input[name='limitcount']").val();
		var type=$("#ismyform input[checked='checked']").val();
		var content=$("#ismyform input[name='content']").val()+"-"+$("#ismyform input[name='conten']").val();
		var simpledesc=$("#ismyform input[name='simpledesc']").val();
		if(type==2){
			content=0
		};
		
		var dat=begindate.split("-");
		dat=dat[0]+dat[1]+dat[2];
		var mydate = new Date();
		var dt="";
		dt+=mydate.getFullYear(); //获取完整的年份(4位,1970-????)
		var tfdate=mydate.getMonth()+1
		if(tfdate<10){
			tfdate="0"+tfdate
		};
		dt+=tfdate; //获取当前月份(0-11,0代表1月)
		var datte="";
		datte=mydate.getDate();
		//alert(datte.length)
		if(datte<10){
			dt+="0"+mydate.getDate();
		}else{
			dt+=mydate.getDate(); //获取当前日(1-31)
		};
		
		if(dat<dt){
			gadget_popupt("开始日期不能小于当前日期");
			return false;
		};
		var enddt=enddate.split("-");
		enddt=enddt[0]+enddt[1]+enddt[2];
		if(enddt<=dat){
			gadget_popupt("结束时间必须大于开始时间")
			return false;
		};
		begindate=begindate+" 00:00:00";
		enddate=enddate+" 23:59:59";
		begindate=encodeURI(begindate);
		enddate=encodeURI(enddate);
		limitcount=encodeURI(limitcount);
		content=encodeURI(content);
		simpledesc=encodeURI(simpledesc);
		$.ajax({
			type:"POST",
			url:url+"/cli/coupons/saveCoupons?token="+token+"&begindate="+begindate+"&enddate="+enddate+"&limitcount="+limitcount+"&type="+type+"&content="+content+"&simpledesc="+simpledesc+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("提交成功");
					setTimeout(gadget_relo,3000);
				}
			},
			error:function(){
				gadget_popupt("提交失败")
			}
		});
	});
	
})
