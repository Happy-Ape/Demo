$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	//console.log(token+"[[[[[")
	$("#myform").attr("action",url+"/file/cliTxtpicUpload");
	$("#myform input[name=url]").val(ut+"/icen/min.html");
	$("select[name='city']").hide();
	$("select[name='area']").hide();
	function geturlname(name){
		var sear=window.location.search;
		if(sear==null||sear==""){
			sear="?type=a";
		};
		sear=sear.split(name);
		sear=sear[1].split("?");
		sear=sear[0].split("=")
		sear=sear[1];
		return sear;
	};
	var unId=geturlname("type")
	var sty=0;
	if(isNaN(unId)){
		//alert("不是数字");
		sty=0;
	}else{
		//alert("是数字");
		sty=1;
	};
	
	//alert(sty+","+unId)
	if(sty==1){
		$.ajax({
			type:"get",
			url:url+"/cli/userneed/getById/"+unId+"?token="+token+"&mintime="+new Date().getTime(),
			dateType:"json",
			success:function(data){
				//alert(data)
				data=JSON.parse(data);
				gadget_login(data);
				if(data.code==1){
					$("#drugName").val(data.pojo.drugName);
					$("#drugSpecifications").val(data.pojo.drugSpecifications);
					var numb=data.pojo.number.split(",");
					$("#number").val(numb[0]);
					$("#opval").val(numb[1]);
					$("#hasReceipt").val(data.pojo.hasReceipt);
					$("#qualityStandard").val(data.pojo.qualityStandard);
					$("#userName").val(data.pojo.userName);
					$("#userContact").val(data.pojo.userContact);
					var minBuys=data.pojo.minBuy.split(",");
					$("#minBuy").val(minBuys[0]);
					$("#minBuyval").val(minBuys[1]);
					var drugPrices=data.pojo.drugPrice.split("元/")
					$("#drugPrice").val(drugPrices[0]);
					$("#drugPriceval").val(drugPrices[1]);
					if(data.pojo.drugImages!=""&&data.pojo.drugImages!=null){
						var drugImag=data.pojo.drugImages.split(",")
						var html='';
						for(var i=0;i<drugImag.length;i++){
							html+='<div class="myimg" title="点击查看大图"><a target="_blank" href="';
							html+=drugImag[i];
							html+='"><img src="';
							html+=drugImag[i];
							html+='"/></a><div class="removimg"><p>删除</p></div></div>';
						};
						$("#myfile").after(html);
						$(".removimg").unbind("mouseleave");
						$(".removimg").unbind("mouseenter");
						$(".myimg").mouseleave(function(){
							$(this).children(".removimg").hide();
						});
						$(".myimg").mouseenter(function(){
							$(this).children(".removimg").show();
						});
						$(".removimg").unbind("click");
						$(".removimg").click(function(){
							$(this).parent(".myimg").remove();
						});
					};
					//stockPlace 药品库存地 originPlace 药品产地
					var originPlac=data.pojo.originPlace.split("-");
					//alert(originPlac.length)
					//alert(originPlac[1])
					if(originPlac[0]!=""||originPlac[0]!=null){
						$("#originPlace select[name='province']").val(originPlac[0]);
						var obj=$("#originPlace");
						var htm=originPlac[0];
						lisophtm(htm,obj);
						if(originPlac[1]!=""||originPlac[1]!=null){
							var htom=originPlac[1];
							opbbclis(htom,obj)
							$("#originPlace select[name='city']").val(originPlac[1]);
							if(originPlac[2]!=""||originPlac[2]!=null){
								$("#originPlace select[name='area']").val(originPlac[2]);
							};
						};
					};
					var stockPlac=data.pojo.stockPlace.split("-");
					if(stockPlac[0]!=""&&stockPlac[0]!=null){
						$("#stockPlace select[name='province']").val(stockPlac[0]);
						var obj=$("#stockPlace");
						var htm=stockPlac[0];
						lisophtm(htm,obj);
						if(stockPlac[1]!=""&&stockPlac[1]!=null){
							var htom=stockPlac[1];
							opbbclis(htom,obj)
							$("#stockPlace select[name='city']").val(stockPlac[1]);
							if(stockPlac[2]!=""||stockPlac[2]!=null){
								$("#stockPlace select[name='area']").val(stockPlac[2]);
							};
							
						};
					};
					
					
				};
			},
			error:function(){
				
			}
		});
	};
	
	
	
	$(".myimg").mouseleave(function(){
		$(this).children(".removimg").hide();
	});
	$(".myimg").mouseenter(function(){
		$(this).children(".removimg").show();
	});
	$(".removimg").click(function(){
		$(this).parent(".myimg").remove();
	});
					
		$("#myform input[type='file']").change(function(){
			//alert($(".myimg").length)
		if($(".myimg").length>2){
			gadget_popups("最多可传3张图片");
			return false;
		};
		$(this).parent("#myform").siblings("img").attr("src","../imgeas/yuanq.gif");
		$(this).parent("#myform").submit();
		var indx=1;
		$("#myform [type='file']").attr("disabled","disabled");
		$("#ifr").load(function(){
			//console.log($("#bgo").val())
			var bgo=$("#bgo").val();
			if(bgo!=""){
				//console.log(bgo)
//				?pic=http://7xloj2.com1.z0.glb.clouddn.com/1481009450439
				bgo=bgo.split("=");
				if(bgo[1]!=""&&indx==1){
					$("#myfile img").attr("src","../imgeas/tnj.png");
					$("#myform [type=file]").removeAttr("disabled");
					var html='<div class="myimg" title="点击查看大图"><a target="_blank" href="';
					html+=bgo[1];
					html+='"><img src="';
					html+=bgo[1];
					html+='"/></a><div class="removimg"><p>删除</p></div></div>';
					$("#myfile").after(html);
					$(".removimg").unbind("mouseleave");
					$(".removimg").unbind("mouseenter");
					$(".myimg").mouseleave(function(){
						$(this).children(".removimg").hide();
					});
					$(".myimg").mouseenter(function(){
						$(this).children(".removimg").show();
					});
					$(".removimg").unbind("click");
					$(".removimg").click(function(){
						$(this).parent(".myimg").remove();
					});
					indx=3;
				};
				
			};
		});
		return false;
	});
	
	
	
	$("#mybtn").click(function(){
		
		var drugName=$("#drugName").val();
		var drugSpecifications=$("#drugSpecifications").val();
		var snumber=$("#number").val();
		var userName=$("#userName").val();
		var userContact=$("#userContact").val();
		var minBuy=$("#minBuy").val();
		var drugPrice=$("#drugPrice").val();
		
		if(drugName==""||drugName==null){
			$(".ul_s").eq(0).show();
			return false;
		}else{
			$(".ul_s").eq(0).hide();
		};
		if(drugSpecifications==""||drugSpecifications==null){
			$(".ul_s").eq(1).show();
			return false;
		}else{
			$(".ul_s").eq(1).hide();
		};
		if(snumber==""||snumber==null){
			$(".ul_s").eq(2).show();
			return false;
		}else{
			$(".ul_s").eq(2).hide();
		};
		if(minBuy==""||minBuy==null){
			$(".ul_s").eq(3).show();
			return false;
		}else{
			$(".ul_s").eq(3).hide();
		};
		if(drugPrice==""||drugPrice==null){
			$(".ul_s").eq(4).show();
			return false;
		}else{
			$(".ul_s").eq(4).hide();
		};
		if(userName==""||userName==null){
			$(".ul_s").eq(5).show();
			return false;
		}else{
			$(".ul_s").eq(5).hide();
		};
		if(userContact.length!=11){
			$(".ul_s").eq(6).show();
			return false;
		}else{
			$(".ul_s").eq(6).hide();
		};
		snumber=snumber+","+$("#opval").val();
		minBuy=minBuy+","+$("#minBuyval").val();
		drugPrice=drugPrice+"元/"+$("#drugPriceval").val();
		var originPlace="";
		var originPlaceo=$("#originPlace").children("select[name='province']").val();
		var originPlacet=$("#originPlace").children("select[name='city']").val();
		var originPlaces=$("#originPlace").children("select[name='area']").val();
		if(originPlaceo=="请选择"||originPlaceo=="1"){
			originPlaceo="";
		};
		if(originPlacet=="请选择"||originPlacet=="1"){
			originPlacet="";
		};
		if(originPlaces=="请选择"||originPlaces=="1"){
			originPlaces="";
		};
		originPlace=originPlaceo+"-"+originPlacet+"-"+originPlaces;
		var stockPlace="";
		var stockPlaceo=$("#stockPlace").children("select[name='province']").val();
		var stockPlacet=$("#stockPlace").children("select[name='city']").val();
		var stockPlaces=$("#stockPlace").children("select[name='area']").val();
		if(stockPlaceo=="请选择"||stockPlaceo=="1"){
			stockPlaceo="";
		};
		if(stockPlacet=="请选择"||stockPlacet=="1"){
			stockPlacet="";
		};
		if(stockPlaces=="请选择"||stockPlaces=="1"){
			stockPlaces="";
		};
		stockPlace=stockPlaceo+"-"+stockPlacet+"-"+stockPlaces;
		var hasReceipt=$("#hasReceipt").val()
		var qualityStandard=$("#qualityStandard").val();
		var drugImages="";
		if($(".myimg").length>0){
			for(var i=0;i<$(".myimg").length;i++){
				drugImages+=$(".myimg").eq(i).children("a").children("img").attr("src")+",";
			};
			drugImages=drugImages.substring(0,drugImages.length-1);
		};
		if(sty!=1){
			$.ajax({
			type:"post",
			url:url+"/cli/userneed/save?token="+token+"&userType=2&drugImages="+drugImages+"&minBuy="+minBuy+"&drugPrice="+drugPrice+"&drugName="+drugName+"&drugSpecifications="+drugSpecifications+"&number="+snumber+"&userName="+userName+"&userContact="+userContact+"&originPlace="+originPlace+"&stockPlace="+stockPlace+"&hasReceipt="+hasReceipt+"&qualityStandard="+qualityStandard+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("提交成功，信息正在审核");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popups("提交失败，"+data.message);
				};
			},
			error:function(){
				gadget_popups("提交失败，请刷新重试");
			}
		});
		}else{
			$.ajax({
			type:"post",
			url:url+"/cli/userneed/update/"+unId+"?token="+token+"&userType=2&drugImages="+drugImages+"&minBuy="+minBuy+"&drugPrice="+drugPrice+"&drugName="+drugName+"&drugSpecifications="+drugSpecifications+"&number="+snumber+"&userName="+userName+"&userContact="+userContact+"&originPlace="+originPlace+"&stockPlace="+stockPlace+"&hasReceipt="+hasReceipt+"&qualityStandard="+qualityStandard+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("修改成功");
					window.location.href="buydemand.html";
				}else{
					gadget_popups("修改失败，"+data.message);
				};
			},
			error:function(){
				gadget_popups("修改失败，请刷新重试");
			}
		});
		};
		
		
		
		
	});
	
	
	$.ajax({
		type:"GET",
		url:url+"/cli/province/getAllProvinces?mintime="+new Date().getTime(),
		dataType:"json",
		async:false,
		success:function(data){
			gadget_login(data);
			var html="";
			for(var i=0;i<data.lists.length;i++){
				html+='<option ab="';
				html+=data.lists[i].provincecode;
				html+='">';
				html+=data.lists[i].provincename
				html+='</option>';
			};
			$(".provinop").after(html);
			$("select[name='province']").unbind('change').bind('change',function(){
				$(this).siblings("select[name='city']").hide().val("");
				$(this).siblings("select[name='area']").hide().val("");
				$(this).siblings("select").children(".provina").siblings().remove();
				$(this).siblings("select").children(".provinc").siblings().remove();
				
			//$("#provina").siblings().remove();
				htm=$(this).val();
				var obj=$(this).parent(".ul_t");
				lisophtm(htm,obj);
			})
		},
		error:function(){
			console.log(1)
		}
	});
		function lisophtm(htm,obj){
			var ab=obj.children("select[name='province']").children("option:contains('"+htm+"')").attr("ab");
			
				$.ajax({
					type:"GET",
					url:url+"/cli/city/getCitiesByProvinceId/"+ab+"?mintime="+new Date().getTime(),
					dataType:"json",
					async:false,
					success:function(data){
						gadget_login(data);
						var html="";
						for(var i=0;i<data.lists.length;i++){
								html+='<option ab="';
								html+=data.lists[i].citycode;
								html+='">';
								html+=data.lists[i].cityname
								html+='</option>';
						};
							obj.children("select").children(".provinc").after(html);
							obj.children("select[name='city']").show();
							$("select[name='city']").unbind('change').bind('change',function(){
								$(this).siblings("select[name='area']").hide().val("");
								$(this).siblings("select").children(".provina").siblings().remove();
								htom=$(this).val();
								opbbclis(htom,obj);
							})
							
					},
					error:function(){
						console.log(2)
					}
				});
				};
		function opbbclis(htom,obj){
		var bbc=obj.children("select[name='city']").children(" option:contains('"+htom+"')").attr("ab");
								$.ajax({
									type:"GET",
									url:url+"/cli/country/getCountriesByCityid/"+bbc+"?mintime="+new Date().getTime(),
									dataType:"json",
									async:false,
									success:function(data){
										gadget_login(data);
										var htm="";
										//alert(data.lists.length)
										for(var i=0;i<data.lists.length;i++){
											htm+='<option>';
											htm+=data.lists[i].countyname;
											htm+='</option>';
										}
										obj.children("select").children(".provina").after(htm)
										obj.children("select[name='area']").show();
										$("select[name='area']").change(function(){
											hom=$(this).val();
										})
									},
									error:function(){
										console.log(3)
									}
								});
								};
	
	
	
	
	
	
	
	
	
	
	
})
