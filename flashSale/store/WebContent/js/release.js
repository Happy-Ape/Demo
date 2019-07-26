$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var ziz="0";
	var zbz="0";
	$(".myform").attr("action",url+"/file/cliTxtpicUpload");
	$(".myform input[name=url]").val(ut+"/merchant/min.html");
	$(".isimghz").mouseleave(function(){
		$(this).children(".reom").hide();
	}).mouseenter(function(){
		$(this).children(".reom").show()
	}).children("img").click(function(){
		var src=$(this).attr("src");
		$("#ismybigpic").children("img").attr("src",src);
		$("#ismybigpic").show();
	});
	$("#ismybigpic").children("p").children("span").click(function(){
		$("#ismybigpic").hide();
	});
	$("#myhide").click(function(){
		$("#mybigpic").hide();
		$("#mypicbox img").attr("src","");
	});
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
	$("#smore").mouseleave(function(){
		$("#txtlang").hide();
	}).mouseenter(function(){
		$("#txtlang").show();
	});
	selopn($("#selopns"));
	ads();
	function ads(){
         $.ajax({
         	type:"GET",
            url: url+"/cli/drug/getCategory/0",
            dataType: "json",
            success: function(data){
            	gadget_login(data);
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
            	 	$("#rootcla .lillu").after().remove();
            	 	$("#rootcla").append('<option class="lillu">请选择</option>');
            	 	$("#cateId .lillu").after().remove();
            	 	$("#cateId").append('<option class="lillu">请选择</option>');
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
            success: function(data){
            	gadget_login(data);
            	//$("#rootcla .lillu").after().remove();
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
            	 	$("#cateId .lillu").after().remove();
            	 	$("#cateId").append('<option class="lillu">请选择</option>');
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
            success: function(data){
            	gadget_login(data);
            	//$("#cateId .lillu").after().remove();
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
	var ind=2;
		//图片上传
	//myfile	
	$(".myfile").change(function(){
		var fileInput=$(this).attr("id")
		
		if(document.all){ 
			console.log(" ");
		}else{ 
			if($("#"+fileInput)[0].files[0].size/1024>4000){
				gadget_popupt("请选择小于3M的图片");
				$(this).val("");
				return false;
			};
		};
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
		$(".creliso").append(html);
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
					var html='<div class="imgbox"><div class="imgbigtop drugqualityimage"><div class="imgtop">';
					html+='<span class="removebox">删除图片</span><span class="upimg">查看大图</span>';
					html+='</div><img src="';
					html+=bgo[1];
					html+='" /></div><p>药品资质图片</p></div>';
					$(".creliso").append(html);
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

	//表单提交
	$("#isbutton").click(function(){
		var namecn=$("#namecn").val();
		var aliascn=$("#aliascn").val();
		var rootId=$("#rootId").val();
		var cateId=$("#cateId").val();
		var barcode=$("#barcode").val();
		var drugInfImg=$("#drugInfImg img").attr("src");
		var listimg=$("#listimg img").attr("src");
		var drugform=$("#selopns").val();
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
		$.ajax({
			type:"post",
			url:url+"/cli/cliNewSaveDrug?token="+token+"&drugform="+drugform+"&barcode="+barcode+"&namecn="+namecn+"&aliascn="+aliascn+"&rootid="+rootId+"&cateid="+cateId+"&drugInfImg="+drugInfImg+"&listimg="+listimg+"&drugInverseImg="+drugInverseImg+"&drugControlImg="+drugControlImg+"&drugBarcodeImg="+drugBarcodeImg+"&drugqualityimage="+drugqualityimage+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data==1){
					gadget_popups("提交成功，请耐心等待审核结果");
					setTimeout(gadget_relo,3000);
				};
				if(data==-1){
					gadget_popups("提交失败,请重试");
				};
				if(data==-2){
					gadget_popups("已经有同样的药品");
				};
			},
			error:function(){
				gadget_popups("提交失败，请刷新重试");
			}
		});
		
		
		
		
		
		
	});
	

})
