$(function(){
	
	
	/*var num=111111111
	console.log(Math.floor(num * 100)/100)*/
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var ziz="0";
	var zbz="0";
	var dug_id_i=getUrlParamo("i");
	if(dug_id_i!=null){
		if(!isNaN(dug_id_i)){
			get_toedit(dug_id_i);
		}else{
			dug_id_i=null;
		};
	};
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
	// remove_pic
	$(".imgtop .remove_pic").click(function(){
		$(this).parent().siblings("img").attr("src",'../imgeas/tjtup.png');
	});
	$("#smore").mouseleave(function(){
		$("#txtlang").hide();
	}).mouseenter(function(){
		$("#txtlang").show();
	});
	selopn($("#selopns"));
	
	var ind=2;
		//图片上传
	//myfile	
	$(".myfile").change(function(){
		var fileInput=$(this).attr("id");
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

	//表单提交
	$("#isbutton").click(function(){
		var aliascn=$("#aliascn").val(),
			specification=$("#specification").val(),
			sellprice=$("#sellprice").val(),
			mindeliverynum=$("#mindeliverynum").val(),
			sellstock=$("#sellstock").val(),
			drugqualityimage="",
			drugdetail=$("#editor-trigger").val(),
			manufacturer=$("#manufacturer").val();
		if(aliascn==""){
			gadget_popupt("请填写商品名");
			return false;
		};
		if(specification==""){
			gadget_popupt("请填写规格");
			return false;
		};
		if(sellprice==""){
			gadget_popupt("请填写价格");
			return false;
		};
		if(mindeliverynum==""){
			gadget_popupt("请填写起购量");
			return false;
		};
		if(sellstock==""){
			gadget_popupt("请填写库存");
			return false;
		};
		var pico="../imgeas/tjtup.png";
		var pict="imgeas/yuanq.gif";
		var drugimage=$(".imgbigtop");
		for(var i=0;i<drugimage.length;i++){
			if(drugimage.eq(i).children("img").attr("src")!=pico&&drugimage.eq(i).children("img").attr("src")!=pict){
				drugqualityimage+=drugimage.eq(i).children("img").attr("src")+";";
			};
		};
		drugqualityimage=drugqualityimage.substring(0,drugqualityimage.length-1);
		if(drugqualityimage==""){
			gadget_popupt("请至少上传一张商品图片");
			return false;
		};
		//return false;
			var dug_url="/cli/sellDrug/saveCmSellDrug";
			var	dug_data={
				"token":token,
				"aliascn":aliascn,
				"specification":specification,
				"listimg":drugqualityimage,
				"packing":"",
				"drugform":"",
				"manufacturer":manufacturer,
				"sellprice":sellprice,
				"sellstock":sellstock,
				"mindeliverynum":mindeliverynum,
				"drugdetail":drugdetail,
				"time":new Date().getTime()
			};
		if(dug_id_i!=null){
			dug_url="/cli/sellDrug/updateCmSellDrug";
			dug_data.drugid=dug_id_i;
		};
		$.ajax({
			type:"post",
			url:url+dug_url,
			data:dug_data,
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					//setTimeout(gadget_relo,3000);
					if(dug_id_i!=null){
						gadget_popupfs("提交成功，是否返回商品管理","releasel.html","cmanagement.html","否","是");
					}else{
						gadget_popupf("提交成功",0);
					}
				};
				if(data.code==-1){
					gadget_popups("提交失败,请重试");
				};
				if(data.code==-2){
					gadget_popups("已经有同样的药品");
				};
			},
			error:function(){
				gadget_popups("提交失败，请刷新重试");
			}
		});
		
	});
	
	
	
		function get_toedit(dugid){
			// disabled="disabled"
			$.ajax({
				type:"get",
				url:url+"/cli/sellDrug/toNewEdit/"+dugid,
				data:{"token":token,"time":new Date().getTime()},
				dataType:"json",
				success:function(data){
					console.log(data);
					if(data.code==1){
						$("#aliascn").val(data.data.aliascn).attr("disabled","disabled");
						$("#specification").val(data.data.specification);
						$("#manufacturer").val(data.data.manufacturer);
						$("#sellprice").val(data.data.sellprice);
						$("#mindeliverynum").val(data.data.mindeliverynum);
						$("#sellstock").val(data.data.sellstock);
						$("#editor-trigger").val(data.data.drugdetail);
						$(".wangEditor-txt").html(data.data.drugdetail);
						if(data.data.listimg&&data.data.listimg!=""){
							var listpics=data.data.listimg.split(";");
							for(var i=0;i<listpics.length;i++){
								$(".imgbox").eq(i).children(".imgbigtop").children("img").attr("src",listpics[i]);
							};
						};
					}else{
						gadget_popups("暂无药品信息");
					};
				},
				error:function(){
					gadget_popups("网络错误，获取药品信息失败");
				}
			});
		};

})
