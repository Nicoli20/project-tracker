<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="icon" href="images/website_icon.ico" type="image/x-icon">
    <title>Create Project</title>

    <!-- Bootstrap Core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

	<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/css/bootstrap-datepicker.css" rel="stylesheet">
	
	<?php require('phpScripts/commonPHP.php'); ?>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<style>
		.datepicker{
			z-index:1000 !important;
		}
	</style>
</head>

<body>
	
	<input type="hidden" id="numMembers" value="0">
	<input type="hidden" id="numManagers" value="0">
	
	<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">Project Created!</h4>
				</div>
				<div class="modal-body">
					<p>You are now ready to start adding requirements and tasks to your new project. Click Ok to proceed to the project page!</p>
					<button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
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
                        <h1 class="page-header">Create Project</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="alert alert-danger" id="alertBox" style="display:none;"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12">
						<h4>Step 1: Project Details</h4>
						<p>Fill out the required information to start a new project.</p>
						<p>* = required field.</p>
						</br>
					</div>
				</div>
                <div class="row">
					<form class="form-horizontal">
						<div class="col-lg-6">	
							<div class="row">
								<div class="form-group">
									<label for="projectName" class="col-lg-2 control-label">*Project Name:</label>
									<div class="col-lg-9">
										<input type="text" class="form-control" id="projectName" placeholder="Project Name">
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-6">	
							<div class="row">
								<div class="form-group">
									<label for="datepicker" class="col-lg-4 control-label">*Estimated Completion Date:</label>
									<div class="col-lg-4">
										<input type="text" class="form-control" id="datepicker">
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-12">	
							<div class="row">
								<div class="form-group">
									<label for="projectDescription" class="col-lg-1 control-label">Description:</label>
									<div class="col-lg-9">
										<textarea rows="5" class="form-control" id="projectDescription" style="resize:vertical;width:100%;" placeholder="(Optional) Add a detailed description."></textarea>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
				<br>
				<div class="row">
					<div class="col-lg-12">
						<h4>Step 2: Add Team Members</h4>
						<p style="font-style:italic;">Additional team members can be added after the project has been created.</p>
					</div>
				</div>
				<div class="row">
					<form class="form-horizontal" id="memberList">
					</form>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<button class="btn btn-primary" id="addMemberButton">Add Member</button>
						<button class="btn btn-danger" id="removeMemberButton" style="display:none">Remove Member</button>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-lg-12">
						<h4>Step 3: Add Additional Managers</h4>
						<p style="font-style:italic;">Creating a project will automatically assign you as a manager.</p>
						<p style="font-style:italic;">Additional managers can be added after the project has been created.</p>
					</div>
				</div>
				<div class="row">
					<form class="form-horizontal" id="managerList">
					</form>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<button class="btn btn-primary" id="addManagerButton">Add Manager</button>
						<button class="btn btn-danger" id="removeManagerButton" style="display:none">Remove Manager</button>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-lg-12">
						<h4>Step 4: Finalize Details</h4>
						<p>Ensure all the information entered is correct then click the create button to start your new project!</p>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<button class="btn btn-primary" id="createProjectButton">Create</button>
					</div>
				</div>
				<br>
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->

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
	<script src="js/createProjectJSMethods.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/js/bootstrap-datepicker.min.js"></script>

</body>

</html>
