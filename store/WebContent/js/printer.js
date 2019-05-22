$(function(){
	jQuery.support.cors = true;
	$(".isprehespo").click(function(){
		$(".ispornbig").show();
	})
	$(".isforimg").mouseover(function(){
		$(this).attr("src","../imgeas/hongcha.png")
	}).mouseout(function(){
		$(this).attr("src","../imgeas/chac.png")
	});
	$(".isforimg").click(function(){
		$(".ispornbig").hide();
	})
	$(".isforxg").click(function(){
		$(".ispornbig").show();
	})
	$(".isprehp").click(function(){
		$(".ismydiv").show();
	})
	$(".ismydiv h3").click(function(){
		$(".ismydiv").hide();
	})
})
