$(function(){
	$("#im_lang").scrollTop(9999);
	$("#upbtn").click(function(){
		if($("#im_say").html().length==0){
			return false;
		};
		var tcx=$("#im_say").html();
		$("#im_say").html("")
		var html='<div class="im_time"><p>2012.12.12 12.12.12</p></div><div class="im_pope"><p>';
		html+=tcx;
		html+='</p></div>';
		$("#im_lang").append(html);
		$("#im_lang").scrollTop(9999);
	});

})
