<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Access-Control-Allow-Origin" content="*">
<meta http-equiv="X-UA-Compatible" content="IE=9;IE=8;IE=7;IE=EDGE">
<title>商品详情</title>
<link rel="shortcut icon" href="favicon.ico" type="image/x-ico" />
<link rel="stylesheet" href="css/big.css" />
<link rel="stylesheet" href="css/my_im.css" />

<link rel="stylesheet" href="css/Product.css" />

<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>

<script type="text/javascript" src="js/jquery.cookie.js"></script>
<link rel="stylesheet" href="css/gadget.css" />
<script type="text/javascript" src="js/gadget.js"></script>
<script type="text/javascript" src="js/inam.js"></script>
<script type="text/javascript" src="js/jquery.enlarge.min.js"></script>
<!--		<script type="text/javascript" src="js/Product.js"></script>-->
<style type="text/css">
.my_img {
	margin: 5px;
	width: 100px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	border: 1px solid #E5E5E5;
	float: left;
	position: relative;
}

.my_img:hover {
	border-color: #009688;
}

.my_img img {
	max-height: 100px;
	max-width: 100px;
	vertical-align: middle;
}

.rembox {
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100px;
	height: 30px;
	line-height: 30px;
	font-size: 14px;
	color: #fff;
	text-align: center;
	background-color: #009688;
	cursor: pointer;
}

.rembox:hover {
	background-color: #cc3300;
}

body {
	font-family: "微软雅黑";
}

.black_overlay {
	display: none;
	position: absolute;
	top: 0%;
	left: 0%;
	width: 100%;
	height: 100%;
	background-color: black;
	/* z-index越大 就在上面 */
	z-index: 1001;
	-moz-opacity: 0.6;
	opacity: .60;
	filter: alpha(opacity = 60);
}

.white_content {
	display: none;
	position: absolute;
	top: 25%;
	left: 25%;
	width: 50%;
	height: 50%;
	padding: 16px;
	/*border: 16px solid orange;*/
	background-color: white;
	z-index: 1002;
	overflow: auto;
}
</style>
</head>
<body id="body">
	<div style="clear: both;"></div>
	<div id="light" class="white_content" style="display: none">
		<form method="post" id="form21">
			<input type="hidden" id="uid" name="uid"
				value="${sessionScope.user.uid }"> <br> 姓名 :<input
				type="text" name="name" id="name" style="border: 0px; color: blue"
				readonly="readonly" value="${sessionScope.user.sname }" /> <br>
			用户名 :<input type="text" name="username" id="username"
				style="border: 0px; color: blue" readonly="readonly"
				value="${sessionScope.user.suser }" /> <br>登录密码:<input
				type="password" name="text" id="password"
				style="border: 0px; color: blue" readonly="readonly"
				value="${sessionScope.user.spwd }" /> <br>手机号:<input
				type="text" name="phone" id="phone" style="border: 0px; color: blue"
				readonly="readonly" value="${sessionScope.user.sphone }" /> <br>
			性别:<input type="text" name="ssex" id="
				ssex"
				style="border: 0px; color: blue" readonly="readonly"
				value="${sessionScope.user.ssex }" /> <br>出生日期:<input
				type="text" name="birth" id="birth" style="border: 0px; color: blue"
				readonly="readonly" value="${sessionScope.user.dbirth }" /> <br>Email:<input
				type="text" name="email" id="email" style="border: 0px; color: blue"
				readonly="readonly" value="${sessionScope.user.semail }" /> <br>地址:<input
				type="text" name="address" id="address"
				style="border: 0px; color: blue" readonly="readonly"
				value="${sessionScope.user.saddress }" /> <br> <input
				type="button" value="修改个人信息" onclick="three()">
			&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="修改密码"
				onclick="five()"><br>
		</form>
		<a onclick="two()"><input type="button" value="关闭"></a>
	</div>
	<div id="fade" class="black_overlay"></div>

	<div id="light1" class="white_content">
		<h2>个人资料</h2>
		<form id="form22">
			<input type="hidden" id="uid1" name="uid1"
				value="${sessionScope.user.uid }"> <br> 姓名 :<input
				type="text" name="name1" id="name1"
				value="${sessionScope.user.sname }" /> <br> 用户名 :<input
				type="text" name="username1" id="username1"
				value="${sessionScope.user.suser }" /> <br>手机号:<input
				type="text" name="phone1" id="phone1"
				value="${sessionScope.user.sphone }" /> <br> <input
				type="hidden" name="ssex1" id="ssex1"
				value="${sessionScope.user.ssex }" /> 性别:<input type="radio"
				name="sex1" value="男" />男<input type="radio" name="sex1" value="女" />女<br>出生日期:<input
				type="Date" name="birth1" id="birth1"
				value="${sessionScope.user.dbirth }" /> <br>Email:<input
				type="text" name="email1" id="email1"
				value="${sessionScope.user.semail }" /> <br>地址:<input
				type="text" name="address1" id="address1"
				value="${sessionScope.user.saddress }" /> <br> <input
				type="button" value="提交" onclick="save()"><br>
		</form>
		<a href="javascript:void(0)" onclick="four()"><input type="button"
			value="关闭"></a>
	</div>
	<div id="fade1" class="black_overlay"></div>


	<div id="light2" class="white_content">
		<h2>修改密码</h2>
		<form id="form23">
			<input type="hidden" id="uid2" name="uid2" value=""> <br>旧密码:<input
				type="password" name="password0" id="password0" /><br> 新密码:<input
				type="password" name="password1" id="password1" /><br>确认密码:<input
				type="password" name="password2" id="password2" value="" /> <br>
			<br> <input type="button" value="提交" onclick="savePassword()"><br>
		</form>
		<a href="javascript:void(0)" onclick="six()"><input type="button"
			value="关闭"></a>
	</div>
	<div id="fade2" class="black_overlay"></div>


	<div class="dengl">
		<div>
			<ul class="dengul">
				<li>您好！欢迎来到电商网城，够你所购&nbsp;&nbsp; <a href="login.html"
					id="login">登录</a>&nbsp;&nbsp; <a href="register.html" id="reg">注册</a><a
					href="http://localhost:8080/store/UserWeb?m=exit" id="exit"
					style="visibility: hidden">退出登录</a>
				</li>
				<li class="dengfl dengo"><a id="dengomy" onclick='one()'>用户中心</a></li>
				<li class="dengo"><a id="car" href="myshop.jsp">我的购物车</a></li>
				<li class="dengo"><a id="denmyorder" href="myorder.html">我的订单</a>
				</li>
				<li class="dengo"><a href="help.html">帮助中心</a></li>
				<li class="dengo"><a href="feedback.html">意见反馈</a></li>

			</ul>
		</div>
	</div>
	<div class="zhandlog">

		<div class="logsu">
			<a><img class="logo" src="imgeas/logo1.jpg"></a>
			<div class="zhan"></div>
		</div>
	</div>

	<header>
		<div class="heashopt">
			<div class="heashoptop">
				<a class="heashopa">商品详情</a>&nbsp;<a class="heashopa"
					href="javascript:history.go(-1);">上一页</a>
			</div>

		</div>
		<div class="shoppro">
			<div class="shopnice" name="0">
				<div class="shopimg">
					<div href="http://7xloj2.com1.z0.glb.clouddn.com/1482733487700"
						id="demo" style="position: relative; float: left;">
						<img class="shopimgbig" src=" " id="imgs1"
							style="width: 300px; height: 300px"><img class="shopimgbig"
							src="" id="imgs2"
							style="display: none; width: 300px; height: 300px" width="960"
							height="720">
						<div
							style="position: absolute; left: 228px; top: 0px; background-color: rgb(255, 210, 77); border: 1px solid rgb(255, 128, 0); width: 148px; height: 148px; opacity: 0.4; cursor: move; display: none;"></div>
						<div id="mmm"
							style="position: absolute; left: 388px; top: 0px; background-color: rgb(255, 255, 255); overflow: hidden; width: 480px; height: 360px; border: 1px solid rgb(221, 221, 221); display: none;">
							<img src=" " id="imgs3"
								style="position: absolute; display: block; width: 960px; height: 720px; left: -729.6px; top: 0px;">
						</div>
					</div>
					<div class="shopcityimg">
						<ul>
							<li><img src=" " id="imgs4"></li>
						</ul>
					</div>
				</div>
				<!-- 商品id -->
				<input type="hidden" id="nid" value="" />
				<div class="shopimgnice">
					<span id="isotc">otc</span>
					<h5 id="namecn">
						<label id="spnam"></label>
					</h5>

					<p>
						商品名：<span id="dispri"><label id="spnam1"></label></span>
					</p>
					<p>
						价格：￥<span id="dispri"><label id="price"></label></span>
					</p>
					<p>
						上架时间：<span id="dispri"><label id="date"></label></span>
					</p>
					<p>
						当前库存：<span id="shopkuc" st="2" ty="0"><label id="state"></label></span>
					</p>

					<p class="shopcart">
						</span>
					</p>
					<span class="shopgmsl">购买数量 :</span><input class="shopsf"
						id="shopsfjia" type="button" value="+" onclick="add()"><input
						id="shopval" type="number" onkeyup="checkn(this)"
						onafterpaste="checkm(this)" name="number" minnum="1" value="1"><input
						class="shopsf" id="shopsfjian" type="button" value="-"
						onclick="jian()"> <br> <input type="button"
						value="加入购物车" onclick="addShop()" style="cursor: pointer;">
					<div class="shoptishi"></div>
				</div>
			</div>
			<div id="shoppronot">
				<img src="" id="imgs6">
				<p>商品没找到，请刷新重试或看看其他商品吧</p>
			</div>

			<div class="shopdetailed">

				<div class="shopsuomi">
					<h5>
						<span>商品说明书</span>
					</h5>

				</div>

				<div class="shopliuc">
					<img src="">
				</div>
				<div class="shopcity"></div>
				<div class="shopxx">
					<h5>商品详情</h5>
					<div class="shopxximg" align="center">
						<img src="" id="imgs5"><br>
					</div>
					<div align="center">
						<h1>
							<label id="des"></label>
						</h1>
					</div>
				</div>
			</div>

		</div>
	</header>

</body>
<script>
	function addShop() {
		$(document)
				.ready(
						function() {
							$
									.ajax({
										url : "http://localhost:8080/store/IsUserLogin",
										type : "post",
										success : function(data) {
											if (data != 1) {
												alert("你尚未登录");
												//window.location.href = "http://localhost:8080/store/login.jsp";
											} else {
												var num = $("#shopval").val();
												var nid = $("#nid").val();
												var namecn = $("#namecn")
														.text();
												var price = $("#price").text();
												var simg = $("#imgs1").attr(
														"src");
												var state = $("#state").text();
												if (state == "缺货") {
													alert("商品已售罄,去看看其他商品吧");
													history.go(0);
												} else {
													//发送请求到服务器 
													location.href = "http://localhost:8080/store/CartWeb?m=add&nid="
															+ nid
															+ "&num="
															+ num
															+ "&name="
															+ namecn
															+ "&price="
															+ price
															+ "&simg=" + simg;
												}
											}
										}
									})
						})
	}

	function add() {
		var i = Number(document.getElementById('shopval').value) + 1;
		document.getElementById('shopval').value = i;
	}

	function jian() {
		var i = Number(document.getElementById('shopval').value);
		if (i > 1) {
			i--;
			document.getElementById('shopval').value = i;
		}
	}
	$(document)
			.ready(
					function() {
						$
								.ajax({
									url : "http://localhost:8080/store/IsUserLogin",
									type : "post",
									success : function(data) {
										if (data == 1) {
											document.getElementById('login').style.display = 'none';
											document.getElementById('reg').style.display = 'none';
											document.getElementById('exit').style.visibility = "visible";
											document.getElementById('car').style.visibility = "visible";
											document
													.getElementById('denmyorder').style.visibility = "visible";
											document.getElementById('dengomy').style.visibility = "visible";

										} else {
											document.getElementById('login').style.visibility = 'visible';
											document.getElementById('reg').style.visibility = 'visible';
											document.getElementById('exit').style.visibility = "hidden";
											document.getElementById('car').style.visibility = "hidden";
											document
													.getElementById('denmyorder').style.visibility = "hidden";
											document.getElementById('dengomy').style.visibility = "hidden";
										}
									}
								})

					})
	function one() {
		$(document)
				.ready(
						function() {
							$
									.ajax({
										url : "http://localhost:8080/store/IsUserLogin",
										type : "post",
										success : function(data) {
											if (data == 1) {
												document
														.getElementById('light').style.display = 'block';
												document.getElementById('fade').style.display = 'block';
											} else {
												alert("你尚未登录");
												//	window.location.href = "http://localhost:8080/store/product.jsp";
											}
										}
									})
						})
	}

	function two() {
		$("form21").submit();
		document.getElementById('light').style.display = 'none';
		document.getElementById('fade').style.display = 'none';
	}

	function three() {
		document.getElementById('light1').style.display = 'block';
		document.getElementById('fade1').style.display = 'block';
		var sex = document.getElementById('ssex1').value;
		if (sex == "男") {
			$(":radio[name='sex1'][value='男']").prop("checked", "checked");
		} else {
			$(":radio[name='sex1'][value='女']").prop("checked", "checked");
		}
	}

	function four() {
		$("form22").submit();
		document.getElementById('light1').style.display = 'none';
		document.getElementById('fade1').style.display = 'none'
	}

	function save() {
		$.ajax({
			url : "http://localhost:8080/store/UserWeb?m=save",
			type : "post",
			data : $('#form22').serialize(),
			success : function(data) {
				if (data == 1) {
					alert("信息修改成功");
					location.reload();
					one();
				} else if (data == -1) {
					alert("该手机号已经被绑定");
				} else {
					alert("修改失败");
				}
			}
		})
	}

	function five() {
		document.getElementById('light2').style.display = 'block';
		document.getElementById('fade2').style.display = 'block';
	}

	function six() {
		$("form23").submit();
		document.getElementById('light2').style.display = 'none';
		document.getElementById('fade2').style.display = 'none';
	}
	function savePassword() {
		$
				.ajax({
					url : "http://localhost:8080/store/UserWeb?m=savepass",
					type : "post",
					data : $('#form23').serialize(),
					success : function(data) {
						if (data == -2) {
							alert("新密码输入不一致");
						} else if (data == 1) {
							alert("修改已更改，请重新登录");
							window.location.href = "http://localhost:8080/store/login.html";
						} else if (data == -1) {
							alert("旧密码错误");
						} else {
							alert("修改失败");
						}
					}
				})
	}

	$(document)
			.ready(
					function() {
						var url = location.search;
						var strs = {};
						if (url.indexOf("?") != -1) {
							var str = url.substr(1);
							strs = str.split("=");
						}
						$
								.ajax({
									url : "http://localhost:8080/store/ProductWeb?m=product",
									type : "post",
									data : {
										"data" : strs[1]
									},
									dataType : 'json',
									success : function(data) {
										document.getElementById('imgs1').src = "http://localhost:8080/"
												+ data.simg;
										document.getElementById('imgs2').src = "http://localhost:8080/"
												+ data.simg;
										document.getElementById('imgs3').src = "http://localhost:8080/"
												+ data.simg;
										document.getElementById('imgs4').src = "http://localhost:8080/"
												+ data.simg;
										document.getElementById('imgs5').src = "http://localhost:8080/"
												+ data.simg;
										document.getElementById('imgs6').src = "http://localhost:8080/"
												+ data.simg;
										document.getElementById('nid').value = data.nid;
										document.getElementById('spnam').innerText = data.sname;
										document.getElementById('spnam1').innerText = data.sname;
										document.getElementById('price').innerText = data.nprice;
										document.getElementById('date').innerText = data.date;
										var state;
										if (data.smctag == 1) {
											state = "有货";
										} else {
											state = "缺货";
										}
										document.getElementById('state').innerText = state;
										document.getElementById('des').innerText = data.sdescription;
									}
								})
					})
</script>

</html>