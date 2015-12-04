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
	$pid = $_SESSION['currentProject'];
	
	$stmt = $connection->prepare("SELECT req.name AS reqName, task.tid, task.name AS taskName, task.description, at.hoursCommitted, (SELECT SUM(at2.hoursCommitted) FROM AssignedTask at2 WHERE at2.tid = at.tid) AS totalHours, task.estHours FROM Task task, AssignedTask at, Requirement req WHERE at.uid = ? AND at.tid = task.tid AND task.rid = req.rid AND task.completed = 0 AND req.pid = ? GROUP BY task.tid ORDER BY reqName, taskName");
	$stmt->bind_param('ii', $uid, $pid);
	$stmt->execute();
	
	$result = $stmt->get_result();
	
	$returnVals = array();
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
	}
	
	echo json_encode($returnVals);
?>