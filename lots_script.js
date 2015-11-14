$(document).ready(function(){
    var allLots = [];
    $("#lotInfo").css("display", "none");
    $("#backicon").css("display", "none");
    $("#directions").css("display", "none");
    getParkingLots();

    function getParkingLots(){
       $.ajax({
            url:"lots.php",
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
                        var n = d.getDay()

                        if (n==0 || n==6){
                            $(leftDiv).append("<h2>"+allLots[i].rates_weekend+"/hr</h2>");
                            $(centerDiv).append("<h3>Hours: "+allLots[i].hours_weekend);
                        } else {
                            $(leftDiv).append("<h2>"+allLots[i].rates_weekday+"/hr</h2>");
                            $(centerDiv).append("<h3>Hours: "+allLots[i].hours_weekday);
                        }
                        $(rightDiv).append("<h3>Availability: </h3><br/> 70%");

                        $(results).append(leftDiv);
                        $(results).append(centerDiv);
                        $(results).append(rightDiv);

                        $("#resultsList").append(results);
                        
                        console.log(allLots[i]);
                    }
                    
                   
                    $(".results").click(function(){
                        console.log(allLots[this.id]);

                        $("#resultsList").css("display", "none");
                        $("#lotInfo").css("display", "block");
                        $("#profileicon").css("display", "none");
                        $("#backicon").css("display", "inline-block");
                        $("#directions").css("display", "block");

                        $("#lotName").html(allLots[i].company +"   Lot "+ allLots[i].lot_num);
                        $("#lotAddress").html(allLots[this.id].address);
                        $("#lotCity").html(allLots[this.id].city);
                        $("#lotSpace").html(allLots[this.id].total_space);
                        

                        $("#weekdayPrice").html(allLots[this.id].rates_weekday);
                        $("#weekendPrice").html(allLots[this.id].rates_weekend);
                        $("#weekdayHours").html(allLots[this.id].hours_weekday);
                        $("#weekendHours").html(allLots[this.id].hours_weekend);

                        $(".topleft").click(function(){
                            $("#lotInfo").css("display", "none");
                            $("#resultsList").css("display", "block");
                        });
                    });

                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    }
});