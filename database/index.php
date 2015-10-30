<!DOCTYPE html>
<html>
    <head>
        <title>Track It</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="js/loginValidation.js"></script>
        <style>
            #validation{
                width: 450px;
                position: absolute;
                left: 50%;
                top: 15%;
                display: none;
                margin: 0 0 0 -225px;
            }
            #loginBox{
                width: 450px;
                height: 200px;
                position: absolute;
                left: 50%;
                top: 50%;
                margin: -100px 0 0 -225px;
                border: 1px solid black
            }
        </style>
    </head>
    <body>
        <h1 style="text-align:center;">Track It</h1>
        <div id="validation"></div>
        <div id="loginBox">
            <form action="project.php" method="post">
                <label>Username:</label>
                <input type="text" name="username" id="username"><br>
                <label>Password:</label>
                <input type="password" name="password" id="password"><br>
                <input type="submit" value="Login" id="submitButton">
            </form>
            <form action="createUser.php">
                <input type="submit" value="Create Account">
            </form>
        </div>
    </body>
</html>