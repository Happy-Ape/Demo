$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	
	$("#isimg").click(function(){
		$("#equbigd").hide();
	});
	$(".eqover").click(function(){
		$(this).attr("class","overisspan");
		$(this).siblings("span").removeClass("overisspan");
		if($(this).index()==0){
			$("#equshop").hide();
			$("#oleqone").show();
		}else{
			$("#oleqone").hide();
			$("#equshop").show();
		};
	});
	
	soimg();
	function soimg(){
		var sopic=90;
		var html='';
		var imgsr=0;
		var picsr="png";
		for(var i=0;i<sopic/5;i++){
			html+='<tr>';
			for(var c=0;c<5;c++){
				if(imgsr>=sopic){
					return false;
				};
				imgsr=imgsr+1;
				if(imgsr>50){
					picsr="gif";
				};
				//console.log(c+"c----")
				html+='<td><img src="/imgeas/img/qq/'+imgsr+'.'+picsr+'"/></td>';
			};
			html+='</tr>';
		};
		$("#isobimg tbody").append(html);
		$("#isobimg td").click(function(){
		$("#istextarea").append('<img src="'+$(this).children("img").attr("src")+'"/>');
	});
	};
	$.ajax({
		type:"get",
		url:url+"/cli/dc/getStoreTypeNum",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				//var data={code: 1, message: "3:2;-3:2;-3:2;"};
				var message=data.message.split("-");
				for(var i=0;i<message.length;i++){
					if(message[i].length<3){
						message[i]="1:0;2:0;3:0";
					};
				};
				var mess=message[0].split(";");
				var age=message[1].split(";");
				var ssa=message[2].split(";");
				for(var i=0;i<3;i++){
					var oc=mess[i].split(":");
					var bc=age[i].split(":");
					var vc=ssa[i].split(":");
					if(oc[0]!=i+1){
						mess.splice(i,0,i+1+":0");
					};
					if(bc[0]!=i+1){
						age.splice(i,0,i+1+":0");
					};
					if(vc[0]!=i+1){
						ssa.splice(i,0,i+1+":0");
					};
				};
				var cos=[];
				for(var i=0;i<3;i++){
					var ios=mess[i].split(":");
					var oos=age[i].split(":");
					var pos=ssa[i].split(":");
					cos.push(ios[1]);
					cos.push(oos[1]);
					cos.push(pos[1]);
				};
				var t=0;
				for(var i=0;i<$("#ormore td").length-4;i++){
					if(i!=0&&i!=4&&i!=8){
						$("#ormore td").eq(i).children("p").html(cos[t]);
						t=t+1;
					};
				};
				console.log(cos)
				$("#ormore td").eq(13).children("p").html(Number(cos[0])+Number(cos[3])+Number(cos[6]));
				$("#ormore td").eq(14).children("p").html(Number(cos[1])+Number(cos[4])+Number(cos[7]));
				$("#ormore td").eq(15).children("p").html(Number(cos[2])+Number(cos[5])+Number(cos[8]));
			};
		},
		error:function(){
			
		}
	});
	var overtype=0; //0全部 3好评 2中评 1差评
	var isReply=0; //是否回复 -1没回复 1回复 0全部
	var nowPage=1;
	var str=10; //每页条数
	var orderCode="";
	var open="";//当前页数
	var orderCode="";
	var datat={token:token,mintime:new Date().getTime()};
	gadget_m_remv($(".overbiglis"));
	$.ajax({
		type:"get",
		url:url+"/cli/dc/getAllComments/"+overtype+"/"+isReply+"/"+nowPage+"/"+str,
		data:datat,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				
				AllComments(data);
				$(".cmaisp").show();
				gadget_m_remv($(".overbiglis"))
				var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1")
			}else{
//				$(".overbiglis")
				gadget_err_m("暂无数据",$(".overbiglis"),"50px");
				$(".cmaisp").hide();
			};
		},
		error:function(){
			gadget_err_m("网络错误，请重试",$(".overbiglis"),"50px");
			$(".cmaisp").hide();
		}
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
			url:url+"/cli/dc/getAllComments/"+overtype+"/"+isReply+"/"+open+"/"+str,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					AllComments(data);
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
	//上一页
	$("#cmaismpa").click(function(){
		open=parseInt($("#isdangq").html())-1;
		if(open<1){
			gadget_popupt("已经是第一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/dc/getAllComments/"+overtype+"/"+isReply+"/"+open+"/"+str,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					AllComments(data);
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
			url:url+"/cli/dc/getAllComments/"+overtype+"/"+isReply+"/"+open+"/"+str,
			data:datat,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					AllComments(data);
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
	$("#mybutton").click(function(){
		overtype=$("#adctype").val();
		isReply=$("#isReply").val();
		var rderCode=$("#orderCode").val();
		if(adctype==0&&isReply==0&&orderCode==""){
			return false;
		}else{
			datat={token:token,orderCode:rderCode,mintime:new Date().getTime()};
			$.ajax({
				type:"get",
				url:url+"/cli/dc/getAllComments/"+overtype+"/"+isReply+"/1/"+str,
				data:datat,
				dataType:"json",
				success:function(data){
					gadget_login(data);
					if(data.code==1){
					AllComments(data);
					$(".cmaisp").show();
					gadget_m_remv($(".overbiglis"));
					var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					}
					$("#ismyipik").html(st);
					$("#isdangq").html("1")
			}else{
				gadget_popupt("没有该类评价");
			}
				},
				error:function(){
					gadget_popupt("搜索失败，请刷新重试");
				}
			});
		};
	});
	function AllComments(data){
		
				$("#tbodycod tr").remove();
					html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<tr name="';
					html+=data.lists[i].commentid;
					html+='"><td><p>';
					html+=data.lists[i].ordercode;
					html+='</p></td><td><p>';
					if(data.lists[i].dctype==3){
						html+='好评';
					};
					if(data.lists[i].dctype==2){
						html+='中评';
					};
					if(data.lists[i].dctype==1){
						html+='差评';
					};
					html+='</p></td><td class="overiscgs"><p><a href="../Product.html?drugid='+data.lists[i].drugid+'&selluserid='+data.lists[i].selluserid+'">';
					html+=data.lists[i].drugName;
					html+='</a></p></td><td class="overislr"><p>';
					html+=data.lists[i].txtcontent;
					html+='</p></td><td>';
					if(data.lists[i].pid==-1){
						html+='<span class="overishf">回 复</span>'
					}else{
						html+='<span class="overisyhf">已回复</span>';
					};
					html+='</td></tr>';
				};
				$("#tbodycod").append(html);
				$(".overishf").click(function(){
					var getDetail=$(this).parent().parent("tr").attr("name");
					$("#isobimg").hide();
					$("#eqtexe").remove();
					$("#eqover").remove();
					$("#eqendt a").remove();
					$("#eqend p").html("");
					$("#eqclapmin").html("");
					$("#equbigd").show();
					var html='<div id="eqtexe"><div id="istextarea" contenteditable="true"></div><span id="textimg">(∩_∩)</span><input type="button" id="ovmbtn" value="提交"/></div>';
					$(".equbigdiv").append(html);
					$.ajax({
						type:"get",
						url:url+"/cli/dc/getDetail/"+getDetail+"?mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								$("#eqclap span").html();
								if(data.lists.length==1){
									var commentid=data.lists[0].commentid;
									$('#eqclap').html(data.lists[0].createdtime);
									$("#eqend p").html(data.lists[0].txtcontent);
									if(data.lists[0].imagescontent!=null&&data.lists[0].imagescontent!=""){
										var imagescontent=data.lists[0].imagescontent.split(";");
										var htm='';
										for(var i=0;i<imagescontent.length;i++){
											htm+='<a href="';
											htm+=imagescontent[i];
											htm+='" target="_blank"><img src="';
											htm+=imagescontent[i];
											htm+='" /></a>';
										};
										$("#eqendt").append(htm);
									};
									$("#ovmbtn").click(function(){
										//alert($("#istextarea").html());
										var txtcontent=$("#istextarea").html();
										if($("#istextarea").html()==""){
											gadget_popupt("请输入回复内容");
											return false;
										};
										
										if(txtcontent.length>=500){
											gadget_popupt("内容超过字数限制，请重新编辑");
											return false;
										};
										txtcontent=encodeURI(txtcontent);
										$.ajax({
											type:"POST",
											url:url+"/cli/dc/saveSReplyCom/"+commentid+"?txtcontent="+txtcontent+"&enduserid=0&selluserid=0&drugid=0&dctype=0&isanonymous=0&mintime="+new Date().getTime(),
											dataType:"json",
											success:function(data){
												gadget_login(data);
												if(data.code==1){
													gadget_popupt("回复成功");
													setTimeout(gadget_relo,3000);
												}else{
													gadget_popupt("回复失败");
												};
											},
											error:function(){
												gadget_popupt("回复失败。");
											}
										});
									});
									var obimg=1;
									$("#textimg").click(function(){
										if(obimg==1){
											$("#isobimg").show();
										};
										if(obimg==0){
											$("#isobimg").hide();
										};
										if(obimg==1){
											obimg=0
										}else{
											obimg=1
										};
										
									});
								};
							};
						},
						error:function(){
							
						}
					});
					
					
					
				});
				$(".overisyhf").click(function(){
					var getDetail=$(this).parent().parent("tr").attr("name");
					$("#isobimg").hide();
					$("#eqover").remove();
					$("#eqtexe").remove();
					$("#eqendt a").remove();
					$("#eqend p").html("");
					$("#eqclapmin").html("");
					$("#equbigd").show();
					$.ajax({
						type:"get",
						url:url+"/cli/dc/getDetail/"+getDetail+"?mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								if(data.lists.length>1){
									$("#eqclap").html(data.lists[0].createdtime);
									$("#eqend p").html(data.lists[0].txtcontent);
									$("#eqclapmin").html(data.lists[1].createdtime);
									if(data.lists[0].imagescontent!=null&&data.lists[0].imagescontent!=""){
										var imagescontent=data.lists[0].imagescontent.split(";");
										var htm='';
										for(var i=0;i<imagescontent.length;i++){
											htm+='<a href="';
											htm+=imagescontent[i];
											htm+='" target="_blank"><img src="';
											htm+=imagescontent[i];
											htm+='" /></a>';
										};
										$("#eqendt").append(htm);
									};
									var hm='<div id="eqover"><p>'+data.lists[1].txtcontent+'</p></div>';
									$("#eqbg").append(hm);
								};
							};
						},
						error:function(){
							
						}
					});
				});
	};
	
	
})
