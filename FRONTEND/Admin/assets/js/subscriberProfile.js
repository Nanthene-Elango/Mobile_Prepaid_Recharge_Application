function redirect(){
    window.location.href = document.referrer;
}

document.addEventListener("DOMContentLoaded" , ()=>{
    var table = $('#transactionTable').DataTable();
    $('#exportCSV').on('click', function () {
        table.button('.buttons-csv').trigger();
    });

    let userDetail = JSON.parse(sessionStorage.getItem("displayUser"));
    document.getElementById("username").innerText = userDetail.name;
    document.getElementById("userstatus").innerText = userDetail.status;
    if (userDetail.status == "inactive"){
        if (document.getElementById("userstatus").classList.contains("text-success")){
            document.getElementById("userstatus").classList.remove("text-success");
        }
        document.getElementById("userstatus").classList.add("text-danger");
        document.getElementById("activateBtn").classList.remove("d-none");
        document.getElementById("deactivateBtn").classList.add("d-none");
    }
    else{
        if (document.getElementById("userstatus").classList.contains("text-danger")){
            document.getElementById("userstatus").classList.remove("text-danger");
        }
        document.getElementById("userstatus").classList.add("text-success");
        document.getElementById("activateBtn").classList.add("d-none");
        document.getElementById("deactivateBtn").classList.remove("d-none");
    }
    document.getElementById("userphone").innerText = userDetail.mobile_number;
    document.getElementById("useremail").innerText = userDetail.email_id;

})

function activateUser(){
    document.getElementById("userstatus").innerText = "active";
    document.getElementById("userstatus").style.color = "green";
    document.getElementById("activateBtn").classList.add("d-none");
    document.getElementById("deactivateBtn").classList.remove("d-none");
    showToast("User is activated!" , "success");
}
function deactivateUser(){
    document.getElementById("userstatus").innerText = "inactive";
    document.getElementById("userstatus").classList.remove("text-success");
    document.getElementById("userstatus").classList.add("text-danger");
    document.getElementById("activateBtn").classList.remove("d-none");
    document.getElementById("deactivateBtn").classList.add("d-none");
    showToast("User is deactivated!" , "error")
}

function showToast(message, indicator) {
    const toastContainer = document.getElementById("toastContainer") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    if (indicator === "error") {
        toast.innerHTML = `<div class="toast-body text-danger"><i class="fa-solid fa-circle-exclamation me-1"></i>${message}</div>`;
    }
    else {
        toast.innerHTML = `<div class="toast-body text-success"><i class="fas fa-check-circle me-1"></i>${message}</div>`;
    }
    toastContainer.appendChild(toast);
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toastContainer.removeChild(toast), 300);
    }, 3000);
}

function createToastContainer() {
    const toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container position-fixed top-0 end-0 p-3 mt-5";
    document.body.appendChild(toastContainer);
    return toastContainer;
}
