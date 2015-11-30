<?php
	//Check logged in
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	
	if(!isset($_SESSION['uid'])){
		$loggedIn = FALSE;
	}
	else{
		$loggedIn = TRUE;
	}
?>
	
	<script type="text/javascript">
		if(<?php echo json_encode(!$loggedIn); ?>){
			document.location.href = "index.html";
		}
	</script>
	
<?php
	function populateSideBar(){
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
		}
		
		$userLevel = $_SESSION['userLevel'];
		
		//Home Button
		echo '<li><a href="home.php"><i class="fa fa-home fa-fw"></i> Home</a></li>';
		
		//Create Project Button
		if($userLevel == 1){
			echo '<li><a href="createProject.php"><i class="fa fa-plus fa-fw"></i> Create Project</a></li>';
		}
		
		//My Projects Button
		echo '<li><a href="myProjects.php"><i class="fa fa-list fa-fw"></i> My Projects</a></li>';
		
		//Profile Button
		echo '<li><a href="profile.php"><i class="fa fa-user fa-fw"></i> Profile</a></li>';
		
		//Logout Button
		echo '<li><a href="#" onclick="logout()"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>';

	}
?>