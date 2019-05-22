$(function(){
	jQuery.support.cors = true;
	var token=$.cookie('peoplemessage');
	geturprice()
	function geturprice(){
		$.ajax({
			type:"get",
			url:url+"/price/get?time="+new Date().getTime(),
			dataType:"json",
			success:function(data){
				if(data.code==1&&data.data!=""){
					retxt({"data":data,"index":0});
					reclicka(data);
				}else{
					reerr();
				};
			},
			error:function(){
				reerr();
			}
		});
	};
	function reclicka(data){
		$("#price_b a").click(function(){
			var $this=$(this);
			$this.siblings("a").removeClass("price_color");
			$this.addClass("price_color");
			retxt({"data":data,"index":$this.index()});
		});
	}
	function retxt(ovo){
		// ovo.data ovo.index
		var html='<table cellpadding="0" cellspacing="0"><colgroup><col width="302"><col width="302"><col width="302"><col></colgroup>';
		html+='<thead><tr><th>品名</th><th>规格</th><th>价格</th><th class="nonbor">涨跌</th></tr></thead><tbody>';
		for(var i=0;i<ovo.data.data[ovo.index].length;i++){
			html+='<tr><td>';
			html+=ovo.data.data[ovo.index][i].name;
			html+='</td><td>';
			html+=ovo.data.data[ovo.index][i].size;
			html+='</td><td>';
			html+=ovo.data.data[ovo.index][i].price;
			html+='</td><td class="nonbor">';
			html+=ovo.data.data[ovo.index][i].rate+"%";
			html+='</td></tr>';
		};
		html+='</tbody></table>';
		$("#price_c").html(html);
	};
	function reerr(){
		$("#price_pic img").attr("src","imgeas/error.png");
		$("#price_pic p").html("网络错误，请刷新重试");
	}
})
