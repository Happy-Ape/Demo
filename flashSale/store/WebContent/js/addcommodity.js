$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var key="";
	var stenum=2;
	var sctids=getUrlParamo("i");
	if(sctids==""||sctids==null){
		$("#imgbox").hide();
		return false;
	};
	
	$(".addhref").attr("href","addcommodity.html?i="+sctids)
	$(".lishref").attr("href","editprice.html?i="+sctids)
	serchlis();
$("#ismybutton").click(function(){
	key=$("#mytxt").val();
	serchlis();
});
	
	$.ajax({
		type:"get",
		url:url+"/cli/SA/getInfo/"+sctids+"?token="+token+"&time="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				if(data.pojo.state==2){
					htm="(等待开始)";
				};
				if(data.pojo.state==1){
					htm="(正在进行)";
				};
				if(data.pojo.state==-1){
					htm="(已结束)";
				};
				if(data.pojo.state==-2){
					htm="(即将开始)";
				};
				$(".oldban h1").html(data.pojo.simpledesc+htm);
				$(".oldp").html(data.pojo.begindate+"-"+data.pojo.enddate);
				stenum=data.pojo.state;
				if(stenum!=2){
					$(".cas p a").remove();
				};
			};
		},
		error:function(){
			
		}
	});
function serchlis(){
	$.ajax({
		type:"get",
		url:url+"/cli/SA/getAllmyDrug?token="+token+"&key="+key+"&time="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			$("#imgbox").hide();
			if(data.code==1){
				strlis(data);
			}else{
				gadget_popupt("暂无列表");
			};
		},
		error:function(){
			$("#imgbox").hide();
			gadget_popupt("获取失败，请刷新重试");
		}
	});	
}


function strlis(data){
	$("#mytbody tr").remove();
	var html='';
	var c=0;
	for(var i=0;i<data.lists.length;i++){
		html+='<tr name="'+data.lists[i].selldrugid+'"><td class="ismyman"><p><a href="#">';
		html+=data.lists[i].namecn;
		html+='</a></p></td><td><p>';
		html+=data.lists[i].manufacturer;
		html+='</p></td><td><p>';
		html+=data.lists[i].sellprice;
		html+='</p></td><td class="stock"><p>';
		if(data.lists[i].sellstock==null){
			data.lists[i].sellstock=0;
		};
		html+=data.lists[i].sellstock;
		html+='</p></td><td class="getd"><p>';
		html+=data.lists[i].specification;
		html+='</p></td><td class="cas"><p>';
		html+='<a class="addstor">添加</a></p></td>';
		html+='<td class="xgtd"><a>参与数量</a><input type="number" class="toumsl" onkeyup=checkn(this) onafterpaste=checkm(this) /><br><a>每人限购</a>';
		html+='<input type="number" class="genumsl" onkeyup=checkn(this) onafterpaste=checkm(this) />';
		html+='<a>个|单价</a><input type="number" class="numsl" onkeyup=checkn(this) onafterpaste=checkm(this)/><a>元</a>';
		html+='</td><td class="inputmytxt"><a class="yekey">确 定</a><a class="notpass">取 消</a></td></tr>';
	};
	$("#mytbody").append(html);
	if(stenum!=2){
		$(".cas p a").remove();
	};
	$(".addstor").click(function(){
		$(".inputmytxt").hide();
		$(".xgtd").hide();
		$(".cas").show()
		$(".getd").show()
		$(this).parent("p").parent(".cas").hide();
		$(this).parent("p").parent(".cas").siblings(".getd").hide();
		$(this).parent("p").parent(".cas").siblings(".xgtd").show();
		$(this).parent("p").parent(".cas").siblings(".inputmytxt").show();
		
	});
	$(".notpass").click(function(){
		
		$(this).parent(".inputmytxt").hide();
		$(this).parent(".inputmytxt").siblings(".xgtd").hide();
		$(this).parent(".inputmytxt").siblings(".cas").show();
		$(this).parent(".inputmytxt").siblings(".getd").show();
	});
	$(".toumsl").blur(function(){
		var maxnumber=$(this).parent(".xgtd").siblings(".stock").children("p").html();
		maxnumber=Number(maxnumber);
		if(Number($(this).val())>maxnumber){
			$(this).val(maxnumber);
		};
	});
	$(".genumsl").blur(function(){
		var maxnum=Number($(this).siblings(".toumsl").val());
		if(Number($(this).val())>maxnum){
			$(this).val(maxnum);
		};
	});
	$(".yekey").click(function(){
		var obj=$(this).parent(".inputmytxt").parent("tr");
		var dugids=$(this).parent(".inputmytxt").parent("tr").attr("name");
		var toumsl=$(this).parent(".inputmytxt").siblings(".xgtd").children(".toumsl").val();
		var genumsl=$(this).parent(".inputmytxt").siblings(".xgtd").children(".genumsl").val();
		var numsl=$(this).parent(".inputmytxt").siblings(".xgtd").children(".numsl").val();
	//	console.log(toumsl+"toumsl"+genumsl+"genumsl"+numsl+"numsl")
		//console.log(toumsl+"参与数量")
		//console.log(genumsl+"限购数量")
		
		if(toumsl==""||toumsl==null||toumsl<=0){
			gadget_popupt("请正确填写参与数量");
			return false;
		};
		if(genumsl==""||genumsl==null||genumsl<=0){
			gadget_popupt("请正确填写限购数量");
			return false;
		};
		if(numsl==""||numsl==null||numsl<=0){
			gadget_popupt("请正确填写价格");
			return false;
		};
		
		$("#imgbox").show();
		/*discountprice=numsl;
		limitbuynum=genumsl;
		activityid=sctids;
		killStock=toumsl*/
		$.ajax({
			type:"get",
			url:url+"/cli/sellDrug/updateSellDrug?discountprice="+numsl+"&limitbuynum="+genumsl+"&activityid="+sctids+"&killStock="+toumsl+"&token="+token+"&selldrugid="+dugids+"&time="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				$("#imgbox").hide();
				if(data.code==1){
					gadget_popupt("添加成功");
					obj.remove();
				}else if(data.code==-2){
					gadget_popupt("添加失败,参与数量大于库存");
				}else{
					gadget_popupt("添加失败");
				};
			},
			error:function(){
				$("#imgbox").hide();
				gadget_popupt("添加失败，请刷新重试");
			}
		});
	});
}
})
