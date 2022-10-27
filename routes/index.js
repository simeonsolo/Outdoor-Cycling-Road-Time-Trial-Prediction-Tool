var express = require("express");
var router = express.Router();

let gpxParser = require('gpxparser');
var gpx = new gpxParser();
var fs = require('fs');
var fileContent ;
var lat_array = new Array();
var lon_array = new Array();
var ele_array = new Array();
var dist_array = new Array();
var slope_array = new Array();
var lat_radians_array = new Array();
var lon_radians_array = new Array();
var points_length;
fs.readFile('./courses/ExampleCourse2.gpx', function (err, data) {
    if (err) {
        res.sendStatus(500);
    } else {
        fileContent = data;
    

    gpx.parse(fileContent.toString());
    var point_array = gpx.tracks[0].points;
    var point_array_length = point_array.length;
    points_length = point_array.length;

    for (let i = 0; i < point_array_length; i++) {
        lat_array[i] = gpx.tracks[0].points[i].lat;
        lon_array[i] = gpx.tracks[0].points[i].lon;
        ele_array[i] = gpx.tracks[0].points[i].ele;
        dist_array[i] = gpx.tracks[0].distance.cumul[i];
    }
    //parse the slope array correctly
    slope_array[0] = 0;
    for (let i = 1; i < point_array_length; i++) {
        if (isFinite((gpx.tracks[0].slopes[i-1]))){
            slope_array[i] = gpx.tracks[0].slopes[i-1];
        }
        else{
        slope_array[i] = 0;
        }
    }


    //console.log(lat_array);
    //console.log(lon_array);
    //console.log(ele_array);
    //console.log(dist_array);
    //console.log(slope_array);
    for (let i = 0; i < point_array_length; i++) {
             lat_radians_array[i] = lat_array[i] * (3.14159/180);
             lon_radians_array[i] = lon_array[i] * (3.14159/180);
        }
    //console.log(lat_radians_array);
    //console.log(lon_radians_array);
    }
});


router.get('/get-lat', function(req, res, next) {
    res.send(JSON.stringify(lat_array));
});

router.get('/get-lon', function(req, res, next) {
    res.send(JSON.stringify(lon_array));
});

router.get('/get-ele', function(req, res, next) {
    res.send(JSON.stringify(ele_array));
});
router.get('/get-dist', function(req, res, next) {
    res.send(JSON.stringify(dist_array));
});
router.get('/get-slope', function(req, res, next) {
    res.send(JSON.stringify(slope_array));
});
router.get('/get-points-number', function(req, res, next) {
    res.send(points_length.toString());
});






/* GET home page. */
router.get('/read', function(req, res, next) {
    fs.readFile('./courses/ExampleCourse1.gpx', function (err, data) {
        if (err) {
            res.sendStatus(500);
        } else {
            // var gpx = new gpxParser();
            // gpx.parse(data.toString());
            // // return gpx object
            // var test = gpx.tracks[0].distance.total;
            //console.log(data.toString());
            res.send('The file contains:\n'+data.toString());
        }
    });
});

//function to output Example Course 1s total distance
router.get('/total-distance', function(req, res, next) {
    gpx.parse(fileContent.toString());
    // return gpx object
    var test2 = gpx.tracks[0].distance.total;
    console.log(test2);
    res.send('Total distance:\n' + test2);
    //res.send(fileContent.toString());
});

// router.get('/points-test', function(req, res, next) {
//     gpx.parse(fileContent.toString());
//     var point_array = gpx.tracks[0].points;
//     var point_array_length = point_array.length;
//     var lat_array = new Array();
//     var lon_array = new Array();
//     var ele_array = new Array();
//     for (let i = 0; i < point_array_length; i++) {
//         lat_array[i] = gpx.tracks[0].points[i].lat;
//         lon_array[i] = gpx.tracks[0].points[i].lon;
//         ele_array[i] = gpx.tracks[0].points[i].ele;
//     }
//     console.log(lat_array);
//     console.log(lon_array);
//     console.log(ele_array);
//     var lat_radians_array = new Array();
//     var lon_radians_array = new Array();
//     for (let i = 0; i < point_array_length; i++) {
//         lat_radians_array[i] = lat_array[i] * (3.14159/180);
//         lon_radians_array[i] = lon_array[i] * (3.14159/180);
//     }

//     res.send('lat array:\n' + lat_array.toString() + '\n' + 'lat radians array:\n' + lat_radians_array.toString() + '\n' + 'lon array:\n' + lon_array.toString() + '\n' + 'lon radians array:\n' + lon_radians_array.toString() + '\n' +'ele array:\n' + ele_array.toString());
// });










/* GET home page. */
router.post('/save', function(req, res, next) {
    
    console.log(req.body);
    
    fs.writeFile('./client/public/test.txt', req.body.text, function (err, data) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});



module.exports = router;
