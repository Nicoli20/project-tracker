<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	
	$pid = $_POST['pid'];
	$_SESSION['currentProject'] = $pid;
	
?>