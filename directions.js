module.exports = {
    getDirections:getDirections
}

const axios = require('axios');

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

function getDirections(coordinates,key){
    let urlCoordinates = convertCoordinatesToTomTom(coordinates);
    axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${urlCoordinates}/json?instructionsType=text&computeBestOrder=true&avoid=unpavedRoads&travelMode=car&key=`+key)
    .then(response => {
        let routes = response.data.routes;

        routes.forEach(route => {
            let instructions = route.guidance.instructions;
            instructions.forEach(instruction => {
                var instructionString = "";

                switch (instruction.maneuver) {
                    case "TURN_LEFT":
                        instructionString+='↰ ';
                        break;
                    case "TURN_RIGHT":
                        instructionString+='↱  ';
                        break;
                    case "ARRIVE_RIGHT":
                    case "ARRIVE:LEFT":
                    case "WAYPOINT_REACHED":
                        instructionString+='☑ '
                        break;
                }

                // console.log(instruction.maneuver);
                instructionString += instruction.message.replace("waypoint","pickup area");

                console.log(instructionString);
            });
        });

    })  
    .catch(error => {
        console.log(error);
    });
}