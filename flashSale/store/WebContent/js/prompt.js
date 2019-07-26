$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var type=$.cookie('peopletype');
	var peoplestate=$.cookie('peoplestate');
	var save="/cli/sellqua/save";
	gadget_back("加载中...");
	if(type==4){
		$("#popety").html("《药品经营许可证 》");
	};
	if(type==5){
		$("#popety").html("《药品生产许可证》");
	};
	$(".proishlis").mouseenter(function(){
		
		var imgsrc=$(this).children(".propic").children("img").attr("src")
		if(imgsrc!="../imgeas/moreimg.jpg"&&imgsrc!="../imgeas/yuanq.gif"){
			if(peoplestate==61||peoplestate==62||peoplestate==6){
				$(this).children(".pro_remove").hide();
			}else{
				$(this).children(".pro_remove").show();
			};
		};
	}).mouseleave(function(){
		$(this).children(".pro_remove").hide();
		
	});
	$(".pro_remove").click(function(){
		var obj=$(this).parent(".proishlis");
		var remnam="";
		switch(obj.index()){
			case 0:
				remnam="&businessLicenseOgi="
				break;
			case 1:
				remnam="&businessLicenseCopy="
				break;
			case 2:
				remnam="&idcardAll="
				break;
			case 3:
				remnam="&drugXxxLicense="
				break;
			case 4:
				remnam="&healthLicense="
				break;
			case 5:
				remnam="&gmpLicense="
				break;
			case 6:
				remnam="&taxRegistration="
				break;
			default:
				remnam="";
				break;
		};
		var callbackt=function (){
			$("#gadget_popupo").remove();
			gadget_back("请稍等...");
			if(remnam==""){
				gadget_popupt("删除失败，请刷新重试=");
			}else{
			$.ajax({
				type:"post",
				url:url+"/cli/sellqua/update?token="+token+remnam,
				dataType:"json",
				success:function(data){
					gadget_back_remove();
					if(data.code==1){
						gadget_popupt("删除成功");
						obj.children(".propic").children("img").attr("src","../imgeas/moreimg.jpg");
					}else{
						gadget_popupt("删除失败，请刷新重试，");
					};
				},
				error:function(){
					gadget_back_remove();
					gadget_popupt("删除失败，请刷新重试");
				}
			});
			}
		
		}
		callbackt.obj=obj;
		callbackt.remnam=remnam;
		gadget_popupfsev("确定删除该资质图片",function(){
			$("#gadget_popupo").remove();
		},callbackt);
		
	});
	$(".myform").attr("action",url+"/file/cliTxtpicUpload");
	$(".myform input[name=url]").val(ut+"/merchant/min.html");
	
	$.ajax({
		type:"get",
		url:url+"/cli/sellqua/getInf",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			gadget_back_remove();
			if(data.code==1){
				switch(data.other)
				{
				case "1":
 					$(".proimg img").attr("src","../imgeas/gth.png");
 					$(".proimg p span").html("请上传资质完成认证");
  					break;
				case "-1":
  					$(".proimg img").attr("src","../imgeas/gth.png");
 					$(".proimg p span").html("请上传资质完成认证");
  					break;
  				case "2":
  					$(".proimg img").attr("src","../imgeas/gth.png");
 					$(".proimg p span").html("已上传资质，请耐心等待审核结果");
  					break;
  				case "3":
  					$(".proimg img").attr("src","../imgeas/gth.png");
 					$(".proimg p span").html("审核未通过,请重新提交(不通过原因："+data.message+")");
  					break;
				default:
  					$(".proimg img").attr("src","../imgeas/duid.png");
 					$(".proimg p span").html("审核通过，已认证资质（如无法使用功能请重新登录或联系客服）");
  					break;
				};
				if(data.pojo.businessLicenseOgi==""){
					data.pojo.businessLicenseOgi="../imgeas/moreimg.jpg";
				};
				if(data.pojo.businessLicenseCopy==""){
					data.pojo.businessLicenseCopy="../imgeas/moreimg.jpg";
				};
				if(data.pojo.idcardAll==""){
					data.pojo.idcardAll="../imgeas/moreimg.jpg";
				};
				if(data.pojo.drugXxxLicense==""){
					data.pojo.drugXxxLicense="../imgeas/moreimg.jpg";
				};
				if(data.pojo.healthLicense==""){
					data.pojo.healthLicense="../imgeas/moreimg.jpg";
				};
				if(data.pojo.gmpLicense==""){
					data.pojo.gmpLicense="../imgeas/moreimg.jpg";
				};
				if(data.pojo.taxRegistration==""){
					data.pojo.taxRegistration="../imgeas/moreimg.jpg";
				};
				$(".proishlis").eq(0).children(".propic").children("img").attr("src",data.pojo.businessLicenseOgi);
				$(".proishlis").eq(1).children(".propic").children("img").attr("src",data.pojo.businessLicenseCopy);
				$(".proishlis").eq(2).children(".propic").children("img").attr("src",data.pojo.idcardAll);
				$(".proishlis").eq(3).children(".propic").children("img").attr("src",data.pojo.drugXxxLicense);
				$(".proishlis").eq(4).children(".propic").children("img").attr("src",data.pojo.healthLicense);
				$(".proishlis").eq(5).children(".propic").children("img").attr("src",data.pojo.gmpLicense);
				$(".proishlis").eq(6).children(".propic").children("img").attr("src",data.pojo.taxRegistration);
			
				if(data.other!=1&&data.other!=-1&&data.other!=2&&data.other!=3){
					
					for(var i=0;i<$(".proishlis").length;i++){
						if($(".proishlis").eq(i).children(".propic").children("img").attr("src")=="../imgeas/moreimg.jpg"){
							$(".proishlis").eq(i).hide();
						};
					};
					$("#mysub").hide();
				};
			}else{
				$(".proimg img").attr("src","../imgeas/gth.png");
 				$(".proimg p span").html("请上传资质完成认证");
			};
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			gadget_back_remove()
			//console.log(XMLHttpRequest+"=XMLHttpRequest");
			//console.log(textStatus+"=textStatus");
			//console.log(errorThrown+"=errorThrown");
			gadget_popupt("显示失败，请刷新页面");
		}
	});
	
	
	
	$(".myform input[type='file']").change(function(){
		var ind=$(this).parents(".proishlis").index();
		console.log(ind+"--------------");
		$(this).parent(".myform").siblings("img").attr("src","../imgeas/yuanq.gif");
		$(this).parent(".myform").submit();
		$(".myform [type='file']").attr("disabled","disabled");
		$("#ifr").load(function(){
			//console.log($("#bgo").val())
			var bgo=$("#bgo").val();
			if(bgo!=""){
				//console.log(bgo)
//				?pic=http://7xloj2.com1.z0.glb.clouddn.com/1481009450439
				bgo=bgo.split("=");
				if(bgo[1]!=""&&ind!=null){
					$(".proishlis").eq(ind).children(".propic").children("img").attr("src",bgo[1]);
					$(".myform [type=file]").removeAttr("disabled");
					ind=null;
				};
				
			};
			
		});
		return false;
	});
	$("#mysub").click(function(){
		if(type!=4&&type!=5){
			gadget_popupt("当前状态不允许提交");
			return false;
		};
		if(peoplestate==61||peoplestate==62||peoplestate==6){
			gadget_popupt("审核已通过，请勿重复提交");
			return false;
		};
		var pics="";
		for(var i=0;i<$(".proishlis").length;i++){
			pics+=$(".proishlis").eq(i).children(".propic").children("img").attr("src")+",";
		};
		pics=pics.substring(0,pics.length-1);
		//console.log(pics);
		var crr=pics.split(",");
		for(var d=0;d<crr.length;d++){
			if(crr[d]=="../imgeas/moreimg.jpg"||crr[d]=="../imgeas/yuanq.gif"){
				crr[d]=" ";
			};
		};
		if(crr[0]==" "&&crr[1]==" "&&crr[2]==" "&&crr[3]==" "&&crr[4]==" "&&crr[5]==" "&&crr[5]==" "){
			gadget_popupt("请上传至少一个资质");
			return false;
		};
		//console.log(crr);
		//return false;
		//console.log(crr)
		//《营业执照》原件扫描件、 
		var business_license_ogi=crr[0];
		//《营业执照》副本扫描件、
		var business_license_copy=crr[1];
		//《法人身份证》、
		var idcard_all=crr[2];
		
		//药品生产许可证
		var drug_production_license =crr[3];
		//药品经营许可证
		var drug_business_license=crr[3];
//		/《卫生许可证》 
		var health_license=crr[4];
		//《药品gmp认证书》 
		var gmp_license=crr[5];
		//《税务登记证证 》 
		var tax_registration=crr[6];
		/*console.log(business_license_ogi+"《营业执照》原件扫描件、 ");
		console.log(business_license_copy+"《营业执照》副本扫描件、 ");
		console.log(idcard_all+"《法人身份证》、 ");
		console.log(drug_production_license+"《药品生产许可证、 ");
		console.log(drug_business_license+"《营药品经营许可证件、 ");
		console.log(health_license+"《卫生许可证、 ");
		console.log(gmp_license+"《药品gmp认证书件、 ");
		console.log(tax_registration+"《税务登记证证、 ");*/
		if(type==4){
			var ctr="?token="+token+"&businessLicenseOgi="+business_license_ogi+"&businessLicenseCopy="+business_license_copy+"&idcardAll="+idcard_all+"&drugXxxLicense="+drug_business_license+"&healthLicense="+health_license+"&gmpLicense="+gmp_license+"&taxRegistration="+tax_registration;
		};
		
		if(type==5){
			var ctr="?token="+token+"&businessLicenseOgi="+business_license_ogi+"&businessLicenseCopy="+business_license_copy+"&idcardAll="+idcard_all+"&drugXxxLicense="+drug_production_license+"&healthLicense="+health_license+"&gmpLicense="+gmp_license+"&taxRegistration="+tax_registration;
			
		};	
		
		//console.log(ctr);
		//return false;
		$.ajax({
			type:"post",
			url:url+save+ctr,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupfs("提交成功,审核将在36小时内完成",0,"shops.html","刷新","返回个人中心");
					function relo(){
						window.location.reload();
					};
					
				}else{
					gadget_popupt("提交失败"+data.message)
				}
			},
			error:function(XMLHttpRequest,textStatus,errorThrown){
				//console.log(XMLHttpRequest+"=XMLHttpRequest")
				//console.log(textStatus+"=textStatus")
				//console.log(errorThrown+"=errorThrown")
				gadget_popupt("提交失败，请重试");
			}
				
			
		});
	});
	
})
