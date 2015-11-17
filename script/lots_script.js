//$(document).ready(function(){
    var allLots = [];
    var infoWindows = [];
    var globalMarkers = [];
    $("#lotInfo").css("display", "none");
    $("#backicon").css("display", "none");
    $("#directions").css("display", "none");
    getParkingLots();

    function initMap(){
        console.log(google);
        var presetLoc = {lat:49.2756, lng:-123.1208};

        var map = new google.maps.Map(document.getElementById("map"),
            {
                center:presetLoc,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }                             
        );
        
        var geoInfoWindow = new google.maps.InfoWindow({
            map: map
        });
        //var lotInfoWindow = new google.maps.InfoWindow();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                geoInfoWindow.setPosition(pos);
                geoInfoWindow.setContent('Your current location');
                map.setCenter(pos);
            }, 
            function() {
                handleLocationError(true, map.getCenter());
            });
        } else {
            handleLocationError(false, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            geoInfoWindow.setPosition(presentLoc);
            geoInfoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
        }


        var infoWindow = new google.maps.InfoWindow({
            map: map
        });
        for(var i = 0; i<allLots.length; i++){
            var lat = allLots[i].latitude;
            var lng = allLots[i].longitude;
            var latLng = new google.maps.LatLng(lat, lng);
            
            var lotMarkers = new google.maps.Marker({
                position:
                    latLng
                ,
                map: map,
                title: "Lot Marker" 
            });


            var markerInfo = "<div><h1>" + allLots[i].company + "</h1>" + allLots[i].address + "<br>" + allLots[i].city + ", " + allLots[i].province + "<br> PayByPhone Lot #" + allLots[i].paybyphone_id + "</div>";
            //console.log(markerInfo);
            
            bindInfoWindow(lotMarkers, map, infoWindow, markerInfo);
            
            
            //console.log(lotInfoWindow);  
        }
        
        function bindInfoWindow(lotMarkers, map, infoWindow, markerInfo){
            google.maps.event.addListener(lotMarkers, 'click', function(){
                if (infoWindow) {
                    infoWindow.close();
                    console.log("it was clicked!");
                }
                
                //infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent(markerInfo);
                infoWindow.open(map, lotMarkers);
                //console.log("it was clicked!");
            });
            }
            infoWindows.push(markerInfo);

        //search box
        var input = document.getElementById("searchBar");
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
        });
        var searchMarkers = [];

        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            searchMarkers.forEach(function(marker) {
                marker.setMap(null);
            });
            searchMarkers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

              // Create a marker for each place.
              searchMarkers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
              }));

              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map.fitBounds(bounds);
        });
    };



    function getParkingLots(){
       $.ajax({
            url:"./server/lots.php",
            type:"GET",
            dataType:"JSON",
            data:{type: "JSON"},
            success: function(resp){
                console.log("Connection Successful", resp);
                var status = resp['status'];
                if(status == 'success') {
                    var lots = resp['lots'];
                    for(var i in lots) {
                        allLots.push(lots[i]);

                        var centerDiv = document.createElement("div");
                        centerDiv.className = "centerdiv";
                        var leftDiv = document.createElement("div")
                        leftDiv.className = "left";                        
                        var rightDiv = document.createElement("div")
                        rightDiv.className = "right";
                        var results = document.createElement("div");
                        results.className = "results";
                        results.id = allLots[i].upark_id;

                        $(centerDiv).append("<h2>"+ allLots[i].company +"   Lot "+ allLots[i].lot_num +"</h2> "+ allLots[i].address+"<br/>"+allLots[i].city);

                        var d = new Date();
                        var n = d.getDay();

                        var availPercent = allLots[i].avail_space / allLots[i].total_space *100;
                        var result = Math.trunc(availPercent);
                        
                        var availColor = document.createElement("div");
                        availColor.setAttribute('id', 'availColor');
                        console.log(availColor);
                        
                        if (availPercent <= 33){
                            availColor.setAttribute('style', 'background-color: red;');   
                        } else if (availPercent >=67) {
                            availColor.setAttribute('style', 'background-color: rgb(0, 230, 0);');   
                        }

                        if (n==0 || n==6){
                            $(leftDiv).append("<h2>"+allLots[i].rates_weekend+"/hr</h2>");
                            $(centerDiv).append("<h3>Hours: "+allLots[i].hours_weekend);
                        } else {
                            $(leftDiv).append("<h2>"+allLots[i].rates_weekday+"/hr</h2>");
                            $(centerDiv).append("<h3>Hours: "+allLots[i].hours_weekday);
                        }
                        $(rightDiv).append("<h3>Availability: </h3><br/>"+ result +"% Vacant");
                        $(rightDiv).append(availColor);

                        $(results).append(leftDiv);
                        $(results).append(centerDiv);
                        $(results).append(rightDiv);

                        $("#resultsList").append(results);
                        
                        //console.log(allLots[i]);
                    }
                    
                   
                    $(".results").click(function(){
                        console.log(allLots[this.id]);

                        $("#resultsList").css("display", "none");
                        $("#resultStatus").css("display", "none");
                        $("#lotInfo").css("display", "block");
                        $("#profileicon").css("display", "none");
                        $("#backicon").css("display", "inline-block");
                        $("#directions").css("display", "block");

                        $("#lotName").html(allLots[this.id].company +"   Lot "+ allLots[this.id].lot_num);
                        $("#lotAddress").html(allLots[this.id].address);
                        $("#lotCity").html(allLots[this.id].city);
                        $("#lotSpace").html(allLots[this.id].total_space);
                        

                        $("#weekdayPrice").html(allLots[this.id].rates_weekday);
                        $("#weekendPrice").html(allLots[this.id].rates_weekend);
                        $("#weekdayHours").html(allLots[this.id].hours_weekday);
                        $("#weekendHours").html(allLots[this.id].hours_weekend);

                        $("#directions").click(function(){
                            alert("Directions coming soon!");
                        });

                        $("#startTimer").click(function(){
                            alert("Parking Timer coming soon!");
                        });

                        $(".topleft").click(function(){
                            $("#lotInfo").css("display", "none");
                            $("#resultsList").css("display", "block");
                            $("#backicon").css("display", "none");
                            $("#profileicon").css("display", "block");
                            $("#resultStatus").css("display", "block");
                        });




                    });

                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    }
//});