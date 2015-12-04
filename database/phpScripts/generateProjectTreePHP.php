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
	
	$stmt = $connection->prepare("SELECT COUNT(*) FROM Requirement WHERE pid = ? AND completed = 0");
	$stmt->bind_param('i', $pid);
	$stmt->execute();
	$stmt->bind_result($countReqs);
	$stmt->store_result();
	$stmt->fetch();
	
	if($countReqs > 0){
		$button = '<button class="btn btn-primary" id="completeProjectButton" style="display:none;">Complete Project</button>';
	}
	else{
		$button = '<button class="btn btn-primary" id="completeProjectButton">Complete Project</button>';
	}
	
	$stmt = $connection->prepare("SELECT req.rid, req.name FROM Requirement req WHERE req.pid = ?");
	$stmt->bind_param('i', $pid);
	$stmt->execute();
	$stmt->bind_result($rid, $name);
	$stmt->store_result();
	
	$returnVals = array();
	
	$requirements = array();
	$i = 0;
	
	while($stmt->fetch()){
		$requirements[$i]['rid'] = $rid;
		$requirements[$i]['name'] = $name;
		$i++;
	}
	
	if($i == 0){
		$html = '<p>No requirements found.</p>';
	}
	else{
		$stmt = $connection->prepare("SELECT name FROM Project WHERE pid = ?");
		$stmt->bind_param('i', $pid);
		$stmt->execute();
		$stmt->bind_result($name);
		$stmt->store_result();
		$stmt->fetch();
		
		$nodeId = 2;
	
		$html = '<table class="table tree-2 table-bordered table-striped table-condensed">' .
				'<tr class="treegrid-1">' .
					'<td>' . "{$name}" . '</td><td>' . "{$button}" . '</td>' .
				'</tr>';
				
		foreach($requirements as $requirement){
			$html = $html . '<tr class="treegrid-' . $nodeId . ' treegrid-parent-1">' . '<td>' . "{$requirement['name']}" . '</td><td><button class="btn btn-primary center-block treebtn" id="requirementSPLIT' . "{$requirement['rid']}" . '">More Info</button></td>';
			
			$parentNodeId = $nodeId;
			$nodeId++;
			
			$stmt = $connection->prepare("SELECT task.tid, task.name FROM Task task WHERE task.rid = ?");
			$stmt->bind_param('i', $requirement['rid']);
			$stmt->execute();
			$stmt->bind_result($tid, $name);
			$stmt->store_result();
			
			while($stmt->fetch()){
				$html = $html . '<tr class="treegrid-' . "{$nodeId}" . ' treegrid-parent-' .  "{$parentNodeId}" . '">' . '<td>' . "{$name}" . '</td><td><button class="btn btn-primary center-block treebtn" id="taskSPLIT' . "{$tid}" . '">More Info</button></td>';
				$nodeId++;
			}
		}
		
		$html = $html . '</table>';
	}
	
	$returnVals['numReqs'] = $i;
	$returnVals['html'] = $html;
	
	echo json_encode($returnVals);
		
	// '<table class="table tree-2 table-bordered table-striped table-condensed">'
					// + '<tr class="treegrid-1">'
						// + '<td>Project</td><td></td>'
					// + '</tr>'
					// + '<tr class="treegrid-2 treegrid-parent-1">'
						// + '<td>Team Project Demo</td><td><button class="btn btn-primary center-block">More Info</button></td>'
					// + '</tr>'
					// + '<tr class="treegrid-3 treegrid-parent-2">'
						// + '<td>Task 1</td><td><button class="btn btn-primary center-block">More Info</button></td>'
					// + '</tr>'
					// + '<tr class="treegrid-4 treegrid-parent-2">'
						// + '<td>Task 2</td><td><button class="btn btn-primary center-block">More Info</button></td>'
				 // + '</table>';
?>