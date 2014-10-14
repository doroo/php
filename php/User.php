<?php
require_once('connection.php');
class UserInfo{
	protected $username;
	protected $company ;
	protected $addr ;
	protected $tel;
	protected $price;

	public function __construct($name){
		$conn = ConnDB::getInstance();
		$sql = "select * from userinfo where username='$name'";
		$rs = $conn->query($sql);
		$this->username = $rs['UserName'];
		$this->cityname = $rs['CityName'];
		$this->company = $rs['Company'];
		$this->addr = $rs['Address'];
		$this->tel = $rs['Telphone'];
		$this->price = $rs['Price'];
	}

	public function getUserName(){
		return $this->username;
	}

	public function getCity(){
		return $this->get_info($this->cityname);
	}
	
	public function getComp(){
		return $this->get_info($this->company);
	}

	public function getAddr(){
		return $this->get_info($this->addr);
	}

	public function getTel(){
		return $this->get_info($this->tel);
	}

	public function getPrice(){
		return $this->price;
	}
	
	public function get_info($info){
		if (empty($info)){
			return "δ��д";
		}else{
			return $info;
		}
	}
}
?>