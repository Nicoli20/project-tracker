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
    
    $username = $_POST["username"];
    $password = $_POST["password"];
	$email = $_POST["email"];
	$firstname = $_POST["firstname"];
	$lastname = $_POST["lastname"];
	$userType = $_POST['userType'];
	
	if($userType == 'Employee'){
		$userLevel = 2;
	}
	else if($userType == 'Manager'){
		$userLevel = 1;
	}
    
    $stmt = $connection->prepare("SELECT * FROM User userData WHERE userData.email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $uniqueEmail = ($result->num_rows == 0);
	
    if($uniqueEmail){
        $stmt = $connection->prepare("INSERT INTO User (username, password, email, firstname, lastname, userLevel) VALUES (?, ?, ?, ?, ?, ?)");
		$stmt->bind_param('sssssi', $username, $password, $email, $firstname, $lastname, $userLevel);
		$stmt->execute();
    }
    
    echo json_encode($uniqueEmail);
?>