$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var selluserid=$.cookie('peopleus');
	var categoryid="";
	$(".ismulas .ismufis input").click(function(){
		if(this.checked){
			$(".ismulasbig .ismufis input").attr("checked",true);
		}else{
			$(".ismulasbig .ismufis input").attr("checked",false);
		}
		
	});
	$("#boxpass").click(function(){
		$("#shopback").hide();
	});
	
	
	$("#ismpansel").change(function(){
		
		categoryid=$(this).val();
		ismulis();
	});
	$.ajax({
		type:"get",
		url:url+"/cli/CC/getStoreCategory/-3",
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					categoryid=data.lists[0].categoryid;
					html+='<option value="';
					html+=data.lists[i].categoryid;
					html+='">';
					html+=data.lists[i].name;
					html+='</option>';
				};
				$("#ismpansel").append(html);
				ismulis();
			};
		},
		error:function(){
			
		}
	});

	function ismulis(){
		$(".ismulis").remove();
		var html='';
		for(var i=0;i<10;i++){
			html+='<div class="ismulis"><h5>位置<span>';
			html+=i+1;
			html+='</span></h5><div class="endbox">';
			html+='<img src="../imgeas/tjian.png" /></div></div>';
		};
		$("#ismulasbig").append(html);
			$.ajax({
		type:"get",
		url:url+"/cli/homeDrug/getSuRd/"+categoryid+"/"+selluserid+"/2",
		data:{token:" "},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				for(var i=0;i<data.lists.length;i++){
					var html='';
					html+='<div class="ismulispic"><img src="';
					var listimgs=data.lists[i].listimg.split(";")
					html+=listimgs[0];
					html+='" /></div><div class="ismultxt" name="';
					html+=data.lists[i].drugid;
					html+='"><p>';
					html+=data.lists[i].aliascn;
					html+='</p><p>价格：￥<span>';
					html+=data.lists[i].sellPrice;
					html+='</span></p><p>生产厂家：';
					html+=data.lists[i].manufacturer;
					html+='</p><p>库存:<span>';
					html+=data.lists[i].sellstock;
					html+='</span>规格：<span>';
					html+=data.lists[i].specification;
					html+='</span></p></div><div class="boxremo"><p>取消推荐</p></div>';
					var eqsort=data.lists[i].sort;
					$('.ismulis').eq(eqsort-1).children(".endbox").remove();
					$('.ismulis').eq(eqsort-1).append(html);
				};
				$(".ismulis").mouseleave(function(){
					$(this).children(".boxremo").hide();
				}).mouseenter(function(){
					$(this).children(".boxremo").show();
				});
				$(".boxremo").click(function(){
					var drug=$(this).siblings(".ismultxt").attr("name");
					//alert(drug+"drug")
					$.ajax({
						type:"get",
						url:url+"/cli/hd/deleteSuRd/"+drug,
						data:{token:token},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popupt("取消成功");
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popupt("取消失败"+data.message);
							};
						},
						error:function(){
							gadget_popupt("取消失败，请刷新重试");
						}
					});
				});
				
				
			}
		},
		error:function(){
			
		}
	});
		
		$(".endbox").click(function(){
			$("#shopback").show();
			$(document).scrollTop(0);
			var sort=$(this).parent(".ismulis").index();
			$.ajax({
				type:"get",
				url:url+"/cli/hd/getSuNotRd",
				data:{token:token},
				dataType:"json",
				success:function(data){
					gadget_login(data);
					if(data.code==1){
						$("#ismulastab tr").remove();
						var htm='';
						for(var c=0;c<data.lists.length;c++){
							htm+='<tr name="';
							htm+=data.lists[c].drugid;
							htm+='"><td>';
							htm+=data.lists[c].aliascn;
							htm+='</td><td>';
							htm+=data.lists[c].manufacturer;
							htm+='</td><td>';
							htm+=data.lists[c].sellPrice;
							htm+='</td><td>';
							htm+=data.lists[c].specification;
							htm+='</td><td>';
							htm+=data.lists[c].sellstock;
							htm+='</td><td>';
							htm+=data.lists[c].sales;
							htm+='</td><td><input type="button" class="ismulasbt" value="添加推荐"/></td></tr>';
						};
						$("#ismulastab").append(htm);
						$(".ismulasbt").click(function(){
							var drugid=$(this).parents("tr").attr("name");
							sort=Number(sort)+1;
							console.log(drugid);
							//alert(sort+"sort");
							//alert(categoryid+"categoryid");
							//alert(selluserid+"selluserid");
							$.ajax({
								type:"post",
								url:url+"/cli/homeDrug/saveSuRd/",
								data:{token:token,drugid:drugid,sort:sort,selluserid:selluserid,type:categoryid},
								dataType:"json",
								success:function(data){
									gadget_login(data);
									if(data.code==1){
										gadget_popupt("添加成功");
										setTimeout(gadget_relo,3000);
									}else{
										gadget_popupt("添加失败");
									};
								},
								error:function(){
									
								}
							});
						});
					}else{
						gadget_popupt("暂无可添加药品");
					};
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					console.log(XMLHttpRequest+"XMLHttpRequest");
					console.log(textStatus+"textStatus");
					console.log(errorThrown+"errorThrown");
				}
			});
			
			
			
		});
		
		
		
	};
	
	
})
