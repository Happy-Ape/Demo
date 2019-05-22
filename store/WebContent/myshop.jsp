<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>

<head>
<meta charset="utf-8">
<meta http-equiv="Access-Control-Allow-Origin" content="*">
<meta http-equiv="X-UA-Compatible" content="IE=9;IE=8;IE=7;IE=EDGE">
<title>购物车</title>
<link rel="shortcut icon" href="favicon.ico" type="image/x-ico" />
<link rel="stylesheet" href="css/big.css" />

<link rel="stylesheet" href="css/Product.css" />

<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>


<link rel="stylesheet" href="css/gadget.css" />
<script type="text/javascript" src="js/gadget.js"></script>

<style>
.selectShop {
	padding-left: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	margin-left: 50px;
	margin-right: 30px;
	border: #33ccff solid 1px;
	border-radius: 4px;
	text-align: left;
}

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
		<a onclick="four()"><input type="button" value="关闭"></a>
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
		<a onclick="six()"><input type="button" value="关闭"></a>
	</div>
	<div id="fade2" class="black_overlay"></div>

	<div id="light3" class="white_content">
		<h2>订单填写</h2>
		<form id="form24">
			<input type="hidden" id="uid11" name="uid11" value="${user.uid }">
			<br>用户名:<input type="text" name="suser11" id="suser11"
				readonly="readonly" value="${user.suser }" style="border: 0px" /><br>
			<div id="product"></div>
			收货人:<input type="text" name="shname11" id="shname11" /><br>收货地址:<input
				type="text" name="shaddress11" id="shaddress11" style="width: 200px" /><br>收货电话:<input
				type="text" name="shphone11" id="shphone11" /><br>收货邮编:<input
				type="text" name="shcode11" id="shcode11" /><br>合计金额:<input
				type="text" name="total11" id="total11" value="" readonly="readonly"
				style="border: 0px" /><br>支付方式:<input type="radio"
				name="type11"  value="支付宝">支付宝 &nbsp;&nbsp;<input
				type="radio" name="type11"  value="微信">微信&nbsp;&nbsp;<input
				type="radio" name="type11"  value="银联">银联<br>
			留言：
			<textarea rows="5" cols="20" id="liuyan11" name="liuyan11"></textarea>
			<br> <input type="button" value="提交" onclick="saveOrder()"><br>
		</form>
		<a onclick="eight()"><input type="button" value="关闭"></a>
	</div>
	<div id="fade3" class="black_overlay"></div>

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
			<a href="http://127.0.0.1:8080/store/myshop.jsp"><img
				class="logo" src="imgeas/logo1.jpg"></a>
			<div class="zhan"></div>
			<div class="sosu"></div>
		</div>
	</div>

	<header>
		<div class="heashopt">
			<div class="heashoptop">
				<a class="heashopa">我的购物车</a> <a class="heashopa" href="index.jsp">首页</a>
			</div>

		</div>
		<div class="selectShop">
			<form id="selectForm" action="/OrderWeb?m=list" name="selectForm"
				method="post">
				<table>
					<!-- 一行就是一个商品 -->
					<c:forEach items="${cart}" var="c">
						<tr>
							<td><input type="checkbox" name="nid" id="nid" class="nid"
								value="${c.value.nid }" /></td>
							<td><img src="http://127.0.0.1:8080/${c.value.img }"
								width="150px" height="100px" /></td>
							<td>&nbsp;商品名:${c.value.name }&nbsp;&nbsp; 数量: <input
								type="number" name="num" id="num" class="num"
								value="${c.value.num }" width="10px" />&nbsp;&nbsp;
								金额:${c.value.num *c.value.price }&nbsp;&nbsp;<input
								type="button" value="修改" onclick="edit(this)">&nbsp;&nbsp;<input
								type="button" value="删除" onclick="remove(this)">
							</td>
						</tr>
					</c:forEach>
				</table>

			</form>
		</div>

		<div class="heashoptop">
			<a class="heashopa" style="cursor: pointer;" onclick="buy()">去结算</a>
		</div>

	</header>

</body>
<script>
	function buy() {
		var userid = document.getElementById("uid").value;
		var arrayObj = new Array();
		$("input[name=nid]:checked").each(function() {
			var number = $(this).parents("tr").find(".num").val();
			var nid = $(this).parents("tr").find(".nid").val();
			arrayObj.push(number + "-" + nid);
		});
		if (arrayObj[0] == null) {
			alert("请勾选要结算的商品");
		} else {
			document.getElementById('light3').style.display = 'block';
			document.getElementById('fade3').style.display = 'block';
			$
					.ajax({
						url : "http://localhost:8080/store/OrderWeb?m=buy",
						type : "post",
						traditional : true,
						data : {
							"cart" : arrayObj,
							"id" : userid
						},
						success : function(data) {
							var html = "";
							var total = 0;
							for (i = 0; i < data.length; i++) {
								html += '<div>';
								html += '<input type="hidden" id="nid11" name="nid11" value="'+data[i].nid+'">';
								html += '商品名：<input type="text" name="spname11" id="spname11" value="'+data[i].sname+'"readonly="readonly" style="border: 0px"> <br>';
								html += '<img src="http://127.0.0.1:8080/'+data[i].simg+'" style="width: 100px; height: 100px" /><br>';
								html += '单价：<input type="text" name="spprice11" id="spprice11"value="'+data[i].nprice+'" readonly="readonly"style="width: 40px; border: 0px">&nbsp;&nbsp;';
								html += '数量：<input type="text" name="spnumber11" id="spnumber11" value="'+data[i].number+'" readonly="readonly" style="width: 20px; border: 0px"> <br>';
								html += "</div>";
								total += Number(data[i].nprice * data[i].number);
							}
							$("#product").html(html);
							document.getElementById("total11").value = total;
						}
					})
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
											alert("你尚未登录");
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
	function edit(obj) {
		var number = $(obj).parents("td").find(".num").val();
		var nid = $(obj).parents("tr").find(".nid").val();
		$.ajax({
			url : "http://localhost:8080/store/CartWeb?m=edit",
			type : "post",
			data : {
				"number" : number,
				"nid" : nid

			},
			success : function(data) {
				alert("修改成功");
				history.go(0);
			}
		})
	}
	function remove(obj) {
		var nid = $(obj).parents("tr").find(".nid").val();
		$.ajax({
			url : "http://localhost:8080/store/CartWeb?m=del",
			type : "post",
			data : {
				"nid" : nid

			},
			success : function(data) {
				if (data == 1) {
					alert("移除成功");
					history.go(0);
				}
			}
		})
	}
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
												//	window.location.href = "http://localhost:8080/store/index.jsp";
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

	function eight() {
		$("form24").submit();
		document.getElementById('light3').style.display = 'none';
		document.getElementById('fade3').style.display = 'none'
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
	function saveOrder() {
		var uid = $("#uid11").val();
		var suser = $("#suser11").val();
		var shname = $("#shname11").val();
		var shaddress = $("#shaddress11").val();
		var shphone = $("#shphone11").val();
		var shcode = $("#shcode11").val();
		var buytype = $('input[name="type11"]:checked').val();
		var totalprice = $("#total11").val();
		var liuyan = $("#liuyan11").val();
		var orderObj = new Array();
		$("input[name=nid]:checked").each(function() {
			var number = $(this).parents("tr").find(".num").val();
			var nid = $(this).parents("tr").find(".nid").val();
			orderObj.push(number + "-" + nid);
		});
		$.ajax({
			url : "http://localhost:8080/store/OrderWeb?m=saveOrder",
			type : "post",
			traditional : true,
			data : {
				"order" : orderObj,
				"uid" : uid,
				"suser" : suser,
				"shname" : shname,
				"shaddress" : shaddress,
				"shphone" : shphone,
				"shcode" : shcode,
				"buytype" : buytype,
				"totalprice" : totalprice
			},
			success : function(data) {
				if (data > 0) {
					alert("下单成功");
					history.go(0);
				}
			}
		})
	}
</script>
</html>