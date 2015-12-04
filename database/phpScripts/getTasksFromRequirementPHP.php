<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$reqId = $_POST['reqId'];
	
	$stmt = $connection->prepare("SELECT task.name, task.tid FROM Task task, Requirement req WHERE req.rid = ? AND task.rid = req.rid AND task.completed = 0");
	$stmt->bind_param('i', $reqId);
	$stmt->execute();
	$result = $stmt->get_result();
	
	$returnVals = array();
	$count = 0;
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
		$count++;
	}
	
	if(empty($returnVals)){
		$returnVals['tasksExist'] = FALSE;
	}
	else{
		$returnVals['tasksExist'] = TRUE;
	}
	
	$returnVals['numTasks'] = $count;
	
	echo json_encode($returnVals);
	
?>