$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var phonenum=$.cookie('peoplephonenum');
	var peopletype=$.cookie('peopletype');
	var obnick=0;
	var call=0;
	$("#phonenum").html(phonenum);
	
	$("#mysubmit").click(function(){
		
	});
	function outtime(){
		
		var otim=361;
		function time(){
			if(otim==1){
				$("#mybutton").removeAttr("disabled");
				$("#mybutton").val("获取验证码");
				clearInterval(timeo);
				return false;
			};
			otim=otim-1
			$("#mybutton").val(otim+"S后重试");
		};
		var timeo=setInterval(time,1000);
	};
	$("#mybutton").click(function(){
		$("#mybutton").attr("disabled","disabled")
		
		$.ajax({
			type:"get",
			url:url+"/cli/getMessageCodeForForget/"+phonenum+"/1?mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==-1){
					gadget_popupt(data.message);
				}else{
					outtime();
					$(".icenpha").eq(0).click(function(){
						var ismynum=$("#mytelnum").val();
						if(ismynum==""||ismynum==null){
							gadget_popupt("请填写验证码");
							return false;
						};
						
						$.ajax({
							type:"get",
							url:url+"/cli/checkCallAndCode/"+phonenum+"/"+ismynum+"?mintime="+new Date().getTime(),
							dataType:"json",
							success:function(data){
								gadget_login(data);
								if(data.code==1){
									$(".mytelp").eq(0).hide();
									$(".icenphonet").hide();
									$(".icenphtw").show();
									$(".icenphonetop").eq(1).addClass("icenpht");
									blphone();
								}else{
									$(".mytelp").eq(0).show();
								}
							},
							error:function(){
								
							}
						});
					});
					
					/*var message=data.message;
					console.log(message+"message");
					$(".icenpha").eq(0).click(function(){
						if(message==$("#mytelnum").val()){
							$(".mytelp").eq(0).hide();
							$(".icenphonet").hide();
							$(".icenphtw").show();
							$(".icenphonetop").eq(1).addClass("icenpht");
							blphone();
						}else{
							$(".mytelp").eq(0).show();
							
						};
						
					});*/
				};
			},
			error:function(){
				
			}
		});
	});
	
	//^1(3|4|5|7|8)\d{9}$
	///cli/sellUser/checkCall?call=?&type=?
	function blphone(){
	$("#icenorphone").blur(function(){
		var phone=$(this).val();
		 if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        	$(".iceninspan").eq(0).show();
       		return false;
    	}else{
    		$(".iceninspan").eq(0).hide();
    		$("#iceninphone").blur(function(){
    			if($(this).val()==phone){
    				call=$(this).val();
    				$.ajax({
						type:"get",
						url:url+"/cli/sellUser/checkCall",
						data:{call:call,type:peopletype,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code!=1){
								$(".iceninspan").eq(1).html("手机号已被占用！");
								$(".iceninspan").eq(1).show();
								return false;
							}else{
								$(".iceninspan").eq(1).hide();
								$("#myisbutton").show();
								obnick=1;
							};
						},
						error:function(){
				
						}
					});
    			}else{
    				$(".iceninspan").eq(1).html("两次输入的手机号不同！");
    				$(".iceninspan").eq(1).show();
    			};
			});
    	};
	});
	$("#myisbutton").click(function() {
		if(obnick!=1){
			return false;
		};
	$.ajax({
		type: "get",
		url:url+"/cli/getMessageCode/"+call+"?mintime="+new Date().getTime(),
		dataType: "json",
		success: function(data) {
			gadget_login(data);
			if(data.code == -1) {
				gadget_popupt("验证码发送失败，请稍后重试");
			} else {
				//console.log(data.message + "messagemessage");
			//	alert(data.message);
				$("#mysubmit").click(function() {
					if(data.message != $("#mytelage").val()) {
						$(".iceninspan").eq(2).show();
						return false;
					} else {
						$(".iceninspan").eq(2).hide();
						$.ajax({
							type: "post",
							url:url+"/cli/endUser/update?token="+token+"&endphonenum="+call+"&mintime="+new Date().getTime(),
							dataType: "json",
							success: function(data) {
								gadget_login(data);
								if(data.code == 1) {
									
									//gadget_popupt("更改成功,请重新登录");
									$(".icenphonet").hide();
									$(".icenphtw").hide();
									$(".icennice").show();
									$(".icenphonetop").eq(2).addClass("icenpht");
									$.cookie("people", "1", {path: "/zhaoy/zhaoyaoba"});
								//window.location.href = "../login.html";
									gadget_popupf("更改成功,请重新登录","../login.html");
								}else{
									gadget_popupt("更改失败"+data.message);
								}
							},
							error: function() {
									gadget_popupt("网络错误，请重试");
							}
						});
					};

				});
			};
		},
		error: function() {
				gadget_popupt("网络错误，请重试");
		}
	});
});
};
	
})
