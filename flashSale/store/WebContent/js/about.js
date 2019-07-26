$(function(){
	jQuery.support.cors = true;
	
	var token=$.cookie('peoplemessage');
	var peopletype=$.cookie('peopletype');
	var selluserid=window.location.search;
		if(selluserid==""){
			return false;
		};
		selluserid=decodeURI(selluserid);
		selluserid=selluserid.split("=");
		if(selluserid[1]==""){
			return false;
		};
		selluserid=selluserid[1];
		$(".sosu .logsubt").click(function(){
			var searchs=$(this).siblings(".logtex").val();
			if(searchs.length<2){
				return false;
			};
			window.location.href="allprice.html?us="+selluserid+"&search="+searchs;
		});
	shoptop();
		function shoptop(){
			var htm='<a href="';
			htm+='shopdetails.html?us='+selluserid;
			htm+='" >店铺首页</a><a href="';
			htm+='allprice.html?us='+selluserid;
			htm+='" >全部商品</a><a href="';
			htm+='comment.html?us='+selluserid;
			htm+='" >店铺评价</a><a href="';
			htm+='notice.html?us='+selluserid;
			htm+='" >店铺公告</a><a href="';
			htm+='about.html?us='+selluserid;
			htm+='"  class="heashopa">关于我们</a>';
			$(".heashoptop").append(htm);
		};
		$.ajax({
			type:"get",
			url:url+"/cli/sellUser/getStoreAndCoupons/"+selluserid,
			data:{token:token,mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				
				gadget_login(data);
				if(data.code==1){
					if(data.pojo.state!=61){
						$("#bigmore").show();
						if(data.pojo.stopbusreason==""||data.pojo.stopbusreason==null){
							data.pojo.stopbusreason="暂无公告";
						};
						$("#shopnot p").html(data.pojo.stopbusreason);
						$(".logsubt").remove();
						$(".heashopt").hide();
						$(".company").hide();
						$(".enterprise").hide();
					};
					var html='';
					html+='<h2>';
					html+=data.pojo.sellername;
					html+='</h2><a href="#"><img src="imgeas/zztb.png"/></a>';
					var other=data.pojo.experiencevalue;
					html+=expsn(other);
					html+='<p>商品描述：<span>';
					if(data.pojo.avgscore!=""&&data.pojo.avgscore!=null){
						var avgscore=data.pojo.avgscore.split(",");
						html+=avgscore[2];
						html+='</span>物流评分：<span>';
						html+=avgscore[0];
						html+='</span>服务评分：<span>';
						html+=avgscore[1];
					}else{
						html+='--';
						html+='</span>物流评分：<span>';
						html+='--';
						html+='</span>服务评分：<span>';
						html+='--';
					};
					
					html+='</span>';
					if(data.message==1){
						html+='<span id="storlike">已收藏</span>';
						html+='<span id="shoplike" class="likeshow">收藏本店铺</span>';
					}else{
						html+='<span id="storlike" class="likeshow">已收藏</span>';
						html+='<span id="shoplike">收藏本店铺</span>';
					};
					html+='</p><p>店铺地址：<span>';
					if(data.pojo.selleraddress==undefined){
						data.pojo.selleraddress="--";
					};
					html+=data.pojo.selleraddress;
					html+='</span></p><p>最低发货金额<span>¥';
					if(data.pojo.minshippingprice==""||data.pojo.minshippingprice==null||data.pojo.minshippingprice==undefined){
						data.pojo.minshippingprice="--";
					};
					html+=data.pojo.minshippingprice;
					html+='</span>  邮费<span>¥';
					if(data.pojo.postage==""||data.pojo.postage==null||data.pojo.postage==undefined){
						data.pojo.postage="--";
					};
					html+=data.pojo.postage;
					html+='</span>  (满<span>¥';
					if(data.pojo.freeshippingprice==""||data.pojo.freeshippingprice==null||data.pojo.freeshippingprice==undefined){
						data.pojo.freeshippingprice="--";
					};
					html+=data.pojo.freeshippingprice;
					html+='</span>包邮)</p><p id="telmyss"><span id="shopkf" name="s'+data.pojo.phonenum+'">联系客服</span>';
					if(data.pojo.customerqq!=""&&data.pojo.customerqq!=null){
					customerqq=data.pojo.customerqq.split(",");
					for(var p=0;p<customerqq.length;p++){
					html+='<span><a href="http://wpa.qq.com/msgrd?v=3&uin='+customerqq[p]+'&site=找药吧&menu=yes" target="_blank">QQ客服</a></span>';
					};
					};
					if(data.pojo.customerservice!=""&&data.pojo.customerservice!=null){
						customerservice=data.pojo.customerservice.split(",");
						html+='<span>客服电话：';
						for(var t=0;t<customerservice.length;t++){
							html+=' ';
							html+=customerservice[t];
						};
						html+='</span>';
					};
					html+='</p>';
					$('#omg').append(html);
					$("#shopkf").click(function(){
						if(token==""||token==null){
							gadget_popupt("登录后可使用此功能");
							return false;
						};
						$("#my_im").show();
						$("#im_lang div").remove();
						$("#im_box").attr("name",$(this).attr("name"));
						$("#im_name h3").html($(this).parent("#telmyss").siblings("h2").html());
						
					});
					if(data.pojo.state!=61){
						$("#shoplike").remove();
					};
					$('#shoplike').click(function(){
						if(peopletype==null){
						gadget_popupt("请登录");
						return false;
					};
					if(peopletype!=1&peopletype!=2&peopletype!=0){
						gadget_popupt("仅限终端用户.");
						return false;
					};
						$.ajax({
							type:"get",
							url:url+"/cli/CS/save/"+selluserid,
							data:{token:token,mintime:new Date().getTime()},
							dataType:"json",
							success:function(data){
								
								gadget_login(data);
								if(data.code==1){
									if(data.code==1){
										gadget_popupt("收藏成功");
										$("#shoplike").addClass("likeshow");
										$("#storlike").removeClass("likeshow");
									}else{
										gadget_popupt("收藏失败"+data.message);
									};
								};
							},
							error:function(){
								gadget_popupt("收藏失败，请重试");
							}
						});
					});
				};
			},
			error:function(){
				
			}
		});
		$.ajax({
			type:"get",
			url:url+"/cli/sellUser/getInfoBySellUserId/"+selluserid,
			data:{mintime:new Date().getTime()},
			dataType:"json",
			success:function(data){
				if(data.code==1){
					$("#mycont").html(data.pojo.companyintroduction);
					var html='<h5>联系方式</h5><p>公司名称：';
					if(data.pojo.companyname==""||data.pojo.companyname==null){
						data.pojo.companyname="--";
					};
					html+=data.pojo.companyname;
					html+='</p><p>联系人：';
					if(data.pojo.contact==""||data.pojo.contact==null){
						data.pojo.contact="--";
					};
					html+=data.pojo.contact;
					html+='</p><p>联系电话：<span class="entfist">';
					if(data.pojo.tel==""||data.pojo.tel==null){
						data.pojo.tel="--";
					};
					html+=data.pojo.tel;
					html+='</span></p><p>电子邮箱：';
					if(data.pojo.email==""||data.pojo.email==null){
						data.pojo.email="--";
					};
					html+=data.pojo.email;
					html+='</p><p>经营地址：';
					if(data.pojo.selleraddress==""||data.pojo.selleraddress==null){
						data.pojo.selleraddress="--";
					};
					html+=data.pojo.selleraddress;
					html+='</p>';
					$(".enterprise").append(html);
					
				};
			},
			error:function(){
				
			}
		});
		function expsn(other){
		var html='';
					if(other==0){
						html+='<img src="imgeas/chushi.png">';
					};
				if(other>=1&&other<=250){
					if(other>=1&&other<=10){
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=11&&other<=40){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=41&&other<=90){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=91&&other<=150){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
					if(other>=151&&other<=250){
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
						html+='<img src="imgeas/xinxing.png">';
					};
				};
				if(other>=251&&other<=10000){
					if(other>=251&&other<=500){
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=501&&other<=1000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=1001&&other<=2000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=2001&&other<=5000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
					if(other>=5001&&other<=10000){
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
						html+='<img src="imgeas/zuanshi.png">';
					};
				};
				if(other>=10001&&other<=500000){
					if(other>=10001&&other<=20000){
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=20001&&other<=50000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=50001&&other<=100000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=100001&&other<=200000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
					if(other>=200001&&other<=500000){
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
						html+='<img src="imgeas/huangguan.png">';
					};
				};
				if(other>=500001){
					if(other>=500001&&other<=1000000){
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=1000001&&other<=2000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=2000001&&other<=5000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=5000001&&other<=10000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=10000001&&other<=20000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
					if(other>=20000001&&other<=90000000){
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
						html+='<img src="imgeas/jinguan.png">';
					};
				};
				return html;
	};
		
		
		
})
