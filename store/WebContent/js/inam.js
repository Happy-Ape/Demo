$(function(){
	jQuery.support.cors = true;
	$(".shangpjg").html("登陆可见");
	$(".shangpyj").html("");
	
	
	footerlis("")
	name=$.cookie('peoplecompanyname')
		if($.cookie('peoplecompanyname')==""||$.cookie('peoplecompanyname')==null){
			name=$.cookie('peopleendusernick')
			if($.cookie('peopleendusernick')==""||$.cookie('peopleendusernick')==null){
				name=$.cookie('peoplesellername')
				if($.cookie('peoplesellername')==""||$.cookie('peoplesellername')==null){
					name=$.cookie('peoplephonenum')
				}
			}
		}
	if($.cookie('peoplecode')==1){
		$(".dengul li").eq(0).children("a").remove()
		html='<a>';
		html+=name;
		html+='</a>欢迎来到找药吧';
		$(".dengul li").eq(0).html(html)
	};
	if($.cookie('peoplestate')==-1){
		$(".shangpjg").html("认证可见");
		$(".shangpyj").html("")
	};
	if($.cookie('peoplegb')==9){
		$("#dengomy").attr("href","merchant/shops.html");
		$("#denmyorder").attr("href","merchant/older.html");
		$(".cebianbig").hide();
	};
	if($.cookie('peoplegb')==8){
		$("#dengomy").attr("href","icen/icenter.html");
		$("#denmyorder").attr("href","icen/order.html");
		$("#shopcatyu").attr("href","shopcart.html");
	};
	
	$("#shophover").mouseleave(function(){
		$(this).css("height","36px");
	}).mouseenter(function(){
		$(this).css("height","auto");
	});
	$("#shoplikmin li").click(function(){
		$("#min_sel_t ul li").remove();
		$("#min_sel_t").hide();
		$("#shoplik li").html($(this).html());
		if($(this).index()==0){
			$(".logtex").attr("placeholder","请输入药品名称");
		};
		if($(this).index()==1){
			$(".logtex").attr("placeholder","请输入店铺名称");
		};
		$(".logsub").attr("name",$(this).index());
	});
	function serhrec(){
		var search=$(".sosu .logtex").val();
			if(search==""){
				return false;
			};
			search=encodeURI(search);
			if($(".sosu .logsub").attr("name")==0){
				window.location.href="searchdrugs.html?search="+search;
			};
			if($(".sosu .logsub").attr("name")==1){
				window.location.href="storesearch.html?search="+search;
			};
	}
	//focus
	$(".sosu").keyup(function(e){
		if(e.keyCode==13){
			serhrec();
		};
		
		if(e.keyCode==40){
			if($("#min_sel_t ul li").length>0){
				var indxli=$(".hovercolo").index();
				$("#min_sel_t ul li").removeClass("hovercolo");
				$("#min_sel_t ul li").eq(indxli+1).addClass("hovercolo");
				$(".logtex").val($("#min_sel_t ul .hovercolo").html());
			};
		};
		if(e.keyCode==38){
			if($("#min_sel_t ul li").length>0){
				var indxli=$(".hovercolo").index();
				$("#min_sel_t ul li").removeClass("hovercolo");
				$("#min_sel_t ul li").eq(indxli-1).addClass("hovercolo");
				$(".logtex").val($("#min_sel_t ul .hovercolo").html());
			};
		};
		if(e.keyCode==8&&gtiem_l()==true){
			$("#min_sel_t ul li").remove();
		};
	});
	//onpropertychange
	$(".logtex").focus(function(){
		$("#min_sel_t").show();
	});
	$(".logtex").bind("input propertychange",function(){
		souslist($(this));
	});
	function souslist(obj){
		if(obj.val().length>60){
			obj.val(obj.val().slice(0,60))
		};
		if(obj.val().length>0&&$(".sosu .logsub").attr("name")==0){
			var thisval=obj.val();
			$("#min_sel_t ul li").remove();
			$.ajax({
				type:"post",
				url:url+"/IS/queryAuto?drugKey="+obj.val()+"&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					if(data.code==1){
						var serhtml='';
						var others=data.other.split(",");
							serhtml+='<li class="hovercolo">'+thisval+'</li>';
						for(var i=0;i<others.length;i++){
							serhtml+='<li>'+others[i]+'</li>';
						};
						$("#min_sel_t ul li").remove();
						$("#min_sel_t ul").append(serhtml);
						$("#min_sel_t").show();
						$("#min_sel_t ul li").mouseenter(function(){
							$(this).addClass("hovercolo");
							$(this).siblings().removeClass("hovercolo");
							$(".logtex").val($(this).html());
						});
						$("#min_sel_t ul li").click(function(){
							serhrec();
						});
					}else{
						$("#min_sel_t").hide();
					};
				},
				error:function(){
					$("#min_sel_t").hide();
				}
			});
		}else{
			$("#min_sel_t").hide();
		};
	
	};
	$(document).click(function(){
		$("#min_sel_t").hide();
	});
	$('.sosu').click(function(e){
		e.stopPropagation();
	})
	$(".sosu .logsub").click(function(){
		
		if($(this).attr("name")==0){
			var search=$(".sosu .logtex").val();
			if(search==""){
				return false;
			};
			search=encodeURI(search);
			window.location.href="searchdrugs.html?search="+search;
		};
		if($(this).attr("name")==1){
			var search=$(".sosu .logtex").val();
			if(search==""){
				return false;
			};
			search=encodeURI(search);
			window.location.href="storesearch.html?search="+search;
		};
	})
	$.ajax({
		type:"get",
		url:url+"/cli/content/getConByCateId/26?mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			if(data.code==1){
				var html='<a>热门搜索： </a>';
				var subTitle=data.lists[0].subTitle.split(",");
				for(var i=0;i<subTitle.length;i++){
					html+='<a target="_blank" class="';
					if(i==subTitle.length-1){
						html+='sokjl';
					};
					html+='" href="searchdrugs.html?search='+encodeURI(subTitle[i])+'">'+subTitle[i]+'</a>';
				};
				$(".sokj a").remove();
				$(".sokj").append(html);
				$(".searchbig").append('<div id="min_sel_t"><ul></ul></div>');
				$(".logtex").attr("autocomplete","off");
			};
		},
		error:function(){
			
		}
	});
})
