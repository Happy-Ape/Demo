$(function() {

	if(window.screen.width < 1869) {
		$(".bodycity").css("left", "10%");
	};
	if(window.screen.width < 1644) {
		$(".bodycity").css("left", "5%");
	};
	if(window.screen.width < 1455) {
		$(".bodycity").css("left", "0%");
	};

	if(window.screen.width < 1297) {
		$(".bodycity").hide();
	};
	jQuery.support.cors = true;
	$('html,body').animate({
		scrollTop: $("body").offset().top
	}, 500);

	var url = "http://localhost:8080/zybb2b";

	topurl = url + "//";
	twourl = url + "//";
	var tyop = "";
	var adcid = "";
	var sid = "";
	var arrid = [];
	var name = "";
	ads(); //1

	function ads() {
		//	for(var i=0;i<data.lists.length;i++){
		//          		html='<li class="fenlifi" name="'+data.lists[i].cateid+'"><i class="heafots">&#xe'+data.lists[i].remark+';</i>';
		//          		html+='<a href="classification.html?i='+data.lists[i].cateid+'" target="_blank" name="';
		//          		html+=data.lists[i].cateid;
		//          		html+='">';
		//          		html+=data.lists[i].catename;
		//          		html+='</a><div class="heafotxx"><h4 class="heafothfo">';
		//          		html+='<a href="classification.html?i='+data.lists[i].cateid+'" target="_blank" name="';
		//          		html+=data.lists[i].cateid;
		//          		html+='">'
		//          		html+=data.lists[i].catename;
		//          		html+='</a></h4>';
		//          		html+='</div></li>';
		//          		$("#heafenul").append(html);

		//          		var adcid=data.lists[i].cateid;
		//          		arrid.push(adcid);
		//}
		$(".fenlifi").mouseenter(function() {
			$(this).children(".heafotxx").show();
			var sid = $(this).attr("name");
			//	$(".liuliuo").remove();
		}).mouseleave(function() {
			$(".heafotxx").hide();
		});

	}

})