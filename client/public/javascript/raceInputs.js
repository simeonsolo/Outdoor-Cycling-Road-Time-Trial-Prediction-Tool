/* FUNCTION FOR STORING USER INPUTS FOR RACES INTO DATABASE */
var raceTest;//global variable so i can test functions;

var track_points;
var lat_array = new Array();
var lon_array = new Array();
var ele_array = new Array();
var dist_array = new Array();
var slope_array = new Array();
var lat_radians_array = new Array();
var lon_radians_array = new Array();
var bearing_radians_array = new Array();
var bearing_degrees_array = new Array();

function testGetFunction() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/total-distance", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var response = xhttp.responseText;
            document.getElementById('viewtext').innerText = response;
        }
    };
}

function getGPXDetails() {

    function getLat(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/get-lat", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var response = xhttp.responseText;
                lat_array = JSON.parse(response);
                document.getElementById('getLat').innerText = lat_array;
            }
        };
    }

    function getLon(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/get-lon", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var response = xhttp.responseText;
                lon_array = JSON.parse(response);
                document.getElementById('getLon').innerText = lon_array;

            }
        };
    }

    function getEle(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/get-ele", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var response = xhttp.responseText;
                ele_array = JSON.parse(response);
                document.getElementById('getEle').innerText = ele_array;
            }
        };
    }

    function getDist(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/get-dist", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var response = xhttp.responseText;
                dist_array = JSON.parse(response);
                document.getElementById('getDist').innerText = dist_array;
            }
        };
    }

    function getSlope(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/get-slope", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var response = xhttp.responseText;
                slope_array = JSON.parse(response);
                document.getElementById('getSlope').innerText = slope_array;
            }
        };
    }

    function getNumPoints(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/get-points-number", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var response = xhttp.responseText;
                track_points = parseInt(response);
                console.log(track_points);
            }
        };
    }

    getLat();
    getLon();
    getEle();
    getDist();
    getSlope();
    getNumPoints();

    
    
    
}

function otherCalcs() {
    function getRads(){
        for (let i = 0; i < track_points; i++) {
            lat_radians_array[i] = lat_array[i] * (3.14159/180);
            lon_radians_array[i] = lon_array[i] * (3.14159/180);
        }
        console.log(lat_radians_array);
        console.log(lon_radians_array);
    }
    getRads();

    function getBearings(){
        //get bearing in radians and degrees
        bearing_radians_array[0] = 0;
        bearing_degrees_array[0] = 0;
        var y;
        var x;
        var θ;
        var brng;
        for (let i = 1; i < track_points; i++) {
            y = Math.sin(lon_radians_array[i]-lon_radians_array[i-1]) * Math.cos(lat_radians_array[i]);
            x = Math.cos(lat_radians_array[i-1])*Math.sin(lat_radians_array[i]) - Math.sin(lat_radians_array[i-1])*Math.cos(lat_radians_array[i])*Math.cos(lon_radians_array[i]-lon_radians_array[i-1]);
            θ = Math.atan2(y, x);
            bearing_radians_array[i] = θ;
            brng = (θ*180/Math.PI + 360) % 360; // in degrees
            bearing_degrees_array[i] = brng;
        }
        document.getElementById('getBearingRad').innerText = bearing_radians_array;
        document.getElementById('getBearingDeg').innerText = bearing_degrees_array;
    }
    getBearings();
}

function testConsoleResponse() {
    console.log(lat_radians_array);
    console.log(lon_radians_array);
    document.getElementById('viewtext').innerText = lon_radians_array;
}


function storeRaceInput() {

    // calculate total mass for simplicity
    let massRider = +(document.getElementById("massRider").value);
    let massBike =+(document.getElementById("massBike").value);
    let massOther = +(document.getElementById("massOther").value);
    /* store in object to send to route */
    let race = {
            raceName: document.getElementById("raceName").value,
            courseName: document.getElementById("courseName").value,
            massTotal: massRider + massBike + massOther,
            criticalPower: +(document.getElementById("criticalPower").value),
            energyReserve: +(document.getElementById("energyReserve").value),
            recoveryFunction: +(document.getElementById("recoveryFunction").value),
            CDA12: +(document.getElementById("CDA12").value),
            CDA14: +(document.getElementById("CDA14").value),
            CDA16: +(document.getElementById("CDA16").value),
            climbingPosition: +(document.getElementById("climbingPosition").value),
            descendingPosition: +(document.getElementById("descendingPosition").value),
            tyreCrr: +(document.getElementById("tyreCrr").value),
            mechanicalEfficiency: +(document.getElementById("mechanicalEfficiency").value),
            wheelRadius: +(document.getElementById("wheelRadius").value),
            mol: +(document.getElementById("mol").value),
            Dt: +(document.getElementById("Dt").value),
            V0: +(document.getElementById("V0").value),
            windDirection: +(document.getElementById("windDirection").value),
            windSpeed: +(document.getElementById("windSpeed").value),
            airDensity: +(document.getElementById("airDensity").value),
            steadyStatePowerInputPercentage: +(document.getElementById("steadyStatePowerInputPercentage").value),
            overThresholdPowerInputPercentage: +(document.getElementById("overThresholdPowerInputPercentage").value),
            descendPowerInputPercentage: +(document.getElementById("descendPowerInputPercentage").value),
            slopeThresholdBelowSteadyStatePower: +(document.getElementById("slopeThresholdBelowSteadyStatePower").value),
            slopeThresholdAboveSteadyStatePower: +(document.getElementById("slopeThresholdAboveSteadyStatePower").value),
            slopeThresholdBelowDescendingPosition: +(document.getElementById("slopeThresholdBelowDescendingPosition").value),
            slopeThresholdAboveDescendingPosition: +(document.getElementById("slopeThresholdAboveDescendingPosition").value),
            deltaCDA: +(document.getElementById("deltaCDA").value),
            deltaWatts: +(document.getElementById("deltaWatts").value),
            deltaKG: +(document.getElementById("deltaKG").value)
    }
    //console.log(race);

    // /* send POST request */
    // let xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         /* call prediction model function */
    //         console.log(this.response);
    //         let race = JSON.parse(this.response);
    //         predictionModel(race);
    //     }
    //     else if (this.readyState == 4 && this.status >= 400 && this.status < 500) {
    //         /* fail */
    //         alert("Invalid Request."); /* alert */
    //     }
    //     else if (this.readyState == 4 && this.status >= 500) {
    //         /* server error */
    //         alert("A race with this name already exists. Please enter a new name and try again."); /* alert */
    //     }
    // };
    // xhttp.open("POST", "/users/storeRaceInput", true);
    // xhttp.setRequestHeader("Content-type", "application/json");
    // xhttp.send(JSON.stringify(race));
    predictionModel(race);
}



var time_calc = new Array();
var dist_calc = new Array();
var speed_calc = new Array();
var slope_calc = new Array();
var kmh_calc = new Array();
var bearing_calc = new Array();
var relative_wind_angle_calc = new Array();
var relative_wind_speed_calc = new Array();
var wind_speed_calc = new Array();
var effective_yaw_angle_calc = new Array();
var power_in_calc = new Array();
var CDA_calc = new Array();
var net_power_calc = new Array();
var prop_force_calc = new Array();
var accel_calc = new Array();

function predictionModel(race) {
    //var raceInput = JSON.stringify(race);
    //console.log(raceInput);
    

    //console.log(parseFloat(race.Dt));
    
    //make calculations for each track section biker is at
    


    var race_end = 0
    var calc_index = 0;
    var track_point_index = 0;
    var temp_power;
    
    var predicted_time = 0;
    //while loop will run for each calculation array index (increment calc_index each run)
    //when next distance point is reached increment track_point_index
    while (race_end == 0) {
        //staring array values
        if (calc_index == 0){
            time_calc[calc_index] = 0;
            speed_calc[calc_index] = 0.3;
            dist_calc[calc_index] = 0.1;
        }
        else{//this should be called every time except first
            time_calc[calc_index] = race.Dt + time_calc[calc_index-1];
            speed_calc[calc_index] = speed_calc[calc_index-1] + (accel_calc[calc_index-1]*race.Dt);
            dist_calc[calc_index] = dist_calc[calc_index-1] + (speed_calc[calc_index]*race.Dt);
        }
        //check if its time to search from next track point OR break while loop
        if (dist_calc[calc_index] >= dist_array[track_point_index+1]){
            track_point_index++;
        }

        // if(dist_calc[calc_index] >= dist_array[track_points]){
        //     predicted_time = time_calc[calc_index];
        //     race_end = 1;
        // }
        
        kmh_calc[calc_index] = speed_calc[calc_index] * 3.6;
        slope_calc[calc_index] = Math.round(slope_array[track_point_index] * 10) / 10;
        //incase there are weird slopes in the course, if the slope is greater than 20% set it to 20, less than -20% set to -20
        if (slope_calc[calc_index] > 20){
            console.log('slope changed');
            slope_calc[calc_index] = 20;
        }
        if (slope_calc[calc_index] < -20){
            console.log('slope changed');
            slope_calc[calc_index] = -20;
        }

        bearing_calc[calc_index] = bearing_degrees_array[track_point_index];
        relative_wind_angle_calc[calc_index] = bearing_calc[calc_index]-(race.windDirection - 180);
        wind_speed_calc[calc_index] = 1; //as we are nod dividing the track into segments the wind speed will remain at 1 everywhere
        relative_wind_speed_calc[calc_index] = Math.sqrt(Math.pow(speed_calc[calc_index] + wind_speed_calc[calc_index] * Math.cos((relative_wind_angle_calc[calc_index])*(3.14159/180)),2) + Math.pow(wind_speed_calc[calc_index] * Math.sin((relative_wind_angle_calc[calc_index]*(3.14159/180))),2));
        //(Math.atan(wind_speed_calc[calc_index]*Math.sin((relative_wind_angle_calc[calc_index]*(3.14159/180)))/(speed_calc[calc_index]+wind_speed_calc[calc_index]*Math.cos((relative_wind_angle_calc[calc_index]*(3.14159/180)))))
        effective_yaw_angle_calc[calc_index] = (Math.atan(wind_speed_calc[calc_index]*Math.sin((relative_wind_angle_calc[calc_index]*(3.14159/180)))/(speed_calc[calc_index]+wind_speed_calc[calc_index]*Math.cos((relative_wind_angle_calc[calc_index]*(3.14159/180)))))) * (180/3.14159);

        //get current power due to slope
        if (slope_calc[calc_index] > race.slopeThresholdAboveSteadyStatePower){
            temp_power = race.criticalPower*(race.overThresholdPowerInputPercentage/100);
        }
        else if (slope_calc[calc_index] < race.slopeThresholdBelowSteadyStatePower){
            temp_power = race.criticalPower*(race.descendPowerInputPercentage/100);
        }
        else{
            temp_power = race.criticalPower*(race.steadyStatePowerInputPercentage/100);
        }
        power_in_calc[calc_index] = (race.mechanicalEfficiency/100) * temp_power + race.deltaWatts;

        //the CDA will be a placeholder value of 0.2 for now until i get a chance to change it
        CDA_calc[calc_index] = 0.2;

        //net power is power in - power aero - power roll - power grav  = 
        net_power_calc[calc_index] = power_in_calc[calc_index] - (0.5*(race.airDensity)*(Math.pow(relative_wind_speed_calc[calc_index],3))*(CDA_calc[calc_index])) - (race.massTotal*race.tyreCrr*9.81*speed_calc[calc_index]) - ((slope_calc[calc_index]/100)*9.81*(race.massTotal)*(speed_calc[calc_index]));

        prop_force_calc[calc_index] = net_power_calc[calc_index] / speed_calc[calc_index];

        //=@Propulsive_force/(Mass_total+(MoI_whl_front/Wheel_radius^2)+(MoI_whl_rear/Wheel_radius^2))
        accel_calc[calc_index] = prop_force_calc[calc_index] / (race.massTotal + (2 * (race.mol / (Math.pow(race.wheelRadius,2)))));
        //accel_calc[calc_index] = prop_force_calc[calc_index] / ((race.massTotal + 2*(race.mol/(Math.pow(race.wheelRadius),2))));

        calc_index++;
        if (dist_calc[calc_index-1] >= dist_array[track_points-1]){
            console.log("ending while loop");
            console.log(dist_calc[calc_index-1]);
            predicted_time = time_calc[calc_index-1];
            race_end = 1;
        }
    }
    console.log(time_calc);
    console.log(dist_calc);
    let graph_dist_array = dist_calc;
    console.log(speed_calc);
    let graph_speed_array = speed_calc;
    console.log(slope_calc);
    console.log(kmh_calc);
    console.log(bearing_calc);
    console.log(relative_wind_angle_calc);
    console.log(relative_wind_speed_calc);
    console.log(effective_yaw_angle_calc);
    console.log(power_in_calc);
    console.log(net_power_calc);
    console.log(prop_force_calc);
    console.log(accel_calc);

    console.log(predicted_time);

    //display predicted time
    document.getElementById('viewtext').innerText = 'Predicted time: ' + predicted_time + ' Seconds!! | (' + Math.round((predicted_time/60*10))/10 + ' minutes)';
}

function generateGraphs() {
    //Graph of the lat and long coords

    // Define Data
    var data = [{
    x: lon_array,
    y: lat_array,
    mode:"markers",
    type:"scatter"
    }];

    // Define Layout
    var layout = {
    xaxis: {range: [-82.61, -82.68], title: "Longitude"},
    yaxis: {range: [27.69, 27.79], title: "Latitude"},
    title: "Track"
    };

    Plotly.newPlot("mapGraph", data, layout);

    //graph of the elevation of the track
    // Define Data
    var data = [{
        x: dist_array,
        y: ele_array,
        mode:"lines",
        type:"scatter"
        }];
    
        // Define Layout
        var layout = {
        xaxis: {range: [0, 40000], title: "Distance"},
        yaxis: {range: [0, 20], title: "Elevation"},
        title: "Elevation over Track"
        };
    
        Plotly.newPlot("elevationGraph", data, layout);
    //could be copied to show bearing as well

    //speed and distance graph
    var data = [{
        x: dist_calc,
        y: speed_calc,
        mode:"lines",
        type:"scatter"
        }];
    
        // Define Layout
        var layout = {
        xaxis: {range: [0, 40000], title: "Distance"},
        yaxis: {range: [0, 30], title: "Speed"},
        title: "Speed over Trial"
        };
    
        Plotly.newPlot("speedDistanceGraph", data, layout);
}