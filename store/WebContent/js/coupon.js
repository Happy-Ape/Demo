$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	
	var open=1;
	var str=12;
	var stae=2;
	onelis(stae);
	function onelis(stae){
		gadget_m_remv($(".icenbant"));
		$(".cmaisp").show();
		$.ajax({
		type:"get",
		url:url+"/cli/EC/getMyTypeCoupons/"+stae+"/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				quanlis(data);
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
				//.icenbant
				gadget_err_m("暂无数据",$(".icenbant"),"100px");
				$(".cmaisp").hide();
			};
		},
		error:function(){
			gadget_err_m("网络错误，请重试",$(".icenbant"),"100px");
			$(".cmaisp").hide();
		}
	});
	};
	$(".icejfcx span").click(function(){
		$(this).addClass("icejfbck");
		$(this).siblings("span").removeClass("icejfbck");
		open=1;
		if($(this).index()==0){
			stae=2;
			onelis(stae);
		};
		if($(this).index()==1){
			stae=0;
			onelis(stae);
		};
		if($(this).index()==2){
			stae=1;
			onelis(stae);
		};
		if($(this).index()==3){
			stae=-1;
			onelis(stae);
		};
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
			url:url+"/cli/EC/getMyTypeCoupons/"+stae+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					quanlis(data);
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
			url:url+"/cli/EC/getMyTypeCoupons/"+stae+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					quanlis(data);
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
			url:url+"/cli/EC/getMyTypeCoupons/"+stae+"/"+open+"/"+str,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					quanlis(data);
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
	function quanlis(data){
		$(".icenbant .icnquan").remove();
				var html="";
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="icnquan"><p class="mystore">店铺：<a href="';
					html+='../shopdetails.html?us='+data.lists[i].selluserid;
					html+='">';
					html+=data.lists[i].sellerName;
					html+='</a></p><div class="icnquanl"><h5>￥';
					if(data.lists[i].type==1){
						//满减
						var contents=data.lists[i].content.split("-");
						html+=contents[1];
						html+='</h5>';
						html+='<p>满￥<span>';
						html+=contents[0];
						html+='</span>可用</p>';
						
					};
					if(data.lists[i].type==2){
						//免运费
						html+='免运费</h5>';
						html+='<p>满￥<span>0</span>可用</p>';
					};
					
					html+='</div><div class="icnquanr"><div class="icnquanrt"><p>到期时间</p><p>';
					html+=data.lists[i].enddate;
					html+='</p></div><div class="icnquanrb"><p>';
					if(data.lists[i].state==0){
						html+='未使用';
					};
					if(data.lists[i].state==-1){
						html+='已过期';
					};
					if(data.lists[i].state==1){
						html+='已使用';
					};
					html+='</p></div></div></div>';
				};
				$(".icejfcx").after(html);
	}
	
	
})
