$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var sellUserid=$.cookie('peopleus');
	$("#bigimg").mouseleave(function(){
		$("#bigimglef").fadeOut();
		$("#bigimgrig").fadeOut();
	}).mouseenter(function(){
		$("#bigimglef").fadeIn();
		$("#bigimgrig").fadeIn();
	});
	$("#bigimglef").click(function(){
		var big=$("#bigim img").length*300;
		var margintop=$("#bigim").css("margin-top").split("p");
		margintop=Number(margintop[0])-300;
		if(margintop<=big*-1){
			margintop=0;
		}
		$("#bigim").css("margin-top",margintop+"px")
	});
	$("#bigimgrig").click(function(){
		var big=$("#bigim img").length*300;
		var margintop=$("#bigim").css("margin-top").split("p");
		margintop=Number(margintop[0])+300;
		if(margintop>0){
			margintop=big*-1+300
		};
		$("#bigim").css("margin-top",margintop+"px");
	});
	function martop(){
		var big=$("#bigim img").length*300;
		var margintop=$("#bigim").css("margin-top").split("p");
		margintop=Number(margintop[0])-300;
		if(margintop<=big*-1){
			margintop=0
		}
		$("#bigim").css("margin-top",margintop+"px")
	}
	setInterval(martop,5000);
	$(".myfile").change(function(){
		$(this).parent(".myform").siblings("img").attr("src","../imgeas/yuanq.gif");
		var obj=$(this).parent(".myform").siblings("img");
		$(this).parent(".myform").ajaxSubmit({
									type:"post",
									url:url+"/file/picUpload",
									dataType:"json",
									success:function(data){
										//console.log(data.error)
										if(data.error==0){
											obj.attr("src",data.url);
											//console.log(data.url);
										}else{
											gadget_popupt("上传失败");
										};
									},
									error:function(){
										
									}
							});
	});
	
	$(".btnurl").click(function(){
		$(this).parent(".imgbox").hide();
		$(this).parent(".imgbox").siblings(".urlbox").show();
		$(this).parent(".imgbox").siblings(".hidetxt").val("");
		$(this).parent(".imgbox").parent(".imgliketxt").siblings(".imglikep").children(".likepic").attr("name","1");
	});
	$(".btncont").click(function(){
		$(this).parent(".imgbox").hide();
		$(this).parent(".imgbox").siblings(".consbox").show();
		$(this).parent(".imgbox").siblings(".urlbox").children("input").val("");
		$(this).parent(".imgbox").parent(".imgliketxt").siblings(".imglikep").children(".likepic").attr("name","2");
		
	});
	$(".btnscont").click(function(){
		$(this).parent("p").parent(".urlbox").hide();
		$(this).parent("p").parent(".urlbox").siblings(".imgbox").show();
		$(this).parent("p").siblings("input").val("");
	});
	$(".btnsu").click(function(){
		$(this).parent(".consbox").hide();
		$(this).parent(".consbox").siblings(".imgbox").show();
		$(this).parent(".consbox").siblings(".hidetxt").val("");
	});
	$("#tetpass").click(function(){
		$("#tetbox").hide();
	});
	$(".btnsc").click(function(){
		$("#tetbox").show();
		//alert($(this).parents(".imglike").index());
		var dcontent=$(this).parents(".consbox").siblings(".hidetxt").val();
		$("#tetbox").attr("name",$(this).parents(".imglike").index())
		$(".wangEditor-txt").html(dcontent);
		$("#editor-trigger").val(dcontent);
	});
	$("#tetbombtn").click(function(){
		var boxind=$(this).parents("#tetbox").attr("name");
		var hidetxtv=$("#editor-trigger").val();
		$(".imglike").eq(boxind).children(".imgliketxt").children(".hidetxt").val(hidetxtv);
		$("#tetbox").hide();
	});
	$(".likepic").click(function(){
		var title=$(this).parent(".imglikep").siblings(".imgliketxt").children(".titles").val();
		var subTitle=Number($(this).parents(".imglike").index())+1;
		var curl=$(this).parent(".imglikep").siblings(".imgliketxt").children(".urlbox").children("input").val();
		var bigimage=$(this).parent(".imglikep").siblings(".imglikemin").children("img").attr("src");
		var content=$(this).parent(".imglikep").siblings(".imgliketxt").children(".hidetxt").val();
		
		if(bigimage=="../imgeas/moreimg.jpg"||bigimage=="../imgeas/yuanq.gif"){
			gadget_popupt("请上传图片");
			return false;
		};
		$.ajax({
			type:"post",
			url:url+"/cli/content/cliSave",
			data:{token:token,title:title,subTitle:subTitle,url:curl,bigimage:bigimage,content:content},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				//console.log(data.code)
				if(data.code==1){
					gadget_popupt("设置成功");
					setTimeout(gadget_relo,3000);
				};
			},
			error:function(){
				
			}
		});
	});
	$(".likeboc").click(function(){
		var title=$(this).parent(".imglikep").siblings(".imgliketxt").children(".titles").val();
		var subTitle=Number($(this).parents(".imglike").index())+1;
		var curl=$(this).parent(".imglikep").siblings(".imgliketxt").children(".urlbox").children("input").val();
		var bigimage=$(this).parent(".imglikep").siblings(".imglikemin").children("img").attr("src");
		var content=$(this).parent(".imglikep").siblings(".imgliketxt").children(".hidetxt").val();
		var contentid=$(this).parent(".imglikep").attr('name');
		
		if(bigimage=="../imgeas/moreimg.jpg"||bigimage=="../imgeas/yuanq.gif"){
			gadget_popupt("请上传图片");
			return false;
		};
		$.ajax({
			type:"post",
			url:url+"/cli/content/cliUpdate",
			data:{token:token,title:title,subTitle:subTitle,url:curl,bigimage:bigimage,content:content,contentid:contentid},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				//console.log(data.code)
				if(data.code==1){
					gadget_popupt("设置成功");
					setTimeout(gadget_relo,3000);
				};
			},
			error:function(){
				
			}
		});
	});
	$(".isno").click(function(){
		var contentid=$(this).parent(".imglikep").attr("name");
		if(contentid==""||contentid==null){
			//console.log("++++++++++++++++");
			return false;
		};
		$.ajax({
			type:"get",
			url:url+"/cli/content/cliDelete/"+contentid,
			data:{token:token},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				//console.log(data.code+"data.code")
				if(data.code==1){
					gadget_popupt("取消成功");
					setTimeout(gadget_relo,3000);
				}
			},
			error:function(){
				
			}
		});
	});
	
	$.ajax({
		type:"get",
		url:url+"/cli/content/getStoreCon/"+sellUserid,
		data:{token:token},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			//alert(data.code+"==");
			if(data.code==1){
				$(".imglike").show();
				if(data.lists.length>0){
					var htm='';
					for(var i=0;i<data.lists.length;i++){
						var eqw=Number(data.lists[i].subTitle)-1;
						$(".imglike").eq(eqw).children(".imglikep").attr("name",data.lists[i].contentid);
						$(".imglike").eq(eqw).children(".imglikep").children(".likepic").hide();
						$(".imglike").eq(eqw).children(".imglikep").children(".likeboc").show();
						$(".imglike").eq(eqw).children(".imglikemin").children("img").attr("src",data.lists[i].bigimage);
						$(".imglike").eq(eqw).children(".imgliketxt").children(".titles").val(data.lists[i].title);
						if(data.lists[i].url!=""||data.lists[i].content!=null){
							if(data.lists[i].url!=""&&data.lists[i].url!=null){
								$(".imglike").eq(eqw).children(".imgliketxt").children(".imgbox").hide();
								$(".imglike").eq(eqw).children(".imgliketxt").children(".urlbox").show();
								$(".imglike").eq(eqw).children(".imgliketxt").children(".urlbox").children("input[type='text']").val(data.lists[i].url);
							};
							if(data.lists[i].content!=null&&data.lists[i].content!=""){
								$(".imglike").eq(eqw).children(".imgliketxt").children(".imgbox").hide();
								$(".imglike").eq(eqw).children(".imgliketxt").children(".consbox").show();
								$(".imglike").eq(eqw).children(".imgliketxt").children(".hidetxt").val(data.lists[i].content);
								
							};
						};
						htm+='<a';
						if(data.lists[i].url!=""&&data.lists[i].url!=null){
							htm+=' target="_blank" href="';
							htm+=data.lists[i].url;
							htm+='"';
						};
						if(data.lists[i].content!=""&&data.lists[i].content!=null){
							htm+=' target="_blank" href="';
							htm+='../informationmore.html?m='+data.lists[i].contentid;
							htm+='"';
						};
						htm+=' title="';
						htm+=data.lists[i].title;
						htm+='"><img src="';
						htm+=data.lists[i].bigimage;
						htm+='" /></a>';
					};
					$("#bigim").append(htm);
				};
				
				
			};
		},
		error:function(){
			
		}
	});
	
	
})
