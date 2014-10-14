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
Run();
function Run()
{
	if(!isset($_GET["action"]) || empty($_GET['action'])
			|| !isset($_GET["username"]) || empty($_GET['username'])){
		echo "NotParam";
		exit();
	}
	$action = htmlspecialchars($_GET['action']);
	$username = htmlspecialchars($_GET['username']);
	
	if($action == "validateUsername")
	{
		try{
			if(checkuser($username))
			{
				echo 'false';
				exit();
			}
		}
		catch(Exception $e)
		{
			echo "failed";
			exit();
		}
		
		echo 'true';
		exit();
	}
	else {
		echo 'true';
		exit();
	}
}

function checkuser($name)
{
	$conn = ConnDB::getInstance();
	$sql = "select username from userinfo where username='$name'";
	$rs = $conn->query($sql);
	return $rs;
}
?>