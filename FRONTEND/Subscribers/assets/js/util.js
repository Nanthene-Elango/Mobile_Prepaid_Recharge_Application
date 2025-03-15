document.addEventListener("DOMContentLoaded", function () {

    fetch("./navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbarContainer").innerHTML = data;
            checkLoginStatus();
            setupLogout();
            const navLinks = document.querySelectorAll(".navbar-link");
            console.log(navLinks);
            const currentPath = window.location.pathname; 
            console.log(currentPath);
            navLinks.forEach(link => {
                if (currentPath.includes(link.getAttribute("href"))) {
                    document.querySelectorAll(".navbar-link").forEach(nav => nav.classList.remove("active"));
                    link.classList.add("active"); 
                }
            });
    
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
                window.location.href = "./index.html";
            }, 500);
        });
    }
}

function savePageURL() {
    sessionStorage.setItem("redirectAfterLogin", window.location.href);
}