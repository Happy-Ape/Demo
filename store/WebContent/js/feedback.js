$(function(){
	jQuery.support.cors = true;
	footerlis();
	var token=$.cookie('peoplemessage');
	$("#myform").attr("action",url+"/file/cliTxtpicUpload");
	$("#myform input[name=url]").val(ut+"/min.html");
		$("#myform input[type='file']").change(function(){
		
		$(this).parent("#myform").siblings("img").attr("src","imgeas/yuanq.gif");
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
					$("#myfil img").attr("src","imgeas/tjtup.png");
					$("#myform [type=file]").removeAttr("disabled");
					var html='<div class="myfilepic" title="点击删除"><img src="';
					html+=bgo[1];
					html+='"/></div>';
					$("#myfil").after(html);
					
					$(".myfilepic").click(function(){
						$(this).remove();
					});
					indx=3;
				};
				
			};
		});
		return false;
	});
	
	$("#mybtn").click(function(){
		if(token==""||token==null){
			gadget_popupt("请登录后提交");
		};
		var content="";
		if($(".myfilepic").length>0){
			for(var c=0;c<$(".myfilepic").length;c++){
				content+=$(".myfilepic").eq(c).children("img").attr("src")+",";
			};
		};
		content=content.substring(0,content.length-1);
		var title=$("#mytitle").val();
		if(title==""||title==null){
			$("#bantxt h5").eq(0).children(".mytit").show();
			return false;
		}else{
			$("#bantxt h5").eq(0).children(".mytit").hide();
		};
		var txtcontent=$("#mytxt").val();
		if(txtcontent==""||txtcontent==null){
			$("#bantxt h5").eq(1).children(".mytit").show();
			return false;
		}else{
			$("#bantxt h5").eq(1).children(".mytit").hide();
		};
		var qq=$("#myqq").val();
		var phonenumber=$("#myphone").val();
		if(qq==""||phonenumber==""){
			$("#bantxt h5").eq(3).children(".mytit").show();
			return false;
		}else{
			$("#bantxt h5").eq(3).children(".mytit").hide();
		};
		if(phonenumber && /^1[3|4|5|7|8]\d{9}$/.test(phonenumber)){
			$("#bantxt h5").eq(3).children(".mytit").hide();
		}else{
			$("#bantxt h5").eq(3).children(".mytit").show();
			return false;
		};
		//title=encodeURI(title);
		//txtcontent=encodeURI(txtcontent);
		//encodeURI()
		$.ajax({
			type:"post",
			url:url+"/cli/FB/save",
			data:{token:token,title:title,content:content,qq:qq,phonenumber:phonenumber,txtcontent:txtcontent,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("反馈成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popupt("提交失败，"+data.message);
				};
			},
			error:function(){
				gadget_popupt("提交失败，请刷新重试")
			}
		});
	});
	
})
