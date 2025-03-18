let subscribers = [];

document.addEventListener("DOMContentLoaded", async() => {
    await loadSubscribers();
    displaySubscribers(subscribers);
    var table = $('#subscriberTable').DataTable();
    $('#exportCSV').on('click', function () {
        table.button('.buttons-csv').trigger();
    });
})

async function loadSubscribers() {
    let response = await fetch('http://localhost:8083/admin/subscribers' , {
        headers:{
            "Authorization":`Bearer ${sessionStorage.getItem('accessToken')}`
        }
    })

    if (response.ok){
        console.log(response);
        subscribers = await response.json();
        console.log(subscribers);
    }
}

function displaySubscribers(subscribers) {

    const tableBody = document.getElementById("subscribersTable");
    tableBody.innerHTML = "";

    if (subscribers === null){
        tableBody.innerText = "No Data Found!";
        return;
    }
   
    subscribers.forEach((subscribers) => {
        if (subscribers.role !== "admin") {
            tableBody.innerHTML += `
            <tr>
                <td>${subscribers.subscriberId}</td>
                <td>${subscribers.fullName}</td>
                <td>${subscribers.phoneNumber}</td>
                <td>${subscribers.email}</td>
                <td>${subscribers.dob}</td>
                <td>${subscribers.address}</td>
                <td>${subscribers.gender}</td>
                <td id ="status${subscribers.subscriberId}">${subscribers.status}</td>
                <td>
                    <button class="btn btn-primary" onclick="showProfile(${subscribers.subscriberId})">view</button>
                </td>
            </tr>`;
            setColor(subscribers.status, subscribers.subscriberId);
        }

    });
}

function setColor(status, id) {
    if (status === "ACTIVE") {
        document.getElementById(`status${id}`).style.color = "green";
    }
    else {
        document.getElementById(`status${id}`).style.color = "red";
    }
}

function showProfile(userid) {
    let userDetail = subscribers.filter(user => user.id === userid);
    console.log(userDetail[0]);
    sessionStorage.setItem("displayUser", JSON.stringify(userDetail[0]));

    window.location.href = "./subscriberProfile.html";
}

function searchUsers(searchInput) {
    if (searchInput === "") {
        showToast("Please Enter a search value!", "error");
        return;
    }
    let filteredUser;
    searchInput = searchInput.toLowerCase();
    filteredUser = subscribers.filter(function (user) {
        if (isNaN(searchInput)) {
            if ((user.name.toLowerCase().includes(searchInput) || user.email_id.toLowerCase().includes(searchInput) || user.address.toLowerCase().includes(searchInput))) {
                return user;
            }
        }
        else {
            if (user.id.toString().includes(searchInput) || user.mobile_number.includes(searchInput)) {
                return user;
            }
        }
    });
    console.log(filteredUser);
    displaySubscribers(filteredUser);
    document.getElementById("clearFilter").classList.remove("d-none");
}

function clearFilter() {
    document.getElementById("clearFilter").classList.add("d-none");
    displaySubscribers(subscribers);
}

function showToast(message, indicator) {
    const toastContainer = document.getElementById("toastContainer") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<div class="toast-body text-danger"><i class="fa-solid fa-circle-exclamation me-1"></i>${message}</div>`;
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
