<?php
    session_start();

    $mysql_host = "mysql1.000webhost.com";
    $mysql_database = "a3010394_group7";
    $mysql_user = "a3010394_root123";
    $mysql_password = "root123";

    $connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
    
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    $stmt = $connection->prepare("SELECT * FROM USER_DATA userData WHERE userData.username = ? AND userData.password = ?;");
    $stmt->bind_param('ss', $username, $password);
    $stmt->execute();
    $stmt->store_result();
    
    $numRows = $stmt->num_rows;
    
    echo json_encode($numRows);
?>