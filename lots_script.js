$(document).ready(function(){
    var allLots = [];
    
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
                    var str = "";

                    for(var i in lots) {
                        //var lot = lots[i];
                        //str += lot['company'] + " " + lot['lot_num'] + "<br/>" + lot['address'] + "<br/>";
                        allLots.push(lots[i]);
                        //console.log(allLots[i].address);
                        var centerDiv = document.createElement("div");
                        centerDiv.id = allLots.length;
                        centerDiv.className = "centerdiv";

                        var leftDiv = document.createElement("div")
                        leftDiv.id = allLots.length;
                        leftDiv.className = "left";
                        
                        var results = document.createElement("div");
                        results.className = "results";
                        results.id = allLots.length;

                        $(leftDiv).append("Weekday Rates: "+allLots[i].rates_weekday+"/hr" + "<br/><br/>" +"Weekend Rates: "+allLots[i].rates_weekend+"/hr");
                        
                        $(centerDiv).append("<h3>"+ allLots[i].company +" "+ allLots[i].lot_num +"</h3><br/> "+ allLots[i].address);
                        
                        $(results).append(leftDiv);
                        $(results).append(centerDiv);
                        //var allResults = document.getElementById("allResults");
                        $(document.body).append(results);

                    }
                    //console.log(lots);
                    console.log(allLots);
                    var company = str;
                   
                    $("#resultList").text(resp['msg']);

                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }

        });
        
    }

});