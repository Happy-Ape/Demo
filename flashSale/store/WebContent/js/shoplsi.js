$(function(){
	jQuery.support.cors = true;
	$(".islasd .isoneob input").click(function(){
		if(this.checked){
			$(".islasoadd .isoneob input").attr("checked",true);
		}else{
			$(".islasoadd .isoneob input").attr("checked",false);
		}
		
	})
})
