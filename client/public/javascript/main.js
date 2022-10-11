/* FUNCTION FOR RETURNING WORKABLE GPX OBJECT OF GIVEN NAME */
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
        // parse string data to GPX
        gpx.parse(data.toString());
        // return GPX object to caller
        return gpx;
    } catch (error) {
        console.error('Error trying to read file.');
    }
}