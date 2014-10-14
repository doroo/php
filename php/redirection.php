<?php
header("Content-Type, text/html, charset=utf-8");
session_start();
// logout function
function logout(){
	unset($_SESSION['username']);
	unset($_SESSION['password']);
	header("Location: login.php");
	exit();
}
if(isset($_REQUEST["action"]) && $_REQUEST['action'] == "logout"){
    logout();
}
// import mysql connection
require('connection.php');
// login function
function login(){
	$username = htmlspecialchars($_POST['username']);
	$password = MD5($_POST['password']);	
	
	$db = ConnDB::getInstance();
	$result = $db->query("select username from logininfo where username='$username' and password='$password' limit 1");
	if($result){
		$_SESSION['username'] = $username;
		$_SESSION['password'] = $password;
		header("Location: myinfo.php");
		exit();
	} else {
		echo '<script language="javascript">';
		echo 'alert("用户名或密码错误，请重新输入");';
		echo '</script>';
		header("Location: login.php");
		exit();
	}
}
if(isset($_POST["login"]) && $_POST['login'] == "login"){
	login();
}
// register function
function register(){
	$username = htmlspecialchars($_POST['username']);
	$password = MD5($_POST['password']);
	$company = htmlspecialchars($_POST['CompName']);
	$address = htmlspecialchars($_POST['CompAddr']);
	$cityname = htmlspecialchars($_POST['cityname']);
	$telphone = htmlspecialchars($_POST['Tel']);
	
	$db = ConnDB::getInstance();
	$result = $db->query("select username from logininfo where username='$username'");
	if($result){
		echo '<script language="javascript">';
		echo 'alert("错误，请重新提交");';
		echo '</script>';
		exit();
	}
	$db->insert("insert into logininfo values('$username', '$password', now())");
	$db->insert("insert into userinfo(`UserName`, `Company`, `CityName`, `Address`, `Telphone`, `CreateTime`) values('$username', '$company', '$cityname', '$address', '$telphone', now())");
	$_SESSION['username'] = $username;
	$_SESSION['password'] = $password;
	header("Location: myinfo.php");
	exit();
}
if(isset($_POST["register"]) && $_POST['register'] == "register"){
	register();
}
// reset password
function resetPwd(){
	$username = $_SESSION['username'];
	$password = MD5($_POST['password']);
	if ($password != $_SESSION['password']){
		echo '<script language="javascript">';
		echo 'alert("密码输入错误，请重新输入");';
		echo '</script>';
		header("Location: resetpwd.php");
		exit();
	}
	$newPwd = MD5($_POST['newpwd']);
	
	$db = ConnDB::getInstance();
	$db->update("update logininfo set Password='$newPwd' where UserName='$username'");
	$_SESSION['password'] = $newPwd;
	header("Location: myinfo.php");
	exit();
}
if(isset($_POST["resetpwd"]) && $_POST['resetpwd'] == "resetpwd"){
	resetPwd();
}
// update user infomation
function updateInfo(){
	$username = $_SESSION['username'];
	$comp = $_POST["CompName"];
	$addr = $_POST["CompAddr"];
	$$cityname = $_POST["CityName"];
	$tel = $_POST["Tel"];

	$db = ConnDB::getInstance();
	$db->update("update userinfo set CityName ='$cityname', Company='$comp', Address='$addr', Telphone='$tel' where UserName='$username'");
	header("Location: myinfo.php");
	exit();
}
if(isset($_POST["updateinfo"]) && $_POST['updateinfo'] == "updateinfo"){
	updateInfo();
}
?>