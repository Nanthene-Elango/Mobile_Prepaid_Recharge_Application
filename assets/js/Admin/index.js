let users = [];

document.addEventListener("DOMContentLoaded" , ()=>{
    fetch('../assets/data/users.json')
        .then(response => response.json())
        .then(user =>{
            users = user;
        })

        document.getElementById("password-show").addEventListener("click", () => {
            let passwordInput = document.getElementById("password");
            let showButton = document.getElementById("password-show");
            let hideButton = document.getElementById("password-hide");
        
            if (passwordInput.type === "password" && passwordInput.value !== "") {
                passwordInput.type = "text";
                showButton.classList.add("d-none");
                hideButton.classList.remove("d-none");
        
            }
        });
        document.getElementById("password-hide").addEventListener("click", () => {
            let passwordInput = document.getElementById("password");
            let showButton = document.getElementById("password-show");
            let hideButton = document.getElementById("password-hide");
        
            if (passwordInput.type === "text") {
                passwordInput.type = "password";
                hideButton.classList.add("d-none");
                showButton.classList.remove("d-none");
        
            }
        });

        document.getElementById("adminLoginForm").addEventListener("submit" , (event)=>{
            event.preventDefault();
        })

        let admin = users.filter(user => user.role === "admin");
        console.log(admin);
        console.log(users);
        document.getElementById("username").addEventListener("input" , validateUsername);
        document.getElementById("password").addEventListener("input" , validatePassword);
        document.getElementById("username").addEventListener("change" , validateUsername);
        document.getElementById("password").addEventListener("change" , validatePassword);

        function validateUsername(){
            if (document.getElementById("username").value === ""){
                document.getElementById("error-username").textContent = "field is required!";
            }
            else{
                document.getElementById("error-username").textContent = "";
            }
        }
        function validatePassword(){
            if (document.getElementById("password").value === ""){
                document.getElementById("error-password").textContent = "field is required!";
            }
            else{
                document.getElementById("error-password").textContent = "";
            }
        }
})

function isAdmin(username , password){
    for (let i in users){
        if ((users[i].username === username && users[i].password === password)&&(users[i].role === "admin")){
            sessionStorage.setItem("adminUser" , JSON.stringify(users[i]));
            return true;
        }
    }
    return false;
}
function validateAdmin(){
   let username =  document.getElementById("username").value;
   let password = document.getElementById("password").value;
   if (!isAdmin(username,password)){
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    showToast("invalid username/password" , "error");
   }
   else{
    window.location.href = '../Admin/dashboard.html';
   }
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