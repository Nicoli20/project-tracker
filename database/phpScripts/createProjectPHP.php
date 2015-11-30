<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
    $connection2 = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	
    if($connection->connect_errno){
        echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
    }
	
	$projectName = $_POST['projectName'];
	$description = $_POST['description'];
	$date = $_POST['date'];
	$numMembers = $_POST['numMembers'];
	$numManagers = $_POST['numManagers'];
    $returnVals = array();
	
	try {
        $date = new DateTime($date);
        $date = $date->format('Y-m-d');
		$startDate = date('Y-m-d', time());
    } catch (Exception $e) {
        $returnVals['dateError'] = $e->getMessage();
        echo json_encode($returnVals);
    }
	
	//Create project
	$stmt = $connection->prepare("INSERT INTO Project (name, description, estDate, startDate) VALUES (?, ?, ?, ?)");
	$stmt->bind_param('ssss', $projectName, $description, $date, $startDate);
	$stmt->execute();
	
	$pid = $stmt->insert_id;
	
	
	//Add members
	if($numMembers > 0){
		$members = $_POST['members'];
		$stmt = $connection->prepare("SELECT userData.uid FROM User userData WHERE userData.email = ? AND userData.userLevel = 2");
		$stmt->bind_param('s', $email);
		
		$stmt2 = $connection2->prepare("INSERT INTO Member (pid, uid) VALUES (?, ?)");
		$stmt2->bind_param('ii', $pid, $uid);
		
		for($i = 1; $i <= $numMembers; $i++){
			$email = $members[$i];
			$stmt->execute();
			$stmt->bind_result($uid);
            $stmt->store_result();
            $stmt->fetch();
			
			$stmt2->execute();
		}
	}
	
	//Add managers
	if($numManagers > 0){
		$managers = $_POST['managers'];
		$stmt = $connection->prepare("SELECT userData.uid FROM User userData WHERE userData.email = ? AND userData.userLevel = 1");
		$stmt->bind_param('s', $email);
		
		$stmt2 = $connection2->prepare("INSERT INTO Manager (pid, uid) VALUES (?, ?)");
		$stmt2->bind_param('ii', $pid, $uid);
		
		for($i = 1; $i <= $numMembers; $i++){
			$email = $managers[$i];
			$stmt->execute();
			$stmt->bind_result($uid);
            $stmt->store_result();
            $stmt->fetch();
			
			$stmt2->execute();
		}
	}
	
	$uid = $_SESSION['uid'];
	
	$stmt = $connection->prepare("INSERT INTO Manager (pid, uid) VALUES (?, ?)");
	$stmt->bind_param('ii', $pid, $uid);
	$stmt->execute();
	
	$_SESSION['currentProject'] = $pid;
	
?>