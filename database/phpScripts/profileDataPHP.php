<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	
	function getAboutMe(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}
		
		$uid = $_SESSION['uid'];
		
		$stmt = $connection->prepare("SELECT userData.aboutMe FROM User userData WHERE userData.uid = ?");
		$stmt->bind_param('i', $uid);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		
		if($row['aboutMe'] === NULL || $row['aboutMe'] == ""){
			echo "Tell us about yourself.";
		}
		else{
			echo "{$row['aboutMe']}";
		}
	}
	
	function getFirstLastName(){
		$firstname = $_SESSION['firstname']; 
		$lastname = $_SESSION['lastname']; 
		echo "{$firstname} {$lastname}";
	}
	
	function getUsername(){
		$username = $_SESSION['username'];
		echo $username;
	}
	
	function getJobTitle(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}
		
		$uid = $_SESSION['uid'];
		
		$stmt = $connection->prepare("SELECT userData.jobTitle FROM User userData WHERE userData.uid = ?");
		$stmt->bind_param('i', $uid);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		
		if($row['jobTitle'] === NULL || $row['jobTitle'] == ""){
			echo "Enter your job title.";
		}
		else{
			echo "{$row['jobTitle']}";
		}
	}
	
	function getRoles(){
		$uid = $_SESSION['uid'];
		
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}
		
		$uid = $_SESSION['uid'];
		
		$stmt = $connection->prepare("SELECT role.name, role.description FROM User user, Role role, UserRole userRole WHERE user.uid = ? AND userRole.uid = user.uid AND role.roleId = userRole.roleId");
		$stmt->bind_param('i', $uid);
		$stmt->execute();
		$stmt->bind_result($roleName, $roleDescription);
        $stmt->store_result();
		$roleNum = 0;
		
		while($stmt->fetch()){
			echo '<div class="panel"><div><button class="panel-heading btn btn-primary btn-block collapsed" data-toggle="collapse" href="#role' . "$roleNum" . '"' . '>' . "$roleName" . '</button>';
			echo '<div class="collapse" id="role' . "$roleNum" . '"' . '><div class="panel-body">' . "$roleDescription" . '</div></div></div></div>';
			$roleNum++;
		}
	}
?>
    