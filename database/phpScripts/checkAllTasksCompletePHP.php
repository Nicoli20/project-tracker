<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$rid = $_POST['rid'];

	$returnVals = array();
	
	$stmt = $connection->prepare("SELECT COUNT(*) FROM Task task WHERE task.rid = ?");
	$stmt->bind_param('i', $rid);
	$stmt->execute();
	$stmt->bind_result($numTasks);
	$stmt->store_result();
	$stmt->fetch();
	
	if($numTasks == 0){
		$returnVals['hasTasks'] = FALSE;
	}
	else{
		$returnVals['hasTasks'] = TRUE;
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Task task WHERE task.rid = ? AND task.completed = 1");
		$stmt->bind_param('i', $rid);
		$stmt->execute();
		$stmt->bind_result($numCompletedTasks);
		$stmt->store_result();
		$stmt->fetch();
		
		if($numTasks == $numCompletedTasks){
			$returnVals['ready'] = TRUE;
		}
		else{
			$returnVals['ready'] = FALSE;
		}
	}
	
	echo json_encode($returnVals);
	
?>