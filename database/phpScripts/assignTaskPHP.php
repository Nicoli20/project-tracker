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
	$tid = $_POST['taskId'];
	$roleId = $_POST['roleId'];
	
	$returnVals = array();
	
	$stmt = $connection->prepare("SELECT COUNT(*) FROM AssignedTask WHERE uid = ? AND tid = ?");
	$stmt->bind_param('ii', $uid, $tid);
	$stmt->execute();
	$stmt->bind_result($count);
	$stmt->store_result();
	$stmt->fetch();
	
	if($count == 0){
		$returnVals['notAssigned'] = TRUE;
		
		$stmt = $connection->prepare("INSERT INTO AssignedTask (uid, tid) VALUES (?, ?)");
		$stmt->bind_param('ii', $uid, $tid);
		$stmt->execute();
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM UserRole WHERE uid = ? AND roleId = ?");
		$stmt->bind_param('ii', $uid, $roleId);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		if($count == 0){
			$stmt = $connection->prepare("INSERT INTO UserRole (uid, roleId, tid) VALUES (?, ?, ?)");
			$stmt->bind_param('iii', $uid, $roleId, $tid);
			$stmt->execute();
		}
	}
	else{
		$returnVals['notAssigned'] = FALSE;
	}
	
	echo json_encode($returnVals);
?>