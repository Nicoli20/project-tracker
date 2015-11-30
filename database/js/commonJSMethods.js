function logout(){
	jQuery.post("phpScripts/logoutPHP.php", function(){
		document.location.href = "index.html";
	});
};