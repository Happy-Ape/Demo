$(function(){
	jQuery.support.cors = true;
	var phonenum=$.cookie('peoplephonenum');
	var otype=$.cookie('peopletype');
	$("#isphnum").html(phonenum)
	var meage="";
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
			}
	$("#mybutton").click(function(){
		$(this).attr("disabled","disabled");
		outtime();
		$.ajax({
			type:"GET",
			url:url+"/cli/getMessageCodeForForget/"+phonenum+"/5?mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				//alert(data.message)
				//{"code":2,"lists":null,"message":"5387","pojo":null}
				if(data.code==-1){
					gadget_popupt(data.message)
				}else{
					$("#ismysp").click(function(){
						var ismynum=$("#isform .ismynum").val();
						if(ismynum==""||ismynum==null){
							return false;
						};
						$.ajax({
							type:"get",
							url:url+"/cli/checkCallAndCode/"+phonenum+"/"+ismynum+"?mintime="+new Date().getTime(),
							dataType:"json",
							success:function(data){
								gadget_login(data);
								if(data.code==1){
									$(".oldist").hide(300);
									$(".tiaophon").show(300);
									$(".istiaozi").css("width","66%");
									$(".istihez").css("left","458px")
								}else{
									gadget_popupt("输入错误");
								};
							},
							error:function(){
							
							}
						});
					});
				};
				
				
			/*	if(data.message.length>2){
					meage=data.message;
					$("#ismysp").click(function(){
					var ismynum=$("#isform .ismynum").val();
					if(ismynum==meage){
							$(".oldist").hide(300);
							$(".tiaophon").show(300);
							$(".istiaozi").css("width","66%");
							$(".istihez").css("left","458px")
						}else{
							alert("输入错误");
						}
		
					});
				}else{
					alert("获取失败")
				}*/
			},
			error:function(){
				gadget_popupt("获取失败a")
			}
		});
	})
	
	
	//下一步o
	$("#ismyphon").blur(function(){
		if($(this).val().length!=11){
			$(".isobpho").eq(0).show();
			return false;
		}else{
			$(".isobpho").eq(0).hide();
			var phon=$(this).val();
			
			$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/checkCall",
			data:{type:otype,call:phon,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("手机号可用");
					$("#ismysptw").click(function(){
						if($("#ismyph").val()!=$("#ismyphon").val()){
							$(".isobpho").eq(1).show();
							return false;
						}else{
							$(".isobpho").eq(1).hide();
							var myph=$("#ismyph").val();
							var token=$.cookie('peoplemessage');
							$.ajax({
								type:"GET",
								url:url+"/cli/sellUser/updateCall/"+myph+"?token="+token+"&mintime="+new Date().getTime(),
								dataType:"json",
								success:function(data){
									gadget_login(data);
									if(data.code==1){
										$(".tiaophon").hide(300);
										$(".tiaonic").show(300);
										$(".istiaozi").css("width","100%");
										$(".istihez").css("left","703px")
									}else{
										gadget_popupt("提交失败.")
									}
								},
								error:function(){
									gadget_popupt("提交失败")
								}
							});
						}
					})
				}else{
					gadget_popupt("手机号不可用");
					$(".isobpho").eq(0).show();
				}
			},
			error:function(){
				
			}
		});
		}
		
	})
	
	/*$("#ismysptw").click(function(){
	
		$(".tiaophon").hide(300);
		$(".tiaonic").show(300);
		$(".istiaozi").css("width","100%");
		$(".istihez").css("left","703px")
	})*/
})
