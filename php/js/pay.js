var nDeposit = Y.get("#deposit")
	sPayerr = Y.get("#payerr"),
	addamount = Y.get("#add_num a"),
	addotheramount = Y.get("#add_other"),
	init = 1,
	defamount = addamount.eq(init),
	minamount = Y.get("#minamount").val(),
	ck_user = encodeURIComponent(Y.cookie("ck_user")),
	paymoney = Y.cookie("HistoryPayMoney_"+ck_user);

if(paymoney!=undefined && paymoney!=""){
	if(paymoney!=100 && paymoney!=200 && paymoney!=500){
		addotheramount.val(paymoney);
		nDeposit.val(paymoney);
		addotheramount.parent().setStyle({"border-color":"#F60"});
		addotheramount.setStyle({"color":"#333","font-weight":"bold"});
		addotheramount.one().focus();	
	}
	else{
		switch(paymoney){
			case "100":
				selaccount(addamount.eq(0));
				break;
			case "200":
				selaccount(addamount.eq(1));
				break;
			case "500":
				selaccount(addamount.eq(2));
				break;
			default:
				selaccount(addamount.eq(1));								
		}
	}	
}
else{
	selaccount(defamount);
}

function clearclass(o, classname) {
	o.each(function(e, i) {
		Y.get(this).removeClass(classname);
	});
}

function selaccount(obj){
	sPayerr.html("");
	clearclass(addamount, "money_cur");
	addotheramount.val("其他金额");
	addotheramount.parent().setStyle({"border-color":"#C3C4C4"});
	addotheramount.setStyle({"color":"#999","font-weight":"normal"});	
	obj.addClass("money_cur");
	nDeposit.val(obj.attr("amount"));
	Y.cookie("HistoryPayMoney_" + decodeURIComponent(Y.cookie("ck_user")), obj.attr("amount"));	
}

addamount.click(function() {
	selaccount(Y.get(this));
});
addotheramount.on("click",function() {
	clearclass(addamount, "money_cur");
	if (Y.get(this).val() == "其他金额") {
		Y.get(this).val("");
	}
	Y.get(this).parent().setStyle({"border-color":"#F60"});
	Y.get(this).setStyle({"color":"#333","font-weight":"bold"});
}).on("blur",function(){
	if(Y.get(this).val() == "其他金额" || Y.get(this).val() == ""){
		Y.get(this).parent().setStyle({"border-color":"#C3C4C4"});
		Y.get(this).setStyle({"color":"#999","font-weight":"normal"});
	}	
});
addotheramount.blur(function() {
	var other = Y.get(this);
	if (other.val().length == 0) {
		nDeposit.val("0");
		other.val("其他金额");
		selaccount(defamount);
	}else{
		nDeposit.val(other.val());
		Y.cookie("HistoryPayMoney_" + decodeURIComponent(Y.cookie("ck_user")), other.val());
		return;
		if(/^\d*$/.test(other.val())){
			if(parseFloat(other.val())>=minamount){
				nDeposit.val(other.val());
			}else{
				nDeposit.val("0");
				sPayerr.html("存入金额至少为"+minamount+"元");
			}
		}else{
			nDeposit.val("0");
			sPayerr.html("存入金额至少为"+minamount+"元");
		}
	}
});

Class({
    Type: 'System_dlg',
    use: 'mask',
    ready: true,
    index:function (){
        var _alert, _show, _open;
        if ($Y('#yclass_alert').size() == 0 || $Y('#yclass_show').size() == 0) {
            this.createHtml()
        }
        _open = this.lib.MaskLay();
		_open.proxyTitle.offset = 0;        
        _alert = this.lib.MaskLay('#yclass_alert', '#yclass_alert_content', '#yclass_alert_title');
        _alert.addClose('#yclass_alert_close', '#yclass_alert_ok');
        $Y('#yclass_alert  div.tips_title').drag('#yclass_alert');

        _show = this.lib.MaskLay('#yclass_show', '#yclass_alert_content','#yclass_show_title');
        _show.addClose('#yclass_show_close');
        $Y('#yclass_show  div.tips_title').drag('#yclass_show');        
        
        this.extend('_alert', function (a, b, c, noMask, icoCss){// txt, callback, nobtn, nomask
            _alert.noMask = noMask;
            _alert.panel.find('div.state').prop('className', _alert.isok ? 'state suc' : 'state error');
            _alert.pop(a, b, c);
            var el = _alert.panel.nodes[0],
            	def = 'warning_icon';
            el.className = el.className.replace(def, '') + ' ' + (icoCss || def);
            return _alert;
        });
        this.extend('_show', function (a, b, c, noMask, icoCss){// txt, callback, nobtn, nomask
            _show.noMask = noMask;
            _show.panel.find('div.state').prop('className', _show.isok ? 'state suc' : 'state error');
            _show.pop(a, b, c);
            var el = _show.panel.nodes[0],
            	def = 'warning_icon';
            el.className = el.className.replace(def, '') + ' ' + (icoCss || def);
            return _show;
        });
        this.extend('openUrl', function (url, w, h, noMask, scroll, showMove){
            if (noMask) {_open.noMask = true;}
            _open.open(url,{
                width: w,
                height: h,
                scroll: scroll,
                showMove: showMove !== false
            });
            _open.proxyTitle.drag(_open.panel);
            return _open;
        });
        this.extend('closeUrl', function (){
            _open.close()
        });                        
    },
    createHtml: function (){
        var dlgHTML = '<div class="new_tips_box warning_icon" style="display:none" id="yclass_alert">'+
		'			  <div class="tips_title">'+
		'			    <h2 class="tips_title_text" id="yclass_alert_title">温馨提示</h2>'+
		'			    <span id="yclass_alert_close"><a href="javascript:void(0)" class="tips_close">关闭</a></span>'+
		'             </div>'+
		'		      <div class="tips_content">'+
		'			    <div class="content_icon" id="yclass_alert_content"></div>'+
		'			  </div>'+
		'			  <div class="tips_btn"> <a class="btn_orange" href="javascript:void(0)" id="yclass_alert_ok">确定</a> </div>'+
		'			</div>'+
		'<div class="new_tips_box warning_icon" style="display:none;width:500px;" id="yclass_show">'+
		'			  <div class="tips_title">'+
		'			    <h2 class="tips_title_text" id="yclass_show_title">温馨提示</h2>'+
		'			    <span id="yclass_show_close"><a href="javascript:void(0)" class="tips_close">关闭</a></span>'+
		'             </div>'+
		'		      <div class="tips_content" style="font-size:12px;">'+
		'		      <ul class="cz_end_msg">'+
    '		      <li style="height:36px;">'+
        '		      请在新开网银页面完成充值后选择：'+
            '		      </li>'+
    '		      <li style="height:36px;">'+
        '		      <strong class="f14">充值成功</strong>&nbsp;&nbsp;|&nbsp;&nbsp;您可以选择：<a onclick="do_statistics(20130597, \'viewpayrecord\');" href="http://trade.500.com/useraccount/default.php?url=http://trade.500.com//useraccount/userpaylog/particular_1.php" target="_blank">查看充值记录</a>'+
    '		      </li>'+
    '		      <li style="height:36px;">'+
        '		      <strong class="f14">充值失败</strong>&nbsp;&nbsp;|&nbsp;&nbsp;建议您选择：<a onclick="do_statistics(20130598, \'gootherpay\');" href="http://passport.500.com/useraccount/tomoney/add.php" target="_blank">其他充值方式</a>&nbsp;&nbsp;<a onclick="do_statistics(20130599, \'payhelp\');" href="http://help.500.com/h_cwycz/index.shtml" target="_blank">查看充值帮助</a>'+
    '		      </li>'+
    '		      </ul>'+
		'			  </div>'+
		'			</div>';		
        $Y(dlgHTML).insert()
    }
});

