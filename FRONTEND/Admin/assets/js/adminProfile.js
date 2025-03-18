document.addEventListener("DOMContentLoaded", async () => {
    loadProfileDetails();
})

async function loadProfileDetails() {
    let admin = await fetchAdmin();
    document.getElementById("username").value = admin.username;
    document.getElementById("password").value = admin.password;
    document.getElementById("email").value = admin.email;
    document.getElementById("phoneNumber").value = admin.phoneNumber;
}

async function fetchAdmin() {
    let response = await fetch('http://localhost:8083/admin/profile', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
            "adminId": JSON.parse(sessionStorage.getItem("adminUser"))
        })
    })

    if (response.ok) {
        let data = await response.json();
        return data;
    }
    else {
        console.log(response.status);
    }

}

async function saveEmail() {
    let newvalue = document.getElementById("email").value;

    if (newvalue === "") {
        showToast("Enter a valid Email Id!", "error");
    }
    else {
        let response = await fetch("http://localhost:8083/admin/update/email", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                "userId": sessionStorage.getItem("adminUser"),
                "newvalue": newvalue
            })
        })

        if (response.ok) {
            document.getElementById("email").readOnly = true;
            showToast("Email Updated Successfully!", "success");
            document.getElementById("editEmailBtn").classList.remove("d-none");
            document.getElementById("saveEmailBtn").classList.add("d-none");
        } 
        else if (response.status === 400) {
            document.getElementById("email").readOnly = true;
            showToast("Email ID Already Exists!", "error");
            document.getElementById("editEmailBtn").classList.remove("d-none");
            document.getElementById("saveEmailBtn").classList.add("d-none");
        } 
        else {
            document.getElementById("email").readOnly = true;
            showToast(`Failed to update email! Error: ${response.status}`, "error");
            document.getElementById("editEmailBtn").classList.remove("d-none");
            document.getElementById("saveEmailBtn").classList.add("d-none");
        }
        await loadProfileDetails();
        
    }
}

async function saveUsername() {
    let newvalue = document.getElementById("username").value;

    if (newvalue === "") {
        showToast("Please Enter a valid Username!", "error");
    }
    else {
        let response = await fetch("http://localhost:8083/admin/update/username", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                "userId": sessionStorage.getItem("adminUser"),
                "newvalue": newvalue
            })
        })

        if (response.ok) {
            document.getElementById("username").readOnly = true;
            showToast("Username Updated Successfully!", "success");
            document.getElementById("editUsernameBtn").classList.remove("d-none");
            document.getElementById("saveUsernameBtn").classList.add("d-none");
            
        } 
        else if (response.status === 400) {
            document.getElementById("username").readOnly = true;
            showToast("Username Already Exists!", "error");
            document.getElementById("editUsernameBtn").classList.remove("d-none");
            document.getElementById("saveUsernameBtn").classList.add("d-none");
        } 
        else {
            document.getElementById("username").readOnly = true;
            showToast(`Failed to update username! Error: ${response.status}`, "error");
            document.getElementById("editUsernameBtn").classList.remove("d-none");
            document.getElementById("saveUsernameBtn").classList.add("d-none");
        }
        await loadProfileDetails();
    }
}

async function savePassword() {
    let newvalue = document.getElementById("password").value;

    if (newvalue === "") {
        showToast("Enter a valid password!", "error");
    }
    else {
        let response = await fetch("http://localhost:8083/admin/update/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                "userId": sessionStorage.getItem("adminUser"),
                "newvalue": newvalue
            })
        })

        if (response.ok) {
            document.getElementById("password").readOnly = true;
            showToast("Password Updated Successfully!", "success");
            document.getElementById("editPasswordBtn").classList.remove("d-none");
            document.getElementById("savePasswordBtn").classList.add("d-none");
        } 
        else {
            document.getElementById("password").readOnly = true;
            showToast(`Failed to update email! Error: ${response.status}`, "error");
            document.getElementById("editPasswordBtn").classList.remove("d-none");
            document.getElementById("savePasswordBtn").classList.add("d-none");
        }
        await loadProfileDetails();
    }
}


function editEmail() {
    document.getElementById("email").readOnly = false;
    document.getElementById("editEmailBtn").classList.add("d-none");
    document.getElementById("saveEmailBtn").classList.remove("d-none");
}

// function editUsername() {
//     document.getElementById("username").readOnly = false;
//     document.getElementById("editUsernameBtn").classList.add("d-none");
//     document.getElementById("saveUsernameBtn").classList.remove("d-none");
// }

function editPassword() {
    document.getElementById("password").readOnly = false;
    document.getElementById("password").value = "";
    document.getElementById("editPasswordBtn").classList.add("d-none");
    document.getElementById("savePasswordBtn").classList.remove("d-none");
}

function showToast(message, indicator) {
    const toastContainer = document.getElementById("toastContainer") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    if (indicator === "error"){
        toast.innerHTML = `<div class="toast-body text-danger"><i class="fa-solid fa-circle-exclamation me-1"></i>${message}</div>`;
    }
    else{
        toast.innerHTML = `<div class="toast-body text-success"><i class="fa-solid fa-circle-check me-1"></i>${message}</div>`;
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