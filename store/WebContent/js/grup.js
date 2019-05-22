$(function(){
	jQuery.support.cors = true;
		var token=$.cookie('peoplemessage');
		var str=10;
		//console.log(token)
	$.ajax({
		type:"GET",
		url:url+"/cli/sellExp/getMyExp/1/"+str+"?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="togert"><div class="togeromin"><p>';
					html+=data.lists[i].time;
					html+='</p></div><div class="togeromin"><p>';
					html+=data.lists[i].exp;
					html+='</p></div><div class="togeromin"><p>';
					html+=data.lists[i].afterchangeexp;
					html+='</p></div><div class="togeromin togeromila"><p>';
					html+=data.lists[i].expsource;
					html+='</p></div></div>';
				};
				$(".togero").after(html);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
				$("#grunub").html(st);
				
				var other=data.other;
				
				var offer="1%"
				if(other==0){
					$(".togrmin").css("width",offer)
					$("#othe").html(other);
					$("#coyhe").html("1");
					html='<i class="iconfont"><img src="../imgeas/chushi.png"></i> ';
					$(".togl p").after(html)
				};
				if(other>=1&&other<=250){
					$(".togrmin").css("background-color","#f34f08")
					if(other>=1&&other<=10){
						offer=other/10*100+"%";
						ender=11-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						$(".togl p").after(html)
					};
					if(other>=11&&other<=40){
						offer=other/40*100+"%";
						ender=41-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						$(".togl p").after(html)
					};
					if(other>=41&&other<=90){
						offer=other/90*100+"%";
						ender=91-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						$(".togl p").after(html)
					};
					if(other>=91&&other<=150){
						offer=other/150*100+"%";
						ender=151-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						$(".togl p").after(html)
					};
					if(other>=151&&other<=250){
						offer=other/250*100+"%";
						ender=251-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/xinxing.png"></i> ';
						$(".togl p").after(html)
					};
				};
				if(other>=251&&other<=10000){
					$(".togrmin").css("background-color","#499db5")
					if(other>=251&&other<=500){
						offer=other/500*100+"%";
						ender=501-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=501&&other<=1000){
						offer=other/1000*100+"%";
						ender=1001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=1001&&other<=2000){
						offer=other/2000*100+"%";
						ender=2001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=2001&&other<=5000){
						offer=other/5000*100+"%";
						ender=5001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=5001&&other<=10000){
						offer=other/10000*100+"%";
						ender=10001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/zuanshi.png"></i> ';
						$(".togl p").after(html);
					};
				};
				if(other>=10001&&other<=500000){
					$(".togrmin").css("background-color","#47a0fe")
					if(other>=10001&&other<=20000){
						offer=other/20000*100+"%";
						ender=20001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=20001&&other<=50000){
						offer=other/50000*100+"%";
						ender=50001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=50001&&other<=100000){
						offer=other/100000*100+"%";
						ender=100001-other;
						$(".togrmin").css("width",offer);
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=100001&&other<=200000){
						offer=other/200000*100+"%";
						ender=200001-other;
						$(".togrmin").css("width",offer);
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=200001&&other<=500000){
						offer=other/500000*100+"%";
						ender=500001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/huangguan.png"></i> ';
						$(".togl p").after(html);
					};
				};
				if(other>=500001){
					$(".togrmin").css("background-color","#e36d30")
					if(other>=500001&&other<=1000000){
						offer=other/1000000*100+"%";
						ender=1000001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=1000001&&other<=2000000){
						offer=other/2000000*100+"%";
						ender=2000001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=2000001&&other<=5000000){
						offer=other/5000000*100+"%";
						ender=5000001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=5000001&&other<=10000000){
						offer=other/10000000*100+"%";
						ender=10000001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=10000001&&other<=20000000){
						offer=other/20000000*100+"%";
						ender=20000001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						$(".togl p").after(html);
					};
					if(other>=20000001&&other<=90000000){
						offer=other/90000000*100+"%";
						ender=90000001-other;
						$(".togrmin").css("width",offer)
						$("#othe").html(other);
						$("#coyhe").html(ender);
						html='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						html+='<i class="iconfont"><img src="../imgeas/jinguan.png"></i> ';
						$(".togl p").after(html);
					};
				};
				
				
			}else{
				$(".togerlis").hide();
				if(data.other==0){
					var other=data.other;
					$(".togrmin").css("width","5%");
					$("#othe").html(other);
					$("#coyhe").html("1");
					html='<i class="iconfont"><img src="../imgeas/chushi.png"></i> ';
					$(".togl p").after(html);
				};
				
			}
		},
		error:function(){
			
		}
	});
	//上一页
	$("#togist").click(function(){
		var togisb=$("#togisna").html();
		var ono=parseInt(togisb)-1;
		if(ono<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
		type:"GET",
		url:url+"/cli/sellExp/getMyExp/"+ono+"/"+str+"?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$(".togert").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="togert"><div class="togeromin"><p>';
					html+=data.lists[i].time;
					html+='</p></div><div class="togeromin"><p>';
					html+=data.lists[i].exp;
					html+='</p></div><div class="togeromin"><p>';
					html+=data.lists[i].afterchangeexp;
					html+='</p></div><div class="togeromin togeromila"><p>';
					html+=data.lists[i].expsource;
					html+='</p></div></div>';
				};
				$(".togero").after(html);
				$("#togisna").html(parseInt($("#togisna").html())-1)
			}else{
				gadget_popupt("请求失败.")
			}
		},
		error:function(){
			gadget_popupt("请求失败")
		}
	});
		
	})
	//下一页
	$("#togisb").click(function(){
		
		var togisb=$("#togisna").html()
		if(togisb==$("#grunub").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		var ono=parseInt(togisb)+1;
		$.ajax({
		type:"GET",
		url:url+"/cli/sellExp/getMyExp/"+ono+"/"+str+"?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$(".togert").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="togert"><div class="togeromin"><p>';
					html+=data.lists[i].time;
					html+='</p></div><div class="togeromin"><p>';
					html+=data.lists[i].exp;
					html+='</p></div><div class="togeromin"><p>';
					html+=data.lists[i].afterchangeexp;
					html+='</p></div><div class="togeromin togeromila"><p>';
					html+=data.lists[i].expsource;
					html+='</p></div></div>';
				};
				$(".togero").after(html);
				$("#togisna").html(parseInt($("#togisna").html())+1)
			}else{
				gadget_popupt("请求失败.")
			}
		},
		error:function(){
			gadget_popupt("请求失败")
		}
	});
	})
	//跳转
	$("#jump").click(function(){
		var ono=$(".togerismip input[type='number']").val();
		if(ono>$("#grunub").html()){
			ono=$("#grunub").html();
		};
		if(ono<1){
			ono=1;
		};
		
		$.ajax({
		type:"GET",
		url:url+"/cli/sellExp/getMyExp/"+ono+"/"+str+"?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$(".togert").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="togert"><div class="togeromin"><p>';
					html+=data.lists[i].time;
					html+='</p></div><div class="togeromin"><p>';
					html+=data.lists[i].exp;
					html+='</p></div><div class="togeromin"><p>';
					html+=data.lists[i].afterchangeexp;
					html+='</p></div><div class="togeromin togeromila"><p>';
					html+=data.lists[i].expsource;
					html+='</p></div></div>';
				};
				$(".togero").after(html);
				$("#togisna").html(ono)
			}else{
				gadget_popupt("请求失败.")
			}
		},
		error:function(){
			gadget_popupt("请求失败")
		}
	});
		
		
	})
})
