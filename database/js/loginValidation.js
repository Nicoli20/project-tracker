jQuery(document).ready(function(){
                
    jQuery("#submitButton").bind('click', function(e){
        e.preventDefault();
        jQuery("#validation").css("display", "hidden");
        
        var valid = validateLogin();
        
        if(valid){
            
            var username = jQuery("#username").val();
            var password = jQuery("#password").val();
            var json = {username: username, password: password};
            
            jQuery.post("php/loginVerification.php", json, function(numRows){
                if(numRows == 1){
                    document.location.href = "project.php";
                }
                else{                   
                    var message = "Invalid username or password. Please try again.";
                    jQuery("#validation").html(message);
                    jQuery("#validation").css("display", "block");                
                }
            });
        }
    });
});


function validateLogin(){
    var username = jQuery("#username").val();
    var password = jQuery("#password").val();
    var valid = true;
    var message = "";

    //Reset fields to default formatting
    jQuery("#username").css("background-color", "white");
    jQuery("#password").css("background-color", "white");
    jQuery("#validation").css("display", "hidden");

    if(username == "" && username != null){
        jQuery("#username").css("background-color", "#FF3030");
        valid = false;
        message = "Please enter a username.";
    }
    if(password == "" && password != null){
        jQuery("#password").css("background-color", "#FF3030");
        valid = false;
        
        if(message != ''){
            message = message + "<br>Please enter a password.";
        }
        else{
            message = "Please enter a password.";
        }
    }

    if(!valid){
        jQuery("#validation").html(message);
        jQuery("#validation").css("display", "block");
    }
    return valid;
};