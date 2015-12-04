<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$tid = $_POST['tid'];
		
	$stmt = $connection->prepare("UPDATE Task SET completed = 1 WHERE tid = ?");
	$stmt->bind_param('i', $tid);
	$stmt->execute();
	
	$stmt = $connection->prepare("DELETE FROM UserRole WHERE tid = ?");
	$stmt->bind_param('i', $tid);
	$stmt->execute();
?>