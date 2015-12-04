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
	
	$stmt = $connection->prepare("SELECT user.uid, user.firstname, user.lastname, user.userLevel FROM User user, Manager manager, Project project WHERE project.pid = ? AND manager.pid = project.pid AND user.uid = manager.uid AND user.uid UNION SELECT user.uid, user.firstname, user.lastname, user.userLevel FROM User user, Member member, Project project WHERE project.pid = ? AND member.pid = project.pid AND user.uid = member.uid ORDER BY userLevel, lastname, firstname");
	$stmt->bind_param('ii', $pid, $pid);
	$stmt->execute();
	$result = $stmt->get_result();
	
	$returnVals = array();
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
	}
	
	echo json_encode($returnVals);
?>