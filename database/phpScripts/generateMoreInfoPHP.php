<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$type = $_POST['type'];
	$id = $_POST['id'];
	
	$returnVals = array();
	
	if($type == 'requirement'){
		$stmt = $connection->prepare("SELECT name, description, dueDate, completed FROM Requirement WHERE rid = ?");
		$stmt->bind_param('i', $id);
		$stmt->execute();
		$stmt->bind_result($name, $description, $dueDate, $completed);
		$stmt->store_result();
		$stmt->fetch();
		
		try {
			$dueDate = new DateTime($dueDate);
			$dueDate = $dueDate->format('m/d/Y');
		} catch (Exception $e) {
			echo $e->getMessage();
		}
		
		$returnVals['name'] = $name;
		$returnVals['description'] = $description;
		$returnVals['dueDate'] = $dueDate;
		$returnVals['completed'] = $completed;
	}
	else{
		$stmt = $connection->prepare("SELECT name, description, estHours, completed FROM Task WHERE tid = ?");
		$stmt->bind_param('i', $id);
		$stmt->execute();
		$stmt->bind_result($name, $description, $estHours, $completed);
		$stmt->store_result();
		$stmt->fetch();
		
		$returnVals['name'] = $name;
		$returnVals['description'] = $description;
		$returnVals['estHours'] = $estHours;
		$returnVals['completed'] = $completed;
	}
	
	echo json_encode($returnVals);
?>