$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var index=0;
	var core=0;
	var describeService="";	//describeService 商品描述评分 
	var serviceScore="";	// serviceScore, 服务评分 
	var logisticsScore="";	//logisticsScore, 物流评分
	var minid="";
	var morid="";
	var orderId=getUrlParamo("i");
	
	
	var relationids="";
	
	
	lis();
	function lis(){
		var lisim=88;
		var html='';
		var obc=1;
		var opg="png";
		for(var i=0;i<lisim/8;i++){
			html+='<tr>';
			for(var c=0;c<8;c++){
				obc=obc+1;
				if(obc>50){
					opg="gif";
				};
				html+='<td><img src="'+ut+'/imgeas/img/qq/'+obc+'.'+opg+'"/></td>';
			};
			html+='</tr>';
		};
		$("#shopicon table tbody").append(html);
		$("#shopicon tbody td img").click(function(){
			//alert($(this).attr("src"));
			var minsrc=$(this).attr("src");
			var listindex=$(this).parents(".shoplist").index();
			$(".shoplist").eq(listindex).children(".shopliatminf").children(".istextarea").append("<img src='"+minsrc+"'/>");
			$("#shopicon").hide();
		});
	};
	$.ajax({
		type:"get",
		url:url+"/cli/order/getDetail/"+orderId,
		data:{token:token},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$("#shop").attr("name",data.pojo.selluserid);
				$("#shop h5 span").html(data.pojo.ordercode);
				$("#shop h5 a").html(data.pojo.sellerName);
				var html='';
				for(var i=0;i<data.pojo.details.length;i++){
					html+='<div class="shoplist" name="';
					html+=data.pojo.details[i].drugid;
					html+='"><div class="shopliatmino"><img src="';
					html+=data.pojo.details[i].imagePath;
					html+='" /></div><div class="shopliatmin"><a href="#">';
					html+=data.pojo.details[i].drugname;
					html+='</a></div><div class="shopliatmin shopliatover"><p class="shopminicomin">';
					html+='<span>商品评分:</span><input type="checkbox" />差评<input type="checkbox" />中评<input type="checkbox" />好评</p>';
					html+='<p class="shopminico">当前评分：<span></span>分</p></div><div class="shopliatminf"><div class="istextarea" contenteditable="true"></div>';
					html+='<div class="listpic"><span class="lispicpn">∩_∩</span><div class="picfile"><img src="../imgeas/piclis.png" /><form id="ismfor">';
					html+='<input type="file" class="imgfile" title="点击上传图片" name="uploadFile" accept="image/jpeg,image/jpg,image/png"/>';
					html+='</form></div></div></div></div>';
					relationids+=data.pojo.details[i].relationid+",";
				};
				$(".shoplis").append(html);
				ismor();
				$("#body").click(function(){
   		 		$("#bigp").hide();
   				});
				$(".lispicpn").click(function(){
					var ind=$(this).parent().parent().parent(".shoplist").index();
					//alert(ind);
					//$("#shopicon").remove();
					$(".shoplist").eq(ind).children(".shopliatover").append($("#shopicon"));
					$("#shopicon").show();
				});
			};
		},
		error:function(){
			
		}
	});
	
	
	
	function ismor(){
	
	$("#imgxx").click(function(){
		$("#bigimg").hide();
	});
	$(".iconfont i").bind("mouseenter",function(){
		core=0;
		var color="#cc3300";
		//console.log($(this).index());
		$(this).siblings("i").css("color","#d4d4d4");
		if($(this).index()<2){
			color="#000";
		};
		if($(this).index()<4&&$(this).index()>=2){
			color="#ff6600";
		};
		for(var i=0;i<$(this).index();i++){
			$(this).parent(".iconfont").children("i").eq(i).css("color",color);
		};
		$(".shopmor .iconfont i").mouseleave(function(){
			var obj=$(this);
			ocolor(obj);
			
		});
		$(".shopliatmin .iconfont i").mouseleave(function(){
			var obj=$(this);
			ocolor(obj);
			
		});
		function ocolor(obj){
			obj.css("color","#d4d4d4");
			obj.siblings("i").css("color","#d4d4d4");
			var ocolor="#cc3300";
			if(index<2){
				ocolor="#000";
			};
			if(index<4&&index>=2){
				ocolor="#ff6600";
			};
			if(core==1){
				for(var i=0;i<index;i++){
					obj.parent(".iconfont").children("i").eq(i).css("color",ocolor);
				};
				
			};
			
		}
	});
	$(".shopmor .iconfont i").click(function(){
		
		index=$(this).index();
		var parentindex=$(this).parent(".iconfont").parent(".shopmor").index();
		if(parentindex==1){
			describeService=index;
		};
		if(parentindex==2){
			serviceScore=index;
		};
		if(parentindex==3){
			logisticsScore=index;
		};
		core=1;
	});
	$(".shopminicomin input").click(function(){
		$(this).siblings("input").attr("checked",false);
		
			$(this).parent(".shopminicomin").siblings(".shopminico").children("span").html($(this).index());
		
		/*index=$(this).index();
		var parentindex=$(this).parent(".iconfont").parent(".shopmor").index();
		core=1;
		$(this).parent().siblings(".shopminico").children("span").html(index);*/
	});	
	
	$("#ismybtn").click(function(){
		//提交
		//console.log(describeService+"商品描述评分");
		//console.log(serviceScore+"服务评分");
		//console.log(logisticsScore+"物流评分");
		relationids=relationids.substr(0,relationids.length-1);
   		
		if(describeService==""){
			describeService=5;
		};
		if(serviceScore==""){
			serviceScore=5;
		};
		if(logisticsScore==""){
			logisticsScore=5;
		};
		var orderid=orderId;
		var content=$("#shopplan").val();
		/*$.ajax({
			type:"post",
			url:url+"/SComment/save",
			data:{
				token: token,
				orderid: orderid,
				describeservice: describeService,
				servicescore: serviceScore,
				logisticsscore: logisticsScore,
				content:content
			},
			dataType:"json",
			success:function(data){
				if(data.code==1){
					alert("店铺评价成功");
				};
			},
			error:function(){
				
			}
		});*/
		function ObjStory(selluserid,drugid,dctype,txtcontent,imagescontent,isanonymous){
        	this.selluserid=selluserid,
        	this.drugid=drugid,
        	this.dctype=dctype,
        	this.txtcontent=txtcontent,
        	this.imagescontent=imagescontent,
        	this.isanonymous=isanonymous
   		 };
   		 
   		 var dcJson=[];
   		 var isanonymous=1;
   		 if($("#isanonymous").is(':checked')==true){
   		 	isanonymous=1;
   		 }else{
   		 	isanonymous=0;
   		 };
   		 
   		 for(var i=0;i<$(".shoplist").length;i++){
   		 	var selluserid=Number($("#shop").attr("name"));
   		 	var drugid=Number($(".shoplist").eq(i).attr("name"));
   		 	var dctype=Number($(".shoplist").eq(i).children(".shopliatmin").children(".shopminico").children("span").html());
   		 	var txtcontent=$(".shoplist").eq(i).children(".shopliatminf").children(".istextarea").html();
   		 	//console.log(txtcontent+"223");
   		 	var imagescontent="";
   		 	var lisimgs=$(".shoplist").eq(i).children(".shopliatminf").children(".listpic").children(".lisimg");
   		 	for(var c=0;c<lisimgs.length;c++){
   		 		imagescontent+=lisimgs.eq(c).children("img").attr("src")+";";
   		 	};
   		 	
   		 	if(imagescontent!=""&&imagescontent!=null){
   		 		imagescontent=imagescontent.substring(0,imagescontent.length-1);
   		 	};
   		 	
   		 	dcJson.push(new ObjStory(selluserid,drugid,dctype,txtcontent,imagescontent,isanonymous));
   		 };
   		 //console.log(JSON.stringify(dcJson)+"111111111");
   		 
   		 for(var i=0;i<dcJson.length;i++){
   		 	if(dcJson[i].dctype==""){
   		 		$("#bigp").html("商品全部打分后才能提交");
   		 		$("#bigp").show();
   		 		return false;
   		 	};
   		 	if(dcJson[i].txtcontent==""){
   		 		$("#bigp").html("商品全部评论后才能提交");
   		 		$("#bigp").show();
   		 		return false;
   		 	};
   		 	//console.log(+"======================");
   		 	if(dcJson[i].txtcontent.length>460){
   		 		$("#bigp").html("有商品评论太长(建议减少表情)");
   		 		$("#bigp").show();
   		 		return false;
   		 	};
   		 };
   		// console.log(JSON.stringify(dcJson));
   		 var dta=0;
   		 var dtaa=0;
   		 console.log(orderid+"orderid")
   		 console.log(describeService+"describeService")
   		 console.log(serviceScore+"serviceScore")
   		 console.log(logisticsScore+"logisticsScore")
   		 console.log(content+"content")
   		 console.log(relationids+"relationids")
   		 console.log(dcJson+"dcJson")
   		 $.ajax({
			type:"post",
			url:url+"/cli/SComment/save",
			data:{
				token: token,
				orderid: orderid,
				describeservice: describeService,
				servicescore: serviceScore,
				logisticsscore: logisticsScore,
				content:content
			},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				//alert(data.code+"0000");
				if(data.code==1){
				dta=1;
				if(dtaa==1){
					gadget_popupt("评价成功");
					window.location.href="order.html";
				};
			};
			},
			error:function(){
				
			}
		});
   		//console.log(relationids+"relationids");
		$.ajax({
			type:"post",
			url:url+"/cli/dc/save",
			data:{dcJson:JSON.stringify(dcJson),token:token,relationids:relationids},
			dataType:"json",
			success:function(data){
				gadget_login(data);
				//alert(data.code+"1111");
				if(data.code==1){
				dtaa=1;
				if(dta==1){
					gadget_popupt("评价成功");
					window.location.href="order.html";
				};
			};
			},
			error:function(){
				
			}
		});
		
		
		
	});
	
	$(".imgfile").change(function(){
		if($(this).parent().parent().siblings(".lisimg").length>2){
			gadget_popupt("请删除一张图后再上传");
			return false;
		}
		$(".lisimg").unbind("click");
		var dex=$(this).parents(".shoplist").index();
		$(".imgfile").hide();
		$("#ismfor").ajaxSubmit({
			url:url+"/file/picUpload",
			type:"post",
			dataType:"json",
			success:function(data){
				if(data.error==0){
					$(".imgfile").show();
				var html='<div class="lisimg" name="55555"><img src="';
				html+=data.url;
				html+='" /></div>';
				$(".shoplist").eq(dex).children(".shopliatminf").children(".listpic").children(".picfile").after(html);
				$(".lisimg").click(function(){
					$("#bigimg").show();
					$(window).scrollTop(0);
					$("#bigpic").attr("src",$(this).children("img").attr("src"));
					minid=$(this).index();
					morid=$(this).parent().parent().parent(".shoplist").index();
					
				});
				};
				
			},
			error:function(){
				
			}
		})
	})
		$("#remove input").click(function(){
			$("#bigimg").hide();
			var up=$(".shoplist").eq(morid).children(".shopliatminf").children(".listpic").children(".lisimg").eq(minid-1);
			console.log(up.attr("name"));
			up.remove();
						
		});
	
    };
})
