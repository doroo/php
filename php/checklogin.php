<?php
// 定义头部文件
function check_login(){
	session_start();
	if (!isset($_SESSION['username'])){
		header("Location: login.php");
		exit();
	}
	if (empty($_SESSION['username'])){
		header("Location: login.php");
		exit();
	}	
}
?>