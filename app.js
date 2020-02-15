const axios = require('axios');


require('dotenv').config()


let key = process.env.TOM_TOM_KEY;
coordinates = [
    { lat:37.792594, lon:-122.394724},
    { lat:37.790576, lon:-122.405324},
    { lat:37.791118, lon:-122.417384}
]

function convertCoordinatesToTomTom(coordinates){
    var coordinateString = "";
    for (i = 0; i < coordinates.length; i++){
        //Encode coordinate record
        coordinateString += coordinates[i].lat + "," + coordinates[i].lon;

        //Add colon between coordinate records
        if (i != coordinates.length-1){
            coordinates+=":";
        }
    }
}


console.log("Making a request to TomTom");
let urlCoordinates = convertCoordinatesToTomTom(coordinates);
axios.get("https://api.tomtom.com/routing/1/calculateRoute/52.50931%2C13.42936%3A52.50274%2C13.43872/xml?avoid=unpavedRoads&key="+key)
.then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);

})  
.catch(error => {
    console.log(error);
});


