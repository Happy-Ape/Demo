$(function(){
	jQuery.support.cors = true;
	$(".detisha span").click(function(){
		$(this).attr("class","isdetcolo");
		$(this).siblings().removeClass("isdetcolo")
	})
})
