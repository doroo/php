<?php
$title = "帐号登录";
require_once("header.php");
?>
<body>
    <div class="main">
      <div class="container container-custom">
        <div class="row wrap-login">
          <div class="login-banner col-xs-6 col-sm-6 col-md-6 col-lg-6 hidden-xs"><img src=img/login-banner.png class="img-responsive"></div>
          <div class="login-user col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <div class="login-part">
              <h3>帐号登录</h3>
              <div class="user-info">
                <div class="user-pass">
                  <form id="fm1" action="redirection.php" method="post" onSubmit="return InputCheck(this)">
                    <input id="login" name="login" type="hidden" value="login"/>
                    <input id="username" name="username" tabindex="1" placeholder="输入用户名" value="" class="user-namel" type="text" value=""/>
                    <input id="password" name="password" tabindex="2" placeholder="输入密码" class="pass-word" type="password" value="" autocomplete="off"/>
							<div class="error-mess" style="display:none;">
								<span class="error-icon"></span><span id="error-message"></span>
							</div>
                    <div class="row forget-password">
                    	<span class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    		<!-- 
                        	<input type="checkbox" name="rememberMe" id="rememberMe" value="true" class="auto-login" tabindex="3"/>
                        	<label for="rememberMe">下次自动登录</label>
                        	-->
                        </span>
                        <!-- 
                        <span class="col-xs-6 col-sm-6 col-md-6 col-lg-6 forget tracking-ad" data-mod="popu_26">
                        	<a href="resetpwd.php" tabindex="4">修改密码</a>
                        </span>
                        -->
                    </div>
					<input class="logging" accesskey="l" value="登 录" tabindex="5" type="submit" /> 
                    
                  </form>
                </div>
              </div>
              <div class="line"></div>
              <div class="third-part tracking-ad" data-mod="popu_27">
                <div class="register-now"><span>还没有帐号？</span>
	                <span class="register tracking-ad" data-mod="popu_28">
	                	<a href="register.php">马上注册</a>
	                </span>
               	</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
<?php
require_once("footer.php");
?>