<?php
$title = "注册账号";
require_once("header.php");

//for chkregister
session_start();
$_SESSION['register'] = "true";
?>
<body>
    <div class="main">
      <div class="container container-custom">
        <div class="register-info">
          <h3><span class="icon"></span>注册帐号</h3>
          <div class="user-info">
            <form id="fm1" name="userform" action="redirection.php" method="post">
			  <input id="register" name="register" type="hidden" value="register"/>
              <ul>
                <li><span>用户名</span>
                  <input id="username" name="username" class="user-name" type="text" value=""/>
                </li>
                <li><span>登录密码</span>
                  <input id="password" name="password" class="password main-password" type="password" value=""/>
                </li>
                <li><span>再输入一次</span>
                  <input type="password" class="password password-agin" name="confirmpassword" id="confirmpassword"/>
                </li>
                <li><span>城市</span>
                  	<input id="cityname" name="cityname" class="anyway" type="text" value="" autocomplete="off"/>
                </li>
                <li><span>公司名</span>
                  <input id="CompName" name="CompName" class="anyway" type="text" value=""/>
                </li>
                <li><span>公司地址</span>
                  <input id="CompAddr" name="CompAddr" class="anyway" type="text" value=""/>
                </li>
                <li><span>联系电话</span>
                  <input id="Tel" name="Tel" class="tel-phone" type="text" value=""/>
                </li>
                <li class="next-btn">
                	<span></span>
                	<input class="next-step" value="注  册" type="submit" />&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size: 0.8em;">已经有账号了？<a href="login.php">登 录</a></font>
                </li>
              </ul>
            </form>
          </div>
          <div id="tooltip" class="tooltip-info"><span class="icon-border"></span><span class="icon-bg"></span><span class="strength"><em class="level">低</em><span></span><span></span><span></span></span><span class="state"></span><span class="mess"></span></div>
        </div>
      </div>
    </div>
    <script data-main="js/register-config.js" src="js/libs/require.js"></script>
    
    <script type="text/javascript" src="js/cityselector/js/lazyload-min.js"></script>
    <script type="text/javascript">
        LazyLoad.css(["js/cityselector/css/cityStyle.css"], function () {
            LazyLoad.js(["js/cityselector/js/cityScript.js"], function () {
                var test = new citySelector.cityInit("cityname");
            });
        });
    </script>
  </body>
<?php
require_once("footer.php");
?>



