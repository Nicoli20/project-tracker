<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	
	function generateProjectList(){
		$mysql_host = $_ENV["OPENSHIFT_MYSQL_DB_HOST"];
		$mysql_user = $_ENV["OPENSHIFT_MYSQL_DB_USERNAME"];
		$mysql_password = $_ENV["OPENSHIFT_MYSQL_DB_PASSWORD"];
		$mysql_database = 'trackit';
		$connection = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		$connection2 = new mysqli($mysql_host, $mysql_user, $mysql_password, $mysql_database);
		
		if($connection->connect_errno){
			echo json_encode("Database connection failed. Please try again later. Error: {$connection->connect_errno}.");
		}
		
		$uid = $_SESSION['uid'];
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Manager manager, Project project WHERE manager.uid = ? AND project.pid = manager.pid AND project.completed = 0");
		$stmt->bind_param('i', $uid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		$numManagerDevProjects = $count;
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Member member, Project project WHERE member.uid = ? AND project.pid = member.pid AND project.completed = 0");
		$stmt->bind_param('i', $uid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		$numMemberDevProjects = $count;
		
		if($numMemberDevProjects == 0 && $numManagerDevProjects == 0){
			$devProjects = FALSE;
		}
		else{
			$devProjects = TRUE;
		}
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Manager manager, Project project WHERE manager.uid = ? AND project.pid = manager.pid AND project.completed = 1");
		$stmt->bind_param('i', $uid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		$numManagerCompProjects = $count;
		
		$stmt = $connection->prepare("SELECT COUNT(*) FROM Member member, Project project WHERE member.uid = ? AND project.pid = member.pid AND project.completed = 1");
		$stmt->bind_param('i', $uid);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->store_result();
		$stmt->fetch();
		
		$numMemberCompProjects = $count;
		
		if($numManagerCompProjects == 0 && $numMemberCompProjects == 0){
			$compProjects = FALSE;
		}
		else{
			$compProjects = TRUE;
		}
		
		$projectCount = 0;
		
		if(!$devProjects && !$compProjects){
			echo '<h4>No projects found. Please contact your manager to be added to a project. If you know you are assigned to a project, click <a href="contactUs.html" style="color:blue">here</a> for assistance.</h4>';
		}
		//Some projects exist for the user.
		else{
			echo '<div class="row">' .
					'<div class="col-lg-12">' .
						'<h3>In Development:</h3>' .
					'</div>' .
				 '</div>' .
				 '<br>' .
				 '<div class="row">';
			
			if($devProjects){
				if($numManagerDevProjects > 0){
					$stmt = $connection->prepare("SELECT project.pid, project.name, project.description, project.estDate FROM Manager manager, Project project WHERE manager.uid = ? AND project.pid = manager.pid AND project.completed = 0 ORDER BY project.estDate");
					$stmt->bind_param('i', $uid);
					$stmt->execute();
					$stmt->bind_result($pid, $name, $description, $estDate);
					$stmt->store_result();
					
					while($stmt->fetch()){
							
						if($description == "" || $description == NULL){
							$description = "No description available.";
						}
						
						 try {
							$estDate = new DateTime($estDate);
							$estDate = $estDate->format('m/d/Y');
						} catch (Exception $e) {
							echo $e->getMessage();
						}
						
						echo '<div class="col-lg-6">' .
								'<div class="panel panel-default">' . 
									'<div class="panel-heading">' . 
										"{$name}" . 
									'</div>' .
									'<div class="panel-body">' .
										'<div class="row">' . 
											'<div class="col-lg-12">' . 
												'<p>Description: ' . "{$description}" . '</p>' .
											'</div>' .
											'<div class="col-lg-12">' . 
												'<p>Project Progress: N/A</p>' .
											'</div>' . 
											'<div class="col-lg-12">' .
												'<p>Estimated Completion Date: ' . "{$estDate}" . '</p>' .
											'</div>' . 
											'<div class="col-lg-12">' . 
												'<p>User Level: Manager</p>' . 
											'</div>' .
										'</div>' . 
										'<div class="row">' .
											'<div class="col-lg-10">' .
											'</div>' . 
											'<div class="col-lg-2">' .
												'<button class="btn btn-primary pull-right" id="projectButton' . "{$pid}". '"' . '>View Project</button>' .
												'<input type="hidden" id="project' . "{$projectCount}" . '"' . 'value="' . "{$projectCount}" . '"' . '>' .
											'</div>' . 
										'</div>' .
									'</div>' .
								'</div>' .
							 '</div>';
						
						$projectCount++;				
					}
				}
				else if($numMemberDevProjects > 0){
					$stmt = $connection->prepare("SELECT project.pid, project.name, project.description, project.estDate FROM Member member, Project project WHERE member.uid = ? AND project.pid = member.pid AND project.completed = 0 ORDER BY project.estDate");
					$stmt->bind_param('i', $uid);
					$stmt->execute();
					$stmt->bind_result($pid, $name, $description, $estDate);
					$stmt->store_result();
					
					while($stmt->fetch()){
						
						if($description == "" || $description == NULL){
							$description = "No description available.";
						}
						
						 try {
							$estDate = new DateTime($estDate);
							$estDate = $estDate->format('m/d/Y');
						} catch (Exception $e) {
							echo $e->getMessage();
						}
						
						echo '<div class="col-lg-6">' .
								'<div class="panel panel-default">' . 
									'<div class="panel-heading">' . 
										"{$name}" . 
									'</div>' .
									'<div class="panel-body">' .
										'<div class="row">' . 
											'<div class="col-lg-12">' . 
												'<p>Description: ' . "{$description}" . '</p>' .
											'</div>' .
											'<div class="col-lg-12">' . 
												'<p>Project Progress: N/A</p>' .
											'</div>' . 
											'<div class="col-lg-12">' .
												'<p>Estimated Completion Date: ' . "{$estDate}" . '</p>' .
											'</div>' . 
											'<div class="col-lg-12">' . 
												'<p>User Level: Member</p>' . 
											'</div>' .
										'</div>' . 
										'<div class="row">' .
											'<div class="col-lg-10">' .
											'</div>' . 
											'<div class="col-lg-2">' .
												'<button class="btn btn-primary pull-right" id="projectButton' . "{$pid}". '"' . '>View Project</button>' .
												'<input type="hidden" id="project' . "{$projectCount}" . '"' . 'value="' . "{$projectCount}" . '"' . '>' .
											'</div>' . 
										'</div>' .
									'</div>' .
								'</div>' .
							 '</div>';
						
						$projectCount++;	
					}						
				}
			}
			else{
				echo '<h4>No In Development projects found.</h4>';
			}
			
			echo '</div>';
			echo '<br>';
			
			echo '<div class="row">' .
					'<div class="col-lg-12">' .
						'<h3>Completed:</h3>' .
					'</div>' .
				 '</div>' .
				 '<br>' .
				 '<div class="row">';
				 
			if($compProjects){
				if($numManagerCompProjects){
					$stmt = $connection->prepare("SELECT project.pid, project.name, project.description, project.estDate FROM Manager manager, Project project WHERE manager.uid = ? AND project.pid = manager.pid AND project.completed = 1 ORDER BY project.estDate");
					$stmt->bind_param('i', $uid);
					$stmt->execute();
					$stmt->bind_result($pid, $name, $description, $estDate);
					$stmt->store_result();
					
					while($stmt->fetch()){
							
						if($description == "" || $description == NULL){
							$description = "No description available.";
						}
						
						 try {
							$estDate = new DateTime($estDate);
							$estDate = $estDate->format('m/d/Y');
						} catch (Exception $e) {
							echo $e->getMessage();
						}
						
						echo '<div class="col-lg-6">' .
								'<div class="panel panel-default">' . 
									'<div class="panel-heading">' . 
										"{$name}" . 
									'</div>' .
									'<div class="panel-body">' .
										'<div class="row">' . 
											'<div class="col-lg-12">' . 
												'<p>Description: ' . "{$description}" . '</p>' .
											'</div>' .
											'<div class="col-lg-12">' . 
												'<p>Project Progress: N/A</p>' .
											'</div>' . 
											'<div class="col-lg-12">' .
												'<p>Estimated Completion Date: ' . "{$estDate}" . '</p>' .
											'</div>' . 
											'<div class="col-lg-12">' . 
												'<p>User Level: Manager</p>' . 
											'</div>' .
										'</div>' . 
										'<div class="row">' .
											'<div class="col-lg-10">' .
											'</div>' . 
											'<div class="col-lg-2">' .
												'<button class="btn btn-primary pull-right" id="projectButton' . "{$pid}". '"' . '>View Project</button>' .
												'<input type="hidden" id="project' . "{$projectCount}" . '"' . 'value="' . "{$projectCount}" . '"' . '>' .
											'</div>' . 
										'</div>' .
									'</div>' .
								'</div>' .
							 '</div>';
						
						$projectCount++;				
					}
				}
				else if($numMemberCompProjects > 0){
					$stmt = $connection->prepare("SELECT project.pid, project.name, project.description, project.estDate FROM Member member, Project project WHERE member.uid = ? AND project.pid = member.pid AND project.completed = 1 ORDER BY project.estDate");
					$stmt->bind_param('i', $uid);
					$stmt->execute();
					$stmt->bind_result($pid, $name, $description, $estDate);
					$stmt->store_result();
					
					while($stmt->fetch()){
						
						if($description == "" || $description == NULL){
							$description = "No description available.";
						}
						
						 try {
							$estDate = new DateTime($estDate);
							$estDate = $estDate->format('m/d/Y');
						} catch (Exception $e) {
							echo $e->getMessage();
						}
						
						echo '<div class="col-lg-6">' .
								'<div class="panel panel-default">' . 
									'<div class="panel-heading">' . 
										"{$name}" . 
									'</div>' .
									'<div class="panel-body">' .
										'<div class="row">' . 
											'<div class="col-lg-12">' . 
												'<p>Description: ' . "{$description}" . '</p>' .
											'</div>' .
											'<div class="col-lg-12">' . 
												'<p>Project Progress: N/A</p>' .
											'</div>' . 
											'<div class="col-lg-12">' .
												'<p>Estimated Completion Date: ' . "{$estDate}" . '</p>' .
											'</div>' . 
											'<div class="col-lg-12">' . 
												'<p>User Level: Member</p>' . 
											'</div>' .
										'</div>' . 
										'<div class="row">' .
											'<div class="col-lg-10">' .
											'</div>' . 
											'<div class="col-lg-2">' .
												'<button class="btn btn-primary pull-right" id="projectButton' . "{$pid}". '"' . '>View Project</button>' .
												'<input type="hidden" id="project' . "{$projectCount}" . '"' . 'value="' . "{$projectCount}" . '"' . '>' .
											'</div>' . 
										'</div>' .
									'</div>' .
								'</div>' .
							 '</div>';
						
						$projectCount++;	
					}						
				}
				
			}	
			else{
				echo '<h4>No Completed projects found.</h4>';
			}
			echo '</div>';
		}		
	}
?>