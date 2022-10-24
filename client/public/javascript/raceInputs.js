/* FUNCTION FOR STORING USER INPUTS FOR RACES INTO DATABASE */
function storeRaceInput() {
    // calculate total mass for simplicity
    let massRider = document.getElementById("massRider").value;
    let massBike =document.getElementById("massBike").value;
    let massOther = document.getElementById("massOther").value;
    /* store in object to send to route */
    let race = {
            raceName: document.getElementById("raceName").value,
            courseName: document.getElementById("courseName").value,
            massTotal: massRider + massBike + massOther,
            criticalPower: document.getElementById("criticalPower").value,
            energyReserve: document.getElementById("energyReserve").value,
            recoveryFunction: document.getElementById("recoveryFunction").value,
            CDA12: document.getElementById("CDA12").value,
            CDA14: document.getElementById("CDA14").value,
            CDA16: document.getElementById("CDA16").value,
            climbingPosition: document.getElementById("climbingPosition").value,
            descendingPosition: document.getElementById("descendingPosition").value,
            tyreCrr: document.getElementById("tyreCrr").value,
            mechanicalEfficiency: document.getElementById("mechanicalEfficiency").value,
            wheelRadius: document.getElementById("wheelRadius").value,
            Dt: document.getElementById("Dt").value,
            V0: document.getElementById("V0").value,
            windDirection: document.getElementById("windDirection").value,
            windSpeed: document.getElementById("windSpeed").value,
            airDensity: document.getElementById("airDensity").value,
            steadyStatePowerInputPercentage: document.getElementById("steadyStatePowerInputPercentage").value,
            overThresholdPowerInputPercentage: document.getElementById("overThresholdPowerInputPercentage").value,
            descendPowerInputPercentage: document.getElementById("descendPowerInputPercentage").value,
            slopeThresholdBelowSteadyStatePower: document.getElementById("slopeThresholdBelowSteadyStatePower").value,
            slopeThresholdAboveSteadyStatePower: document.getElementById("slopeThresholdAboveSteadyStatePower").value,
            slopeThresholdBelowDescendingPosition: document.getElementById("slopeThresholdBelowDescendingPosition").value,
            slopeThresholdAboveDescendingPosition: document.getElementById("slopeThresholdAboveDescendingPosition").value,
            deltaCDA: document.getElementById("deltaCDA").value,
            deltaWatts: document.getElementById("deltaWatts").value,
            deltaKG: document.getElementById("deltaKG").value,
    }

    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* call prediction model function */
            let race = JSON.parse(this.response);
            predictionModel(race);
        }
        else if (this.readyState == 4 && this.status >= 400 && this.status < 500) {
            /* fail */
            alert("Invalid Request."); /* alert */
        }
        else if (this.readyState == 4 && this.status >= 500) {
            /* server error */
            alert("A race with this name already exists. Please enter a new name and try again."); /* alert */
        }
    };
    xhttp.open("POST", "/users/storeRaceInput", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(race));
}