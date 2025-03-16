document.addEventListener("DOMContentLoaded" , function(){
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    document.getElementById("userName").innerText = user.fullName;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userNumber").value = "+91 " + user.phoneNumber;
    document.getElementById("userDOB").value = user.dob;
    document.getElementById("userAddress").innerText = user.address;

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

function editEmail(){
    document.getElementById("userEmail").classList.add("edit");
    document.getElementById("userEmail").readOnly = false;
    document.getElementById("editEmail").classList.add("d-none");
    document.getElementById("saveEmail").classList.remove("d-none");
}

function saveEmail(){
    let mailBox = document.getElementById("userEmail");
    mailBox.readOnly = true;
    mailBox.classList.remove("edit");
    document.getElementById("editEmail").classList.remove("d-none");
    document.getElementById("saveEmail").classList.add("d-none");
}