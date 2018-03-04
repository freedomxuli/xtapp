function pushClientId() {
	var info = plus.push.getClientInfo();
	//alert(JSON.stringify(info));
	console.log(JSON.stringify(info));
	var osName = plus.os.name == 'iOS' ? 'ios' : 'android';
	var param = {
		queryData: {
			'method': config.apimethod.messagePushRegister,
			'clientid': info.clientid,
			'token': info.token,
			'type': osName,
			'plugin':info.id
		},
		method: 'GET'
	};

	//alert(JSON.stringify(param));
	console.log(JSON.stringify(param));
	$.dataRequest(param, function(rs) {
		//alert(JSON.stringify(rs));
		if(rs.data.flag) {
			localStorage.clientIdPushedFlag = 1;
		}
		console.log(JSON.stringify(rs));
	});
}

mui.plusReady( function(){
    //这里判断一次是否以前推送成功过client，如果没成功过推送一次
	if(!localStorage.clientIdPushedFlag) { pushClientId(); }

	plus.push.addEventListener( "click", function ( msg ) {
		//这里预留位置放以后用的代
		
	}, false ); 

	// 监听在线消息事件
	plus.push.addEventListener( "receive", function( msg ) {
		if ( msg.aps ) {  // Apple APNS message
			//这里是apple的APNS消息处理

		} else {

		}
	}, false );

    //清空消息通知用这一行就好了
	plus.push.clear();
});

