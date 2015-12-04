<?php
	$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
	$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
	$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
	$mysql_database = 'trackit';
	$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	if($connection->connect_errno){
		echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
	}	
	
	$did = $_POST['did'];
	
	$stmt = $connection->prepare("UPDATE Defect SET completed = 1 WHERE did = ?");
	$stmt->bind_param('i', $did);
	$stmt->execute();
		
?>