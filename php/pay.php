<?php
$title = "支付宝支付";
require_once("checklogin.php");
require_once("User.php");
check_login();
$username = $_SESSION['username'];
$user = new UserInfo($username);
?>

<!DOCTYPE html>
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
	<link href="css/public.css" type="text/css" rel="stylesheet" />
    <link href="css/center.css" type="text/css" rel="stylesheet" />
     <link href="http://www.500cache.com/passport/css/new/center.css?v=20140820" type="text/css" rel="stylesheet">
  </head>
  <body>
  <link href="css/button.css" rel="stylesheet" type="text/css" />
	<link href="css/topmenu.css" rel="stylesheet" type="text/css" />
	<!--<link href="http://passport.500.com/css/topmenu.css?v=20130624" rel="stylesheet" type="text/css" />-->

<script language="javascript" src="js/yclass.js"></script>
<!--<script language="javascript" src="js/topmenu.js"></script>-->

<div class="box_user" style="z-index:10;">
	<p><?php echo $user->getUserName();?>，账户余额：<?php echo $user->getPrice();?>元&nbsp;&nbsp;
		</p>
</div>
<script>
Y.ready(function(){
	Y.get(".rules").hover(function(){
		Y.get(this).find(".rules-con").show();
		Y.get(this).find("a").addClass("hover");
	},function(){
		Y.get(this).find(".rules-con").hide();
		Y.get(this).find("a").removeClass("hover");
	});
});
</script>
  
 <div id="bd">
     <div class="cz_box">
			   <div class="cz_money clearfix">
                    <span class="cz_title gray">充值金额：</span>
                    <p class="cz_money_detail" id="add_num">
                        <a href="javascript:void(0);" class="money_total" amount="200">200元</a>
                        <a href="javascript:void(0);" class="money_total" amount="300">300元</a>
                        <a href="javascript:void(0);" class="money_total" amount="500">500元</a>
                        <em class="money_other_box"><span class="money_other">
                            <input type="text" maxlength="7" value="" id="add_other" onkeyup="this.value=this.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1');" 
                            onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1'));">
                        </span>元 </em>
                    </p>
                    <span class="money_err" id="payerr"></span>
                </div>                
                <div class="cz_way clearfix">
                    <span class="cz_title gray">请选择充值方式：</span>
                                        <ul class="cz_tab">
                        <li>
                            <a class="cur">支付宝/财付通</a>
                        </li>
                    </ul>
                </div>                
				<form method="post" id="payform" name="payform" action="toadd3.php" target="_blank">                
					<div class="cz_way_info cz_way_alipayOrTenpay">
     					<span class="cz_title">选择支付平台：</span>
      					<ul class="web_payway clearfix" id="banks">
    	        			<li bankid="21" onclick="do_statistics(10901013, 'b_zfb')">
            					<span class="bank_ico alipay"></span>账户支付            	
                    		</li>
              			</ul>
    				</div>
				  	<div class="cz_btn_box">
				      <label>&nbsp;</label>
					  <input type="hidden" value="0" id="deposit" name="deposit" />
					  <input type="hidden" value="0" id="bank_type" name="bank_type" />
					  <input type="hidden" value="1" id="minamount" name="minamount" />
				      <input type="button" class="btn_orange" value="去充值" id="gopay">
				    </div>    
				</form>
			</div>
</div>
				
  		<script type="text/javascript" src="js/pay.js?v=20131125"></script>
        <script>
			var oDivbank = Y.get("#banks"), 
				oBtnone = Y.get("#banks li"), 
				oDeposit = Y.get("#deposit"),
				payform = Y.get("#payform"), 
				oBanktype = Y.get("#bank_type"), 
				gopay = Y.get("#gopay"),
				ckuser = decodeURIComponent(Y.cookie("ck_user")),
				minamount = Y.get("#minamount").val(),
				hisplatform = Y.cookie("HistoryPayPlat_" + encodeURIComponent(Y.cookie("ck_user")));
			
			if(hisplatform!=undefined && hisplatform!=""){
				var indexnum;
				switch(hisplatform){
					case "21":
						indexnum = 0;
						break;
					case "48":
						indexnum = 1;
						break;
					case "1":
						indexnum = 2;
						break;												
				}
				if(indexnum!=undefined){
					oBtnone.eq(indexnum).addClass("web_payway_li_cur");
					oBanktype.val(hisplatform);
				}
			}
						
			oBtnone.click(function() {
				var sBankstr = "<span class=\"bank_selected\">" + Y.get(this).html() + "</span>";
				oBanktype.val(Y.get(this).attr("bankid"));
				clearclass(oBtnone,"web_payway_li_cur");
				Y.get(this).addClass('web_payway_li_cur');
			});
			
			gopay.click(function(){
				if(oBanktype.val()<1){
					Y._alert("请先选择支付平台");
					return false;
				}
				if(/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(oDeposit.val())){
	        		if(oDeposit.val()<minamount){
	        			Y.get("#payerr").html("存入金额至少为"+minamount+"元");
	        		}
	        		else{	        		
	        			Y._show();
	        			Y.cookie("HistoryPayType_" + ckuser, "3");
	        			Y.cookie("HistoryPayTypeNum_" + ckuser, "0");
	        			Y.cookie("HistoryPayMoney_" + ckuser, oDeposit.val());
	        			Y.cookie("HistoryPayPlat_" + ckuser,oBanktype.val());	        			
	        			payform.one().submit();
	        		}
	        	}
	        	else{
	        		Y.get("#payerr").html("存入金额至少为"+minamount+"元");
	        	}    
			});
        </script>   
  </body>
</html>