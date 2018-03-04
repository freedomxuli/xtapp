
var shares = null;
mui.plusReady(function() {
    // 更新分享服务
    plus.share.getServices(function(s) {
        shares = {};
        for(var i in s) {
            var t = s[i];
            shares[t.id] = t;
        }
    }, function(e) {
        mui.toast("无分享服务！");
        console.log("获取分享服务列表失败：" + e.message);
    });
});

/**
 * 分享操作
 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
 * @param {JSON} msginfo 分享内容
 */

function shareAction(sb, msginfo) {
    if(!sb || !sb.s) {
        mui.toast("无效的分享服务！");
        return;
    }
    if(!msginfo.content){
    	    msginfo.content = msginfo.title;
    }
	var msg = { extra: { scene: sb.x } };
    msg.title = msginfo.title;
    msg.thumbs = [msginfo.pic];
    msg.pictures = [msginfo.pic];
    if(sb.s.id=='sinaweibo'){
        msg.content = msginfo.content + '，链接是： ' + msginfo.href;
    }else{
        msg.content = msginfo.content;
        msg.href = msginfo.href;
    }
    // 发送分享
    if(sb.s.authenticated) {
        console.log("---已授权---");
        shareMessage(msg, sb.s);
    } else {
        console.log("---未授权---");
        sb.s.authorize(function() {
            shareMessage(msg, sb.s);
        }, function(e) {
            console.log("认证授权失败：" + e.code + " - " + e.message);
        });
    }
}

/**
 * 发送分享消息
 * @param {JSON} msg
 * @param {plus.share.ShareService} s
 */
function shareMessage(msg, s) {
    s.send(
        msg,
        function() {
            mui.toast("分享到\"" + s.description + "\"成功！ ");
        },
        function(e) {
            mui.toast("分享到\"" + s.description + "\"失败！ ");
            log("分享到\"" + s.description + "\"失败: " + JSON.stringify(e));
        }
    );
}

/**
 * 分享内容或者链接
 * @param  {JSON} msgdata 分享数据的对象
 */
var appshare = function (msgdata) {
    // 分享参数
    var msginfo = { title: msgdata.title, href: msgdata.href, content: msgdata.desc, pic: msgdata.pic };

    var shareBts = [];
    // 更新分享列表
    var ss = shares['weixin'];
    ss && ss.nativeClient && (shareBts.push({ title: '微信朋友圈', s: ss, x: 'WXSceneTimeline' }), shareBts.push({ title: '微信好友', s: ss, x: 'WXSceneSession' }));

    ss = shares['qq'];
    ss && ss.nativeClient && shareBts.push({ title: 'QQ', s: ss });

    ss = shares['sinaweibo'];
    ss && shareBts.push({ title: '新浪微博', s: ss });
    
    if(shareBts.length > 0){
      mui('#share_sheet').popover('toggle');
      // 弹出分享列表
      $('#share_sheet').unbind('tap').on('tap','.action-share',function(){
        var plat = $(this).data('platform');
        var shareData;
        if(plat=='qq'){
          var ss = shares['qq'];
          if(ss && ss.nativeClient){
            shareData = { title: 'QQ', s: ss };
          };
        }
        if(plat=='weixin'){
          var ss = shares['weixin'];
          if(ss && ss.nativeClient){
            shareData = { title: '微信好友', s: ss, x: 'WXSceneSession' };
          };
        }
        if(plat=='timeline'){
          var ss = shares['weixin'];
          if(ss && ss.nativeClient){
            shareData = { title: '微信朋友圈', s: ss, x: 'WXSceneTimeline' };
          };
        }
        if(plat=='weibo'){
          var ss = shares['sinaweibo'];
          if(ss && ss.nativeClient){
            shareData = { title: '新浪微博', s: ss };
          };
        }
        mui('#share_sheet').popover('toggle');
        mui('#share_sheet').popover('toggle');
        shareAction(shareData, msginfo)
      });
    }else{
      mui.alert('当前环境无法支持分享操作!');
    }
}
