$(function(){
	jQuery.support.cors = true;
	//192.168.
	footerlis();
	var referrer=document.referrer;
	if($.cookie("people")=="1"){
				$.cookie("peoplemessage","",{path:"/"});
				$.cookie("peoplecode","",{path:"/"});
				$.cookie("peoplephonenum","",{path:"/"});
				$.cookie("peoplesellername","",{path:"/"});
				$.cookie("peoplestate","",{path:"/"});
				$.cookie("peoplecompanyname","",{path:"/"});
				$.cookie("peoplecompanyname","",{path:"/"});
				$.cookie("peopleendusernick","",{path:"/"});
				$.cookie("peopletype","",{path:"/"});
				$.cookie("peopleus","",{path:"/"});
				$.cookie("peoplegb","",{path:"/"});
				$.cookie("peopleendaccid","",{path:"/"});
				$.cookie("peopleendtoken","",{path:"/"});
		};
	//验证码
	var yanzm="";
	var arr=[];
	
	var yanzmsrc=url+"/cli_code.jsp";
	var yanzmval=""  //图片
	yanz();
	var index="";
	$(".reghed a").click(function(){
		$(this).attr("class","reghedab");
		$(this).siblings().removeAttr("class","reghedab");
		index=$(this).index();
		yanz();
		if(index=="0"){
			$(".regdlu").css("display","block")
			$(".regdlut").css("display","none")
		}else{
			$(".regdlut").css("display","block")
			$(".regdlu").css("display","none")
		}
	});
	function yanz(){
		$(".ompicm img").remove();
		var yanzone=Math.floor(Math.random()*10).toString();
		var yanztwo=Math.floor(Math.random()*10).toString();
		var yanzthree=Math.floor(Math.random()*10).toString();
		var yanzfour=Math.floor(Math.random()*10).toString();
		var htm='';
		htm+='<img src="imgeas/img/num/'+yanzone+'.jpg" />';
		htm+='<img src="imgeas/img/num/'+yanztwo+'.jpg" />';
		htm+='<img src="imgeas/img/num/'+yanzthree+'.jpg" />';
		htm+='<img src="imgeas/img/num/'+yanzfour+'.jpg" />';
		$(".ompicm").append(htm);
		yanzmval=(yanzone+yanztwo+yanzthree+yanzfour);
		
	};
	$(".ompicm").click(function(){
		yanz();
	});
	
	$(".regyanzm").click(function(){
		$(this).attr("src",url+"/cli_code.jsp?timeStamp="+new Date().getTime())
	})
	//yzmapass
	/*$(".yzmapass").blur(function(){
		$.ajax({
			type:"GET",
			url:"http://192.168.0.102:8080/zybb2b/code/getCliCode",
			dataType:"json",
			success:function(data){
				alert(data.message)
			},
			error:function(){
				alert(555555555555)
			}
		});
		var mgm=$(".yzmapass").val();
		if(mgm==yanzmval){
			$(".userpass").css("display","none");
		}else{
			$(".userpass").css("display","block");
		}
	})*/
	
	//用户登陆
	$("#form").keyup(function(e){
		if(e.keyCode==13){
			login();
		};
	})
	$("#mysubmit").click(function(){
		login();
	});
	function login(){
		var username=$("#username").val();
		var yzmapass=$(".yzmapass").eq(0).val();
		var password=$("#password").val();
		if(username==""){
			$(".userpass").eq(0).show(100)
			return false;
		}else{
			$(".userpass").eq(0).hide(100)
		};
		//mim && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(mim)
		if(password && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(password)){
			
			$(".userpass").eq(1).hide(100)
		}else{
			$(".userpass").eq(1).show(100)
			return false;
		};
		if(yzmapass!=yanzmval){
			$(".userpass").eq(2).show(100)
			return false;
		}else{
			$(".userpass").eq(2).hide(100)
		};
		lo();
		function lo(){	
			
	var passw=$("#password").val();
	var hash = hex_md5(passw);
	$("#passo").val(hash)
	
	var params=$("#form").serialize();
	$("#logging").show();
	///cli/endUser/userLogin
	$.ajax({
		type: "POST",
		url: url+"/cli/user/login?"+params+"&token="+$.cookie('peoplemessage')+"&mintime="+new Date().getTime(),
		cache:false,
		dataType:"json",
		success: function(data){
			if(data.code==1){
				var sd=data.message;
				sd=sd.substr(0, 1);
				if(sd=="e"){
					
					$.cookie("peoplegb","8",{path:"/"});
					$.cookie("peoplemessage",data.message,{path:"/"});
					$.cookie("peoplecode",data.code,{path:"/"});
					$.cookie("peoplephonenum",data.pojo.endphonenum,{path:"/"});
					$.cookie("peoplesellername",data.pojo.endusername,{path:"/"});
					$.cookie("peoplestate",data.pojo.state,{path:"/"});
					$.cookie("peopleus",data.pojo.enduserid,{path:"/"});
					$.cookie("peopleendusernick",data.pojo.endusernick,{path:"/"});
					$.cookie("peoplecompanyname","",{path:"/"});
					$.cookie("peopletype",data.pojo.type,{path:"/"});
					//$.cookie("peopleendaccid",data.other.accid,{path:"/"});
					//$.cookie("peopleendtoken",data.other.token,{path:"/"});
					if(referrer.indexOf("zhaoyaoba")>0){
						if(referrer.indexOf("/merchant")>0){
							window.location.href="index.html";
						}else if(referrer.indexOf("/register")>0){
							window.location.href="index.html";
						}else{
							window.location.href=referrer;
						};
						
					}else{
						window.location.href="index.html";
					};
					
				}else if(sd=="s"){
					
					$.cookie("peoplegb","9",{path:"/"});
					$.cookie("peoplemessage",data.message,{path:"/"});
					$.cookie("peoplecode",data.code,{path:"/"});
					$.cookie("peopleus",data.pojo.selluserid,{path:"/"});
					$.cookie("peoplephonenum",data.pojo.phonenum,{path:"/"});
					$.cookie("peoplesellername",data.pojo.sellername,{path:"/"});
					$.cookie("peoplestate",data.pojo.state,{path:"/"});
					$.cookie("peoplecompanyname",data.pojo.companyname,{path:"/"});
					$.cookie("peopletype",data.pojo.type,{path:"/"});
					$.cookie("peopleendusernick","",{path:"/"});
					$.cookie("xszdtype","",{path:"/"});
					//$.cookie("peopleendaccid",data.other.accid,{path:"/"});
					//$.cookie("peopleendtoken",data.other.token,{path:"/"});
					if(referrer.indexOf("zhaoyaoba")>0){
						//register.html
						if(referrer.indexOf("/icen")>0){
							window.location.href="index.html";
						}else if(referrer.indexOf("/register")>0){
							window.location.href="index.html";
						}else{
							window.location.href=referrer;
						};
					}else{
						window.location.href="index.html";
					};
				}else{
					yanz();
					gadget_popups("登陆失败,请刷新重试");
					$("#logging").hide();
				};
			}else{
				yanz();
				gadget_popups("用户名或密码错误");
				$("#logging").hide();
			}
		},
		error:function(){
			yanz();
			$("#logging").hide();
			gadget_popups("登陆失败,请刷新重试")
		}
	});
			return false;
		}
	
	}
	
})
