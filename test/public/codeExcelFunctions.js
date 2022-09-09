
//calc_mass_total calculates the total mass for the rider, bike and other
//this function will add any inputs with the id's: "mass_rider", "mass_bike" and "mass_other"
//and store the output in an element with id "mass_total"
function calc_mass_total(riderMass,bikeMass,otherMass) {
    riderMass = document.getElementById("mass_rider").value;
    bikeMass = document.getElementById("mass_bike").value;
    otherMass = document.getElementById("mass_other").value;
    var totalMass = Number(riderMass) + Number(bikeMass) + Number(otherMass);
    document.getElementById("mass_total").innerHTML = totalMass;
}

//calc_slope_threshold calculates some slopes indicating when rider goes over steady state power and off steady state power
//the functions will take in the inputs from elements with the ids "slope_threshold_steady_state_off" and "slope_threshold_steady_state_over"
// and store them in an element with the ids "slope_threshold_off" and "slope_threshold_over".
function calc_slope_threshold(off_steady_state,over_steady_state) {
    off_steady_state = document.getElementById("slope_threshold_steady_state_off").value;
    over_steady_state = document.getElementById("slope_threshold_steady_state_over").value;
    document.getElementById("slope_threshold_off").innerHTML = "Slope threshold below which rider comes off steady state power: " + Number(off_steady_state)*-1/2 + "%";
    document.getElementById("slope_threshold_over").innerHTML = "Slope threshold below which rider goes steady state power: " + Number(over_steady_state)/2 + "%";
}

//calc_headwind_towards just calculates the wind directions using and input from an element with id "wind_direction"
// and store it in element with id "headwind_towards"
function calc_headwind_towards(wind_direction_input) {
    wind_direction_input = document.getElementById("wind_direction").value;
    document.getElementById("headwind_towards").innerHTML = "Headwind when travelling towards: " + (Number(wind_direction_input)-180) + " degrees";
}

//calc_wind_speed just calculates the wind speed using input from an element with id "wind_speed"
// and store it in element with id "wind_speed_result".
function calc_wind_speed(wind_speed_input) {
    wind_speed_input = document.getElementById("wind_speed").value;
    document.getElementById("wind_speed_result").innerHTML = " m/sec  =  " + Number(wind_speed_input)*3.6 + "km/hr";
}

//this is an incredibly aids implementation and i will change it later but for now this is all you are getting
//the user inputs 3 values, the seated areo pos at "12, 14 16", as long as you dont change the layout of the table ive given in the html document, the id's shoulid line up correctly
//the user also needs to implement the "outriggers_increment" and "supertuck_increment", one these are input, calling the function populate_cda_table will fill in the table for the user
//(let me know if you have any questions or its stopped working cos i plan on refactoring this later)
function populate_cda_table(element_t_1_12,element_t_1_14,element_t_1_16,outrigger,supertuck) {
    element_t_1_12 = document.getElementById("t_1_12_input").value;
    element_t_1_14 = document.getElementById("t_1_14_input").value;
    element_t_1_16 = document.getElementById("t_1_16_input").value;
    // element_t_1_10 = element_t_1_12
    // element_t_1_18 = element_t_1_16
    // element_t_1_20 = element_t_1_16
    document.getElementById("t,1,10").innerHTML = Number(element_t_1_12);
    document.getElementById("t,1,11").innerHTML = Number(element_t_1_12)-((Number(element_t_1_12)-Number(element_t_1_12))/(12-10))*(11-10);
    document.getElementById("t,1,13").innerHTML = Number(element_t_1_12)-((Number(element_t_1_12)-Number(element_t_1_14))/(14-12))*(13-12);
    document.getElementById("t,1,15").innerHTML = Number(element_t_1_14)-((Number(element_t_1_14)-Number(element_t_1_16))/(16-14))*(15-14);
    document.getElementById("t,1,17").innerHTML = Number(element_t_1_16)-((Number(element_t_1_16)-Number(element_t_1_16))/(18-16))*(17-16);
    document.getElementById("t,1,18").innerHTML = Number(element_t_1_16);
    document.getElementById("t,1,19").innerHTML = Number(element_t_1_16)-((Number(element_t_1_16)-Number(element_t_1_16))/(20-18))*(19-18);
    document.getElementById("t,1,20").innerHTML = Number(element_t_1_16);

    outrigger = document.getElementById("outriggers_increment").value;
    supertuck = document.getElementById("supertuck_increment").value;

    document.getElementById("t,2,10").innerHTML = Number(element_t_1_12) + Number(outrigger);
    document.getElementById("t,2,11").innerHTML = Number(element_t_1_12)-((Number(element_t_1_12)-Number(element_t_1_12))/(12-10))*(11-10) + Number(outrigger);
    document.getElementById("t,2,12").innerHTML = Number(element_t_1_12) + Number(outrigger);
    document.getElementById("t,2,13").innerHTML = Number(element_t_1_12)-((Number(element_t_1_12)-Number(element_t_1_14))/(14-12))*(13-12) + Number(outrigger);
    document.getElementById("t,2,14").innerHTML = Number(element_t_1_14) + Number(outrigger);
    document.getElementById("t,2,15").innerHTML = Number(element_t_1_14)-((Number(element_t_1_14)-Number(element_t_1_16))/(16-14))*(15-14) + Number(outrigger);
    document.getElementById("t,2,16").innerHTML = Number(element_t_1_16) + Number(outrigger);
    document.getElementById("t,2,17").innerHTML = Number(element_t_1_16)-((Number(element_t_1_16)-Number(element_t_1_16))/(18-16))*(17-16) + Number(outrigger);
    document.getElementById("t,2,18").innerHTML = Number(element_t_1_16) + Number(outrigger);
    document.getElementById("t,2,19").innerHTML = Number(element_t_1_16)-((Number(element_t_1_16)-Number(element_t_1_16))/(20-18))*(19-18) + Number(outrigger);
    document.getElementById("t,2,20").innerHTML = Number(element_t_1_16) + Number(outrigger);

    document.getElementById("t,3,10").innerHTML = Number(element_t_1_12) + Number(supertuck);
    document.getElementById("t,3,11").innerHTML = Number(element_t_1_12)-((Number(element_t_1_12)-Number(element_t_1_12))/(12-10))*(11-10) + Number(supertuck);
    document.getElementById("t,3,12").innerHTML = Number(element_t_1_12) + Number(supertuck);
    document.getElementById("t,3,13").innerHTML = Number(element_t_1_12)-((Number(element_t_1_12)-Number(element_t_1_14))/(14-12))*(13-12) + Number(supertuck);
    document.getElementById("t,3,14").innerHTML = Number(element_t_1_14) + Number(supertuck);
    document.getElementById("t,3,15").innerHTML = Number(element_t_1_14)-((Number(element_t_1_14)-Number(element_t_1_16))/(16-14))*(15-14) + Number(supertuck);
    document.getElementById("t,3,16").innerHTML = Number(element_t_1_16) + Number(supertuck);
    document.getElementById("t,3,17").innerHTML = Number(element_t_1_16)-((Number(element_t_1_16)-Number(element_t_1_16))/(18-16))*(17-16) + Number(supertuck);
    document.getElementById("t,3,18").innerHTML = Number(element_t_1_16) + Number(supertuck);
    document.getElementById("t,3,19").innerHTML = Number(element_t_1_16)-((Number(element_t_1_16)-Number(element_t_1_16))/(20-18))*(19-18) + Number(supertuck);
    document.getElementById("t,3,20").innerHTML = Number(element_t_1_16) + Number(supertuck);
}


//calc_power_input takes in the input of elements with id "steady_state_percent", "over_threshold_percent", "descend_ave_percent" and "ftp"
//it calculates the power the rider is inputing, it will store the results in elements with id "steady_state", "over_threshold", "descend_ave"
//note FTP is required for this and it is enetered further up in the page so make sure there is a number there
function calc_power_input(steady_state_input,over_threshold_input,descend_ave_input,FTP) {
    steady_state_input = document.getElementById("steady_state_percent").value;
    over_threshold_input = document.getElementById("over_threshold_percent").value;
    descend_ave_input = document.getElementById("descend_ave_percent").value;
    FTP = document.getElementById("ftp").value;
    document.getElementById("steady_state").innerHTML = (Number(steady_state_input) * Number(FTP)) / 100;
    document.getElementById("over_threshold").innerHTML = (Number(over_threshold_input) * Number(FTP)) / 100;
    document.getElementById("descend_ave").innerHTML = (Number(descend_ave_input) * Number(FTP)) / 100;
}

//calc_gradients just calculates the slope range where the rider is descending/climbing or on a "flat area"
//takes in input from elements with ids "slope_threshold_steady_state_off" and "slope_threshold_steady_state_over"
//and displays the resultant gradient range in elements with ids "descend_gradient",  "flat_gradient" and "climb_gradient"
function calc_gradients(gradient_descend,gradient_climb) {
    gradient_descend = document.getElementById("slope_threshold_steady_state_off").value;
    gradient_climb = document.getElementById("slope_threshold_steady_state_over").value;

    document.getElementById("descend_gradient").innerHTML = "Descending: (Minimum of course)% to " + (Number(gradient_descend) - 0.000001) + "% | Power: ";
    document.getElementById("flat_gradient").innerHTML = "Flat, steady state: " + Number(gradient_descend) + "% to " + Number(gradient_climb) + "% | Power: ";
    document.getElementById("climb_gradient").innerHTML = "Climbing > Threshold: " + (0.000001 + Number(gradient_climb)) + "% to (Maximum of course)% | Power: ";
}