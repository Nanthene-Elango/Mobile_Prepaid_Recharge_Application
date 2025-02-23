let users;
document.addEventListener("DOMContentLoaded", function () {

    fetch('../assets/data/users.json')
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            users = data;
        })
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let rechargeInput = document.getElementById("rechargeNumber");

    if (sessionStorage.getItem("rechargeNumber") !== null) {
        rechargeInput.value = sessionStorage.getItem("rechargeNumber");
    }
    else if (rechargeInput && user && user.mobile_number) {
        rechargeInput.value = user.mobile_number;
    }
    else {
        document.getElementById("saveBtn").classList.remove("d-none");
        document.getElementById("changeBtn").classList.add("d-none");
    }

    if (document.getElementById("rechargeNumber").value === "") {
        document.getElementById("saveBtn").classList.remove("d-none");
        document.getElementById("changeBtn").classList.add("d-none");
    }
    else {
        document.getElementById("saveBtn").classList.add("d-none");
        document.getElementById("changeBtn").classList.remove("d-none");
    }

});

function isSubscriber(mobileNumber) {
    for (let a in users) {
        if (users[a].mobile_number === mobileNumber) {
            sessionStorage.setItem("rechargeUser", JSON.stringify(users[a]));
            return true;
        }
    }
    return false;
}



function validateNumber() {

    let number = document.getElementById("rechargeNumber").value;
    let errorField = document.getElementById("error-number");
    errorField.classList.remove("d-none")
    if (number == "") {
        errorField.innerText = "";
        errorField.innerText = "Field cannot be empty!"
        return false;
    }
    else if (number.length !== 10 || isNaN(number)) {
        errorField.innerText = "";
        errorField.innerText = "Enter a valid 10 digit number!"
        return false;
    }
    else if (!isSubscriber(number)) {
        errorField.innerText = "";
        errorField.innerText = "please enter a valid mobi com number";
        return false;
    }
    else {
        errorField.innerText = "";
        document.getElementById("error-number").classList.add("d-none");
        return true;
    }
}
function saveNumber() {
    let rechargeInput = document.getElementById("rechargeNumber");
    let number = rechargeInput.value;
    if (validateNumber()) {
        rechargeInput.readOnly = !rechargeInput.readOnly;
        sessionStorage.setItem("rechargeNumber", number);
        document.getElementById("saveBtn").classList.add("d-none");
        document.getElementById("changeBtn").classList.remove("d-none");
    }
    else {
        document.getElementById("rechargeNumber").value = "";
    }
}

function changeNumber() {
    let rechargeInput = document.getElementById("rechargeNumber");
    rechargeInput.readOnly = !rechargeInput.readOnly;
    rechargeInput.value = "";
    document.getElementById("saveBtn").classList.remove("d-none");
    document.getElementById("changeBtn").classList.add("d-none");
    sessionStorage.removeItem("rechargeNumber");
    sessionStorage.removeItem("rechargeUser");
}

function removePlan() {
    localStorage.removeItem("rechargePlan");
}