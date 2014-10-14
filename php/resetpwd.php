<?php
$title = "修改密码";
require_once("header.php");
check_login();
?>
<body>
    <div class="main">
      <div class="container container-custom">
        <div class="register-info">
          <h3><span class="icon"></span>修改密码</h3>
          <div class="user-info">
            <form id="fm1" name="userform" action="redirection.php" method="post">
			  <input id="resetpwd" name="resetpwd" type="hidden" value="resetpwd"/>
              <ul>
                <li><span>原密码</span>
                  <input id="password" name="password" tabindex="2" class="password main-password" type="password" value=""/>
                </li>
                <li><span>新密码</span>
                  <input type="password" tabindex="3" class="password password-agin" name="newpwd" id="newpwd"/>
                </li>
                <li><span>再输入一次</span>
                  <input type="password" tabindex="4" class="password password-agin" name="newpwd2" id="newpwd2"/>
                </li>
                <li class="next-btn">
                	<span></span>
                	<input class="next-step" value="确定" type="submit" />
                	<input class="next-step" value="返回" type="button" onclick="javascript:window.location.href='myinfo.php'"/>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
<?php
require_once("footer.php");
?>



