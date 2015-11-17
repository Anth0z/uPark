$(document).ready(function(){
	//loading main login page
	$("#eula").css("display", "none");
	$("#splash").delay(1000).fadeOut(1000);
    
    //PROFILE PAGE
    //checking to see if there's already a session
    //for profile page - get username and favourites
    $("#favlotInfo").css("display", "none");
    getUserProfileInfo();
	function getUserProfileInfo() {
        $.ajax({
            url: "./server/get_session.php",
            type: "GET",
            dataType: "JSON",
            //data: {}, // could use this to ask for specific pieces of information (e.g., user profile, friends list, etc)
            success: function(resultData) {
                console.log("Session GET returned: ", resultData);

                var status = resultData['status'];
                if(status == 'success') {

                    //window.location.assign("results.html");
                    var username = resultData['username'];
                    var picture = resultData['picture'];
                    $("#profileImageInsert").attr("src", picture);
                    $("#userWelcome").html("Welcome back, " + username + "!");
                
                    getFavs();
                } 
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    }
    //profile page - list out favourites
	var allLots = [];

	function getFavs(){
		$.ajax({
            url:"./server/fav.php",
            type:"GET",
            dataType:"JSON",
            data:{type: "JSON"},
            success: function(resp){
                console.log("Connection Successful", resp);
                var status = resp['status'];
                if(status == 'success') {
                    var favs = resp['favs'];
                    console.log(favs);
                    for(var i in favs) {
                    	var fav = document.createElement("div");
                        fav.className = "fav";
                        fav.id = favs[i].upark_id;
                        //console.log(favs[i].upark_id);
                        fav.innerHTML = favs[i].company + " Lot " + favs[i].lot_num;

                        $(fav).css("background-image", "url('./images/EasyPark_27.jpg')");
                        $(fav).css("background-size", "cover");
                       
                        $("#favList").append(fav);
                        //i need to select user id base on session    
                    }

                    getParkingLots();
                    function getParkingLots(){
                       $.ajax({
                            url:"./server/lots.php",
                            type:"GET",
                            dataType:"JSON",
                            data:{type: "JSON"},
                            success: function(resp2){
                                console.log("Connection Successful", resp2);
                                var status = resp2['status'];
                                if(status == 'success') {
                                    var lots = resp2['lots'];
                                    console.log(lots);
                                    for(var i in lots) {
                                        console.log(lots[i]);
                                        allLots.push(lots[i]);
                                        console.log(allLots);
                                    }
                                }
                            
                                $(".fav").click(function(){
                                    console.log("fav lot clicked");
                                    
                                    $("#pro_div").css("display", "none");
                                    $("#favlotInfo").css("display", "block");
                                    

                                    $("#lotName").html(allLots[this.id].company +"   Lot "+ allLots[this.id].lot_num);
                                    $("#lotAddress").html(allLots[this.id].address);
                                    $("#lotCity").html(allLots[this.id].city);
                                    $("#lotSpace").html(allLots[this.id].total_space);
                                    

                                    $("#weekdayPrice").html(allLots[this.id].rates_weekday);
                                    $("#weekendPrice").html(allLots[this.id].rates_weekend);
                                    $("#weekdayHours").html(allLots[this.id].hours_weekday);
                                    $("#weekendHours").html(allLots[this.id].hours_weekend);

                                    $(".topleft").click(function(){
                                        window.location.assign("profile.html");
                                    });
                                    
                                });
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR.statusText, textStatus);
                            }
                        });
                    }  
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    }

	//log out from profile page
	$("#logoutbutton").click(function() {
        var sendData = {logout: "true"};
        console.log("Logout data to send: ", sendData);

        $.ajax({
            url: "./server/logout_session.php",
            type: "POST",
            dataType: "JSON",
            data: sendData,
            success: function(data) {
                console.log("Logout data returned: ", data);
                var status = data['status'];
                if(status == 'fail') {
                    window.location.assign("profile.html");

                } else {
                    window.location.assign("index.html");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR.statusText, textStatus, errorThrown);
                console.log(jqXHR.statusText, textStatus);
            }
        });

        // from: http://www.developerdrive.com/2013/04/turning-a-form-element-into-json-and-submiting-it-via-jquery/
        function ConvertFormToJSON(form){
            var array = $(form).serializeArray();
            var json = {};

            jQuery.each(array, function() {
                // don't send 'undefined'
                json[this.name] = this.value || '';
            });
            return json;
        }

    });

    //login check
	$("#login_button").click(function(){
		var formData = ConvertFormToJSON("#loginForm");
        console.log("Login data to send: ", formData);
		$.ajax({
            url:"./server/login_session.php",
            type:"POST",
            dataType:"JSON",
            data:formData,
            success: function(data){
                console.log("Connection Successful", data);
                var status = data['status'];
                if(status == 'fail') {
                    alert("Please try again.");
                } else {
                    getUserProfileInfo();
                    window.location.assign("results.html");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
        function ConvertFormToJSON(form){
	        var array = $(form).serializeArray();
	        var json = {};
	        jQuery.each(array, function() {
	            // don't send 'undefined'
	            json[this.name] = this.value || '';
	        });
	        return json;
	    }
	});
//go to sign up page
	$("#signup_button").click(function(){
		window.location.assign("signup.html");
	});

	$("#signup_sub_button").click(function(){
		$("#bg1").fadeOut(500);
		$("#eula").delay(500).fadeIn(500);
		$("html").css("background-color", "rgb(211, 236, 248)");
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
	$(".topleft").click(function(){
		window.location.assign("results.html");
	});


});