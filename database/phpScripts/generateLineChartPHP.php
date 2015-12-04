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
	
	$stmt = $connection->prepare("SELECT FROM_DAYS(TO_DAYS(date) -MOD(TO_DAYS(date) -1, 7)) AS week_name, YEAR(date) as year, WEEK(date) as week, COUNT(*) as numCommits FROM Commit WHERE tid = ? GROUP BY week_name ORDER BY YEAR(DATE) ASC, WEEK(date) ASC");
	$stmt->bind_param('i', $tid);
	$stmt->execute();
	
	$result = $stmt->get_result();
	
	$returnVals = array();
	
	while($row = $result->fetch_array(MYSQLI_ASSOC)){
		$returnVals[] = $row;
	}
	
	echo json_encode($returnVals);
?>