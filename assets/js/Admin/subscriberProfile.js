$(document).ready(function () {
    $('#transactionTable').DataTable();
});

function redirect(){
    window.location.href = document.referrer;
}

document.addEventListener("DOMContentLoaded" , ()=>{
    let userDetail = JSON.parse(sessionStorage.getItem("displayUser"));
    document.getElementById("username").innerText = userDetail.name;
    document.getElementById("userstatus").innerText = userDetail.status;
    document.getElementById("userphone").innerText = userDetail.mobile_number;
    document.getElementById("useremail").innerText = userDetail.email_id;
})