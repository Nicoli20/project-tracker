<!DOCTYPE html>
<html>
    <head>
        <title>Create User</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="js/accountValidation.js"></script>
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
                border: 1px solid black;
            }
        </style>
    </head>
    <body>
        <h1 style="text-align:center;">Create Account</h1>
        <div id="validation"></div>
        <div id="loginBox">
            <form id="createForm" action="success.php" method="post">
                <label id="usernameLabel">*Username:</label>
                <input type="text" name="username" id="username"><br>
                <label id="passwordLabel">*Password:</label>
                <input type="password" name="password" id="password"><br>
                <label id="confirmPasswordLabel">*Confirm Password:</label>
                <input type="password" name="confirmPassword" id="confirmPassword"><br>
                <label id="emailLabel">*Email:</label>
                <input type="text" name="email" id="email"><br>
                <label id="confirmEmailLabel">*Confirm Email:</label>
                <input type="text" name="confirmEmail" id="confirmEmail"><br>
                <label id="firstNameLabel">*First Name:</label>
                <input type="text" name="firstName" id="firstName"><br>
                <label id="lastNameLabel">*Last Name:</label>
                <input type="text" name="lastName" id="lastName"><br>
                <input type="submit" value="Create" id="submitButton">
            </form>
        </div>
    </body>
</html>