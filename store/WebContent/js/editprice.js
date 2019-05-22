$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var key="";
	var sctids=getUrlParamo("i");
	var stenum=2;
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
				//stenum=2;
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
		url:url+"/cli/SA/editActDrug/"+sctids+"?token="+token+"&key="+key+"&time="+new Date().getTime(),
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
};


function strlis(data){
	$("#mytbody tr").remove();
	var html='';
	
	for(var i=0;i<data.lists.length;i++){
		html+='<tr name="'+data.lists[i].selldrugid+'"><td class="ismyman"><p><a href="#">';
		html+=data.lists[i].namecn;
		html+='</a></p></td><td><p>';
		html+=data.lists[i].manufacturer;
		html+='</p></td><td class="sellprice minth"><p>';
		html+=data.lists[i].sellprice;
		html+='</p></td><td class="discountprice minth"><p>';
		html+=data.lists[i].discountprice;
		html+='</p></td><td class="stock minth"><p>';
		if(data.lists[i].sellstock==null){
			data.lists[i].sellstock=0;
		};
		html+=data.lists[i].sellstock;
		
		html+='</p></td><td class="killstock minth"><p>';
		html+=data.lists[i].kill_stock;
		html+='</p></td><td class="limitbuyn minth"><p>';
		html+=data.lists[i].limitbuynum;
		html+='</p></td><td class="getd"><p>';
		html+=data.lists[i].specification;
		
		html+='</p></td><td class="cas"><p>';
		html+='<a class="removelis">删除</a> <a class="addstor">编辑</a></p></td>';
		html+='<td class="xgtd"><a>参与数量</a><input type="number" class="toumsl" onkeyup=checkn(this) onafterpaste=checkm(this) /><br><a>每人限购</a>';
		html+='<input type="number" class="genumsl" onkeyup=checkn(this) onafterpaste=checkm(this) />';
		html+='<a>个|单价</a><input type="number" class="numsl" onkeyup=checkn(this) onafterpaste=checkm(this)/><a>元</a>';
		html+='</td><td class="inputmytxt"><a class="yekey">确 定</a> <a class="notpass">取 消</a></td></tr>';
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
		var maxnumber=Number($(this).parent(".xgtd").siblings(".stock").children("p").html());
		var killnumber=Number($(this).parent(".xgtd").siblings(".killstock").children("p").html());
		var caxnumber=maxnumber+killnumber;
		console.log(killnumber)
		if(Number($(this).val())>caxnumber){
			$(this).val(caxnumber);
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
		
		if(toumsl==""||toumsl==null||toumsl<=0){
			gadget_popupt("请正确填写参与数量");
			return false;
		}
		if(genumsl==""||genumsl==null||genumsl<=0){
			gadget_popupt("请正确填写限购数量");
			return false;
		};
		if(numsl==""||numsl==null||numsl<=0){
			gadget_popupt("请正确填写价格");
			return false;
		}
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
					gadget_popupt("编辑成功");
					setTimeout(gadget_relo,3000);
				}else if(data.code==-2){
					gadget_popupt("编辑失败,参与数量大于库存");
				}else{
					gadget_popupt("编辑失败");
				};
			},
			error:function(){
				$("#imgbox").hide();
				gadget_popupt("编辑失败，请刷新重试");
			}
		});
	});
	$(".removelis").click(function(){
		var obj=$(this).parent("p").parent(".cas").parent("tr");
		var dugids=$(this).parent("p").parent(".cas").parent("tr").attr("name");
		$.ajax({
			type:"get",
			url:url+"/cli/sellDrug/updateSellDrug?limitbuynum=-1&token="+token+"&selldrugid="+dugids+"&time="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("删除成功");
					obj.remove();
				}else{
					gadget_popupt("删除失败");
				};
			},
			error:function(){
				gadget_popupt("删除失败，请刷新重试");
			}
		});
	});
}
})
