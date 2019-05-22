$(function(){
	jQuery.support.cors = true;
	
	
	var token=$.cookie('peoplemessage');
	var buymai=[];
	var buyzen=[];
	var key="";
	var pagesize="10";
	var type="2";
	var state="0";
	$("#buyisxx").click(function(){
		$("#buytj").hide();
		$("#buytjbig input[name='simpledesc']").val("");
		$("#buytjbig input[name='limitcount']").val("");
		$("#redmon").val("");
		$("#pasmon").val("");
		$("#buytjbig textarea[name='detaildesc']").val("");
		$(".isbuysn").remove();
		$("#buytj").attr("name","");
		buymai=[];
		buyzen=[];
	});
	$("#buybutton").click(function(){
		$("#buybuybutn").show();
		$("#buysofbutn").hide();
		$("#buytj").show();
	});
	$("#isxx").click(function(){
		$("#sofbigfor").hide();
	});
	$(".buynon").click(function(){
		$("#buydti").hide();
		$("#tdnonoy tr").remove();
	});
	$.ajax({
		type:"GET",
		url:url+"/cli/SA/getActivity/"+state+"/"+type+"/1/"+pagesize,
		data:{token:token,key:key,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				resop(data);
				var st="";
					st=data.message/pagesize;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
			}else{
				gadget_popupt("当前无买赠活动");
				$(".sofsp").hide();
			};
		},
		error:function(){
			
		}
	});
	/*$.ajax({
		type:"GET",
		url:url+"/drug/getCategory/0",
		dataType:"json",
		success:function(data){
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<option value="';
					html+=data.lists[i].cateid;
					html+='">';
					html+=data.lists[i].catename;
					html+='</option>';
				}
				$("#ismfo select .oneop").after(html)
			}
		},
		error:function(){
			
		}
	});*/
	//下一页
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",// /cli/sellDrug/getQuaryDrugs/{cateid}/0/1/{nowPage}/{pageSize}?token=?&key=?
			url:url+"/cli/SA/getActivity/"+state+"/"+type+"/"+open+"/"+pagesize,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resop(data);
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
	//上一页
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/SA/getActivity/"+state+"/"+type+"/"+open+"/"+pagesize,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resop(data);
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
			url:url+"/cli/SA/getActivity/"+state+"/"+type+"/"+open+"/"+pagesize,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resop(data);
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
	//搜索
	$("#buysearch").click(function(){
		key=$("#buyform input[type='text']").val();
		state=$("#buyform select").val();
		$.ajax({
			type:"GET",
			url:url+"/cli/SA/getActivity/"+state+"/"+type+"/1/"+pagesize,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".soflis tbody tr").remove();
					resop(data);
					var st="";
					st=data.message/pagesize;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1")
				};
			},
			error:function(){
				
			}
		});
	});
	
	function resop(data){
		var html="";
				for(var i=0;i<data.lists.length;i++){
					html+='<tr name="';
					html+=data.lists[i].activityid;
					html+='"><td><P>';
					html+=data.lists[i].simpledesc;
					html+='</P></td><td><P>';
					html+=data.lists[i].begindate;
					html+="到";
					html+=data.lists[i].enddate;
					html+='</P></td><td><P>';
					if(data.lists[i].state=="1"){
						data.lists[i].state="进行中"
					};
					if(data.lists[i].state=="2"){
						data.lists[i].state="未开始"
					};
					if(data.lists[i].state=="-1"){
						data.lists[i].state="已结束"
					};
					html+=data.lists[i].state;
					html+='</P></td><td><P>';
					html+=data.lists[i].limitcount;
					html+='</P></td><td>';
					html+='<span class="sofcancel">取消活动</span>';
					if(data.lists[i].state!="已结束"){
						html+='<span class="sofdit">编辑活动</span>';
						html+='<span class="addto">添加商品</span>';
					};
					html+='<span class="buydit">编辑商品</span></td></tr>';
				};
				$(".soflis tbody").append(html);
				//编辑商品
				$(".buydit").click(function(){
					var activityid=$(this).parent().parent().attr("name");
					$("#buydti").show();
					$.ajax({
						type:"GET",
						url:url+"/cli/SA/editActDrug/"+activityid,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								var html='';
								for(var i=0;i<data.lists.length;i++){
									html+='<tr name="';
									html+=data.lists[i].selldrugid;
									html+='">';
									html+='<td class="ismymor"><input type="checkbox"></td>';
									html+='<td><P>';
									html+=data.lists[i].namecn;
									html+='</P></td><td><P>';
									html+=data.lists[i].manufacturer;
									html+='</P></td><td><P>';
									html+=data.lists[i].sellprice;
									html+='</P></td><td><P>';
									html+=data.lists[i].specification;
									html+='</P></td><td><P>';
									if(data.lists[i].sales==null){
										data.lists[i].sales=0;
									};
									html+=data.lists[i].sales;
									html+='</P></td></tr>';
								};
								$("#tdnonoy").append(html);
								$(".buysop").click(function(){
									var cancelDrugIds="";
									for(var i=0;i<=$("#tdnonoy tr").length;i++){
										if($("#tdnonoy tr").eq(i).children(".ismymor").children("input").is(":checked")==true){
											cancelDrugIds+=$("#tdnonoy tr").eq(i).attr("name")+",";
										};
									};
									//alert(cancelDrugIds+"cancelDrugIds");
									
									var drugids=cancelDrugIds.substring(0,cancelDrugIds.length-1);
									if(drugids.length=0||drugids==""||drugids==null){
										return false;
									};
									
									$.ajax({
										type:"GET",
										url:url+"/cli/SA/updateActDrug/"+drugids,
										data:{token:token,mintime:new Date().getTime()},
										dataType:"json",
										success:function(data){
											gadget_login(data);
											if(data.code==1){
												gadget_popupt("删除成功");
												setTimeout(gadget_relo,3000);
											}else{
												gadget_popups("删除失败");
											}
										},
										error:function(){
											gadget_popups("删除失败")
										}
									});
								});
								
								
								
							}else{
								gadget_popups("当前活动没有商品参加");
							}
						},
						error:function(){
							gadget_popupt("获取失败");
						}
					});
				});
				//取消活动
				$(".sofcancel").click(function(){
					var activityid=$(this).parent().parent("tr").attr("name");
					$.ajax({
						type:"GET",
						url:url+"/cli/SA/delete/"+activityid,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popups("取消活动成功");
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popups("取消失败.")
							};
						},
						error:function(){
							gadget_popupt("取消失败")
						}
						
					});
				})
				//编辑活动
				$(".sofdit").click(function(){
					var activityid=$(this).parent().parent("tr").attr("name");
					$.ajax({
						type:"GET",
						url:url+"/cli/SA/getInfo/"+activityid,
						data:{token:token,mintime:new Date().getTime()},
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								$("#buytj").show();
								$("#buytj").attr("name",activityid)
								$("#buybuybutn").hide();
								$("#buysofbutn").show();
								$("#buytjbig input[name='simpledesc']").val(data.pojo.simpledesc);
								$("#buytjbig input[name='limitcount']").val(data.pojo.limitcount);
								$("#redmon").val(data.pojo.begindate);
								$("#pasmon").val(data.pojo.enddate);
								$("#buytjbig textarea[name='detaildesc']").val(data.pojo.detaildesc);
								var arr=data.pojo.centent.split(";");
								var crr=arr[0].split(",");
								var drr=arr[1].split(",");
								var html='';
								for(var i=0;i<crr.length;i++){
									html+='<span class="isbuysn" title="点击删除">买';
									html+=crr[i];
									html+='赠';
									html+=drr[i];
									html+='</span>';
								};
								$("#isbuyspan").after(html);
							}else{
								gadget_popupt("获取失败.")
							}
						},
						error:function(){
							gadget_popupt("获取失败")
						}
					});
				});
				$(".addto").click(function(){
					$("#sofbigfor").show();
					$("#sofbigfor").attr("name",$(this).parent().parent("tr").attr("name"))
					
				});
	}

	
	//批量添加.is(":checked")==true
	$("#ismfo input[type='button']").click(function(){
		var drugIds='';
		var activityid=$("#sofbigfor").attr("name");
			for(var i=0;i<$("#tdnoy tr").length;i++){
				if($(".ismymor").eq(i).children("input").is(":checked")==true){
					drugIds+=$(".ismymor").eq(i).parent("tr").attr("name")+",";
				};
			};
			var drugids=drugIds.substring(0,drugIds.length-1);
			if(drugids.length=0){
				return false;
			};
			if(drugIds==""||drugIds==null){
				gadget_popupt("请选择商品");
				return false;
			};
			$.ajax({
				type:"POST",
				url:url+"/cli/SA/saveActDrugs?token="+token+"&drugIds="+drugids+"&activityid="+activityid+"&mintime="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					gadget_login(data);
					if(data.code==1){
						gadget_popups("添加成功");
						getalld();
					}else{
						gadget_popupt("添加失败.")
					}
				},
				error:function(){
					gadget_popupt("添加失败")
				}
			});
			
	});
	//添加商品搜索
	getalld();
	function getalld(){
		$("#sofbfor tbody tr").remove();
		$.ajax({
		type:"GET",
		url:url+"/cli/SA/getAllmyDrug",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<tr name="';
					html+=data.lists[i].selldrugid;
					html+='"><td class="ismymor"><input type="checkbox"></td><td><P>';
					html+=data.lists[i].namecn;
					html+='</P></td><td><P>';
					html+=data.lists[i].manufacturer;
					html+='</P></td><td><P>';
					html+=data.lists[i].sellprice;
					html+='</P></td><td><P>';
					html+=data.lists[i].specification;
					html+='</P></td><td><P>';
					if(data.lists[i].sales==null){
						data.lists[i].sales=0;
					};
					html+=data.lists[i].sales;
					html+='</P></td><td><span class="buyadd">添加</span></td></tr>';
				};
				$("#sofbfor tbody").append(html);
				$(".buyadd").click(function(){
					var drugids=$(this).parent().parent("tr").attr("name");
					var activityid=$("#sofbigfor").attr("name");
					$.ajax({
						type:"POST",
						url:url+"/cli/SA/saveActDrugs?token="+token+"&drugIds="+drugids+"&activityid="+activityid+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								gadget_popups("添加成功");
								getalld();
							}else{
								gadget_popupt("添加失败.")
							}
						},
						error:function(){
							gadget_popupt("添加失败")
						}
					});
				})
				
				
			};
		},
		error:function(){
				gadget_popupt("请刷新重试");			
		}
	});
	}
	//编辑活动提交
	$("#buysofbutn").click(function(){
		if($("#buytjbig input[name='simpledesc']").val()==""){
			$(".minspan").eq(0).show();
			return false;
		}else{
			$(".minspan").eq(0).hide();
		};
		if($("#buytjbig input[name='limitcount']").val()==""){
			$(".minspan").eq(1).show();
			return false;
		}else{
			$(".minspan").eq(1).hide();
		};
		if($("#redmon").val()==""){
			$(".minspan").eq(2).show();
			return false;
		}else{
			$(".minspan").eq(2).hide();
		};
		if($("#pasmon").val()==""){
			$(".minspan").eq(3).show();
			return false;
		}else{
			$(".minspan").eq(3).hide();
		};
		if($(".isbuysn").length=="0"){
			$(".minspan").eq(4).show();
			return false;
		}else{
			$(".minspan").eq(4).hide();
		};
		if($("#buytjbig textarea[name='detaildesc']").val()==""){
			$(".minspan").eq(5).show();
			return false;
		}else{
			$(".minspan").eq(5).hide();
		};
		var centent="";
		var centt="";
		
		for(var i=0;i<$(".isbuysn").length;i++){
			var arr=$(".isbuysn").eq(i).html().split("买")
			var bbrr=arr[1].split("赠");
			centent+=bbrr[0]+",";
			centt+=bbrr[1]+",";
			//centent+=$(".isbuysn").eq(i).html()+";";
		};
		centent=centent.substring(0,centent.length-1);
		centt=centt.substring(0,centt.length-1);
		var newstart=centent+";"+centt;
		var simpledesc=$("#buytjbig input[name='simpledesc']").val();
		var limitcount=$("#buytjbig input[name='limitcount']").val();
		var begindate=$("#redmon").val();
		var enddate=$("#pasmon").val();
		var detaildesc=$("#buytjbig textarea[name='detaildesc']").val();
		var activityid=$("#buytj").attr("name");
		newstart=encodeURI(newstart);
		simpledesc=encodeURI(simpledesc);
		limitcount=encodeURI(limitcount);
		begindate=encodeURI(begindate);
		enddate=encodeURI(enddate);
		detaildesc=encodeURI(detaildesc);
		$.ajax({
			type:"POST",
			url:url+"/cli/SA/update",
			data:{activityid:activityid,token:token,simpledesc:simpledesc,limitcount:limitcount,begindate:begindate,enddate:enddate,detaildesc:detaildesc,centent:newstart,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("编辑保存成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popupt("编辑保存失败");
				}
			},
			error:function(){
				gadget_popupt("编辑保存失败");
			}
		});
		
		
		
	})
	
	
	$("#numbtn").click(function(){
		if($(".isbuysn").length>6){
			gadget_popupt("请删除后再添加");
			return false;
		}
		if($("#buytjbig input[name='buymai']").val()==""){
			gadget_popupt("请正确输入");
			return false;
		};
		if($("#buytjbig input[name='buyzen']").val()==""){
			gadget_popupt("请正确输入");
			return false;
		};
		var mai=$("#buytjbig input[name='buymai']").val();
		var zen=$("#buytjbig input[name='buyzen']").val();
		for(var i=0;i<buymai.length;i++){
			if(mai==buymai[i]){
				gadget_popups("不能有相同的买入数量");
				return false;
			};
		};
		if(parseInt(zen)>parseInt(mai)){
			gadget_popupt("当前赠送数量大于购买数量请注意查看");
		};
		buymai.push(mai);
		buyzen.push(zen);
		var html='<span class="isbuysn" title="点击删除">买';
		html+=$("#buytjbig input[name='buymai']").val();
		html+='赠';
		html+=$("#buytjbig input[name='buyzen']").val();
		html+='</span>';
		$("#isbuyspan").after(html);
		$(".isbuysn").click(function(){
			$(this).remove();
			var th=$(this).html();
			var oh=th.split("买");
			var th=oh[1].split("赠");
			var thind="";
			for(var i=0;i<buymai.length;i++){
				if(buymai[i]==th[0]){
					thind=i;
				}
			};
			function removeind(arr, index) {
  				arr.splice(index, 1);
			};
			removeind(buymai,thind);
			removeind(buyzen,thind);
	});
	});
	
	$("#buybuybutn").click(function(){
		var simpledesc=$("#buytjbig input[name='simpledesc']").val();
		var limitcount=$("#buytjbig input[name='limitcount']").val();
		var detaildesc=$("#buytjbig textarea[name='detaildesc']").val();
		var begindate=$("#redmon").val();
		if(begindate==""||begindate==null){
			return false;
		};
		var enddate=$("#pasmon").val();
		if(enddate==""||enddate==null){
			return false;
		};
		var dat=begindate.split(" ");
		det=dat[1].split(":");
		dat=dat[0].split("-");
		var mydat=dat[0]+dat[1]+dat[2];
		dat=dat[0]+dat[1]+dat[2]+det[0]+det[1]+det[2];
		var enddt=enddate.split(" ");
		enddet=enddt[1].split(":");
		enddt=enddt[0].split("-");
		enddt=enddt[0]+enddt[1]+enddt[2]+enddet[0]+enddet[1]+enddet[2];
		var mydate = new Date();
		var dt="";
		dt+=mydate.getFullYear(); //获取完整的年份(4位,1970-????)
		var tfdate=mydate.getMonth()+1
		if(tfdate<10){
			tfdate="0"+tfdate
		};
		dt+=tfdate; //获取当前月份(0-11,0代表1月)
		var datte="";
		datte=mydate.getDate();
		//alert(datte.length)
		if(datte<10){
			dt+="0"+mydate.getDate();
		}else{
			dt+=mydate.getDate(); //获取当前日(1-31)
		};
		
		if(dt>mydat){
			gadget_popups("开始时间不能小于当前时间");
			return false;
		};	
		
		if(enddt<=dat){
			gadget_popups("结束时间不能大于开始时间");
			return false;
		};
		if(simpledesc==""){
			$(".minspan").eq(0).show();
			return false;
		}else{
			$(".minspan").eq(0).hide();
		};
		if(limitcount==""){
			$(".minspan").eq(1).show();
			return false;
		}else{
			$(".minspan").eq(1).hide();
		};
		if(begindate==""){
			$(".minspan").eq(2).show();
			return false;
		}else{
			$(".minspan").eq(2).hide();
		};
		if(enddate==""){
			$(".minspan").eq(3).show();
			return false;
		}else{
			$(".minspan").eq(3).hide();
		};
		if($(".isbuysn").length==0){
			$(".minspan").eq(4).show();
			return false;
		}else{
			$(".minspan").eq(4).hide();
		};
		if(detaildesc==""){
			$(".minspan").eq(5).show();
			return false;
		}else{
			$(".minspan").eq(5).hide();
		};
		var centent="";
		var centt="";
		
		for(var i=0;i<$(".isbuysn").length;i++){
			var arr=$(".isbuysn").eq(i).html().split("买")
			var bbrr=arr[1].split("赠");
			centent+=bbrr[0]+",";
			centt+=bbrr[1]+",";
			//centent+=$(".isbuysn").eq(i).html()+";";
		};
		centent=centent.substring(0,centent.length-1);
		centt=centt.substring(0,centt.length-1);
		var newstart=centent+";"+centt;
		limitcount=encodeURI(limitcount);
		simpledesc=encodeURI(simpledesc);
		begindate=encodeURI(begindate);
		enddate=encodeURI(enddate);
		newstart=encodeURI(newstart);
		detaildesc=encodeURI(detaildesc);
		
		$.ajax({
			type:"POST",
			url:url+"/cli/SA/saveAct",
			data:{limitcount:limitcount,simpledesc:simpledesc,begindate:begindate,enddate:enddate,centent:newstart,type:2,detaildesc:detaildesc,token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("提交成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popupt("提交失败");
				}
			},
			error:function(){
				
			}
		});
	});
	
	
	
	
	
})
