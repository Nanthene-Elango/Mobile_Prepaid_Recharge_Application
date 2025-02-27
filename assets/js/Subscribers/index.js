let users;
document.addEventListener("DOMContentLoaded" , function(){
    fetch('../assets/data/users.json')
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
        errorField.innerText = "Please Enter your mobi-comm mobile number!"
        return;
    }
    else if (number.length !== 10 || isNaN(number)) {
        errorField.innerText = "";
        errorField.innerText = "Enter a valid 10 digit number!"
        return;
    }
    else if (!isSubscriber(number)) {
        errorField.innerText = "";
        errorField.innerText = "please enter a valid mobi com number";
        return;
    }
    else {
        errorField.innerText = "";
        sessionStorage.setItem("rechargeNumber" , number);
        window.location.href = "../Subscribers/recharge.html"; 
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

function showFeedback(){
    var myModal = new bootstrap.Modal(document.getElementById('feedback'));
    myModal.show();
}
