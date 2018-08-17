var nodata_el = '<div class="nodata-wrapper"><div class="nodata-layout"><div class="nodata-icon"><i class="bbc-icon bbc-icon-nodata"></i></div><div class="nodata-tip">亲，暂无数据～</div></div></div>'
var error_page = '<div class="nodata-wrapper"><div class="nodata-layout"><div class="nodata-icon"><i class="bbc-icon bbc-icon-missing missing-icon"></i></div><div class="nodata-tip content-bottom-padded">哎呀，找不到了!</div><div class="nodata-guide"><button class="mui-btn mui-btn-warning bbc-btn-warning mui-action-back">返回</button></div></div></div>'
document.addEventListener("plusready", onPlusReady, false);

function onPlusReady() {
  document.addEventListener("netchange", onNetChange, false);
}

function onNetChange() {
//var nt = plus.networkinfo.getCurrentType();
//
//switch(nt) {
//  case plus.networkinfo.CONNECTION_ETHERNET:
//  case plus.networkinfo.CONNECTION_WIFI:
//    plus.nativeUI.toast("已连接到wifi网络", {
//      duration: 'long',
//      verticalAlign: 'center'
//    });
//    break;
//  case plus.networkinfo.CONNECTION_CELL2G:
//  case plus.networkinfo.CONNECTION_CELL3G:
//  case plus.networkinfo.CONNECTION_CELL4G:
//    plus.nativeUI.toast("您网络已切换到蜂窝网络，继续浏览会产生流量", {
//      duration: 'long',
//      verticalAlign: 'center'
//    });
//    break;
//  default:
//    plus.nativeUI.toast("您的网络已断开", {
//      duration: 'long',
//      verticalAlign: 'center'
//    });
//    break;
//}
}

// 通用倒计时，包括倒计时所在容器，倒数秒数，显示方式，回调。
var countdown = function(element, options) {
  var self = this;
  options = $.extend({
    start: 60,
    secondOnly: false,
    callback: null
  }, options || {});
  var t = options.start;
  var sec = options.secondOnly;
  var fn = options.callback;
  var d = +new Date();
  var diff = Math.round((d + t * 1000) / 1000);
  this.timer = timeout(element, diff, fn);
  this.stop = function() {
    clearTimeout(self.timer);
  };

  function timeout(element, until, fn) {
    var str = '',
      started = false,
      left = {
        d: 0,
        h: 0,
        m: 0,
        s: 0,
        t: 0
      },
      current = Math.round(+new Date() / 1000),
      data = {
        d: '天',
        h: '时',
        m: '分',
        s: '秒'
      };

    left.s = until - current;

    if(left.s < 0) {
      return;
    } else if(left.s == 0) {
      fn && fn();
    }
    if(!sec) {
      if(Math.floor(left.s / 86400) > 0) {
        left.d = Math.floor(left.s / 86400);
        left.s = left.s % 86400;
        str += left.d + data.d;
        started = true;
      }
      if(Math.floor(left.s / 3600) > 0) {
        left.h = Math.floor(left.s / 3600);
        left.s = left.s % 3600;
        started = true;
      }
    }
    if(started) {
      str += ' ' + left.h + data.h;
      started = true;
    }
    if(!sec) {
      if(Math.floor(left.s / 60) > 0) {
        left.m = Math.floor(left.s / 60);
        left.s = left.s % 60;
        started = true;
      }
    }
    if(started) {
      str += ' ' + left.m + data.m;
      started = true;
    }
    if(Math.floor(left.s) > 0) {
      started = true;
    }
    if(started) {
      str += ' ' + left.s + data.s;
      started = true;
    }

    $(element).html(str);
    return setTimeout(function() {
      timeout(element, until, fn);
    }, 1000);
  }
}

var log = function(m) {
  if(typeof console != 'undefined') {
    console.log(JSON.stringify(m));
  }
};

var fetchVcode = function(vtype,vimg) {
  var param = {
    queryData: {
      'method': config.apimethod.vcode,
      'vcode_type': vtype
    },
    method: 'POST'
  }
  $.dataRequest(param, function(rs) {
    var data = rs.data;
    vimg.attr('src', data.base64Image);
  });
}

var getcartnumabs = function(token){
	console.log("获取token:"+token);
	if(token)
	{
		var param = {
	    queryData: {
	      'method': config.apimethod.cartnum,
	      'accessToken': token
	    },
	    method: 'POST'
	  }
	  $.dataRequest(param, function(rs) {
	    var data = rs.data;
	    document.getElementsByClassName("cart_bottom_num_abs")[0].style.backgroundColor = "red";
	    document.getElementsByClassName("cart_bottom_num_abs")[0].innerText = data.variety;
	  });
	}
};

var getcarttopnumabs = function(token){
	console.log("获取token:"+token);
	if(token)
	{
		var param = {
	    queryData: {
	      'method': config.apimethod.cartnum,
	      'accessToken': token
	    },
	    method: 'POST'
	  }
	  $.dataRequest(param, function(rs) {
	    var data = rs.data;
	    document.getElementsByClassName("cart_top_num")[0].innerText = "（"+data.variety+"）";
	  });
	}
};

var isEmptyObject = function(obj) {
  for(var key in obj) {
    return false;
  }
  return true;
};

var toSearch = function(el, wv, shop) {
  if($('.search-modal').length == 0) {
    var hlist = localStorage.getItem('_history');
    $('body').append('<div id="search_panel" class="search-modal"><div id="history_list" class="mui-scroll-wrapper"><div class="mui-scroll"></div></div></div>');
    mui('#history_list').scroll();
    $('.search-cancel').show().siblings('.search-hide').hide();
    //$('.header-search-form').parents('#head-search').removeClass('home-header');
    //$('.header-search-form').parents('#head-search').addClass('home-header1');
    $('#head-search').removeClass('home-color');
    $('#head-search').addClass('home-color1');
/*		var obj = document.getElementById("head-search");
		obj.style.backgroundColor= "#d92e2e";*/
    if(hlist != null) {
      var list = hlist.split(",");
      list = list.splice(0, list.length - 1);
      var element = ''
      element += '<div class="mui-content-padded theme-border-bottom"><div class="title-txt">历史搜索</div></div><ul class="mui-table-view font-gray-40 history-list">';
      for(var i = list.length - 1; i > -1; i--) {
        element += ('<li class="mui-table-view-cell">' + list[i] + '</li>');
      }
      element += '</ul><div class="content-padded content-center"><button id="clear_history" class="mui-btn">清除历史搜索</button></div>';
      $('#search_panel .mui-scroll').html(element);
    }

    $('.history-list li').on('tap', function() {
      var key = $(this).text();
      var keyword = {
        'keyword': key
      }
      if(!shop) {
        clicked(wv, keyword);
      } else {
        $.extend(shop, keyword);
        clicked(wv, shop);
      }
      //$('#search_panel').remove();
    });

    $('#clear_history').on('tap', function() {
      mui.confirm('确定清除搜索记录？', '', ['取消', '确认'], function(e) {
        if(e.index == 1) {
          localStorage.removeItem('_history');
          $('#search_panel .mui-scroll').empty();
        }
      });
    });

    $('.search-cancel').on('tap', function() {
      $('#search_panel').remove();
      $(this).hide().siblings('.search-hide').show();
      $('#head-search').removeClass('home-color1');
      $('#head-search').addClass('home-color');
      el.blur();
    });
  }

  var form = $(el).parents('form');
  $(form).submit(function() {
    $('.search-cancel').hide().siblings('.search-hide').show();
    if(el.value != '') {
      var hlist = localStorage.getItem('_history');
      if(hlist != null) {
        var list = hlist.split(",");
        list = list.splice(0, list.length - 1);
        var flag = true;
        for(var i = 0; i < list.length; i++) {
          if(list[i] == el.value) {
            flag = false;
          }
        }
        if(flag == true) {
          if(list.length > 12) {
            list = list.splice(1, list.length - 1);
            var storage = '';
            for(var i = 0; i < list.length; i++) {
              storage += (list[i] + ',');
            }
            storage += (el.value + ',');
            localStorage.setItem('_history', storage);
          } else {
            hlist += (el.value + ',');
            localStorage.setItem('_history', hlist);
          }
        }
      } else {
        localStorage.setItem('_history', el.value + ',');
      }
    }
    var keyword = {
      'keyword': el.value
    }
    if(!shop) {
      clicked(wv, keyword);
    } else {
      $.extend(shop, keyword);
      clicked(wv, shop);
    }
    //$('#search_panel').remove();
    el.blur();
    el.value = '';
  });
}

var toSearchByMy = function(el, wv, shop,manufacturers_id,cat_id) {
  if($('.search-modal').length == 0) {
    var hlist = localStorage.getItem('_history');
    $("#context").hide();
    $("#head-search").css("position","absolute").css("top","0").css("right","0").css("left","0");
    $('body').append('<div id="search_panel" class="search-modal"><div id="history_list" class="mui-scroll-wrapper"><div class="mui-scroll"></div></div></div>');
    mui('#history_list').scroll();
    $('.search-cancel').show().siblings('.search-hide').hide();
    $('.img-back').show();
    //$('.header-search-form').parents('#head-search').removeClass('home-header');
    //$('.header-search-form').parents('#head-search').addClass('home-header1');
    $('#head-search').removeClass('home-color');
    $('#head-search').addClass('home-color1');
/*		var obj = document.getElementById("head-search");
		obj.style.backgroundColor= "#d92e2e";*/
    if(hlist != null) {
      var list = hlist.split(",");
      list = list.splice(0, list.length - 1);
      var element = ''
      element += '<div class="mui-content-padded theme-border-bottom"><div class="title-txt">历史搜索</div></div><ul class="mui-table-view font-gray-40 history-list">';
      for(var i = list.length - 1; i > -1; i--) {
        element += ('<li class="mui-table-view-cell">' + list[i] + '</li>');
      }
      element += '</ul><div class="content-padded content-center"><button id="clear_history" class="mui-btn">清除历史搜索</button></div>';
      $('#search_panel .mui-scroll').html(element);
    }

    $('.history-list li').on('tap', function() {
      var key = $(this).text();
      var keyword = {
        'keyword': key
      }
      clicked(wv,{
      	'category':$("#search-span").html(),
	    	'keyword':key,
	    	'manufacturers_id':manufacturers_id,
	    	'cat_id':cat_id
	    });
      /*if(!shop) {
        clicked(wv,{
        	'manufacturers_id':manufacturers_id,
        	'storage_id':storage_id
        });
      } else {
        $.extend(shop, keyword);
        clicked(wv, shop);
      }*/
      //$('#search_panel').remove();
    });

    $('#clear_history').on('tap', function() {
      mui.confirm('确定清除搜索记录？', '', ['取消', '确认'], function(e) {
        if(e.index == 1) {
          localStorage.removeItem('_history');
          $('#search_panel .mui-scroll').empty();
        }
      });
    });

    $('.search-cancel').on('tap', function() {
    	$('.search-input').val('');
      //$('#search_panel').remove();
      //$(this).hide().siblings('.search-hide').show();
      //$('#head-search').removeClass('home-color1');
      //$('#head-search').addClass('home-color');
      el.blur();
    });
    
    $('.img-back').on('tap', function() {
    	$('.img-back').hide();
      $('#search_panel').remove();
      $('#context').show();
      $("#head-search").css("position","").css("top","").css("right","").css("left","");
      $('.search-cancel').hide().siblings('.search-hide').show();
      $('#head-search').removeClass('home-color1');
      $('#head-search').addClass('home-color');
      el.blur();
    });
  }

  var form = $(el).parents('form');
  $(form).submit(function() {
    //$('.search-cancel').hide().siblings('.search-hide').show();
    if(el.value != '') {
      var hlist = localStorage.getItem('_history');
      if(hlist != null) {
        var list = hlist.split(",");
        list = list.splice(0, list.length - 1);
        var flag = true;
        for(var i = 0; i < list.length; i++) {
          if(list[i] == el.value) {
            flag = false;
          }
        }
        if(flag == true) {
          if(list.length > 12) {
            list = list.splice(1, list.length - 1);
            var storage = '';
            for(var i = 0; i < list.length; i++) {
              storage += (list[i] + ',');
            }
            storage += (el.value + ',');
            localStorage.setItem('_history', storage);
          } else {
            hlist += (el.value + ',');
            localStorage.setItem('_history', hlist);
          }
        }
      } else {
        localStorage.setItem('_history', el.value + ',');
      }
    }
    var keyword = {
      'keyword': el.value
    }
    clicked(wv,{
    	'category':$("#search-span").html(),
    	'keyword':el.value,
    	'manufacturers_id':manufacturers_id,
    	'cat_id':cat_id
    });
    /*if(!shop) {
      clicked(wv, keyword,{
        	'manufacturers_id':manufacturers_id,
        	'storage_id':storage_id
        });
    } else {
      $.extend(shop, keyword);
      clicked(wv, shop);
    }*/
    //$('#search_panel').remove();
    el.blur();
    el.value = '';
  });
}

var Currency = {
  spec: {
    "decimals": 2,
    "dec_point": ".",
    "thousands_sep": "",
    "sign": "\uffe5"
  },
  format: function(num, force) {
    var part;
    var sign = this.spec.sign || '';
    if(!(num || num === 0) || isNaN(+num)) return num;
    var num = parseFloat(num);
    if(this.spec.cur_rate) {
      num = num * this.spec.cur_rate;
    }
    num = Math.round(num * Math.pow(10, this.spec.decimals)) / Math.pow(10, this.spec.decimals) + '';
    var p = num.indexOf('.');
    if(p < 0) {
      p = num.length;
      part = '';
    } else {
      part = num.substr(p + 1);
    }
    while(part.length < this.spec.decimals) {
      part += '0';
    }
    var curr = [];
    while(p > 0) {
      if(p > 2) {
        p -= 3;
        curr.unshift(num.substr(p, 3));
      } else {
        curr.unshift(num.substr(0, p));
        break;
      }
    }
    if(!part) {
      this.spec.dec_point = '';
    }
    if(force) {
      sign = force;
    }
    return sign + curr.join(this.spec.thousands_sep) + this.spec.dec_point + part;
  },
  number: function(format) {
    if(!format) return null;
    if(isNaN(+format)) {
      if(format instanceof jQuery || (format.nodeName && format.nodeType === 1)) format = $(format).val() || $(format).text();
      if(format.indexOf(this.spec.sign) == 0) format = format.split(this.spec.sign)[1];
    }
    return +format;
  },
  calc: function(calc, n1, n2, noformat) {
    if(!(n1 || n1 === 0)) return null;
    if(!n2) {
      n1 = this.number(n1);
    } else {
      calc = !calc || calc == 'add' ? 1 : -1;
      var t1 = 1,
        t2 = 1;
      if(n1 instanceof Array && n1.length) {
        t1 = n1[1];
        n1 = n1[0];
      }
      if(n2 instanceof Array && n2.length) {
        t2 = n2[1];
        n2 = n2[0];
      }
      var decimals = Math.pow(10, this.spec.decimals * this.spec.decimals);
      n1 = Math.abs(t1 * decimals * this.number(n1) + calc * t2 * decimals * this.number(n2)) / decimals;
    }
    if(!noformat) n1 = this.format(n1);
    return n1;
  },
  add: function(n1, n2, flag) {
    return this.calc('add', n1, n2, flag);
  },
  diff: function(n1, n2, flag) {
    return this.calc('diff', n1, n2, flag);
  }
};
/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
  /**
   * 用户登录
   **/
  owner.login = function(loginInfo, callback) {
    callback = callback || $.noop;
    loginInfo = loginInfo || {};
    loginInfo.account = loginInfo.account || '';
    loginInfo.password = loginInfo.password || '';
    if(loginInfo.account.length < 4) {
      return callback('账号最短为 4 个字符');
    }
    if(loginInfo.password.length < 6) {
      return callback('密码最短为 6 个字符');
    }
    var users = JSON.parse(localStorage.getItem('$users') || '[]');
    var param = {
      'v': config.apiversion,
      'format': 'json',
      'method': config.apimethod.login,
      'account': loginInfo.account,
      'password': loginInfo.password,
      'deviceid': plus.device.uuid,
      'vcode': loginInfo.vcode
    }

    $.ajax(config.server + config.apiname, {
      data: param,
      dataType: 'json', //服务器返回json格式数据
      type: 'POST', //HTTP请求类型
      timeout: 10000, //超时时间设置为10秒；
      crossDomain: true,
      success: function(response) {
        var data = response.data;
        if(response.errorcode == 0) {
          var users = JSON.parse(localStorage.getItem('$users') || '[]');
          users.push(loginInfo);
          localStorage.setItem('$users', JSON.stringify(users));
          $.ajax(config.server + config.apiname, {
            data: {
              'v': config.apiversion,
              'format': 'json',
              'method': config.apimethod.favoriteall,
              'accessToken': data.accessToken
            },
            dataType: 'json',
            type: 'POST',
            success: function(rs) {
              if(rs.errorcode == 0) {
                var items = rs.data.item;
                var shop = rs.data.shop;
                localStorage.setItem('$user_favorite_item', items.join(','));
                localStorage.setItem('$user_favorite_shop', shop.join(','));
              }
            }
          });
          return owner.createState(loginInfo.account, data.accessToken, callback);
        } else {
        	console.log("报错方法"+config.server + config.apiname);
        	console.log("报错信息"+response.msg);
          return callback(response.msg);
        }
      },
      error: function(xhr, type, errorThrown) {
        //异常处理；
      }
    });
  };

  owner.createState = function(name, token, callback) {
    var state = owner.getState();
    state.account = name;
    state.token = token;
    owner.setState(state);
    return callback();
  };

  /**
   * 新用户注册
   **/
  owner.reg = function(regInfo, callback) {
    callback = callback || $.noop;
    regInfo = regInfo || {};
    regInfo.account = regInfo.account || '';
    regInfo.password = regInfo.password || '';
    if(regInfo.account.length < 5) {
      return callback('用户名最短需要 5 个字符');
    }
    if(regInfo.password.length < 6) {
      return callback('密码最短需要 6 个字符');
    }
    if(!checkEmail(regInfo.email)) {
      return callback('邮箱地址不合法');
    }
    var users = JSON.parse(localStorage.getItem('$users') || '[]');
    users.push(regInfo);
    localStorage.setItem('$users', JSON.stringify(users));
    return callback();
  };

  /**
   * 获取当前状态
   **/
  owner.getState = function() {
    var stateText = localStorage.getItem('$state') || "{}";
    return JSON.parse(stateText);
  };

  /**
   * 设置当前状态
   **/
  owner.setState = function(state) {
    state = state || {};
    localStorage.setItem('$state', JSON.stringify(state));
    //var settings = owner.getSettings();
    //settings.gestures = '';
    //owner.setSettings(settings);
  };

  /**
   * 设置用户收藏的商品id
   **/
  owner.setFavoriteItems = function(item_id) {
    var itemsArray = [];
    var getItems = owner.getFavoriteItems();
    if(getItems != null) {
      itemsArray = getItems;
    }
    if(itemsArray.indexOf(item_id) < 0) {
      itemsArray.push(item_id);
    }
    localStorage.setItem('$user_favorite_item', itemsArray.join(','));
  };

  /**
   * 设置用户收藏的店铺id
   **/
  owner.setFavoriteShop = function(shop_id) {
    var shopArray = [];
    var getShop = owner.getFavoriteShop();
    if(getShop != null) {
      shopArray = getShop;
    }
    if(shopArray.indexOf(shop_id) < 0) {
      shopArray.push(shop_id);
    }
    localStorage.setItem('$user_favorite_shop', shopArray.join(','));
  };

  /**
   * 删除用户收藏的商品id
   **/
  owner.deleteFavoriteItem = function(item_id) {
    var itemsArray = owner.getFavoriteItems();
    itemsArray.splice(itemsArray.indexOf(item_id), 1);
    localStorage.setItem('$user_favorite_item', itemsArray.join(','));
  };

  /**
   * 删除用户收藏的店铺id
   **/
  owner.deleteFavoriteShop = function(shop_id) {
    var shopArray = owner.getFavoriteShop();
    shopArray.splice(shopArray.indexOf(shop_id), 1);
    localStorage.setItem('$user_favorite_shop', shopArray.join(','));
  };

  var checkEmail = function(email) {
    email = email || '';
    return(email.length > 3 && email.indexOf('@') > -1);
  };

  /**
   * 找回密码
   **/
  owner.forgetPassword = function(email, callback) {
    callback = callback || $.noop;
    if(!checkEmail(email)) {
      return callback('邮箱地址不合法');
    }
    return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
  };

  /**
   * 获取应用本地配置
   **/
  owner.setSettings = function(settings) {
    settings = settings || {};
    localStorage.setItem('$settings', JSON.stringify(settings));
  }

  /**
   * 设置应用本地配置
   **/
  owner.getSettings = function() {
      var settingsText = localStorage.getItem('$settings') || "{}";
      return JSON.parse(settingsText);
    }
    /**
     * 获取本地是否安装客户端
     **/
  owner.isInstalled = function(id) {
    if(id === 'qihoo' && mui.os.plus) {
      return true;
    }
    if(mui.os.android) {
      var main = plus.android.runtimeMainActivity();
      var packageManager = main.getPackageManager();
      var PackageManager = plus.android.importClass(packageManager)
      var packageName = {
        "qq": "com.tencent.mobileqq",
        "weixin": "com.tencent.mm",
        "sinaweibo": "com.sina.weibo"
      }
      try {
        return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
      } catch(e) {}
    } else {
      switch(id) {
        case "qq":
          var TencentOAuth = plus.ios.import("TencentOAuth");
          return TencentOAuth.iphoneQQInstalled();
        case "weixin":
          var WXApi = plus.ios.import("WXApi");
          return WXApi.isWXAppInstalled()
        case "sinaweibo":
          var SinaAPI = plus.ios.import("WeiboSDK");
          return SinaAPI.isWeiboAppInstalled()
        default:
          break;
      }
    }
  }

  /**
   * 获取当前用户收藏的商品
   **/
  owner.getFavoriteItems = function() {
    var favoriteItemsText = localStorage.getItem('$user_favorite_item') || "";
    if(favoriteItemsText == "") {
      return null;
    }
    return favoriteItemsText.split(',');
  };

  /**
   * 获取当前用户收藏的店铺
   **/
  owner.getFavoriteShop = function() {
    var favoriteShopText = localStorage.getItem('$user_favorite_shop') || "";
    if(favoriteShopText == "") {
      return null;
    }
    return favoriteShopText.split(',');
  };
}(mui, window.app = {}));

//取消浏览器的所有事件，使得active的样式在手机上正常生效
document.addEventListener('touchstart', function() {
  return false;
}, true);
// 禁止选择
document.oncontextmenu = function() {
  return false;
};

// H5 plus事件处理
var as = 'pop-in'; // 默认窗口动画
function plusReady() {
  // 隐藏滚动条
  plus.webview.currentWebview().setStyle({
    scrollIndicator: 'none'
  });
  compatibleAdjust();
}
if(window.plus) {
  plusReady();
} else {
  document.addEventListener('plusready', plusReady, false);
}
// DOMContentLoaded事件处理
var _domReady = false;
document.addEventListener('DOMContentLoaded', function() {
  _domReady = true;
  compatibleAdjust();
}, false);
// 兼容性样式调整
var _adjust = false;

function compatibleAdjust() {
  if(_adjust || !window.plus || !_domReady) {
    return;
  }
  _adjust = true;
  // iOS平台特效
  //	if('iOS'==plus.os.name){
  //		document.getElementById('content').className='scontent';	// 使用div的滚动条
  //		if(navigator.userAgent.indexOf('StreamApp')>=0){	// 在流应用模式下显示返回按钮
  //			document.getElementById('back').style.visibility='visible';
  //		}
  //	}
  // 预创建二级窗口
  //	preateWebviews();
  // 关闭启动界面
  setTimeout(function() {
    plus.navigator.closeSplashscreen();
    plus.navigator.setStatusBarBackground('#d92e2e');
    /*if(plus.navigator.isImmersedStatusbar()) {
      plus.navigator.setStatusBarStyle('light');
    }*/
  }, 500);
}

var _openw = null;

function clicked(id, param, a, s) {
  var obj = {
    preate: true
  };
  if(_openw) {
    return;
  }
  a || (a = as);
  _openw = preate[id];
  if(_openw) {
    _openw.showded = true;
    _openw.show(a, null, function() {
      _openw = null; //避免快速点击打开多个页面
    });
  } else {
    var wa = plus.nativeUI.showWaiting();
    obj = $.extend(obj, param);
    _openw = plus.webview.create(id, id, {
      scrollIndicator: 'none',
      scalable: false,
      popGesture: 'hide'
    }, obj);
    preate[id] = _openw;
    _openw.setStyle({
      'popGesture': 'none'
    });
    _openw.addEventListener('loaded', function() { //页面加载完成后才显示
      setTimeout(function() { //延后显示可避免低端机上动画时白屏
        wa.close();
        _openw.showded = true;
        s || _openw.show(a, null, function() {
          _openw = null; //避免快速点击打开多个页面
        });
        s && (_openw = null); //避免s模式下变量无法重置
      }, 10);
    }, false);
    _openw.addEventListener('hide', function() {
      _openw && (_openw.showded = true);
      _openw = null;
    }, false);
    _openw.addEventListener('close', function() { //页面关闭后可再次打开
      _openw = null;
      preate[id] && (preate[id] = null); //兼容窗口的关闭
    }, false);
  }
}

// 预创建二级页面
var preate = {};

function preateWebviews() {
  preateWebivew('plus/webview.html');
  var plist = document.getElementById('plist').children;
  // 由于启动是预创建过多Webview窗口会消耗较长的时间，所以这里限制仅创建5个
  for(var i = 0; i < plist.length && i < 2; i++) {
    var id = plist[i].id;
    id && (id.length > 0) && preateWebivew(id);
  }
}

function preateWebivew(id) {
  if(!preate[id]) {
    var w = plus.webview.create(id, id, {
      scrollIndicator: 'none',
      scalable: false,
      popGesture: 'hide'
    }, {
      preate: true
    });
    preate[id] = w;
    w.addEventListener('close', function() { //页面关闭后可再次打开
      _openw = null;
      preate[id] && (preate[id] = null); //兼容窗口的关闭
    }, false);
  }
}
// 清除预创建页面(仅)
function preateClear() {
  for(var p in preate) {
    var w = preate[p];
    if(w && w.showded && !w.isVisible()) {
      w.close();
      preate[p] = null;
    }
  }
}

(function($) {
  $.pageRequest = function(data, container, renderFor, renderEle, renderCallback) {
    //分页初始化
    mui.init({
      pullRefresh: {
        container: container,
        down: {
          callback: pulldownRefresh
        },
        up: {
          contentdown: '',
          contentnomore: '--- 我也是有底线的 ---',
          contentrefresh: '正在加载...',
          callback: pullupRefresh
        }
      }
    });

    //定义下拉刷新方法
    function pulldownRefresh() {
      setTimeout(function(){
        htmlList(data);
      },500);
    }
    var count = 0;

    //定义上拉加载更多方法
    function pullupRefresh() {
      appendList(data);
    }
    if (mui.os.plus) {
      mui.plusReady(function() {
        setTimeout(function(){
          mui(container).pullRefresh().pullupLoading();
        },300);
      });
    } else {
      mui.ready(function() {
        mui(container).pullRefresh().pullupLoading();
      });
    }

    //下拉刷新业务逻辑
    function htmlList(options) {
      options.queryData.page_no = config.cpage;
      $.dataRequest(options, function(response) {
        if(!isEmptyObject(response.data)){
          var result = template(renderFor, response.data);
          $('.' + renderEle).html(result);
        }else{
          $('.' + renderEle).parent().parent().html(nodata_el);
        }
      });
      mui(container).pullRefresh().endPulldownToRefresh()
      mui(container).pullRefresh().enablePullupToRefresh(); //refresh completed
    }

    //上拉加载更多业务逻辑
    function appendList(options) {
      count ++
      options.queryData.page_no = count;
      $.dataRequest(options, function(response) {
        if(!isEmptyObject(response.data) && response.data.pagers.total){
          var total = Math.ceil(response.data.pagers.total / config.pagesize);
          if(count > total){
            mui(container).pullRefresh().endPullupToRefresh(true);
          }else{
            var result = template(renderFor, response.data);
            $('.' + renderEle).append(result);
            mui(container).pullRefresh().endPullupToRefresh();
            if($.isFunction(renderCallback)) {
              renderCallback(response);
            }
          }
        }else{
          mui(container).pullRefresh().endPullupToRefresh(true,' ');
          $('.' + renderEle).parent().parent().html(nodata_el);
        }
      });
    }
  }

  $.tabWithPageRequest = function(data, renderFor, renderEle, renderType, renderCallback) {
    var count = 0;
    var defaultSlider = document.getElementById(renderEle).querySelector('.mui-scroll');
    
    //遍历各tab内容dom，逐一初始化分页
    mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
      mui(pullRefreshEl).pullToRefresh({
        down: {
          callback: function() {
            $(pullRefreshEl).data('count', config.cpage);
            var self = this;
            setTimeout(function() {
							console.log(JSON.stringify(data))
							data.queryData.page_no = config.cpage;
							$.dataRequest(data, function(response) {
								if(!isEmptyObject(response.data)) {
									var result = template(renderFor, response.data);
									$(self.element.firstElementChild).html(result);
								} else
									$(self.element.firstElementChild).html('');
							});
							self.endPullDownToRefresh();
							self.refresh(self.element);
						}, 500);
          }
        },
        up: {
          callback: function() {
            var self = this;
            count++;
            data.queryData.page_no = count;
            $.dataRequest(data, function(response) {
              if(!isEmptyObject(response.data) && response.data.pagers.total){
                var total = Math.ceil(response.data.pagers.total / config.pagesize);
                if(count > total){
                  self.endPullUpToRefresh(true);
                }else{
                  var result = template(renderFor, response.data); 
                  $(self.element.firstElementChild).append(result);
                  self.endPullUpToRefresh();
                }
              }else{
                self.endPullUpToRefresh(true,' ');
                self.refresh(self.element);
                //$(self.element).parent().parent().append(nodata_el);
              }
            });
            $(pullRefreshEl).attr('data-count', count);
          }
        }
      });
    });

    var deceleration = mui.os.ios ? 0.003 : 0.0009;
    mui('.mui-scroll-wrapper').scroll({
      bounce: false,
      indicators: true, //是否显示滚动条
      deceleration: deceleration
    });

    document.getElementById('slider').addEventListener('slide', function(e) {
      var el = document.getElementById('scroll' + (e.detail.slideNumber + 1));
      data.queryData[renderType] = el.querySelector('.mui-table-view').dataset.type;
      count = el.querySelector('.mui-scroll').dataset.count;
      if(document.getElementById('scroll' + (e.detail.slideNumber + 1)).querySelector('.mui-loading')) {
        count = 0
        $(el).find('.mui-table-view').empty();
        mui(el.querySelector('.mui-scroll')).pullToRefresh().pullUpLoading();
      }
    });

    if($.isFunction(renderCallback)) {
      renderCallback();
    }else{
      if (mui.os.plus) {
        mui.plusReady(function() {
          setTimeout(function(){
            if(defaultSlider.querySelector('.mui-loading')) {
              $('#'+renderEle+' .mui-table-view').empty();
              mui(defaultSlider).pullToRefresh().pullUpLoading();
            }
          },300);
        });
      } else {
        mui.ready(function() {
          mui(defaultSlider).pullToRefresh().pullUpLoading();
        });
      }
    }
  }

  $.dataRequest = function(data, renderCallback) {
    var baseData = {
      'v': config.apiversion,
      'format': 'json'
    };
    if(data) {
      $.extend(baseData, data.queryData);
    }
    mui.ajax(config.server + config.apiname, {
      data: baseData,
      dataType: data.dataType || 'json', //服务器返回json格式数据
      type: data.method || 'GET', //HTTP请求类型
      timeout: data.timeout || 10000, //超时时间设置为10秒；
      crossDomain: true,
      success: function(response) {
        var data = response;
        if(data.errorcode) {
          if(data.errorcode == 0) {
            if($.isFunction(renderCallback)) {
              renderCallback(data);
            }
          } else if(data.errorcode == 20001) {
            var faid = plus.webview.currentWebview().id;
            clicked('_www/view/passport/login.html', {
              'faid': faid,
              'entrance': faid
            }, 'slide-in-bottom');
          } else if(data.errorcode == 30001) {
            $('body').append(error_page);
          } else {
          	if(data.msg=='请先进行企业认证'){
          		mui.alert(data.msg,'提示','去认证',function(){
          			clicked('_www/view/member/comp/comp.html');
          		});
          	}else{
          		mui.alert(data.msg);
          	}
          }
        } else {
          if($.isFunction(renderCallback)) {
            renderCallback(data);
          }
        }
      },
      error: function(xhr, type, errorThrown) {
        //异常处理；
      }
    });
  }
  $.getUrlParam = function(link,key){
    var q = link,
        keyValuePairs = new Array();

    if (q.length > 1) {
        var idx = q.indexOf('?');
        q = q.substring(idx + 1, q.length);
    } else {
        q = null;
    }

    if (q) {
        for (var i = 0; i < q.split("&").length; i++) {
            keyValuePairs[i] = q.split("&")[i];
        }
    }

    for (var j = 0; j < keyValuePairs.length; j++) {
        if (keyValuePairs[j].split("=")[0] == key) {
            // 这里需要解码，url传递中文时location.href获取的是编码后的值
            // 但FireFox下的url编码有问题
            return decodeURI(keyValuePairs[j].split("=")[1]);

        }
    }
    return '';
  }
})(Zepto);

$(function() {
  // 用于格式化日期显示
  Date.prototype.format = function(format) {
    var o = {
      "Y+": this.getFullYear(), //year
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  };

  template.openTag = '<%';
  template.closeTag = '%>';

  //格式化价格
  template.helper('$format_price', function(num, force) {
    var spec = {
      "decimals": 2,
      "dec_point": ".",
      "thousands_sep": "",
      "sign": "\uffe5"
    };
    var part;
    var sign = spec.sign || '';
    if(!(num || num === 0) || isNaN(+num)) return num;
    var num = parseFloat(num);
    if(spec.cur_rate) {
      num = num * spec.cur_rate;
    }
    num = Math.round(num * Math.pow(10, spec.decimals)) / Math.pow(10, spec.decimals) + '';
    var p = num.indexOf('.');
    if(p < 0) {
      p = num.length;
      part = '';
    } else {
      part = num.substr(p + 1);
    }
    while(part.length < spec.decimals) {
      part += '0';
    }
    var curr = [];
    while(p > 0) {
      if(p > 2) {
        p -= 3;
        curr.unshift(num.substr(p, 3));
      } else {
        curr.unshift(num.substr(0, p));
        break;
      }
    }
    if(!part) {
      spec.dec_point = '';
    }
    if(force) {
      sign = force;
    }
    return sign + curr.join(spec.thousands_sep) + spec.dec_point + part;
  });

  //价格转换正整数
  template.helper('$int_price', function(num) {
    return Math.round(num);
  });

  //JSON转字符串
  template.helper('$json_string', function(num) {
    return JSON.stringify(num);
  });

  //日期格式转换
  template.helper('$timestamp_To_Date', function(value) {
    if(value == null || value == "" || value == "null") return "";
    var date = new Date(Number(value * 1000));
    return date.format("Y.MM.dd");
  });

  //时间格式转换
  template.helper('$timestamp_To_Time', function(value) {
    if(value == null || value == "" || value == "null") return "";
    var date = new Date(Number(value * 1000));
    return date.format("Y.MM.dd hh:mm:ss");
  });
  
  //价格转为数字
  template.helper('$price_To_Int', function(value) {
    if(value == null || value == "" || value == "null") return "";
    var data = value.substring(1,value.length);
    return parseInt(data);
  });

  $(window).on('tap', '.action-webview', function() {
    var webview = $(this).data('webview');
    var webparam = $(this).data('webparam');
    if(webview && webview != '') {
      if(webview.indexOf("http") == -1) {
        clicked(webview, webparam || {});
      } else {
        clicked('_www/view/h5.html', {
          'link': webview
        });
      }
    }
  }).on('tap', 'a', function(e) {
    var link = $(this).attr('href');
    if(link && link !=''){
      if(link.indexOf("#") == -1) {
        e.detail.gesture.preventDefault();
        clicked('_www/view/h5.html', {
          'link': link
        });
      }
    }
  });
});

//document.addEventListener('plusready',backreload);
//function backreload(){
//var old_back = mui.back;
//mui.back = function() {
//  plus.nativeUI.showWaiting();
//  var pwv = plus.webview.currentWebview().opener();
//  pwv.reload(true);
//  pwv.addEventListener('loaded', function() {
//    plus.nativeUI.closeWaiting();
//    old_back();
//  })
//}
//};
