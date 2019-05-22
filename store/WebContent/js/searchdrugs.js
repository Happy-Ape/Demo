$(function(){
	jQuery.support.cors = true;
	var tokens=$.cookie('peoplemessage');
	$(".manminlis").toggle(function(){
		$(this).siblings(".manminlit").css("height","auto");
		$(this).children("img").attr("src","imgeas/shang.png")
	},function(){
		$(this).siblings(".manminlit").css("height","30px");
		$(this).children("img").attr("src","imgeas/xia.png")
	});
	$(".lisshopmin").mouseleave(function(){
		$(this).children(".imgfiv").hide();
	}).mouseenter(function(){
		$(this).children(".imgfiv").show();
	});
	var search=window.location.search;
		search=decodeURI(search);
		search=search.split("=");
		//alert(search[1]);
		$("#search").html(search[1]);
		var drugKey=search[1];
		drugKey=decodeURI(drugKey);
		var factoryKey="";
		var datat={drugKey:drugKey,factoryKey:factoryKey,mintime:new Date().getTime()};
	var open=1;
	var str=30;
	$.ajax({
		type:"get",
		url:url+"/IS/queryd/"+open+"/"+str,
		data:datat,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$(".cmaisps").show();
				$("#serching").hide();
				shoplis(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipiks").html(st);
					$("#isdangqs").html("1");
			
			}else{
				$(".cmaisps").hide();
				$("#banminlis").hide();
				$("#serching .serpic img").attr("src","imgeas/error.png");
				$("#serching .sertxt p").html("搜索失败，换个关键词试试");
			}
		},
		error:function(){
			$(".cmaisps").hide();
			$("#banminlis").hide();
			$("#serching .serpic img").attr("src","imgeas/error.png");
			$("#serching .sertxt p").html("搜索失败，换个关键词试试");
		}
	});
	//下一页
	$("#cmaismops").click(function(){
		open=parseInt($("#isdangqs").html())+1;
		if(open>$("#ismyipiks").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/IS/queryd/"+open+"/"+str,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shoplis(data);
					$("#isdangqs").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	})
	//上一页
	$("#cmaismpas").click(function(){
		open=parseInt($("#isdangqs").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/IS/queryd/"+open+"/"+str,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shoplis(data);
					$("#isdangqs").html(open);
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	//跳转
	$("#ismytzans").click(function(){
		open=$(".cmaisps input[type='number']").val()
		if(open==""){
			return false;
		};
		if(open>$("#ismyipiks").html()){
			open=$("#ismyipiks").html();
		};
		if(open<"1"){
			open="1";
		};
		$.ajax({
			type:"GET",
			url:url+"/IS/queryd/"+open+"/"+str,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					shoplis(data);
					$("#isdangqs").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	$("#manufacturer").click(function(){
		$(this).html("");
		$(this).hide();
		factoryKey="";
		var datat={drugKey:drugKey,factoryKey:factoryKey};
		$.ajax({
		type:"get",
		url:url+"/IS/queryd/"+open+"/"+str,
		data:datat,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				shoplis(data);
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipiks").html(st);
					$("#isdangqs").html("1");
			
			};
		},
		error:function(){
			
		}
	});
	});
	function shoplis(data){
		$("#lisshop .lisshopmin").remove();
		$(".banminli").eq(0).children(".manminlit").children("span").remove();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div class="lisshopmin"><div class="shopminpic"><a href="commoditys.html?drugId='+data.lists[i].drugId+'"><img src="';
					
					var img=data.lists[i].item_image.split(";");
					
					html+=img[0];
					html+='" /></a></div><div class="shopmintxt"><h5><a href="commoditys.html?drugId='+data.lists[i].drugId+'">';
					html+=data.lists[i].item_name;
					html+='</a></h5><P>销量：<span>';
					html+=data.lists[i].item_sales;
					html+='</span></P><P class="shopminp">规格：<span>';
					html+=data.lists[i].item_specification;
					html+='</span></P><P>准字号：';
					if(data.lists[i].item_codename){
					
					html+=data.lists[i].item_codename;
					}
					html+='</p><P>生产厂商：';
					html+=data.lists[i].item_manufacturer;
					html+='</P>';
					html+='</div><div class="imgfiv"><p>加入收藏</p></div></div>';
				};
				$("#lisshop").append(html);
				var other=data.other.split(",");
				var htm='';
				for(var c=0;c<other.length;c++){
					htm+='<span class="manufacturer">';
					htm+=other[c];
					htm+='</span>';
				};
				$(".banminli").eq(0).children(".manminlit").append(htm);
				
				//factoryKey
				$(".manufacturer").click(function(){
					$("#manufacturer").html($(this).html());
					$("#manufacturer").show();
					factoryKey=$(this).html();
					var datat={drugKey:drugKey,factoryKey:factoryKey,mintime:new Date().getTime()};
					$.ajax({
						type:"get",
						url:url+"/IS/queryd/"+open+"/"+str,
						data:datat,
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								shoplis(data);
								var st="";
								st=data.message/str;
								n = st.toString();
								var arr=n.split(".");
								if(arr[1]>0){
									st=parseInt(arr[0])+1;
								};
								console.log(data.message+"data.message")
								$("#ismyipiks").html(st);
								$("#isdangqs").html("1");
							}
						},
						error:function(){
							
						}
					});
				});
	};
})
