<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="icon" href="images/website_icon.ico" type="image/x-icon">
    <title>My Profile</title>

    <!-- Bootstrap Core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<?php require('phpScripts/profileDataPHP.php'); ?>
	<?php require('phpScripts/commonPHP.php'); ?>
	
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<style>
		.img-circle-200px{
			border: solid;
			height: 200px;
			width: 200px;
			border-radius: 50%;
		}
	</style>
</head>

<body>

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
                        <h1 class="page-header">My Profile</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
				<div class="row">
					<div class="col-md-12">
						<h3 id="name"><?php getFirstLastName(); ?></h3>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="alert alert-danger" id="alertBox" style="display:none;"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-4">
						<img class="img-circle-200px center-block" src="images/blank_profile.jpg">
						<br>
						<button class="btn btn-primary center-block" id="editPhotoButton">Edit Photo</button>
					</div>
					<br>
					<div class="col-lg-8">
						<div class="panel panel-default">
							<div class="panel-heading">
								About Me
							</div>
							<div class="panel-body">
								<p id="aboutMe"><?php getAboutMe(); ?></p>
							</div>
							<input type="hidden" id="aboutMeHidden" value="">
						</div>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-lg-6">
						<div class="panel panel-default">
							<div class="panel-heading">
								Username
							</div>
							<div class="panel-body">
								<p id="username"><?php getUsername(); ?></p>
							</div>
							<input type="hidden" id="usernameHidden" value="">
						</div>
					</div>
					<div class="col-lg-6">
						<div class="panel panel-default">
							<div class="panel-heading">
								Job Title
							</div>
							<div class="panel-body">
								<p id="jobTitle"><?php getJobTitle(); ?></p>
							</div>
							<input type="hidden" id="jobTitleHidden" value="">
						</div>
					</div>
                </div>
				<div class="row">
					<div id="editFieldsButtonGroup">
						<button class="btn btn-primary pull-right" style="margin-right:15px" id="editButton">Edit</button>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-lg-6">
						<div class="panel panel-default">
							<div class="panel-heading">Current Roles</div>
							<div class="panel-body">
								<div class="panel-group" id="accordion">
									<?php getRoles(); ?>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="panel panel-default">
							<div class="panel-heading">
								Current Projects
							</div>
							<div class="panel-body">
								<p id="currentProjects"></p>
							</div>
						</div>
					</div>
                </div>
				<br>
				<!--
				<div class="row">
					<div class="col-lg-6 col-md-12">
						<div class="panel panel-primary">
							<div class="panel-heading">Current Project Roles</div>
							<div class="panel-body">
							</div>
						</div>
					</div>
					<div class="col-lg-6 col-md-12">
						<div class="panel panel-primary">
							<div class="panel-heading">Current Projects</div>
							<div class="panel-body">
								<div class="panel-group" id="accordion">
									<div class="panel panel-primary">
										<div class="panel-heading">Project #1</div>
									</div>
									<div class="panel panel-primary">
										<div class="panel-heading">Project #2</div>
									</div>
									<div class="panel panel-primary">
										<div class="panel-heading">Project #3</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> -->
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
	<script src="js/profileJSMethods.js"></script>
</body>

</html>
