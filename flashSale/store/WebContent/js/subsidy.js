$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	var state=2;
	var actName="";
//1 已结算 0可以结算 -1不可结算 2全部
$("#ser_a_top_t").click(function(){
	open=1;
	state=$("#sidy_op").val();
	actName=$("#mytext").val();
	get_data_l();
});

//下一页
$("#cmaismop").click(function(){
	open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
	get_data_l();
});
//上一页
$("#cmaismpa").click(function(){
	open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
	get_data_l();
});
//跳转
$("#ismytzan").click(function(){
	open=$(".cmaisp input[type='number']").val()
		if(open==""){
			return false;
		};
		if(open>$("#ismyipik").html()){
			open=$("#ismyipik").html();
		};
		if(open<"1"){
			open="1";
		};
	get_data_l();
});
get_data_l();
function get_data_l(){
	gadget_back("请稍等...");
	$("#my_tbody tr").remove();
	$.ajax({
		type:"get",
		url:url+"/cli/SA/getJoinActAndState/"+open+"/"+str+"?token="+token+"&state="+state+"&actName="+actName+"&time="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_back_remove();
			gadget_login(data);
			if(data.code==1){
				$(".cmaisp").show();
				gadget_m_remv($(".sublist"));
				get_idylis(data);
				var st="";
					st=data.other/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html(open);
			}else{
				//没有
				$(".cmaisp").hide();
				gadget_err_m("没有数据",$(".sublist"),"40px");
			};
		},
		error:function(){
			//失败
			$(".cmaisp").hide();
			gadget_back_remove();
			gadget_err_m("网络错误，请刷新重试",$(".sublist"),"40px");
		}
	});
}

function get_idylis(data){
	
	$("#my_tbody tr").remove();
	var html='';
	for(var i=0;i<data.lists.length;i++){
		html+='<tr><td class="ismyman" name="'+data.lists[i].activityid+'">查看详情</td><td class="ismy_name">';
		html+=data.lists[i].simpledesc;
		html+='</td><td>';
		html+=data.lists[i].enddate;
		html+='</td><td>';
		if(data.lists[i].type==3){
			html+="秒杀活动";
		}else{
			html+="--";
		};
		html+='</td><td>';
		//1 已经结算0可以结算-1不能结算
		if(data.lists[i].isBalance==1){
			html+='已结算';
		};
		if(data.lists[i].isBalance==0){
			html+='待结算';
		};
		if(data.lists[i].isBalance==-1){
			html+='不可结算';
		};
		html+='</td>';
		html+='<td>';
		if(data.lists[i].isBalance==1){
			html+='已结算';
		}else{
			html+='未结算';
		};
		html+='</td></tr>';
	};
	$("#my_tbody").append(html);
	$(".ismy_name").mouseover(function(){
		$(this).hide();
		$(this).siblings(".ismyman").show();
	});
	$(".ismyman").mouseleave(function(){
		$(this).hide();
		$(this).siblings(".ismy_name").show();
	});
	$(".ismyman").click(function(){
		var nametxt=$(this).siblings(".ismy_name").html();
		var idm=$(this).attr("name");
		get_one_l(idm,nametxt);
	});
};

function get_one_l(idm,nametxt){
	gadget_back("请稍等...");
	$.ajax({
		type:"get",
		url:url+"/cli/SA/getJoinActDrugs/"+idm+"?token="+token+"&time="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_back_remove();
			gadget_login(data);
			if(data.code==1){
				var myhtml='<table cellpadding="0" cellspacing="0" id="mttabl">';
				myhtml+='<thead><tr><th colspan="5">合计补贴金额：'+ret_lis(data,0)+'元</th></tr><tr><th>订单号</th><th>商品名</th><th>销售数量</th>';
				myhtml+='<th>补贴单价(元)</th><th>补贴合计(元)</th></tr></thead><tbody>';
				myhtml+=ret_lis(data,1);
				myhtml+='</tbody></table>';
				gadget_look({
					width:1000,
					height:500,
					name:nametxt,
					mytxt:myhtml,
					btnnum:1,
					btntxt:["确定"]
				});
			}else{
				gadget_popupt("没有数据");
			};
		},
		error:function(){
			gadget_back_remove();
			gadget_popupt("网络错误，请刷新重试");
		}
	});
}
function ret_lis(data,al){
	var html='';
	var rmb=0;
	for(var c=0;c<data.lists.length;c++){
		html+='<tr><td>';
		html+=data.lists[c].ordercode;
		html+='</td><td>';
		html+=data.lists[c].drugname;
		html+='</td><td>';
		html+=data.lists[c].num;
		html+='</td><td>';
		html+=data.other;
		html+='</td><td>';
		html+=Number(data.other)*Number(data.lists[c].num);
		rmb+=Number(data.other)*Number(data.lists[c].num);
		html+='</td></tr>';
	};

if(al==1){
	return html;
}else{
	return rmb;
}
	
	
};
})
