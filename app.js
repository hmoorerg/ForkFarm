const axios = require('axios');
const directions = require('./directions.js');
require('dotenv').config()


let key = process.env.TOM_TOM_KEY;

coordinates = [
    { lat:37.792594, lon:-122.394724},
    { lat:37.790576, lon:-122.405324},
    { lat:37.791118, lon:-122.417384}
]

function convertCoordinatesToTomTom(coordinates){
    var coordinateString = "";
    for (var i = 0; i < coordinates.length; i++){
        //Encode coordinate record
        coordinateString += coordinates[i].lat + "," + coordinates[i].lon;

        //Add colon between coordinate records
        if (i != coordinates.length-1){
            coordinateString+=":";
        }
    }

    return coordinateString;
}


console.log("Making a request to TomTom");
directions.getDirections(coordinates,key);

