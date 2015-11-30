jQuery(document).ready(function(){
	jQuery('[id^="editFieldsButtonGroup"]').on('click', '[id^="editButton"]', function(e){
		e.preventDefault();
		
		//About Me
		var initialDescription = jQuery('#aboutMe').text();
		jQuery('#aboutMeHidden').val(initialDescription);
		
		var textarea = '<textarea id="aboutMeTextArea" rows="6" style="resize:vertical;width:100%;">' + initialDescription + '</textarea>';
		
		jQuery('#aboutMe').html(textarea);
		
		//Username
		var initialUsername = jQuery('#username').text();
		jQuery('#usernameHidden').val(initialUsername);
		
		var textarea = '<textarea id="usernameTextArea" rows="2" style="resize:vertical;width:100%;">' + initialUsername + '</textarea>';
		
		jQuery('#username').html(textarea);
		
		//Job Title
		var initialJobTitle = jQuery('#jobTitle').text();
		jQuery('#jobTitleHidden').val(initialUsername);
		
		var textarea = '<textarea id="jobTitleTextArea" rows="2" style="resize:vertical;width:100%;">' + initialJobTitle + '</textarea>';
		
		jQuery('#jobTitle').html(textarea);
		
		//Buttons
		var saveButton = '<button class="btn btn-primary pull-right" style="margin-right:15px;" id="saveButton">Save</button>';
		var cancelButton = '<button class="btn btn-danger pull-right" style="margin-right:15px;" id="cancelButton">Cancel</button>';
		var newButtons = cancelButton + saveButton;
		
		jQuery('#editFieldsButtonGroup').html(newButtons);
		
		//Cancel Button
		jQuery('#cancelButton').click(function(e){
			e.preventDefault();
			
			jQuery('#aboutMe').html(initialDescription);
			jQuery('#username').html(initialUsername);
			jQuery('#jobTitle').html(initialJobTitle);
			
			var editButton = '<button class="btn btn-primary pull-right" style="margin-right:15px" id="editButton">Edit</button>';
			
			jQuery('#editFieldsButtonGroup').html(editButton);
		});
		
		//Save Button
		jQuery('#saveButton').click(function(e){
			e.preventDefault();
			
			jQuery("#alertBox").html("");
			jQuery('#alertBox').hide();
		
			var valid = validateProfile();
			
			if(valid){
				var newDescription = jQuery('#aboutMeTextArea').val();
				var newUsername = jQuery('#usernameTextArea').val();
				var newJobTitle = jQuery('#jobTitleTextArea').val();
				
				jQuery('#aboutMeHidden').val(newDescription);
				jQuery('#aboutMe').html(newDescription);
				
				jQuery('#usernameHidden').val(newUsername);
				jQuery('#username').html(newUsername);
				
				jQuery('#jobTitleHidden').val(newJobTitle);
				jQuery('#jobTitle').html(newJobTitle);
				
				var editButton = '<button class="btn btn-primary pull-right" id="editButton">Edit</button>';
				
				jQuery('#editFieldsButtonGroup').html(editButton);
				
				var json = {newDescription : newDescription,
							newUsername : newUsername,
							newJobTitle : newJobTitle};
				
				jQuery.post('phpScripts/editProfilePHP.php', json, function(data){
				});
			}
			else{
				jQuery(window).scrollTop(0);
			}
		});
	});
});

function validateProfile(){
	var valid = true;
	
	var newDescription = jQuery('#aboutMeTextArea').val();
	var newUsername = jQuery('#usernameTextArea').val();
	var newJobTitle = jQuery('#jobTitleTextArea').val();
	var message = '';
	
	if(isEmpty(newDescription)){
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> About Me cannot be empty.<br>';
		valid = false;
	}
	
	if(isEmpty(newUsername)){
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Username cannot be empty.<br>';
		valid = false;
	}
	else if(newUsername.length > 255){
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Username must be less than 255 characters.<br>';
		valid = false;
	}
	
	if(isEmpty(newJobTitle)){
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Job Title cannot be empty.<br>';
		valid = false;
	}
	else if(newJobTitle.length > 255){
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Job Title must be less than 255 characters.<br>';
		valid = false;
	}
	
	if(!valid){
		jQuery('#alertBox').html(message);
        jQuery('#alertBox').show();
	}
	
	return valid;
}

function isEmpty(value){
    if(value === "" || value === null){
        return true;
    }
    else{
        return false;
    } 
};