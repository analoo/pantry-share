// Stephon place for code




// ======================================

  // Your web app's Firebase configuration
  
  var firebaseConfig = {
    apiKey: "AIzaSyAXwZwmrZkcGxq5-pXZTPg--bw6bRGB2G0",
    authDomain: "food-share-ad623.firebaseapp.com",
    databaseURL: "https://food-share-ad623.firebaseio.com",
    projectId: "food-share-ad623",
    // storageBucket: "food-share-ad623.appspot.com",
    storageBucket:"",
    messagingSenderId: "999281031297",
    appId: "1:999281031297:web:f9d265166ebfc345763580",
    measurementId: "G-3EYCVELK5L"
  };

var foodpantries = [{name: "APA Family", address: "50 RAYMOND (near San Bruno in Visitation Valley).", hours: "Fri 11am-3pm"},{name: "Bayview Opera House", address: "4705 THIRD STREET (at Newcomb in the Bayview)", hours: "Mon 10am-2pm"}, {name: "Bessie Carmichael", address: "375 7TH ST. (near Harrison in the SOMA District)", hours: "Th 10am-1pm"}, {name:"Cesar Chavez Elementary", address:"825 SHOTWELL (bet 22 & 23rd Sts in the Mission)", hours: "Tu 10am-1pm"},{name: "Francisco Middle School", address:"2190 POWELL (bet. Francisco and Chestnut in North Beach)", hours: "Th 10am-1pm"}, {name:"James Denman Middle School", address:"241 ONEIDA (at Otsego in the Excelsior)", hours:"Wed 10am-1pm"}, {name: "Lincoln High School", address:"2162 24TH AVE (bet Rivera and Quintara in the Sunset)", hours: "Fri 10am-1pm"}]
var zipcode = "";
var userSubmissions = [{name: "Mike", zipcode: "94114", description: "Our garden has too many zucchins", claimed: false}];

function displayFoodPantries(){
    $("#food-options").empty();
    var header = $("<h3>Find Food Here</h3>");
    $("#food-options").append(header);
    
    for (let i = 0; i < foodpantries.length ; i++){
        var div = $("<div id='pantry'>Food Pantries: </div>")
        $("#food-options").append(div);
        $(div).append("<p>"+foodpantries[i].name+"</p>")
        $(div).append("<p>"+foodpantries[i].address+"</p>")
        $(div).append("<p>"+foodpantries[i].hours+"</p>")
    }  
    for (let i = 0; i < userSubmissions.length ; i++){
      var div = $("<div id='user'>User Submissions: </div>")

      if(userSubmissions[i].claimed === false){
        $("#food-options").append(div);
        $(div).append("<button class='dibs' data="+i+">Dibs</button>")
        $(div).append("<p>"+userSubmissions[i].name+"</p>")
        $(div).append("<p>"+userSubmissions[i].description+"</p>")
        $(div).append("<p>"+userSubmissions[i].zipcode+"</p>")

      }
     
  }  

}

$("#search-button").on("click", function(event){
  event.preventDefault();
})

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();

var name = "";
var address = "";
var zipcode = "";
var description = "";
var claimed = "";
var hours = "";

$("#post-food-button").on("click", function(event){
  event.preventDefault();

  name = "user-generated";
  address = "not applicable";
  zipcode = $("#food-zip").val().trim();
  description = $("#food-desc").val().trim();
  claimed = false;
  hours = "not applicable";
  writeUserData(name,address,zipcode,description,claimed,hours);

});


function writeUserData(name,address,zipcode,description,claimed,hours){
  database.ref(count).set({
    name: name,
    address: address,
    zipcode: zipcode,
    description: description,
    claimed: claimed,
    hours: hours
  });
}

displayFoodPantries()