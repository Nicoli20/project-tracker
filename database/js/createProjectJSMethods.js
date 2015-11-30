jQuery(document).ready(function(){
    var date = new Date();
    date.setDate(date.getDate()-1);

	jQuery('#successModal').on('hidden.bs.modal', function(e){
		e.preventDefault();
		
		document.location.href = "projectDetails.php";
	});
	
    jQuery('#datepicker').datepicker({
        format: "mm/dd/yyyy",
        startDate: "today",
        autoclose: true
    }); 
	
	jQuery('#addMemberButton').bind('click', function(e){
		e.preventDefault();
		
		var numMembers = parseInt(jQuery('#numMembers').val()) + 1;
		
		if(numMembers == 1){
			jQuery('#removeMemberButton').show();
		}
		
		jQuery('#numMembers').val(numMembers);
		
		var newMemberHtml = '<div class="col-lg-6"><div class="row"><div class="form-group"><label for="member' 
							+ numMembers + '" ' + 'class="col-lg-2 control-label">Member ' + numMembers + ' Email:</label>' 
							+ '<div class="col-lg-8">' + '<input type="text" class="form-control" id="member' + numMembers + '" '
							+ 'placeholder="email@example.com">'
							+ '</div></div></div></div>';
		
		jQuery('#memberList').before(newMemberHtml);
	});
	
	jQuery('#removeMemberButton').bind('click', function(e){
		e.preventDefault();
		
		var numMembers = parseInt(jQuery('#numMembers').val());
		
		if(numMembers > 0){
			jQuery('#numMembers').val(numMembers-1);
		
			jQuery('#member' + numMembers).parent().parent().parent().parent().remove();
			
			if((numMembers - 1) == 0){
				jQuery('#removeMemberButton').hide();
			}
		}
	});
	
	jQuery('#addManagerButton').bind('click', function(e){
		e.preventDefault();
		
		var numManagers = parseInt(jQuery('#numManagers').val()) + 1;
		
		if(numManagers == 1){
			jQuery('#removeManagerButton').show();
		}
		
		jQuery('#numManagers').val(numManagers);
		
		var newManagerHtml = '<div class="col-lg-6"><div class="row"><div class="form-group"><label for="manager' 
							+ numManagers + '" ' + 'class="col-lg-2 control-label">Manager ' + numManagers + ' Email:</label>' 
							+ '<div class="col-lg-8">' + '<input type="text" class="form-control" id="manager' + numManagers + '" '
							+ 'placeholder="email@example.com">'
							+ '</div></div></div></div>';
		
		jQuery('#managerList').before(newManagerHtml);
	});
	
	jQuery('#removeManagerButton').bind('click', function(e){
		e.preventDefault();
		
		var numManagers = parseInt(jQuery('#numManagers').val());
		
		if(numManagers > 0){
			jQuery('#numManagers').val(numManagers-1);
		
			jQuery('#manager' + numManagers).parent().parent().parent().parent().remove();
			
			if((numManagers - 1) == 0){
				jQuery('#removeManagerButton').hide();
			}
		}
	});
	
	jQuery('#createProjectButton').bind('click', function(e){
		e.preventDefault();
		
		jQuery("#alertBox").html("");
		jQuery('#alertBox').hide();
		
		
		var valid = validateProject();
		
		if(valid){
			var numMembers = parseInt(jQuery('#numMembers').val());
			var numManagers = parseInt(jQuery('#numManagers').val());
			
			var projectName = jQuery('#projectName').val();
			var description = jQuery('#projectDescription').val();
			var date = jQuery('#datepicker').val();
			
			var members = [];
			var managers = [];
			
			for(var i = 1; i <= numMembers; i++){
				var tempMember = jQuery('#member' + i).val();
				members[i] = tempMember;
			}
			
			for(var i = 1; i <= numManagers; i++){
				var tempManager = jQuery('#manager' + i).val();
				managers[i] = tempManager;
			}
			
			var json = {numMembers : numMembers,
						numManagers : numManagers,
						members: members,
						managers, managers};
						
			jQuery.post('phpScripts/checkEmailsExistPHP.php', json, function(data){
				data = JSON.parse(data);
				
				var valid = true;
				var message = "";
				
				for(var i = 1; i <= numMembers; i++){
					if(!data['member' + i]){
						message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> No employee email exists for Member ' + i + '.<br>';
						valid = false;
					}
				}
				
				for(var i = 1; i <= numManagers; i++){
					if(!data['manager' + i]){
						message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> No Manager email exists for Manager ' + i + '.<br>';
						valid = false;
					}
				}
				
				if(!valid){
					jQuery('#alertBox').html(message);
					jQuery('#alertBox').show();
					jQuery(window).scrollTop(0);
				}
				else{
					//Commit new project to database.
					
					json = {projectName : projectName,
							description : description,
							date : date,
							numMembers : numMembers,
							numManagers : numManagers,
							members: members,
							managers, managers};
							
					jQuery.post('phpScripts/createProjectPHP.php', json, function(data){
						jQuery('#successModal').modal('show');
					})
				}
			});
		}
		else{
			window.scroll(0, 0);
		}
	});
});

function validateProject(){
	var valid = true;
	
	var numMembers = parseInt(jQuery('#numMembers').val());
	var numManagers = parseInt(jQuery('#numManagers').val());	
	var projectName = jQuery('#projectName').val();
	var description = jQuery('#projectDescription').val();
	var date = jQuery('#datepicker').val();
	
	var message = '';
	
	if(isEmpty(projectName)){
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Project Name is a required field.<br>';
		valid = false;
	}
	else if(projectName.length > 255){
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Project Name must be less than 255 characters.<br>';
		valid = false;
	}
	
	if(isEmpty(date)){
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Estimated Completion Date is a required field.<br>';
		valid = false;
	}
		
	for(var i = 1; i <= numMembers; i++){
		var tempMember = jQuery('#member' + i).val();
		
		if(isEmpty(tempMember)){
			message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Member ' + i + ' Email cannot be empty.<br>'; 
			valid = false;
		}
	}
	
	for(var i = 1; i <= numManagers; i++){
		var tempManager = jQuery('#manager' + i).val();
		
		if(isEmpty(tempManager)){
			message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Manager ' + i + ' Email cannot be empty.<br>'; 
			valid = false;
		}
	}
	
	if(!valid){
		jQuery('#alertBox').html(message);
        jQuery('#alertBox').show();
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

