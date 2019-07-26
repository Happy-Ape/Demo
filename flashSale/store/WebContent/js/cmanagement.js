$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var cateid=0;
	var state=0;
	var key="";
	var nowPage=1;
	var str="10";//每页条数
	var open="";//当前页数
	var mydrugimages="";
	var stat=0;
	$("#filefor").attr("action",url+"/file/cliTxtpicUpload");
	$("#filefor input[name=url]").val(ut+"/merchant/min.html");
	if($.cookie("peopletype")==6){$("#creleasehr").attr("href","releasel.html");};
	$(".cmanisdon .ismymin input").click(function(){
		if(this.checked){
			$(".cmanisdong .ismymin input").attr("checked",true);
		}else{
			$(".cmanisdong .ismymin input").attr("checked",false);
		};
	});
	$(".ischac").click(function(){
		$("#creismbod").hide();
	});
	
	//编辑提交
	$("#ismybutton").click(function(){
		var listimg="1";
		
		if(mydrugimages=="-1"||mydrugimages==""){
			listimg="";
			for(var i=0;i<$(".isminfodi").length;i++){
				listimg+=$(".isminfodi").eq(i).attr("src")+",";
			};
		};
		
		if($("#ismyform input[name='sellprice']").val()==""||$("#ismyform input[name='sellprice']").val()<1){
			$(".myforspn").eq(0).show();
			return false;
		}else{
			$(".myforspn").eq(0).hide();
		};
		if($("#ismyform input[name='discountprice']").val()==""){
			$(".myforspn").eq(1).show();
			return false;
		}else{
			$(".myforspn").eq(1).hide();
		};
		if($("#ismyform input[name='sellstock']").val()==""||$("#ismyform input[name='sellstock']").val()<1){
			$(".myforspn").eq(2).show();
			return false;
		}else{
			$(".myforspn").eq(2).hide();
		};
		if($("#ismyform input[name='mindeliverynum']").val()==""||$("#ismyform input[name='mindeliverynum']").val()<1){
			$(".myforspn").eq(3).show();
			return false;
		}else{
			$(".myforspn").eq(3).hide();
		};
		var sellprice=$("#ismyform input[name='sellprice']").val();
		var discountprice=$("#ismyform input[name='discountprice']").val();
		var sellstock=$("#ismyform input[name='sellstock']").val();
		var mindeliverynum=$("#ismyform input[name='mindeliverynum']").val();
		var selldrugID=$("#creismbod").attr("name");
		//console.log(stat+"==stat=");
		sellprice=encodeURI(sellprice);
		discountprice=encodeURI(discountprice);
		//sellstock=encodeURI(sellstock);
		mindeliverynum=encodeURI(mindeliverynum);
		
		$.ajax({
			type:"POST",
			url:url+"/cli/sellDrug/updateSellDrug?mydrugimages="+listimg+"&sellprice="+sellprice+"&discountprice="+discountprice+"&sellstock="+sellstock+"&mindeliverynum="+mindeliverynum+"&token="+token+"&selldrugid="+selldrugID+"&state="+stat+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("编辑成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popupt("编辑失败"+data.message);
					
				};
			},
			error:function(){
				gadget_popupt("编辑失败，请重试");
			}
		});
	})
	
	$.ajax({
		type:"GET",
		url:url+"/cli/drug/getCategory/0?mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<option value="';
					html+=data.lists[i].cateid;
					html+='">';
					html+=data.lists[i].catename;
					html+='</option>';
				};
				$("#isminopt").after(html);
			}
		},
		error:function(){
			
		}
	});
	

	
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getQuaryDrugs/0/0/0/1/"+str,
			data:{token:token,key:"",mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				//console.log(data)
				if(data.code==1){
					//alert(data.lists.length)
					$(".cmaisp").show();
					adc(data)
					var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
				}else{
					gadget_popups("暂无数据");
					$(".cmaisp").hide();
				};
			
			},
			error:function(){
				gadget_popups("网络错误，请重试");
				$(".cmaisp").hide();
			}
		});
	$("#myform").keyup(function(e){
		if(e.keyCode==13){
			serchlis()
		};
	}).submit(function(){
		return false;
	});
	$("#isobutton").click(function(){
		serchlis();
	});
	function serchlis(){
		cateid=$("#iscaidnm").val();
		state=$("#state").val();
		key=$("#opekey").val();
		$(".cmanisdong").remove();
		$(".cmaisp").hide();
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getQuaryDrugs/"+cateid+"/"+state+"/0/1/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".cmaisp").show();
					adc(data)
					var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
				}else{
					gadget_popups("暂无数据");
				};
			},
			error:function(){
				gadget_popups("网络错误，请重试");
			}
		});
		
	};
	//上一页
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getQuaryDrugs/"+cateid+"/"+state+"/0/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".cmanisdong").remove();
					adc(data);
					$("#isdangq").html(open);
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
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
			url:url+"/cli/sellDrug/getQuaryDrugs/"+cateid+"/"+state+"/0/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".cmanisdong").remove();
					adc(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	})
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
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getQuaryDrugs/"+cateid+"/"+state+"/0/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".cmanisdong").remove();
					adc(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_popupt("获取失败")
			}
		});
	});
	
	function adc(data){
		for(var i=0;i<data.lists.length;i++){
						var html='';
						html+='<div class="cmanisdong" name="';
						html+=data.lists[i].state;
						html+='"><div class="ismymin isasdbo" name="';
						html+=data.lists[i].selldrugid;
						html+='">';
						if(data.lists[i].state!="1"){
							html+='<input name="checkbox" type="checkbox" />';
							html+='<span>选择</span>';
						};
						
						html+='</div><div class="ismymin ismyminnam"><p>';
						html+=data.lists[i].aliascn;
						html+='</p></div>';
						html+='<div class="ismymin"><p>';
						html+=data.lists[i].specification;
						html+='</p></div><div class="ismymin"><p>';
						if(data.lists[i].sellprice==null){
							data.lists[i].sellprice=0;
						};
						html+=data.lists[i].sellprice;
						html+='</p></div><div class="ismymin"><p>';
						if(data.lists[i].sellstock==null){
							data.lists[i].sellstock=0;
						};
						html+=data.lists[i].sellstock;
						html+='</p></div><div class="ismymin"><p>';
						if(data.lists[i].sales==null){
							data.lists[i].sales=0;
						};
						html+=data.lists[i].sales;
						html+='</p></div><div class="ismymin"><p>';
						if(data.lists[i].packing==null){
							data.lists[i].packing="--";
						};
						html+=data.lists[i].packing;
						html+='</p></div><div class="ismymin"><p>';
						if(data.lists[i].state=="2"){
							data.lists[i].state="已上架";
						};
						if(data.lists[i].state=="1"){
							data.lists[i].state="待处理";
						};
						if(data.lists[i].state=="-1"){
							data.lists[i].state="已下架";
						};
						if(data.lists[i].state=="3"){
							data.lists[i].state="已编辑";
						};
						html+=data.lists[i].state;
						html+='</p></div><div class="ismymin ismyminlas" adc="';
						html+=data.lists[i].drugid;
						html+='" name="';
						html+=data.lists[i].selldrugid;
						html+='">';
						html+='<span class="minlasbj" name="';
						html+=data.lists[i].mydrugimages;
						html+='">编辑</span> ';
						html+='<span class="minlastopj" name="2">上架</span> <span class="minlasremove">删除</span> ';
						html+='<span class="minlasbotj" name="-1">下架</span></div></div>';
						$(".cmanisdon").after(html);
					};
						//编辑
						$(".minlasbj").click(function(){
							if($(this).parent(".ismyminlas").parent(".cmanisdong").attr("name")==-1){
								gadget_popupt("请先上架再做编辑");
								return false;
							};
							if($.cookie("peopletype")==6){
								window.location.href="releasel.html?i="+$(this).parent().attr("adc");
								return false;
							};
							$("#creismbod").show();
							$("#creismbod").attr("name",$(this).parent().attr("name"));
							stat=$(this).parent(".ismyminlas").parent(".cmanisdong").attr("name");
							mydrugimages=$(this).attr("name");
							$("#filefor").remove();
							$(".isminfodi").remove();
							$("#ispoopbigmg").attr("src","");
							var selldrugID=$(this).parent().attr("adc");
							if(mydrugimages==""||mydrugimages==-1){
								$(".ispopdi").show();
								$("#ispoopbigmg").attr("src","../imgeas/tnj.png");
								var html='<form id="filefor"  name="filfor" class="mysform" method="post" target="upload" enctype="multipart/form-data" action="'+url+'/file/cliTxtpicUpload"><input type="file" name="uploadFile"/><input type="hidden" name="url"  value="'+ut+'/merchant/min.html"/></form>';
								$(".ispopdi").append(html);
								var ind=2;
								$("#filefor input[type='file']").change(function(){
									
									/*if(this.files[0].size==undefined){
										return false;
									};*/
										/*var size = this.files[0].size;
												
												if(size/1024>2048){
													alert("图片太大");
													return false;
												};*/
												if($(".isminfodi").length>2){
													gadget_popupt("图片已经够了");
													return false;
												};
												ind=1;
												$("#filefor").submit();
												$(".mysform [type='file']").attr("disabled","disabled");
												$("#ifr").unbind("load");
												$("#ifr").load(function(){
													
													//console.log($("#bgo").val())
													var bgo=$("#bgo").val();
													
													if(bgo!=""){
														//console.log(bgo)
//														?pic=http://7xloj2.com1.z0.glb.clouddn.com/1481009450439
														bgo=bgo.split("=");
														if(bgo[1]!=""&&ind==1){
															
														var html='<img class="isminfodi" src="';
													html+=bgo[1];
													html+='" />';
													$("#ispoopbigmg").after(html);
													$("#ispoopbigmg").attr("src",bgo[1]);
													$(".isminfodi").click(function(){
														$("#ispoopbigmg").attr("src",$(this).attr("src"))
													});
															//$(".proishlis").eq(ind).children(".propic").children("img").attr("src",bgo[1]);
														$(".mysform [type=file]").removeAttr("disabled");
														
															ind=2;
														};
				
													};
			
												});
												return false;
										/*$(this).parent("form").ajaxSubmit({
											url: url+"/file/picUpload", // 请求的url
											type: "post", // 请求方式
											dataType: "json", // 响应的数据类型
											success:function(data){
												if(data.error==0){
													var html='<img class="isminfodi" src="';
													html+=data.url;
													html+='" />';
													$("#ispoopbigmg").after(html);
													$("#ispoopbigmg").attr("src",data.url);
													$(".isminfodi").click(function(){
														$("#ispoopbigmg").attr("src",$(this).attr("src"))
													});
												}else{
													alert("数据加载失败.");
												};
											},
											error:function(){
												alert("数据加载失败");
											}
										})*/
									});
									
							}else{
								$(".ispopdi").hide();
							};
							/*if(mydrugimages==1){ismybutton
								$(".ispopdi").hide();
								$("#ismyform").css("margin","0 auto");
							}*/
							console.log(selldrugID)
							$.ajax({
								type:"GET",
								url:url+"/cli/sellDrug/toEdit/"+selldrugID,
								data:{token:token,mintime:new Date().getTime()},
								dataType:"json",
								success:function(data){
								//	console.log(data.pojo.mydrugimages+"==mydrugimages");
									gadget_login(data);
									if(data.code==1){
										$(".isminfodi").remove();
										//$(".ispopdi img").attr("src",data.mydrugimages);
										if(data.pojo.mydrugimages==1){
										$(".ispopdi").hide();
										
										//$("#ismyform").css("margin-left","161px");
									}else if(data.pojo.mydrugimages!=-1&&data.pojo.mydrugimages!=""){
										
										$(".ispopdi").show();
										var arr=data.pojo.mydrugimages.split(",");
										$("#ispoopbigmg").attr("src",arr[0]);
										var htm='';
										for(var i=0;i<arr.length-1;i++){
											htm+='<img class="isminfodi" src="';
											htm+=arr[i];
											htm+='" />';
										}
										$("#ispoopbigmg").after(htm);
										$(".isminfodi").click(function(){
											$("#ispoopbigmg").attr("src",$(this).attr("src"))
										})
									}
										$("#ismyform input[name='sellprice']").val(data.pojo.sellprice);
										$("#ismyform input[name='discountprice']").val(data.pojo.discountprice);
										$("#ismyform input[name='sellstock']").val(data.pojo.sellstock);
										$("#ismyform input[name='mindeliverynum']").val(data.pojo.mindeliverynum);
									};
								},
								error:function(){
									
								}
							});
							
						});
						//上架
						$(".minlastopj").click(function(){
							var state=$(this).attr("name");
							var sellDrugIDs=[];
							sellDrugIDs.push($(this).parent().attr("name"));
							if($(this).parent(".ismyminlas").parent(".cmanisdong").attr("name")==1){
								gadget_popupt("请编辑过后再上架");
								return false;
							};
							if($(this).parent(".ismyminlas").parent(".cmanisdong").attr("name")==2){
								gadget_popupt("请勿重复上架");
								return false;
							};
							$.ajax({
								type:"POST",
								url:url+"/cli/sellDrug/changeState/"+state+"?sellDrugIDs="+sellDrugIDs+"&token="+token+"&mintime="+new Date().getTime(),
								traditional:true,
								dataType:"json",
								success:function(data){
									gadget_login(data);
									console.log(data);
									if(data.code=="1"){
										gadget_popupt("上架成功");
										setTimeout(gadget_relo,3000);
									}else{
										gadget_popupt("操作失败.");
									};
								},
								error:function(){
									gadget_popupt("操作失败")
								}
							});
						});
						//删除
						$(".minlasremove").click(function(){
							var sellDrugId=$(this).parent().attr("name");
							$.ajax({
								type:"GET",
								url:url+"/cli/sellDrug/delete/"+sellDrugId,
								data:{token:token,mintime:new Date().getTime()},
								dataType:"json",
								success:function(data){
									gadget_login(data);
									if(data.code=="1"){
										gadget_popupt("删除成功");
										setTimeout(gadget_relo,3000);
									}else{
										gadget_popupt("操作失败."+data.message);
									}
								},
								error:function(){
									gadget_popupt("操作失败")
								}
							});
							
						});
						//下架
						$(".minlasbotj").click(function(){
							if($(this).parent(".ismyminlas").parent(".cmanisdong").attr("name")==1){
								gadget_popupt("请编辑过后再下架");
								return false;
							};
							if($(this).parent(".ismyminlas").parent(".cmanisdong").attr("name")==-1){
								gadget_popupt("请勿重复下架");
								return false;
							};
							var state=$(this).attr("name");
							var sellDrugIDs=[];
							sellDrugIDs.push($(this).parent().attr("name"));
							$.ajax({
								type:"POST",
								url:url+"/cli/sellDrug/changeState/"+state+"?sellDrugIDs="+sellDrugIDs+"&token="+token+"&mintime="+new Date().getTime(),
								traditional:true,
								dataType:"json",
								success:function(data){
									gadget_login(data);
									if(data.code==1){
										gadget_popupt("下架成功");
										setTimeout(gadget_relo,3000);
									}else{
										gadget_popupt("操作失败.")
									};
								},
								error:function(){
									gadget_popupt("操作失败")
								}
							});
						});
						$("#bigtja").unbind("click");
						$("#bigbja").unbind("click");
						//批量 上架
						$("#bigtja").click(function(){
							//alert($(".isasdbo input[name='checkbox']").is(":checked"))
							//$(this).parent(".ismyminlas").parent(".cmanisdong").attr("name")
							
							
							var sellDrugIDs=[];
							for(var i=0;i<$(".isasdbo input[name='checkbox']").length;i++){
								if($(".isasdbo input[name='checkbox']").eq(i).is(":checked")==true){
									if($(".isasdbo input[name='checkbox']").eq(i).parent(".ismymin").parent(".cmanisdong").attr("name")==2){
										gadget_popupt("提交失败，选中商品中有已上架商品");
										return false;
									};
									if($(".isasdbo input[name='checkbox']").eq(i).parent(".ismymin").parent(".cmanisdong").attr("name")==1){
										gadget_popupt("提交失败，选中商品中有未编辑商品");
										return false;
									};
									sellDrugIDs.push($(".isasdbo input[name='checkbox']").eq(i).parent().attr("name"));
								};
							};
							if(sellDrugIDs==""||sellDrugIDs==null){
								return false;
							};
							
							
							var state="2";
							$.ajax({
								type:"POST",
								url:url+"/cli/sellDrug/changeState/"+state+"?sellDrugIDs="+sellDrugIDs+"&token="+token+"&mintime="+new Date().getTime(),
								traditional:true,
								dataType:"json",
								success:function(data){
									gadget_login(data);
									if(data.code==1){
										gadget_popupt("上架成功");
										setTimeout(gadget_relo,3000);
									}else{
										gadget_popupt("上架失败，"+data.message);
									};
								},
								error:function(){
									gadget_popupt("上架失败，请刷新重试");
								}
							});
						})
						
						//批量下架
						$("#bigbja").click(function(){
							//alert($(".isasdbo input[name='checkbox']").is(":checked"))
							var sellDrugIDs=[];
							for(var i=0;i<$(".isasdbo input[name='checkbox']").length;i++){
								if($(".isasdbo input[name='checkbox']").eq(i).is(":checked")==true){
									if($(".isasdbo input[name='checkbox']").eq(i).parent(".ismymin").parent(".cmanisdong").attr("name")==-1){
										gadget_popupt("提交失败，选中商品中有已下架商品");
										return false;
									};
									if($(".isasdbo input[name='checkbox']").eq(i).parent(".ismymin").parent(".cmanisdong").attr("name")==1){
										gadget_popupt("提交失败，选中商品中有未编辑商品");
										return false;
									};
									sellDrugIDs.push($(".isasdbo input[name='checkbox']").eq(i).parent().attr("name"));
								}
							};
							if(sellDrugIDs==""||sellDrugIDs==null){
								return false;
							};
							var state="-1";
							
							$.ajax({
								type:"POST",
								url:url+"/cli/sellDrug/changeState/"+state+"?sellDrugIDs="+sellDrugIDs+"&token="+token+"&mintime"+new Date().getTime(),
								traditional:true,
								dataType:"json",
								success:function(data){
									gadget_login(data);
									if(data.code==1){
										gadget_popupt("下架成功");
										setTimeout(gadget_relo,3000);
									}else{
										gadget_popupt("下架失败，"+data.message);
									};
								},
								error:function(){
									gadget_popupt("下架失败，请刷新重试");
								}
							});
						})
	}
	
})
