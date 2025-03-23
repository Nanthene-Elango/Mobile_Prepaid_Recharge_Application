function logout() {
    fetch("http://localhost:8083/admin/logout" , {
        method: "POST",
        headers: {
            "Authorization":`Bearer ${sessionStorage.getItem('accessToken')}`
        },
    })    
    sessionStorage.clear();
    sessionStorage.removeItem("adminUser");
    window.location.href = './index.html';
}