document.addEventListener("DOMContentLoaded", async () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Subscribers',
                data: [10, 20, 15, 25, 30],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });

    const chart = document.getElementById('myPieChart1').getContext('2d');
    new Chart(chart, {
        type: 'pie',
        data: {
            labels: ["Data", "Validity", "Unlimited", "Popular", "Student", "Work from home", "Streaming", "Gaming", "OTT Subscription", "Short-Term", "Annual"],
            datasets: [{
                data: [5, 2, 10, 20, 25, 5, 5, 5, 10, 18],
                backgroundColor: ['#1E88E5', '#64B5F6', '#90CAF9', '#BBDEFB']
                ,
            }]
        },
        options: {
            responsive: true
        }
    });
    const chart1 = document.getElementById('myLineChart').getContext('2d');
    new Chart(chart1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Recharge Rate',
                data: [10, 25, 15, 40, 30, 50],
                borderColor: 'blue',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true
        }
    });

    await loadExpiryTable();
    new DataTable("#expiringSubscriberTable");


})

function showProfile(userid) {
    sessionStorage.setItem("displayUser", userid);  
    window.location.href = "./subscriberProfile.html";
}

async function loadExpiryTable() {

    let response = await fetch('http://localhost:8083/admin/subscriber/expiring', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });

    let expiringSubscriber = [];
    if (response.ok) {
        expiringSubscriber = await response.json();
    }

    let tableBody = document.getElementById("expiringSubscriberTableBody");

    if (expiringSubscriber === null) {
        document.getElementById("expiringSubscriberTable").classList.add("d-none");
        document.getElementById("expiringSubscriberTableContainer").innerText = "No Subscribers with expiry nearing!";
    }
    else {
        expiringSubscriber.forEach(element => {
            tableBody.innerHTML += `
                <td>${element.subscriberId}</td>
                <td>${element.fullName}</td>
                <td>${element.phoneNumber}</td>
                <td>${element.plan.category} , Rs.${element.plan.price} , ${element.plan.data} , ${element.plan.validity}</td>
                <td>${formatDate(element.rechargeDate)}</td>
                <td>${formatDate(element.expiryDate)}</td>
                <td>
                    <button class = "btn btn-primary" onclick='showProfile(${element.subscriberId})'><i class = "fas fa-eye"></i> View</button>
                </td>
            `;
        });
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
