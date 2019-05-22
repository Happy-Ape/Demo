$(function(){
	var data = {};
	var imaccount=$.cookie('peopleendaccid');
	var imtoken=$.cookie('peopleendtoken');
	var tosay="";
	var tdmin=[];
	if(imtoken==null||imaccount==null||imtoken==""||imaccount==""){
		$("#my_im_min").hide();
		return false;
	};
	myposik();
function myposik(){
	var html='<div id="my_im_list"><div id="im_li_xx"><img src="imgeas/chac.png" /></div><h4>联系人列表</h4></div>';
	html+='<div id="my_im_min"><img src="imgeas/tom.png" /><div id="my_im_ne"><p>新消息</p></div></div><div id="my_im">';
	html+='<div id="im_box"><div id="im_name"><h3>民生医院</h3><div id="im_xx"><img src="imgeas/chac.png" /></div></div>';
	html+='<div id="im_lang"></div><div id="im_say" contenteditable="true"></div><div id="im_up"><div id="myfil">';
	html+='<img id="my_png" src="imgeas/tjtps.png" /><img id="my_gif" src="imgeas/yuanq.gif" /></div><form action="#" id="upfil">';
	html+='<input type="file" id="fileInput" name="file" accept="image/jpeg,image/jpg,image/png" /></form><div id="im_emoticon"><span>(*-*)</span></div>';
	html+='<span id="im_upbtn">发 送</span></div><div id="im_lispic"><table cellpadding="0"><tbody></tbody></table></div></div></div>';
	$("body").append(html);
};
var nim = NIM.getInstance({
    // 初始化SDK omg_im
   // debug: true,
    appKey: "3b4f23291d91c6e2520e10c0fa9174ee",
    account: imaccount,
    token: imtoken,
    onconnect: onConnect,
    onerror: onError,
    onwillreconnect: onWillReconnect,
    ondisconnect: onDisconnect,
    // 多端登录
    onloginportschange: onLoginPortsChange,
    // 用户关系
    onblacklist: onBlacklist,
    onsyncmarkinblacklist: onMarkInBlacklist,
    onmutelist: onMutelist,
    onsyncmarkinmutelist: onMarkInMutelist,
    // 好友关系
    onfriends: onFriends,
    onsyncfriendaction: onSyncFriendAction,
    // 用户名片
    onmyinfo: onMyInfo,
    onupdatemyinfo: onUpdateMyInfo,
    onusers: onUsers,
    onupdateuser: onUpdateUser,
    // 群组
    onteams: onTeams,
    onsynccreateteam: onCreateTeam,
    onteammembers: onTeamMembers,
    onsyncteammembersdone: onSyncTeamMembersDone,
    onupdateteammember: onUpdateTeamMember,
    // 会话
    onsessions: onSessions,
    onupdatesession: onUpdateSession,
    // 消息
    onroamingmsgs: onRoamingMsgs,
    onofflinemsgs: onOfflineMsgs,
    onmsg: onMsg,
    // 系统通知
    onofflinesysmsgs: onOfflineSysMsgs,
    onsysmsg: onSysMsg,
    onupdatesysmsg: onUpdateSysMsg,
    onsysmsgunread: onSysMsgUnread,
    onupdatesysmsgunread: onUpdateSysMsgUnread,
    onofflinecustomsysmsgs: onOfflineCustomSysMsgs,
    oncustomsysmsg: onCustomSysMsg,
    // 同步完成
    onsyncdone: onSyncDone
    
});
//alert(NIM.support.db)onConnect
	$("#im_xx").click(function(){
		$("#my_im").hide();
	});
	$("#my_im_min").click(function(){
		$("#my_im_list").show();
		$("#my_im_ne").hide();
		$(this).hide();
	});
	$("#im_li_xx").click(function(){
		$("#my_im_list").hide();
		$("#my_im_min").show();
	});
				$("#im_upbtn").click(function(){
					var mytosay=$("#im_box").attr("name")
					if(imaccount==mytosay){
						gadget_popupt("不能和自己发消息");
						return false;
					};
					
					if(mytosay==""){
						return false;
					};
					var msg = nim.sendText({
				    scene: 'p2p',
				    to: mytosay,
 				   text: $("#im_say").html(),
    				done: sendMsgDone
				});
				//console.log('正在发送p2p text消息, id=' + msg.idClient);
				pushMsg(msg);
				var tcx=$("#im_say").html();
				$("#im_say").html("");
				var html='<div class="im_time"><p>'+formatDate(msg.time)+'</p></div><div class="im_pope"><p>';
				html+=tcx;
				html+='</p></div>';
				$("#im_lang").append(html);
				$("#im_lang").scrollTop(9999);
				});
				
				
				function sendMsgDone(error, msg) {
   				 //console.log(error);
   				// console.log(msg);
    			//console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);
   				 pushMsg(msg);
   				 var isRemoteRead = nim.isMsgRemoteRead(msg)
				//console.log(isRemoteRead)
				//console.log("-------------------------------------------")
				}
$("#fileInput").change(function(){
	if(imaccount==tosay){
		return false;
	};
	if(tosay=="zybadmin"){
		return false;
	};
	$("#my_png").hide();
	$("#my_gif").show();
	nim.previewFile({
    type: 'image',
    fileInput: "fileInput",
    uploadprogress: function(obj) {
       // console.log('文件总大小: ' + obj.total + 'bytes');
       // console.log('已经上传的大小: ' + obj.loaded + 'bytes');
       // console.log('上传进度: ' + obj.percentage);
       // console.log('上传进度文本: ' + obj.percentageText);
    },
    done: function(error, file) {
       // console.log('上传image' + (!error?'成功':'失败'));
        // show file to the user
        $("#my_png").show();
		$("#my_gif").hide();
        if (!error) {
            var msg = nim.sendFile({
                scene: 'p2p',
                to: tosay,
                file: file,
                done: sendMsgDone
            });
          //  console.log('正在发送p2p image消息, id=' + msg.idClient);
            var hmo='<div class="im_time"><p>'+formatDate(msg.time)+'</p></div><div class="im_pope"><img src="';
            hmo+=msg.file.url;
            hmo+='" /></div>';
            $("#im_lang").append(hmo);
            $("#im_lang").scrollTop(9999);
            
            pushMsg(msg);
        }
    }
});
});
			/*function omg_im(){
				nim.getHistoryMsgs({
    			scene: 'p2p',
   			    to: 'z18783032665',
    			done: getHistoryMsgsDone
			});
function getHistoryMsgsDone(error, obj) {
    console.log('获取p2p历史消息' + (!error?'成功':'失败'));
    console.log(error);
    console.log(obj);
    if (!error) {
        console.log(obj.msgs+"=======");
    }
}
			}*/




function onConnect() {
   // console.log('连接成功');
    if(tosay!=""){
    	 omg_im(tosay);
    };
   
}
function onWillReconnect(obj) {
    // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
  //  console.log('即将重连');
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
   // console.log(error);
}

function onLoginPortsChange(loginPorts) {
  //  console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
}




function onBlacklist(blacklist) {
   // console.log('收到黑名单', blacklist);
    data.blacklist = nim.mergeRelations(data.blacklist, blacklist);
    data.blacklist = nim.cutRelations(data.blacklist, blacklist.invalid);
    refreshBlacklistUI();
}
function onMarkInBlacklist(obj) {
  //  console.log(obj);
  //  console.log(obj.account + '被你在其它端' + (obj.isAdd ? '加入' : '移除') + '黑名单');
    if (obj.isAdd) {
        addToBlacklist(obj);
    } else {
        removeFromBlacklist(obj);
    }
}
function addToBlacklist(obj) {
    data.blacklist = nim.mergeRelations(data.blacklist, obj.record);
    refreshBlacklistUI();
}
function removeFromBlacklist(obj) {
    data.blacklist = nim.cutRelations(data.blacklist, obj.record);
    refreshBlacklistUI();
}
function refreshBlacklistUI() {
    // 刷新界面
}
function onMutelist(mutelist) {
   // console.log('收到静音列表', mutelist);
    data.mutelist = nim.mergeRelations(data.mutelist, mutelist);
    data.mutelist = nim.cutRelations(data.mutelist, mutelist.invalid);
    refreshMutelistUI();
}
function onMarkInMutelist(obj) {
   // console.log(obj);
   // console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表');
    if (obj.isAdd) {
        addToMutelist(obj);
    } else {
        removeFromMutelist(obj);
    }
}
function addToMutelist(obj) {
    data.mutelist = nim.mergeRelations(data.mutelist, obj.record);
    refreshMutelistUI();
}
function removeFromMutelist(obj) {
    data.mutelist = nim.cutRelations(data.mutelist, obj.record);
    refreshMutelistUI();
}
function refreshMutelistUI() {
    // 刷新界面
}

function onFriends(friends) {
  //  console.log('收到好友列表', friends);
    data.friends = nim.mergeFriends(data.friends, friends);
    data.friends = nim.cutFriends(data.friends, friends.invalid);
    refreshFriendsUI();
}
function onSyncFriendAction(obj) {
   // console.log(obj);
    switch (obj.type) {
    case 'addFriend':
      //  console.log('你在其它端直接加了一个好友' + obj.account + ', 附言' + obj.ps);
        onAddFriend(obj.friend);
        break;
    case 'applyFriend':
      //  console.log('你在其它端申请加了一个好友' + obj.account + ', 附言' + obj.ps);
        break;
    case 'passFriendApply':
     //   console.log('你在其它端通过了一个好友申请' + obj.account + ', 附言' + obj.ps);
        onAddFriend(obj.friend);
        break;
    case 'rejectFriendApply':
     //   console.log('你在其它端拒绝了一个好友申请' + obj.account + ', 附言' + obj.ps);
        break;
    case 'deleteFriend':
     //   console.log('你在其它端删了一个好友' + obj.account);
        onDeleteFriend(obj.account);
        break;
    case 'updateFriend':
     //   console.log('你在其它端更新了一个好友', obj.friend);
        onUpdateFriend(obj.friend);
        break;
    }
}
function onAddFriend(friend) {
    data.friends = nim.mergeFriends(data.friends, friend);
    refreshFriendsUI();
}
function onDeleteFriend(account) {
    data.friends = nim.cutFriendsByAccounts(data.friends, account);
    refreshFriendsUI();
}
function onUpdateFriend(friend) {
    data.friends = nim.mergeFriends(data.friends, friend);
    refreshFriendsUI();
}
function refreshFriendsUI() {
    // 刷新界面
}

function onMyInfo(user) {
   // console.log('收到我的名片', user);
    data.myInfo = user;
    updateMyInfoUI();
}
function onUpdateMyInfo(user) {
  //  console.log('我的名片更新了', user);
    data.myInfo = NIM.util.merge(data.myInfo, user);
    updateMyInfoUI();
}
function updateMyInfoUI() {
    // 刷新界面
}
function onUsers(users) {
  //  console.log('收到用户名片列表', users);
    data.users = nim.mergeUsers(data.users, users);
}
function onUpdateUser(user) {
 //   console.log('用户名片更新了', user);
    data.users = nim.mergeUsers(data.users, user);
}

function onTeams(teams) {
 //   console.log('群列表', teams);
    data.teams = nim.mergeTeams(data.teams, teams);
    onInvalidTeams(teams.invalid);
}
function onInvalidTeams(teams) {
    data.teams = nim.cutTeams(data.teams, teams);
    data.invalidTeams = nim.mergeTeams(data.invalidTeams, teams);
    refreshTeamsUI();
}
function onCreateTeam(team) {
 //   console.log('你创建了一个群', team);
    data.teams = nim.mergeTeams(data.teams, team);
    refreshTeamsUI();
    onTeamMembers({
        teamId: team.teamId,
        members: owner
    });
}
function refreshTeamsUI() {
    // 刷新界面
}
function onTeamMembers(teamId, members) {
 //   console.log('群id', teamId, '群成员', members);
    var teamId = obj.teamId;
    var members = obj.members;
    data.teamMembers = data.teamMembers || {};
    data.teamMembers[teamId] = nim.mergeTeamMembers(data.teamMembers[teamId], members);
    data.teamMembers[teamId] = nim.cutTeamMembers(data.teamMembers[teamId], members.invalid);
    refreshTeamMembersUI();
}
function onSyncTeamMembersDone() {
  //  console.log('同步群列表完成');
}
function onUpdateTeamMember(teamMember) {
  //  console.log('群成员信息更新了', teamMember);
    onTeamMembers({
        teamId: teamMember.teamId,
        members: teamMember
    });
}
function refreshTeamMembersUI() {
    // 刷新界面
}

function onSessions(sessions) {
  //  console.log('收到会话列表', sessions);
    data.sessions = nim.mergeSessions(data.sessions, sessions);
    var sessi=sessions;
    var session="";
    updateSessionsUI(sessi,session);
}
function onUpdateSession(session) {
 //   console.log('会话更新了', session);
    data.sessions = nim.mergeSessions(data.sessions, session);
   // console.log(imaccount+"+++++"+session.lastMsg.from)
    /*if(imaccount!=session.lastMsg.from){
    	nim.sendMsgReceipt({
    		msg: session.lastMsg,
    		done: sendMsgReceiptDone
		});
		function sendMsgReceiptDone(error, obj) {
    		console.log('发送消息已读回执' + (!error?'成功':'失败'), error, obj);
		}
    };*/
	
    var sessi="";
    updateSessionsUI(sessi,session)
}
function updateSessionsUI(sessi,session) {
    // 刷新界面
    if(session==""){
   // console.log(sessi.length+"===============================");
   $("#my_im_list .my_im_l").remove();
   var hml='';
   var accs=[];
    for(var v=0;v<sessi.length;v++){
    	accs.push(sessi[v].to);
    };
	    nim.getUsers({
    		accounts: accs,
    		done: getUsersDone
		});
		function getUsersDone(error, users) {
    	//	console.log(error);
    	//	console.log(users);
    	//	console.log(users.length)
    		for(var i=0;i<users.length;i++){
    		//	console.log(users[i].account+"===="+users[i].nick);
    			hml+='<div class="my_im_l" name="';
    			hml+=users[i].account;
    			hml+='"><p><span class="my_im_new">新消息</span></p><p class="my_im_yi">';
    			hml+=users[i].nick;
    			hml+='</p></div>';
    		};
    		$("#my_im_list").append(hml);
    	//	 console.log(tdmin+"tdmin")
    for(var t=0;t<tdmin.length;t++){
    	$(".my_im_l[name='"+tdmin[t]+"']").children("p").children(".my_im_new").show();
    };
    		$(".my_im_l").click(function(){
    	$(this).children("p").children(".my_im_new").hide();
		$("#my_im").show();
		tosay=$(this).attr("name");
			if(tosay=="zybadmin"){
				$("#im_up,#im_say").hide();
			}else{
				$("#im_up,#im_say").show();
			};
		omg_im(tosay);
		$("#im_name h3").html($(this).children(".my_im_yi").html());
		$("#im_box").attr("name",tosay);
	});
    	//	console.log('获取用户名片数组' + (!error?'成功':'失败'));
    		if (!error) {
        		onUsers(users);
    		}
		};
	
	
	};
	
}



function omg_im(tosay){
				nim.getHistoryMsgs({
    			scene: 'p2p',
   			    to: tosay,
    			done: getHistoryMsgsDone
			});
function getHistoryMsgsDone(error, obj) {
   // console.log('获取p2p历史消息' + (!error?'成功':'失败'));
   // console.log(error);
   // console.log(obj);
    if (!error) {
      //  console.log(obj.msgs+"=======");
        $("#im_lang .im_time").remove();
        $("#im_lang .im_store").remove();
        $("#im_lang .im_pope").remove();
        var html='';
      //  console.log(tosay+"--------------------------+++++++++++++++")
        for(var m=obj.msgs.length-1;m>=0;m--){
        	html+='<div class="im_time"><p>';
        	html+=formatDate(obj.msgs[m].time);
        	html+='</p></div>';
        	if(tosay==obj.msgs[m].from){
        		if(obj.msgs[m].type=="text"){
        			html+='<div class="im_store"><p>';
        			html+=obj.msgs[m].text;
        			html+='</p></div>';
        		};
        		if(obj.msgs[m].type=="file"){
        			html+='<div class="im_store"><img src="';
        			html+=obj.msgs[m].file.url;
        			html+='"/></p></div>';
        		};
        	}else{
        		if(obj.msgs[m].type=="text"){
        			html+='<div class="im_pope"><p>';
        			html+=obj.msgs[m].text;
        			html+='</p></div>';
        		};
        		
        		if(obj.msgs[m].type=="file"){
        			html+='<div class="im_pope"><img src="';
        			html+=obj.msgs[m].file.url;
        			html+='"/></p></div>';
        		};
        	};
        	
        };
        $("#im_lang").append(html);
        $("#im_lang").scrollTop(9999);

    }
}
			}
function onRoamingMsgs(obj) {
  //  console.log('漫游消息', obj);
    pushMsg(obj.msgs);
}
	function onOfflineMsgs(obj) {
		
  //  console.log('离线消息', obj);
    for(var i=0;i<obj.msgs.length;i++){
    	tdmin.push(obj.msgs[i].from)
    };
    pushMsg(obj.msgs);
}


function onMsg(msg) {
	//console.log(msg)
	$("#my_im_ne").show();
	$("#my_im_ne p").html("新消息");
	if($(".my_im_l[name='"+msg.from+"']").length==0){
		hml='<div class="my_im_l" name="'+msg.from+'"><p>';
		hml+='<span class="my_im_new">新消息</span>';
		hml+='</p><p class="my_im_yi">';
		hml+=msg.fromNick;
		hml+='</p></div>';
		$("#my_im_list").append(hml);
		$(".my_im_l").unbind("click");
		$(".my_im_l").click(function(){
			//im_up im_say
    		$(this).children("p").children(".my_im_new").hide();
			$("#my_im").show();
			tosay=$(this).attr("name");
			if(tosay=="zybadmin"){
				$("#im_up,#im_say").hide();
			}else{
				$("#im_up,#im_say").show();
			};
			omg_im(tosay);
			$("#im_name h3").html($(this).children(".my_im_yi").html());
			$("#im_box").attr("name",tosay);
		});
		
	};
	//alert("收到消息");
	if($("#my_im").is(":hidden")){
		$(".my_im_l[name='"+msg.from+"']").children("p").children(".my_im_new").show();
	}else{
		if($("#im_box").attr("name")==msg.from){
			if(msg.type=="text"){
				var hm='<div class="im_time"><p>'+formatDate(msg.userUpdateTime)+'</p></div><div class="im_store"><p>';
    			hm+=msg.text;
    			hm+='</p></div>';
			};
			if(msg.type=="file"){
				var hm='<div class="im_time"><p>'+formatDate(msg.userUpdateTime)+'</p></div><div class="im_store"><img src="';
    			hm+=msg.file.url;
    			hm+='"/></div>';
			};
    		$("#im_lang").append(hm);
    		$("#im_lang").scrollTop(9999);
		}else{
			$(".my_im_l[name='"+msg.from+"']").children("p").children(".my_im_new").show();
		};
	};
  //  console.log('收到消息', msg.scene, msg.type, msg);
    
    pushMsg(msg);
}
function pushMsg(msgs) {
    if (!Array.isArray(msgs)) { msgs = [msgs]; }
    var sessionId = msgs[0].sessionId;
    data.msgs = data.msgs || {};
    data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
}

function onOfflineSysMsgs(sysMsgs) {
  //  console.log('收到离线系统通知', sysMsgs);
    pushSysMsgs(sysMsgs);
}
function onSysMsg(sysMsg) {
  //  console.log('收到系统通知', sysMsg)
    pushSysMsgs(sysMsg);
}
function onUpdateSysMsg(sysMsg) {
    pushSysMsgs(sysMsg);
}
function pushSysMsgs(sysMsgs) {
    data.sysMsgs = nim.mergeSysMsgs(data.sysMsgs, sysMsgs);
    refreshSysMsgsUI();
}
function onSysMsgUnread(obj) {
   // console.log('收到系统通知未读数', obj);
    data.sysMsgUnread = obj;
    refreshSysMsgsUI();
}
function onUpdateSysMsgUnread(obj) {
   // console.log('系统通知未读数更新了', obj);
    data.sysMsgUnread = obj;
    refreshSysMsgsUI();
}
function refreshSysMsgsUI() {
    // 刷新界面
}
function onOfflineCustomSysMsgs(sysMsgs) {
    //console.log('收到离线自定义系统通知', sysMsgs);
}
function onCustomSysMsg(sysMsg) {
    //console.log('收到自定义系统通知', sysMsg);
    $("#menew_pan").show();
}

function onSyncDone() {
 //   console.log('同步完成');
   
    
}
	
	
	
	
	
	
	
function formatDate(unix) {
	var now = new Date(parseInt(unix) * 1);
    now =  now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
   if(now.indexOf("下午") > 0) {
    var temp1 = now.substring(0,now.indexOf("下午"));   //2014/7/6
    var temp2 = now.substring(now.indexOf("下午")+2,now.length);  // 5:17:43
    var temp3 = temp2.substring(0,1);    //  5
    var temp4 = parseInt(temp3); // 5
    temp4 = 12 + temp4;  // 17
    var temp5 = temp4 + temp2.substring(1,temp2.length); // 17:17:43
    now = temp1 + temp5; // 2014/7/6 17:17:43
    now = now.replace("/","-"); //  2014-7/6 17:17:43
    now = now.replace("/","-"); //  2014-7-6 17:17:43
   }else {
    var temp1 = now.substring(0,now.indexOf("上午"));   //2014/7/6
    var temp2 = now.substring(now.indexOf("上午")+2,now.length);  // 5:17:43
    var temp3 = temp2.substring(0,1);    //  5
    var index = 1;
    var temp4 = parseInt(temp3); // 5
    if(temp4 == 0 ) {   //  00
    temp4 = "0"+temp4;
    }else if(temp4 == 1) {  // 10  11  12
   index = 2; 
    var tempIndex = temp2.substring(1,2);
    if(tempIndex != ":") {
    temp4 = temp4 + "" + tempIndex; 
    }else { // 01
    temp4 = "0"+temp4;
    }
    }else {  // 02 03 ... 09
    temp4 = "0"+temp4;
    }
    var temp5 = temp4 + temp2.substring(index,temp2.length); // 07:17:43
    now = temp1 + temp5; // 2014/7/6 07:17:43
    now = now.replace("/","-"); //  2014-7/6 07:17:43
    now = now.replace("/","-"); //  2014-7-6 07:17:43
   }
   return now;      
       
        };
$("#im_emoticon").click(function(){
	$("#im_lispic").show();
});
	picli()
function picli(){
	
	var hkm='<tr>';
	for(var i=1;i<16;i++){
		for(var y=1;y<7;y++){
			var ty=y*i;
			if(ty<=50){
				hkm+='<td><img src="'+ut+'/imgeas/img/qq/'+ty+'.png"/></td>';
			}else{
				hkm+='<td><img src="'+ut+'/imgeas/img/qq/'+ty+'.gif"/></td>';
			};
		};
		hkm+='</tr>';
	};
	$("#im_lispic tbody").append(hkm);
	$("#im_lispic tbody tr img").click(function(){
		$("#im_say").append('<img src="'+$(this).attr("src")+'"/>');
		$("#im_lispic").hide();
	});
}
	
	
})
