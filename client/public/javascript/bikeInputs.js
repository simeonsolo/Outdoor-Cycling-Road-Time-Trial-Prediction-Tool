/* FUNCTION FOR STORING USER INPUTS FOR Bikes INTO DATABASE */
function storeBikesInput() {
    /* store in object to send to route */
    let bike = {
            _bikeName: document.getElementById("_bikeName").value,
            _bikeWeight: document.getElementById("_bikeWeight").value,
            _frontWheelType: document.getElementById("_frontWheelType").value,
            _frontWheelWidth: document.getElementById("_frontWheelWidth").value,
            _rearWheelType: document.getElementById("_rearWheelType").value,
            _rearWheelWidth: document.getElementById("_rearWheelWidth").value,
            _helmetType: document.getElementById("_helmetType").value,
            _rollingAssistance: document.getElementById("_rollingAssistance").value,
            _CdA_Racing: document.getElementById("_CdA_Racing").value,
            _CdA_Climbing: document.getElementById("_CdA_Climbing").value,
    }

    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* call prediction model function */
            alert("Import Success.");
        }
        else if (this.readyState == 4 && this.status >= 400 && this.status < 500) {
            /* fail */
            alert("Invalid Request."); /* alert */
        }
        else if (this.readyState == 4 && this.status >= 500) {
            /* server error */
            alert("A bike with this name already exists. Please enter a new name and try again."); /* alert */
        }
    };
    xhttp.open("POST", "/users/storeBikesInput", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(bike));
}