<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$assocRid = $_POST['assocRid'];
	$taskName = $_POST['taskName'];
	$estHours = $_POST['estHours'];
	$taskDescription = $_POST['taskDescription'];
	
	$pid = $_SESSION['currentProject'];

	$stmt = $connection->prepare("SELECT COUNT(*) FROM Requirement req, Task task WHERE task.rid = req.rid AND req.rid = ? AND req.pid = ? AND task.name = ?");
	$stmt->bind_param('iis', $assocRid, $pid, $taskName);
	$stmt->execute();
	$stmt->bind_result($count);
	$stmt->store_result();
	$stmt->fetch();
	
	if($count == 0){
		$stmt = $connection->prepare("INSERT INTO Task (rid, name, description, estHours) VALUES (?, ?, ?, ?)");
		$stmt->bind_param('issi', $assocRid, $taskName, $taskDescription, $estHours);
		$stmt->execute();
		
		echo json_encode(TRUE);
	}
	else{
		echo json_encode(FALSE);
	}
?>