<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="icon" href="images/website_icon.ico" type="image/x-icon">
    <title>Project Details</title>

    <!-- Bootstrap Core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="css/jquery.treegrid.css">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/css/bootstrap-datepicker.css" rel="stylesheet">
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">

	<?php require('phpScripts/commonPHP.php'); ?>
	<?php require('phpScripts/projectDetailsPHP.php') ?>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<style>
	.treeChild{
		margin-left: 15px;
	}
	.treeGrandChild{
		margin-left: 30px;
	}
	.close(
		opacity: 1;
	)
	.modal-header(
	    background-image: url(images/btexture4.jpg);
	)
	.modal-title(
		color: white;
	)
	</style>
</head>

<body>

	
	<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button>
					<h4 class="modal-title" id="myModalLabel"></h4>
				</div>
				<div class="modal-body">
					<p id="myModalBody"></p>
					<button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button>
					<h4 class="modal-title" id="infoModalLabel"></h4>
				</div>
				<div class="modal-body" id="infoModalBody">
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button>
					<h4 class="modal-title" id="confirmModalLabel"></h4>
				</div>
				<div class="modal-body" id="confirmModalBody">
				</div>
			</div>
		</div>
	</div>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
				<a class="navbar-brand" href="home.php">Track'It - A Project Tracking Solution</a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <!-- /.navbar-header -->

           <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <?php populateSideBar(); ?>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header"><?php getProjectName(); ?></h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
				<br>
				<div class="row">
					<div class="col-lg-12">
						<h4>Project Progress:</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12">
						<div class="progress">
							<?php getProjectProgress(); ?>
						</div>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-lg-3 col-md-6">
						<div class="panel panel-primary">
							<div class="panel-heading">
								<div class="row">
									<div class="col-xs-3">
										<i class="fa fa-tasks fa-5x"></i>
									</div>
									<div class="col-xs-9 text-right">
										<div class="huge"><?php getNumAssignedTasks(); ?></div>
										<div>Assigned Tasks</div>
									</div>
								</div>
							</div>
							<a href="#" id="viewMyTasks">
								<div class="panel-footer">
									<span class="pull-left" style="color:#337AB7">View My Tasks</span>
									<span class="pull-right" style="color:#337AB7"><i class="fa fa-arrow-circle-right"></i></span>
									<div class="clearfix"></div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="panel panel-red">
							<div class="panel-heading">
								<div class="row">
									<div class="col-xs-3">
										<i class="fa fa-bug fa-5x"></i>
									</div>
									<div class="col-xs-9 text-right">
										<div class="huge"><?php getNumAssignedDefects(); ?></div>
										<div>Assigned Defects</div>
									</div>
								</div>
							</div>
							<a href="#" id="viewMyDefects">
								<div class="panel-footer">
									<span class="pull-left">View My Defects</span>
									<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
									<div class="clearfix"></div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="panel panel-green">
							<div class="panel-heading">
								<div class="row">
									<div class="col-xs-3">
										<i class="fa fa-upload fa-5x"></i>
									</div>
									<div class="col-xs-9 text-right">
										<div class="huge"><?php getNumCommits(); ?></div>
										<div>Commits</div>
									</div>
								</div>
							</div>
							<a href="#" id="viewCommits">
								<div class="panel-footer">
									<span class="pull-left">View Commits</span>
									<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
									<div class="clearfix"></div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="panel panel-yellow">
							<div class="panel-heading">
								<div class="row">
									<div class="col-xs-3">
										<i class="fa fa-exclamation-triangle fa-5x"></i>
									</div>
									<div class="col-xs-9 text-right">
										<div class="huge"><?php getNumAlerts(); ?></div>
										<div>Alerts</div>
									</div>
								</div>
							</div>
							<a href="#" id="viewAlerts">
								<div class="panel-footer">
									<span class="pull-left">View Alerts</span>
									<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
									<div class="clearfix"></div>
								</div>
							</a>
						</div>
					</div>
                </div>
				<br>
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								My Actions
							</div>
							<div class="panel-body" style="margin-bottom:-15px;">
								<div class="row">
									<div class="control-group">
										<div class="col-lg-3 col-md-6 center-block" style="margin-bottom:15px;">
											<button class="btn btn-primary center-block btn-block" id="createCommitButton">Create Commit</button>
										</div>
										<div class="col-lg-3 col-md-6 center-block" style="margin-bottom:15px;">
											<button class="btn btn-primary center-block btn-block" id="createAlertButton">Create Alert</button>
										</div>
										<div class="col-lg-3 col-md-6 center-block" style="margin-bottom:15px;">
											<button class="btn btn-primary center-block btn-block" id="viewProjectTreeButton">View Project Tree</button>
										</div>
										<div class="col-lg-3 col-md-6 center-block" style="margin-bottom:15px;">
											<button class="btn btn-primary center-block btn-block" id="createDefectButton">Create Defect</button>
										</div>
									<?php if($_SESSION['userLevel'] == 1) : ?>
										<div class="col-lg-3 col-md-6 center-block" style="margin-bottom:15px;">
											<button class="btn btn-primary center-block btn-block" id="createRequirementButton">Create Requirement</button>
										</div>
										<div class="col-lg-3 col-md-6 center-block" style="margin-bottom:15px;">
											<button class="btn btn-primary center-block btn-block" id="createTaskButton">Create Task</button>
										</div>
										<div class="col-lg-3 col-md-6 center-block" style="margin-bottom:15px;">
											<button class="btn btn-primary center-block btn-block" id="assignTaskButton">Assign Task</button>
										</div>
										<div class="col-lg-3 col-md-6 center-block" style="margin-bottom:15px;">
											<button class="btn btn-primary center-block btn-block" id="assignDefectButton">Assign Defect</button>
										</div>
									<?php endif; ?>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div class="alert alert-danger" id="alertBox" style="display:none;"></div>
					</div>
				</div>
				<div class="row" id="dynamicContent">
				</div>
				<div class="row" id="chartContent" style="display:none;">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading" id="chartLabel">
							</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-lg-12" id="chartError">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-6">
										<div class="row" id="chartAreaBefore">
										</div>
										<div class="row">
											<div class="col-lg-12">
												<div id="chartArea">
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="row" id="chartArea2Before">
										</div>
										<div class="row">
											<div class="col-lg-12">
												<div id="chartArea2">
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-lg-12">
												<p class="text-center">Week Of</p>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-lg-1 col-lg-offset-10">
										<button class="btn btn-default" id="closeChartsButton">Close</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								Project Stats
							</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-lg-12">
										<p class="form-control-static">Project Description: <?php getProjectDescription(); ?></p>
									</div>
									<div class="col-lg-6">
										<p class="form-control-static">Project Start Date: <?php getStartDate(); ?></p>
									</div>
									<div class="col-lg-6">
										<p class="form-control-static">Estimated Completion Date: <?php getEstCompletionDate(); ?></p>
									</div>
									<div class="col-lg-6">
										<p class="form-control-static">Number of Requirements: <?php getNumRequirements(); ?></p>
									</div>
									<div class="col-lg-6">
										<p class="form-control-static">Number of Completed Requirements: <?php getNumCompletedRequirements(); ?></p>
									</div>
									<div class="col-lg-6">
										<p class="form-control-static">Number of Tasks: <?php getNumTasks(); ?></p>
									</div>
									<div class="col-lg-6">
										<p class="form-control-static">Number of Completed Tasks: <?php getNumCompletedTasks(); ?></p>
									</div>
									<div class="col-lg-6">
										<p class="form-control-static">Number of Defects: <?php getNumDefects(); ?></p>
									</div>
									<div class="col-lg-6">
										<p class="form-control-static">Number of Completed Defects: <?php getNumCompletedDefects(); ?></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="dist/js/sb-admin-2.js"></script>
	
	<script src="js/commonJSMethods.js"></script>
	<script src="js/projectDetailsJSMethods.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/js/bootstrap-datepicker.min.js"></script>
	<script src="js/jquery.treegrid.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>

</body>

</html>
