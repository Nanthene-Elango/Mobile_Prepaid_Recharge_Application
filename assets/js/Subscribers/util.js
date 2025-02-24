document.addEventListener("DOMContentLoaded", function () {

    fetch("../Subscribers/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbarContainer").innerHTML = data;
            checkLoginStatus();
            setupLogout();
        });
});


function checkLoginStatus() {
    let user = sessionStorage.getItem("loggedInUser");
    let loginBtn = document.getElementById("loginBtn");
    let accountBtn = document.getElementById("accountMenu");

    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (accountBtn) {
            accountBtn.style.display = "block";
            document.getElementById("navUserName").textContent = JSON.parse(user).name;
        }
    } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (accountBtn) accountBtn.style.display = "none";
    }
}


function setupLogout() {
    let logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {

            sessionStorage.removeItem("loggedInUser");
            sessionStorage.removeItem("rechargeNumber");
            sessionStorage.removeItem("rechargeUser");
            setTimeout(() => {
                window.location.href = "../index.html"; 
            }, 500);
        });
    }
}

function savePageURL() {
    sessionStorage.setItem("redirectAfterLogin", window.location.href);
}