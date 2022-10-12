const fs = require('fs').promises;
let gpxParser = require('gpxparser');

/* FUNCTION FOR RETURNING WORKABLE GPX OBJECT OF GIVEN NAME */
    // example call: parseGPXFile(ExampleCourse1);
    // GPX files are available in the 'courses' folder
    // GPX files can be uploaded via 'uploadGPX.html' webpage
    // Information on how to use the GPX object: https://npm.io/package/gpxparser
async function parseGPXFile(fileName) {
    try {
        // create file path
        let file = ('../../../courses/'.concat(fileName)).concat('.gpx');
        // read contents into string
        const data = await fs.readFile(file);
        // create GPX object
        var gpx = new gpxParser();
        gpx.parse(data.toString());
        // return gpx object
        var test = gpx.tracks[0].points.length;
        console.log(test);
        //return gpx;
    } catch (error) {
        console.error(error);
    }
}

// eg. parseGPXFile('ExampleCourse1');

// HOW TO USE GPX OBJECT
    /* CALL parseGPXFile() with filename of GPX stored in courses folder -> e.g. parseGPXFile('ExampleCourse1') */
    /* Tracks
        number of tracks -> gpx.tracks.length
        track name -> gpx.tracks[0].name
        track total distance -> gpx.tracks[0].distance.total
        track cumulative distance at each point -> gpx.tracks[0].distance.cumul.length
        track max elevation -> gpx.tracks[0].elevation.max
        track min elevation -> gpx.tracks[0].elevation.min
        track avg elevation -> gpx.tracks[0].elevation.avg
        number of points in track -> gpx.tracks[0].points.length
        latitude at point 1 -> gpx.tracks[0].points[0].lat
        longitude at point 1 -> gpx.tracks[0].points[0].lon
        elevation at point 1 -> gpx.tracks[0].points[0].ele
    */