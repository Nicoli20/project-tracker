<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
    
    $mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
    $mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
    $mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
    $mysql_database = 'trackit';
    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
    
    if($connection->connect_errno){
        echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
    }
    
    $email = $_POST["email"];
    $password = $_POST["password"];
    
    $stmt = $connection->prepare("SELECT * FROM User userData WHERE userData.email = ? AND userData.password = ?");
    $stmt->bind_param('ss', $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    $loginSuccess = $result->num_rows;
    
    if($loginSuccess == 1){
        $loginSuccess = TRUE;
        $row = $result->fetch_assoc();
        $_SESSION['username'] = $row['username'];
        $_SESSION['uid'] = $row['uid'];
        $_SESSION['email'] = $row['email'];
		$_SESSION['userLevel'] = $row['userLevel'];
		$_SESSION['firstname'] = $row['firstname'];
		$_SESSION['lastname'] = $row['lastname'];
    }
    else{
		$loginSuccess = FALSE;    
    }
    
    echo json_encode($loginSuccess);
?>