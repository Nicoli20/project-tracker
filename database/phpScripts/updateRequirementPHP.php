<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$newDescription = $_POST['newDescription'];
	$newDate = $_POST['newDate'];
	$reqId = $_POST['reqId'];
	
	try {
        $newDate = new DateTime($newDate);
        $newDate = $newDate->format('Y-m-d');
    } catch (Exception $e) {
		echo $e->getMessage();
    }
	
	$stmt = $connection->prepare("UPDATE Requirement SET description = ?, dueDate = ? WHERE rid = ?");
	$stmt->bind_param('ssi', $newDescription, $newDate, $reqId);
	$stmt->execute();
?>