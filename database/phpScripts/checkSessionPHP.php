<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	
	if(!isset($_SESSION['uid'])){
		$loggedIn = FALSE;
	}
	else{
		$loggedIn = TRUE;
	}
	
	echo json_encode($loggedIn);
?>