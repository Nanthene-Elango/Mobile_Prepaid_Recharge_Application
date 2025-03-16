document.addEventListener("DOMContentLoaded", function () {

    let rechargeInput = document.getElementById("rechargeNumber");

    if (sessionStorage.getItem("rechargeNumber") !== null) {
        rechargeInput.value = sessionStorage.getItem("rechargeNumber");
        rechargeInput.readOnly = true;
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

    document.getElementById("rechargeNumber").addEventListener("input", validateNumber)
    document.getElementById("rechargeNumber").addEventListener("change", validateNumber)
});

async function validateSubscriber(mobileNumber) {
    try {
        let response = await fetch('http://localhost:8083/subscriber/number', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "phoneNumber": mobileNumber })
        });

        let data = await response.json();

        if (data.user) {
            sessionStorage.setItem("rechargeUser" , JSON.stringify(data.user));
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function validateNumber() {

    let number = document.getElementById("rechargeNumber").value;
    let errorField = document.getElementById("error-number");
    errorField.classList.remove("d-none")
    if (number == "") {
        document.getElementById("mobile-input").classList.add("invalid");
        document.getElementById("error-icon").classList.remove("d-none");
        errorField.innerText = "";
        errorField.innerText = "Field cannot be empty!"
        return false;
    }
    else if (isNaN(number)) {
        document.getElementById("mobile-input").classList.add("invalid");
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("rechargeNumber").value = number.replace(/\D/g, "");
        errorField.innerText = "";
        errorField.innerText = "Enter a valid 10 digit number!"
        return false;
    }
    else if (number.length !== 10) {
        document.getElementById("mobile-input").classList.add("invalid");
        document.getElementById("error-icon").classList.remove("d-none");
        errorField.innerText = "";
        errorField.innerText = "Enter a valid 10 digit number!"
        return false;
    }
    let isValidSubscriber = await validateSubscriber(number);

    if (!isValidSubscriber) {
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile-input").classList.add('invalid');
        errorField.innerText = "Please enter a valid MobiComm number!";
        return false;
    }
    document.getElementById("mobile-input").classList.remove("invalid");
    document.getElementById("error-icon").classList.add("d-none");
    errorField.innerText = "";
    document.getElementById("error-number").classList.add("d-none");
    return true;
}

async function saveNumber() {
    let rechargeInput = document.getElementById("rechargeNumber");
    let number = rechargeInput.value;
    if (await validateNumber()) {
        rechargeInput.readOnly = true;
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
    rechargeInput.readOnly = false;
    rechargeInput.value = "";
    document.getElementById("saveBtn").classList.remove("d-none");
    document.getElementById("changeBtn").classList.add("d-none");
    sessionStorage.removeItem("rechargeNumber");
    sessionStorage.removeItem("rechargeUser");
}

function removePlan() {
    localStorage.removeItem("rechargePlan");
}