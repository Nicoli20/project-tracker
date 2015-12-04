jQuery(document).ready(function(){
	
	var page = $("html, body");
	
	// Morris.Donut.prototype.resizeHandler = function () {
		// this.timeoutId = null;
		// if (this.el && this.el.width() > 0 && this.el.height() > 0) {
			// this.raphael.setSize(this.el.width(), this.el.height());
			// return this.redraw();
		// }
		// else return null;
	// };
	// Morris.Donut.prototype.setData = function (data) {
		// var row;
		// this.data = data;
		// this.values = (function () {
			// var _i, _len, _ref, _results;
			// _ref = this.data;
			// _results = [];
			// for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				// row = _ref[_i];
				// _results.push(parseFloat(row.value));
			// }
			// return _results;
		// }).call(this);
		// if (this.el && this.el.width() > 0 && this.el.height() > 0) {
			// return this.redraw();
		// }
		// else return null;
	// };
	Morris.Donut.prototype.setLabels = function(label1, label2) {
		var inner, maxHeightBottom, maxHeightTop, maxWidth, text1bbox, text1scale, text2bbox, text2scale;
		inner = (Math.min(this.el.width() / 2, this.el.height() / 2) - 10) * 2 / 3;
		maxWidth = 1.8 * inner;
		maxHeightTop = inner / 2;
		maxHeightBottom = inner / 3;
		this.text1.attr({
			text: label1,
			transform: ''
		});
		text1bbox = this.text1.getBBox();
		text1scale = Math.min(maxWidth / text1bbox.width, maxHeightTop / text1bbox.height);
		if (isNaN(text1scale) || text1scale == "-Infinity") {
			text1scale = "0.0";
		}
		this.text1.attr({
			transform: "S" + text1scale + "," + text1scale + "," + (text1bbox.x + text1bbox.width / 2) + "," + (text1bbox.y + text1bbox.height)
		});
		this.text2.attr({
			text: label2,
			transform: ''
		});
		text2bbox = this.text2.getBBox();
		text2scale = Math.min(maxWidth / text2bbox.width, maxHeightBottom / text2bbox.height);
		if (isNaN(text2scale) || text2scale == "-Infinity") {
			text2scale = "0.0";
		}
		var t = {
			transform: "S" + text2scale + "," + text2scale + "," + (text2bbox.x + text2bbox.width / 2) + "," + text2bbox.y
		};
		return this.text2.attr(t);
	};
	
	jQuery('#infoModalBody').on('click', '#editTaskButton', function(e){
		e.preventDefault();
		
		jQuery('#modalAlertBox').html("");
		jQuery('#modalAlertBox').hide();
		
		var originalDescription = jQuery('#hiddenTaskDescription').val();
		
		var descriptionTextArea = '<textarea id="taskDescriptionTextArea" rows="4" style="width:100%;">' + originalDescription + '</textarea>';
		
		jQuery('#taskDescriptionInfo').html(descriptionTextArea);
		
		var originalTaskHours = jQuery('#hiddenTaskHours').val();
		
		var taskHoursInputArea = '<input type="text" id="taskHoursInputArea" value="' + originalTaskHours + '">';
		
		jQuery('#taskHours').html(taskHoursInputArea);
		
		var newButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+ '<button type="button" class="btn btn-success" id="submitTaskButton">Submit</button>'
						+ '<button type="button" class="btn btn-danger" id="cancelTaskButton">Cancel</button>';
		
		jQuery('#modalButtonGroup').html(newButtons);
	});
	
	jQuery('#infoModalBody').on('click', '#editReqButton', function(e){
		e.preventDefault();
		
		jQuery('#modalAlertBox').html("");
		jQuery('#modalAlertBox').hide();
		
		var originalDescription = jQuery('#hiddenReqDescription').val();
		var originalDueDate = jQuery('#hiddenReqDate').val();
		
		var descriptionTextArea = '<textarea id="reqDescriptionTextArea" rows="4" style="width:100%;">' + originalDescription + '</textarea>';
		
		var dueDate = '<input type="text" class="form-control" id="reqDateEditPicker" value="' + originalDueDate + '">';
		
		jQuery('#reqDescriptionInfo').html(descriptionTextArea);
		jQuery('#reqDateInfo').html(dueDate);
		
		var newButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+ '<button type="button" class="btn btn-success" id="submitReqButton">Submit</button>'
						+ '<button type="button" class="btn btn-danger" id="cancelReqButton">Cancel</button>';
		
		jQuery('#modalButtonGroup').html(newButtons);
		
		jQuery('#reqDateEditPicker').datepicker({
			format: "mm/dd/yyyy",
			startDate: "today",
			autoclose: true
		});
	});
	
	jQuery('#infoModalBody').on('click', '#cancelTaskButton', function(e){
		e.preventDefault();
		
		jQuery('#modalAlertBox').html("");
		jQuery('#modalAlertBox').hide();
		
		var originalDescription = jQuery('#hiddenTaskDescription').val();
		var originalTaskHours = jQuery('#hiddenTaskHours').val();
		
		var originalDescription = 'Description: ' + originalDescription;
		var originalTaskHours = 'Estimated Hours Needed: ' + originalTaskHours;
		
		jQuery('#taskDescriptionInfo').html(originalDescription);
		
		jQuery('#taskHours').html(originalTaskHours);
		
		var newButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+ '<button type="button" class="btn btn-success" id="editTaskButton">Edit</button>'
						+ '<button type="button" class="btn btn-danger" id="deleteTaskButton">Delete</button>';
		
		jQuery('#modalButtonGroup').html(newButtons);
	});
	
	jQuery('#infoModalBody').on('click', '#cancelReqButton', function(e){
		e.preventDefault();
		
		jQuery('#modalAlertBox').html("");
		jQuery('#modalAlertBox').hide();
		
		var originalDescription = jQuery('#hiddenReqDescription').val();
		var originalDueDate = jQuery('#hiddenReqDate').val();
		
		jQuery('#reqDescriptionInfo').html("Description: " + originalDescription);
		jQuery('#reqDateInfo').html("Due Date: " + originalDueDate);
		
		var newButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+ '<button type="button" class="btn btn-success" id="editReqButton">Edit</button>'
						+ '<button type="button" class="btn btn-success" id="completeReqButton">Complete</button>'
						+ '<button type="button" class="btn btn-danger" id="deleteReqButton">Delete</button>';
		
		jQuery('#modalButtonGroup').html(newButtons);
	});
	
	jQuery('#infoModalBody').on('click', '#submitTaskButton', function(e){
		e.preventDefault();
		
		jQuery('#modalAlertBox').html("");
		jQuery('#modalAlertBox').hide();
		
		var valid = validateTaskEdit();
		
		if(valid){
			var newDescription = jQuery("#taskDescriptionTextArea").val();
			var newEstHours = jQuery("#taskHoursInputArea").val();
			var taskId = jQuery("#hiddenTaskId").val();
			
			var json = {newDescription : newDescription,
						newEstHours : newEstHours,
						taskId : taskId};
					
			jQuery.post('phpScripts/updateTaskPHP.php', json, function(data){
				jQuery('#hiddenTaskDescription').val(newDescription);
				jQuery('#hiddenTaskHours').val(newEstHours);
				
				jQuery('#taskDescriptionInfo').html("Description: " + newDescription);
				jQuery('#taskHours').html("Estimated Hours Needed: " + newEstHours);
				
				var newButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+ '<button type="button" class="btn btn-success" id="editTaskButton">Edit</button>'
						+ '<button type="button" class="btn btn-danger" id="deleteTaskButton">Delete</button>';
		
				jQuery('#modalButtonGroup').html(newButtons);
			});
		}
	});
	
	jQuery('#infoModalBody').on('click', '#submitReqButton', function(e){
		e.preventDefault();
		
		jQuery('#modalAlertBox').html("");
		jQuery('#modalAlertBox').hide();
		
		var valid = validateReqEdit();
		
		if(valid){
			var newDescription = jQuery('#reqDescriptionTextArea').val();
			var newDate = jQuery('#reqDateEditPicker').val();
			var reqId = jQuery('#hiddenReqId').val();
			
			var json = {newDescription : newDescription,
						newDate : newDate,
						reqId : reqId};
						
			jQuery.post('phpScripts/updateRequirementPHP.php', json, function(data){
				jQuery('#hiddenReqDescription').val(newDescription);
				jQuery('#hiddenReqDate').val(newDate);
				
				jQuery('#reqDescriptionInfo').html('Description: ' + newDescription);
				jQuery('#reqDateInfo').html("Due Date: " + newDate);
				
				var newButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
						+ '<button type="button" class="btn btn-success" id="editReqButton">Edit</button>'
						+ '<button type="button" class="btn btn-danger" id="deleteReqButton">Delete</button>';
		
				jQuery('#modalButtonGroup').html(newButtons);
			});
		}
	});
	
	jQuery('#infoModalBody').on('click', '#deleteTaskButton', function(e){
		e.preventDefault();
		
		var modalLabel = "Delete Task";
		var modalBody = "<p>Are you sure you want to delete this task? This action cannot be undone. Click Confirm to delete this task or click Cancel to keep this task.</p>";
		var btnGroup = '<div class="btn-group" id="modalButtonGroup">'
							+ '<button type="button" class="btn btn-success" data-dismiss="modal" id="confirmTaskButton">Confirm</button>'
							+ '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>'
						+ '</div>';
						
		jQuery('#confirmModalLabel').html(modalLabel);
		jQuery('#confirmModalBody').html(modalBody + btnGroup);
		jQuery('#confirmModal').modal('show');
	});
	
	jQuery('#infoModalBody').on('click', '#deleteReqButton', function(e){
		e.preventDefault();
		
		var modalLabel = "Delete Requirement";
		var modalBody = "<p>Are you sure you want to delete this requirement? This action will also delete all the tasks associated to it. This action cannot be undone. Click Confirm to delete this requirement or click Cancel to keep this requirement.</p>";
		var btnGroup = '<div class="btn-group" id="modalButtonGroup">'
						+ '<button type="button" class="btn btn-success" data-dismiss="modal" id="confirmReqButton">Confirm</button>'
						+ '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>'
					 + '</div>';
					
		jQuery('#confirmModalLabel').html(modalLabel);
		jQuery('#confirmModalBody').html(modalBody + btnGroup);
		jQuery('#confirmModal').modal('show');
	});
	
	jQuery('#infoModalBody').on('click', '#completeReqButton', function(e){
		e.preventDefault();

		var reqId = jQuery('#hiddenReqId').val();
		
		var json = {"rid" : reqId};
		
		jQuery.post('phpScripts/checkAllTasksCompletePHP.php', json, function(data){
			data = JSON.parse(data);
			
			if(data.ready){
				var modalLabel = "Complete Requirement";
				var modalBody = "<p>Are you sure you want to complete this requirement? This action cannot be undone. Click Confirm to complete this requirement or click Cancel to keep this requirement in progress.</p>";
				var btnGroup = '<div class="btn-group" id="modalButtonGroup">'
								+ '<button type="button" class="btn btn-success" data-dismiss="modal" id="completeReq">Confirm</button>'
								+ '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>'
							 + '</div>';
							
				jQuery('#confirmModalLabel').html(modalLabel);
				jQuery('#confirmModalBody').html(modalBody + btnGroup);
				jQuery('#confirmModal').modal('show');
				
				jQuery('#completeReq').bind('click', function(e){
					e.preventDefault();
					
					var reqId = jQuery('#hiddenReqId').val();
		
					var json = {"rid" : reqId};
					
					jQuery.post('phpScripts/completeRequirementPHP.php', json, function(){
						jQuery('#infoModal').modal('hide');
						location.reload();
						jQuery('#viewProjectTreeButton').click();
					});
				});
			}
			else{
				if(data.hasTasks){
					var modalLabel = "Requirement not ready.";
					var modalBody = "<p>This requirement still has tasks that are in progress. A requirement cannot be completed until all of its task are completed. Click Ok to proceed.</p>";
					var btnGroup = '<div class="btn-group" id="modalButtonGroup">'
									+ '<button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>'
								 + '</div>';
								
					jQuery('#confirmModalLabel').html(modalLabel);
					jQuery('#confirmModalBody').html(modalBody + btnGroup);
					jQuery('#confirmModal').modal('show');
				}
				else{
					var modalLabel = "Requirement not ready.";
					var modalBody = "<p>This requirement has no tasks associated to it. You can either add tasks to the requirement or just delete the requirement. Click Ok to proceed.</p>";
					var btnGroup = '<div class="btn-group" id="modalButtonGroup">'
									+ '<button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>'
								 + '</div>';
								
					jQuery('#confirmModalLabel').html(modalLabel);
					jQuery('#confirmModalBody').html(modalBody + btnGroup);
					jQuery('#confirmModal').modal('show');
				}	
			}
		});
		
	});
	
	jQuery('#confirmModalBody').on('click', '#confirmTaskButton', function(e){
		e.preventDefault();
		
		var taskId = jQuery('#hiddenTaskId').val();
		
		var json = {taskId : taskId};
		
		jQuery.post('phpScripts/deleteTaskPHP.php', json, function(data){
			jQuery('#infoModal').modal('hide');
			jQuery('#viewProjectTreeButton').click();
		});
	});
	
	jQuery('#confirmModalBody').on('click', '#confirmReqButton', function(e){
		e.preventDefault();
		
		var reqId = jQuery('#hiddenReqId').val();
		
		var json = {reqId : reqId};
		
		jQuery.post('phpScripts/deleteRequirementPHP.php', json, function(data){
			jQuery('#infoModal').modal('hide');
			jQuery('#viewProjectTreeButton').click();
		});
	});
	
	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
       page.stop();
	});
	
	jQuery('#successModal').on('hidden.bs.modal', function(e){
		e.preventDefault();
		
		jQuery('#dynamicContent').html("");
		
		page.animate({scrollTop: 0}, 500);
		
		location.reload();
	});
	
	jQuery('#infoModal').on('hidden.bs.modal', function(e){
		e.preventDefault();
		
		jQuery('#infoModalBody').html("");
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
				options = '<select class="form-control" id="assocReq" disabled="disabled"><option selected="selected">No requirements found.</option></select>'; 
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

	jQuery('#createCommitButton').bind('click', function(e){
		e.preventDefault();
		
		jQuery('#alertBox').hide();
		
		jQuery.post('phpScripts/getAssignedTasksPHP.php', function(data){
			data = JSON.parse(data);
			
			var options = "";
			
			if(data.tasksExist){
				options = '<option selected="selected">Pick a task...</option>';
				
				var i = 0;
				while(data[i] != null){
					options = options + '<option value="' + data[i].tid + '">' + data[i].name + '</option>';
					i++;
				}
			}
			else{
				options = '<option selected="selected" disabled="disabled">No assigned tasks found.</option>';
			}
			
			var dynamicHTML = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'Create Commit'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="assignedTasks" class="col-lg-3 control-label">*Task:</label>'
														+ '<div class="col-lg-9">'
															+ '<select id="assignedTasks" class="form-control">'
																+ options
															+ '</select>'
														+ '</div>'
													+ '</div>'
												+ '</div>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="estimatedHours" class="col-lg-3 control-label">Estimated Total Hours Needed:</label>'
														+ '<div class="col-lg-9">'
															+ '<input type="text" disabled="disabled" id="estimatedHours" class="form-control">'
														+ '</div>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="currentHoursCommited" class="col-lg-3 control-label">*Current Hours Commited:</label>'
														+ '<div class="col-lg-9">'
															+ '<input type="text" disabled="disabled" id="currentHoursCommited" class="form-control">'
														+ '</div>'
													+ '</div>'
													+ '<div class="col-lg-6">'
														+ '<label for="hoursToCommit" class="col-lg-3 control-label">*Hours Committed:</label>'
														+ '<div class="col-lg-9">'
															+ '<input type="text" id="hoursToCommit" class="form-control">'
														+ '</div>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-12">'
														+ '<label for="commitDescription" class="col-lg-1 control-label" style="padding-right:75px;">*Description:</label>'
														+ '<div class="col-lg-11">'
															+ '<textarea class="form-control" id="commitDescription" rows="5" style="resize:vertical;" placeholder="Write a brief description of this commit."></textarea>'
														+ '</div>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-12">'
														+ '<button class="btn btn-primary pull-right" id="createCommit">Create</button>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
							
			jQuery('#dynamicContent').html(dynamicHTML);
			
			jQuery('#assignedTasks').change(function(){
				var task = jQuery('#' + this.id + ' option:selected').text();
				
				if(task != 'Pick a task...'){
					var taskId = jQuery('#' + this.id + ' option:selected').val();
					
					var json = {taskId : taskId};
					
					jQuery.post('phpScripts/getHoursFromTaskPHP.php', json, function(data){
						data = JSON.parse(data);
						
						jQuery('#currentHoursCommited').val(data.hoursCommitted);
						jQuery('#estimatedHours').val(data.estHours);
					});
				}
			});
			
			jQuery('#createCommit').bind('click', function(e){
				e.preventDefault();
				
				jQuery('#alertBox').html("");
				jQuery('#alertBox').hide();
				
				var valid = validateCommit();
				
				if(valid){
					var taskId = jQuery('#assignedTasks option:selected').val();
					var hoursToCommit = jQuery('#hoursToCommit').val();
					var description = jQuery('#commitDescription').val();
					
					var json = {"tid" : taskId,
								"hours" : hoursToCommit,
								"description" : description};
							
					jQuery.post('phpScripts/createCommitPHP.php', json, function(data){
						jQuery('#successModal').modal('show');
					
						var modalLabel = "Commit created!";
						var modalBody = "Your commit has been created. The hours you committed will be added to the total hours for this task. Click OK to proceed.";
						
						jQuery("#myModalLabel").html(modalLabel);
						jQuery("#myModalBody").html(modalBody);
					})
				}
			});
			
			page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
				page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
			});
		});
	});
	
	jQuery("#assignTaskButton").bind('click', function(e){
		e.preventDefault();
		
		jQuery('#alertBox').hide();
		
		jQuery.post('phpScripts/getRequirementsListPHP.php', function(data){
			data = JSON.parse(data);
			
			var options = "";
			
			if(data.requirementsExist){
				options = '<select class="form-control" id="assignAssocReq">'
							+ '<option selected="selected">Pick a requirement...</option>';
				for(var i = 0; i < data.numReqs; i++){
					
					options = options + '<option value="' + data[i].rid + '">' + data[i].name + '</option>';
				}
							
				options = options + '</select>';
			}
			else{
				options = '<select class="form-control" id="assignAssocReq" disabled="disabled"><option selected="selected">No requirements found.</option></select>'; 
			}
			
			var dynamicContent = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'Assign Task'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="assignAssocReq" class="col-lg-3 control-label">*Requirement:</label>'
														+ '<div class="col-lg-9">'
															+ options
														+ '</div>'
													+ '</div>'
												+ '</div>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="taskSelect" class="col-lg-3 control-label">*Task:</label>'
														+ '<div class="col-lg-9">'
															+ '<select class="form-control" id="taskSelect" disabled="disabled">'
																+ '<option selected="selected">No requirement selected.</option>'
															+ '</select>'
														+ '</div>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="taskRole" class="col-lg-3 control-label">*Role:</label>'
														+ '<div class="col-lg-9">'
															+ '<select class="form-control" id="taskRole">'
															+ '</select>'
														+ '</div>'
													+ '</div>'
													+ '<div class="col-lg-6">'
														+ '<label for="memberList" class="col-lg-3 control-label">*Assignee:</label>'
														+ '<div class="col-lg-9">'
															+ '<select class="form-control" id="memberList">'
															+ '</select>'
														+ '</div>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-12">'
														+ '<button class="btn btn-primary pull-right" id="assignTask">Create</button>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
							
			jQuery('#dynamicContent').html(dynamicContent);
			
			page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
				page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
			});
			
			jQuery('#assignTask').bind('click', function(e){
				e.preventDefault();

				jQuery('#alertBox').html("");
				jQuery('#alertBox').hide();
				
				var valid = validateAssignTask();
				
				if(valid){
					var taskSelectId = jQuery('#taskSelect option:selected').val();
					var taskRoleId = jQuery('#taskRole option:selected').val();
					var memberListId = jQuery('#memberList option:selected').val();
					
					var json = {"taskId" : taskSelectId,
								"roleId" : taskRoleId,
								"uid" : memberListId};
								
					jQuery.post('phpScripts/assignTaskPHP.php', json, function(data){
						data = JSON.parse(data);
						
						if(data.notAssigned){
							jQuery('#successModal').modal('show');
					
							var modalLabel = "Task assignment successful!";
							var modalBody = "The task has been assigned to the specified member. They can now add commits to their assigned task. Click OK to proceed.";
							
							jQuery("#myModalLabel").html(modalLabel);
							jQuery("#myModalBody").html(modalBody);
						}
						else{
							message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> This member is already assigned to this task.';
							
							jQuery('#alertBox').html(message);
							jQuery('#alertBox').show();
						}
					});
				}
			});
			
			jQuery.post('phpScripts/getUserRolesPHP.php', function(data){
				data = JSON.parse(data);
				
				var options = '<option selected="selected">Pick a role...</option>';
				
				for(var i = 0; i < data.numRoles; i++){
					options = options + '<option value="' + data[i].roleId + '">' + data[i].name + '</option>';
				}
				
				jQuery('#taskRole').html(options);
			});
			
			jQuery.post('phpScripts/getMemberListPHP.php', function(data){
				data = JSON.parse(data);
				
				var options = '<option selected="selected">Pick an assignee...</option><option disabled="disabled">Managers</option>';
				
				var i = 0;
				
				while(data[i] != null && data[i].userLevel == 1){
					options = options + '<option value="' + data[i].uid + '">' + data[i].firstname + ' ' + data[i].lastname + '</option>';
					i++;
				}
					
				options = options + '<option disabled="disabled">Members</option>';
				
				while(data[i] != null){
					options = options + '<option value="' + data[i].uid + '">'  + data[i].firstname + ' ' + data[i].lastname + '</option>';
					i++;
				}
				
				jQuery('#memberList').html(options);
				
			});
			
			jQuery('#assignAssocReq').change(function(){
				var req = jQuery('#' + this.id + ' option:selected').text();
				
				if(req != 'Pick a requirement...'){
					var reqId = jQuery('#' + this.id + ' option:selected').val();
					
					var json = {reqId : reqId};
					
					jQuery.post('phpScripts/getTasksFromRequirementPHP.php', json, function(data){
						data = JSON.parse(data);
						
						var options = "";
			
						jQuery('#taskSelect').attr('disabled', 'disabled');
			
						if(data.tasksExist){
							options = '<option selected="selected">Select a task...</option>';
							for(var i = 0; i < data.numTasks; i++){
								
								options = options + '<option value="' + data[i].tid + '">' + data[i].name + '</option>';
							}
										
							options = options + '</select>';
							
							jQuery('#taskSelect').removeAttr('disabled');
						}
						else{
							options = '<option selected="selected">No tasks found.</option>';	
						}
						
						jQuery('#taskSelect').html(options);
					});
				}
				else{
					var options = '<option selected="selected">No requirement selected.</option>';
					
					jQuery('#taskSelect').html(options);
					jQuery('#taskSelect').attr('disabled', 'disabled');
				}
			});
		});
	});
	
	jQuery('#viewProjectTreeButton').bind('click', function(e){
		e.preventDefault();
		
		var dynamicHTML = '<div class="col-lg-12"><div class="panel panel-default"><div class="panel-heading">Project Tree</div><div class="panel-body">';
		
		var dynamicHTMLEndTags = '</div></div></div>';

		jQuery.post('phpScripts/generateProjectTreePHP.php', function(data){
			data = JSON.parse(data);
			
			var html = dynamicHTML + data.html + dynamicHTMLEndTags;
			
			jQuery('#dynamicContent').html(html);
			
			jQuery('#completeProjectButton').bind('click', function(e){
				var modalLabel = "Complete Project";
				var modalBody = "<p>Are you sure you want to complete this project? This action cannot be undone. Click Confirm to complete this project or click Cancel to keep this project in progress.</p>";
				var btnGroup = '<div class="btn-group" id="modalButtonGroup">'
									+ '<button type="button" class="btn btn-success" data-dismiss="modal" id="completeProject">Confirm</button>'
									+ '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>'
								+ '</div>';
								
				jQuery('#confirmModalLabel').html(modalLabel);
				jQuery('#confirmModalBody').html(modalBody + btnGroup);
				jQuery('#confirmModal').modal('show');
				
				jQuery('#completeProject').bind('click', function(e){
					e.preventDefault();
					
					jQuery.post('phpScripts/completeProjectPHP.php', function(data){
						window.location = 'myProjects.php';
					});
				})
			})
			
			if(data.numReqs != 0){
				jQuery('.tree-2').treegrid({
					expanderExpandedClass: 'glyphicon glyphicon-minus',
					expanderCollapsedClass: 'glyphicon glyphicon-plus',
					initialState: 'collapsed'
				});
			}
			
			jQuery('#dynamicContent').on('click', '.treebtn', function(e){
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
					
					var alertBox = '<div class="row">'
										+	'<div class="col-sm-12">'
										+		'<div class="alert alert-danger" id="modalAlertBox" style="display:none;"></div>'
										+	'</div>'
										+'</div>';
					
					if(type == "requirement"){
						var html = '<div class="container-fluid">'
								+ '<input type="hidden" id="hiddenReqId" value="' + id + '">'
								+ '<div class="row">'
									+ '<div class="col-lg-12">'
										+ '<p id="reqDescriptionInfo">Description: ' + data.description + '</p>'
										+ '<input type="hidden" id="hiddenReqDescription" value="' + data.description + '">'
									+ '</div>'
									+ '<div class="col-lg-12">'
										+ '<p id="reqDateInfo">Due Date: ' + data.dueDate + '</p>'
										+ '<input type="hidden" id="hiddenReqDate" value="' + data.dueDate + '">'
									+ '</div>'
									+ '<div class="col-lg-12">'
										+ '<p>Status: ' + status + '</p>'
									+ '</div>'
								 + '</div>'
								 + '<div class="row">'
										+ '<div class="btn-group" id="modalButtonGroup">'
											+ '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
											if(data.userLevel == 1){
												if(status != "Completed"){
													html = html +  '<button type="button" class="btn btn-success" id="editReqButton">Edit</button>';
													html = html + '<button type="button" class="btn btn-success" id="completeReqButton">Complete</button>';
												}
												else{
													html = html +  '<button type="button" class="btn btn-success" id="editReqButton">Edit</button>';
												}
												html = html + '<button type="button" class="btn btn-danger" id="deleteReqButton">Delete</button>';
											}
										html = html + '</div>'
								 + '</div>'
								 + '</div>';
								 
						jQuery('#infoModalBody').html(alertBox + html);
						
						jQuery('#infoModal').modal('show');
					}
					else{
						var html = '<div class="container-fluid">'
								+ '<input type="hidden" id="hiddenTaskId" value="' + id + '">'
								+ '<div class="row">'
									+ '<div class="col-lg-12">'
										+ '<p id="taskDescriptionInfo">Description: ' + data.description + '</p>'
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
											+ '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
											if(data.userLevel == 1){
												if(status != "Completed"){
													html = html +  '<button type="button" class="btn btn-success" id="editReqButton">Edit</button>';
												}
												html = html + '<button type="button" class="btn btn-danger" id="deleteTaskButton">Delete</button>';
											}
										html = html + '</div>'
								 + '</div>'
								 + '</div>';
								 
						jQuery('#infoModalBody').html(alertBox + html);
						
						jQuery('#infoModal').modal('show');
					}
					
				});
			});
			
			page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
				page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
			});
		});
	})
	
	jQuery("#createDefectButton").bind('click', function(e){
		e.preventDefault();
		
		var dynamicHTML = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'Create Defect'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<label for="defectName" class="col-lg-3 control-label">*Defect Name:</label>'
													+ '<div class="col-lg-12">'
														+ '<input type="text" id="defectName" class="form-control" placeholder="Briefly identify the defect.">'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<label for="defectDescription" class="col-lg-3 control-label">*Defect Description:</label>'
													+ '<div class="col-lg-12">'
														+ '<textarea class="form-control" id="defectDescription" rows="4" placeholder="Describe the defect."></textarea>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<label for="recreateDescription" class="col-lg-3 control-label">*Steps to Reproduce:</label>'
													+ '<div class="col-lg-12">'
														+ '<textarea class="form-control" id="recreateDescription" rows="4" placeholder="Provide steps to reproduce the defect."></textarea>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<label for="resolutionDescription" class="col-lg-3 control-label">Steps to Resolve:</label>'
													+ '<div class="col-lg-12">'
														+ '<textarea class="form-control" id="resolutionDescription" rows="4" placeholder="Provide steps to fix the defect, if possible."></textarea>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-10">'
													+ '</div>'
													+ '<div class="col-lg-1">'
														+ '<button class="btn btn-primary" id="createDefect">Create Defect</button>'
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
		
		jQuery('#createDefect').bind('click', function(e){
			e.preventDefault();
			
			jQuery('#alertBox').html("");
			jQuery('#alertBox').hide();
			
			var valid = validateDefect();
			
			if(valid){
				var defectName = jQuery('#defectName').val();
				var defectDescription = jQuery('#defectDescription').val();
				var recreateDescription = jQuery('#recreateDescription').val();
				var resolutionDescription = jQuery('#resolutionDescription').val();
				
				var json = {"defectName" : defectName,
							"defectDescription" : defectDescription,
							"recreateDescription" : recreateDescription,
							"resolutionDescription" : resolutionDescription};
							
				jQuery.post('phpScripts/createDefectPHP.php', json, function(data){
					jQuery('#successModal').modal('show');
					
					var modalLabel = "Defect creation successful!";
					var modalBody = "The defect has been created and can now be assigned to be resolved. Click on the Assign Defect button to assign defects. Click OK to proceed.";
					
					jQuery("#myModalLabel").html(modalLabel);
					jQuery("#myModalBody").html(modalBody);
				});
			}
		});
	});
	
	jQuery('#assignDefectButton').bind('click', function(e){
		e.preventDefault();
		
		var dynamicHTML = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'Assign Defect'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-6">'
														+ '<label for="defectSelect" class="col-lg-3 control-label">*Defect:</label>'
														+ '<select id="defectSelect" class="form-control">'
														+ '</select>'
													+ '</div>'
													+ '<div class="col-lg-6">'
														+ '<label for="defectAssignee" class="col-lg-3 control-label">*Assignee:</label>'
														+ '<select id="defectAssignee" class="form-control">'
														+ '</select>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-10"></div>'
													+ '<div class="col-lg-1">'
														+ '<button class="btn btn-primary" id="assignDefect">Assign</button>'
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
		
		jQuery.post('phpScripts/getMemberListPHP.php', function(data){
			data = JSON.parse(data);
			
			var options = '<option selected="selected">Pick an assignee...</option><option disabled="disabled">Managers</options>';
			
			var i = 0;
			
			while(data[i].userLevel == 1){
				options = options + '<option value="' + data[i].uid + '">' + data[i].firstname + ' ' + data[i].lastname + '</option>';
				i++;
			}
			
			options = options + '<option disabled="disabled">Members</option>';
			
			while(data[i] != null){
				options = options + '<option value="' + data[i].uid + '">'  + data[i].firstname + ' ' + data[i].lastname + '</option>';
				i++;
			}
			
			jQuery('#defectAssignee').html(options);
			
		});
		
		jQuery.post('phpScripts/getDefectListPHP.php', function(data){
			data = JSON.parse(data);
			
			var i = 0;
			
			var options = '<option selected="selected">Pick a defect...</option>';
			
			while(data[i] != null){
				options = options + '<option value="' + data[i].did + '">' + data[i].name + '</option>';
				i++;
			}
			
			if(i == 0){
				options = '<option selected="selected" disabled="disabled">No defects found...</option>';
			}
			
			jQuery("#defectSelect").html(options);
		});
		
		jQuery('#assignDefect').bind('click', function(e){
			e.preventDefault();
			
			jQuery('#alertBox').html("");
			jQuery('#alertBox').hide();
			
			var defectName = jQuery('#defectSelect option:selected').text();
			var defectAssignee = jQuery('#defectAssignee option:selected').text();
			
			var valid = true;
			var message = "";
			
			if(defectName == "Pick a defect..." || defectName == 'No defects found...'){
				valid = false;
				message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Defect is a required field.<br>';
			}
			
			if(defectAssignee == 'Pick an assignee...'){
				valid = false;
				message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Assignee is a required field.<br>';
			}
			
			if(valid){
				var did = jQuery('#defectSelect option:selected').val();
				var uid = jQuery('#defectAssignee option:selected').val();
				
				var json = {did : did,
							uid : uid};
							
				jQuery.post('phpScripts/assignDefectPHP.php', json, function(data){
					var modalLabel = "Defect assigned!";
					var modalBody = "The defect has successfully been assigned to the specified user. Click Ok to proceed.";
					
					jQuery("#myModalLabel").html(modalLabel);
					jQuery("#myModalBody").html(modalBody);
					
					jQuery('#successModal').modal('show');
				});
			}
			else{
				jQuery('#alertBox').html(message);
				jQuery('#alertBox').show();
			}
			
			
		});
	});
	
	jQuery('#viewCommits').bind('click', function(e){
		e.preventDefault();
		
		var dynamicHTML = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'Commits'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="table-responsive">'
											+ '<table class="table table-hover table-condensed striped" id="commitsTable">'
												+ '<thead>'
													+ '<tr>'
														+ '<th class="text-center">User</th>'
														+ '<th class="text-center">Task</th>'
														+ '<th class="text-center">Hours Committed</th>'
														+ '<th class="text-center">Description</th>'
														+ '<th class="text-center">Date (Year-Month-Day)</th>'
													+ '</tr>'
												+ '</thead>'
												+ '<tbody id="commitsBody">'
												+ '</tbody>'
											+ '</table>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
							
		jQuery('#dynamicContent').html(dynamicHTML);
		
		page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
			page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
		});
		
		jQuery.post('phpScripts/getAllCommitsPHP.php', function(data){
			data = JSON.parse(data);
			
			var i = 0;
			var rows = "";
			
			while(data[i] != null){
				rows = rows + '<tr>' 
								+ '<td class="text-center">'+ data[i].firstname + ' ' + data[i].lastname + '</td>'
								+ '<td class="text-center">' + data[i].task + '</td>'
								+ '<td class="text-center">' + data[i].hoursCommitted + '</td>'
								+ '<td class="text-center">' + data[i].description + '</td>'
								+ '<td class="text-center">' + data[i].date + '</td>'
							+ '</tr>';
				i++;
			}
			
			if(i == 0){
				rows = '<tr><td></td><td></td><td>No commits found.</td><td></td><td></td>';
			}
			
			jQuery('#commitsBody').html(rows);
			
		})
	});
	
	jQuery('#viewMyDefects').bind('click', function(e){
		e.preventDefault();
		
		var dynamicHTML = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'My Defects'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="table-responsive">'
											+ '<table class="table table-hover striped" id="myTasksTable">'
												+ '<thead>'
													+ '<tr>'
														+ '<th class="text-center">Actions</th>'
														+ '<th class="text-center">Defect Name</th>'
														+ '<th class="text-center">Description</th>'
														+ '<th class="text-center">Steps to Reproduce</th>'
														+ '<th class="text-center">Steps to Resolve</th>'
													+ '</tr>'
												+ '</thead>'
												+ '<tbody id="myDefectsBody">'
												+ '</tbody>'
											+ '</table>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
							
		jQuery('#dynamicContent').html(dynamicHTML);
		
		page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
			page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
		});
		
		jQuery.post('phpScripts/generateMyDefectsPHP.php', function(data){
			data = JSON.parse(data);
			
			var i = 0;
			var rows = "";
			
			while(data[i] != null){
				rows = rows + '<tr>' 
								+ '<td>'
									+ '<div class="btn-group" id="defectButtonGroup">'
										+ '<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Actions <span class="caret"></span></button>'
										+ '<ul class="dropdown-menu defectComplete">'
											+ '<li><a href="#" id="completeDefectButton" value="' + data[i].did + '">Complete</a></li>'
										+ '</ul>'
									+ '</div>'
								+ '</td>'
								+ '<td>' + data[i].name + '</td>'
								+ '<td>' + data[i].description + '</td>'
								+ '<td>' + data[i].recreateDescription + '</td>'
								+ '<td>' + data[i].resolutionDescription + '</td>'
							+ '</tr>';
				i++;
			}
			
			if(i == 0){
				rows = '<tr><td></td><td></td><td>No defects found.</td><td></td><td></td>';
			}
			
			jQuery('#myDefectsBody').html(rows);
			
			jQuery(".defectComplete").on('click', '#completeDefectButton', function(e){
				e.preventDefault();
				
				var did = jQuery(this).attr('value');
				
				var modalLabel = "Complete Defect";
				var modalBody = "<p>Are you sure you want to complete this defect? This action cannot be undone. Click Confirm to complete this defect or click Cancel to keep this defect in progress.</p>";
				var btnGroup = '<div class="btn-group" id="completeDefectConfirm">'
									+ '<button type="button" class="btn btn-success" data-dismiss="modal" id="completeDefect" value="' + did + '">Confirm</button>'
									+ '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>'
								+ '</div>';
								
				jQuery('#confirmModalLabel').html(modalLabel);
				jQuery('#confirmModalBody').html(modalBody + btnGroup);
				jQuery('#confirmModal').modal('show');
				
				jQuery('#completeDefectConfirm').on('click', '#completeDefect', function(e){
					e.preventDefault();
					
					var did = jQuery(this).val();
					
					var json = {"did" : did};
					
					jQuery.post('phpScripts/completeDefectPHP.php', json, function(data){
						location.reload();
					});
				});
			});
		});
	});
	
	jQuery('#viewMyTasks').bind('click', function(e){
		e.preventDefault();
		
		var dynamicHTML = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'My Tasks'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="table-responsive">'
											+ '<table class="table table-hover striped" id="myTasksTable">'
												+ '<thead>'
													+ '<tr>'
														+ '<th class="text-center">Actions</th>'
														+ '<th class="text-center">Associated Requirement</th>'
														+ '<th class="text-center">Task Name</th>'
														+ '<th class="text-center">Task Description</th>'
														+ '<th class="text-center">My Committed Hours</th>'
														+ '<th class="text-center">Total Committed Hours</th>'
														+ '<th class="text-center">Estimated Hours Needed</th>'
													+ '</tr>'
												+ '</thead>'
												+ '<tbody id="myTasksBody">'
												+ '</tbody>'
											+ '</table>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
							
		jQuery('#dynamicContent').html(dynamicHTML);
		
		page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
			page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
		});
		
		jQuery.post('phpScripts/generateMyTasksInfoPHP.php', function(data){
			data = JSON.parse(data);
			
			var i = 0;
			
			var rows = "";
			
			while(data[i] != null){
				var shortDescription = "";
				
				if(data[i].description.length > 100){
					shortDescription = data[i].description.substr(0, 100) + "...";
				}
				else{
					shortDescription = data[i].description;
				}
				rows = rows + '<tr>' 
								+ '<td>'
									+ '<div class="btn-group">'
										+ '<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Actions <span class="caret"></span></button>'
										+ '<ul class="dropdown-menu taskActions">'
											+ '<input type="hidden" id="hiddenTotalCommits' + data[i].tid + '" value="' + data[i].totalHours + '">'
											+ '<li><a href="#" id="completeTaskButton" value="' + data[i].tid + '">Complete</a></li>'
											+ '<li><a href="#" id="viewStatsButton" value="' + data[i].tid + '">View Stats</a></li>'
										+ '</ul>'
									+ '</div>'
								+ '</td>'
								+ '<td>' + data[i].reqName + '</td>'
								+ '<td>' + data[i].taskName + '</td>'
								+ '<td>' + shortDescription + '</td>'
								+ '<td class="text-center">' + data[i].hoursCommitted + '</td>'
								+ '<td class="text-center">' + data[i].totalHours + '</td>'
								+ '<td class="text-center">' + data[i].estHours + '</td>'
							+ '</tr>';
				i++;
			}
			
			if(i == 0){
				rows = '<tr class="text-center"><td></td><td></td><td></td><td>No tasks found.<td></tr>';
			}
			
			jQuery('#myTasksBody').html(rows);
			
			jQuery(".taskActions").on('click', '#completeTaskButton', function(e){
				e.preventDefault();
				
				var taskId = jQuery(this).attr('value');
				
				var modalLabel = "Complete Task";
				var modalBody = "<p>Are you sure you want to complete this task? This action cannot be undone. Click Confirm to complete this task or click Cancel to keep this task in progress.</p>";
				var btnGroup = '<div class="btn-group" id="modalButtonGroup">'
									+ '<button type="button" class="btn btn-success" data-dismiss="modal" id="completeTask" value="' + taskId + '">Confirm</button>'
									+ '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>'
								+ '</div>';
								
				jQuery('#confirmModalLabel').html(modalLabel);
				jQuery('#confirmModalBody').html(modalBody + btnGroup);
				jQuery('#confirmModal').modal('show');
				
				jQuery('#modalButtonGroup').on('click', '#completeTask', function(e){
					e.preventDefault();
					
					var taskId = jQuery(this).val();
					
					var json = {"tid" : taskId};
					
					jQuery.post('phpScripts/completeTaskPHP.php', json, function(){
						location.reload();
					});
				});
			});
			
			jQuery("ul.dropdown-menu").on('click', '#viewStatsButton', function(e){
				e.preventDefault();
				
				jQuery('#chartError').html("");
				
				var taskId = jQuery(this).attr('value');
				
				var json = {"tid" : taskId};
				
				var totalHours = jQuery('#hiddenTotalCommits' + taskId).val();
				
				if(totalHours > 0){
					jQuery.post('phpScripts/generateDonutChartPHP.php', json, function(data1){
						var donutResults = JSON.parse(data1);
						
						jQuery.post('phpScripts/generateLineChartPHP.php', json, function(data2){
							jQuery('#chartContent').show();
							
							var lineResults = JSON.parse(data2);
							
							var i = 0;
							var donutData = [];
							
							while(donutResults[i] != null){
								donutData.push({label: donutResults[i].firstname + ' ' + donutResults[i].lastname, value: donutResults[i].hoursCommitted});
								i++;
							}
							
							jQuery('#chartArea').html("");
							
							Morris.Donut({
								element: 'chartArea',
								data: donutData,
								formatter: function (y, data) { return y + ' hours'}
							});
							
							jQuery('#chartLabel').html("View Stats");
							
							var info = '<div class="col-lg-12"><p class="text-center">Total Commit Breakdown per Member</p></div>';
							
							jQuery('#chartAreaBefore').html(info);
							
							i = 0;
							
							jQuery('#chartArea2').html("");
							
							var info2 = '<div class="col-lg-12"><p class="text-center">Commits per Week</p></div>';
							
							jQuery('#chartArea2Before').html(info2);
							
							var lineData = [];
							
							while(lineResults[i] != null){
								lineData.push({week : lineResults[i].week_name, a: lineResults[i].numCommits});
								i++;
							}
							
							Morris.Line({
								element: 'chartArea2',
								data: lineData,
								xkey: "week",
								ykeys: "a",
								labels: ["Number of Commits"]
							})
											
							page.animate({scrollTop: jQuery('#chartContent').offset().top}, 'slow', function(){
								page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
							});	
						});
					});
				}
				else{
					jQuery('#chartLabel').html("View Stats");
					jQuery('#chartError').html('<p class="text-center">No commits have occured against this task.</p>');
					
					page.animate({scrollTop: jQuery('#chartContent').offset().top}, 'slow', function(){
						page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
					});
					
					jQuery('#chartContent').show();
				}		
			})
		});	
	});

	jQuery('#closeChartsButton').bind('click', function(e){
		e.preventDefault();
		
		jQuery('#chartContent').hide();
		jQuery('#chartAreaBefore').html("");
		jQuery('#chartArea').html("");
		jQuery('#chartArea2Before').html("");
		jQuery('#chartArea2').html("");
		jQuery('#chartError').html("");
	});
	
	jQuery('#createAlertButton').bind('click', function(e){
		e.preventDefault();
		
		var dynamicHtml = '<div class="col-lg-12">'
								+ '<div class="panel panel-default">'
									+ '<div class="panel-heading">'
										+ 'Create Alert'
									+ '</div>'
									+ '<div class="panel-body">'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<label for="alertTitle" class="col-lg-4 control-label">*Alert Title:</label>'
													+ '<div class="col-lg-12">'
														+ '<input type="text" class="form-control" id="alertTitle" placeholder="Alert Title">'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<label for="alertDescription" class="col-lg-4 control-label">*Description:</label>'
													+ '<div class="col-lg-12">'
														+ '<textarea class="form-control" id="alertDescription" rows="5"></textarea>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
										+ '<div class="row">'
											+ '<form>'
												+ '<div class="form-group">'
													+ '<div class="col-lg-10">'
													+ '</div>'
													+ '<div class="col-lg-1">'
														+ '<button class="btn btn-primary" id="createAlert">Create Alert</button>'
													+ '</div>'
												+ '</div>'
											+ '</form>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
							
		jQuery('#dynamicContent').html(dynamicHtml);
				
		page.animate({scrollTop: jQuery('#dynamicContent').offset().top}, 'slow', function(){
			page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
		});	
		
		jQuery('#createAlert').bind('click', function(e){
			e.preventDefault();
			
			jQuery('#alertBox').html("");
			jQuery('#alertBox').hide();
			
			var valid = true;
			var message = "";
			
			var alertName = jQuery('#alertTitle').val();
			var alertDescription = jQuery('#alertDescription').val();
			
			if(isEmpty(alertName)){
				valid = false;
				message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Alert Title is a required field.<br>';
			}
			else if(alertName.length > 255){
				valid = false;
				message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Alert Title must be less than 255 characters.<br>';
			}
			
			if(isEmpty(alertDescription)){
				valid = false;
				message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Alert Description.<br>';
			}			
			
			if(valid){
				var json = {"name" : name,
							"description" : description};
			}
			else{
				jQuery('#alertBox').html(message);
				jQuery('#alertBox').show();
			}
		})
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

function validateTaskEdit(){
	var valid = true;
	var message = "";
	var newDescription = jQuery("#taskDescriptionTextArea").val();
	var newEstHours = jQuery("#taskHoursInputArea").val();
	
	var intRegex = /^[1-9][0-9]{0,2}$/;
	
	if(isEmpty(newDescription)){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Task Description is a required field.<br>';
	}
	
	if(isEmpty(newEstHours)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Estimated Hours Needed is a required field.<br>';
	}
	else if(!intRegex.test(newEstHours)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Estimated Hours Needed must be an integer between 1 and 999.<br>';
	}
	
	if(!valid){
		jQuery('#modalAlertBox').html(message);
		jQuery('#modalAlertBox').show();
	}
	
	return valid;
};

function validateReqEdit(){
	var valid = true;
	var message = "";
	
	var reqDescriptionTextArea = jQuery('#reqDescriptionTextArea').val();
	var reqDateEditPicker = jQuery('#reqDateEditPicker').val();
	
	if(isEmpty(reqDescriptionTextArea)){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Requirement Description is a required field.<br>'; 
	}
	
	if(isEmpty(reqDateEditPicker)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Due Date is a required field.<br>';
	}
	
	if(!valid){
		jQuery('#modalAlertBox').html(message);
		jQuery('#modalAlertBox').show();
	}
	
	return valid;
};

function validateAssignTask(){
	var valid = true;
	var message = "";
	
	var assignAssocReq = jQuery('#assignAssocReq option:selected').text();
	var taskSelect = jQuery('#taskSelect option:selected').text();
	var taskRole = jQuery('#taskRole option:selected').text();
	var memberList = jQuery('#memberList option:selected').text();
	
	if(assignAssocReq == "Pick a requirement..."){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Requirement is a required field.<br>';
	}
	
	if(taskSelect == "No requirement selected." || taskSelect == "Select a task..."){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Task is a required field.<br>';
	}
	
	if(taskRole == "Pick a role..."){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Role is a required field.<br>';
	}
	
	if(memberList == "Pick an assignee..."){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Assignee is a required field.<br>';
	}
	
	if(!valid){
		jQuery('#alertBox').html(message);
		jQuery('#alertBox').show();
	}
	
	return valid;
};

function validateCommit(){
	var valid = true;
	var message = "";
	
	var task = jQuery('#' + this.id + ' option:selected').text();
	var hoursToCommit = jQuery('#hoursToCommit').val();
	var description = jQuery('#commitDescription').val();
	
	var numRegex = /^(0(\.[1-9])|([1-9](\.\d{0,1})?)|10(\.0)?)$/;
	
	if(task == "Pick a task..." || task == "No assigned tasks found."){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Task is a required field.<br>';
	}
	
	if(isEmpty(hoursToCommit)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Hours Committed is a required field.<br>';
	}
	else if(!numRegex.test(hoursToCommit)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> A commit must be a number between 0.1 and 10.0 (inclusive) and can only have one decimal place precision.<br>';
	}
	
	if(isEmpty(description)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Description is a required field.<br>';
	}
	
	if(!valid){
		jQuery('#alertBox').html(message);
		jQuery('#alertBox').show();
	}
	
	return valid;
}

function validateDefect(){
	var valid = true;
	var message = "";
	
	var defectName = jQuery('#defectName').val();
	var defectDescription = jQuery('#defectDescription').val();
	var recreateDescription = jQuery('#recreateDescription').val();
	
	if(isEmpty(defectName)){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Defect Name is a required field.<br>';
	}
	else if(defectName.length > 255){
		valid = false;
		message = '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Defect Name must be less than 255 characters.<br>';
	}
	
	if(isEmpty(defectDescription)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Defect Description is a required field.<br>';
	}
	
	if(isEmpty(recreateDescription)){
		valid = false;
		message = message + '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Steps to Reproduce is a required field.<br>';
	}
	
	if(!valid){
		jQuery('#alertBox').html(message);
		jQuery('#alertBox').show();
	}
	
	return valid;
}

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

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

(function() {
  // hold onto the drop down menu                                             
  var dropdownMenu;

  // and when you show it, move it to the body                                     
  $(window).on('show.bs.dropdown', function(e) {

    // grab the menu        
    dropdownMenu = $(e.target).find('.dropdown-menu');

    // detach it and append it to the body
    $('body').append(dropdownMenu.detach());   

    // grab the new offset position
    var eOffset = $(e.target).offset();

    // make sure to place it where it would normally go (this could be improved)
    dropdownMenu.css({
        'display': 'block',
        'top': eOffset.top + $(e.target).outerHeight(),
        'left': eOffset.left
    });                                                
  });

  // and when you hide it, reattach the drop down, and hide it normally                                                   
  $(window).on('hide.bs.dropdown', function(e) {        
    $(e.target).append(dropdownMenu.detach());        
    dropdownMenu.hide();                              
  });                                                   
})(); 

