<?php
$title = "修改资料";
require_once("header.php");
$comp = $_POST['compy'];
$addr = $_POST['addr'];
$tel = $_POST['tel'];
?>
<body>
    <div class="main">
      <div class="container container-custom">
        <div class="register-info">
          <h3><span class="icon"></span>修改资料</h3>
          <div class="user-info">
            <form id="fm1" name="userform" action="redirection.php" method="post">
			  <input id="updateinfo" name="updateinfo" type="hidden" value="updateinfo"/>
              <ul>
              	<li><span>城市名</span>
                  <input id="CityName" name="CityName" class="anyway" type="text" 
                  		placeholder="未填写" value="<?php echo $comp ?>"/>
                </li>
                <li><span>公司名</span>
                  <input id="CompName" name="CompName" class="anyway" type="text" 
                  		placeholder="未填写" value="<?php echo $comp ?>"/>
                </li>
                <li><span>公司地址</span>
                  <input id="CompAddr" name="CompAddr" class="anyway" type="text" 
                  		placeholder="未填写" value="<?php echo $addr ?>"/>
                </li>
                <li><span>联系电话</span>
                  <input id="Tel" name="Tel" class="anyway" type="text" 
                  		placeholder="未填写" value="<?php echo $tel ?>"/>
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



