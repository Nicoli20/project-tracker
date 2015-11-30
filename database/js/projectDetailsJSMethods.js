jQuery(document).ready(function(){
	
	var page = $("html, body");
	
	jQuery('#infoModalBody').on('click', '#editTaskButton', function(e){
		e.preventDefault();
		
		var originalDescription = jQuery('#hiddenTaskDescription').val();
		
		var descriptionTextArea = '<textarea id="taskDescriptionTextArea" rows="4" style="width:100%;">' + originalDescription + '</textarea>';
		
		jQuery('#taskDescription').html(descriptionTextArea);
		
		var originalTaskHours = jQuery('#hiddenTaskHours').val();
		
		var taskHoursInputArea = '<input type="text" id="taskHoursInputArea" value="' + originalTaskHours + '">';
		
		jQuery('#taskHours').html(taskHoursInputArea);
		
		var newButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+ '<button type="button" class="btn btn-success" id="submitTaskButton">Submit</button>'
						+ '<button type="button" class="btn btn-danger" id="cancelTaskButton">Cancel</button>'
		
		jQuery('#modalButtonGroup').html(newButtons);
	});
	
	jQuery('#infoModalBody').on('click', '#cancelTaskButton', function(e){
		var originalDescription = jQuery('#hiddenTaskDescription').val();
		var originalTaskHours = jQuery('#hiddenTaskHours').val();
		
		var originalDescription = 'Description: ' + originalDescription;
		var originalTaskHours = 'Estimated Hours Needed: ' + originalTaskHours;
		
		jQuery('#taskDescription').html(originalDescription);
		
		jQuery('#taskHours').html(originalTaskHours);
		
		var newButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+ '<button type="button" class="btn btn-success" id="editTaskButton">Edit</button>'
						+ '<button type="button" class="btn btn-danger" id="cancelTaskButton">Cancel</button>'
		
		jQuery('#modalButtonGroup').html(newButtons);
		
	});
	
	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
       page.stop();
	});
	
	jQuery('#successModal').on('hidden.bs.modal', function(e){
		e.preventDefault();
		
		jQuery('#dynamicContent').html("");
		
		page.animate({scrollTop: 0}, 500);
	});
	
	jQuery('#createTaskButton').bind('click', function(e){
		e.preventDefault();
		
		jQuery('#alertBox').hide();
		
		jQuery.post('phpScripts/getRequirementsListPHP.php', function(data){
			data = JSON.parse(data);
			
			var options = "";
			
			if(data.requirementsExist){
				options = '<select class="form-control" id="assocReq">'
							+ '<option selected="selected">Pick a requirement...</option>';
				for(var i = 0; i < data.numReqs; i++){
					
					options = options + '<option value="' + data[i].rid + '">' + data[i].name + '</option>';
				}
							
				options = options + '</select>';
			}
			else{
				options = '<select class="form-control" id="assocReq" disabled="disabled"><option selected="selected">No requirements found.</option></selected>'; 
			}
			
			var dynamicHTML = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'Create Task'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="assocReq" class="col-lg-4 control-label">*Associated Requirement:</label>'
														+ '<div class="col-lg-8">'
															+ options	
														+ '</div>'
													+ '</div>'
												+ '</div>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="taskName" class="col-lg-3 control-label">*Task Name:</label>'
														+ '<div class="col-lg-9">'
															+ '<input type="text" class="form-control" id="taskName" placeholder="Task Name">'
														+ '</div>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="estHours" class="col-lg-4 control-label">*Estimated Hours Needed:</label>'
														+ '<div class="col-lg-5">'
															+ '<input type="text" class="form-control" id="estHours">'
														+ '</div>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-12">'
														+ '<label for="taskDescription" class="col-lg-2 control-label">*Description:</label>'
														+ '<div class="col-lg-10">'
															+ '<textarea class="form-control" id="taskDescription" rows="5" style="resize:vertical;" placeholder="Write a brief description of this task."></textarea>'
														+ '</div>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-12">'
														+ '<button class="btn btn-primary pull-right" id="createTask">Create</button>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
							
			jQuery('#dynamicContent').html(dynamicHTML);
					
			page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
				page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
			});
			
			jQuery('#createTask').bind('click', function(e){
				e.preventDefault();
				
				jQuery('#alertBox').hide();
				
				var valid = validateTask();
				
				if(valid){
					var assocRid = jQuery('#assocReq option:selected').attr("value");
					var taskName = jQuery('#taskName').val();
					var estHours = jQuery('#estHours').val();
					var taskDescription = jQuery('#taskDescription').val();
					
					var json = {assocRid : assocRid,
								taskName : taskName,
								estHours : estHours,
								taskDescription : taskDescription};
								
					jQuery.post('phpScripts/createTaskPHP.php', json, function(data){
						var uniqueTaskName = JSON.parse(data);
						
						if(uniqueTaskName){
							jQuery('#successModal').modal('show');
					
							var modalLabel = "Task created!";
							var modalBody = "Your task has been created. Employees can be assigned to tasks in order to create commits against a specific task to which they are assigned. Click the Assign Task button to begin handing out tasks. Click Ok to proceed.";
							
							jQuery("#myModalLabel").html(modalLabel);
							jQuery("#myModalBody").html(modalBody);
						}
						else{
							var message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Task Name already exists for the associated requirement.';
							jQuery('#alertBox').html(message);
							jQuery('#alertBox').show();
						}
					});
				}
			});
		});
	});
	
	jQuery("#createRequirementButton").bind('click', function(e){
		
		e.preventDefault();
		
		jQuery('#alertBox').hide();
		
		var dynamicHTML = '<div class="col-lg-12">'
							+ '<div class="panel panel-default">'
								+ '<div class="panel-heading">'
									+ 'Create Requirement'
								+ '</div>'
								+ '<div class="panel-body">'
									+ '<div class="row">'
										+ '<form>'
											+ '<div class="form-group">'
												+ '<div class="col-lg-6">'
													+ '<label for="reqName" class="col-lg-2 control-label">*Name:</label>'
													+ '<div class="col-lg-9">'
														+ '<input type="text" class="form-control" id="reqName" placeholder="Requirement Name">'
													+ '</div>'
												+ '</div>'
											+ '</div>'
											+ '<div class="form-group">'
												+ '<div class="col-lg-6">'
													+ '<label for="reqDatePicker" class="col-lg-2 control-label">*Due Date:</label>'
													+ '<div class="col-lg-5">'
														+ '<input type="text" class="form-control" id="reqDatePicker">'
													+ '</div>'
												+ '</div>'
											+ '</div>'
										+ '</form>'
									+ '</div>'
									+ '<div class="row">'
										+ '<form>'
											+ '<div class="form-group">'
												+ '<div class="col-lg-12">'
													+ '<label for="reqDescription" class="col-lg-1 control-label">*Description:</label>'
													+ '<div class="col-lg-10">'
														+ '<textarea class="form-control" id="reqDescription" rows="5" style="resize:vertical;" placeholder="Write a brief description of this requirement."></textarea>'
													+ '</div>'
												+ '</div>'
											+ '</div>'
										+ '</form>'
									+ '</div>'
									+ '<div class="row">'
										+ '<form>'
											+ '<div class="form-group">'
												+ '<div class="col-lg-11">'
													+ '<button class="btn btn-primary pull-right" id="createReqButton">Create</button>'
												+ '</div>'
											+ '</div>'
										+ '</form>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
						+ '</div>';
						
		jQuery('#dynamicContent').html(dynamicHTML);
		
				
		page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
			page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
		});
		
		jQuery('#reqDatePicker').datepicker({
			format: "mm/dd/yyyy",
			startDate: "today",
			autoclose: true
		});
		
		jQuery('#createReqButton').bind('click', function(e){
			e.preventDefault();
			
			jQuery('#alertBox').hide();
			
			var valid = validateRequirement();
			
			if(valid){
				var reqName = jQuery('#reqName').val();
				var reqDate = jQuery('#reqDatePicker').val();
				var reqDescription = jQuery('#reqDescription').val();
				
				var json = {reqName : reqName,
							reqDate : reqDate,
							reqDescription : reqDescription};
							
				jQuery.post('phpScripts/createRequirementPHP.php', json, function(data){
					var uniqueName = JSON.parse(data);
					
					if(uniqueName){
						jQuery('#successModal').modal('show');
					
						var modalLabel = "Requirement created!";
						var modalBody = "Your requirement has been created. A requirement won't be useful until it has tasks associated to it, so be sure to add some tasks now by clicking the Create Task button under My Actions. Click OK to proceed.";
						
						jQuery("#myModalLabel").html(modalLabel);
						jQuery("#myModalBody").html(modalBody);
					}
					else{
						var message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Requirement Name already exists.';
						jQuery('#alertBox').html(message);
						jQuery('#alertBox').show();
					}
				});
			}
		});
	})

	jQuery('#viewProjectTreeButton').bind('click', function(e){
		e.preventDefault();
		
		var dynamicHTML = '<div class="col-lg-12"><div class="panel panel-default"><div class="panel-heading">Project Tree</div><div class="panel-body">';
		
		var dynamicHTMLEndTags = '</div></div></div>';

		jQuery.post('phpScripts/generateProjectTreePHP.php', function(data){
			data = JSON.parse(data);
			
			var html = dynamicHTML + data.html + dynamicHTMLEndTags;
			
			jQuery('#dynamicContent').html(html);
			
			if(data.numReqs != 0){
				jQuery('.tree-2').treegrid({
					expanderExpandedClass: 'glyphicon glyphicon-minus',
					expanderCollapsedClass: 'glyphicon glyphicon-plus',
					initialState: 'collapsed'
				});
			}
			
			jQuery('#dynamicContent').on('click', '.btn', function(e){
				e.preventDefault();
				
				var type = this.id.split("SPLIT")[0];
				var id = this.id.split("SPLIT")[1];
				
				var json = {type : type,
							id : id};
				
				jQuery.post('phpScripts/generateMoreInfoPHP.php', json, function(data){
					data = JSON.parse(data);
					
					jQuery('#infoModalLabel').html(data.name);
						
						var status = "";
						
						if(data.completed == 0){
							status = "In Progress";
						}
						else{
							status = "Completed";
						}
					
					if(type == "requirement"){
						var html = '<div class="container-fluid">'
								+ '<div class="row">'
									+ '<div class="col-lg-12">'
										+ '<p id="reqDescription">Description: ' + data.description + '</p>'
									+ '</div>'
									+ '<div class="col-lg-12">'
										+ '<p id="reqDate">Due Date: ' + data.dueDate + '</p>'
									+ '</div>'
									+ '<div class="col-lg-12">'
										+ '<p>Status: ' + status + '</p>'
									+ '</div>'
								 + '</div>'
								 + '<div class="row">'
										+ '<div class="btn-group">'
											+ '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
											+ '<button type="button" class="btn btn-success" id="editReqButton">Edit</button>'
											+ '<button type="button" class="btn btn-danger">Delete</button>'
										+ '</div>'
								 + '</div>'
								 + '</div>';
								 
						jQuery('#infoModalBody').html(html);
						
						jQuery('#infoModal').modal('show');
					}
					else{
						var html = '<div class="container-fluid">'
								+ '<div class="row">'
									+ '<div class="col-lg-12">'
										+ '<p id="taskDescription">Description: ' + data.description + '</p>'
										+ '<input type="hidden" id="hiddenTaskDescription" value="' + data.description + '">'
									+ '</div>'
									+ '<div class="col-lg-12">'
										+ '<p id="taskHours">Estimated Hours Needed: ' + data.estHours + '</p>'
										+ '<input type="hidden" id="hiddenTaskHours" value="' + data.estHours + '">'
									+ '</div>'
									+ '<div class="col-lg-12">'
										+ '<p>Status: ' + status + '</p>'
									+ '</div>'
								 + '</div>'
								 + '<div class="row">'
										+ '<div class="btn-group" id="modalButtonGroup">'
											+ '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
											+ '<button type="button" class="btn btn-success" id="editTaskButton">Edit</button>'
											+ '<button type="button" class="btn btn-danger">Delete</button>'
										+ '</div>'
								 + '</div>'
								 + '</div>';
								 
						jQuery('#infoModalBody').html(html);
						
						jQuery('#infoModal').modal('show');
					}
					
				});
			});
			
			page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
				page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
			});
		});
	})
});

function validateRequirement(){
	var valid = true;
	
	var reqName = jQuery('#reqName').val();
	var reqDate = jQuery('#reqDatePicker').val();
	var reqDescription = jQuery('#reqDescription').val();
	
	var message = "";
	
	if(isEmpty(reqName)){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Requirement Name is a required field.<br>';
	}
	else if(reqName.length > 255){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Requirement Name must be less than 255 characters.<br>';
	}
	
	if(isEmpty(reqDate)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Due Date is a required field.<br>';
	}
	
	if(isEmpty(reqDescription)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Requirement Description is a required field.';
	}
	
	if(!valid){
		jQuery('#alertBox').html(message);
		jQuery('#alertBox').show();
	}
	
	return valid;
}

function validateTask(){
	var valid = true;
	
	var assocReq = jQuery('#assocReq').val();
	var taskName = jQuery('#taskName').val();
	var estHours = jQuery('#estHours').val();
	var taskDescription = jQuery('#taskDescription').val();
	
	var intRegex = /^[1-9][0-9]{0,2}$/;
	
	var message = "";
	
	if(assocReq == "Pick a requirement..."){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> You must associate this task to a requirement.<br>';
	}
	
	if(isEmpty(taskName)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Task Name is a required field.<br>';
	}
	else if(taskName.length > 255){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Task Name must be less than 255 characters.<br>';
	}
	
	if(isEmpty(estHours)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Estimated Hours Needed is a required field.<br>'
	}
	else if(!intRegex.test(estHours)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Estimated Hours Needed must be an integer between 1 and 999.<br>';
	}
	
	if(isEmpty(taskDescription)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Task Description is a required field.<br>';
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

/**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */
$(function() {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });
});