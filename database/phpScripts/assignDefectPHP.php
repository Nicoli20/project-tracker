<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$uid = $_POST['uid'];
	$did = $_POST['did'];

	$stmt = $connection->prepare("INSERT INTO AssignedDefect (uid, did) VALUES (?, ?)");
	$stmt->bind_param('ii', $uid, $did);
	$stmt->execute();
?>