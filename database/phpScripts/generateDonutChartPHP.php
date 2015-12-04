<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$tid = $_POST['tid'];
	
	$stmt = $connection->prepare("SELECT user.firstname, user.lastname, at.hoursCommitted FROM User user, AssignedTask at WHERE at.tid = ? AND user.uid = at.uid");
	$stmt->bind_param('i', $tid);
	$stmt->execute();
	
	$result = $stmt->get_result();
	
	$returnVals = array();
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
	}
	
	echo json_encode($returnVals);
?>