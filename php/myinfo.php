<?php
$title = "我的主页";
require_once("header.php");
require_once("User.php");
check_login();
$username = $_SESSION['username'];
$user = new UserInfo($username);
?>
<body>
  	<div id="main" class="container">
       <section id="reward" class="simple-box">
         <h2 align="left"><img src='img/info.png'/>公司信息</h2>
         <div class="simple-box-content" style="border-top:1px dashed #999;">
         	<form id='form1' action='updateinfo.php' method="post">
	            <table class="tbInfo">
	            	<tr>
	            		<td class="td1">城市名:</td>
	            		<td class="td2">
	            			<input class="iBorder" readonly="true" value="<?php echo $user->getComp();?>" 
	            					id="city" name="city" />
	            		</td>
	            	</tr>
	            	<tr>
	            		<td class="td1">公司名:</td>
	            		<td class="td2">
	            			<input class="iBorder" readonly="true" value="<?php echo $user->getComp();?>" 
	            					id="compy" name="compy" />
	            		</td>
	            	</tr>
	            	<tr>
	            		<td class="td1">联系地址：</td>
	            		<td class="td2">
	            			<input class="iBorder" readonly="true" value="<?php echo $user->getAddr();?>" 
	            					id="addr" name="addr" /></td>
	            	</tr>
	            	<tr>
	            		<td class="td1">联系电话：</td>
	            		<td class="td2">
	            			<input class="iBorder" readonly="true" value="<?php echo $user->getTel();?>" 
	            					id="tel" name="tel" /></td></td>
	            	</tr>
	            	<tr>
	            		<td class="td2">
	            			<input id="btn1" type="submit" style="display: none"/>
	            		</td>
	            	</tr>
	            </table>
            </form>
         </div>
         <div class='divmodify'><a href="#" id="aModify" name="aModify">修改资料>></a></div>
       </section>
       <section id="reward" class="simple-box">
          <h2 align="left"><img src='img/info.png'/>充值</h2>
          <div class="simple-box-content" style="border-top:1px dashed #999;">
             <table class="tbInfo">
            	<tr>
            		<td>可用余额：</td>
            		<td><?php echo $user->getPrice();?></td>
            		<td style="width:100px;"></td>
            		<td><a href="pay.php">去充值>><img src="img/zhifubao.png" /></a></td>
            		<td></td>
            	</tr>
            </table>
          </div>
       </section>
       <section id="reward" class="simple-box">
         <h2 align="left"><img src='img/info.png'/>账户信息</h2>
         <div class="simple-box-content" style="border-top:1px dashed #999;">
            <table class="tbInfo">
            	<tr>
            		<td class="td1">账号名:</td>
            		<td class="td2"><?php echo $user->getUserName();?></td>
            		<td class="td2"><a href="resetpwd.php">修改密码>></a></td>
            	</tr>
            </table>
         </div>
         <div class='divmodify'><a href="redirection.php?action=logout"><font color=" #B0B0B0">退出</font><img src="img/tuichu.png" /></a></div>
       </section>
  	</div>
  	<script>
  	$(document).ready(function() {
  		$("a[name='aModify']").click(function(){btn1.click();});

  	});
     </script>  
  </body>
<?php
require_once("footer.php");
?>

