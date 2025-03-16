document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("mobile").addEventListener("input", validate);
    document.getElementById("mobile").addEventListener("change", validate);
});

async function isSubscriber(mobileNumber) {
    try {
        let response = await fetch('http://localhost:8083/auth/subscriber/number', {
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


async function validate() {
    let number = document.getElementById("mobile").value;
    let errorField = document.getElementById("error-number");

    if (number == "") {
        errorField.innerText = "";
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile-input").classList.add('invalid');
        errorField.innerText = "Please Enter your mobi-comm mobile number!"
        return;
    }
    else if (isNaN(number)) {
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile-input").classList.add('invalid');
        document.getElementById("mobile").value = number.replace(/\D/g, "");
        errorField.innerText = "";
        errorField.innerText = "Enter a valid 10 digit number!"
        return;
    }
    else if (number.length !== 10) {
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile-input").classList.add('invalid');
        errorField.innerText = "";
        errorField.innerText = "Enter a valid 10 digit number!"
        return;
    }

    let isValidSubscriber = await isSubscriber(number);

    if (!isValidSubscriber) {
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile-input").classList.add('invalid');
        errorField.innerText = "Please enter a valid MobiComm number!";
        return;
    }
    document.getElementById("error-icon").classList.add("d-none");
    document.getElementById("mobile-input").classList.remove('invalid');
    errorField.innerText = "";
    sessionStorage.setItem("rechargeNumber", number);
    window.location.href = "./plans.html";

}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function () {
    let btn = document.getElementById("goTopBtn");
    if (document.documentElement.scrollTop > 500) {
        btn.classList.remove("d-none");
    } else {
        btn.classList.add("d-none");
    }

    let btn1 = document.getElementById("feedbackBtn");
    if (document.documentElement.scrollTop > 2100) {
        btn1.classList.remove("d-none");
    } else {
        btn1.classList.add("d-none");
    }
};
