$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage'),
	peoplestate=$.cookie('peoplestate');
	var drugid="";
	$(".ischac").mouseover(function(){
		$(this).children("img").attr("src","../imgeas/hongcha.png")
	}).mouseout(function(){
		$(this).children("img").attr("src","../imgeas/chac.png")
	}).click(function(){
		$("#creismbod").hide()
	});
	
	$("#isform").keyup(function(e){
		if(e.keyCode==13){
			sunis();
			
		};
	}).submit(function(){
		return false;
	});
	$("#obutton").click(function(){
		sunis();
	});
	function sunis(){
		
		var key=$("#isfokey").val();
		if(key==""||key==null){
			return false;
		};
		$(".creismypop").remove();
		$(".ismidivmin .isbor").remove();
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getOriginDrugs/"+key,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".isbor").remove();
					$(".creismypop").remove();
					var html='';
					for(var i=0;i<data.lists.length;i++){
						html+='<div class="isbor" name="';
						html+=data.lists[i].drugid;
						html+='"><div class="ismidimi iscreamin"><p>';
						html+=data.lists[i].aliascn;
						html+='</p></div><div class="ismidimi"><p>';
						html+=data.lists[i].codename;
						html+='</p></div><div class="ismidimi iscreacrty"><p>';
						html+=data.lists[i].manufacturer;
						html+='</p></div><div class="ismidimi"><p>';
						html+=data.lists[i].specification;
						html+='</p></div><div class="ismidimi"><p>';
						html+=data.lists[i].barcode;
						html+='</p></div><img  style="display: none;" src="';
						if(data.lists[i].listimg!=null){
							var listimg=data.lists[i].listimg.split(";");
							html+=listimg[0];
						}else{
							html+="";
						}
						html+='" /></div>';
					};
					$(".ismidivmin").append(html);
					$(".isbor").click(function(){
						//alert($(this).children(".ismidimi").eq(2).text())
						$(".ispopdiv p").remove();
						$("#creismbod").show();
						drugid=$(this).attr("name");
						var src=$(this).children("img").attr("src");
						$(".ispopdi img").attr("src",src);
						html='<p>通用名：<span>';
						html+=$(this).children(".ismidimi").eq(0).children("p").html();
						html+='</span></p><p>批准文号：<span>';
						html+=$(this).children(".ismidimi").eq(1).children("p").html();
						html+='</span></p><p>生产厂家：<span>';
						html+=$(this).children(".ismidimi").eq(2).children("p").html();
						html+='</span></p><p>规格单位：<span>';
						html+=$(this).children(".ismidimi").eq(3).children("p").html();
						html+='</span></p><p>条形码：<span>';
						html+=$(this).children(".ismidimi").eq(4).children("p").html();
						html+='</span></p>';
						$(".ispopdiv").prepend(html);
					});
				};
				if(data.code==-1){
					
					
					var html='';
					html+='<p class="creismypop">没有找到符合的品种，<a href="release.html">发布个新品种>></a></p>';
					$(".ismidivmin").append(html);
					
				};
			},
			error:function(){
				gadget_popupt("搜索失败")
			}
		});
	
	};
	$("#ismybutton").click(function(){
		var mydrugimages="1";	//-1图片不符自己上传
		if($("#ismyform input[type='checkbox']").is(":checked")){
			mydrugimages="-1";
		};
		$.ajax({
			type:"POST",
			url:url+"/cli/sellDrug/saveSellDrug?killStock=0&mydrugimages="+mydrugimages+"&drugid="+drugid+"&token="+token+"&mintime"+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("发布成功");
					$("#creismbod").hide()
				};
				if(data.code=="-2"){
					gadget_popups("您已发布过此商品，请勿重复发布")
				};
				if(data.code=="-1"){
					gadget_popupt("发布失败.")
				};
			},
			error:function(){
				gadget_popupt("发布失败,请刷新重试")
			}
		});
		
	});
	
	
})
