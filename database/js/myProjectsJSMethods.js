jQuery(document).ready(function(){
	jQuery('[id^="projectButton"]').bind('click', function(e){
		var pid = this.id.split("projectButton")[1];
		
		var json = {pid : pid}
		
		jQuery.post('phpScripts/goToProjectDetailsPHP.php', json, function(data){
			document.location.href = 'projectDetails.php';
		})
	});
});