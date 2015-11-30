<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
    
    if($connection->connect_errno){
        echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
    }
	
	$numMembers = $_POST['numMembers'];
	$numManagers = $_POST['numManagers'];
    $returnVals = array();
	
	if($numMembers > 0){
		$members = $_POST['members'];
		$stmt = $connection->prepare("SELECT * FROM User userData WHERE userData.email = ? AND userData.userLevel = 2");
		$stmt->bind_param('s', $email);
		for($i = 1; $i <= $numMembers; $i++){
			$email = $members[$i];
			$stmt->execute();
			$result = $stmt->get_result();
			$emailExists = ($result->num_rows == 1);
			
			if($emailExists){
				$returnVals['member' . "$i"] = TRUE;
			}
			else{
				$returnVals['member' . "$i"] = FALSE;
			}
		}
	}
	
	if($numManagers > 0){
		$managers = $_POST['managers'];
		$stmt = $connection->prepare("SELECT * FROM User userData WHERE userData.email = ? AND userData.userLevel = 1");
		$stmt->bind_param('s', $email);
		for($i = 1; $i <= $numManagers; $i++){
			$email = $managers[$i];
			$stmt->execute();
			$result = $stmt->get_result();
			$emailExists = ($result->num_rows == 1);
			
			if($emailExists){
				$returnVals['manager' . "$i"] = TRUE;
			}
			else{
				$returnVals['manager' . "$i"] = FALSE;
			}
		}
	}
    
    echo json_encode($returnVals);
?>