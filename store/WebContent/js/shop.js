$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var open=1;
	var str=10;
	//商铺列表
	$.ajax({
		type:"get",
		url:url+"/cli/sellUser/getRecomondStore/"+open+"/"+str+"?token="+token+"&mintine="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				
				storelis(data);
				$(".cmaisp").show();
				var st="";
					st=Number(data.message)/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				gadget_popupt("暂无列表");
			};
		},
		error:function(){
			gadget_popupt("获取失败，请刷新重试");
		}
	});
//商铺推荐
$.ajax({
	type:"get",
	url:url+"/cli/sellUser/getHotStore",
	dataType:"json",
	success:function(data){
		gadget_login(data);
		if(data.code==1){
			var hml='';
			for(var i=0;i<data.lists.length;i++){
				hml+='<div class="shoplisri"><p class="boldp"><a href="shopdetails.html?us='+data.lists[i].selluserid+'">';
				hml+=data.lists[i].sellername;
				hml+='</a></p>';
				var other=data.lists[i].experiencevalue;
				hml+=expsn(other);
				hml+='<p>商品描述<span>';
				if(data.lists[i].avgscore==""||data.lists[i].avgscore==null||data.lists[i].avgscore==undefined){
						hml+='--';
						hml+='</span>物流评分：<span>';
						hml+='--';
						hml+='</span>服务评分：<span>';
						hml+='--';
					}else{
						var avgscore=data.lists[i].avgscore.split(",");
						hml+=avgscore[2];
						hml+='</span>物流评分：<span>';
						hml+=avgscore[0];
						hml+='</span>服务评分：<span>';
						hml+=avgscore[1];
					};
				hml+='</span></p></div>';
			};
			$("#shoptop").append(hml);
		};
	},
	error:function(){
		
	}
	
});
	//下一页
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getRecomondStore/"+open+"/"+str+"?token="+token+"&mintine="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					storelis(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("暂无列表");
				}
			},
			error:function(){
				gadget_popupt("获取失败，请刷新重试");
			}
		});
	});
	//上一页
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getRecomondStore/"+open+"/"+str+"?token="+token+"&mintine="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					storelis(data);
					$("#isdangq").html(open);
				}else{
					gadget_popupt("暂无列表");
				}
			},
			error:function(){
					gadget_popupt("获取失败，请刷新重试");
			}
		});
	});	
	//跳转
	$("#ismytzan").click(function(){
		open=Number($(".cmaisp input[type='number']").val())
		if(open==""){
			return false;
		};
		if(open>$("#ismyipik").html()){
			open=$("#ismyipik").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellUser/getRecomondStore/"+open+"/"+str+"?token="+token+"&mintine="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					storelis(data);
					$("#isdangq").html(open);
				}else{
					gadget_popupt("暂无列表");
				};
			},
			error:function(){
					gadget_popupt("获取失败，请刷新重试");
			}
		});
	});	



function storelis(data){
	$(".shoplist").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="shoplist"><div class="shopnam"><h5><a href="shopdetails.html?us='+data.lists[i].selluserid+'">';
					if(data.lists[i].sellername==null||data.lists[i].sellername==undefined){
						data.lists[i].sellername="--";
					};
					html+=data.lists[i].sellername;
					html+='</a>';
					var other=data.lists[i].experiencevalue;
					html+=expsn(other);
					
					html+='</h5><p>商品描述<span>';
					
					if(data.lists[i].avgscore==""||data.lists[i].avgscore==null||data.lists[i].avgscore==undefined){
						html+='--';
						html+='</span>物流评分：<span>';
						html+='--';
						html+='</span>服务评分：<span>';
						html+='--';
					}else{
						var avgscore=data.lists[i].avgscore.split(",");
						html+=avgscore[2];
						html+='</span>物流评分：<span>';
						html+=avgscore[0];
						html+='</span>服务评分：<span>';
						html+=avgscore[1];
					};
					html+='</span>';
					if(data.lists[i].state!=61){
						html+='<span class="spancolor">暂停营业</span>';
					};
					
					html+='</p></div><div class="shopcar">';
					if(data.lists[i].drugs==""||data.lists[i].drugs==null||data.lists[i].drugs==undefined){
						html+='<p class="colorp">暂无商品</p>';
					}else{
						var ag=5;
						if(data.lists[i].drugs.length<=ag){
							ag=data.lists[i].drugs.length;
						};
						for(var c=0;c<ag;c++){
							html+='<div class="detlis"><div class="pictop">';
							html+='<a href="Product.html?drugid='+data.lists[i].drugs[c].drugid+'&selluserid='+data.lists[i].drugs[c].selluserid+'"><img src="';
							var listimgo=data.lists[i].drugs[c].listimg.split(";");
							html+=listimgo[0];
							html+='" /></a></div><p class="pbold"><a href="Product.html?drugid='+data.lists[i].drugs[c].drugid+'&selluserid='+data.lists[i].drugs[c].selluserid+'">';
							html+=data.lists[i].drugs[c].aliascn;
							html+='</a></p><p>';
							html+=data.lists[i].drugs[c].specification;
							html+='</p><p>';
							html+=data.lists[i].drugs[c].manufacturer;
							html+='</p></div>';
						};
					};
					html+='<p style="clear: both;"></p></div></div>';
				};
				$(".cmaisp").before(html);
			$('html,body').animate({scrollTop:$("body").offset().top}, 500);
}

function expsn(other){
		var html='';
					if(other==0){
						html+='<img src="imgeas/chushi.png">';
					};
				if(other>=1&&other<=250){
					if(other>=1&&other<=10){
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=11&&other<=40){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=41&&other<=90){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=91&&other<=150){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=151&&other<=250){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
				};
				if(other>=251&&other<=10000){
					if(other>=251&&other<=500){
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=501&&other<=1000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=1001&&other<=2000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=2001&&other<=5000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=5001&&other<=10000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
				};
				if(other>=10001&&other<=500000){
					if(other>=10001&&other<=20000){
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=20001&&other<=50000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=50001&&other<=100000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=100001&&other<=200000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=200001&&other<=500000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
				};
				if(other>=500001){
					if(other>=500001&&other<=1000000){
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=1000001&&other<=2000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=2000001&&other<=5000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=5000001&&other<=10000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=10000001&&other<=20000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=20000001&&other<=90000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
				};
				return html;
	};

})
