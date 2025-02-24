let users;
document.addEventListener("DOMContentLoaded" , function(){
    fetch('../assets/data/users.json')
    .then(response => response.json())
        .then(user => {
            users = user;
        }); 
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
        errorField.innerText = "Field cannot be empty!"
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

// Show/hide button on scroll
window.onscroll = function () {
    let btn = document.getElementById("goTopBtn");
    if (document.documentElement.scrollTop > 600) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

function showFeedback(){
    var myModal = new bootstrap.Modal(document.getElementById('feedback'));
    myModal.show();
}
