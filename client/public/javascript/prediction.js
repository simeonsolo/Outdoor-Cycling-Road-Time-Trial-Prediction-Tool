var lat_array = new Array();
var lon_array = new Array();
var ele_array = new Array();
var dist_array = new Array();
var slope_array = new Array();
var lat_radians_array = new Array();
var lon_radians_array = new Array();

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
    getLat();
    getLon();
    getEle();
    getDist();
    getSlope();
}

function testConsoleResponse() {
    for (let i = 0; i < lat_array.length; i++) {
        lat_radians_array[i] = lat_array[i] * (3.14159/180);
        lon_radians_array[i] = lon_array[i] * (3.14159/180);

        //console.log(lat_radians_array[i]);
    }
    console.log(lat_radians_array);
    console.log(lon_radians_array);
    document.getElementById('viewtext').innerText = lon_radians_array;
}


var raceInput;
function getRaceInput() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/users/storeRaceInput", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var response = xhttp.responseText;
            raceInput = JSON.parse(response);
            document.getElementById('viewtext').innerText = raceInput;
        }
    };
}

