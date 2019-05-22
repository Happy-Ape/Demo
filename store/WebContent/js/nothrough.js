$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var str="10";
	var key="";
	var ziz="0";
	var zbz="0";
	var obdrugid="";
	var open=1;
	var ogistates=-1;
	
	$(".myform").attr("action",url+"/file/cliTxtpicUpload");
	$(".myform input[name=url]").val(ut+"/merchant/min.html");
	$(".imgbigtop").mouseleave(function(){
		$(this).children(".imgtop").hide();
	}).mouseenter(function(){
		var picsrc=$(this).children("img").attr("src");
		if(picsrc!="../imgeas/tjtup.png"&&picsrc!="imgeas/yuanq.gif"){
			$(this).children(".imgtop").show();
		};
	});
	$(".imgtop .upimg").click(function(){
		$("#mypicbox img").attr("src",$(this).parent().siblings("img").attr("src"));
		$("#mybigpic").show();
	});
	$("#myhide").click(function(){
		$("#mybigpic").hide();
		$("#mypicbox img").attr("src","");
	});
	$(".isnotspnm").click(function(){
		$(".isnotspnm").removeClass("isnoyred");
		$(this).addClass("isnoyred");
		//alert($(this).index())
		open=1;
		if($(this).index()==0){
			ogistates=-1;
			morelis(ogistates);
		};
		if($(this).index()==1){
			ogistates=5;
			morelis(ogistates);
		};
		if($(this).index()==2){
			ogistates=-2;
			morelis(ogistates);
		};
	});
	
	//首次加载
	morelis(ogistates)
	function morelis(ogistates){
		$(".notislala").remove();
	$.ajax({
		type:"GET",
		url:url+"/cli/sellDrug/getNoPass/"+ogistates+"/"+open+"/"+str,
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$(".notislap").show()
				/*
				 aliascn 商品名 codename 批准文号 specification 规格 stateremark 不通过理由
				 adc
				  */
				
				single(data);
				 
				 var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
				 
			}else{
				gadget_popupt("没有列表");
				$(".notislap").hide();
			}
		},
		error:function(){
			gadget_popupt("获取列表失败,请刷新重试");
			$(".notislap").hide();
			//alert("请刷新页面")
		}
	});		
	};

	//联动
	
	
	
	
	//显示表
	$("#ismyfocc").click(function(){
		$("#aliascn").val("");
		$("#namecn").val("");
		$("#barcode").val("");
		$("#cateId option").remove();
		$("#rootcla option").remove();
		$("#rootId option").remove();
		var htm='<option class="lillu">请选择</option>';
		$("#rootId,#rootcla,#cateId").append(htm);
		$("#drugInfImg img,#listimg img,#drugInverseImg img,#drugControlImg img,#drugBarcodeImg img,#drugqimage img").attr("src","../imgeas/tjtup.png");
		$(".picminbox").remove();
		$("#ismybod").hide();
	})
//下一页
	$("#cmaismop").click(function(){
		open=parseInt($("#isdangq").html())+1;
		if(open>$("#ismyipik").html()){
			gadget_popupt("已经是最后一页");
			return false;
		};
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getNoPass/"+ogistates+"/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".notislala").remove();
					single(data);
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
			url:url+"/cli/sellDrug/getNoPass/"+ogistates+"/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".notislala").remove();
					single(data);
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
		open=$(".notislap input[type='number']").val()
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
			url:url+"/cli/sellDrug/getNoPass/"+ogistates+"/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".notislala").remove();
					single(data);
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
	$("#ismybigss").click(function(){
		key=$("#ismysellnan").val();
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/getNoPass/"+ogistates+"/"+open+"/"+str,
			data:{token:token,key:key,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					$(".notislala").remove();
					single(data);
					 var st="";
					st=data.message/str;
					n = st.toString();
					var arr=n.split(".");
					if(arr[1]>0){
						st=parseInt(arr[0])+1;
					};
					$("#ismyipik").html(st);
					$("#isdangq").html("1");
				}else{
					gadget_popupt("没有此药品")
				}
			},
			error:function(){
				gadget_popupt("获取失败,请刷新重试")
			}
		});
	})
	
	//表单
	$("#ismybtn").click(function(){
		
		var aliascn=$("#aliascn").val();
		var namecn=$("#namecn").val();
		var barcode=$("#barcode").val();
		var rootid=$("#rootId").val();
		var cateid=$("#cateId").val();
		var drugInfImg=$("#drugInfImg img").attr("src");
		var listimg=$("#listimg img").attr("src");
		var drugInverseImg=$("#drugInverseImg img").attr("src");
		var drugControlImg=$("#drugControlImg img").attr("src");
		var drugBarcodeImg=$("#drugBarcodeImg img").attr("src");
		var drugqualityimage="";
		if(namecn==""||namecn==null){
			$(".isspanm").eq(0).show();
			return false;
		}else{
			$(".isspanm").eq(0).hide();
		};
		if(aliascn==""||aliascn==null){
			$(".isspanm").eq(1).show();
			return false;
		}else{
			$(".isspanm").eq(1).hide();
		};
		if(barcode==""||barcode==null){
			$(".isspanm").eq(2).show();
			return false;
		}else{
			$(".isspanm").eq(2).hide();
		};
		if(rootId==null||rootId==""||rootId=="请选择"){
			gadget_popupt("请选择分类");
			return false;
		};
		if(cateId==null||cateId==""||cateId=="请选择"){
			gadget_popupt("请选择分类");
			return false;
		};
		var pico="../imgeas/tjtup.png";
		var pict="imgeas/yuanq.gif";
		var drugimage=$(".drugqualityimage");
		
		
		if(drugInfImg==pico||drugInfImg==pict){
			gadget_popupt("请上传药品说明书图片");
			return false;
		};
		if(listimg==pico||listimg==pict){
			gadget_popupt("请上传药品正面照");
			return false;
		};
		if(drugInverseImg==pico||drugInverseImg==pict){
			gadget_popupt("请上传药品反面照");
			return false;
		};
		if(drugControlImg==pico||drugControlImg==pict){
			gadget_popupt("请上传电子监管码照片");
			return false;
		};
		if(drugBarcodeImg==pico||drugBarcodeImg==pict){
			gadget_popupt("药品条形码照片");
			return false;
		};
		
		for(var i=0;i<drugimage.length;i++){
			if(drugimage.eq(i).children("img").attr("src")!=pico&&drugimage.eq(i).children("img").attr("src")!=pict){
				drugqualityimage+=drugimage.eq(i).children("img").attr("src")+";";
			}else{
				gadget_popupt("请确认资质图片是否正确");
				return false;
			};
		};
		drugqualityimage=drugqualityimage.substring(0,drugqualityimage.length-1);
		var drugform=$("#selopns").val();
		$.ajax({
			type:"POST",
			url:url+"/cli/sellDrug/ogiUpdate?aliascn="+aliascn+"&drugform="+drugform+"&namecn="+namecn+"&barcode="+barcode+"&token="+token+"&drugInfImg="+drugInfImg+"&listimg="+
			listimg+"&drugInverseImg="+drugInverseImg+"&drugControlImg="+drugControlImg+"&drugBarcodeImg="+drugBarcodeImg+"&drugqualityimage="+drugqualityimage+
			"&rootid="+rootid+"&cateid="+cateid+"&drugid="+obdrugid+
			"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("提交成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popups("提交失败.")
				}
			},
			error:function(){
				gadget_popups("提交失败");
			}
		});
	})



	
	function single(data){
		 var html='';
				 for(var i=0;i<data.lists.length;i++){
				 	html+='<div class="notislala"';
				 	html+=' name="';
				 	html+=data.lists[i].drugid;
				 	html+='" title><div class="notislis notislisone"><p>';
				 	html+=data.lists[i].aliascn;
				 	html+='</p></div><div class="notislis"><p>';
				 	html+=data.lists[i].namecn;
				 	html+='</p></div><div class="notislis"><p>';
				 	html+=data.lists[i].barcode;
				 	html+='</p></div><div class="notislis"><p>';
				 	html+=data.lists[i].createdtime;
				 	html+='</p></div><div class="notislis notislistw"><p>';
				 	if(data.lists[i].ogistate==5){
				 		html+='审核通过';
				 	};
				 	if(data.lists[i].ogistate==-1){
				 		html+='等待审核';
				 	};
				 	if(data.lists[i].ogistate==-2){
				 		html+='审核不通过';
				 		html+=data.lists[i].stateremark;
				 	};
				 	html+='</p></div><div class="notislis">';
				 	if(data.lists[i].ogistate!=5){
				 		html+='<a class="modify">重新申请</a> ';
				 		html+='<span class="isobmremove">删除</span>';
				 	};
				 	html+='</div></div>';
				 };
				 $(".notisla").after(html);
				 //删除
				 $(".isobmremove").click(function(){
				 	var selldrugid=$(this).parent().parent().attr("name");
				 	$.ajax({
				 		type:"GET",
				 		url:url+"/cli/sellDrug/ogiDelete/"+selldrugid,
				 		data:{token:token},
				 		dataType:"json",
				 		success:function(data){
				 			gadget_login(data);
				 			if(data.code==1){
				 				gadget_popupt("删除成功");
				 				setTimeout(gadget_relo,3000);
				 			}
				 		},
				 		error:function(){
				 			
				 		}
				 	});
				 })
				 //修改
				$(".modify").click(function(){
					$("#ismybod").show();
					obdrugid=$(this).parent().parent().attr("name");
					//联动
					ads();
	//表单		
	
		$.ajax({
			type:"GET",
			url:url+"/cli/sellDrug/ogiEdit/"+obdrugid,
			data:{token:token},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					selopn($("#selopns"),data.pojo.drugform);
					$(".isimghz").remove();
					$("#ismyform input[name='aliascn']").val(data.pojo.aliascn);
					$("#ismyform input[name='namecn']").val(data.pojo.namecn);
					$("#ismyform input[name='barcode']").val(data.pojo.barcode);
					$("#ismyform input[name='codename']").val(data.pojo.codename);
					$("#ismyform input[name='manufacturer']").val(data.pojo.manufacturer);
					$("#rootId").val(data.pojo.rootid);
					var claurl=url+"/cli/drug/getCategory/"+$("#rootId").val();
            	 	adc(claurl);
					$("#rootcla").val(data.pojo.secondCate);
					var claurl=url+"/cli/drug/getCategory/"+data.pojo.secondCate;
            	 	adf(claurl);
            	 	$("#cateId").val(data.pojo.cateid);
            	 	
					$("#isotc option[value='"+data.pojo.isotc+"']").attr("selected","selected");
					var limgarr=data.pojo.listimg.split(";");
					//drugqualityimage
					$("#drugInfImg img").attr("src",data.pojo.drugInfImg);
					$("#listimg img").attr("src",data.pojo.listimg);
					$("#drugInverseImg img").attr("src",data.pojo.drugInverseImg);
					$("#drugControlImg img").attr("src",data.pojo.drugControlImg);
					$("#drugBarcodeImg img").attr("src",data.pojo.drugBarcodeImg);
					var drugqimage=data.pojo.drugqualityimage.split(";");
					$("#drugqimage img").attr("src",drugqimage[0]);
					if(drugqimage.length>1){
						var html='';
						for(var i=1;i<drugqimage.length;i++){
							html+='<div class="imgbox picminbox"><div class="imgbigtop drugqualityimage"><div class="imgtop">';
							html+='<span class="removebox">删除图片</span><span class="upimg">查看大图</span>';
							html+='</div><img src="';
							html+=drugqimage[i];
							html+='" /></div><p>药品资质图片</p></div>';
						};
						$("#mypicbig").append(html);
						$(".removebox").unbind("click");
						$(".imgtop .upimg").unbind("click");
						$(".imgbigtop").unbind("mouseleave");
						$(".imgbigtop").unbind("mouseenter");
						$(".removebox").click(function(){
							$(this).parent(".imgtop").parent(".imgbigtop").parent(".imgbox").remove();
						});
						$(".imgtop .upimg").click(function(){
							$("#mypicbox img").attr("src",$(this).parent().siblings("img").attr("src"));
							$("#mybigpic").show();
						});
						$(".imgbigtop").mouseleave(function(){
							$(this).children(".imgtop").hide();
						}).mouseenter(function(){
							var picsrc=$(this).children("img").attr("src");
							if(picsrc!="../imgeas/tjtup.png"&&picsrc!="imgeas/yuanq.gif"){
								$(this).children(".imgtop").show();
							};
						});
					};
					
					
					
					
				}
			},
			error:function(){
				
			}
		});			
					
					
				})
				 
			}
	
	$("body").click(function(){
		$("#picbigbox").hide();
	})

		//图片上传
	//myfile	
	$(".myfile").change(function(){
		$(this).parent("form").submit();
		
		 var picnam=$(this).parent("form").siblings("img");
		picnam.attr("src","imgeas/yuanq.gif");
		$(".myform [type='file']").attr("disabled","disabled");
		$("#ifr").unbind("load");
		$("#ifr").load(function(){
			//console.log($("#bgo").val())
			var bgo=$("#bgo").val();
			if(bgo!=""){
				//console.log(bgo)
//				?pic=http://7xloj2.com1.z0.glb.clouddn.com/1481009450439
				bgo=bgo.split("=");
				if(bgo[1]!=""&&bgo[1]!=null){
					ziz="0";
					picnam.attr("src",bgo[1]);
					$(".myform [type=file]").removeAttr("disabled");
				}else{
					gadget_popupt("图片上传失败");
					picnam.attr("src","../imgeas/tjtup.png");
					$(".myform [type=file]").removeAttr("disabled");
				};
			}else{
				gadget_popupt("图片上传失败");
				picnam.attr("src","../imgeas/tjtup.png");
				$(".myform [type=file]").removeAttr("disabled");
			};
		});
	});
	$("#addfile").change(function(){
		$(this).parent("form").submit();
		$(".myform [type='file']").attr("disabled","disabled");
		var html='<div id="minpicbox"><div class="imgbigtop"><div class="imgtop">';
		html+='<span class="removebox">删除图片</span><span class="upimg">查看大图</span>';
		html+='</div><img src="imgeas/yuanq.gif" /></div><p>药品资质图片</p></div>';
		$("#mypicbig").append(html);
		$("#ifr").unbind("load");
		$("#ifr").load(function(){
			//console.log($("#bgo").val())
			var bgo=$("#bgo").val();
			if(bgo!=""){
				//console.log(bgo)
//				?pic=http://7xloj2.com1.z0.glb.clouddn.com/1481009450439
				bgo=bgo.split("=");
				if(bgo[1]!=""&&bgo[1]!=null){
					ziz="0";
					$("#minpicbox").remove();
					var html='<div class="imgbox picminbox"><div class="imgbigtop drugqualityimage"><div class="imgtop">';
					html+='<span class="removebox">删除图片</span><span class="upimg">查看大图</span>';
					html+='</div><img src="';
					html+=bgo[1];
					html+='" /></div><p>药品资质图片</p></div>';
					$("#mypicbig").append(html);
					$(".removebox").unbind("click");
					$(".imgtop .upimg").unbind("click");
					$(".imgbigtop").unbind("mouseleave");
					$(".imgbigtop").unbind("mouseenter");
					$(".removebox").click(function(){
						$(this).parent(".imgtop").parent(".imgbigtop").parent(".imgbox").remove();
					});
					$(".imgtop .upimg").click(function(){
						$("#mypicbox img").attr("src",$(this).parent().siblings("img").attr("src"));
						$("#mybigpic").show();
					});
					$(".imgbigtop").mouseleave(function(){
						$(this).children(".imgtop").hide();
					}).mouseenter(function(){
						var picsrc=$(this).children("img").attr("src");
						if(picsrc!="../imgeas/tjtup.png"&&picsrc!="imgeas/yuanq.gif"){
							$(this).children(".imgtop").show();
						};
					});
					
					$(".myform [type=file]").removeAttr("disabled");
				}else{
					gadget_popupt("图片上传失败，请重试");
					$("#minpicbox").remove();
					$(".myform [type=file]").removeAttr("disabled");
				};
			}else{
					gadget_popupt("图片上传失败，请重试");
					$("#minpicbox").remove();
					$(".myform [type=file]").removeAttr("disabled");
			};
		});
		
	});	
	
	
	function ads(){
         $.ajax({
         	type:"GET",
            url: url+"/cli/drug/getCategory/0",
            dataType: "json",
            async:false,
            success: function(data){
            	
            	for(var i=0;i<data.lists.length;i++){
            		html='<option class="lillu" value="';
            		html+=data.lists[i].cateid;
            		html+='">';
            		html+=data.lists[i].catename;
            		html+='</option>';
            		$("#rootId").append(html);
            	};
            	$("#rootId").change(function(){
            	 	var htm=$("#rootId").val();
            	 	//alert(htm+"5645435435")
            	 	//var name=$("#rootId option:contains('"+htm+"')").attr("name")
            	 	if(htm=="请选择"){
            	 		return false;
            	 	};
            	 	var claurl=url+"/cli/drug/getCategory/"+htm;
            	 	adc(claurl);
            	});

            },
            error:function(){
             	//alert(1)
            }
         });
    };
    //2
    function adc(claurl){
    	$.ajax({
         	type:"GET",
            url: claurl,
            dataType: "json",
            async:false,
            success: function(data){
            	$("#rootcla .lillu").after().remove();
            	for(var i=0;i<data.lists.length;i++){
            		html='<option class="lillu" value="';
            		html+=data.lists[i].cateid;
            		html+='">';
            		html+=data.lists[i].catename;
            		html+='</option>';
            		$("#rootcla").append(html);
            	};
            	$("#rootcla").change(function(){
            	 	var htm=$("#rootcla").val();
            	 	//var name=$("#rootcla option:contains('"+htm+"')").attr("name")
            	 	if(htm=="请选择"){
            	 		return false;
            	 	};
            	 	var claurl=url+"/cli/drug/getCategory/"+htm;
            	 	adf(claurl);
            	});

            },
            error:function(){
             	//alert(1)
            }
         });
    }
    //3
    function adf(claurl){
    	$.ajax({
         	type:"GET",
            url: claurl,
            dataType: "json",
            async:false,
            success: function(data){
            	$("#cateId .lillu").after().remove();
            	for(var i=0;i<data.lists.length;i++){
            		html='<option class="lillu" value="';
            		html+=data.lists[i].cateid;
            		html+='">';
            		html+=data.lists[i].catename;
            		html+='</option>';
            		$("#cateId").append(html);
            	};
            	
            	$("#cateId").change(function(){
            		$("#mysubmit").removeAttr("disabled")
            	})
            	
            	
            },
            error:function(){
             	//alert(1)
            }
         });
    }
	
	
	
	
	
})
