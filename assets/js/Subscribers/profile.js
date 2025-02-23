document.addEventListener("DOMContentLoaded" , function(){
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email_id;
    document.getElementById("userNumber").textContent = "+91 " + user.mobile_number;
    document.getElementById("userDOB").textContent = user.dob;
    document.getElementById("userAddress").textContent = user.address;
})

function showNotification(){
    if(document.getElementById("notification").classList.contains("d-none")){
        document.getElementById("notification").classList.remove("d-none");
    }else{
        document.getElementById("notification").classList.add("d-none")
    }
}