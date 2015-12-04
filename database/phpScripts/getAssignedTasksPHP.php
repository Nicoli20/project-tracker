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
	
	$stmt = $connection->prepare("SELECT task.tid, task.name FROM AssignedTask at, Task task, Project project, Requirement req WHERE at.tid = task.tid AND at.uid = ? AND task.completed = 0 AND task.rid = req.rid AND req.pid = project.pid AND project.pid = ?");
	$stmt->bind_param('ii', $uid, $pid);
	$stmt->execute();
	
	$result = $stmt->get_result();
	
	$returnVals = array();
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
	}
	
	if(empty($returnVals)){
		$returnVals['tasksExist'] = FALSE;
	}
	else{
		$returnVals['tasksExist'] = TRUE;
	}
	
	echo json_encode($returnVals);
?>