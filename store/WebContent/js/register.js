$(function(){
	jQuery.support.cors = true;
	var mytype=1;
	var lok=0;
	var yzmks="";
	footerlis();
	$("#fortit span").click(function(){
		$("#fortit span").removeClass("fortisp");
		$(this).addClass("fortisp");
		if($(this).index()==0){
			$("#buy").show();
			$("#stor").hide();
			mytype=1;
			$(".forcher input[type='radio']").removeAttr("checked");
			$(".forcher input[type='radio']").eq(0).attr("checked","checked");
			$("#shops p span").removeClass("isred");
			$("#shops p span").eq(0).addClass("isred");
			$("#stores").hide();
			$("#shops").show();
			$("#mytel").val("");
			$("#regmim").val("");
			$("#regmimt").val("");
			$("#yzmsl").val("");
			$("#isbtn").unbind("click");
			$("#mybtn").unbind("click");
		};
		if($(this).index()==1){
			$("#buy").hide();
			$("#stor").show();
			mytype=4;
			$(".forcher input[type='radio']").removeAttr("checked");
			$(".forcher input[type='radio']").eq(3).attr("checked","checked");
			$("#stores p span").removeClass("isred");
			$("#stores p span").eq(0).addClass("isred");
			$("#shops").hide();
			$("#stores").show();
			$("#mytel").val("");
			$("#regmim").val("");
			$("#regmimt").val("");
			$("#yzmsl").val("");
			$("#isbtn").unbind("click");
			$("#mybtn").unbind("click");
		};
	});
	$("#shops p span").click(function(){
		$("#shops p span").removeClass("isred");
		$(this).addClass("isred");
		mytype=Number($(this).index())+1;
		//mytype=-1;
	});
	$("#stores p span").click(function(){
		$("#stores p span").removeClass("isred");
		$(this).addClass("isred");
		//mytype=Number($(this).index())+4;
		mytype=-1;
	});
	$(".forcher input[type='radio']").click(function(){
		mytype=$(this).val();
		//console.log(mytype)
	});
	
	
	
	
	$("#mybtn").click(function(){
		//alert(mytype)
	})
	$("#mytel").blur(function(){
		$("#isbtn").unbind("click");
		$("#mybtn").unbind("click");
		var phone = $("#mytel").val();
		if(phone && /^1[3|4|5|7|8]\d{9}$/.test(phone)){
			//console.log(phone)
			var type = mytype;
			$.ajax({
				type:"get",
				url:url+"/cli/sellUser/checkCall?call="+phone+"&type="+type+"&mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					//{"code":1,"lists":null,"message":"该手机号可以使用","pojo":null}
					if(data.code!=1){
						//console.log(data)
						$(".foring").eq(1).children("p").html(data.message);
						$(".foring").eq(1).show();
						$(".forcher").eq(2).children("img").hide();
						lok=0;
					}else{
						$(".foring").eq(1).hide();
						$(".forcher").eq(2).children("img").show();
						blol();
					};
				},
				error:function(){
					//$(".forcher").eq(1).children("img").hide();
				}
			});
		$(".regphondp").css("display","none")
	}else{
		$(".foring").eq(1).children("p").html("手机号不正确");
		$(".foring").eq(1).show();
		$(".forcher").eq(2).children("img").hide();
	};
		
	});
	$("#regmim").blur(function(){
		var mim=$("#regmim").val()
		if(mim && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(mim)){
			$(".foring").eq(2).hide();
			$(".forcher").eq(3).children("img").show();
		}else{
			$(".foring").eq(2).show();
			$(".forcher").eq(3).children("img").hide();
		}
	});
	$("#regmimt").blur(function(){
		var mimt=$("#regmimt").val()
		var mim=$("#regmim").val()
		if(mimt==mim){
			$(".foring").eq(3).hide();
			$(".forcher").eq(4).children("img").show();
		}else{
			$(".foring").eq(3).show();
			$(".forcher").eq(4).children("img").hide();
		};
	});
	
	
	function blol(){
		$("#isbtn").click(function(){
			if($("#mytel").val()==""||$("#mytel").val()==null){

				return false;
			};
			if($("#regmimt").val()==""||$("#regmim").val()!=$("#regmimt").val()){
				
				return false;
			};
			var mytels=$("#mytel").val();
			$.ajax({
				type:"get",
				url:url+"/cli/getMessageCode/"+mytels+"?mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					if(data.code==-1){
						$(".foring").eq(4).children("p").html("验证码发送失败，请重试");
						$(".foring").eq(4).show();
						yzmks="";
					}else{
						yzmks=data.message;
						$("#isbtn").hide();
						$("#obtn").show();
						outtime();
					};
				},
				error:function(){
					yzmks="";
					gadget_popupt("验证码发送失败，请刷新重试");
				}
			});
			
		});
		
		$("#mybtn").click(function(){
			
			if($("#yzmsl").val()!=yzmks||$("#yzmsl").val()==""||$("#yzmsl").val()==null){
				$(".foring").eq(4).children("p").html("验证码错误");
				$(".foring").eq(4).show();
				return false;
			}else{
				$(".foring").eq(4).hide();
			}
			var mim=$("#regmim").val()
			if(mim && /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/.test(mim)){
				$(".foring").eq(2).hide();
			}else{
				$(".foring").eq(2).show();
				return false;
			};
			var mimt=$("#regmimt").val()
			if(mimt==mim){
				$(".foring").eq(3).hide();
			}else{
				$(".foring").eq(3).show();
				return false;
			};
			var phonenum=$("#mytel").val();
			var npassword=hex_md5(mimt);
			//alert(mytype)
			$.ajax({
				type:"post",
				url:url+"/cli/sellUser/register?phonenum="+phonenum+"&password="+npassword+"&type="+mytype+"&mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					if(data.code==1){
						gadget_popupt("注册成功");
						logins(phonenum,npassword,mytype);
						//window.location.href="login.html";
					}else{
						console.log(data)
						gadget_popupt("注册失败，"+data.message);
					}
				},
				error:function(){
					gadget_popupt("注册失败，请刷新重试");
				}
			});
			
			
		});		
	};
	
		function outtime(){
				var otim=361;
				function time(){
					if(otim==1){
						$("#isbtn").show();
						$("#obtn").hide();
						clearInterval(timeo);
					};
					otim=otim-1
					$("#obtn").html(otim+"S后重试");
				};
				var timeo=setInterval(time,1000);
		};
	
function logins(phonenum,npassword,mytype){
							if(mytype<4){
								var userurl="/cli/endUser/userLogin?endphonenum=";
							}else{
								var userurl="/cli/sellUser/userLogin?phonenum=";
							};
							$.ajax({
								type:"post",
								url:url+userurl+phonenum+"&password="+npassword+"&mintime="+new Date().getTime(),
								dataType:"json",
								success:function(data){
									
									if(data.code==1){
										if(mytype<4){
											//data.other=JSON.parse(data.other);
											//alert(data.other);
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
											window.location.href="icen/idata.html";
										}else{
											//data.other=JSON.parse(data.other);
											//console.log(data.other.accid);
											//console.log(data.other.token);
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
											//$.cookie("peopleendaccid",data.other.accid,{path:"/"});
											//$.cookie("peopleendtoken",data.other.token,{path:"/"});
											//{"name":"","accid":"z18783332222","token":"5dc7cc836da4ad3d714d5f32a981a66d"}
											//http://192.168.0.101:8020/index.html
											if(mytype==6){
												window.location.href="merchant/shops.html";
											}else{
												window.location.href="merchant/prompt.html";
											};
										}
									}else{
										gadget_popupt(data.message);
									}
								},
								error:function(){
									gadget_popupt("登陆失败，请前往登录页面登录");
								}
							});
							
							
							
						};
})








