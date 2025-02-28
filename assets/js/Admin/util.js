function logout() {
    sessionStorage.removeItem("adminUser");
    window.location.href = '../Admin/index.html';
}