var config = {
    server: 'http://47.96.163.10:8080/test_hangtong/public/index.php/',
    apiversion: 'v1', //系统api版本
    apiname: 'topapi', //系统配置的api名称
    pagesize: 10, // 分页组件每页显示数量
    cpage: 1, //分页当前页
    apimethod: { //接口method集合
        home: 'theme.modules', //首页
        category: 'category.itemCategory', //分类
        vcode: 'user.vcode', //图片验证码
        usersendSms: 'user.sendSms', //注册发送验证码
        userVerifySms: 'user.verifySms', //验证注册短信
        verifyAccount: 'user.verifyAccount', //校验注册用户名
        signup: 'user.signup', //用户注册
        member: 'member.index', //会员中心
        login: 'user.login', //用户登录
        logout: 'user.logout', //用户登出
        agreement: 'user.license', //注册协议
        useProtocol: 'user.protocol', //使用协议
        trustDcloudLogin:'user.trust.dcloudlogin', //dcloud第三方信任登录信息验证
        trustBindUser:'user.trust.bindUser', //信任登录绑定用户
        userinfo: 'member.basics.get', //用户信息
        updateuserinfo: 'member.basics.update', //更新用户信息
        addresslist: 'member.address.list', //收获地址
        setdefaultadd: 'member.address.setDefault', //设置默认收货地址
        adddel: 'member.address.delete', //删除收获地址
        addupdate: 'member.address.update', //编辑收货地址
        addcreate: 'member.address.create', //新增收货地址
        addrupdate: 'member.address.update', //新增收货地址
        returns: 'member.aftersales.list', //退换货信息
        returnsdetail: 'member.aftersales.get', //退换货详情
        returnsform: 'member.aftersales.apply', //申请退换货
        returnsforminfo: 'member.aftersales.applyInfo.get', //获取申请退换货页面信息
        arealocation: 'region.json', //省市区信息
        goodslist: 'item.search', //商品列表
        goodsdetail: 'item.detail', //商品详情
        goodsdesc: 'item.desc', //商品描述
        goodsrate: 'item.rate.list', //商品评价
        goodappendrate: 'member.rate.append', //商品追评
        pointdetail: 'member.point.detail', //积分明细
        favoriteitemadd: 'member.favorite.item.add', //新增收藏商品
        favoriteitemlist: 'member.favorite.item.list', //商品收藏列表
        favoriteitemremove: 'member.favorite.item.remove', // 删除商品收藏
        favoriteshopadd: 'member.favorite.shop.add', //新增收藏商品
        favoriteshoplist: 'member.favorite.shop.list', //店铺收藏列表
        favoriteshopremove: 'member.favorite.shop.remove', //删除店铺收藏
        ratelist: 'member.rate.list', //会员评价列表
        complaintslist: 'member.complaints.list', //订单投诉列表
        complaintsdetail: 'member.complaints.get', //订单投诉详情
        complaintsclose: 'member.complaints.close', //撤销投诉
        activitydetaillist: 'promotion.activity.detail', //活动详情及其商品列表
        projectPageInfo: 'promotion.page.info', //营销活动详情页
        activityitemdetail: 'promotion.activity.itemdetail', //活动商品详情
        activitylist: 'promotion.activity.list', //活动列表
        usercoupon: 'member.coupon.list', //会员优惠券
        uservoucher: 'member.voucher.list', //会员优惠券
        cartlist: 'cart.get', //购物车列表
        cartadd: 'cart.add', //添加商品到购物车
        cartdel: 'cart.del', //删除购物车中的商品
        cartupdate: 'cart.update', //更新购物车
        shop: 'shop.index', //店铺首页信息
        checkout: 'cart.checkout', //结算页信息
        checkoutpoint: 'cart.user.point', //结算使用积分
        cartGetVoucher:'cart.get.voucher', //结算页获取购物券
        checkouttotal: 'cart.total', //结算总价计算
        tradelist: 'trade.list', //会员订单
        tradeDetail: 'trade.get', //订单详情
        tradecancelreason: 'trade.cancel.reason.get', //获取取消订单原因
        tradecancel: 'trade.cancel.create', //取消订单
        tradecancellist: 'trade.cancel.list', //会员取消订单列表
        tradecanceldetail: 'trade.cancel.get', //会员取消订单详情
        tradeconfirm : 'trade.confirm ', //会员确认收货交易完成
        traderate: 'member.rate.add', //评价订单
        tradechild: 'trade.order.get', //获取子订单
        usecoupon: 'promotion.coupon.use', //使用优惠券
        useVoucher:'promotion.voucher.use', //结算页使用购物券
        cancelcoupon: 'promotion.coupon.cancel', //取消使用优惠券
        getcoupon: 'promotion.coupon.code.get', //获取优惠券
        checkpassword: 'member.security.checkLoginPassword', //验证登录密码
        updateloginpwd: 'member.security.updateLoginPassword', //修改登录密码
        paypwdset: 'member.security.setPayPassword ', //设置支付密码
        checkpaypwd: 'member.security.checkPayPassword',//验证支付密码
        updatepaypwd: 'member.security.updatePayPassword', //修改支付密码
        userconfig: 'member.security.userConf', //获取会员安全中心相关所有配置
        updatemobile: 'member.security.updateMobile', //验证手机号
        savemobile: 'member.security.saveMobile', //绑定手机号
        setpwdbymobile:'member.security.setPayPasswordByMoblie', //忘记预存款密码的短信验证
        logisticsget: 'logistics.get', //显示物流信息
        createtrade: 'trade.create', //创建订单
        shopcoupon: 'promotion.coupon.list.get', //店铺优惠券列表
        shopcouponget: 'promotion.coupon.code.get', //获取店铺优惠券
        shopinfo: 'shop.basic', //店铺基础信息
        payment: 'payment.pay.paycenter', //订单选择支付类型
        createpayment: 'payment.pay.create', //创建支付单
        tradepay: 'payment.pay.do', //订单支付
        promotiondetail: 'promotion.shop.cartpromotion.detail', //促销聚会页
        coupondetail: 'promotion.shop.coupon.detail', //优惠券促销聚会页
        ratetradeget: 'member.ratetrade.get', //获取评价订单
        setaccount: 'member.setAccount', //设置用户名
        complaintscreate: 'member.complaints.create', //投诉商家
        userforgotresetpwd: 'user.forgot.resetpassword', //忘记密码重置密码
        favoriteall: 'member.favorite.all', //获取用户的所有收藏
        express: 'logistics.list.get', //获取快递公司
        logisticsback: 'logistics.send', //回寄物流信息提交
        contentnodelist: 'content.node.list', //获取文章目录
        contentlist: 'content.list', //获取文章列表
        contentinfo: 'content.info', //获取文章内容
        remindinfo: 'promotion.activity.remindinfo', //获取订阅信息
        remindsubmit: 'promotion.activity.remindsubmit', //提交订阅信息
        packages: 'item.packageInfo', //组合营销商品
        imgupload: 'image.upload', //图片上传
        redparkets: 'promotion.hongbao.list', //会员红包
        vilidatepaypassword: 'member.security.validatePayPassword',
        logisticszitilist: 'logistics.ziti.list', //根据收货地区id获取自提点列表
        messagePushRegister:'message.push.register',  //第一次启动的时候注册机器用的接口
        filteritems: 'item.filterItems', //根据搜索条件，列出渐进式的筛选项
        getcommonsetting: 'common.getsetting', //根据配置名获取配置值
        billingsave: 'member.billing.save',//开票信息保存
        billinggetInfo: 'member.billing.getInfo,'//开票信息获取
        enterpriseauth: 'member.enterprise.auth', //企业认证-修改保存
		enterpriseinfo: 'member.enterprise.info', //企业认证-查询
		deposit: 'deposit.apply.shenhe' //预存款充值
    }
}