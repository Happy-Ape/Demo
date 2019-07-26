$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var key="";
	var pagesize="10";
	var type="1";
	var state="0";
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
	$("#buyisxx").click(function(){
		$("#buytj").hide();
		$("#buytjbig input[name='simpledesc']").val("");
		$("#buytjbig input[name='limitcount']").val("");
		$("#redmon").val("");
		$("#pasmon").val("");
		$("#buytjbig textarea[name='detaildesc']").val("");
		$(".isbuysn").remove();
		$("#buytj").attr("name","");
	});
	$("#numbtn").click(function(){
		if($(".isbuysn").length>5){
			gadget_popupt("不能添加更多")
			return false;
		};
		var buymai=$("#buytjbig input[name='buymai']").val();
		if(buymai==""||buymai==null){
			gadget_popupt("请填写购买个数");
			return false;
		};
		
		var buyzen=$("#buyzen").val();
		var buyzent=$("#buyzent").val();
		html='<span class="isbuysn">买';
		html+=buymai;
		html+='个';
		html+=buyzen;
		html+='.';
		html+=buyzent;
		html+='折</span>';
		if($(".isbuysn").length>0){
			for(var i=0;i<$(".isbuysn").length;i++){
				var hmbox=$(".isbuysn").eq(i).html();
				hmbox=hmbox.split("个");
				hmbox=hmbox[0].split("买");
				if(buymai==hmbox[1]){
					gadget_popupt("不能有相同的买入数量")
					return false;
				};
				
			};
		};
		$("#isbuyspan").after(html);
		$(".isbuysn").click(function(){
			$(this).remove();
		})
	});
	//显示
	$.ajax({
		type:"GET",
		url:url+"/cli/SA/getActivity/"+state+"/"+type+"/1/"+pagesize,
		data:{token:token,key:key,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			
			gadget_login(data);
			if(data.code==1){
				$(".cmaisp").show();
				gadget_m_remv($(".oldbanp"));
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
				$(".cmaisp").hide();
//				/oldbanp
				gadget_err_m("暂无数据",$(".oldbanp"))
			}
		},
		error:function(){
			$(".cmaisp").hide();
			gadget_err_m("网络错误，请重试",$(".oldbanp"))
		}
	});

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
					$(".cmaisp").show();
					gadget_m_remv($(".oldbanp"))
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
					$("#isdangq").html("1");
				}else{
					gadget_popups("暂无数据");
				}
			},
			error:function(){
				gadget_popups("网络错误，请重试");
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
					if(data.lists[i].state!="已结束"){
						html+='<span class="sofdit">编辑活动</span>';
						html+='<span class="addto">添加商品</span>';
					};
					html+='<span class="sofcancel">取消活动</span>';
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
										if($(".ismymor").eq(i).children("input").is(":checked")==true){
											cancelDrugIds+=$(".ismymor").eq(i).parent("tr").attr("name")+",";
										};
									};
									var drugids=cancelDrugIds.substring(0,cancelDrugIds.length-1);
									if(drugids.length=0){
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
												gadget_popupt("删除失败");
											}
										},
										error:function(){
											gadget_popupt("删除失败")
										}
									});
								});
								
								
								
							}else{
								gadget_popupt("当前活动没有商品参加");
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
								gadget_popupt("取消活动成功");
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popupt("取消失败.")
							}
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
									html+='个';
									html+=drr[i]/10;
									html+='折</span>';
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
					$("#sofbigfor").attr("name",$(this).parent().parent("tr").attr("name"));
					
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
		
		var brr="";
		var crr="";
		for(var i=0;i<$(".isbuysn").length;i++){
			var arr=$(".isbuysn").eq(i).html().split("个");
			var b=arr[0].split("买")
			brr+=b[1]+",";
			var c=arr[1].split("折")
			crr+=c[0]*10+",";
		};
		brr=brr.substring(0,brr.length-1);
		crr=crr.substring(0,crr.length-1);
		var centent=brr+";"+crr;
		var simpledesc=$("#buytjbig input[name='simpledesc']").val();
		var limitcount=$("#buytjbig input[name='limitcount']").val();
		var begindate=$("#redmon").val();
		var enddate=$("#pasmon").val();
		var detaildesc=$("#buytjbig textarea[name='detaildesc']").val();
		var activityid=$("#buytj").attr("name");
		var dat=begindate.split(" ");
		det=dat[1].split(":");
		dat=dat[0].split("-");
		//var mydat=dat[0]+dat[1]+dat[2];
		dat=dat[0]+dat[1]+dat[2]+det[0]+det[1]+det[2];
		var enddt=enddate.split(" ");
		enddet=enddt[1].split(":");
		enddt=enddt[0].split("-");
		enddt=enddt[0]+enddt[1]+enddt[2]+enddet[0]+enddet[1]+enddet[2];
		
		/*var mydate = new Date();
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
		};*/
		
		if(dt>mydat){
			gadget_popupt("开始时间不能小于当前时间");
			return false;
		};	
		
		
		if(enddt<=dat){
			gadget_popupt("结束时间不能大于开始时间");
			return false;
		};
		simpledesc=encodeURI(simpledesc);
		limitcount=encodeURI(limitcount);
		begindate=encodeURI(begindate);
		enddate=encodeURI(enddate);
		detaildesc=encodeURI(detaildesc);
		centent=encodeURI(centent);
		$.ajax({
			type:"POST",
			url:url+"/cli/SA/update?activityid="+activityid+"&token="+token+"&simpledesc="+simpledesc+"&limitcount="+limitcount+"&begindate="+begindate+"&enddate="+enddate+"&detaildesc="+detaildesc+"&centent="+centent+"&mintime="+new Date().getTime(),
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
	//添加活动
	$("#buybuybutn").click(function(){
		
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
		if($(".isbuysn").length==0){
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
		
		var simpledesc=$("#buytjbig input[name='simpledesc']").val();
		var limitcount=$("#buytjbig input[name='limitcount']").val();
		var begindate=$("#redmon").val();
		var enddate=$("#pasmon").val();
		var detaildesc=$("#buytjbig textarea[name='detaildesc']").val();
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
			gadget_popupt("开始时间不能小于当前时间");
			return false;
		};
		if(enddt<=dat){
			gadget_popupt("结束时间不能大于开始时间");
			return false;
		};
		var brr="";
		var crr="";
		for(var i=0;i<$(".isbuysn").length;i++){
			var arr=$(".isbuysn").eq(i).html().split("个");
			var b=arr[0].split("买")
			brr+=b[1]+",";
			var c=arr[1].split("折")
			crr+=c[0]*10+",";
		};
		brr=brr.substring(0,brr.length-1);
		crr=crr.substring(0,crr.length-1);
		var centent=brr+";"+crr;
		simpledesc=encodeURI(simpledesc);
		limitcount=encodeURI(limitcount);
		begindate=encodeURI(begindate);
		enddate=encodeURI(enddate);
		detaildesc=encodeURI(detaildesc);
		centent=encodeURI(centent);
		
		$.ajax({
			type:"POST",
			url:url+"/cli/SA/saveAct?token="+token+"&simpledesc="+simpledesc+"&limitcount="+limitcount+"&begindate="+begindate+"&enddate="+enddate+"&detaildesc="+detaildesc+"&centent="+centent+"&type=1&mintime="+new Date().getTime(),
			datatype:"json",
			success:function(data){
				
				data=JSON.parse(data);
				console.log(data)
				gadget_login(data);
				if(data.code==1){
					gadget_popupf("提交成功",0);
				}else{
					gadget_popupt("提交失败.")
				};
			},
			error:function(){
				gadget_popupt("网络错误，请重试");
			}
		});
	});
//添加商品
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
					html+='</P></td><td><span class="buyadd" name="';
					html+=data.lists[i].state;
					html+='">添加</span></td></tr>';
				};
				$("#sofbfor tbody").append(html);
				$(".buyadd").click(function(){
					var drugids=$(this).parent().parent("tr").attr("name");
					var activityid=$("#sofbigfor").attr("name");
					$.ajax({
						type:"POST",
						url:url+"/cli/SA/saveActDrugs",
						data:{token:token,drugIds:drugids,activityid:activityid},
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
							
		}
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
	
})
