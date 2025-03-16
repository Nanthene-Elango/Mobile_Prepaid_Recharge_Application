let generatedOTP;
let timer;
let user;

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("mobile").addEventListener("input", validateNumber);
    document.getElementById("mobile").addEventListener("change", validateNumber);

})

async function validateSubscriber(mobileNumber) {
    try {
        let response = await fetch('http://localhost:8083/auth/subscriber/number', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "phoneNumber": mobileNumber })
        });

        let data = await response.json();

        if (data.user) {
            user = data.user;
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
})

async function validateNumber() {
    let number = document.getElementById("mobile").value;
    let errorField = document.getElementById("error-number");

    if (number == "") {
        document.getElementById("mobile-input").classList.add("invalid")
        document.getElementById("error-icon").classList.remove("d-none");
        errorField.style.display = "block";
        errorField.innerText = "";
        errorField.innerText = "Field cannot be empty!"
        return false;
    }
    else if (isNaN(number)) {
        document.getElementById("mobile-input").classList.add("invalid")
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile").value = number.replace(/\D/g, "");
        errorField.style.display = "block";
        errorField.innerText = "";
        errorField.innerText = "Enter a valid 10 digit number!"
        return false;
    }
    else if (number.length !== 10) {
        document.getElementById("mobile-input").classList.add("invalid")
        document.getElementById("error-icon").classList.remove("d-none");
        errorField.style.display = "block";
        errorField.innerText = "";
        errorField.innerText = "Enter a valid 10 digit number!"
        return false;
    }
    let isValidSubscriber = await validateSubscriber(number);

    if (!isValidSubscriber) {
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile-input").classList.add('invalid');
        errorField.innerText = "Please enter a valid MobiComm number!";
        return;
    }
    document.getElementById("error-icon").classList.add("d-none");
    document.getElementById("mobile-input").classList.remove("invalid")
    errorField.style.display = "none";
    document.getElementById("sendOtpBtn").disabled = false;
    return true;
}

async function generateOTP() {
    let response = await fetch(`http://localhost:8083/auth/otp/generate/${user.subscriberId}` , {
        method: "POST"
    });
    let data = await response.json();

    console.log(data);
    if (data.otp){
        return data.otp;
    }
    else{
        console.log("Invalid User");
        return null;
    }

}
async function sendOTP() {

    if (validateNumber()!=null) {
        document.getElementById("mobile").disabled = true;
        console.log(user.subscriberId);
        let generatedOTP = await generateOTP()
        let toast = document.getElementById("toast");
        toast.innerHTML = "Your OTP: " + generatedOTP;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 5000);

        document.getElementById("otpSection").style.display = "block";
        document.getElementById("sendOtpBtn").disabled = true;
        document.getElementById("resendBtn").disabled = true;
        startTimer();
        return;
    }
}

async function verifyOTP() {

    let enteredOTP = document.getElementById("otp").value;

    let response = await fetch(`http://localhost:8083/auth/otp/verify/${user.subscriberId}` , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "otp":enteredOTP
        })
    })

    let data = await response.json();

    if (data.error){
        document.getElementById("error-otp").style.display = "block";
        document.getElementById("error-otp").textContent = "Invalid OTP!";
        return;
    }
    else{
        if (data.accessToken){
            sessionStorage.setItem("accessToken" , data.accessToken);
            document.getElementById("mobile").disabled = false;
            document.getElementById("error-otp").style.display = "none";
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            sessionStorage.setItem("rechargeNumber", user.phoneNumber);
            sessionStorage.setItem("rechargeUser", JSON.stringify(user));
            checkLoginStatus();
            let redirectURL = sessionStorage.getItem("redirectAfterLogin");
            sessionStorage.removeItem("redirectAfterLogin");
            Swal.fire({
                icon: 'success',
                title: 'OTP Verified',
                text: 'You have successfully logged in!',
                confirmButtonText: 'OK',
                confirmButtonColor: 'rgb(0,32,96)'
    
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = redirectURL || './index.html';
                    // window.location.href = "plans.html";
                }
            });
        }
    }

}

function startTimer() {
    let timeLeft = 60;
    document.getElementById("timer").innerText = "OTP expires in " + timeLeft + "s";
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "OTP expires in " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("timer").innerText = "OTP expired. Request a new one.";
            document.getElementById("resendBtn").disabled = false;
        }
    }, 1000);
}
function checkLoginStatus() {
    let user = sessionStorage.getItem("loggedInUser");
    let loginBtn = document.getElementById("loginBtn");
    let accountBtn = document.getElementById("accountMenu");

    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (accountBtn) accountBtn.style.display = "block";
    } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (accountBtn) accountBtn.style.display = "none";
    }
}