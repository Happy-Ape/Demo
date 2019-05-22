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
	$("#formorlist .forminlist").remove();
	gadget_err_m("请稍等...",$("#formorlist"),0,ut+"/imgeas/serch.gif")
	$.ajax({
		type:"get",
		url:url+"/cli/order/getTypeOrders/-5/"+open+"/"+str+"/0/0?token="+token+"&isRefound=1&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data)
			gadget_m_remv($("#formorlist"))
			if(data.code==1){
				refundlis(data);
				remlis(2)
			}else{
				gadget_err_m("没有数据",$("#formorlist"),0);
				remlis(1)
			};
		},
		error:function(){
			remlis(1)
			gadget_m_remv($("#formorlist"));
		}
	});
};
function refundlis(data){
	var html='';
	for(var i=0;i<data.lists.length;i++){
	html+='<div class="forminlist"><h5>关联订单：<span>';
	html+=retcode(data.lists[i].ordercode);
	html+='</span>退款单号<span>';
	html+=data.lists[i].ordercode;
	html+='</span>退款状态<span>';
	if(data.lists[i].isbalance==1){
		html+='退款成功';
	}else{
		html+='退款中';
	};
	html+='</span><input type="button" value="退款详情" data_a="'+data.lists[i].orderid+'" class="lookbtn" name="mybtn"/></h5><div class="lismin">';
	html+='<table cellspacing="0" border="1"><thead><tr>';
	html+='<th class="lismtd">图片</th><th>商品</th><th class="lismtd">数量</th><th class="lismtd">价格</th>';
	html+='<th class="lismtd">退款金额</th><th>备注</th></tr></thead><tbody><tr><td class="lismtd">';
	html+='<img src="';
	html+=data.lists[i].details[0].imagePath;
	html+='"/></td><td>';
	html+=data.lists[i].details[0].drugname;
	html+='</td><td class="lismtd">';
	html+=data.lists[i].details[0].num;
	html+='</td><td class="lismtd">';
	html+=data.lists[i].details[0].price;
	html+='</td><td>';
	html+=data.lists[i].details[0].totalfee;
	html+='</td><td rowspan="9">';
	html+=data.lists[i].details[0].actcontent;
	html+='</td></tr></tbody></table></div></div>';
	};

	$("#formorlist").append(html);
	var st="";
			st=data.message/str;
			n = st.toString();
			var arr=n.split(".");
			if(arr[1]>0){
				st=parseInt(arr[0])+1;
			};
			$("#ismyipik").html(st);
			$("#isdangq").html(open);
	$(".lookbtn").click(function(){
		var order_id=$(this).attr("data_a");
			$.ajax({
				type:"get",
				url:url+"/cli/order/getDetail/"+order_id+"?token="+token+"&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					if(data.code==1){
						var txtb='<table cellpadding="0" cellspacing="0" border="0"><tbody id="mybo_or">';
						txtb+='<tr><td class="mybo_or_a">退款单号：</td><td class="mybo_or_b">'+data.pojo.ordercode+'</td></tr>';
						txtb+='<tr><td class="mybo_or_a">关联订单：</td><td class="mybo_or_b"><a target="_blank" href="wholeshop.html?code='+retcode(data.pojo.ordercode)+'">'+retcode(data.pojo.ordercode)+'</a></td></tr>';
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
function remlis(bg){
		switch (bg){
			case 1:
				$(".cmaisp").hide();
				break;
			case 2:
				$(".cmaisp").show();
				break;
			}
	};
})
