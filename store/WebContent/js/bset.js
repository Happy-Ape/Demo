$(function(){
	jQuery.support.cors = true;
	var pstate=$.cookie('peoplestate');
	if(pstate!=6&&pstate!=61&&pstate!=62){
		$("#ismyform").remove();
		html='<p id="bestrep"><a href="prompt.html">请上传资质</a>如已经上传资质请重新登录或联系客服</p>';
		$(".oldban").append(html);
	};
	
	var token=$.cookie('peoplemessage');
	
	var fo=0;
	var state=$("#bsexhk").val();
	var stopbusreason="";
	$(".ismyspna").hide()
	$("#bsexhks").click(function(){
		fo=fo+1;
		$(this).attr("checked","checked")
		state=$(this).val();
		$("#bsexhk").removeAttr("checked")
		if(fo==1){
			$("#bsexhks").after('<div id="checdi"><span>暂停营业公告:</span><textarea name="customer"></textarea></div>')
		}
		
	});
	$("#bsexhk").click(function(){
		$(this).attr("checked","checked")
		state=$(this).val();
		$("#bsexhks").removeAttr("checked")
		$("#checdi").remove();
		fo=0;
	});
	
	$.ajax({
		type:"GET",
		url:url+"/cli/sellUser/getStore",
		data:{token:token,mintime:new Date().getTime()},
		dataType:"json",
		success:function(data){
			gadget_login(data);
			
			if(data.code==1){
				
				//data.pojo.sellername
				$("#ismyform input[name='sellername']").val(data.pojo.sellername);
				$("#ismyform input[name='sellerenname']").val(data.pojo.sellerenname);
				if(data.pojo.sellername!=""&&data.pojo.sellername!=null){
					$("#ismyform input[name='sellername']").attr("disabled","disabled");
				};
				if(data.pojo.sellerenname!=""&&data.pojo.sellerenname!=null){
					$("#ismyform input[name='sellerenname']").attr("disabled","disabled");
				};
				$("#ismyform input[name='companyintroduction']").val(data.pojo.companyintroduction);
				$("#ismyform input[name='minshippingprice']").val(data.pojo.minshippingprice);
				$("#ismyform textarea[name='companyintroduction']").val(data.pojo.companyintroduction);
				if(data.pojo.customerqq!=null&&data.pojo.customerqq!=undefined){
					var qqarr=data.pojo.customerqq.split(",");
					$("#ismyform input[name='customerqq']").eq(0).val(qqarr[0]);
					$("#ismyform input[name='customerqq']").eq(1).val(qqarr[1]);
				};
				if(data.pojo.customerservice!=null&&data.pojo.customerservice!=undefined){
					var telarr=data.pojo.customerservice.split(",");
					$("#ismyform input[name='customerservice']").eq(0).val(telarr[0]);
					$("#ismyform input[name='customerservice']").eq(1).val(telarr[1]);
				};
				if(data.pojo.state=="62"){
					fo=1;
					$("#bsexhks").attr("checked","checked");
					$("#bsexhks").after('<div id="checdi"><span>暂停营业公告:</span><textarea name="customer"></textarea></div>');
					$("#ismyform textarea[name='customer']").val(data.pojo.stopbusreason);
					$("#bsexhk").removeAttr("checked");
					state=$("#bsexhks").val();
				};
				$("#isbutton").show();
			}else{
				$("#isbutton").show();
			};
		},
		error:function(){
			gadget_popupt("加载失败，请刷新重试")
		}
	});
	
	$("#isbutton").click(function(){
		if($("#ismyform input[name='sellername']").val()==""){
			$(".ismyspna").eq(0).show();
			return false;
		}else{
			$(".ismyspna").eq(0).hide();
		};
		if($("#ismyform input[name='sellerenname']").val()==""){
			$(".ismyspna").eq(1).show();
			return false;
		}else{
			$(".ismyspna").eq(1).hide();
		};
		if($("#ismyform input[name='customerqq']").eq(0).val()==""&&$("#ismyform input[name='customerqq']").eq(1).val()==""){
			$(".ismyspna").eq(2).show();
			return false;
		}else{
			$(".ismyspna").eq(2).hide();
		};
		if($("#ismyform input[name='customerservice']").eq(0).val()==""&&$("#ismyform input[name='customerservice']").eq(1).val()==""){
			$(".ismyspna").eq(3).show();
			return false;
		}else{
			$(".ismyspna").eq(3).hide();
		};
		if(fo==1){
			stopbusreason=$("#ismyform textarea[name='customer']").val();
		};
		var sellername=$("#ismyform input[name='sellername']").val();
		var sellerenname=$("#ismyform input[name='sellerenname']").val();
		
		var customerqq=$("#ismyform input[name='customerqq']").eq(0).val()+","+$("#ismyform input[name='customerqq']").eq(1).val();
		var customerservice=$("#ismyform input[name='customerservice']").eq(0).val()+","+$("#ismyform input[name='customerservice']").eq(1).val();
		sellername=encodeURI(sellername);
		sellerenname=encodeURI(sellerenname);
		
		customerservice=encodeURI(customerservice);
		stopbusreason=encodeURI(stopbusreason);
		
		$.ajax({
			type:"POST",
			url:url+"/cli/sellUser/updateStore?token="+token+"&sellername="+sellername+"&sellerenname="+sellerenname+"&customerqq="+customerqq+"&customerservice="+customerservice+"&stopbusreason="+stopbusreason+"&mintime="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				gadget_login(data);
				if(data.code==1){
					gadget_popups("提交成功");
					setTimeout(gadget_relo,3000);
				}else{
					gadget_popups("提交失败.")
				}
			},
			error:function(){
				gadget_popups("提交失败")
			}
		});
	})
	
})
