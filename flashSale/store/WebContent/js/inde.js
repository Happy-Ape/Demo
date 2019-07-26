$(function(){
	
	if(window.screen.width<1869){
		$(".bodycity").css("left","10%");
	};
	if(window.screen.width<1644){
		$(".bodycity").css("left","5%");
	};
	if(window.screen.width<1455){
		$(".bodycity").css("left","0%");
	};
	 
	if(window.screen.width<1297){
		$(".bodycity").hide();
	};
	jQuery.support.cors = true;
	$('html,body').animate({scrollTop:$("body").offset().top}, 500);
	
	var url="http://localhost:8080/zybb2b";

	topurl=url+"/cli/drug/getCategory/";
	twourl=url+"/cli/drug/getTwoThreeCategory/";
	var tyop="";
	var adcid="";
	var sid="";
	var arrid=[];
	var name="";
		ads();  //1
		
function ads(){
         $.ajax({
         	type:"post",
            url:topurl+"0?mintime="+new Date().getTime(),
            dataType: "json",
            success: function(data){
            	var html;
            	for(var i=0;i<data.lists.length;i++){
            		
            		html='<li class="fenlifi" name="'+data.lists[i].cateid+'"><i class="heafots">&#xe'+data.lists[i].remark+';</i>';
            		html+='<a href="classification.html?i='+data.lists[i].cateid+'" target="_blank" name="';
            		html+=data.lists[i].cateid;
            		html+='">';
            		html+=data.lists[i].catename;
            		html+='</a><div class="heafotxx"><h4 class="heafothfo">';
            		html+='<a href="classification.html?i='+data.lists[i].cateid+'" target="_blank" name="';
            		html+=data.lists[i].cateid;
            		html+='">'
            		html+=data.lists[i].catename;
            		html+='</a></h4>';
            		html+='</div></li>';
            		$("#heafenul").append(html);
            		console.log(html)
            		var adcid=data.lists[i].cateid;
            		arrid.push(adcid);
	}
            	$(".fenlifi").mouseenter(function(){
						$(this).children(".heafotxx").show();
						var sid=$(this).attr("name");
						$(".liuliuo").remove();
						$.ajax({
			type:"GET",
			url:twourl+sid,
			data:{mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				
				for(var i=0;i<data.lists.length;i++){
					html='<ul class="liuliuo"><li class="heafotxxli"><p>';
					html+='<a href="classification.html?i='+data.lists[i].cateid+'" target="_blank" name="';
					html+=data.lists[i].cateid;
					html+='">';
					html+=data.lists[i].catename;
					html+='</a></p>';
					for(var b=0;b<data.lists[i].childCategory.length;b++){
						html+='<a href="classification.html?i='+data.lists[i].cateid+'" target="_blank" name="';
						html+=data.lists[i].childCategory[b].cateid;
						html+='">';
						html+=data.lists[i].childCategory[b].catename;
						html+='</a>';
					}
					//console.log(data.lists[0].childCategory.length)
					html+='</li></ul>';
					$(".heafothfo").after(html);
				};
				$("#heafenul a").click(function(){
						//var carid=$(this).attr("name");
						var caridnamtml=$(this).html();
//						/$.cookie("carid",carid,{path:"/"});
						$.cookie("caridnamtml",caridnamtml,{path:"/"});
				});
				
			},
			error:function(){
				console.log("失败2");
			}
		});
					}).mouseleave(function(){
				$(".heafotxx").hide();
					});
					
                  },
            error:function(XMLHttpRequest,textStatus,errorThrown){
            	console.log(XMLHttpRequest);
            	console.log(textStatus);
            	console.log(errorThrown);
             	console.log("失败1");
             	//alert(1999999);
            }
         })
    };
    //轮播图
    $.ajax({
    	type:"GET",
    	url:url+"/cli/content/getConByCateId/1",
    	data:{mintime:new Date().getTime()},
    	dataType:"json",
    	success:function(data){
    		
    		if(data.code==1){
    			var html='';
    			for(var i=0;i<data.lists.length;i++){
    				html+='<a href="';
    				html+=data.lists[i].url;
    				html+='" target="_blank"><img title="';
    				html+=data.lists[i].title;
    				html+='" src="';
    				html+=data.lists[i].bigimage;
    				html+='"></a>';
    			};
    			$(".big_pic_s").append(html);
    			var htm='';
    			for(var i=0;i<data.lists.length;i++){
    				
    				htm+='<a class="';
    				if(i==0){
    					htm+='vig_pic_lia';
    				};
    				htm+='"></a>';
    			};
    			$(".vig_pic_li").append(htm);
    			//lunbo
    			vig_pic_i(4000);
    		}
    	},
    	error:function(){
    		
    	}
    });
	//公告
	$.ajax({
		type:"GET",
		url:url+"/cli/notice/getNotices/1/7",
		data:{mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			if(data.code==1){
				var htm='';
				for(var i=0;i<data.lists.length;i++){
					htm+='<li><a href="informationmore.html?u='+data.lists[i].noticeid+'" target="_blank">[公告]';
					htm+=data.lists[i].title;
					htm+='</a></li>';
				};
				$(".heaggone").append(htm);
			}
		},
		error:function(){
			
		}
	});
	//gonggao
	$(".heatab p").eq(0).mouseover(function(){
		$(this).css("background-color","#33804b").css("color","#fff");
		$(".heatab p").eq(1).css("background-color","").css("color","#666");
		$(".heaggone").css("display","block");
		$(".headingd").css("display","none");
	});
	$(".heatab p").eq(1).mouseover(function(){
		$(this).css("background-color","#33804b").css("color","#fff");
		$(".heatab p").eq(0).css("background-color","").css("color","#666");
		$(".heaggone").css("display","none");
		$(".headingd").css("display","block");
	})
	
	
	/*$(".bantab li").mouseover(function(){
		$(this).children(".banxiaoh").css("display","block")
	}).mouseout(function(){
		$(this).children(".banxiaoh").css("display","none")
	})*/

	
	$("#shop").mouseenter(function(){
		//店铺
		$("#shopleft").fadeIn();
		$("#shopright").fadeIn();
	}).mouseleave(function(){
		$("#shopleft").hide();
		$("#shopright").hide();
	});
	$("#shopleft").click(function(){
		$("#bodytr").css("margin-left","-1206px")
	});
	$("#shopright").click(function(){
		$("#bodytr").css("margin-left","0")
	});
	
	
	function hmlist(data,eq){
	//	console.log(data)
		var hm='';
				for(var d=0;d<data.lists.length;d++){
					hm+='<div class="medicinalbox ';
					if(d==0){
						hm+='medicinalshow';
					};
					hm+='"><div class="boxmin">';
					hm+='<div class="boxmintop"><a href="#"><div class="banlangoo"><img src="imgeas/lang.gif" /></div>';
					hm+='<p>商品名</p><p>￥<span>认证可见</span></p><div class="safter"></div></a></div>';
					hm+='<div class="boxminbom"><a href="#"><div class="banlangoo"><img src="imgeas/lang.gif" /></div>';
					hm+='<p>商品名</p><p>￥<span>认证可见</span></p><div class="safter"></div></a></div></div>';
					hm+='<div class="boxmax">';
					for(var m=0;m<10;m++){
						hm+='<div class="boxmaxmin"><a href="#"><div class="banlangoo"><img src="imgeas/lang.gif" /></div>';
						hm+='<p>商品名</p><p>￥<span>认证可见</span></p><div class="safter"></div></a></div>';
					};
					hm+='</div></div>';
				};
				$(".medicinal").eq(eq).append(hm);
				if(data.lists.length==0){
					return false;
					};
					$(".boxminbom,.boxmintop,.boxmaxmin").unbind("mouseenter");
					$(".boxminbom,.boxmintop,.boxmaxmin").unbind("mouseleave");
					$(".boxminbom,.boxmintop,.boxmaxmin").mouseenter(function(){
						$(this).children("a").children(".safter").show();
					}).mouseleave(function(){
						$(this).children("a").children(".safter").hide();
					});
					
				for(var i=0;i<data.lists.length;i++){
								for(var c=0;c<data.lists[i].length;c++){
									if(data.lists[i][c].sellPrice==0){
										data.lists[i][c].sellPrice="认证可见";
									};
									var pics=data.lists[i][c].listimg.split(";");
									pics=pics[0];
									if(data.lists[i][c].sort==1){
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmin").children(".boxmintop").children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmin").children(".boxmintop").children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmin").children(".boxmintop").children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmin").children(".boxmintop").children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									
									};
									if(data.lists[i][c].sort==7){
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmin").children(".boxminbom").children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmin").children(".boxminbom").children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmin").children(".boxminbom").children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmin").children(".boxminbom").children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
										
									};
									if(data.lists[i][c].sort==2){
										
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(0).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(0).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(0).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(0).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==3){
										
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(1).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(1).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(1).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(1).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==4){
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(2).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(2).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(2).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(2).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==5){
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(3).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(3).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(3).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(3).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==6){
										
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(4).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(4).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(4).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(4).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==8){
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(5).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(5).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(5).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(5).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==9){
										
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(6).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(6).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(6).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(6).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==10){
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(7).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(7).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(7).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(7).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==11){
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(8).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(8).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(8).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(8).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
									if(data.lists[i][c].sort==12){
										
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(9).children("a").children(".banlangoo").children("img").attr("src",pics);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(9).children("a").children("p").eq(0).html(data.lists[i][c].aliascn);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(9).children("a").children("p").eq(1).children("span").html(data.lists[i][c].sellPrice);
										$(".medicinal").eq(eq).children(".medicinalbox").eq(i).children(".boxmax").children(".boxmaxmin").eq(9).children("a").attr("href","Product.html?drugid="+data.lists[i][c].drugid+"&selluserid="+data.lists[i][c].sellUserId);
									};
								};
							};
							
					
				
				
				
				$(".medicinalri").mouseenter(function(){
					//药品
					$(this).addClass("medicinalcolor");
					$(this).siblings().removeClass("medicinalcolor");
					//console.log($(this).index());
							
					$(this).parents(".medicinal").children(".medicinalbox").eq($(this).index()-1).addClass("medicinalshow");
					$(this).parents(".medicinal").children(".medicinalbox").eq($(this).index()-1).siblings().removeClass("medicinalshow");
	
				});
	};
	
	$.ajax({
		type:"get",
		url:url+"/cli/content/getConByCateId/2?mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			if(data.code==1){
				var html='';
				if(data.lists.length<6){
					$("#shopleft").remove();
					$("#shopright").remove();
				};
				for(var i=0;i<data.lists.length;i++){
					html+='<td style="background-image: url('+data.lists[i].bigimage+');"><a href="'+data.lists[i].url+'">';
					html+=data.lists[i].title;
					html+='</a></td>';
				};
				$("#bodytr tr").append(html)
			};
		},
		error:function(){
			
		}
	});
	
	
	$.ajax({
		type:"get",
		url:url+"/cli/CC/indexgetOneTwoCC/-1",
		data:{mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div id="';
					if(i==0){
						html+='banlconeocity';
					};
					if(i==1){
						html+='banlconetcity';
					};
					if(i==2){
						html+='banlconescity';
					};
					if(i==3){
						html+='banlconefcity';
					};
					if(i==4){
						html+='banlconefivcity';
					};
					if(i==5){
						html+='banlconesecity';
					};
					if(i==6){
						html+='banlconesevencity';
					};
					if(i==7){
						html+='banlconesexcity';
					};
					if(i==8){
						html+='banlconenncity';
					};
					if(i==9){
						html+='banlconelangcity';
					};
					html+='" class="medicinal">';
					html+='<h5><span class="medicinalspan" name="';
					
					html+=data.lists[i].categoryid;
					html+='">';
					html+=data.lists[i].name;
					html+='</span>';
					for(var c=0;c<data.lists[i].childCC.length;c++){
						//console.log(data.lists[i].childCC.length);
						html+='<span name="';
						html+=data.lists[i].childCC[c].categoryid;
						html+='" class="medicinalri ';
						if(c==0){
							html+='medicinalcolor';
						};
						if(i==0){
							tyop+=data.lists[0].childCC[c].categoryid+",";
						};
						html+='">';
						html+=data.lists[i].childCC[c].name;
						html+='</span>';
					};
					html+='</h5></div>';
				};
				var htm='';
				for(var b=0;b<data.lists.length;b++){
					htm+='<a ';
					/*if(b==0){
						htm+='href="#banlconeocity"';
					};
					if(b==1){
						htm+='href="#banlconetcity"';
					};
					if(b==2){
						htm+='href="#banlconescity"';
					};
					if(b==3){
						htm+='href="#banlconefcity"';
					};
					if(b==4){
						htm+='href="#banlconefivcity"';
					};
					if(b==5){
						htm+='href="#banlconesecity"';
					};
					if(b==6){
						htm+='href="#banlconesevencity"';
					};
					if(b==7){
						htm+='href="#banlconesexcity"';
					};
					if(b==8){
						htm+='href="#banlconenncity"';
					};
					if(b==8){
						htm+='href="#banlconelangcity"';
					};*/
					htm+='><div>';
					htm+=data.lists[b].name;
					htm+='</div></a>';
				};
				
				$(".banlouc").append(html);
				$(".bodycity").append(htm);
				$(".bodycity a").click(function(){
					$('html,body').animate({scrollTop:$(".medicinal").eq($(this).index()).offset().top}, 500);
				});
				
				if(tyop==""){
					return false;
				};
				tyop=tyop.substring(0,tyop.length-1);
				
				$.ajax({
					type:"get",
					url:url+"/cli/homeDrug/getOne/"+tyop,
					data:{token:token,mintime:new Date().getTime()},
					dataType:"json",
					success:function(data){
						if(data.code==1){
							var eq=0;
							hmlist(data,eq);
							//console.log(data.lists.length+"data.lists.length");
						};
					},
					error:function(){
				
					}
				});
				
				////要的高度=浏览器窗口高度-标签高度-标签距离顶部的高度+滚动条的高度
					var eci=1;
					$(window).on("scroll",function(){
						
						var orp=0;
						
						//$(".medicinal").eq($(this).index()).offset().top
						function roll(i){
							
						return	$(".medicinal").eq(i).offset().top;
						};
						
						//var sollen=$(window).height()-530
						// roll(i)+340 -roll(i)
						for(var i=0;i<$(".bodycity a").length;i++){
							if($(window).scrollTop()<340){
								$(".bodycity a div").removeClass("bodycitycoler");
								$(".bodycity").hide();
							}else{
								$(".bodycity").show();
							};
							if($(window).scrollTop()>roll(i)-200&&$(window).scrollTop()<roll(i)+540){
								$(".bodycity a div").removeClass("bodycitycoler");
								$(".bodycity a").eq(i).children("div").addClass("bodycitycoler");
							};
						};
						
					for(var i=1;i<$(".medicinal").length;i++){
					//	console.log(eci+"eci")
						if(eci>=$(".medicinal").length){
							return false;
						};
						var over=$(".medicinal").eq(eci).offset().top-$(window).height();
							/*console.log(eq+"eq");
							$(".bodycity a div").removeClass("bodycitycoler");
							$(".bodycity a").eq(eq).children("div").addClass("bodycitycoler");*/
						
						//console.log($(window).height()+"height()")
						//console.log(over+"over")
						//console.log($(window).scrollTop()+"scrollTop")
						
						if($(window).scrollTop()>over){
							
							
							if(eci>$(".medicinal").length-1){
								$(window).off("scroll"); 
							};
							tyop="";
							for(var c=0;c<$(".medicinal").eq(eci).children("h5").children(".medicinalri").length;c++){
								tyop+=$(".medicinal").eq(eci).children("h5").children(".medicinalri").eq(c).attr("name")+",";
							};
							tyop=tyop.substring(0,tyop.length-1);
							
							
							var eq=eci;
							
							$.ajax({
								type:"get",
								url:url+"/cli/homeDrug/getOne/"+tyop,
								data:{token:token,mintime:new Date().getTime()},
								dataType:"json",
								success:function(data){
									
									//console.log(eq+"eqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
									hmlist(data,eq);
									
								},
								error:function(){
									
								}
							});
							eci=eci+1;
						};
					};
					//console.log($(".medicinal").length+"medicinal.length")
					
				});
			};
		},
		error:function(){
			
		}
		
	});

	/*function list(data,eq){
				var imgs="../list/img/zaslunb.jpg";
				var aliascn="";
				var sellPrice=0;
				var html='';
					for(var i=0;i<data.lists.length;i++){
							html+='<div class="medicinalbox ';
							if(i==0){
								html+='medicinalshow';
							};
							html+='"><div class="boxmin"><div class="boxmintop"><a href="#"><img src="';
							html+=data.lists[i][0].listimg;
							html+='" /><p>';
							html+=data.lists[i][0].aliascn;
							html+='</p><p>￥<span>';
							if(data.lists[i][0].sellPrice==0){
								data.lists[i][0].sellPrice="登录可见";
							};
							html+=data.lists[i][0].sellPrice;
							html+='</span></p></a></div><div class="boxminbom"><a href="#"><img src="';
							if(data.lists[i].length>1){
								imgs=data.lists[i][1].listimg;
								aliascn=data.lists[i][1].aliascn;
								sellPrice=data.lists[i][1].sellPrice;
							};
							html+=imgs;
							html+='" /><p>';
							html+=aliascn;
							html+='</p><p>￥<span>';
							if(sellPrice==0){
								sellPrice="登录可见";
							};
							html+=sellPrice;
							html+='</span></p></a></div></div><div class="boxmax">';
							if(data.lists[i].length>=3){
								for(var c=2;c<data.lists[i].length;c++){
									html+='<div class="boxmaxmin"><a href="#"><img src="';
									html+=data.lists[i][c].listimg;
									html+='" /><p>';
									html+=data.lists[i][c].aliascn;
									html+='</p><p>￥<span>';
									if(data.lists[i][c].sellPrice==0){
										data.lists[i][c].sellPrice="登录可见";
									};
									html+=data.lists[i][c].sellPrice;
									html+='</span></p></a></div>';
								};
							};
							html+='</div></div>';
						};
						$(".medicinal").eq(eq).append(html);
						
						
	};
  */
})

