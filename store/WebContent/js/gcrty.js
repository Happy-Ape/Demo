$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	var userid=$.cookie('peopleus');
	var ab="";
	var bbc="";
	var oldAddrId=0;
	$.ajax({
		type:"GET",
		url:url+"/cli/sellUserAddr/getMyAddr?token="+token+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				$("#errnomore").hide();
				var html='';
				for(var i=0;i<data.lists.length;i++){
					html+='<div name="';
					html+=data.lists[i].senderaddressid;
					html+='" class="crtyisd"><p>公 司 名 字:';
					html+=$.cookie('peoplecompanyname');
					html+='</p><p>寄件人姓名:';
					html+=data.lists[i].sendnmae;
					html+='</p><p>联 系 电 话:';
					html+=data.lists[i].sendphone;
					html+=' ';
					html+=data.lists[i].sendtel;
					html+='</p><p>地 址 邮 编:';
					html+=data.lists[i].sendzip;
					html+='</p><p>寄件人地址:';
					html+=data.lists[i].baseaddrss;
					html+=data.lists[i].address;
					html+='</p><span class="crtypa">修改</span>';
					if(data.lists[i].isdefault!=1){
						html+='<span class="crtymor">设为默认</span>';
					};
					html+='<span class="crtyrem">删除</span>';
					if(data.lists[i].isdefault==1){
						oldAddrId=data.lists[i].senderaddressid;
						html+='<div class="ctyidimg"><img src="../imgeas/moren.png" /><p>默认地址</p></div>';
					};
					html+='</div>';
				};
				$(".oldban").append(html)
				//点击修改
				$(".crtypa").click(function(){
					$(".ismyfor").show();
					$(".ismybigspan").show();
					$(".ismyspan").hide();
					var senderaddressid=$(this).parent().attr("name")
					$(".ismybigspan").attr("name",senderaddressid)
					$.ajax({
						type:"GET",
						url:url+"/cli/sellUserAddr/getAddrByAddrId/"+senderaddressid+"?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								$("#ismyform input[name='sendnmae']").val(data.pojo.sendnmae);
								$("#ismyform input[name='sendphone']").val(data.pojo.sendphone);
								var srro=data.pojo.sendtel.split("-")
								$("#ismyform input[name='sendte']").val(srro[0]);
								$("#ismyform input[name='sendtel']").val(srro[1]);
								$("#ismyform input[name='sendzip']").val(data.pojo.sendzip);
								$("#ismyform input[name='address']").val(data.pojo.address);
								var arr=data.pojo.baseaddrss.split("-");
								//$("#ismyform select[name='province'] option:contains("+arr[0]+")").attr("selected","selected");
								//ab=$("#ismyform select[name='province'] option:contains("+arr[0]+")").attr("ab");
								childao_lis({province:arr[0],city:arr[1],country:arr[2]})
								
							};
						},
						error:function(){
							
						}
					});
				});
				//点击默认
				$(".crtymor").click(function(){
					var newAddrId=$(this).parent().attr("name")
					$.ajax({
						type:"GET",
						url:url+"/cli/sellUserAddr/changeDefaultAddr/"+oldAddrId+"/"+newAddrId+"/"+userid+"?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popupt("更改失败.")
							}
						},
						error:function(){
							gadget_popupt("更改失败")
						}
					});
				})
				//点击删除
				$(".crtyrem").click(function(){
					var endaddressid=$(this).parent().attr("name");
					$.ajax({
						type:"GET",
						url:url+"/cli/sellUserAddr//deleteMyAddr/"+endaddressid+"?token="+token+"&mintime="+new Date().getTime(),
						dataType:"json",
						success:function(data){
							gadget_login(data);
							if(data.code==1){
								setTimeout(gadget_relo,3000);
							}else{
								gadget_popupt("删除失败.")
							}
						},
						error:function(){
							gadget_popupt("删除失败")
						}
					});
					
				})
			}else{
				$("#errnomore p").html("暂无地址");
				$("#errnomore").show();
				
			};
		},
		error:function(){
			$("#errnomore p").html("请求地址失败，请刷新重试");
			$("#errnomore").show();
		}
	
	});
	//省市

	
	//新建
	$(".ismyspan").click(function(){
		var selluserid=$.cookie('peopleus');
		
		//寄件人名字
		var sendnmae=$("#ismyform input[name='sendnmae']").val();
		//电话
		var sendphone=$("#ismyform input[name='sendphone']").val();
		//区号
		var sendte=$("#ismyform input[name='sendte']").val();
		//座机
		var sendtel=$("#ismyform input[name='sendtel']").val();
		var sendt=sendte+"-"+sendtel;
		//邮编
		var sendzip=$("#ismyform input[name='sendzip']").val();
		//详细地址
		var address=$("#ismyform input[name='address']").val();
		//省市
		var baseaddrss=$("#ismyform select[name='province']").val()+"-"+$("#ismyform select[name='city']").val()+"-"+$("#ismyform select[name='area']").val();
		if(sendnmae==""){
			$(".isforsp").eq(0).show();
			return false;
		}else{
			$(".isforsp").eq(0).hide();
		};
		if(sendphone.length!=11){
			$(".isforsp").eq(1).show();
			return false;
		}else{
			$(".isforsp").eq(1).hide();
		};
		if(sendzip.length!=6){
			$(".isforsp").eq(3).show();
			return false;
		}else{
			$(".isforsp").eq(3).hide();
		};
		if($("#ismyform select[name='area']").val()=="请选择"){
			$(".isforsp").eq(4).show();
			return false;
		}else{
			$(".isforsp").eq(4).hide();
		};
		if(address==""){
			$(".isforsp").eq(5).show();
			return false;
		}else{
			$(".isforsp").eq(5).hide();
		};
		sendnmae=encodeURI(sendnmae);
		sendzip=encodeURI(sendzip);
		address=encodeURI(address);
		baseaddrss=encodeURI(baseaddrss);
		sendt=encodeURI(sendt);
		$.ajax({
			type:"POST",
			url:url+"/cli/sellUserAddr/saveEndUserAddr?token="+token+"&sendnmae="+sendnmae+"&sendphone="+sendphone+"&sendzip="+sendzip+"&address="+address+"&baseaddrss="+baseaddrss+"&sendtel="+sendt+"&selluserid="+selluserid+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popupt("提交失败.")
				};
			},
			error:function(){
				gadget_popupt("提交失败")
			}
		});
	
	})
	//修改
	$(".ismybigspan").click(function(){
		
		var selluserid=$.cookie('peopleus');
		//name
		var senderaddressid=$(this).attr("name")
		//寄件人名字
		var sendnmae=$("#ismyform input[name='sendnmae']").val();
		//电话
		var sendphone=$("#ismyform input[name='sendphone']").val();
		//区号
		var sendte=$("#ismyform input[name='sendte']").val();
		//座机
		var sendtel=$("#ismyform input[name='sendtel']").val();
		var sendt=sendte+"-"+sendtel;
		//邮编
		var sendzip=$("#ismyform input[name='sendzip']").val();
		//详细地址
		var address=$("#ismyform input[name='address']").val();
		//省市
		var baseaddrss=$("#ismyform select[name='province']").val()+"-"+$("#ismyform select[name='city']").val()+"-"+$("#ismyform select[name='area']").val();
		if(sendnmae==""){
			$(".isforsp").eq(0).show();
			return false;
		}else{
			$(".isforsp").eq(0).hide();
		};
		if(sendphone.length!=11){
			$(".isforsp").eq(1).show();
			return false;
		}else{
			$(".isforsp").eq(1).hide();
		};
		if(sendzip.length!=6){
			$(".isforsp").eq(3).show();
			return false;
		}else{
			$(".isforsp").eq(3).hide();
		};
		if($("#ismyform select[name='area']").val()=="请选择"){
			$(".isforsp").eq(4).show();
			return false;
		}else{
			$(".isforsp").eq(4).hide();
		};
		if(address==""){
			$(".isforsp").eq(5).show();
			return false;
		}else{
			$(".isforsp").eq(5).hide();
		};
		sendnmae=encodeURI(sendnmae);
		sendzip=encodeURI(sendzip);
		address=encodeURI(address);
		baseaddrss=encodeURI(baseaddrss);
		$.ajax({
			type:"POST",
			url:url+"/cli/sellUserAddr/updateMyAddr?token="+token+"&sendnmae="+sendnmae+"&sendphone="+sendphone+"&sendzip="+sendzip+"&address="+address+"&baseaddrss="+baseaddrss+"&sendtel="+sendt+"&selluserid="+selluserid+"&senderaddressid="+senderaddressid+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popupt("提交成功.");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popupt("提交失败.");
				};
			},
			error:function(){
				gadget_popupt("提交失败");
			}
		});
	
	
	})
	
	
	$(".crtyp").click(function(){
		childao_lis();
		$(".ismyfor").show();
		$(".ismyspan").show();
		$(".ismybigspan").hide();
	})
	
	$(".isforimg").mouseover(function(){
		$(this).attr("src","../imgeas/hongcha.png")
	}).mouseout(function(){
		$(this).attr("src","../imgeas/chac.png")
	});
	$(".isforimg").click(function(){
		$(".ismyfor").hide();
		$("#ismyform input[name='sendnmae']").val("");
		$("#ismyform input[name='sendphone']").val("");
		$("#ismyform input[name='sendte']").val("");
		$("#ismyform input[name='sendtel']").val("");
		$("#ismyform input[name='sendzip']").val("");
		$("#ismyform input[name='address']").val("");
		$("#ismyform select").val("");
	})
	
})
