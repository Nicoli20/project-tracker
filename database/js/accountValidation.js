jQuery(document).ready(function(){
                
    jQuery("#submitButton").bind('click', function(e){
        e.preventDefault();
        jQuery("#validation").css("display", "hidden");
        
        var valid = validateAccount();
        
        if(valid){
            var username = jQuery("#username").val();
            var password = jQuery("#password").val();
            var email = jQuery("#email").val();
            var firstName = jQuery("firstName").val();
            var lastName = jQuery("lastName").val();
            
            var json = {username : username, 
                        password : password,
                        email : email,
                        firstName : firstName,
                        lastName : lastName};
            
            jQuery.post("php/createAccountVerification.php", json, function(data){
                resetDefaults();
                
                data = JSON.parse(data);
                var uniqueUser = (data.uniqueUsername == 0);
                var uniqueEmail = (data.uniqueEmail == 0);
                var message = "";
                var tempMessage = "";
                var valid = true;
                
                if(!uniqueUser){
                    valid = false;
                    jQuery("#username").css("background-color", "#FF3030");
                    message = "Username already in use.";
                }
                if(!uniqueEmail){
                    valid = false;
                    tempMessage = "Email already in use."
                    jQuery("#email").css("background-color", "#FF3030");
                    jQuery("#confirmEmail").css("background-color", "#FF3030");
                    
                    if(message != ''){
                        message = message + "<br>" + tempMessage;
                    }
                    else{
                        message = tempMessage;
                    }
                }      
                if(!valid){
                    jQuery("#validation").html(message);
                    jQuery("#validation").css("display", "block");
                }
                else{
                    document.location.href = "success.php";
                }
            });
        }
    });
});


function validateAccount(){
    var username = jQuery("#username").val();
    var password = jQuery("#password").val();
    var confirmPassword = jQuery("#confirmPassword").val();
    var email = jQuery('#email').val();
    var confirmEmail = jQuery('#confirmEmail').val();
    var firstName = jQuery('#firstName').val();
    var lastName = jQuery('#lastName').val();
    
    var valid = true;
    var message = "";
    var tempMessage = "";
    
    resetDefaults();

    if(username == "" && username != null){
        jQuery("#username").css("background-color", "#FF3030");
        valid = false;
        message = "Please enter a username.";
    }
    else if(username.length > 32){
        valid = false;
        jQuery("#username").css("background-color", "#FF3030");
        tempMessage = "Username must be 32 characters or less.";
        
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }
    
    if(password == "" && password != null){
        jQuery("#password").css("background-color", "#FF3030");
        valid = false;
        tempMessage = "Please enter a password.";
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }
    else if(password.length > 32){
        jQuery("#password").css("background-color", "#FF3030");
        valid = false;
        tempMessage = "Password must be 32 characters or less.";
        
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }
    else{
        if(password != confirmPassword){
            valid = false;
            jQuery("#password").css("background-color", "#FF3030");
            jQuery("#confirmPassword").css("background-color", "#FF3030");
            
            tempMessage = "Passwords do not match.";
            
            if(message != ''){
                message = message + "<br>" + tempMessage;
            }
            else{
                message = tempMessage;
            }
        }
    }
    
    if(email == "" && email != null){
        jQuery("#email").css("background-color", "#FF3030");
        valid = false;
        tempMessage = "Please enter an email.";
        
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }
    else if(email.length > 320){
        jQuery("#email").css("background-color", "#FF3030");
        valid = false;
        tempMessage = "Email must be 320 characters or less.";
        
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }
    else{
        if(email != confirmEmail){
            valid = false;
            jQuery("#email").css("background-color", "#FF3030");
            jQuery("#confirmEmail").css("background-color", "#FF3030");
            
            tempMessage = "Emails do not match.";
            
            if(message != ''){
                message = message + "<br>" + tempMessage;
            }
            else{
                message = tempMessage;
            }
        }
    }
    
    if(firstName == '' && firstName != null){
        valid = false;
        jQuery("#firstName").css("background-color", "#FF3030");
        tempMessage = "Please enter your first name.";
        
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }
    else if(firstName.length > 50){
        valid = false;
        jQuery("#firstName").css("background-color", "#FF3030");
        tempMessage = "First name must be 50 characters or less.";
        
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }

    if(lastName == '' && lastName != null){
        valid = false;
        jQuery("#lastName").css("background-color", "#FF3030");
        tempMessage = "Please enter your last name.";
        
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }
    else if(lastName.length > 50){
        valid = false;
        jQuery("#lastName").css("background-color", "#FF3030");
        tempMessage = "Last name must be 50 characters or less.";
        
        if(message != ''){
            message = message + "<br>" + tempMessage;
        }
        else{
            message = tempMessage;
        }
    }
    
    if(!valid){
        jQuery("#validation").html(message);
        jQuery("#validation").css("display", "block");
    }
    return valid;
};

function resetDefaults(){
    //Reset fields to default formatting
    jQuery("#username").css("background-color", "white");
    jQuery("#password").css("background-color", "white");
    jQuery("#confirmPassword").css("background-color", "white");
    jQuery("#email").css("background-color", "white");
    jQuery("#confirmEmail").css("background-color", "white");
    jQuery("#firstName").css("background-color", "white");
    jQuery("#lastName").css("background-color", "white");
    jQuery("#validation").css("display", "hidden");
}