<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$uid = $_SESSION['uid'];
	$tid = $_POST['tid'];
	$hours = $_POST['hours'];
	$description = $_POST['description'];
	
	$stmt = $connection->prepare("INSERT INTO Commit (uid, tid, hoursCommitted, description) VALUES (?, ?, ?, ?)");
	$stmt->bind_param('iids', $uid, $tid, $hours, $description);
	$stmt->execute();
	
	$stmt = $connection->prepare("UPDATE AssignedTask SET hoursCommitted = hoursCommitted + ? WHERE uid = ? AND tid = ?");
	$stmt->bind_param('dii', $hours, $uid, $tid);
	$stmt->execute();
?>