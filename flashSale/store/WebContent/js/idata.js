$(function(){
	jQuery.support.cors = true;
	var tokens=$.cookie('peoplemessage');
	var cityht="";
	var citybd="";
	var vallog=3;
	var lat="";
	var lng="";
	var htm="";//省
	var htom="";//市
	var hom="";//区
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.addControl(new BMap.Geolocation());   //添加地图类型控件
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true); //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom(true);    //启用地图惯性拖拽，默认禁用
	map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
	map.setDefaultCursor("url('crosshair')");   //设置地图默认的鼠标指针样式
	function showInfo(e) {
		theLocation(e.point.lng,e.point.lat)
	}
		map.addEventListener("click", showInfo);
	
var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		//console.log(r)
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			citybd=r.point.lng+','+r.point.lat //经纬度
			lng=r.point.lng;
			lat=r.point.lat;
				theLocation(lng,lat);
		}
	},{enableHighAccuracy: true})
	function theLocation(lng,lat){
		map.clearOverlays();
		var point = new BMap.Point(lng,lat);
		var marker = new BMap.Marker(point); 
		map.addOverlay(marker);              // 将标注添加到地图中
		map.panTo(point);
		var gc = new BMap.Geocoder();
		gc.getLocation(point, function(rs){
  		 var addComp = rs.addressComponents;
   		cityht=addComp.province+addComp.city+addComp.district+addComp.street+addComp.streetNumber;//地址
   		if(vallog==3){
   			$("#mycityy").val(cityht)
   		};
		});
	}
	
	
	
	
	var Type=$.cookie('peopletype');
	
	switch(Number(Type)){
		case 1:
			$("#datanam").html("连锁药店");
			break;
		case 2:
			$("#datanam").html("单体药店");
			break;
		case 3:
			$("#datanam").html("医院");
			break;
		default:
			break;
	};
	
	$(".forinp").eq(0).blur(function(){
		if($(this).val()==""||$(this).val()==null){
			$("#myform i").eq(0).show();
		}else{
			$("#myform i").eq(0).hide();
		};
	});
	$(".forinp").eq(1).blur(function(){
		if($(this).val()==""||$(this).val()==null){
			$("#myform i").eq(1).show();
		}else{
			$("#myform i").eq(1).hide();
		};
	});
	$(".forinp").eq(4).blur(function(){
		if($(this).val()==""||$(this).val()==null){
			$("#myform i").eq(3).show();
		}else{
			$("#myform i").eq(3).hide();
		};
	});
	$("select[name='area']").change(function(){
		if($(this).val()==""||$(this).val()==null){
			$("#myform i").eq(2).show();
		}else{
			$("#myform i").eq(2).hide();
		};
	});
	//$("input[name='address']").attr("disabled","disabled")
	//表单
	
	childao_lis()
	//提交
	$("#mysubmit").click(function(){
		
		if($("input[name='companyName']").val()==""){
			$(".icets").eq(0).show();
			return false;
		}else{
			$(".icets").eq(0).hide();
		};
		if($("input[name='contact']").val()==""){
			$(".icets").eq(1).show();
			return false;
		}else{
			$(".icets").eq(1).hide();
		};
		if($("select[name='area']").val()==""){
			$(".icets").eq(2).show();
			return false;
		}else{
			$(".icets").eq(2).hide();
		};
		if($("input[name='address']").val()==""){
			$(".icets").eq(3).show();
			return false;
		}else{
			$(".icets").eq(3).hide();
		};
		
		var userids=$.cookie('peopleus');
		var endname=$("input[name='companyName']").val();
		var endusername=$("input[name='contact']").val();
		var qq=$("input[name='contactqq']").val();
		var promotioncode=$("input[name='promotionCode']").val();
		//var baseaddress=htm+"-"+htom+"-"+hom;
		var baseaddress = $(".more_province").val() + "-" + $(".more_city").val() + "-" + $(".more_country").val();
		var detailaddress=$("#mycityy").val();
		var longitude=lng;
		var latitude=lat;
		endname=encodeURI(endname);
		endusername=encodeURI(endusername);
		promotioncode=encodeURI(promotioncode);
		baseaddress=encodeURI(baseaddress);
		detailaddress=encodeURI(detailaddress);
		longitude=encodeURI(longitude);
		latitude=encodeURI(latitude);
		$.ajax({
			type:"POST",
			url:url+"/cli/endUser/saveInfo?token="+tokens+"&enduserid="+userids+"&endname="+endname+"&endusername="+endusername+"&qq="+qq+"&promotioncode="+promotioncode+"&baseaddress="+baseaddress+"&detailaddress="+detailaddress+"&longitude="+longitude+"&latitude="+latitude+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code=="1"){
					$(".bodybig").show();
					$(".isgood").click(function(){
						$(".bodybig").hide();
					})
				}else{
					gadget_popupt("提交失败")
				}
			},
			error:function(){
				gadget_popupt("提交 失败")
			}
		});
	})
	
	$.ajax({
		type:"get",
		url:url+"/cli/endUser/getInf?token="+tokens+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$("input[name='companyName']").val(data.pojo.endname);
				$("input[name='contact']").val(data.pojo.endusername);
				$("input[name='contactqq']").val(data.pojo.qq);
				$("input[name='promotionCode']").val(data.pojo.promotioncode);
				//baseaddress
				if(data.pojo.baseaddress!=""&&data.pojo.baseaddress!=null&&data.pojo.baseaddress!=undefined){
					var baseaddre=data.pojo.baseaddress.split("-");
				childao_lis({province:baseaddre[0],city:baseaddre[1],country:baseaddre[2]});
				};
				if(data.pojo.detailaddress!=""&&data.pojo.detailaddress!=null&&data.pojo.detailaddress!=undefined){
					vallog=0;
					$("#mycityy").val(data.pojo.detailaddress);
					$("#allmap").hide();
				};
				
			};
		},
		error:function(){
			
		}
	});
	
	
})
