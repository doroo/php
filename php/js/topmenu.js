var topMenu = {
	init:function(){
		this.checkLogin();
		//购买彩票
		this.downMenu();
		this.pmgressbar();
	},
	downMenu:function()
	{
		Y.get('.topbar .tips_li').hover(function() {
			var tt = Y.get(this);
			tt.find('.tips_hd').addClass('hover');
			tt.find('.tips_bd').show();
		}, function() {
			var tt = Y.get(this);
			tt.find('.tips_hd').removeClass('hover');
			tt.find('.tips_bd').hide();			
		});
		
		//
		//手机端用户没有hover动作，必须使用click动作：支持ios，android，wphone设备
		if (/iphone|ipod|ipad|android|windows\sphone/.test(navigator.userAgent.toLowerCase())){
		
			var hd = Y.get('.topbar .phone_li');
			hd.un();
			
			hd.find('a.tips_hd').attr('href','javascript:void(0);');
			
			hd.click(function(e) {
				hd.find('.tips_hd').addClass('hover');
				hd.find('.tips_bd').show();	
				e.stop();
			});
			
			Y.get(document).click(function(){
				hd.find('.tips_hd').removeClass('hover');
				hd.find('.tips_bd').hide();		
			});
		}
		
	},
	checkLogin:function(){
		var that = this;
			if(window.data && window.data.username=="NOT_LOGIN"){
				return;
			}
			//更新顶部导航的用户信息
			var tophtml = '<li>欢迎您</li>\
	        <li class="tips_li account_li" id="my_account">\
	        <span class="tips_hd" id="my_account1"><a style="font-size:12px;" target="_blank" href="'+_Base.Base_Ntrade+'/useraccount/" onclick="stat4js(\'20130520\',\'top_wdzh\')" class="user_name">'+window.data.username+'</a>&nbsp;<a href="http://vip.500.com/" target="_blank" class="" id="js_viplevelicon"></a><b class="arrow"></b></span>\
	          <div class="tips_bd" id="my_account2">\
	            <ul>\
		            <li id="money">余额：<span class="money" id="js_usermoney">0.00元</span></li>\
	                <li class="hb" id="hbmoney"><a href="javascript: void(0)" class="hide_balance" id="hidemoney">隐藏</a>红包：<span class="money" id="js_hbmoney">0.00元</span></li>\
	                <li id="js_viplevel">我的成长&nbsp;<a href="http://vip.500.com/" target="_blank" class="vipdengji_con" title="前往会员中心"><span style="width: 0px;" class="vipdengji_v"></span><span class="vipdengji_text">0/0</span></a></li>\
	                <li id="js_safelevel">我的安全&nbsp;<a href="'+_Base.Base_Passport+'/useraccount/user/safe.php" target="_blank" class="vipdengji_con" title="前往安全首页"><span class="vipdengji_v"></span><span class="vipdengji_text">0/100</span></a></li>\
	            </ul>\
				<a href="javascript: void(0)" class="show_balance" id="showmoney">显示余额</a>\
                <div class="my_account"><a href="javascript: void(0)" class="btn_blue_l btn_blue_l_h18 login_out" id="exit" onclick="stat4js(\'20130521\',\'top_tc\')">退出</a><a target="_blank" onclick="stat4js(\'20130516\',\'top_yhm\');" href="http://vip.500.com/">会员中心&gt;&gt;</a></div>\
	          </div>\
			</li>\
			<li><a target="_blank" href="'+_Base.Base_Ntrade+'/useraccount/default.php?tp=addmoney" class="btn_recharge btn_orange btn_orange_h24" onclick="stat4js(\'08071008\',\'top_cz\')">充值</a>\
			<a id="cddlsong" href="javacript:void(0)" onclick="return false;" style="display:none;position:absolute; top:1px;*top:1px; right:-7px;"><img src="'+_Base.Base_Passport+'/images/topmenu/song.gif" width="16" height="18" alt="充值送" style="border: 0;vertical-align: middle;"></a>\
			</li>\
			<li class="tips_li order_li" id="my_order">\
			  <a href="javascript:void(0)" class="tips_hd" id="my_order1" onclick="stat4js(\'20130522\',\'top_wdfa\')">我的方案<span id="order_count"></span><s class="arrow"></s></a>\
			  <div class="tips_bd order_inner" id="my_order2" style="display:none">\
			  <p class="none_order">正在查询您的方案进度，请稍后...</p>\
			  </div>\
			</li>\
	        <li id="msgcount_js" class="tips_li info_li"></li>';
	        Y.one("#js_login_top").innerHTML = tophtml;
			//绑定退出事件
			that.bindExit();
			var username = window.data.username;
			that.loadTopInfo(username);
			that.loadDownInfo();
	},
	oLevel : {vip:'0',safe:'0'},
	sSafelevel : 'level_l',
	loadDownInfo:function(){
		var t = this;
		//get money
		Y.use(_Base.Base_Passport+'/login/ajaxGetLoginInfo.php?ltype=js&_='+Math.random(),function(_data){
			if(window.passportuserinfo){
				var money =  isNaN(window.passportuserinfo[1])?data.usermoney:parseFloat(window.passportuserinfo[1],10).rmb(true), hbmoney = isNaN(window.passportuserinfo[7])?data.usermoney:parseFloat(window.passportuserinfo[7],10).rmb(true);
				Y.one("#js_usermoney").innerHTML = money+'元';
				Y.one("#js_hbmoney").innerHTML = hbmoney+'元';
				var safelevel = !window.passportuserinfo[11]?0:window.passportuserinfo[11];
				var viplevel  = !window.passportuserinfo[12]?[0,1,0,500]:window.passportuserinfo[12];
				
				var viplevels = Y.get("#js_viplevel span");
				var viplevelper = parseInt(parseInt(viplevel[2])/parseInt(viplevel[3])*100);
				var myviplevel = !isNaN(viplevel[1])?parseInt(viplevel[1]):1;
				var isvipactive = !isNaN(parseInt(viplevel[0]))?parseInt(viplevel[0]):0;
				isvipactive     = isvipactive>0?'':'vip_gray';
				if(isvipactive == 'vip_gray')
                	{
                	Y.get("#js_viplevelicon").attr("title", "激活会员");
                	}
				else {Y.get("#js_viplevelicon").attr("title", "前往会员中心");}
				
				if(viplevelper>=100){
					viplevels.nodes[0].className="vipdengji_v_all";
					viplevelper = 100;
				}
				viplevels.nodes[0].style.width = viplevelper+'%';
				Y.get(viplevels.nodes[1]).html(viplevel[2]+'/'+viplevel[3]);
				Y.get("#js_viplevelicon").addClass(isvipactive+' vip_'+myviplevel);
				
				var safelevels = Y.get("#js_safelevel span");
				t.sSafelevel = safelevel<=60?'level_l':(safelevel<=80?'level_m':'level_h');
				var maxlevel    = 100;
				if(safelevel>=100){
					safelevels.nodes[0].className="vipdengji_v_all";
				}
				var safeLevel = parseInt(safelevel/maxlevel*100);
				safelevels.nodes[0].style.width = safeLevel+'%';
				safelevels.nodes[1].innerHTML = safelevel+ '/'+maxlevel;
				Y.get("#js_safelevel a").addClass(t.sSafelevel);
				t.oLevel = {vip:viplevelper,safe:safelevel};
			}
		});
		//get fangan info
		Y.use(_Base.Base_Space+'/port/request.php?c_limit=1&c_id=0001');
		if(document.getElementById("my_order1")){
			Y.use(_Base.Base_Ntrade+'/main/project_fast.php?callback=handleUserFangan');
		}
	},
	pmgressbar:function(){//会员等级、安全指数进度条动画
		 var  flats = 0;
		var clum = Y.get(".vipdengji_con");
		var  clum_1 = Y.get(clum.nodes[0]).child().nodes[0];
		var  clum_2 =  Y.get(clum.nodes[1]).child().nodes[0];
		hover_con = Y.get(".account_li .tips_hd");
		var t = this;
		hover_con.hover(function(){
	    	if(flats == 0){			
	    		t.Animation(clum_1).animate({width:"0"},20,function(){
	    			t.Animation(clum_1).animate({width:t.oLevel.vip},800);
	    		});	    
	    		 for(var i=0; i<6; i++){
					  if(Y.get(clum_2).parent().hasClass(t.sSafelevel)){						  
						  t.Animation(clum_2).animate({width:t.oLevel.safe},800);
					  }
				  }
	    	}
			  flats = 1;
	    },function(){
	    }); 
		
	},
	bindExit:function(){
		Y.one("#exit").onclick = function(e){
			if(e&&e.preventDefault){
				e.preventDefault();
			}else{
				window.event.returnValue=false;
			}
			Y.use(_Base.Base_Passport+'/login/logout.php?ltype=js',function(){
				window.location.reload();
			});
		}
	},
	loadTopInfo:function(username)
	{
		Y.use(_Base.Base_Space+'/interface/getusermsgset.php?&_='+Math.random(),function(){
			if(typeof msgcount!="undefined"){
				if(msgcount.all>0){
					var dd = msgcount, allhtml = dd.all>0 ? '('+dd.all+')' : '',
						warninglhtml = dd.warning>0 ? '('+dd.warning+')' : '',
						huodonghtml = dd.huodong>0 ? '('+dd.huodong+')' : '',
						systemhtml = dd.system>0 ? '('+dd.system+')' : '',isnew = dd.isknow>0 ? '' : '<span class="icon_num">'+msgcount.all+'</span>';					
					var msgurl = _Base.Base_Ntrade+'/pages/trade/?strurl='+_Base.Base_Passport+'/pages/useraccount/usermsg/index.php';
					Y.one("#msgcount_js").innerHTML = '<a target="_blank" href="'+msgurl+'" onclick="stat4js(\'20130523\',\'top_zlx\');" id="msginfo" class="tips_hd">消息'+isnew+'<s class="arrow"></s></a><div class="tips_bd" style="display: none;">\
                    <ul>\
                        <li><a href="'+msgurl+'?type=1" target="_blank">提醒'+warninglhtml+'</a></li>\
                        <li><a href="'+msgurl+'?type=2" target="_blank">活动优惠'+huodonghtml+'</a></li>\
                        <li><a href="'+msgurl+'?type=3" target="_blank">系统通知'+systemhtml+'</a></li>\
                    </ul>\
                    <a href="javascript: void(0)" class="info_know" id="info_know">我知道了</a>\
                </div>';
				}
			}else{
				Y.one("#msgcount_js").innerHTML = '';
			}
		});
	},
Animation : function(id){
    var that = this;
	var elem=typeof id=="object" ? id :this.$(id),
	    f=j=0,callback,_this={},
    tween=function(t,b,c,d){return -c*(t/=d)*(t-2) + b}
    _this.execution=function(key,val,t){
            var s=(new Date()).getTime(),d=t || 500,
                b= 0,
                c=val-b;
                (function(){
                    var t=(new Date()).getTime()-s;
                    var units = '';
                    if(key=='width'){
                    	units = '%';
                    }
                    if(t>d){
                        t=d;
                        elem.style[key]=tween(t,b,c,d)+units;
                        ++f==j&&callback&&callback.apply(elem);
                        return _this;
                    }
                    elem.style[key]=tween(t,b,c,d)+units;
                    setTimeout(arguments.callee,10);
                })();
        }
    _this.animate=function(sty,t,fn){
            callback=fn;
            for(var i in sty){
                    j++;
                    _this.execution(i,sty[i],t);
                }
        }
    return _this;
}
}

//bof方案进度
function handleUserFangan(data)
{
	var vp = _Base.Base_Ntrade+'/main/comm/viewpath.php?',
		bydlt = '，买注<a href="'+_Base.Base_Ntrade+'/dlt/" target="_blank" style="font-size: 14px;">大乐透</a>试试手气吧',
		no_pj = ['暂无未结方案' + bydlt,
			'<span style="font-size:14px">已派奖</span> 和 <span style="font-size:14px">未中奖</span> 的方案会显示在这里哦</p>', '最近一周您没有购彩' + bydlt],
		pj_tab = '<ul class="order_nav clearfix">'+
			'<li class="on">未结方案<b class="arrow_up"></b></li>'+
			'<li><s></s>已结方案<b class="arrow_up"></b></li></ul>',
		pj_noend = '<a href="'+vp+'{$infourl}" style="{$width}" class="order_link {$on}" title="点击查看详情" target="_blank"><ul>'+
			'<li class="order_type"><span>{$addtime}</span><br><span class="order_name">{$lotname}</span></li>'+
			'<li class="order_money"><span class="gray">{$allmoney}元</span><br><span class="gray">{$ggtype}</span></li>'+
			'<li class="order_state"><s class="dot_{$color}"></s><span class="state_txt">{$cur}</span><br><span class="gray">{$next}</span></li>'+
			'</ul></a>',
		pj_scroll = '<div class="scroll" style="{$scroll}"><b class="arrow_up"></b>'+
			'<div class="scroll_bar"><a href="javascript: void(0);" class="scroll_btn"></a>'+
			'</div><b class="arrow_down"></b></div>',
		jd_url = _Base.Base_Ntrade+'/useraccount/default.php?url='+_Base.Base_Ntrade+ '/useraccount/usertouzhu/touzhu.php',
		jd_more = '<a class="more_order" target="_blank" href="'+jd_url+'">查看更多投注记录&gt;&gt;</a>',
		pj_box = '<div class="order_wrap" style="{$hide}"><div class="order_con"><div class="order_list">{$list}</div></div>'+ pj_scroll+'</div>',
		progressUpdated,isProgressabled;
	resetProgress();
	isProgressabled = true;
	updateProgress(data);	

	
	//进度菜单
	var orderTimeId, orderIn,orderScrolling,
		orderBtn = Y.get('#my_order');
	orderBtn.hover(function (data){
		clearTimeout(orderTimeId);
		orderIn = true;
		Y.get('div.order_inner', this).show();
		Y.get(this).addClass('c_btn');
		updateProgress(data);
	}, function (){
		orderIn = false;
		if (!orderScrolling) {
			orderTimeId = setTimeout(hideOrder, 200);
		}			
	});
	
	function resetProgress(){
		Yobj.get('#order_count').parent().html('我的方案<span id="order_count"></span><s class="arrow"></s>').attr('href', jd_url).attr('target', '_blank');
		Yobj.get('#my_order div.order_inner').html('<p class="none_order">正在查询您的方案进度，请稍后...</p>');
		progressUpdated = false;			
	}
	
	function addMyOrderEvent(){
		var order = Yobj.get('#my_order'),
			box = order.find('div.order_inner'),
			ctx = order.find('div.order_wrap'),
			pages = order.find('div.order_list').nodes,
			sl = order.find('a.scroll_btn').nodes,
			draged = {},
			nav = order.find('ul.order_nav li');
		order.find('div.order_con').setStyle('overflow-x:hidden');
		nav.each(function (el, i){
			el.tidx = i;
		}).click(function (){
			var i = this.tidx;
			nav.removeClass('on');
			this.className = 'on';
			ctx.hide().eq(i).show();
			initScroll(i);
		});
		initScroll(0);
		function initScroll(i){
			if (!draged[i]) {
				draged[i] = 1;
				var outer = Yobj.get('#my_order div.order_inner');
				setTimeout(function() {
					var isHide = outer.getStyle('display') == 'none';
					if (isHide) {outer.show();}
					drag(sl[i], pages[i]);
					if (isHide) {outer.hide();}
				}, 30);					
			}					
		}
	}
	
	function updateProgress(data){
		if (progressUpdated || !isProgressabled) {return;}
		progressUpdated = true;
		var ppInfo = data,
			count = 0,i = 0,j = 0,html,tmp,
			color = {'未中奖':'gray','已派奖':'red','等待出票':'faintyellow'},
			outer = Y.get('#my_order div.order_inner');
		if (!ppInfo) {
			return outer.html('<p class="none_order">查询失败， 请刷新页面重试!</p>');
		}
		function map(item){
			item.allmoney = parseFloat(item.allmoney).rmb(true, 0);
			item.ggtype = item.ggtype || '';
			item.color = color[item.cur] || 'green';
			return pj_noend.tpl(item);
		}
		if (!ppInfo || ppInfo.list.length == 0 && ppInfo.list_over.length == 0) {
			return outer.html('<p class="none_order">' + no_pj[2] + '</p>');
		}else{
			html = [pj_tab];
			[ppInfo.list, ppInfo.list_over].each(function (list, i){
				if (list.length) {
					tmp = list.map(map).join('');
				}else{
					tmp = '<p class="none_order">'+no_pj[i] + '</p>';
				}
				html.push(pj_box.tpl({list: tmp,hide: i ? 'display:none' : '', scroll: list.length > 0 ? '' : 'display:none'}));							
			});
			outer.html(html.join('') + jd_more);
			setTimeout(addMyOrderEvent, 40);
			var order_count = Yobj.get('#order_count');
			if(ppInfo.allnum) {
				order_count.addClass('icon_num');
				order_count.html(ppInfo.allnum);
			}
		}
	};
	function hideOrder(){
		orderBtn.find('div.order_inner').hide();
		orderBtn.removeClass('c_btn');		
	}
	function drag(btn, page){
		if (!page) {return;}
		var ph = page.offsetHeight,
			wh = page.parentNode.offsetHeight - 16,
			hbl = wh/ph;
		if (hbl > 1 || Yobj.get('a.order_link', page).size() < 6) {
			return Yobj.get(btn).hide();
		}
		var h = btn.parentNode.offsetHeight,
			bh = Math.max(10, h*hbl);
		btn.style.height =  bh + 'px';
		var w=window,d=document,y,_top,
			mx = h-bh,
			sbl = mx/(ph - wh);
		Yobj.get(page.parentNode).scroll(function (){
			if (!orderScrolling) {
				btn.style.top=Math.min(mx, Math.max(0, this.scrollTop*sbl))+'px';
			}				
		});
		btn.onmousedown=function (e){
			e=e||event;
			y=e.clientY,_top=btn.offsetTop;
			this.ondragstart=function(){return false}
			d.onmousemove=e_move;
			d.onmouseup=undrag;
		};
		function e_move(e){
			orderScrolling = true;
			e=e||event;
			var ct=Math.min(mx, Math.max(0, _top+e.clientY-y));
			btn.style.top=ct+'px';
			page.parentNode.scrollTop = ct/sbl;
			w.getSelection?w.getSelection().removeAllRanges():
				d.selection.empty();        
		}
		function undrag(){
			this.onmousemove=d.onmouseup=null;
			orderScrolling = false;
			if (!orderIn) {
				hideOrder();
			}
		}
	}	
}


//eof方案进度
function echo_json_0001(json){
	var data = json.msg.split(',');
	//Y.one("#js_fangan").innerHTML = data[0];
	//Y.one("#js_hemai").innerHTML = data[1];
	//Y.one("#js_dongtai").innerHTML = data[2];
	Y.one("#cddlsong").style.display = (data[4]&&data[4]=='1')?'inline-block':'none';
}
function echo_json_0026(json){
    return false;
}
Y.ready(function(){
	topMenu.init();
	
	Y.get('#showmoney').on('click', function() {
		Y.get(this).hide();
	});

	Y.get('#hidemoney').on('click', function() {
		Y.get('#showmoney').setStyle('display', 'block');
	});
	
	Y.get('.topbar').live('#info_know', 'click', function() {
		Y.get('#msginfo').html('消息<s class="arrow"></s>');
		Y.get('#msgcount_js').find('.tips_bd').hide();
        Y.use(_Base.Base_Space+'/port/request.php?c_limit=1&c_id=0026');
	});
});

if (!window.$Y) {
	$Y = function(){
		return Yobj.get.apply(Yobj, arguments);
	}
}
Class({
	ready: 'domReady',
	index: function (){
		var me = this, sending,
			phone = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
		$Y('li.phone_li').each(function (li, i){
			var tel = $Y('input.p_text', li), err = $Y('p.p_error', li);
			err.hide();
			$Y(li).mousedown(function (e){
				e.stop();
			});
			tel.on('keyup', onlyNum).on('focus', function (e){
				li.keepshow = true;
				this.style.color="#000";
				onlyNum.call(this, e);
			}).on('blur', function (){
				li.keepshow = false;
				if (this.value == '') {
					this.value = '您的手机号码';
					this.style.color="";
					err.hide();
				}else{
					err.show(!isPhone(tel));
				}
			});
			$Y('a.btn_orange', li).click(send);
			function onlyNum(e){
				if (/\D/.test(this.value)) {this.value = this.value.replace(/\D/g,'');}
				if (isPhone($Y(this))) {err.hide();}
				if (e.keyCode === 13) {send();}
			}
			function send(){
				if (isPhone(tel)) {
					sendSMS(tel.val());
				}else{
					tel.nodes[0].select();
					err.show();
				}
				return false;
			}
		});
		$Y(document).mousedown(hideTips);
		function hideTips(){
			$Y('li.phone_li div.tips_bd').hide().prop('keepshow', false);
			$Y('li.phone_li a.tips_hd').removeClass('hover');			
		}
		window.smssuccess = function (data){
			data = Yobj.dejson(data);
			hideTips();
			if (data) {
				if (data.code == '1') {
					$Y('input.p_text').val('');
					POPMSG.alertsuc("您好，下载地址已发送到号码为" + sending + '的手机上!');
				}else if(data.str == '6'){
					POPMSG.alertwarn("您好，您请求的次数过多，请稍候再试!");
				}else{
					POPMSG.alertwarn("请求失败[错误码" + data.str + "]")
				}
			}else{
				POPMSG.alertwarn("请求发送短信失败!");
			}
			sending = false;
		}
		function isPhone(tel){return phone.test(tel.val());}
		function sendSMS(pn){
			var sms = 'http://www.500.com/wap/ajax.php?';
			sms += 'tel='+pn+'&act=md&jsonpcallback=smssuccess&_=' + (+new Date);
			if (sending) {return;}
			sending = pn;
			Yobj.loadScript(sms);
		}
	}
});

//tenpay_login
function TenpayUserLogin(tourl,frm)
{
  var url=tourl;
  if(url=="" || url==null)
  {
	  url=_Base.Base_Passport+"/coop/getinfo.php?hezuo=tenpay";
  }
  window.open(_Base.Base_Passport+'/coop/login.php?hezuo=tenpay&timeSpan='+Date.parse(new Date())+'&tourl='+encodeURIComponent(url),'','');

}
var $ = function(o){return document.getElementById(o)};
function displayyz(){
		if ($("c").value==""){
			$("veid").innerHTML="<img src='"+reurl+"/comm/regcode.php?rnd="+Math.random()+"' style='cursor:hand' id ='yzm' onClick='displayyz();'/> <img style='cursor: hand; padding: 1px;' src= "+_Base.Base_News+"'/images/info/public/refresh.gif' align='absmiddle' alt='看不清，请刷新！'  onClick='displayyz();' />";
		}
}
function displayyzmsg(){
		if($("c").value.length<4){
			$("ckimg").innerHTML="<img src='"+_Base.Base_Ntrade+"/images/static/public/error.gif'>";
		}
		if($("c").value.length==4){
			$("ckimg").innerHTML="<img src='"+reurl+"/comm/checkcode.php?ckc="+$("c").value+"'>";
		}
	}


//zfb_login

//cooperate - zfb
var zfb = {};

/*
*修改接口至passport.500wan.com下
zfb.host = location.host; //location.host;                                       // 域名 'news.500.com'
zfb.urlRedirect = "/interface/cooperate/zfb/login.php";                     // 中转接口
zfb.urlInterface = "/interface/cooperate/zfb/loginsuccess.php";             // 回调接口
*/

var base_passport_host  =   _Base.Base_Passport;

zfb.host = base_passport_host.replace("http://",""); ;                        // 域名 'passport.500.com'
zfb.urlRedirect = "/coop/login.php?hezuo=alipay";                               // 中转接口
zfb.urlInterface = "/coop/getinfo.php?hezuo=alipay";                       // 回调接口

//支付宝用户登录接口
zfb.userLogin = function(param, from)
{
 //return window.open("http://alipay.500wan.com/");
 //return (!!alert("系统繁忙, 请稍候再试!"));

 window.opener = from;
 var url = "http://" + zfb.host + zfb.urlInterface + "&" + param;
 var para = '&timeSpan=' + Date.parse(new Date()) + '&tourl=' + url;

 var local = location.href;
 if (zfb.ckPosition(local))
 {
     location.href = 'http://' + zfb.host + zfb.urlRedirect + para;
     return false;
 }
 else
 {
     window.open('http://' + zfb.host + zfb.urlRedirect + para, "", "");
     return false;
 }
}

//检测页面位置
zfb.ckPosition = function(s)
{
 // 在当前页面直接登录还是打开新窗口
 var lst = [];
 for(var i=0, j=lst.length;i<j;i++)
 {
     if(s.indexOf(lst[i]) != -1) return true;
 }
 return false;
}

//按钮点击统计函数
function stat4js(c,n,t,w,b){
	//格式如：03000000,备注
	if (typeof dcsMultiTrack == 'function'){
		t = c.substr(0,2)+'000000';
		w = c.substr(0,4)+'0000';
		b = c.substr(0,6)+'00';
		dcsMultiTrack('DCSext.button_t', t, 'DCSext.button_w', w, 'DCSext.button_b', b, 'DCSext.button_c', c, 'DCSext.button_n', n)
	}
};