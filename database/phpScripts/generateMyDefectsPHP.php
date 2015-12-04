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
	
	$stmt = $connection->prepare("SELECT defect.did, defect.name, defect.description, defect.recreateDescription, defect.resolutionDescription FROM Defect defect, AssignedDefect ad WHERE ad.did = defect.did AND ad.uid = ? AND defect.pid = ? AND defect.completed = 0");
	$stmt->bind_param('ii', $uid, $pid);
	$stmt->execute();
	
	$result = $stmt->get_result();
	
	$returnVals = array();
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
	}
	
	echo json_encode($returnVals);
?>