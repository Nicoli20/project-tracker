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
	$defectName = $_POST['defectName'];
	$defectDescription = $_POST['defectDescription'];
	$recreateDescription = $_POST['recreateDescription'];
	$resolutionDescription = $_POST['resolutionDescription'];

	if($resolutionDescription == "" || $resolutionDescription == NULL){
		$resolutionDescription = "No resolution steps available.";
	}
	
	$stmt = $connection->prepare("INSERT INTO Defect (pid, name, description, recreateDescription, resolutionDescription) VALUES (?, ?, ?, ?, ?)");
	$stmt->bind_param('issss', $pid, $defectName, $defectDescription, $recreateDescription, $resolutionDescription);
	$stmt->execute();
?>