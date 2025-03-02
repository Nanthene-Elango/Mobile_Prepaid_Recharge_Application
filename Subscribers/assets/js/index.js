let users;
document.addEventListener("DOMContentLoaded" , function(){
    fetch('assets/data/users.json')
    .then(response => response.json())
        .then(user => {
            users = user;
        }); 

    document.getElementById("mobile").addEventListener("input" , validate);
    document.getElementById("mobile").addEventListener("change" , validate);
});

function isSubscriber(mobileNumber) {
    for (let a in users){
     if(users[a].mobile_number === mobileNumber){
        sessionStorage.setItem("rechargeUser" , JSON.stringify(users[a]));
        return true;
     }
    }
    return false;
 }
 
function validate(){
    let number = document.getElementById("mobile").value;
    let errorField = document.getElementById("error-number");
   
    if (number == "") {
        errorField.innerText = "";
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile-input").classList.add('invalid');
        errorField.innerText = "Please Enter your mobi-comm mobile number!"
        return;
    }
    else if(isNaN(number)){
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
    else if (!isSubscriber(number)) {
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("mobile-input").classList.add('invalid');
        errorField.innerText = "";
        errorField.innerText = "please enter a valid mobi com number";
        return;
    }
    else {
        document.getElementById("error-icon").classList.add("d-none");
        document.getElementById("mobile-input").classList.remove('invalid');
        errorField.innerText = "";
        sessionStorage.setItem("rechargeNumber" , number);
        window.location.href = "./recharge.html"; 
    }
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
