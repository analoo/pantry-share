var userzip = "";

$("#search-button").on("click", function (event) {
  event.preventDefault();
  userzip = $("#zipcode").val().trim();
  displayFoodPantries();
})

function checkZipcodeNum(str) {
  var allInts = true;
  var array = str.split("");
  var nums = "1234567890"
  for (let i = 0; i < array.length; i++) {
    if (nums.indexOf(array[i]) == -1) {
      allInts = false;
    }

  }
  return allInts
}


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
  zipcode = $("#food-zip").val().trim();
  name = $("#food-name").val().trim();
  if (name === "") {
    name = "anonymous neighbor";
  }
  address = $("#food-address").val().trim();
  description = $("#food-desc").val().trim();
  claimed = false;
  state = "CA";
  // date stamp time
  hours = "not applicable";

  if (checkZipcodeNum(zipcode) == false || zipcode.length != 5) {
    $("#zip-warning").text("zipcode is invalid. please update and resubmit form");
  }

  else {
    $("#warning").empty()
    writeUserData(name, state, address, zipcode, description, claimed, hours);
    $("form").css("display", "none")
  }

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

function displayFoodPantries() {
  $("#food-options").empty();

  // pull firebase stored data regardless
  var californiaData = values.food.CA;
  if (californiaData) {
    var objID = Object.keys(californiaData);
  }


  // Creates a table to display results
  var table = $("<table>Find Food Here</table>");
  $("#food-options").append(table);

  // creating two columns, one for an icon and another for information
  var tableHeader = $("<tr><th>key</th><th>info</th></tr>");
  $(table).append(tableHeader);

  for (let i = 0; i < foodpantries.length; i++) {
    var pantry = foodpantries[i];
    if (userzip === "" || userzip === pantry.zipcode) {
      var trow = $("<tr class='pantry'></tr>")
      $(table).append(trow);
      $(trow).append("<img src='assets/foodbank.png'/>");
      var div = $("<td></td>")
      $(trow).append(div);
      $(div).append("<p>" + pantry.name + "</p>")
      $(div).append("<p>" + pantry.address + "</p>")
      $(div).append("<p>" + pantry.status + "</p>")
      $(div).append("<p>" + pantry.hours + "</p>")
    }
  }
  for (let i = 0; i < objID.length; i++) {
    var userEntry = californiaData[objID[i]];
    if (userEntry.claimed === false) {
      if (userzip === "" || userzip === pantry.zipcode) {
        var trow2 = $("<tr class='users'></tr>")
        $(table).append(trow2);
        $(trow2).append("<img src='assets/posting_user.png'/></br><button class='uk-button uk-button-default dibs' data=" + objID[i] + ">Dibs</button>");
        var div = $("<td></td>")
        $(trow2).append(div);
        $(div).append("<p>" + userEntry.name + "</p>")
        $(div).append("<p>" + userEntry.address + "</p>")
        $(div).append("<p>" + userEntry.description + "</p>")
        $(div).append("<p>" + userEntry.zipcode + "</p>")


        var user = {
          "name": userEntry.name,
          "description": userEntry.description,
          "zipcode": userEntry.zipcode,
          "address": userEntry.address
        }
        userSubmissions.push(user)
      }
    }

  }

}

$(document).on("click", ".dibs", function (event) {
  event.preventDefault();
  var dataKey = $(this).attr("data");
  var record = "resources/food/CA/" + dataKey
  var claimedRef = database.ref(record);

 
  claimedRef.update({
    "claimed": true
  });




})


