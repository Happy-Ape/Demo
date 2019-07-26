$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var sipid="18783330000";
	buylis(2)
	buylis(1)
	function buylis(stype){
	$.ajax({
		type:"get",
		url:url+"/cli/userneed/getall/"+stype+"/1/12/1/1?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
			if(stype==2){
				$("#demandbox .picboxs").hide();
			};
			if(stype==1){
				$("#debuybox .picboxs").hide();
			};
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<a target="_blank" href="';
					if(data.lists[i].userType==1){
						html+='detailswanted.html?name='+encodeURI(data.lists[i].drugName)+'&need='+data.lists[i].userNeedId+'&user='+data.lists[i].userId;
					};
					if(data.lists[i].userType==2){
						html+='buydetails.html?name='+encodeURI(data.lists[i].drugName)+'&need='+data.lists[i].userNeedId+'&user='+data.lists[i].userId;
					};
					
					html+='"><div class="demlis"><div class="demlist">';
					html+='<div class="demtim"><p>发布时间：</p><p>';
					html+=data.lists[i].createDate;
					html+='</p></div>';
					if(data.lists[i].userType==1){
						html+='<div class="demtyps" ><p>买</p></div>';
					};
					if(data.lists[i].userType==2){
						html+='<div class="demtyp" ><p>卖</p></div>';
					};
					html+='</div><div class="demtit"><p>品名: ';
					html+=data.lists[i].drugName;
					html+='</p><p>规格: ';
					html+=data.lists[i].drugSpecifications;
					html+='</p>';
					if(data.lists[i].userType==2){
						html+='<p>售价: <span>';
						if(data.lists[i].drugPrice==""||data.lists[i].drugPrice==null){
							if(token==""||token==null){
								html+='登录可见';
							}else{
								html+='***';	
							};
						}else{
							html+=data.lists[i].drugPrice;
						};
						html+='</span></p>';
					};
					html+='<p>产地: ';
					html+=data.lists[i].originPlace;
					html+='</p><p>库存地: ';
					html+=data.lists[i].stockPlace;
					html+='</p>';
					if(data.lists[i].userType==2){
						html+='<p>供应量: ';
						html+=data.lists[i].number;
						html+='</p>';
					};
					
					html+='</div><div class="deltim"><p>联系人：';
					html+=data.lists[i].userName;
					html+='</p><p>联系电话：';
					if(data.lists[i].userContact==""||data.lists[i].userContact==null){
						html+='登录可见';
					}else{
						html+=data.lists[i].userContact;
					};
					
					html+='</p></div></div></a>';
				};
				
				if(stype==2){
					
					$("#demandbox .demanboxp").after(html);
				};
				if(stype==1){
					$("#debuybox .demanboxps").after(html);
				};
				
			}else{
				if(stype==2){
					$("#demandbox .picboxs img").attr("src","imgeas/error.png");
				};
				if(stype==1){
					$("#debuybox .picboxs img").attr("src","imgeas/error.png");
				};
			}
		},
		error:function(){
			if(stype==2){
					$("#demandbox .picboxs img").attr("src","imgeas/error.png");
			};
			if(stype==1){
				$("#debuybox .picboxs img").attr("src","imgeas/error.png");
			};
		}
	});	
	};
	
	
	
})
