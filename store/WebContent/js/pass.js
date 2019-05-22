$(function(){
	jQuery.support.cors = true;
	$.cookie("people","0",{path:"/"});
	$("#myfort").blur(function(){
		if($("#myfort").val() && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test($("#myfort").val())){
			$(".icencwpan").eq(0).hide();
		}else{
			$(".icencwpan").eq(0).show()
			return false;
		};
		
	})
	$("#myfotr").blur(function(){
		if($("#myfotr").val() && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test($("#myfotr").val())){
				$(".icencwpan").eq(1).hide();
			}else{
				$(".icencwpan").eq(1).show();
				return false;
			};
	})
	
	
	$("#mysubmit").click(function(){
		
		if($("#myfort").val() && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test($("#myfort").val())){
			$(".icencwpan").eq(0).hide();
		}else{
			$(".icencwpan").eq(0).show()
			return false;
		};
		if($("#myfotr").val() && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test($("#myfotr").val())){
				$(".icencwpan").eq(1).hide();
			}else{
				$(".icencwpan").eq(1).show();
				return false;
			};
		
		if($("#myfort").val()==""){
			$(".icencwpan").eq(0).show()
			return false;
		}else{
			$(".icencwpan").eq(0).hide()
		};
		if($("#myfotne").val()!=$("#myfotr").val()){
			$(".icencwpan").eq(2).show()
			return false;
		}else{
			$(".icencwpan").eq(2).hide()
		};
		if($("#myfotne").val()==""||$("#myfotr").val()==""){
			$(".icencwpan").eq(1).show()
		}else{
			$(".icencwpan").eq(1).hide()
		};
		
		var oldpwds=hex_md5($("#myfort").val());
		var newpwds=hex_md5($("#myfotne").val());
		var tokens=$.cookie('peoplemessage');
		var userids=$.cookie('peopleus');
		//hash = hex_md5(regmv);
		//alert(tokens)
	var callbackpass=function(){
		$("#gadget_popupo").remove();
	$.ajax({
		type: "POST",
		url:url+"/cli/endUser/userUpdatePwd?token="+tokens+"&oldPwd="+oldpwds+"&newPwd="+newpwds+"&userid="+userids+"&mintime="+new Date().getTime(),
		dataType:"json",
		success: function(data){
			gadget_login(data);
			if(data.code==1){
				$.cookie("people","1",{path:"/"});
				$(".bodybig").show();
				$(".isgood").click(function(){
					$(".bodybig").hide();
					window.location.href="../login.html";
				})
			}else{
				gadget_popupt(data.message)
			}
		},
		error:function(){
			gadget_popupt("提交失败")
		}
	});
	}
	gadget_popupfsev("确定修改密码",function(){
			$("#gadget_popupo").remove();
		},callbackpass);
	})
})
