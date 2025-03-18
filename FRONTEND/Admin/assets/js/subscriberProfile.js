function redirect(){
    window.location.href = document.referrer;
}

document.addEventListener("DOMContentLoaded" , async()=>{
    await showProfile(sessionStorage.getItem("displayUser"));
    await showActivePlan(sessionStorage.getItem('displayUser'));
    await showTransactionDetail(sessionStorage.getItem('displayUser'));

    var table = $('#transactionTable').DataTable();
    $('#exportCSV').on('click', function () {
        table.button('.buttons-csv').trigger();
    });

    if (document.getElementById("userstatus").innerText === "ACTIVE"){
        document.getElementById("userstatus").classList.add("text-success");
    }
    else{
        document.getElementById("userstatus").classList.add("text-danger");
    }
})

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

async function showProfile(userId) {
    let response = await fetch('http://localhost:8083/subscriber/profile' , {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
            "userId":userId
        })
    })

    if (response.ok){
        let userDetails = await response.json();
        displayProfile(userDetails);
    }
}

async function showTransactionDetail(userId){
    let response = await fetch('http://localhost:8083/subscriber/profile/transactions' , {
        method: "POST" , 
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
            "userId":userId
        })
    })

    if (response.ok){
        let tableContainer = document.getElementById("transactionTableBody");
        let data = await response.json();
    
        data.forEach(element => {
            tableContainer.innerHTML += `
            <tr>
                            <td>${element.transactionId}</td>
                            <td>${element.transationNumber}</td>
                            <td>${element.amount}</td>
                            <td>${element.planDetail.planId}</td>
                            <td>${formatDate(element.date)}</td>
                            <td>${element.paymentMethod}</td>
                            <td class="text-success">${element.status}</td>
                        </tr>
            `
        });
    }
}

function displayProfile(userDetails){
    document.getElementById("username").innerText = userDetails.fullName;
    document.getElementById("userstatus").innerText = userDetails.status;
    document.getElementById("userphone").innerText = `+91 ${userDetails.phoneNumber}`;
    document.getElementById("useremail").innerText = userDetails.email;
    document.getElementById("userRegDate").innerText = `subscriber since ${userDetails.dateOfRegistration}`;
    document.getElementById("userDOB").innerText = userDetails.dob;
}

async function showActivePlan(userId) {
    try {
        let response = await fetch('http://localhost:8083/subscriber/active-plan', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ "userId": userId})
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        activePlan = data || {};

        if (!activePlan.plan) {
            document.getElementById("no-active-plan").classList.remove("d-none");
            return;
        }

        let calls = activePlan.plan.calls !== null? activePlan.plan.calls:"No Calls";
        let sms = activePlan.plan.sms !== null?activePlan.plan.sms:"No SMS";

        document.getElementById("userActivePlan").classList.remove("d-none");
        document.getElementById("planPrice").innerText = activePlan.plan.price;
        document.getElementById("planData").innerText = activePlan.plan.data;
        document.getElementById("planValidity").innerText = activePlan.plan.validity;
        document.getElementById("callsAndSms").innerText = `${calls}, ${sms}`;
        document.getElementById("dateOfRecharge").innerText = formatDate(activePlan.rechargeDate);
        document.getElementById("dateOfExpiry").innerText = formatDate(activePlan.expiryDate);
        if (activePlan.plan.benefits !== null){
            let div = document.getElementById("planBenefits");
            for (let b of activePlan.plan.benefits.split(",")){
                let d = document.createElement("div");
                d.innerHTML = `<span class = 'text-muted'><i class = 'fas fa-check text-success'></i> ${b}</span>`;
                div.appendChild(d);
            }
        }
        else{
            document.getElementById("planBenefits").innerText = "No Benefits";
        }

    } catch (error) {
        console.error("Error loading active plan:", error);
        document.getElementById("no-active-plan").classList.remove("d-none");
    }
}

function formatDate(dateStr) {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date"; 

    const options = { 
        day: "2-digit", 
        month: "short", 
        year: "numeric", 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit", 
        hour12: false 
    };

    return date.toLocaleString("en-GB", options).replace(",", "");
}

function redirect(){
    window.location.href = document.referrer;
}