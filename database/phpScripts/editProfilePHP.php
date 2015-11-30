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
	
	$description = $_POST['newDescription'];
	$username = $_POST['newUsername'];
	$jobTitle = $_POST['newJobTitle'];
	
	$uid = $_SESSION['uid'];
	
	$stmt = $connection->prepare("UPDATE User SET aboutMe = ?, username = ?, jobTitle = ? WHERE uid = ?");
	$stmt->bind_param('sssi', $description, $username, $jobTitle, $uid);
	$stmt->execute();
	
	$_SESSION['username'] = $username;
?>