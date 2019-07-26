$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var cateid="0";
	var type=4;
	var str=10;
	var open=1;
	
	//return false;
	var state=getUrlParamo("ste");
	var key=getUrlParamo("ke");
	if(state==null){
		state=0;
	};
	if(key==null){
		key="";
	}
	$("#sofste").val(state);
	$("#istjbutton").click(function(){
		$("#buytj").show();
	});
	$("#buyisxx").click(function(){
		$("#buytj").attr("omgn","");
		$("#simpledesc,#redmon,#pasmon").val("");
		$("#buytj").hide();
	});
	$("#sofobutton").click(function(){
		var star=$("#sofste").val();
		var myk=$("#sofname").val();
		myk=encodeURI(myk);
		window.location.href="soffer.html?ste="+star+"&ke="+myk;
	});
	$(".inpimg").click(function(){
		cphide();
	});
	function cphide(){
			$(".shopcp span,.shopmny span").html("");
			$("#typnum,#limitbuynum").val("");
			$(".sofbiginp").hide();
			$("#inpbutton").attr("omgn","");
	};
	$(".sofhx").click(function(){
		$("#sofbigshop tbody tr").remove();
		$("#sofbig").attr("omgn","");
		$("#sofbig").hide();
	});
	var objs="";
	var alerttxt=1;
	$("#inpbutton").click(function(){
		var actid=$("#sofbig").attr("omgn");
		var dugids=$(this).attr("omgn");
		var selid=$(this).attr("omgn");
		var discountprice=$("#typnum").val();
		var limitbuynum=$("#limitbuynum").val();
		if(discountprice==""||discountprice==null||discountprice<=0){
			gadget_popupt("请输入正确的价格");
			return false;
		};
		if(limitbuynum==""||limitbuynum==null||limitbuynum<=0){
			gadget_popupt("请输入正确的限购数量");
			return false;
		};
		$(this).attr("disabled","disabled");
		$.ajax({
			type:"get",
			url:url+"/cli/sellDrug/updateSellDrug?discountprice="+discountprice+"&limitbuynum="+limitbuynum+"&activityid="+actid+"&token="+token+"&selldrugid="+dugids+"&time="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				$("#inpbutton").removeAttr("disabled");
				$("#imgbox").hide();
				if(data.code==1){
					
					if(alerttxt==2){
						gadget_popupt("编辑成功");
						setTimeout(gadget_relo,3000);
					}else{
						gadget_popupt("添加成功");
						objs.remove();
						
					};
					cphide();
				}else if(data.code==-2){
					if(alerttxt==2){
						gadget_popupt("编辑失败,参与数量大于库存");
					}else{
						gadget_popupt("添加失败,参与数量大于库存");
					};
					
				}else{
					if(alerttxt==2){
						gadget_popupt("编辑失败");
					}else{
						gadget_popupt("添加失败");
					};
				};
			},
			error:function(){
				$("#inpbutton").removeAttr("disabled");
				$("#imgbox").hide();
				gadget_popupt("编辑失败，请刷新重试");
			}
		});
	});
	$("#buybuybutn").click(function(){
		var simpledesc=$("#buytjbig input[name='simpledesc']").val();
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
		
		if(begindate==""){
			$(".minspan").eq(1).show();
			return false;
		}else{
			$(".minspan").eq(1).hide();
		};
		if(enddate==""){
			$(".minspan").eq(2).show();
			return false;
		}else{
			$(".minspan").eq(2).hide();
		};
		console.log(begindate+"begindate")
		console.log(enddate+"enddate")
		console.log(simpledesc+"simpledesc")
		simpledesc=encodeURI(simpledesc);
		begindate=encodeURI(begindate);
		enddate=encodeURI(enddate);
		if($("#buytj").attr("omgn")!=""&&$("#buytj").attr("omgn")!=null&&$("#buytj").attr("omgn")!=undefined){
			var activityid=$("#buytj").attr("omgn");
			$.ajax({
			type:"POST",
			url:url+"/cli/SA/update?activityid="+activityid+"&simpledesc="+simpledesc+"&begindate="+begindate+"&enddate="+enddate+"&type=4&token="+token+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("编辑成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popupt("编辑失败");
				}
			},
			error:function(){
				gadget_popupt("编辑失败,请刷新重试");
			}
		});
			
		}else{
		$.ajax({
			type:"POST",
			url:url+"/cli/SA/saveAct?simpledesc="+simpledesc+"&begindate="+begindate+"&enddate="+enddate+"&type=4&token="+token+"&mintime="+new Date().getTime(),
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
				gadget_popupt("提交失败,请刷新重试");
			}
		});
		}
	});

	ferlis();
	//上一页
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		gadget_back("加载中...");
		$.ajax({
			type:"GET",
			url:url+"/cli/SA/getActivity/"+state+"/"+type+"/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				gadget_back_remove();
				if(data.code==1){
					fertlis(data);
					$("#isdangq").html(open);
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_back_remove();
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
		gadget_back("加载中...");
		$.ajax({
			type:"GET",
			url:url+"/cli/SA/getActivity/"+state+"/"+type+"/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				gadget_back_remove();
				if(data.code==1){
					fertlis(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_back_remove();
				gadget_popupt("获取失败")
			}
		});
	})
	//跳转
	$("#ismytzan").click(function(){
		open=parseInt($(".cmaisp input[type='number']").val());
		if(open==""){
			return false;
		};
		if(open>$("#ismyipik").html()){
			open=$("#ismyipik").html();
		};
		if(open<"1"){
			open="1";
		};
		gadget_back("加载中...");
		$.ajax({
			type:"GET",
			url:url+"/cli/SA/getActivity/"+state+"/"+type+"/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				gadget_back_remove();
				if(data.code==1){
					fertlis(data);
					$("#isdangq").html(open)
				}else{
					gadget_popupt("获取失败.")
				}
			},
			error:function(){
				gadget_back_remove();
				gadget_popupt("获取失败")
			}
		});
	});
function ferlis(){
	gadget_back("加载中...");
	$.ajax({
		type:"get",
		url:url+"/cli/SA/getActivity/"+state+"/"+type+"/"+open+"/"+str,
		data:{token:token,key:key,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			gadget_back_remove();
			if(data.code==1){
				fertlis(data);
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
				gadget_back_remove();
				gadget_popupt("暂无列表");
			};
		},
		error:function(){
			gadget_popupt("获取失败，请刷新重试")
		}
	});
};

function fertlis(data){
	gadget_back_remove();
	var html='';
	$(".soflis tbody tr").remove();
	for(var i=0;i<data.lists.length;i++){
		//console.log(data.lists[i].simpledesc+"..."+data.lists[i].state);
		html+='<tr name="';
		html+=data.lists[i].activityid;
		html+='"><td  class="sofnams "><p>'+data.lists[i].simpledesc+'</p></td><td class="minh begin"><p>';
		html+=data.lists[i].begindate;
		html+='</p></td><td class="minh endd"><p>';
		html+=data.lists[i].enddate;
		html+='</p></td><td class="minh"><p>';
		html+=data.lists[i].createdate;
		html+='</p></td><td class="minh"><p>';
		if(data.lists[i].updatedate==""||data.lists[i].updatedate==null||data.lists[i].updatedate==undefined){
			data.lists[i].updatedate="未编辑";
		};
		html+=data.lists[i].updatedate;
		html+='</p></td><td class="minh"><p>';
		
		if(data.lists[i].state==1){
			data.lists[i].state="进行中";
			html+=data.lists[i].state;
			html+='</p></td><td>';
			html+='<span class="remnot">取消活动</span><span class="editsof">编辑商品</span><span class="addpubt">添加商品</span></td></tr>';
		};
		if(data.lists[i].state==2){
			data.lists[i].state="未开始";
			html+=data.lists[i].state;
		html+='</p></td><td>';
			html+='<span class="liksof">编辑活动</span>';
			html+='<span class="remnot">取消活动</span><span class="editsof">编辑商品</span><span class="addpubt">添加商品</span></td></tr>';
		};
		if(data.lists[i].state==-1){
			data.lists[i].state="已过期";
			html+=data.lists[i].state;
			html+='</p></td><td></td></tr>';
		};
		
		};
		$(".soflis tbody").append(html);
		$(".liksof").click(function(){
			$("#buytj").show();
			$("#buytj").attr("omgn",$(this).parents("tr").attr("name"))
			var denams=$(this).parents("td").siblings(".sofnams").children("p").html();
			var denbeg=$(this).parents("td").siblings(".begin").children("p").html();
			var deendd=$(this).parents("td").siblings(".endd").children("p").html();
			$("#simpledesc").val(denams);
			$("#redmon").val(denbeg);
			$("#pasmon").val(deendd);
		});
		$(".remnot").click(function(){
			var activityid=$(this).parents("tr").attr("name");
			var obj=$(this).parents("tr");
			$.ajax({
					type:"GET",
					url:url+"/cli/SA/delete/"+activityid,
					data:{token:token,mintime:new Date().getTime()},
					dataType:"json",
					success:function(data){
						gadget_login(data);
						if(data.code==1){
							gadget_popups("取消活动成功");
							obj.remove();
							//setTimeout(gadget_relo,3000);
						}else{
							gadget_popups("取消失败.")
						};
					},
					error:function(){
						gadget_popupt("取消失败")
					}
				});
		});
		$(".addpubt").click(function(){
			
			$("#sofbig").attr("omgn",$(this).parents("tr").attr("name"));
			$("#sofbig").show();
			gadget_back("加载中...");
			$("#sofbigshop thead tr th").remove();
			var caml='<th class="ismyman"><p>商品名称</p></th><th class="ismyman"><p>生产厂家</p></th>';
			caml+='<th><p>库存</p></th><th><p>售价(元)</p></th><th><p>规格</p></th><th><p>累计销量</p></th><th><p>操作</p></th>';
			$("#sofbigshop thead tr").append(caml);
			$.ajax({
				type:"get",
				url:url+"/cli/SA/getAllmyDrug",
				data:{token:token,mintime:new Date().getTime()},
				dataType:"json",
				success:function(data){
					gadget_login(data);
					gadget_back_remove();
					if(data.code==1){
						var html='';
						for(var i=0;i<data.lists.length;i++){
					html+='<tr name="';
					html+=data.lists[i].selldrugid;
					html+='"><td class="sofnamu"><P>';
					html+=data.lists[i].namecn;
					html+='</P></td><td><P>';
					html+=data.lists[i].manufacturer;
					html+='</P></td><td><p>';
					html+=data.lists[i].sellstock;
					html+='</p></td><td class="sofprice"><P>';
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
					$("#sofbigshop tbody").append(html);
					$(".buyadd").click(function(){
						var sofnamu=$(this).parents("td").siblings(".sofnamu").children("p").html();
						var sofprice=$(this).parents("td").siblings(".sofprice").children("p").html();
						$(".shopcp span").html(sofnamu);
						$(".shopmny span").html(sofprice);
						$("#inpbutton").attr("omgn",$(this).parents("tr").attr("name"));
						$(".sofbiginp").show();
						
						objs=$(this).parents("tr");
						alerttxt=1;
					});
					}else{
						gadget_popupt("暂无商品");
					};
				},
				error:function(){
					gadget_popupt("获取失败，请刷新重试");
					gadget_back_remove();
				}
			});
		});
		$(".editsof").click(function(){
			var actidd=$(this).parents("tr").attr("name")
			$("#sofbig").attr("omgn",actidd);
			$("#sofbigshop thead tr th").remove();
			var tcml='<th class="ismyman"><p>商品名称</p></th>';
			tcml+='<th><p>库存</p></th><th><p>售价(元)</p></th><th><p>规格</p></th><th><p>特价</p></th><th><p>限购</p></th><th><p>操作</p></th>';
			$("#sofbigshop thead tr").html(tcml);
			$("#sofbig").show();
			gadget_back("加载中...");
			$.ajax({
				type:"get",
				url:url+"/cli/SA/editActDrug/"+actidd+"?token="+token+"&time="+new Date().getTime(),
				dataType:"json",
				success:function(data){
					gadget_login(data);
					gadget_back_remove();
					if(data.code==1){
						edtlistr(data)
						
					}else{
						gadget_popupt("暂无商品");
					};
				},
				error:function(){
					gadget_back_remove();
					gadget_popupt("获取失败，请刷新重试");
				}
			});
		})
function edtlistr(data){
	var html='';
	for(var i=0;i<data.lists.length;i++){
	html+='<tr name="';
	html+=data.lists[i].selldrugid;
	html+='"><td class="sofnamu"><P>';
	html+=data.lists[i].namecn;
	html+='</P></td><td><p>'+data.lists[i].sellstock+'</p></td><td class="sofprice"><P>';
	html+=data.lists[i].sellprice;
	html+='</P></td><td><P>';
	html+=data.lists[i].specification;
	html+='</P></td><td><P>';
	html+=data.lists[i].discountprice;
	html+='</P></td><td><p>';
	html+=data.lists[i].limitbuynum;
	html+='</p></td><td><span class="remadd">删除</span> <span class="buyadd">编辑</span></td></tr>';
	};
	$("#sofbigshop tbody").append(html);
	$(".buyadd").click(function(){
		var sofnamu=$(this).parents("td").siblings(".sofnamu").children("p").html();
		var sofprice=$(this).parents("td").siblings(".sofprice").children("p").html();
		$(".shopcp span").html(sofnamu);
		$(".shopmny span").html(sofprice);
		$("#inpbutton").attr("omgn",$(this).parents("tr").attr("name"));
		$(".sofbiginp").show();
		alerttxt=2;
	});
	$(".remadd").click(function(){
		var objtr=$(this).parents("tr");
		var selldrugid=objtr.attr("name");
		gadget_back("请稍等...");
		$.ajax({
			type:"get",
			url:url+"/cli/sellDrug/updateSellDrug?limitbuynum=-1&token="+token+"&selldrugid="+selldrugid+"&time="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				gadget_back_remove();
				if(data.code==1){
					objtr.remove();
					gadget_popupt("删除成功");
				}else{
					gadget_popupt("删除失败，请重试");
				};
			},
			error:function(){
				gadget_back_remove();
				gadget_popupt("删除失败，请刷新重试");
			}
		});
	});
};
		
		
};
	
	

	
	
})
