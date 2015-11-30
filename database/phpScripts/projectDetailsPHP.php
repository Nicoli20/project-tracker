<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	
	if(!isset($_SESSION['currentProject'])){
		$projectExists = FALSE;
	}
	else{
		$projectExists = TRUE;
	}
?>
	<script type="text/javascript">
		if(<?php echo json_encode(!$projectExists); ?>){
			document.location.href = "home.php";
		}
	</script>
	
<?php	
	function getProjectName(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT name FROM Project WHERE pid = ?");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($name);
		$stmt->store_result();
		$stmt->fetch();
		
		echo "$name";
	}
	
	function getProjectProgress(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Requirement WHERE pid = ?");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($numReqs);
		$stmt->store_result();
		$stmt->fetch();
		
		if($numReqs == 0){
			echo '<p style="text-align:center">0%</p>';
		}
		else{
			$stmt = $connection->prepare("SELECT COUNT(*) FROM Requirement WHERE pid = ? AND completed = 1");
			$stmt->bind_param('i', $pid);
			$stmt->execute();
			$stmt->bind_result($numCompletedReqs);
			$stmt->store_result();
			$stmt->fetch();
			
			$percent = floor(($numCompletedReqs / $numReqs) * 100);
			
			if($percent == 0){
				echo '<p style="text-align:center">0%</p>';
			}
			else{
				echo '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="' . "{$percent}" . 'aria-valuemin="0" aria-valuemax="100" style="width:' . "{$percent}" . '%">' .
						"{$percent}" . '%' . '</div>';
			}
		}
	}
	
	function getNumAssignedTasks(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		$uid = $_SESSION['uid'];
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM AssignedTask usertask, Task task, Requirement req WHERE usertask.uid = ? AND usertask.tid = task.tid AND task.rid = req.rid AND req.pid = ?");
		$stmt->bind_param('ii', $uid, $pid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		echo "{$count}";
	}
	
	function getNumAssignedDefects(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		$uid = $_SESSION['uid'];
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM AssignedDefect userdefect, Defect defect WHERE userdefect.uid = ? AND userdefect.did = defect.did AND defect.pid = ?");
		$stmt->bind_param('ii', $uid, $pid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		echo "{$count}";
	}
	
	function getNumNewCommits(){
		echo '8';
	}
	
	function getNumNewDiscussions(){
		echo '2';
	}
	
	function getStartDate(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT startDate FROM Project WHERE pid = ?");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($startDate);
		$stmt->store_result();
		$stmt->fetch();
		
		try {
			$startDate = new DateTime($startDate);
			$startDate = $startDate->format('m-d-Y');
			echo "{$startDate}";
		} catch (Exception $e) {
			$returnVals['dateError'] = $e->getMessage();
			echo json_encode($returnVals);
		}
	}
	
	function getEstCompletionDate(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT estDate FROM Project WHERE pid = ?");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($endDate);
		$stmt->store_result();
		$stmt->fetch();
		
		try {
			$endDate = new DateTime($endDate);
			$endDate = $endDate->format('m-d-Y');
			echo "{$endDate}";
		} catch (Exception $e) {
			$returnVals['dateError'] = $e->getMessage();
			echo json_encode($returnVals);
		}
	}
	
	function getNumRequirements(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Project project, Requirement req WHERE project.pid = req.pid AND project.pid = ?");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		echo "{$count}";
	}
	
	function getNumCompletedRequirements(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Project project, Requirement req WHERE project.pid = req.pid AND project.pid = ? AND req.completed = 1");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		echo "{$count}";
	}
	
	function getProjectDescription(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT description FROM Project WHERE pid = ?");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($description);
		$stmt->store_result();
		$stmt->fetch();
		
		if($description == "" || $description == NULL){
			$description = "No description available.";
		}
		
		echo "{$description}";
	}
	
	function getNumTasks(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Project project, Requirement req, Task task WHERE project.pid = req.pid AND req.rid = task.rid AND project.pid = ? AND task.completed = 0");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		echo "{$count}";
	}
	
	function getNumOpenDefects(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}	
		
		$pid = $_SESSION['currentProject'];
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Project project, Defect defect WHERE project.pid = defect.pid AND project.pid = ? AND defect.completed = 0");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		echo "{$count}";
	}
?>
