<?php
class ConnDB {
	
	private static $_instance = null;
	
	//单例方法,用于访问实例的公共的静态方法
	public static function getInstance(){
		if(!(self::$_instance instanceof self)){
			self::$_instance = new self;
			self::$_instance->connMysql();
		}
		return self::$_instance;
	}
	
	private function connMysql($server=null, $username=null, $password=null){
		if(!$server)$server = "localhost:8888";
		if(!$username)$username = "root";
		if(!$password)$password = "root";
		$conn = @mysql_connect($server, $username, $password);
		mysql_select_db("PayDB", $conn);
		mysql_query("set character set utf-8");
		mysql_query("set names charset utf-8");
	}
	
	public function query($sql){
		$querySql = mysql_query($sql);
		$result = mysql_fetch_array($querySql);
		return $result;
	}
	
	public function insert($sql){
		mysql_query($sql);
	}
	
	public function update($sql){
		mysql_query($sql);
	}
}
?>