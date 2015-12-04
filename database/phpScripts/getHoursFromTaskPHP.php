<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$tid = $_POST['taskId'];
	
	$stmt = $connection->prepare("SELECT task.estHours, SUM(at.hoursCommitted) FROM Task task, AssignedTask at WHERE at.tid = task.tid AND task.tid = ? GROUP BY estHours");
	$stmt->bind_param('i', $tid);
	$stmt->execute();
	$stmt->bind_result($estHours, $hoursCommitted);
	$stmt->store_result();
	$stmt->fetch();
	
	$returnVals = array();
	
	$returnVals['estHours'] = $estHours;
	$returnVals['hoursCommitted'] = $hoursCommitted;
	
	echo json_encode($returnVals);
?>