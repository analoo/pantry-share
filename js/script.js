// Stephon place for code




// ======================================

// Your web app's Firebase configuration

//=====Find food tab==============
var foodpantries = [{ name: "APA Family", address: "50 RAYMOND (near San Bruno in Visitation Valley).", hours: "Fri 11am-3pm" }, { name: "Bayview Opera House", address: "4705 THIRD STREET (at Newcomb in the Bayview)", hours: "Mon 10am-2pm" }, { name: "Bessie Carmichael", address: "375 7TH ST. (near Harrison in the SOMA District)", hours: "Th 10am-1pm" }, { name: "Cesar Chavez Elementary", address: "825 SHOTWELL (bet 22 & 23rd Sts in the Mission)", hours: "Tu 10am-1pm" }, { name: "Francisco Middle School", address: "2190 POWELL (bet. Francisco and Chestnut in North Beach)", hours: "Th 10am-1pm" }, { name: "James Denman Middle School", address: "241 ONEIDA (at Otsego in the Excelsior)", hours: "Wed 10am-1pm" }, { name: "Lincoln High School", address: "2162 24TH AVE (bet Rivera and Quintara in the Sunset)", hours: "Fri 10am-1pm" }]
var userzip = "";
var userSubmissions = [];

function displayFoodPantries() {
  $("#food-options").empty();
  var header = $("<h3>Find Food Here</h3>");
  $("#food-options").append(header);

  for (let i = 0; i < foodpantries.length; i++) {
    var div = $("<div class='pantry'>Food Pantries: </div>")
    $("#food-options").append(div);
    $(div).append("<p>" + foodpantries[i].name + "</p>")
    $(div).append("<p>" + foodpantries[i].address + "</p>")
    $(div).append("<p>" + foodpantries[i].hours + "</p>")
  }

  if (userSubmissions.food["CA"]) {
  var objID = Object.keys(userSubmissions.food["CA"]);
  console.log(objID);

    for (let i = 0; i < userSubmissions.food["CA"].length; i++) {
      var div = $("<div class='user'>User Submissions: </div>")

      if (userSubmissions.food["CA"][i].zipcode === userzip) {
        let values = userSubmissions.food["CA"][i];
        $("#food-options").append(div);
        $(div).append("<button class='dibs' data=" + objID[i] + ">Dibs</button>")
        $(div).append("<p>" + values.name + "</p>")
        $(div).append("<p>" + values.description + "</p>")
        $(div).append("<p>" + values.zipcode + "</p>")

      }
    }
  }
  else{
    console.log("other thing")
  }
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  userzip = $("#zipcode").val().trim();
  console.log(userzip);

})


// ======= firebase configuration ==========

var firebaseConfig = {
  apiKey: "AIzaSyAXwZwmrZkcGxq5-pXZTPg--bw6bRGB2G0",
  authDomain: "food-share-ad623.firebaseapp.com",
  databaseURL: "https://food-share-ad623.firebaseio.com",
  projectId: "food-share-ad623",
  storageBucket: "food-share-ad623.appspot.com",
  messagingSenderId: "999281031297",
  appId: "1:999281031297:web:f9d265166ebfc345763580",
  measurementId: "G-3EYCVELK5L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name = "";
var address = "";
var zipcode = "";
var description = "";
var claimed = "";
var hours = "";

$("#post-food-button").on("click", function (event) {
  event.preventDefault();
  name = "user-generated";
  address = "not applicable";
  zipcode = $("#food-zip").val().trim();
  description = $("#food-desc").val().trim();
  claimed = false;
  state = "CA";

  // date stamp time
  hours = "not applicable";
  writeUserData(name, state, address, zipcode, description, claimed, hours);
  // hides form once user has submitted it
  $("form").css("display", "none")

});

// saves data to the firebase
var pathStr = "";

function writeUserData(name, state, address, zipcode, description, claimed, hours) {
  //pathStr += zipcode;
  // database.ref("resources/food/").push({
  //   name: name,
  //   address: address,
  //   zipcode: zipcode,
  //   description: description,
  //   claimed: claimed,
  //   hours: hours
  // });
  database.ref("resources/food/" + state).push(
    // food: {
    {
      name: name,
      address: address,
      zipcode: zipcode,
      description: description,
      claimed: claimed,
      hours: hours
    }
  );
}

database.ref("resources").on("value", function (snapshot) {
  userSubmissions = snapshot.val();
  console.log("This is the submission: ", userSubmissions)
  displayFoodPantries()
});


