$(function(){
	jQuery.support.cors = true;
	$("#isform input[name='endpass']").blur(function(){
		if($(this).val() && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test($(this).val())){
			$(".ispaspn").eq(0).hide();
		}else{
			$(".ispaspn").eq(0).show();
		};
	});
	$("#isform input[name='pass']").blur(function(){
		if($(this).val() && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test($(this).val())){
			$(".ispaspn").eq(1).hide();
		}else{
			$(".ispaspn").eq(1).show();
		};
	});
	$("#isform input[name='isnewpass']").blur(function(){
		if($(this).val()==$("#isform input[name='pass']").val()){
			$(".ispaspn").eq(2).hide();
		}else{
			$(".ispaspn").eq(2).show();
		};
	});
	
	
	$("#gpaget").click(function(){
		var token=$.cookie('peoplemessage');
		var passwordt=$("#isform input[name='endpass']").val();
		var newpasswordt=$("#isform input[name='pass']").val();
		var isnewpass=$("#isform input[name='isnewpass']").val();
		if(passwordt && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(passwordt)){
			$(".ispaspn").eq(0).hide();
		}else{
			$(".ispaspn").eq(0).show();
			return false;
		};
		if(newpasswordt && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(newpasswordt)){
			$(".ispaspn").eq(1).hide();
		}else{
			$(".ispaspn").eq(1).show();
			return false;
		};
		if(isnewpass==newpasswordt){
			$(".ispaspn").eq(2).hide();
		}else{
			$(".ispaspn").eq(2).show();
			return false;
		};
		var pass=hex_md5(passwordt);
		var newpass=hex_md5(newpasswordt);
		
		var callbackpass=function(){
			$("#gadget_popupo").remove();
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/userUpdatePwd/"+pass+"/"+newpass+"?token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$.cookie("people","1",{path:"/"});
					gadget_popupf("密码更改成功，请重新登录","../login.html");
				}else{
					gadget_popups("更改失败"+data.message);
				};
			},
			error:function(){
				gadget_popups("更改失败.");
			}
		});
		}
		gadget_popupfsev("确定修改密码",function(){
			$("#gadget_popupo").remove();
		},callbackpass);
	})
})
