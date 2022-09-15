window.onload=function(){
    if(document.getElementById("loginBut")){
        document.getElementById("loginBut").addEventListener("click", function() {
            Username  = document.getElementById("username").value;
            Password  = document.getElementById("psw").value;
            login(Username, Password);
        }, false);
    }   

    if(document.getElementById("signUp")){
        document.getElementById("signUp").addEventListener("click", function() {
            Username  = document.getElementById("username").value;
            Password  = document.getElementById("psw").value;
            FirstName = document.getElementById("firstname").value;
            LastName = document.getElementById("lastname").value;
            Email = document.getElementById("email").value;
            Phone = document.getElementById("phonenumber").value;
            signup(Username, Password, FirstName, LastName, Email, Phone);
        }, false);
    }

    if(document.getElementById("A_updatePasswordBtn")){
        document.getElementById("A_updatePasswordBtn").addEventListener("click", function(){
            passwordCurrent = document.getElementById("passwordCurrent").value;
            passwordNew = document.getElementById("passwordNew").value;
            passwordConfirm = document.getElementById("passwordConfirm").value;

            if(passwordNew != passwordConfirm)
            {
                alert("Passwords don't match");
            }
            else
            {
                updatePassword(passwordNew, passwordCurrent);
            }
        })
    }

    if(document.getElementById("A_updateContactBtn")){
        document.getElementById("A_updateContactBtn").addEventListener("click", function(){
            email = document.getElementById("email").value;
            phone = document.getElementById("number").value;

            updateContact(email, phone);
        });
    }

    if(document.getElementById("A_Logout_btn")){
        document.getElementById("A_Logout_btn").addEventListener("click", function(){
            logout();
        });
    }
}


/* FUNCTION FOR LOGGING IN USER */
/* receives username & password as input */
function login(Username, Password) {
    /* obtain inputs */
    let user = {
        username: Username,
        password: Password,
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* login success */
            //response = JSON.parse(this.responseText); /* returns JSON object of users details */
            window.location.replace("/NavigationBar.html");
        }
        else if (this.readyState == 4 && this.status >= 400 && this.status < 500) {
            /* login fail */
            alert("Invalid username or password."); /* alert */
        }
        else if (this.readyState == 4 && this.status >= 500) {
            /* server error */
            alert("Server Error"); /* alert */
        }
    };
    xhttp.open("POST", "/users/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
  }

/* FUNCTION THAT LOGS OUT A USER */
  function logout(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* login success */
            window.location.replace("/Dashboard.html");
        }
        else if (this.readyState == 4 && this.status >= 400 && this.status < 500) {
            /* logout fail */
            alert("Session error"); /* alert */
        }
        else if (this.readyState == 4 && this.status >= 500) {
            /* server error */
            alert("Server Error"); /* alert */
        }
    };
    xhttp.open("GET", "/users/logout", true);
    xhttp.send();
  }
  
  /* FUNCTION FOR SIGNING UP USER & SIGNING IN USER */
  /* receives username,password,firstName,lastName,email,phoneNum as input */
  function signup(Username,Password,FirstName,LastName,Email,Phone) {
    /* obtain inputs */
    let user = {
        username: Username,
        password: Password,
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        phoneNum: Phone,
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* signup success */
            window.location.replace("/Login.html");
        } else if (this.readyState == 4 && this.status >= 400) {
            /* signup fail */
            alert("Signup Unsuccessful"); // alert
        }
        else if (this.readyState == 4 && this.status >= 500) {
            /* server error */
            alert("Server Error"); /* alert */
        }
    };
    xhttp.open("POST", "/users/signup");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
  }

/* FUNCTION FOR CHANGING A USERS PASSWORD */
/* receives new password, username and old passwordas input */
function updatePassword(NewPassword,Password) {
    /* obtain inputs */
    let user = {
        newPassword: NewPassword,
        password: Password
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alert("Password Changed :)")
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Update Unsuccessful"); // alert
        }
    };
    xhttp.open("POST", "users/updatePassword");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

/* FUNCTION FOR CHANGING A USERS CONTACT DETAILS */
/* receives new username, new email and new phone number as input */
function updateContact(Email,PhoneNum) {
    /* obtain inputs */
    let user = {
        email: Email,
        phoneNum: PhoneNum
    }
    /* send POST request */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            /* success */
            alerty("Updated!")
        } else if (this.readyState == 4 && this.status >= 400) {
            /* fail */
            alert("Update Unsuccessful"); // alert
        }
    };
    xhttp.open("POST", "users/updateContactDetails");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}



//   /* FUNCTION FOR MAKING USER ADMIN */
//   /* receives username as input */
//   function makeAdmin(Username) {
//     /* obtain inputs */
//     let administrator = {
//         username: Username
//     }
//     /* send POST request */
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             /* success */
//             alert("Administrator created");
//         } else if (this.readyState == 4 && this.status >= 400) {
//             /* fail */
//             alert("Administrator creation failed");
//         }
//     };
//     xhttp.open("POST", "/makeAdmin");
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send(JSON.stringify(administrator));
//   }
  
//   /* FUNCTION FOR CHECKING IF ADMIN IS USER */
//   /* receives username as input */
//   function checkAdmin(Username) {
//     /* obtain inputs */
//     let administrator = {
//         username: Username
//     }
//     /* send POST request */
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             /* success */
//             alert("User is administrator");
//         } else if (this.readyState == 4 && this.status >= 400) {
//             /* fail */
//             alert("User is not administrator");
//         }
//     };
//     xhttp.open("POST", "/checkAdmin");
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send(JSON.stringify(administrator));
//  } 