// Stephon place for code




// ======================================

// Your web app's Firebase configuration

//=====Find food tab==============

var userzip = "";

function displayFoodPantries() {
  $("#food-options").empty();
  var header = $("<h3>Find Food Here</h3>");
  $("#food-options").append(header);

  for (let i = 0; i < foodAddresses.length; i++) {
    var div = $("<div class='pantry'></div>")
    $("#food-options").append(div);
    $(div).append("<p>" + foodAddresses[i].name + "</p>")
    $(div).append("<p>" + foodAddresses[i].address + "</p>")
    $(div).append("<p>" + foodAddresses[i].hours + "</p>")
  }

  var californiaData = values.food.CA;
  if (californiaData) {
    var objID = Object.keys(californiaData);
    var div = $("<div class='user'>User Submissions: </div>");
    $("#food-options").append(div);

    for (let i = 0; i < objID.length; i++) {
      if (californiaData[objID[i]].zipcode === userzip && californiaData[objID[i]].claimed === false) {
        $(div).append("<button class='dibs' data=" + objID[i] + ">Dibs</button>")
        $(div).append("<p>" + californiaData[objID[i]].name + "</p>")
        $(div).append("<p>" + californiaData[objID[i]].description + "</p>")
        $(div).append("<p>" + californiaData[objID[i]].zipcode + "</p>")

        var user = {
          "name": californiaData[objID[i]].name,
          "description": californiaData[objID[i]].description,
          "zipcode": californiaData[objID[i]].zipcode
        }

        userSubmissions.push(user)
      }

      else if (userzip === "" && californiaData[objID[i]].claimed === false) {
        $(div).append("<button class='dibs' data=" + objID[i] + ">Dibs</button>")
        $(div).append("<p>" + californiaData[objID[i]].name + "</p>")
        $(div).append("<p>" + californiaData[objID[i]].description + "</p>")
        $(div).append("<p>" + californiaData[objID[i]].zipcode + "</p>")

        var user = {
          "name": californiaData[objID[i]].name,
          "description": californiaData[objID[i]].description,
          "zipcode": californiaData[objID[i]].zipcode
        }
        
        userSubmissions.push(user)
      }
    }
  }
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  userzip = $("#zipcode").val().trim();
  displayFoodPantries();
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
  $("form").css("display", "none")

});

// saves data to the firebase
var pathStr = "";

function writeUserData(name, state, address, zipcode, description, claimed, hours) {
  database.ref("resources/food/" + state).push({
    name: name,
    address: address,
    zipcode: zipcode,
    description: description,
    claimed: claimed,
    hours: hours
  }
  );
}

var values;
database.ref("resources").on("value", function (snapshot) {
  values = snapshot.val();
  displayFoodPantries();
})


$(document).on("click", ".dibs", function (event) {
  event.preventDefault();
  var dataKey = $(this).attr("data");
  var claimedRef = database.ref("resources/food/CA/" + dataKey);

  claimedRef.update({
    "claimed": "true"
  });
  displayFoodPantries();

})