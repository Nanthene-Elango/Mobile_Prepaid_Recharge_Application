function logout() {
    sessionStorage.removeItem("adminUser");
    window.location.href = './index.html';
}