//gadget
/*var url="http://www.zhaoyaoba.com/zybb2b";
var ut="http://www.zhaoyaoba.com/";*/
var url="http://localhost:8080/zybb2b";
var ut="http://192.168.0.101:8080/";
function gadget_popupt(popuptxt){
	$("#gadget_popupt").remove();
	var html='<div id="gadget_popupt"><p>';
	html+=popuptxt;
	html+='</p></div>';	
	$("body").append(html);
	$("#gadget_popupt").fadeIn(1000);
	$("#gadget_popupt").fadeOut(1500);
};
function gadget_popups(popuptxt){
	$("#gadget_popups,.gadget_popups_box").remove();
	var html='<div id="gadget_popups"><div id="gadget_popups_t"><p>';
	html+=popuptxt;
	html+='</p></div><div id="gadget_popups_b"><p><span>确定</span></p></div></div><div class="gadget_popups_box"></div>';
	$("body").append(html);
	$("#gadget_popups,.gadget_popups_box").show();
	$("#gadget_popups_b").click(function(){
		$("#gadget_popups,.gadget_popups_box").hide(300);
	});
};
function gadget_popupf(popuptxt,winhref){
	$("#gadget_popups,.gadget_popups_box").remove();
	var html='<div id="gadget_popups"><div id="gadget_popups_t"><p>';
	html+=popuptxt;
	html+='</p></div><div id="gadget_popups_b"><p><span>确定</span></p></div></div><div class="gadget_popups_box"></div>';
	$("body").append(html);
	$("#gadget_popups,.gadget_popups_box").show();
	$("#gadget_popups_b").click(function(){
		$("#gadget_popups,.gadget_popups_box").hide(300);
		if(winhref==-1){
			window.history.back();location.reload()
		}else if(winhref==0){
			window.location.reload();
		}else{
			window.location.href=winhref;
		};
	});
};

function gadget_popupse(popuptxt){
	$("#gadget_popups,.gadget_popups_box").remove();
	var html='<div id="gadget_popups"><div id="gadget_popups_tse"><p>';
	html+=popuptxt;
	html+='</p></div><div id="gadget_popups_b"><p><span>确定</span></p></div></div><div class="gadget_popups_box"></div>';
	$("body").append(html);
	$("#gadget_popups,.gadget_popups_box").show();
	$("#gadget_popups_b").click(function(){
		$("#gadget_popups,.gadget_popups_box").hide(300);
	});
};
function gadget_popupfs(popuptxt,winhref,wincil,btntxt,btntxttwo){
	$("#gadget_popupo,.gadget_popups_box").remove();
	var html='<div id="gadget_popupo"><div id="gadget_popupo_t"><p>';
	html+=popuptxt;
	html+='</p></div><div id="gadget_popupo_b"><span id="gadget_popupo_bn">';
	if(btntxt==""||btntxt==0){
		btntxt="取消";
	};
	html+=btntxt;
	html+='</span>';
	html+='<span id="gadget_popupo_by">';
	if(btntxttwo==""||btntxttwo==null||btntxttwo==undefined){
		html+="确认"
	}else{
		html+=btntxttwo;
	};
	html+='</span></div></div><div class="gadget_popups_box"></div>';
	$("body").append(html);
	$("#gadget_popupo").show();
	$("#gadget_popupo_bn").click(function(){
		$("#gadget_popupo,.gadget_popups_box").hide(300);
		if(winhref==-1){
			window.history.back();location.reload()
		}else if(winhref==0){
			window.location.reload();
		}else if(winhref==2){
			$("#gadget_popupo,.gadget_popups_box").hide(300);
		}else{
			window.location.href=winhref;
		};
	});
	$("#gadget_popupo_by").click(function(){
		if(wincil==-1){
			window.history.back();location.reload()
		}else if(wincil==0){
			window.location.reload();
		}else if(wincil==2){
			$("#gadget_popupo,.gadget_popups_box").hide(300);
		}else{
			window.location.href=wincil;
		}
	});
};
function gadget_popupfsev(popuptxt,callback,callbackt,txtxo,txtxt){
	$("#gadget_popupo,.gadget_popups_box").remove();
	var html='<div id="gadget_popupo"><div id="gadget_pop_min"><p>';
	html+=popuptxt;
	html+='</p></div><div id="gadget_popupo_b"><span id="gadget_popupo_bn">';
	if(txtxo){
		html+=txtxo;
	}else{
		html+="取消";
	};
	html+='</span>';
	html+='<span id="gadget_popupo_by">';
	if(txtxt){
		html+=txtxt;
	}else{
		html+="确认";
	};
	html+='</span></div></div><div class="gadget_popups_box"></div>';
	$("body").append(html);
	$("#gadget_popupo,.gadget_popups_box").show();
	$("#gadget_popupo_bn").click(function(){
		callback();
		$("#gadget_popupo,.gadget_popups_box").remove();
	});
	$("#gadget_popupo_by").click(function(){
		callbackt();
		$("#gadget_popupo,.gadget_popups_box").remove();
	})
};
function gadget_popup_c(txta,arra,txtb,callback,callbackt){
	$(".gadget_popups_boxs").remove();
	var html='<div class="gadget_popups_box gadget_popups_boxs"><div id="gadget_ord"><div class="gadget_ord_top"><h5>';
	html+=txta;
	html+='</h5><img id="gadget_pop_cc" src="imgeas/chac.png" /></div><div class="gadget_ord_ban">';
	html+=txtb;
	html+='</div>';
	html+='<div class="gadget_ord_fer">';
	if(arra.length==1){
		html+='<a class=" gadget_fer_bom">'+arra[0]+'</a>';
	};
	if(arra.length==2){
		html+='<a class="gadget_fer_btn gadget_fer_le">'+arra[0]+'</a>';
		html+='<a class="gadget_fer_btn gadget_fer_ri">'+arra[1]+'</a>';
	};
	html+='</div></div></div>';
	$("body").append(html);
	$("#gadget_pop_cc").click(function(){
		$(".gadget_popups_boxs").remove();
	});
	$(".gadget_fer_bom,.gadget_fer_le").click(function(){
		if(callback){
			callback();
			if(callback.remkt!=1){
				$(".gadget_popups_boxs").remove();
			}
		}else{
				$(".gadget_popups_boxs").remove();
		};
	});
	$(".gadget_fer_ri").click(function(){
		if(callbackt){
			callbackt();
			if(callback.remkt!=1){
				$(".gadget_popups_boxs").remove();
			};
		}else{
			$(".gadget_popups_boxs").remove();
		};
	});
};
function gadget_look(ovo){
	if(ovo.height<160){
		ovo.height=160;
	};
	if(ovo.width<300){
		ovo.width=300;
	};
	$("#gadget_port_big").remove();
	var html='<div id="gadget_port_big" class="gadget_popups_box"><div id="gadget_port" style="width: ';
	html+=ovo.width;
	html+='px;height:';
	html+=ovo.height;
	html+='px"><div class="gadget_port_top"><h5>';
	html+=ovo.name;
	html+='</h5><img id="gadget_pic_cc" src="'+ut+'/imgeas/chac.png" /></div>';
	html+='<div class="gadget_port_ban" style="height:'+(ovo.height-70)+'px">';
	html+=ovo.mytxt;
	html+='</div><div class="gadget_port_fer">';
	if(ovo.btnnum==1){
		html+='<a class="gadget_fer_btn gadget_fer_bom gadget_port_ri gadget_port_btno">'+ovo.btntxt[0]+'</a>';
	};
	if(ovo.btnnum==2){
		html+='<a class="gadget_fer_btn gadget_fer_bom gadget_port_ri gadget_port_btno">'+ovo.btntxt[0]+'</a>';
		html+='<a class="gadget_fer_btn gadget_fer_bom gadget_port_ri gadget_back_r gadget_port_btnt">'+ovo.btntxt[1]+'</a>';
	};
	html+='</div></div></div>';
	$("body").append(html);
	$("#gadget_pic_cc").click(function(){
		$("#gadget_port_big").remove();
	});
	$(".gadget_port_btno").click(function(){
		if(ovo.callbacko){
			ovo.callbacko();
			$("#gadget_port_big").remove();
		}else{
			$("#gadget_port_big").remove();
		};
	});
	$(".gadget_port_btnt").click(function(){
		if(ovo.callbackt){
			ovo.callbackt();
		}else{
			$("#gadget_port_big").remove();
		};
	});
};
function gadget_login(data){
	//console.log(data)
	if(data===-5){
		gadget_popupfs("登录超时，请重新登录或刷新重试",0,ut+"/login.html","刷新");
	};
	if(data===-4){
		gadget_popupfs("请登录或刷新重试",0,ut+"/login.html","刷新");
	};
};
function gadget_back(popuptxt){
	$("#gadget_back").remove();
	var html='<div id="gadget_back"><div class="gadget_gif"><img src="imgeas/yuanq.gif" /><p>';
	html+=popuptxt;
	html+='</p></div></div>';
	$("body").append(html);
	$("#gadget_back").show();
};
function gadget_back_remove(){
	$("#gadget_back").remove();
};
function gadget_err_m(popuptxt,obj,mtop,pics){
	if(mtop==undefined||mtop==null||mtop==""){
		mtop="30px";
	};
	obj.children(".error_m_box").remove();
	obj.removeClass("error_m_big");
	var html='<div class="error_m_box" style="top:'+mtop+'">';
	if(pics){
		html+='<img src="'+pics+'" /><p>';
	}else{
		html+='<img src="'+ut+'/imgeas/error.png" /><p>';
	};
	html+=popuptxt;
	html+='</p></div>';
	obj.addClass("error_m_big");
	obj.append(html);
	$(".error_m_box").show();
};
function gadget_m_remv(obj){
	obj.children(".error_m_box").remove();
	obj.removeClass("error_m_big");
}
function gadget_relo(){window.location.reload()};
function checkn(obj){
	if(obj.value.length==1){
		obj.value=obj.value.replace(/[^1-9]/g,'')
		}else{
			obj.value=obj.value.replace(/\D/g,'')
		};
}
function checkm(obj){
	if(obj.value.length==1){
		obj.value=obj.value.replace(/[^1-9]/g,'')
		}else{
			obj.value=obj.value.replace(/\D/g,'')
		};
}

function numli(numa,numb){
		numa=Number(numa);
		numb=Number(numb);
		var numc="";
		for(var i=numa;i<=numb;i++){
			numc+=i+",";
		};
		numc=numc.substring(0,numc.length-1);
		return numc;
	};
function seltli(timea,timeb,txt){
	var year=numli(timea,timeb);
	year=year.split(",");
	var html='';
	for(var i=0;i<year.length;i++){
		html+='<option value="'+year[i]+'">'+year[i]+txt+'</option>';
	};
	html+='';
	return html;
};
function getUrlParamo(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return decodeURI(r[2]); return null; 
    };
function getUrlParamot(name,string) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = string.substr(1).match(reg);  
        if (r != null) return decodeURI(r[2]); return null; 
    };
function sub_ace(strings){
		var ace_sipids=strings.substr(3,4);
		return strings.replace(ace_sipids,"****");
	};
function gtiem_l(){
		var userAgent = window.navigator.userAgent.toLowerCase();
		if($.browser.msie9 = $.browser.msie && /msie 9\.0/i.test(userAgent)){
			return true;
		}else{
			return false;
		};
	};
function gadget_weix(ordercode,token,orderid) {
	gadget_back("请稍等...");
	$.ajax({
		type: "get",
		url: url + "/cli/order/wxPayQuery/" + ordercode + "?token=" + token + "&time=" + new Date().getTime(),
		dataType: "json",
		success: function(data) {
			gadget_back_remove();
			if(data.code == 1) {
				/*SUCCESS—支付成功 REFUND—转入退款 NOTPAY—未支付 CLOSED—已关闭 REVOKED—已撤销（刷卡支付）USERPAYING--用户支付中 PAYERROR--支付失败(其他原因，如银行返回失败)*/
				switch(data.other) {
					case "SUCCESS":
						window.location.href = ut+"/completion.html?mes=" + orderid + "&e=" + ordercode;
						break;
					case "REFUND":
						gadget_popups("转入退款");
						break;
					case "NOTPAY":
						gadget_popups("未支付,如已支付请稍后重试");
						break;
					case "CLOSED":
						gadget_popups("支付已关闭");
						break;
					case "REVOKED":
						gadget_popups("支付已撤销");
						break;
					case "USERPAYING":
						gadget_popups("正在支付中");
						break;
					case "PAYERROR":
						gadget_popups("支付失败");
						break;
					default:
						gadget_popups("暂无付款信息，请稍后重试");
				};
			} else {
				gadget_back_remove();
				gadget_popups("暂无付款信息，请稍后重试");
			};
		},
		error: function() {
			gadget_popups("查询失败，请重试");
		}
	});
};
function gadget_zfb(token, datacode, datamessage) {
	gadget_back("查询中...");
	$.ajax({
		type: "get",
		url: url + "/cli/order/queryAliPay?token=" + token + "&orderCode=" + datacode + "&time=" + new Date().getTime(),
		dataType: "json",
		success: function(data) {
			//console.log(data)
			gadget_back_remove();
			//1付款成功 -1支付宝错误 -2订单不存在
			if(data.code == 1) {
				gadget_popupf("订单已支付成功", ut+"/icen/orderdetails.html?i=" + datamessage)
			} else if(data.code == -1) {
				gadget_popupf("暂无订单支付记录，请稍后查询", ut+"/icen/orderdetails.html?i=" + datamessage)
			} else if(data.code==-3){
				gadget_popups("非法订单：付款金额不正确");
			}else{
				gadget_popups("订单不存在");
			};
		},
		error: function() {
			gadget_back_remove();
			gadget_popupf("查询支付记录失败，请稍后查询", ut+"/icen/orderdetails.html?i=" + datamessage)
		}
	});
};
function formsubmitli(valo,callback){
    	$("#gatget_form").remove();
    	var formlis='<form id="gatget_form" target="_blank" method="get" enctype="multipart/form-data" action="'+valo.action+'">';
    	for(var i=0;i<valo.inputs.length;i++){
    		formlis+='<input type="hidden" name="'+valo.inputs[i][0]+'" value="'+valo.inputs[i][1]+'" >';
    	};
    	formlis+='</form>';
    	$("body").append(formlis);
    	$("#gatget_form").submit();
    	if(callback){
    		callback();
    	};
   };
function vig_pic_i(sertime){
				var minleft=0;
				var minlen=0;
				var $big_pic_s=$(".big_pic_s");
				var piclenght=$big_pic_s.children("a").length;
				var maxleft=piclenght*754;
				//var min_time_left=0;
				function ser(){
					if(minleft>=maxleft){
						minleft=0;
						minlen=0;
					};
					minleft=minlen*754;
					/*if(minlen==1){
						clearInterval(setlef);
					}*/
					if(minleft>=maxleft){
						minleft=0;
						minlen=0;
					};
					$big_pic_s.animate({left:"-"+minleft+"px"},500);
					$(".vig_pic_li").children("a").removeClass("vig_pic_lia");
					$(".vig_pic_li").children("a").eq(minlen).addClass("vig_pic_lia");
					minlen=minlen+1;
				};
				var setlef=setInterval(ser,sertime);
				$(".vig_pic_li a").mouseover(function(){
					minlen=$(this).index();
					$big_pic_s.stop(false,true).animate();
					ser();
					clearInterval(setlef);
					setlef=setInterval(ser,sertime);
				});
				$(".big_pic_s img").mouseover(function(){
						
					clearInterval(setlef);
				}).mouseout(function(){
					setlef=setInterval(ser,sertime);
				});
};
function vig_pic_v(socooltime){
			var eqi=1;
			function socool(){
				var max_len=$(".vig_pic_li a").length;
				$(".big_pic_t a img").fadeOut();
				$(".vig_pic_li a").removeClass("vig_pic_lia");
				$(".big_pic_t a img").eq(eqi).fadeIn(600);
				$(".vig_pic_li a").eq(eqi).addClass("vig_pic_lia");
				eqi=eqi+1;
				if(eqi>max_len-1){
					eqi=0;
				};
			};
			var setlefs=setInterval(socool,socooltime)
				$(".big_pic_t img").mouseover(function(){
					clearInterval(setlefs);
				}).mouseout(function(){
					setlefs=setInterval(socool,socooltime);
				});
				$(".vig_pic_li a").mouseover(function(){
					eqi=$(this).index();
					socool();
					clearInterval(setlefs);
				}).mouseout(function(){
					setlefs=setInterval(socool,socooltime);
				});
};
function gadget_pay(pay_colid,pushid,callback,poptxt){
	var pay_ob;
	var pay_obs=[{"id":"11","name":"支付宝","pic":"imgeas/zhifb.png"},
				{"id":"12","name":"微信支付","pic":"imgeas/weixin.png"},
				];
	var pay_oc=[{"id":"2","name":"货到付款","pic":"imgeas/hdfkss.png"}]
				//push()
		if(pushid==1){
			pay_obs.push(pay_oc[0]);
			pay_ob=pay_obs;
		};
		if(pushid==2){
			pay_ob=pay_obs;
		};
		if(pushid==3){
			pay_ob=pay_oc;
		};
	var pay_id=0;
	var html='<div class="gadget_popups_box"><div id="gadget_pay">';
	html+='<div id="gadget_pay_top"><div id="gadget_pay_tleft"><h5>';
	if(poptxt){
		html+=poptxt;
	}else{
		html+='选择付款方式';
	};
	html+='</h5></div>';
	html+='<div id="gadget_pay_teight"><img src="'+ut+'imgeas/chac.png" /></div></div>';
	html+='<div id="gadget_pay_banner">';
	for(var i=0;i<pay_ob.length;i++){
		html+='<div class="gadgat_pay_lis ';
		if(pay_colid==pay_ob[i].id){
			html+='gadgat_pay_liscolor';
			pay_id=i;
		};
		html+='" name="'+pay_ob[i].id+'"><div class="gadget_pay_lismin"></div>';
		html+='<div class="gadget_pay_lispic"><img src="'+ut+pay_ob[i].pic+'" /></div>';
		html+='<div class="gadget_pay_listxt"><p>'+pay_ob[i].name+'</p></div></div>';
	};
	html+='</div><div id="gadget_pay_bom">';
	html+=gad_pay_l(pay_id)
	html+='<div id="gadget_pay_btnbox"><a>确 定</a></div></div></div></div>';
	$("body").append(html);
	$("#gadget_pay_teight").click(function(){
		$("#gadget_pay,.gadget_popups_box").remove();
	});
	$("#gadget_pay_banner .gadgat_pay_lis").click(function(){
		$(this).siblings().removeClass("gadgat_pay_liscolor");
		$(this).addClass("gadgat_pay_liscolor");
		$("#gadget_pay_cl").remove();
		pay_id=$(this).index();
		$("#gadget_pay_bom").append(gad_pay_l(pay_id))
	});
	$("#gadget_pay_btnbox").click(function(){
		if(!pay_ob[pay_id]){
			pay_id=0;
		};
	
		callback(pay_ob[pay_id]);
		$("#gadget_pay,.gadget_popups_box").remove();
	});
	function gad_pay_l(pay_id){
		htmc='<div class="gadgat_pay_lis gadgat_pay_liscolor" id="gadget_pay_cl" name="'+pay_ob[pay_id].id+'"><div class="gadget_pay_lismin"></div>';
		htmc+='<div class="gadget_pay_lispic"><img src="'+ut+pay_ob[pay_id].pic+'" /></div>';
		htmc+='<div class="gadget_pay_listxt"><p>'+pay_ob[pay_id].name+'</p></div></div>';
		return htmc;
	};
	
};
function footerlis(){
	if($("footer").length>0){
		$footer=$("footer");
		$("footer .zhaoysm").remove();
		$("footer .zdxihua").remove();
		//zhaoysm
	}else{
		$footer=$("#footer");
		$("#footer .zhaoysm").remove();
		$("#footer .zdxihua").remove();
	};
	var menu=[{"id":"1","name":"支付方式","url":"","child":[
	{"id":"1","name":"支付宝","url":"help.html?help=24"},
	{"id":"1","name":"信用卡","url":"help.html?help=25"},
	{"id":"1","name":"支持的支付方式","url":"help.html?help=11"}
	]},{"id":"2","name":"买家常见疑问","url":"","child":[
	{"id":"2","name":"注册","url":"help.html?help=12"}
	]},{"id":"3","name":"卖家常见疑问","url":"","child":[
	{"id":"3","name":"注册","url":"help.html?help=12"}
	]},{"id":"3","name":"评价帮助","url":"","child":[
	{"id":"3","name":"评分规则","url":"help.html?help=56"}
	]}];
	var html='';
	html+='<div class="zdxihua">';
	for(var i=0;i<menu.length;i++){
		html+='<ul><li class="zdxihuafist">';
		html+=menu[i].name;
		html+='</li>';
		for(var t=0;t<menu[i].child.length;t++){
			html+='<li><a href="';
			html+=ut+'/'+menu[i].child[t].url;
			html+='">';
			html+=menu[i].child[t].name;
			html+='</a></li>';
		};
		html+='</ul>';
	};
		html+='<ul class="zdxihlostul" ><li>全国服务热线：028-85894057</li>';
		html+='<li>服务时间：09.00-18.00</li><li>电子邮箱：zhaoyao@zhaoyaoba.com</li></ul></div>'
		html+='<div class="zhaoysm"><a href="'+ut+'/informationmore.html?u=15">关于我们</a>';
		html+='<a href="'+ut+'/informationmore.html?u=16">免责声明</a>';
		html+='<p><a href="'+ut+'/qualificationpic.html" target="_blank">(川)-非经营性-2016-0026</a>|<a>Copyright 成都照耀网络科技有限公司</a></p><p></p></div>';
	$footer.append(html);
	//028-85894057
	//zhaoyao@zhaoyaoba.com
	//192.168.
	//http://192.168.0.101:8020/login.html
	//http://192.168./cli/sellUser/getSUByDrugId/37/1/10?token=
};
function selopn(obj,l){
	var optons=[
	{"id":"1","name":"片剂"},
	{"id":"2","name":"胶囊剂"},
	{"id":"3","name":"口服液体剂"},
	{"id":"4","name":"丸剂"},
	{"id":"5","name":"颗粒剂"},
	{"id":"6","name":"口服散剂"},
	{"id":"7","name":"外用散剂"},
	{"id":"8","name":"软膏剂"},
	{"id":"9","name":"贴剂"},
	{"id":"10","name":"外用液体剂"},
	{"id":"11","name":"栓剂"},
	{"id":"12","name":"滴眼剂"},
	{"id":"13","name":"眼膏剂"},
	{"id":"14","name":"滴耳剂"},
	{"id":"15","name":"滴鼻剂"},
	{"id":"16","name":"贴膜剂"},
	{"id":"17","name":"口含片"},
	{"id":"18","name":"喷剂"},
	{"id":"19","name":"气雾剂"},
	{"id":"20","name":"吸入剂（呼吸给药）"},
	{"id":"21","name":"注射剂"},
	{"id":"22","name":"其它"}
	];
	var html='';
	for(var i=0;i<optons.length;i++){
		html+='<option>';
		html+=optons[i].name;
		html+='</option>';
	};
	obj.children("option").remove();
	obj.append(html);
	if(l){
		obj.val(l);
	};
};
function expresslook(objexpress){
	var express=[
	{"id":"1","name":"安捷快递","eg":"AJ"},
	{"id":"2","name":"安能物流","eg":"ANE"},
	{"id":"3","name":"安信达快递","eg":"AXD"},
	{"id":"4","name":"北青小红帽","eg":"BQXHM"},
	{"id":"5","name":"百福东方","eg":"BFDF"},
	{"id":"6","name":"百世快运","eg":"BTWL"},
	{"id":"7","name":"CCES","eg":"CCES快递"},
	{"id":"8","name":"城市100","eg":"CITY100"},
	{"id":"9","name":"COE东方快递","eg":"COE"},
	{"id":"10","name":"长沙创一","eg":"CSCY"},
	{"id":"11","name":"成都善途速运","eg":"CDSTKY"},
	{"id":"12","name":"德邦","eg":"DBL"},
	{"id":"13","name":"D速物流","eg":"DSWL"},
	{"id":"14","name":"大田物流","eg":"DTWL"},
	{"id":"15","name":"EMS","eg":"EMS"},
	{"id":"17","name":"快捷速递","eg":"FAST"},
	{"id":"18","name":"FEDEX联邦(国内件）","eg":"FEDEX"},
	{"id":"19","name":"FEDEX联邦(国际件）","eg":"FEDEX_GJ"},
	{"id":"20","name":"飞康达","eg":"FKD"},
	{"id":"21","name":"广东邮政","eg":"GDEMS"},
	{"id":"22","name":"共速达","eg":"GSD"},
	{"id":"23","name":"国通快递","eg":"GTO"},
	{"id":"24","name":"高铁速递","eg":"GTSD"},
	{"id":"25","name":"汇丰物流","eg":"HFWL"},
	{"id":"26","name":"天天快递","eg":"HHTT"},
	{"id":"27","name":"恒路物流","eg":"HLWL"},
	{"id":"28","name":"天地华宇","eg":"HOAU"},
	{"id":"29","name":"华强物流","eg":"hq568"},
	{"id":"30","name":"百世快递","eg":"HTKY"},
	{"id":"31","name":"华夏龙物流","eg":"HXLWL"},
	{"id":"32","name":"好来运快递","eg":"HYLSD"},
	{"id":"33","name":"京广速递","eg":"JGSD"},
	{"id":"34","name":"九曳供应链","eg":"JIUYE"},
	{"id":"35","name":"佳吉快运","eg":"JJKY"},
	{"id":"36","name":"嘉里物流","eg":"JLDT"},
	{"id":"37","name":"捷特快递","eg":"JTKD"},
	{"id":"38","name":"急先达","eg":"JXD"},
	{"id":"39","name":"晋越快递","eg":"JYKD"},
	{"id":"40","name":"加运美","eg":"JYM"},
	{"id":"41","name":"佳怡物流","eg":"JYWL"},
	{"id":"42","name":"跨越物流","eg":"KYWL"},
	{"id":"43","name":"龙邦快递","eg":"LB"},
	{"id":"44","name":"联昊通速递","eg":"LHT"},
	{"id":"45","name":"民航快递","eg":"MHKD"},
	{"id":"46","name":"明亮物流","eg":"MLWL"},
	{"id":"47","name":"能达速递","eg":"NEDA"},
	{"id":"48","name":"平安达腾飞快递","eg":"PADTF"},
	{"id":"49","name":"全晨快递","eg":"QCKD"},
	{"id":"50","name":"全峰快递","eg":"QFKD"},
	{"id":"51","name":"全日通快递","eg":"QRT"},
	{"id":"52","name":"如风达","eg":"RFD"},
	{"id":"53","name":"赛澳递","eg":"SAD"},
	{"id":"54","name":"圣安物流","eg":"SAWL"},
	{"id":"55","name":"盛邦物流","eg":"SBWL"},
	{"id":"56","name":"上大物流","eg":"SDWL"},
	{"id":"57","name":"顺丰快递","eg":"SF"},
	{"id":"58","name":"盛丰物流","eg":"SFWL"},
	{"id":"59","name":"盛辉物流","eg":"SHWL"},
	{"id":"60","name":"速通物流","eg":"ST"},
	{"id":"61","name":"申通快递","eg":"STO"},
	{"id":"62","name":"速腾快递","eg":"STWL"},
	{"id":"63","name":"速尔快递","eg":"SURE"},
	{"id":"64","name":"唐山申通","eg":"TSSTO"},
	{"id":"65","name":"全一快递","eg":"UAPEX"},
	{"id":"66","name":"优速快递","eg":"UC"},
	{"id":"67","name":"万家物流","eg":"WJWL"},
	{"id":"68","name":"万象物流","eg":"WXWL"},
	{"id":"69","name":"新邦物流","eg":"XBWL"},
	{"id":"70","name":"信丰快递","eg":"XFEX"},
	{"id":"71","name":"希优特","eg":"XYT"},
	{"id":"72","name":"新杰物流","eg":"XJ"},
	{"id":"73","name":"源安达快递","eg":"YADEX"},
	{"id":"74","name":"远成物流","eg":"YCWL"},
	{"id":"75","name":"韵达快递","eg":"YD"},
	{"id":"76","name":"义达国际物流","eg":"YDH"},
	{"id":"77","name":"越丰物流","eg":"YFEX"},
	{"id":"78","name":"原飞航物流","eg":"YFHEX"},
	{"id":"79","name":"亚风快递","eg":"YFSD"},
	{"id":"80","name":"运通快递","eg":"YTKD"},
	{"id":"81","name":"圆通速递","eg":"YTO"},
	{"id":"82","name":"亿翔快递","eg":"YXKD"},
	{"id":"83","name":"邮政平邮/小包","eg":"YZPY"},
	{"id":"84","name":"增益快递","eg":"ZENY"},
	{"id":"85","name":"汇强快递","eg":"ZHQKD"},
	{"id":"86","name":"宅急送","eg":"ZJS"},
	{"id":"87","name":"众通快递","eg":"ZTE"},
	{"id":"88","name":"中铁快运","eg":"ZTKY"},
	{"id":"89","name":"中通速递","eg":"ZTO"},
	{"id":"90","name":"中铁物流","eg":"ZTWL"},
	{"id":"91","name":"中邮物流","eg":"ZYWL"},
	{"id":"92","name":"亚马逊物流","eg":"AMAZON"},
	{"id":"93","name":"速必达物流","eg":"SUBIDA"},
	{"id":"94","name":"瑞丰速递","eg":"RFEX"},
	{"id":"95","name":"快客快递","eg":"QUICK"},
	{"id":"96","name":"城际快递","eg":"CJKD"},
	{"id":"97","name":"CNPEX中邮快递","eg":"CNPEX"},
	{"id":"98","name":"鸿桥供应链","eg":"HOTSCM"},
	{"id":"99","name":"海派通物流公司","eg":"HPTEX"},
	{"id":"100","name":"澳邮专线","eg":"AYCA"},
	{"id":"101","name":"泛捷快递","eg":"PANEX"}
	];
	if(objexpress.obj){
	var html='';
	for(var i=0;i<express.length;i++){
		html+='<option value="'+express[i].id+'">';
		html+=express[i].name;
		html+='</option>';
	};
	objexpress.obj.children("option").remove();
	objexpress.obj.append(html);
	}
	if(objexpress.l){
		obj.val(objexpress.l);
	};
	if(objexpress.id){
		for(var c=0;c<express.length;c++){
			if(express[c].id==objexpress.id){
				return express[c];
			};
		};
	};
	if(objexpress.re){
		var html='';
	for(var i=0;i<express.length;i++){
		html+='<option value="'+express[i].id+'">';
		html+=express[i].name;
		html+='</option>';
	};
		return html;
		
	};
};
function gadget_split(str,sp,num){
	var stor=str.split(sp);
	return stor[num];
};
//var child_ob={province:"四川省",city:"成都市",country:"双流县"};
//childao_lis({province:"四川省",city:"成都市",country:"双流县"})
/*<select class="more_province">
		<option value="">请选择</option>
	</select>
	<select class="more_city">
		<option value="">请选择</option>
	</select>
	<select class="more_country">
		<option value="">请选择</option>
	</select>*/
function childao_lis(child_obj) {
	$(".more_city,.more_country").hide();
	$.ajax({
		type: "get",
		url: url + "/cli/province/getAllProvinces?mintime="+new Date().getTime(),
		dataType: "json",
		async: false,
		success: function(data) {
			if(data.code == 1) {
				var html = '';
				for(var i = 0; i < data.lists.length; i++) {
					html += '<option ab="' + data.lists[i].provincecode + '">' + data.lists[i].provincename + '</option>';
				};
				$(".more_province").append(html).unbind("change").bind("change", function() {
					var childabtxt = $(this).val();
					$(".more_city,.more_country").hide();
					$(".more_city,.more_country").children("option[ab]").remove();
					if(childabtxt == "") {
						return false;
					};
					childab_lis(childabtxt);
				});
				if(child_obj) {
					if(child_obj.province != "") {
						$(".more_province").val(child_obj.province);
						childab_lis(child_obj.province)
						if(child_obj.city != "") {
							$(".more_city").val(child_obj.city);
							childabs_lis(child_obj.city);
							if(child_obj.country != "") {
								$(".more_country").val(child_obj.country);
							};
						};
					};
				};
			};
		},
		error: function() {
			console.log("失败1")
		}
	});
};
function childab_lis(childabtxt) {
	var childab = $(".more_province option:contains('" + childabtxt + "')").attr("ab");
	$.ajax({
		type: "get",
		url: url + "/cli/city/getCitiesByProvinceId/" + childab+"?mintime="+new Date().getTime(),
		dataType: "json",
		async: false,
		success: function(data) {
			if(data.code == 1) {
				var html = '';
				for(var i = 0; i < data.lists.length; i++) {
					html += '<option ab="' + data.lists[i].citycode + '">' + data.lists[i].cityname + '</option>';
				};
				$(".more_city").show();
				$(".more_city").append(html).unbind("change").bind("change", function() {
					var childabstxt = $(this).val();
					$(".more_country").hide();
					$(".more_country").children("option[ab]").remove();
					if(childabstxt == "") {
						return false;
					};
					childabs_lis(childabstxt)
				});
			};
		},
		error: function() {
			console.log("失败2")
		}
	});
}
function childabs_lis(childabstxt) {
	var childabs = $(".more_city option:contains('" + childabstxt + "')").attr("ab");
	$.ajax({
		type: "get",
		url: url + "/cli/country/getCountriesByCityid/" + childabs+"?mintime="+new Date().getTime(),
		dataType: "json",
		async: false,
		success: function(data) {
			if(data.code == 1) {
				var html = '';
				for(var i = 0; i < data.lists.length; i++) {
					html += '<option ab="' + data.lists[i].countycode + '">' + data.lists[i].countyname + '</option>';
				};
				$(".more_country").append(html);
				$(".more_country").show();
			}
		},
		error: function() {
			console.log("失败3")
		}
	});
}
function gadget_left_box_v(nx) {
	var stateurl="crelease.html";
	var hidepearr=[];
	if(nx.popstate==6){
		stateurl="releasel.html";
		hidepearr=["18"];
	};
	var box_v=[
		{"id":"0","privateid":"0","hide":"0","name":"个人中心","url":"shops.html","children":""},
		{"id":"1","privateid":"1","hide":"0","name":"用户中心","url":"","children":[
		{"id":"1","privateid":"2","name":"资料管理","url":"gdata.html"},
		{"id":"1","privateid":"3","name":"绑定手机管理","url":"isphone.html"},
		{"id":"1","privateid":"4","name":"密码管理","url":"gpass.html"},
		{"id":"1","privateid":"5","name":"成长记录","url":"grup.html"},
		{"id":"1","privateid":"6","name":"寄件人地址","url":"gcrty.html"},
		{"id":"1","privateid":"7","name":"公司简介","url":"interface.html"}]},
		{"id":"2","privateid":"8","hide":"1","name":"商铺管理","url":"","children":[
		{"id":"2","privateid":"9","name":"商铺基本设置","url":"bset.html"},
		{"id":"2","privateid":"10","name":"商铺轮播设置","url":"carousel.html"},
		{"id":"2","privateid":"11","name":"商铺推荐设置","url":"recommend.html"},
		{"id":"2","privateid":"12","name":"商铺公告设置","url":"snotice.html"},
		{"id":"2","privateid":"13","name":"商铺邮费设置","url":"postage.html"},
		{"id":"2","privateid":"14","name":"店铺收藏管理","url":"qualifications.html"}]},
		{"id":"3","privateid":"15","hide":"1","name":"商品管理","url":"","children":[
		{"id":"3","privateid":"16","name":"商品管理","url":"cmanagement.html"},
		{"id":"3","privateid":"17","name":"商品发布","url":stateurl},
		{"id":"3","privateid":"18","name":"商品审核","url":"nothrough.html"}]},
		{"id":"4","privateid":"19","hide":"1","name":"订单管理","url":"","children":[
		{"id":"4","privateid":"20","name":"新订单","url":"older.html"},
		{"id":"4","privateid":"21","name":"待处理订单","url":"overred.html"},
		{"id":"4","privateid":"22","name":"配送中订单","url":"invoice.html"},
		{"id":"4","privateid":"23","name":"已完成订单","url":"completed.html"},
		{"id":"4","privateid":"24","name":"退货处理","url":"wentback.html"},
		{"id":"4","privateid":"25","name":"评价管理","url":"equery.html"}]},
		{"id":"5","privateid":"26","hide":"1","name":"活动管理","url":"","children":[
		{"id":"5","privateid":"27","name":"特价活动","url":"soffer.html"},
		{"id":"5","privateid":"28","name":"买赠活动","url":"buyg.html"},
		{"id":"5","privateid":"29","name":"折扣活动","url":"egoods.html"},
		{"id":"5","privateid":"30","name":"全场活动","url":"fcourt.html"},
		{"id":"5","privateid":"31","name":"优惠券","url":"ispon.html"}]},
		{"id":"6","privateid":"32","hide":"1","name":"报表","url":"","children":[
		{"id":"6","privateid":"33","name":"销售报表","url":"sreport.html"},
		{"id":"6","privateid":"34","name":"活动补贴报表","url":"subsidy.html"}]},
		{"id":"7","privateid":"35","hide":"0","name":"反馈中心","url":"increment.html","children":""},
		{"id":"8","privateid":"36","hide":"1","name":"需求管理","url":"demand.html","children":""},
		{"id":"9","privateid":"37","hide":"0","name":"消息中心","url":"gnews.html","children":""},
		{"id":"10","privateid":"38","hide":"0","name":"新手指引","url":"javascript:;","children":""}
	];
	var html = '<div class="v_left_o_p"><img src="../imgeas/jiant_r.png" /></div><div class="v_left_box" dir="rtl"><ul class="v_left_o_ul">';
	for(var i = 0; i < box_v.length; i++) {
		if(box_v[i].url == "") {
			html += '<li class="v_left_t_li v_left_f_li" id="v_'+box_v[i].privateid+'"><img src="'+ut+'/imgeas/xiaj.png" />';
			html += '<a class="v_left_btn_a">';
			html += box_v[i].name;
			html += '</a>';
			html += '<ul class="v_left_s_ul">';
			for(var c = 0; c < box_v[i].children.length; c++) {
				if(hidepe(box_v[i].children[c].privateid)==true){
				html += '<li class="v_left_t_li v_left_five_li"><a ';
				if(nx.hide == 1 && box_v[i].hide == 1) {
					html += 'class="v_not_btn_a"';
				} else {
					html += ' href="' + box_v[i].children[c].url + '"';
				};
				html += '>';
				html += box_v[i].children[c].name;
				html += '</a></li>';
			};
			}
			html += '</ul></li>';
		} else {
			html += '<li class="v_left_t_li v_left_f_li v_left_sex_li" id="v_'+box_v[i].privateid+'"><a ';
			if(nx.hide == 1 && box_v[i].hide == 1) {
				html += 'class="v_not_btn_a"';
			} else {
				html += ' href="' + box_v[i].url + '"';
			};
			html += '>';
			html += box_v[i].name;
			html += '</a></li>';
		};
	};
	html += '</ul></div>';
	$("body").append(html);
	$(".v_not_btn_a").click(function() {
		alert(nx.txt);
	})
	$(".v_left_btn_a").click(function(event) {
		$(this).siblings(".v_left_s_ul").toggle();
	});
	$(".v_left_o_ul,.v_left_o_p").click(function(event) {
		event.stopPropagation();
	});
	$(".v_left_o_p").click(function() {
		$(".v_left_box").show();
	});
	$(document).click(function() {
		$(".v_left_box").hide();
	});
	$("#v_38").click(function(){
		gad_xszd_o();
	});
	function hidepe(hid){
		for(var u=0;u<hidepearr.length;u++){
			if(hid==hidepearr[u]){
				return false;
			};
		};
		return true;
	};
};
function gadget_kd_look(kd) {
	gadget_back("请稍等...");
	$.ajax({
		type: "get",
		url: url + "/other/order/queryShip?shipName=" + kd.name + "&shipCode=" + kd.code + "&time=" + new Date().getTime(),
		dataType: "json",
		success: function(data) {
			gadget_back_remove();
			data = JSON.parse(data);
			if(data.Success == true && data.State != 0) {
				var mytxt = '<table class="kd_tab_s" cellpadding="0" cellspacing="0"><thead>';
				mytxt += '<tr><th width="50px"></th><th width="160px">时间</th><th width="800px">地点和跟踪进度</th></tr>';
				mytxt += '</thead><tbody id="kd_body">';
				for(var i = 0; i < data.Traces.length; i++) {
					mytxt += '<tr><td class="kd_o_td"><a class="kd_color ';
					if(i == data.Traces.length - 1) {
						mytxt += 'kd_last_a';
					};
					mytxt += '"></a>';
					if(i != data.Traces.length - 1) {
						mytxt += '<a class="kd_hr"></a>';
					};
					mytxt += '</td><td>';
					mytxt += data.Traces[i].AcceptTime;
					mytxt += '</td><td>';
					mytxt += data.Traces[i].AcceptStation;
					mytxt += '</td></tr>';
				};
				mytxt += '</tbody></table>';
				var look_name = "物流单号：" + kd.code;
				gadget_look({
					"width": 1010,
					"height": 400,
					"name": look_name,
					"mytxt": mytxt,
					"btnnum": 1,
					"btntxt": ["确定"]
				});
			} else {
				gadget_popups(data.Reason);
			};
		},
		error: function() {
			gadget_back_remove();
			gadget_popups("网络错误，请重试");
		}
	});
};
function gad_xszd_o(){
		xszd();
		function ajax_ges_getState(token){
				$.ajax({
					type:"get",
					url:url+'/cli/sellUser/getState',
					data:{
						token:token
						},
					dataType:"json",
					success:function(data){
						if(data.code==1){
							gad_xszd_put(data);
						};
					},
					error:function(){}
				})
			};
				function ajax_gad_obj(data){
					var arr_gad={list:[]};
					var inname=data.pojo.btn;
					var cmin=0;
					var cminflag=0;
					for(var b=0;b<data.data.length;b++){
						if(data.data[b].name=="qua"){cminflag=1;};
						if(data.data[b].name=="qua"&&data.data[b].btn==2){cmin=1;};
					};
					if(cminflag==0){cmin=1;};
					var arr_lis_obj=[
						{name:"introduce",btn:1},
						{name:"Release",btn:cmin},
						{name:"shelve",btn:cmin}
					];
					for(var n=0;n<arr_lis_obj.length;n++){
						data.data.push(arr_lis_obj[n]);
					};
					for(var i=0;i<data.data.length;i++){
							arr_gad.list.push(ret_obj_s(data.data[i].name,data.data[i].btn,inname));
						};
					return arr_gad;
				};
				function xszd(){
					var token=$.cookie("peoplemessage");
					if(token==""||token==null){
						return false;
					};
					ajax_ges_getState(token);
					/*var html='<div class="gad_l_box_xszd"><div class="gad_l_box_xszd_pic"><img src="'+ut+'/imgeas/xszy (3).png" /></div><div class="gad_l_box_xszd_txt"><p>新手指导</p></div></div>';
					$("body").append(html);
					$(".gad_l_box_xszd").mouseenter(function(){
						$(".gad_l_box_xszd_txt").show();
					}).mouseleave(function(){
						$(".gad_l_box_xszd_txt").hide();
					}).click(function(){
						ajax_ges_getState(token)
						
					});*/
				};
				function gad_xszd_put(data){
					var html='<div class="gad_l_box_topbox"><div class="gad_l_box_topbox_t"><div class="gad_l_box_tit_t">';
					html+='<div class="gad_l_box_tit_tit"><h5>';
					html+='新手指导';
					html+='</h5></div>';
					html+='<div class="gad_l_box_tit_remove"><img src="'+ut+'/imgeas/xxx.png" /></div></div><div class="gad_l_box_bombox_txt">';
					html+=gad_xszd_html(ajax_gad_obj(data));
					html+='</div></div></div>';
					$("body").append(html);
					$(".gad_l_box_tit_remove").click(function(){
						$(".gad_l_box_topbox").remove();
						if($.cookie("xszdtype")!=1){
							$.cookie("xszdtype",1,{path:"/"});
							$(".v_left_box").show();
						};
						event.stopPropagation();
					});
				};
				
				function gad_xszd_html(ovo){
					var html='';
					html+='<table width="100%" cellpadding="0" cellspacing="0"><colgroup>';
					html+='<col width="500"/></colgroup><tbody class="gad_l_box_bombox_tvody">';
					for(var i=0;i<ovo.list.length;i++){
						html+='<tr>';
						html+='<td ';
						if(ovo.list[i].colspan==1){
							html+='colspan=2';
						};
						html+='>';
						html+=ovo.list[i].name;
						if(ovo.list[i].describe&&ovo.list[i].describe!=""){
							if(ovo.list[i].name!=''){
								html+='<br>';
							};
							html+='<span>'+ovo.list[i].describe+'</span>';
						};
						html+='</td>';
						if(ovo.list[i].colspan==0){
							html+='<td>';
							if(ovo.list[i].name!=""){
								html+='<a class="gad_l_box_btn ';
								if(ovo.list[i].btn==0){html+='gad_l_box_btn_r';};
								if(ovo.list[i].btn==2){html+='gad_l_box_btn_n';};
								html+='" href="';
								if(ovo.list[i].path&&ovo.list[i].path!=""&&ovo.list[i].btn!=0){
									html+=ovo.list[i].path;
								}else{
									html+='javascript:;';
								};
								html+='">';
								html+=ovo.list[i].btntxt;
								html+='</a>';
							};
							html+='</td>';
						};
						html+='</tr>';
					};
					html+='</tbody></table>';
					return html;
				};
				function ret_obj_s(name,btn,inname){
					var quaobj={};
					quaobj.btn=btn;
						switch(name)
							{
							case "qua":
  								//资质
  								quaobj.name="上传资质";
  								quaobj.path=ut+"/merchant/prompt.html";
  								if(btn==0){
  									quaobj.describe="[重要]资质审核通过后方能进行店铺操作";
  									quaobj.btntxt="待完成";
  									quaobj.colspan=0;
  								};
  								if(btn==1){
  									quaobj.describe="[重要]资质审核通过后方能进行店铺操作";
  									quaobj.btntxt="去完成";
  									quaobj.colspan=0;
  								};
  								if(btn==2){
  									quaobj.describe="已通过审核，如无法使用功能请 <a href='"+ut+"/login.html'>[重新登录]</a>";
  									quaobj.btntxt="已完成";
  									quaobj.colspan=0;
  									$.cookie("peoplestate",6,{path:"/"});
  								};
  								break;
							case "post":
  								// 邮费
  								quaobj.name="设置邮费";
  								quaobj.path=ut+"/merchant/postage.html";
  								if(btn==0){
  									quaobj.describe="[重要]资质审核通过后方能进行操作";
  									quaobj.btntxt="待完成";
  									quaobj.colspan=0;
  								};
  								if(btn==1){
  									quaobj.describe="[重要]请设置店铺邮费";
  									quaobj.btntxt="去完成";
  									quaobj.colspan=0;
  								};
  								if(btn==2){
  									quaobj.describe="已设置店铺邮费";
  									quaobj.btntxt="已完成";
  									quaobj.colspan=0;
  								};
  								break;
  							case "store":
  								// 店铺基本设置
  								quaobj.name="店铺基本设置";
  								quaobj.path=ut+"/merchant/bset.html";
  								if(btn==0){
  									quaobj.describe="[重要]资质审核通过后方能设置店铺名";
  									quaobj.btntxt="待完成";
  									quaobj.colspan=0;
  								};
  								if(btn==1){
  									quaobj.describe="[重要]请设置店铺名";
  									quaobj.btntxt="去完成";
  									quaobj.colspan=0;
  								};
  								if(btn==2){
  									quaobj.describe="已设置店铺名";
  									quaobj.btntxt="已完成";
  									quaobj.colspan=0;
  								};
  								break;
  							case "sState":
  								// 邮费
  								quaobj.name="开启店铺";
  								quaobj.path=ut+"/merchant/shops.html";
  								if(btn==0){
  									quaobj.describe="[重要]店铺设置后即可开启店铺";
  									quaobj.btntxt="待完成";
  									quaobj.colspan=0;
  								};
  								if(btn==1){
  									quaobj.describe="[重要]现在可以开启店铺啦";
  									quaobj.btntxt="去完成";
  									quaobj.colspan=0;
  								};
  								if(btn==2){
  									quaobj.describe="店铺已开启";
  									quaobj.btntxt="已完成";
  									quaobj.colspan=0;
  								};
  								break;
  							case "sImg":
  								// 上传店铺图片
  								quaobj.name="上传店铺图片";
  								quaobj.path=ut+"/merchant/shoppic.html";
  								if(btn==0){
  									quaobj.describe="";
  									quaobj.btntxt="待完成";
  									quaobj.colspan=0;
  								};
  								if(btn==1){
  									quaobj.describe="";
  									quaobj.btntxt="去完成";
  									quaobj.colspan=0;
  								};
  								if(btn==2){
  									quaobj.describe="";
  									quaobj.btntxt="已完成";
  									quaobj.colspan=0;
  								};
  								break;
  							case "storeInf":
  								// 基本信息设置
  								quaobj.name="基本信息设置";
  								quaobj.path=ut+"/merchant/gdata.html";
  								if(btn==0){
  									quaobj.describe="";
  									quaobj.btntxt="待完成";
  									quaobj.colspan=0;
  								};
  								if(btn==1){
  									quaobj.describe="";
  									quaobj.btntxt="去完成";
  									quaobj.colspan=0;
  								};
  								if(btn==2){
  									quaobj.describe="";
  									quaobj.btntxt="已完成";
  									quaobj.colspan=0;
  								};
  								break;
  								//cmin 0 1 {name:"Release",btn:cmin},{name:"shelve",btn:cmin},{name:"introduce",btn:1}
  								//Release 发布商品  shelve 上架商品 introduce 简介
  								// cm 1 中药厂商 -1非中药厂商
  							case "Release":
  								// 发布商品
  								quaobj.name="发布商品";
  								if(inname==1){
  									quaobj.path=ut+'/merchant/releasel.html';
  								}else{
  									quaobj.path=ut+"/merchant/crelease.html";
  								}
  								if(btn==0){
  									quaobj.describe="资质审核通过后方能发布商品";
  									quaobj.btntxt="待发布";
  									quaobj.colspan=0;
  								};
  								if(btn==1){
  									quaobj.describe="";
  									quaobj.btntxt="去发布";
  									quaobj.colspan=0;
  								};
  								break;	
  							case "shelve":
  								// 上架商品
  								quaobj.name="上架商品";
  								quaobj.path=ut+'/merchant/cmanagement.html';
  								if(btn==0){
  									quaobj.describe="资质审核通过后方能上架商品";
  									quaobj.btntxt="待完成";
  									quaobj.colspan=0;
  								};
  								if(btn==1){
  									quaobj.describe="";
  									quaobj.btntxt="去上架";
  									quaobj.colspan=0;
  								};
  								break;	
  							case "introduce":
  								// 编写公司简介
  								quaobj.name="编写公司简介";
  								quaobj.path=ut+'/merchant/interface.html';
  								if(btn==1){
  									quaobj.describe="";
  									quaobj.btntxt="去编写";
  									quaobj.colspan=0;
  								};
  								break;
							default:
  								//n 与 case 1 和 case 2 不同时执行的代码
							}
							return quaobj;
				};
			}