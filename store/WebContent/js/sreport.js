$(function(){
	jQuery.support.cors = true;
		var token=$.cookie('peoplemessage');
		var month=new Date().getMonth()+1;
		var years=new Date().getFullYear();
		var dataty=0;
		var payType=0;
	if(document.all){ 
		$("#ser_a_top_s").click(function(){
			getXlsFromTbl('tableExcel','myDiv');
		});
	}else{ 
		$("#ser_a_top_s").click(function(){
			method5('tableExcel')
		});
	};
	$("#tima").append(seltli(2015,years,"年"));
	$("#timb,#timd").append(seltli(1,12,"月"));
	$("#tima").val(years);
	$("#timb,#timd").val(month);
	getlis();
	$("#timd").change(function(){
		if(Number($(this).val())<Number($("#timb").val())){
			$(this).val($("#timb").val())
		};
	});
	$("#timb").change(function(){
		if(Number($(this).val())>Number($("#timd").val())){
			$("#timd").val($(this).val())
		};
	});
	$("#ser_a_top_t").click(function(){
		month="";
		years="";
		years=$("#tima").val();
		var yearmo=years.split(",");
		month=numli($("#timb").val(),$("#timd").val());
		dataty=$("#timf").val();
		payType=$("#timh").val();
		getlis();
	});
function getlis(){
$("#therd").html("");
gadget_back("请稍等...");
remlis(1);
	$.ajax({
		type:"get",
		url:url+"/cli/order/querySellBalanceOrder/"+dataty+"/"+payType+"?token="+token+"&year="+years+"&month="+month+"&time="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_back_remove();
			gadget_login(data);
			if(data.code==1){
				data=re_data_a(data);
				tableli(data);
				morermb(data);
				remlis(2);
			}else{
				gadget_err_m("暂无数据",$(".thisdiv"),"80px");
				remlis(1);
			};
		},
		error:function(){
			gadget_back_remove();
			gadget_err_m("网络错误，请刷新重试",$(".thisdiv"),"80px");
			remlis(1);
		}
	});
};

function tableli(data){
	var html='';
	for(var i=0;i<data.lists.length;i++){
		html+='<tr>';
		html+='<td class="ismyman">';
		if(data.lists[i].payment<0){
			html+="退款订单";
		}else{
			html+="普通订单";
		};
		html+=data.lists[i].ordercode;
		html+='</td><td>';
		if(data.lists[i].endtime){
			html+=data.lists[i].endtime;
		}else{
			html+='订单未结束';
		};
		html+='</td><td>';
		
		if(data.lists[i].state==0){
			html+='新订单';
		};
		if(data.lists[i].state==1){
			html+='待发货';
		};
		if(data.lists[i].state==-1){
			html+='买家取消';
		};
		if(data.lists[i].state==-2){
			html+='卖家取消';
		};
		if(data.lists[i].state==2){
			html+='配送中';
		};
		if(data.lists[i].state==-3){
			html+='订单锁定';
		};
		if(data.lists[i].state==3){
			html+='等待评价';
		};
		if(data.lists[i].state==6){
			html+='已完成';
		};
		if(data.lists[i].state==7){
			html+='已评价';
		};
		html+='</td><td>';
		html+=data.lists[i].payment;
		html+='</td><td>';
		if(data.lists[i].paymenttype==11){
			html+="支付宝付款";
		};
		if(data.lists[i].paymenttype==12){
			html+="微信支付";
		};
		if(data.lists[i].paymenttype==2){
			html+="货到付款";
		};
		html+='</td><td>';
		html+=gettxt_n(data,1,i);
		html+='</td><td>';
		html+=gettxt_n(data,0,i);
		html+='</td></tr>';
	};
	$("#mytbody").append(html);
};
function re_data_a(data){
	for(var i=0;i<data.lists.length;i++){
		var data_ordercode=data.lists[i].ordercode.split("_");
		data_ordercode=data_ordercode[0];
		for(var c=0;c<data.lists.length;c++){
			if(data_ordercode==data.lists[c].ordercode){
					data.lists[i].isbalance=data.lists[c].isbalance;
			};
		};
	};
	return data;
};
function gettxt_n(data,lo,i){
	var txt_t="";
	var txt_n="";
	if(data.lists[i].payment<0){
			txt_n="退款";
		}else{
			txt_n="结算";
		};
	if(lo==0){
		if(data.lists[i].isbalance==1){
			txt_t="已结算";
		}else{
			if(data.lists[i].hasaftersale>0){
				txt_t="订单有售后,暂不能结算";
			}else if(data.lists[i].hasaftersale==0){
				txt_t="订单待确认,等待结算";
			}else if(data.lists[i].hasaftersale==-1){
				txt_t="订单已确认,等待结算";
			}else{
				txt_t="其他,等待结算";
			};
		};
	};
	if(lo==1){
		if(data.lists[i].hasaftersale==-1&&data.lists[i].isbalance!=1&&data.lists[i].paymenttype!=2){
			txt_t='可结算';
		}else if(data.lists[i].hasaftersale==-1&&data.lists[i].isbalance==1){
			txt_t='不可结算';
		}else{
			if(data.lists[i].paymenttype==2){
				txt_t='不可结算';
			}else{
				txt_t='等待结算';
			};
		};
	};
	return txt_t;
};


function remlis(bg){
		switch (bg){
			case 1:
				$("#mytbody tr").remove();
				$(".cmaisp").hide();
				break;
			case 2:
				gadget_m_remv($(".thisdiv"))
				$(".cmaisp").show();
				break;
		};
	};
function morermb(data){
	var rmba=0;//总计
	var rmbb=0;//未结算
	var rmbc=0;//已结算
	var rmbd=0;//佣金
	var rmbe=0;//应结算
	var l=Number(data.other);//佣金比例
	for(var c=0;c<data.lists.length;c++){
		if(data.lists[c].hasaftersale==-1&&data.lists[c].paymenttype!=2){
			//等待结算  在线支付
			//可以结算
			if(data.lists[c].isbalance!=1){
				rmba+=data.lists[c].payment;
				//isBalance!=1 没有结算
				rmbb+=data.lists[c].payment;
			}else{
				//isBalance=1 已经结算
				rmbc+=data.lists[c].payment;
			};
		};
	};
	rmba=rmba.toFixed(2);
	rmbb=rmbb.toFixed(2);
	rmbc=rmbc.toFixed(2);
	rmbd=(rmbb*l).toFixed(2);
	rmbe=(rmbb-rmbd).toFixed(2);
	var txt_m='总计可结算金额：'+rmba+'元 未结算：'+rmbb+'元   已结算：'+rmbc+'元  应扣除佣金：'+rmbd+'元  应结算：'+rmbe+'元';
	$("#therd").html(txt_m);
};
})
