// Declaration
signin_email = document.getElementById("login_email");
signin_password = document.getElementById("login_password");
signin_error = document.getElementById("signin_error");
signup_name = document.getElementById("signup_name");
signup_email = document.getElementById("signup_email");
signup_password = document.getElementById("signup_password");
signup_error = document.getElementById("signup_error");
username = document.getElementById("username");

users = [];

console.log(username);

// Local Storage
if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
}

function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}


// Validation
function isEmptySignUp() {
    if (signup_name.value == "" || signup_email.value == "" || signup_password.value == "") {
        return true;
    }
}

function emailAlreadyEsxist() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == signup_email.value) {
            return true;
        }
    }
}

function isEmptySignIn() {
    if (signin_email.value == "" || signin_password.value == "") {
        return true;
    }
}

function emailValidation() {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (regex.test(signup_email.value)) {
        signup_email.classList.add("is-valid");
        signup_email.classList.remove("is-invalid");

        return true;
    } else {
        signup_email.classList.add("is-invalid");
        signup_email.classList.remove("is-valid");

        return false;
    }
}

// Main functions
function signUP() {
    if (isEmptySignUp()) {
        signup_error.innerHTML = "All inputs is required";
    } else if (!emailValidation()) {
        signup_error.innerHTML = "Email is incoorect"
    }else {
        if (emailAlreadyEsxist()) {
            signup_error.innerHTML = "Email already exist"
        }
        else {
            user = {
                name: signup_name.value,
                email: signup_email.value,
                password: signup_password.value
            };
            users.push(user);
            saveToLocalStorage();
            signup_error.innerHTML = `<span  class = "text-success"> Success  </span>`;
        }
    }
    
}


function signIn() {
    uname = "";
    if (isEmptySignIn()) {
        signin_error.innerHTML = "All inputs is required ";
    } else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email == signin_email.value && users[i].password == signin_password.value) {
                uname = users[i].name;
                localStorage.setItem("username", uname);
            }
        }

        if (!uname) {
            signin_error.innerHTML = "Incorrect email or password";

        } else {
            window.location.href = "./home.html";
        }
    }

}

function welcomeUser() {
    console.log("hiiiiii");

    username.innerHTML = `Welcome ${localStorage.getItem("username")}`;
}

function signOut() {
    localStorage.removeItem("username");
    window.location.href = "./sign_in.html"
}