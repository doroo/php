<?php
//=========================================
// return ture means can register
//
//=========================================
//session_start();
//if (!isset($_SESSION['register'])){
//	header("Location: login.php");
//	exit();
//}
require_once('connection.php');

$action = htmlspecialchars($_GET['action']);
$username = htmlspecialchars($_GET['username']);

if($action == "validateUsername")
{
	if(checkuser($username))
	{
		echo 'false';
		exit();
	}
}

echo 'true';
exit();

function checkuser($name)
{
	$conn = ConnDB::getInstance();
	$sql = "select username from userinfo where username='$name'";
	try {
		$rs = $conn->query($sql);
	}
	catch(Exception $e)
	{
		return "failed";
	}
	return $rs;
}
?>