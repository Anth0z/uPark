$(document).ready(function(){

    var allLots = [];
    $("#lotInfo").css("display", "none");
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

                        $(leftDiv).append("Weekday Rates: "+allLots[i].rates_weekday+"/hr" + "<br/><br/>" +"Weekend Rates: "+allLots[i].rates_weekend+"/hr");
                        
                        $(centerDiv).append("<h3>"+ allLots[i].company +" "+ allLots[i].lot_num +"</h3><br/> "+ allLots[i].address);

                        $(results).append(leftDiv);
                        $(results).append(centerDiv);
                        
                        $("#resultsList").append(results);
                        
                        console.log(allLots[i]);
                        
                    }
                    
                   
                    $(".results").click(function(){
                        console.log("click div"); 
                        console.log(this.id);
                        console.log(allLots);
                        console.log(allLots[this.id].company);
                        console.log(allLots[this.id]);
                        $("#resultsList").css("display", "none");
                        $("#lotInfo").css("display", "block");

                        $("#lotName").html(allLots[this.id].company + allLots[this.id].lot_num);
                        $("#lotAddress").html(allLots[this.id].address);
                        $("#lotCity").html(allLots[this.id].city);
                        $("#lotSpace").html(allLots[this.id].total_space);
                        $("#lotName").html(allLots[this.id].company);

                        $("#weekdayPrice").html(allLots[this.id].rates_weekday);
                        $("#weekendPrice").html(allLots[this.id].rates_weekend);

                        



                        //$("#lotInfo").append("<h2>"+allLots[this.id].company+" "+allLots[this.id].lot_num+"</h2>"+allLots[this.id].address+"<br/>"+allLots[this.id].city+" "+allLots[this.id].province);
                    });

                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    }
});