var foodpantries = [{name: "APA Family", address: "50 RAYMOND (near San Bruno in Visitation Valley).", hours: "Fri 11am-3pm"},{name: "Bayview Opera House", address: "4705 THIRD STREET (at Newcomb in the Bayview)", hours: "Mon 10am-2pm"}, {name: "Bessie Carmichael", address: "375 7TH ST. (near Harrison in the SOMA District)", hours: "Th 10am-1pm"}, {name:"Cesar Chavez Elementary", address:"825 SHOTWELL (bet 22 & 23rd Sts in the Mission)", hours: "Tu 10am-1pm"},{name: "Francisco Middle School", address:"2190 POWELL (bet. Francisco and Chestnut in North Beach)", hours: "Th 10am-1pm"}, {name:"James Denman Middle School", address:"241 ONEIDA (at Otsego in the Excelsior)", hours:"Wed 10am-1pm"}, {name: "Lincoln High School", address:"2162 24TH AVE (bet Rivera and Quintara in the Sunset)", hours: "Fri 10am-1pm"}]

// var list = 
    
     
   
    // Mission High School. 3750 18TH ST (bet Church
    // and Dolores in the Castro). Th 10am-1pm.
    // Rosa Parks Elem Sch. 2 HOLLIS (at Ellis in the
    // Western Addition). Wed 10am-1pm.
    // S.F. Rescue Mission. 140 TURK (bet. Taylor & Jones).
    // 415-441-1628. Pick up food M-Th 11:30am12:30pm. 6}];


function requestUserLocation(){

}

function displayFoodPantries(){
    $("#food-options").empty();
    var header = $("<h3>Below are the results of your search</h3>");
    $("#food-options").append(header);
    
    for (let i = 0; i < foodpantries.length ; i++){
        var div = $("<div id='pantry'></div>")
        $("#food-options").append(div);
        $(div).append("<p>"+foodpantries[i].name+"</p>")
        $(div).append("<p>"+foodpantries[i].address+"</p>")
        $(div).append("<p>"+foodpantries[i].hours+"</p>")


    }
  

}

displayFoodPantries()