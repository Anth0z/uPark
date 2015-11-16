$(document).ready(function(){
	//loading main login page
	$("#splash").delay(1000).fadeOut(1000);

	$("#login_button").click(function(){
		window.location.assign("index.html");
		console.log("go to index");
	});


	//submit reset email
	$("#resetButton").click(function(){
		alert("Please check your email for a link to reset your password");
		window.location.assign("createNewPassword.html");
	});

	//submit new password
	$("#createButton").click(function(){
		alert("Your password has been reset. Please login with your new password");
		window.location.assign("login.html");
	});

});