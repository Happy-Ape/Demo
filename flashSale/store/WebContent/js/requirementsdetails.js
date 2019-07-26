$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	function geturlname(name){
		var sear=window.location.search
		sear=sear.split(name);
		sear=sear[1].split("&");
		sear=sear[0].split("=")
		sear=sear[1];
		return sear;
	};
	//?nd=3&tp=1&fg=6
	
	var sellerNeedsId=geturlname("nd");
	var type=geturlname("tp");
	if(sellerNeedsId==""||sellerNeedsId==null){
		return false;
	};
	if(type==""||type==null){
		return false;
	};
	$.ajax({
		type:"get",
		url:url+"/cli/sn/getDetailAndSu/"+sellerNeedsId+"/"+type,
		dataType:"json",
		success:function(data){
			gadget_login(data);
			if(data.code==1){
				var html='';
				html+='<h5>';
				if(data.pojo.type==2){
					html+='<span style="background-color: ';
					html+='#FF9999';
					html+=';" id="reqtyp">';
					html+='卖';
					html+='</span>';
				};
				if(data.pojo.type==1){
					html+='<span style="background-color: ';
					html+='#6699CC';
					html+=';" id="reqtyp">';
					html+='买';
					html+='</span>';
				};
				
				html+=data.pojo.title;
				html+='</h5><p>';
				if(token!=""&&token!=null){
					if(data.pojo.type==1&&data.pojo.endphonenum!=""&&data.pojo.endphonenum!=null){
						html+='<span id="spanbtn" name="e'+data.pojo.endphonenum+'">联系发布者</span>';
					};
					if(data.pojo.type==2&&data.pojo.phonenum!=""&&data.pojo.phonenum!=null){
						html+='<span id="spanbtn" name="s'+data.pojo.phonenum+'">联系发布者</span>';
					};
				};
				html+='联系电话：<span>';
//				/endphonenum
				if(token!=""&&token!=null){
					if(data.pojo.type==2){
						html+=data.pojo.phonenum;
					};
					if(data.pojo.type==1){
						html+=data.pojo.endphonenum;
					};
				}else{
					html+='登录可见';
				};
				html+='</span></p><p>发布时间：';
				html+=data.pojo.createtime;
				html+='  过期时间：';
				html+=data.pojo.expiredtime;
				html=='</p>';
				$("#reqtit").append(html);
				$("#reqtxt").append(data.pojo.content);
				$("#spanbtn").click(function(){
					
					if(token==""||token==null){
						return false;
					};
					if($(this).attr("name")==""||$(this).attr("name")==null){
						return false;
					};
					//alert($(this).attr("name"));
					$("#im_box").attr("name",$(this).attr("name"));
					$("#im_lang div").remove();
					$("#im_name h3").html("");
					$("#my_im").show();
					
				});
			};
		},
		error:function(){
			
		}
	});
	
	
})
