document.addEventListener("DOMContentLoaded" , function(){
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email_id;
    document.getElementById("userNumber").textContent = "+91 " + user.mobile_number;
    document.getElementById("userDOB").textContent = user.dob;
    document.getElementById("userAddress").textContent = user.address;

    document.getElementById("transactions-link").addEventListener("click", () => {
        document.getElementById("transactions-link").classList.add("active");
        document.getElementById("recharge-link").classList.remove("active");
        document.getElementById("recharge-history").style.display = "none";
        document.getElementById("transactions").style.display = "block";
        

    });
    document.getElementById("recharge-link").addEventListener("click", () => {
        document.getElementById("transactions").style.display = "none";
        document.getElementById("recharge-history").style.display = "block";
        document.getElementById("transactions-link").classList.remove("active");
        document.getElementById("recharge-link").classList.add("active");
    });
})

function showNotification(){
    if(document.getElementById("notification").classList.contains("d-none")){
        document.getElementById("notification").classList.remove("d-none");
    }else{
        document.getElementById("notification").classList.add("d-none")
    }
}

function editEmail(){
    var myModal = new bootstrap.Modal(document.getElementById('editEmail'));
    myModal.show();
}