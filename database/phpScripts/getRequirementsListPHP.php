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
	
	$stmt = $connection->prepare("SELECT req.rid, req.name FROM Requirement req WHERE req.pid = ? AND req.completed = 0");
	$stmt->bind_param('i', $pid);
	$stmt->execute();
	$result = $stmt->get_result();
	
	$returnVals = array();
	$count = 0;
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
		$count++;
	}
	
	if(empty($returnVals)){
		$returnVals['requirementsExist'] = FALSE;
	}
	else{
		$returnVals['requirementsExist'] = TRUE;
	}
	
	$returnVals['numReqs'] = $count;
	
	echo json_encode($returnVals);
?>