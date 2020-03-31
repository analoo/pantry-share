var foodpantries = [{name: "APA Family", address: "50 RAYMOND (near San Bruno in Visitation Valley).", hours: "Fri 11am-3pm"},{name: "Bayview Opera House", address: "4705 THIRD STREET (at Newcomb in the Bayview)", hours: "Mon 10am-2pm"}, {name: "Bessie Carmichael", address: "375 7TH ST. (near Harrison in the SOMA District)", hours: "Th 10am-1pm"}, {name:"Cesar Chavez Elementary", address:"825 SHOTWELL (bet 22 & 23rd Sts in the Mission)", hours: "Tu 10am-1pm"},{name: "Francisco Middle School", address:"2190 POWELL (bet. Francisco and Chestnut in North Beach)", hours: "Th 10am-1pm"}, {name:"James Denman Middle School", address:"241 ONEIDA (at Otsego in the Excelsior)", hours:"Wed 10am-1pm"}, {name: "Lincoln High School", address:"2162 24TH AVE (bet Rivera and Quintara in the Sunset)", hours: "Fri 10am-1pm"}]

function displayFoodPantries(){
    $("#food-options").empty();
    var header = $("<h3>Find Food Here</h3>");
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