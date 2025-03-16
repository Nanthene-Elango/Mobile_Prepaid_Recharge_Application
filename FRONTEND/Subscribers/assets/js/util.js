document.addEventListener("DOMContentLoaded", function () {

    fetch("./navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbarContainer").innerHTML = data;
            checkLoginStatus();
            setupLogout();
            const navLinks = document.querySelectorAll(".navbar-link");
            const currentPath = window.location.pathname; 
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
            document.getElementById("navUserName").textContent = JSON.parse(user).fullName;
        }
    } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (accountBtn) accountBtn.style.display = "none";
    }
}

async function logout() {
    await fetch("http://localhost:8083/subscriber/logout", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
        }
    })
}
function setupLogout() {

    let logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async function () {
            await logout();
            sessionStorage.clear();
            setTimeout(() => {
                window.location.href = "./index.html";
            }, 500);
        });
    }
}

function savePageURL() {
    sessionStorage.setItem("redirectAfterLogin", window.location.href);
}