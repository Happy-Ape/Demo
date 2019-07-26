$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	$.ajax({
		type:"GET",
		url:url+"/cli/sellUser/getStore",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				if(data.pojo.postage==null||data.pojo.postage==""){
					$(".ismybip").hide();
				};
				
				if(data.pojo.minshippingprice==""||data.pojo.minshippingprice==null){
					data.pojo.minshippingprice="0";
				};
			$(".ismybip").html("<span>当前邮费为："+data.pojo.postage+"元(满"+data.pojo.freeshippingprice+"包邮) 最低发货金额："+data.pojo.minshippingprice+"元</span>");
			};
			
		}
	});
	$("#isbutton").click(function(){
		var postage=$("#ismyform input[name='postage']").val();
		var shipping=$("#ismyform input[name='shipping']").val();
		var minimum=$("#ismyform input[name='minimum']").val();
		if(postage==""||postage==null){
			gadget_popupt("请设置邮费")
			return false;
		};
		if(shipping==""||shipping==null){
			gadget_popupt("请设置包邮价格")
			return false;
		};
		if(minimum==""||minimum==null){
			gadget_popupt("请设置最低发货金额")
			return false;
		};
		minimum=Number(minimum);
		$.ajax({
			type:"POST",
			url:url+"/cli/sellUser/updateStore?postage="+postage+"&freeshippingprice="+shipping+"&minshippingprice="+minimum+"&token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupfs("提交成功，是否返回个人中心",0,"shops.html","刷新","个人中心");
					
					
					/*gadget_popups("提交成功");
					setTimeout(gadget_relo,3000);*/
				}
			},
			error:function(){
				
			}
		});
		
		
	})
})
