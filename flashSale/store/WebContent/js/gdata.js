$(function(){
	jQuery.support.cors = true;
	
	$(".oldspn").click(function(){
		$(".oldtxt").hide(200);
		$(".oldisfo").show(200);
	});
	$(".isimg").click(function(){
		$(".oldisfo").hide(200);
		$(".oldtxt").show(200);
	});
	$(".isimg").mouseover(function(){
		$(".isimg img").attr("src","../imgeas/cha.png")
	}).mouseout(function(){
		$(".isimg img").attr("src","../imgeas/chac.png")
	});
	$(".detailedpic").mouseover(function(){
		$(".detailedtxt").show();
	}).mouseout(function(){
		$(".detailedtxt").hide();
	});
	$(".isfopan").hide()
	
	//首次进入
	var tokens=$.cookie('peoplemessage');
	$.ajax({
		type:"GET",
		url:url+"/cli/sellUser/getInfo/?token="+tokens+"&mintime="+new Date().getTime(),
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				html+='<p id="notfistp"><span>公司名称：</span>';
				if(data.pojo.companyname==null){
					data.pojo.companyname="";
				};
				$("#fortxtname").val(data.pojo.companyname);
				html+=data.pojo.companyname;
				html+='</p><p><span>公司类型：</span>';
				if(data.pojo.type==4){
					html+='商业公司';
				};
				if(data.pojo.type==5){
					html+='厂商';
				};
				if(data.pojo.type==6){
					html+='中药材商户';
				};
				html+='</p><p><span>联  系  人：</span>';
				if(data.pojo.contact==null){
					data.pojo.contact="";
				};
				$("#fortxtcontact").val(data.pojo.contact);
				html+=data.pojo.contact;
				html+='</p><p><span>联系电话：</span>';
				if(data.pojo.tel==null){
					data.pojo.tel="";
				};
				
				$("#fortxttel").val(data.pojo.tel);
				html+=data.pojo.tel;
				html+='</p>';
				html+='<p><span>联系邮箱：</span>';
				if(data.pojo.email==null){
					data.pojo.email="";
				};
				$("#fortxtemail").val(data.pojo.email);
				html+=data.pojo.email;
				html+='</p><p><span>经营地址：</span>';
				if(data.pojo.selleraddress==null){
					data.pojo.selleraddress="";
				};
				html+=data.pojo.selleraddress;
				html+='</p>'
				$(".oldspn").before(html)
			}
		},
		error:function(){
			
		},
	});
	
	
	
	
	//省市
	childao_lis();
	
	$("#mybutton").click(function(){
		if($(".fortxt").eq(0).val()==""){
			$(".isfopan").eq(0).show();
			return false;
		}else{
			$(".isfopan").eq(0).hide();
		};
		if($(".fortxt").eq(1).val().length!=11){
			$(".isfopan").eq(1).show();
			return false;
		}else{
			$(".isfopan").eq(1).hide();
		};
		if($(".fortxt").eq(2).val()==""){
			$(".isfopan").eq(2).show()
			return false;
		}else{
			$(".isfopan").eq(2).hide();
		};
		if($("#isform select").eq(2).val()=="请选择"){
			$(".isfopan").eq(3).show();
			return false;
		}else{
			$(".isfopan").eq(3).hide();
		};
		if($(".fortxt").eq(4).val()==""){
			$(".isfopan").eq(4).show()
			return false;
		}else{
			$(".isfopan").eq(4).hide();
		};
		var token=$.cookie('peoplemessage');
		var companyname=$(".fortxt[name='companyname']").val();
		var email=$(".fortxt[name='email']").val();
		var contact=$(".fortxt[name='contact']").val();
		var tel=$(".fortxt[name='tel']").val();
		var selleraddress=$("select[name='province']").val()+$("select[name='city']").val()+$("select[name='area']").val()+$(".fortxt[name='selleraddress']").val();
		//var dataa={token:token,companyname:companyname,email:email,contact:contact,tel:tel,selleraddress:selleraddress};
		selleraddress=encodeURI(selleraddress);
		$.ajax({
		type:"post",
		url:url+"/cli/sellUser/updateUserInf?token="+token+"&companyname="+companyname+"&email="+email+"&contact="+contact+"&tel="+tel+"&selleraddress="+selleraddress,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				gadget_popups("提交成功");
				setTimeout(gadget_relo,3000);
			}else{
				gadget_popupt("提交失败");
			};
		},
		error:function(){
			gadget_popupt("提交失败.");
		}
	});
	
	})
})
