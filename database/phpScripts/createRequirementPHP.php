<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
	$reqName = $_POST['reqName'];
	$reqDate = $_POST['reqDate'];
	$reqDescription = $_POST['reqDescription'];
	
	$pid = $_SESSION['currentProject'];
	
	try {
        $reqDate = new DateTime($reqDate);
        $reqDate = $reqDate->format('Y-m-d');
    } catch (Exception $e) {
        echo $e->getMessage();
    }
	
	$stmt = $connection->prepare("SELECT COUNT(*) FROM Requirement WHERE pid = ? AND name = ?");
	$stmt->bind_param('is', $pid, $reqName);
	$stmt->execute();
	$stmt->bind_result($count);
	$stmt->store_result();
	$stmt->fetch();
	
	if($count == 0){
		$stmt = $connection->prepare("INSERT INTO Requirement (pid, name, description, dueDate) VALUES (?, ?, ?, ?)");
		$stmt->bind_param('isss', $pid, $reqName, $reqDescription, $reqDate);
		$stmt->execute();
		
		$uniqueName = TRUE;
	}
	else{
		$uniqueName = FALSE;
	}
	
	echo json_encode($uniqueName);
	
?>