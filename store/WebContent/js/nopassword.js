$(function(){
	
	jQuery.support.cors = true;
	var Type=0;
	/*$("#mytop span").click(function(){
		if($(this).index()==1){
			Type=5;
		}else{
			Type=1;
		};
		$(this).addClass("typ");
		$(this).siblings("span").removeClass("typ");
	});*/
	$("#mytop input").click(function(){
		Type=$(this).val();
	});
	$("#upcode").click(function(){
		var uptype=Type;
		var myphone=$("#myphone").val();
		if(myphone.length>11||myphone==""){
			gadget_popupt("请输入正确的手机号");
			return false;
		};
		if(Type!=1&&Type!=5){
			gadget_popupt("请选择正确的用户类型");
			return false;
		};
		
		$("#uptime").show();
		$(this).hide();
		outtime();
		$("#mybtn").unbind("click");
		
		$.ajax({
			type:"get",
			url:url+"/cli/getMessageCodeForForget/"+myphone+"/"+Type+"?mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==-1){
					gadget_popupt(data.message);
				}else{
					$(".typ").siblings("span").hide();
					$("#myphone").attr("disabled","disabled");
					$("#mybtn").click(function(){
						//gadget_popupt(myphone);
						var mycode=$("#mycode").val();
						if(mycode==""||mycode==null){
							return false;
						};
						$.ajax({
							type:"get",
							url:url+"/cli/checkCallAndCode/"+myphone+"/"+mycode+"?mintime="+new Date().getTime(),
							dataType:"json",
							success:function(data){
								gadget_login(data);
								newpas=myphone+","+mycode
								newpas=hex_md5(newpas);
								if(data.code==1){
									$("#myfo").hide();
									$("#myfot").show();
									// /cli/user/newPwd/{type}/{call}
									$("#mybon").click(function(){
										var pwd=$("#pwd").val();
										if(pwd==""||pwd==null){
											gadget_popupt("请输入正确的密码");
											return false;
										};
										if(pwd && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(pwd)){
											
										}else{
											gadget_popupt("请输入正确的密码");
											return false;
										};
										var nowPwd=$("#newpwd").val();
										if(nowPwd!=pwd){
											gadget_popupt("两次输入的密码不一致")
											return false;
										};
										nowPwd=hex_md5(nowPwd);
										console.log(nowPwd+"nowPwd");
										console.log(newpas+"newpas");
										$.ajax({
											type:"get",
											url:url+"/cli/user/newPwd/"+uptype+"/"+myphone,
											data:{codepass:newpas,nowPwd:nowPwd,mintime:new Date().getTime()},
											dataType:"json",
											success:function(data){
												gadget_login(data);
												//alert(data.code)
												if(data.code==1){
													gadget_popupt("更改成功");
													window.location.href="login.html";
												}else{
													gadget_popupt("更改失败,请重试");
												};
											},
											error:function(){
												gadget_popupt("更改失败，请刷新重试")
											}
										});
									});
								};
							},
							error:function(){
								
							}
						});
					});
				};
			},
			error:function(){
				gadget_popupt("获取验证码失败，请刷新重试");
			}
		});
		
	});
	function outtime(){
				var otim=361;
				function time(){
					if(otim==1){
						$("#upcode").show();
						$("#uptime").hide();
						clearInterval(timeo);
					};
					otim=otim-1
					$("#uptime").html(otim+"S后重试");
				};
				var timeo=setInterval(time,1000);
			}
	
})
