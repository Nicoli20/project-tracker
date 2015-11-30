jQuery(document).ready(function(){
                
    jQuery("#loginButton").bind('click', function(e){
        e.preventDefault();
		
        jQuery("#alertBox").html("");
		jQuery("#alertBox").css("display", "none");
        
        var valid = validateLogin();
        
        if(valid){
            
            var email = jQuery("#email").val();
            var password = jQuery("#password").val();
            var json = {email: email, 
						password: password};
            
            jQuery.post("phpScripts/loginVerificationPHP.php", json, function(userExists){
				userExists = JSON.parse(userExists);
                if(userExists){
                    document.location.href = "home.php";
                }
                else{                   
                    var message = "Invalid email or password. Please try again.";
                    jQuery("#alertBox").html(message);
                    jQuery("#alertBox").css("display", "block");     
					jQuery(window).scrollTop(0);
                }
            });
        }
    });
});


function validateLogin(){
    var email = jQuery("#email").val();
    var password = jQuery("#password").val();
    var valid = true;
    var message = "";

    if(isEmpty(email)){
        valid = false;
        message = "Please enter an email.";
    }
    if(isEmpty(password)){
        valid = false;
        
        if(message != ''){
            message = message + "<br>Please enter a password.";
        }
        else{
            message = "Please enter a password.";
        }
    }

    if(!valid){
        jQuery("#alertBox").html(message);
        jQuery("#alertBox").css("display", "block");
    }
	
    return valid;
};

function isEmpty(value){
    if(value === "" || value === null){
        return true;
    }
    else{
        return false;
    } 
}