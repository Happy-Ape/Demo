$(function(){
	jQuery.support.cors = true;
	var peoplestate=$.cookie('peoplestate');
	var op=0;
	var token=$.cookie('peoplemessage');
	if(token==null||token==""){
		gadget_login(-4);
	};
	
	$(".banposinli").bind("click",function(){
		if(op==0){
			$(this).siblings().children("ul").hide();
			$(this).siblings().children("img").attr("src","../imgeas/jiantx.png")
			$(this).siblings().css("border-color","#D4D4D4")
			$(this).children("ul").show();
			$(this).children("img").attr("src","../imgeas/jiants.png")
			$(this).css("border-color","#28a7e1")
			op=1;
		}else{
			$(this).children("ul").hide();
			$(this).children("img").attr("src","../imgeas/jiantx.png")
			$(this).css("border-color","#D4D4D4")
			op=0;
		}
		
	});
	
	$(".banpoyc").click(function(){
		$(".banposin").hide();
		$(".banisspan").show();
	});
	$(".banisspan").click(function(event){
		event.stopPropagation();
		$(".banposin").show();
		$(this).hide();
	});
	$(document).click(function(){
		$(".banposin").hide();
		$(".banisspan").show();
	});
	$(".banposin").click(function(event){
		event.stopPropagation();
	});
	$("#biggo").click(function(){
		$.cookie("people","1",{path:"/"});
		var token=$.cookie('peoplemessage');
		$.ajax({
			type:"get",
			url:url+"/cli/endUser/out?token="+token
		});
		window.location.href="../login.html";
	})
	isendn();
	function isendn(){
		var hname="";
		hname=$.cookie('peoplecompanyname');
		if($.cookie('peoplecompanyname')==null){
			hname=$.cookie('peoplephonenum');
		};
		var html='';
		html+='欢迎您';
		html+=hname;
		$("#bigname").html(html)
	};
	
	
	//-2 表示用户关闭 -1 表示刚注册 1上传没完整 2上传完整，没审核 3上传完整 审核不通过 6正常用户 ，61店铺开启 62店铺关闭
	if(peoplestate!=6&&peoplestate!=61&&peoplestate!=62){
		/*$(".banposinli").eq(1).children("ul").children("li").remove();
		$(".banposinli").eq(1).children(".obstr").html("商铺管理<span>(审核通过可用)</span>");
		$(".banposinli").eq(2).children("ul").children("li").remove();
		$(".banposinli").eq(2).children(".obstr").html("商品管理<span>(审核通过可用)</span>");
		$(".banposinli").eq(3).children("ul").children("li").remove();
		$(".banposinli").eq(3).children(".obstr").html("订单管理<span>(审核通过可用)</span>");
		$(".banposinli").eq(4).children("ul").children("li").remove();
		$(".banposinli").eq(4).children(".obstr").html("活动管理<span>(审核通过可用)</span>");
		$(".banposinli").eq(6).children(".obstr").html("供应管理<span>(审核通过可用)</span>");
		$(".banposinli").eq(6).children(".obstr").removeAttr("href");*/
		gadget_left_box_v({hide:1,txt:"审核通过后可使用此功能，如已通过审核请重新登录",popstate:$.cookie('peopletype')});
	}else{
		gadget_left_box_v({hide:0,popstate:$.cookie('peopletype')});
		$(".banisspan").remove();
	}
	if(peoplestate==-1){
		$(".banlimuy .obmspanji").html('您未上传资质!<a href="prompt.html">查看详情</a>');
		
	};
	if(peoplestate==1){
		$(".banlimuy .obmspanji").html('请完整上传资质!<a href="prompt.html">查看详情</a>');
		
	};
	if(peoplestate==2){
		$(".banlimuy .obmspanji").html('正在审核资质!<a href="prompt.html">查看详情</a>');
		
	};
	if(peoplestate==3){
		$(".banlimuy .obmspanji").html('审核不通过!<a href="prompt.html">查看详情</a>');
		
	};
	
})
