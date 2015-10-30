<?php
    session_start();

    $mysql_host = "mysql1.000webhost.com";
    $mysql_database = "a3010394_group7";
    $mysql_user = "a3010394_root123";
    $mysql_password = "root123";

    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
    
    $username = $_POST["username"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $userLevel = 1;
    $returnVals = array();
    
    //Check if username is already in use.
    $stmt = $connection->prepare("SELECT * FROM USER_DATA userData WHERE userData.username = ?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();
    $uniqueUsername = $stmt->num_rows;
    
    //Check if email is already in use.
    $stmt = $connection->prepare("SELECT * FROM USER_DATA userData WHERE userData.email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();
    $uniqueEmail = $stmt->num_rows;

    $returnVals['uniqueUsername'] = $uniqueUsername;
    $returnVals['uniqueEmail'] = $uniqueEmail;
    
    $valid = ($uniqueUsername == 0 && $uniqueEmail == 0);
    
    //Add account to database.
    if($valid){
        $stmt = $connection->prepare("INSERT INTO USER_DATA (username, password, userLevel, email)" .
                                        "VALUES (?, ?, ?, ?)");
        $stmt->bind_param('ssis', $username, $password, $userLevel, $email);
        $stmt->execute();
    }
    $stmt->close();
    echo json_encode($returnVals);
?>