$(function(){
var data = {};
var nim = NIM.getInstance({
    // 初始化SDK
    // debug: true
    appKey: '3b4f23291d91c6e2520e10c0fa9174ee',
    account: 'cli',
    token: '4930366e028a9586031b07340929d8c3',
    onconnect: onConnect,
    onerror: onError,
    onwillreconnect: onWillReconnect,
    ondisconnect: onDisconnect,
    // 多端登录
    onloginportschange: onLoginPortsChange,
});
function onConnect() {
   // console.log('连接成功');
    nim.getHistoryMsgs({
    scene: 'p2p',
    to: 'admin',
    done: getHistoryMsgsDone
});
}
function onWillReconnect(obj) {
    // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
   // console.log('即将重连');
   // console.log(obj.retryCount);
   // console.log(obj.duration);
}
function onDisconnect(error) {
    // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
   // console.log('丢失连接');
   // console.log(error);
    if (error) {
        switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
            break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
            break;
        default:
            break;
        }
    }
}
function onError(error) {
  //  console.log(error);
}
function onLoginPortsChange(loginPorts) {
  //  console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
}
function getHistoryMsgsDone(error, obj) {
   // console.log('获取p2p历史消息' + (!error?'成功':'失败'));
   // console.log(error);
   // console.log(obj);
    if (!error) {
    //    console.log(obj.msgs);
        if(obj.msgs.length>50){
        	var sflen=50;
        }else{
        	var sflen=obj.msgs.length;
        };
        var txtarr=[];
        for(var i=0;i<sflen;i++){
        	var txtmsg=obj.msgs[i].text+";"+obj.msgs[i].time;
        	txtarr.push(txtmsg);
        };
        
        txtarr=txtarr.join(",");
        $.cookie("potxtarr",txtarr,{path:"/"});
         var potxtarr=txtarr;
        if(potxtarr==""||potxtarr==null){
        	return false;
        };
        potxtarr=potxtarr.split(",");
        setTimeout(ddlis,1000)
	//ddlis()
	function ddlis(){
		for(var i=0;i<8;i++){
			var iorr=potxtarr[i].split(";");
			var ometim=new Date().getTime()-iorr[1];
			ometim=parseInt(ometim/60000);
			var setime="";
			if(ometim<120){
				setime=ometim+"分钟前";
			};
			if(ometim<240&&ometim>=120){
				setime="2小时前";
			};
			if(ometim<300&&ometim>=240){
				setime="4小时前";
			};
			if(ometim<600&&ometim>=300){
				setime="5小时前";
			};
			if(ometim>=600){
				setime="10小时前";
			};
			var isrr=iorr[0].split("，");
			var html='<li><a>'+isrr[0]+'</a><br><a><span>'+isrr[1]+'</span></a><span class="ometime">'+setime+'</span></li>';
			$(".headingd").prepend(html);
		};
	};
	var leni=potxtarr.length-1;
	if(leni>20){
		leni=20
	}else{
		leni=potxtarr.length-1;
	};
	var leni_ob=leni;
	function ddan(){
		leni=leni-1;
		if(leni<0){
			leni=leni_ob;
		};
		var otrr=potxtarr[leni].split(";");
		var ometim=new Date().getTime()-otrr[1];
			ometim=parseInt(ometim/60000);
			var sotime="";
			if(ometim<120){
				sotime=ometim+"分钟前";
			};
			if(ometim<240&&ometim>=120){
				sotime="2小时前";
			};
			if(ometim<300&&ometim>=240){
				sotime="4小时前";
			};
			if(ometim<600&&ometim>=300){
				sotime="5小时前";
			};
			if(ometim>=600){
				sotime="10小时前";
			};
		var orr=otrr[0].split("，");
		var html='<li><a>'+orr[0]+'</a><br><a><span>'+orr[1]+'</span></a><span class="ometime">'+sotime+'</span></li>';
		$(".headingd").prepend(html);
		$(".headingd li:first-child").hide();
		$(".headingd li:first-child").show(1000);
		$(".headingd li:last-child").remove();
	};
	setInterval(ddan,3000);
    }
}


})
