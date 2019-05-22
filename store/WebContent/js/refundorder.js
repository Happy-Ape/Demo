$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	getlis();
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		getlis();
	});
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		getlis();
	});
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
		getlis();
	});
	
	
	
	function getlis(){
	$('html,body').animate({scrollTop:$("body").offset().top}, 500);
	remlis(2)
	gadget_err_m("请稍等...",$("#orrdmore"),0,ut+"/imgeas/serch.gif")
	$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/-5/"+open+"/"+str+"/0/0?token="+token+"&isRefound=1&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data)
			gadget_m_remv($("#orrdmore"))
			if(data.code==1){
				refundlis(data);
			}else{
				remlis(1)
				gadget_err_m("没有数据",$("#orrdmore"),0)
			};
		},
		error:function(){
			remlis(1)
			gadget_m_remv($("#orrdmore"));
		}
	});
	}
	function remlis(bg){
		switch (bg){
			case 1:
				$(".orrdmin").remove();
				$(".cmaisp").hide();
				break;
			case 2:
				$(".orrdmin").remove();
				$(".cmaisp").show();
				break;
			}
	};
	function refundlis(data){
		var html='';
		for(var i=0;i<data.lists.length;i++){
		html+='<div class="orrdmin"><p class="orrdminp"><span>关联订单：<a class="order_a" href="order.html?number='+retcode(data.lists[i].ordercode)+'">';
		
		html+=retcode(data.lists[i].ordercode);
		html+='</a></span><span>退款单号：';
		html+=data.lists[i].ordercode;
		html+='</span></p><div class="orrdminri"><p class="minp">';
		if(data.lists[i].details[0].isaftersale == -1) {
			html += '已申请退货';
		};
		if(data.lists[i].details[0].isaftersale == 1) {
			if(data.lists[i].isbalance==1){
				html += '同意退货,退款成功';
			}else{
				html += '同意退货,退款中';
			};
		};
		if(data.lists[i].details[0].isaftersale == -2) {
			html += '拒绝退货';
		};
		html+='</p><p><a class="look" data_a="'+data.lists[i].orderid+'">';
		html+='退款详情';
		html+='</a></p></div><div class="orrdminv"><div class="orrdmino"><div class="orrdimg"><img src="';
		html+=data.lists[i].details[0].imagePath;
		html+='" /></div><div class="orrdp"><p>';
		html+=data.lists[i].details[0].drugname;
		html+='</p><p><a style="color: red;">退款金额：';
		html+=data.lists[i].details[0].totalfee;
		html+='元</a></p></div></div><div class="orrdmint"><p>';
		html+=data.lists[i].details[0].price;
		html+='</p></div><div class="orrdmins"><p>';
		html+=data.lists[i].details[0].num;
		html+='</p></div><div class="orrdminf"><p>';
		html+=data.lists[i].details[0].actcontent;;
		html+='</p></div></div></div>';
		};
		$("#orrdmore").append(html);
		var st="";
			st=data.message/str;
			n = st.toString();
			var arr=n.split(".");
			if(arr[1]>0){
				st=parseInt(arr[0])+1;
			};
			$("#ismyipik").html(st);
			$("#isdangq").html(open);
		$(".look").click(function(){
			var order_id=$(this).attr("data_a");
			$.ajax({
				type:"get",
				url:url+"/cli/order/getDetail/"+order_id+"?token="+token+"&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					if(data.code==1){
						var txtb='<table cellpadding="0" cellspacing="0" border="0"><tbody id="mybo_or">';
						txtb+='<tr><td class="mybo_or_a">退款单号：</td><td class="mybo_or_b">'+data.pojo.ordercode+'</td></tr>';
						txtb+='<tr><td class="mybo_or_a">关联订单：</td><td class="mybo_or_b"><a target="_blank" href="order.html?number='+retcode(data.pojo.ordercode)+'">'+retcode(data.pojo.ordercode)+'</a></td></tr>';
						txtb+='<tr><td class="mybo_or_a">退款金额：</td><td class="mybo_or_b">'+data.pojo.details[0].totalfee+'元</td></tr>';
						txtb+='<tr><td class="mybo_or_a">通过时间：</td><td class="mybo_or_b">'+data.pojo.createtime+'</td></tr>';
						txtb+='<tr><td class="mybo_or_a">退款状态：</td><td class="mybo_or_b">';
						if(data.pojo.isbalance==1){
							txtb+='退款成功';
						}else{
							txtb+='退款中';
						};
						txtb+='</td></tr>';
						if(data.pojo.isbalance==1){
							txtb+='<tr><td class="mybo_or_a">完成时间：</td><td class="mybo_or_b">'+data.pojo.balancetime+'</td></tr>';
						};
						txtb+='</tbody></table>';
						gadget_popup_c("退款详情",["确定"],txtb)
					}else{
						gadget_popupt("暂无详细信息");
					}
				},
				error:function(){
					gadget_popupt("网络错误请刷新重试");
				}
			});
		});
	};
	function retcode(datacode){
		var datacode=datacode.split("_");
		return datacode[0];
	}
})
