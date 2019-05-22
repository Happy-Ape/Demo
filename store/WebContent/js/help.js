$(function(){
	jQuery.support.cors = true;
	footerlis();
	var tf=getUrlParamo("help");
	var mintf=getUrlParamo("i");
	
	$.ajax({
		type:"get",
		url:url+"/cli/CC/indexgetOneTwoCC/-2?mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			//console.log(data)
			gadget_login(data);
			if(data.code==1){
				var rty=data.lists[0].childCC[0].categoryid;
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<ul><li><p  class="helplis">';
					html+=data.lists[i].name;
					html+='</p>';
					if(data.lists[i].childCC.length>0){
					html+='<img src="imgeas/xiaj.png" /><ul class="helpmore">';
						for(var c=0;c<data.lists[i].childCC.length;c++){
							html+='<li class="omli" name="';
							html+=data.lists[i].childCC[c].categoryid;
							html+='"><p >';
							html+=data.lists[i].childCC[c].name;
							html+='</p></li>';
						};
						html+='</ul>';
					};
					html+='</li></ul>';
				};
				$("#myhea").append(html);
				if(tf!=null&&mintf!=null){
					cidmore(mintf);
				};
				if(tf==null){
					tf=rty;
				};
				$(".omli[name='"+tf+"']").parent(".helpmore").show();
				$(".omli[name='"+tf+"']").css("background-color","#e4e4e4");
				cod=tf;
				codfun(cod);
				
				$(".helplis").click(function(){
					$(this).parent("li").children(".helpmore").show();
					$(this).parent("li").parent("ul").siblings("ul").children("li").children(".helpmore").hide();
					$(this).parent("li").children("img").attr("src","imgeas/shangj.png");
					$(this).parent("li").parent("ul").siblings("ul").children("li").children("img").attr("src","imgeas/xiaj.png");
				});
				
				$(".helpmore li").click(function(){
					$(this).siblings().css("background-color","#f4f4f4");
					$(this).css("background-color","#e4e4e4");
					cod=$(this).attr("name");
					codfun(cod);
					$("#myhelpbox").hide();
					$("#myimgsrcya").show();
					$("#mybox").show();
					$("#myhelpbox h1").html("");
					$("#myml").html("");
					$("#mybox ul").remove();
				});
				
			};
		},
		error:function(){
			
		}
	});
	
	function codfun(cod){
						$.ajax({
						type:"get",
						url:url+"/cli/content/getConByCateId/"+cod+"?mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							//console.log(data)
							gadget_login(data);
							if(data.code==1){
								$("#mybox ul").remove();
								var htm='<ul>';
								for(var v=0;v<data.lists.length;v++){
									htm+='<li><span name="';
									htm+=data.lists[v].contentid;
									htm+='"><a href="help.html?help='+data.lists[v].categoryid+'&i='+data.lists[v].contentid+'">';
									htm+=data.lists[v].title;
									htm+='</a></span></li>';
								};
								htm+='</ul>';
								$("#mybox").append(htm);
									$("#mybox ul li span").click(function(){
										var cid=$(this).attr("name");
										cidmore(cid);
								});
							$("#myremove").click(function(){
									$("#myimgsrcya").show();
									$("#mybox").show();
									$("#myhelpbox").hide();
									$("#myhelpbox h1").html("");
									$("#myml").html("");
									gadget_m_remv($("#myhelpbox"));
								});
							};
						},
						error:function(){
							
						}
					});
					};
	function cidmore(cid){
		$("#mybox").hide();
$("#myhelpbox").show();
var cid = cid;
$.ajax({
	type: "get",
	url: url + "/cli/content/getConByConId/" + cid + "?mintime=" + new Date().getTime(),
	dataType: "json",
	success: function(data) {
		gadget_login(data);
		if(data.code == 1) {
			$("#myimgsrcya").hide();
			$("#myhelpbox h1").html(data.pojo.title);
			$("#myml").append(data.pojo.content);
		}else{
			$("#myimgsrcya").hide();
			gadget_err_m("暂无数据",$("#myhelpbox"),"30px");
		}
	},
	error: function() {
			$("#myimgsrcya").hide();
			gadget_err_m("网络错误，请重试",$("#myhelpbox"),"30px");
			
	}
});}
	
	
})
