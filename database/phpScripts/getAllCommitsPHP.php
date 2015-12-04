<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$pid = $_SESSION['currentProject'];

	$stmt = $connection->prepare("SELECT user.firstname, user.lastname, task.name AS task, commit.hoursCommitted, commit.description, DATE(commit.date) AS date FROM User user, Task task, Commit commit, Requirement req WHERE req.pid = ? AND task.rid = req.rid AND task.tid = commit.tid AND user.uid = commit.uid ORDER BY date DESC");
	$stmt->bind_param('i', $pid);
	$stmt->execute();
	
	$result = $stmt->get_result();
	
	$returnVals = array();
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
	}
	
	echo json_encode($returnVals);
?>