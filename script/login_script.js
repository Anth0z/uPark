$(document).ready(function(){
	//loading main login page
	$("#eula").css("display", "none");
	$("#splash").delay(1000).fadeOut(1000);

	$("#login_button").click(function(){
		window.location.assign("index.html");
	});

	$("#signup_button").click(function(){
		window.location.assign("signup.html");
	});

	$("#signup_sub_button").click(function(){
		$("#bg1").fadeOut(500);
		$("#eula").delay(500).fadeIn(500);
		$("html").css("background-color", "rgb(244, 238, 162)");
	});

	$("#web").click(function(){
		alert("Stay tuned for our new website!");
	});

	$("#btncheck").click(function(){
		alert("Thank you for signing up! You can now login with your username and password");
		window.location.assign("login.html");
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