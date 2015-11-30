jQuery(document).ready(function(){
    jQuery("#createAccountButton").bind('click', function(e){
        e.preventDefault();
		
        jQuery("#alertBox").html("");
		jQuery("#alertBox").css("display", "none");
        
        var valid = validateAccountCredentials();
        
        if(valid){
            createAccount();
        }
		else{
			jQuery(window).scrollTop(0);
		}
    });
	
	jQuery('#successModal').on('hidden.bs.modal', function(e){
		e.preventDefault();
		
		document.location.href = "index.html";
	})
});

function validateAccountCredentials(){
	var valid = true;
	var message = "";
	
	var username = jQuery('#username').val();
	var password = jQuery('#password').val();
	var passwordConfirm = jQuery('#passwordConfirm').val();
	var email = jQuery('#email').val();
	var emailConfirm = jQuery('#emailConfirm').val();
	var firstname = jQuery('#firstname').val();
	var lastname = jQuery('#lastname').val();
	var userType = jQuery('#userType').val();
	
	var exclamationPoint = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ';
	
	if(isEmpty(username)){
		message = exclamationPoint + 'Username is a required field.<br>';
		valid = false;
	}
	else if(username.length > 255){
		message = exclamationPoint + 'Username is too long.<br>';
		valid = false;
	}
	
	if(isEmpty(password)){
		message = message + exclamationPoint +'Password is a required field.<br>';
		valid = false;
	}
	else if(password.length > 255){
		message = message + exclamationPoint +'Password is too long.<br>'
	}
	else{
		if(isEmpty(passwordConfirm)){
			message = message + exclamationPoint + 'Confirm your password.<br>';
			valid = false;
		}
		else if(password !== passwordConfirm){
			message = message + exclamationPoint + 'Passwords do not match.<br>';
			valid = false;
		}
	}
	
	if(isEmpty(email)){
		message = message + exclamationPoint +  'Email is a required field.<br>';
		valid = false;
	}
	else if(email.length > 255){
		message = message + exclamationPoint +  'Email is too long.<br>';
		valid = false;
	}
	else{
		if(isEmpty(emailConfirm)){
			message = message + exclamationPoint +  'Confirm your email.<br>';
			valid = false;
		}
		else if(email !== emailConfirm){
			message = message + exclamationPoint +  'Emails do not match.<br>';
			valid = false;
		}
	}
	
	if(isEmpty(firstname)){
		message = message + exclamationPoint +  'First Name is a required field.<br>';
		valid = false;
	}
	else if(firstname.length > 255){
		message = message + exclamationPoint +  'First Name is too long.<br>';
		valid = false;
	}
	
	if(isEmpty(lastname)){
		message = message + exclamationPoint +  'Last Name is a required field.<br>';
		valid = false;
	}
	else if(lastname.length > 255){
		message = message + exclamationPoint +  'Last Name is too long.<br>';
		valid = false;
	}
	
	if(userType == 'Select a user type...'){
		message = message + exclamationPoint +  'User Type is a required field.';
		valid = false;
	}
	
	if(!valid){
		jQuery('#alertBox').html(message);
		jQuery('#alertBox').css('display', 'block');
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
};

function createAccount(){
	var username = jQuery('#username').val();
	var password = jQuery('#password').val();
	var email = jQuery('#email').val();
	var firstname = jQuery('#firstname').val();
	var lastname = jQuery('#lastname').val();
	var userType = jQuery('#userType').val();
	
	var json = {username: username,
				password: password,
				email: email,
				firstname: firstname,
				lastname: lastname,
				userType: userType};

	jQuery.post("phpScripts/createAccountVerificationPHP.php", json, function(uniqueEmail){
		
		uniqueEmail = JSON.parse(uniqueEmail);
		
		if(uniqueEmail){
			jQuery('#successModal').modal('show');
		}
		else{         
			var message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Email already in use.';
			jQuery("#alertBox").html(message);
			jQuery("#alertBox").css("display", "block"); 			
		}
	});
}