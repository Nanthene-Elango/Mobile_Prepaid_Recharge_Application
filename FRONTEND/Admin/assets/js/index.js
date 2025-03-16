document.addEventListener("DOMContentLoaded" , ()=>{

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

        document.getElementById("username").addEventListener("input" , validateUsername);
        document.getElementById("password").addEventListener("input" , validatePassword);
        document.getElementById("username").addEventListener("change" , validateUsername);
        document.getElementById("password").addEventListener("change" , validatePassword);

        function validateUsername(){
            if (document.getElementById("username").value === ""){
                document.getElementById("username-input-box").classList.add('invalid');
                document.getElementById("error-username").textContent = "field is required!";
            }
            else{
                document.getElementById("username-input-box").classList.remove("invalid");
                document.getElementById("error-username").textContent = "";
            }
        }
        function validatePassword(){
            if (document.getElementById("password").value === ""){
                document.getElementById("password-input-box").classList.add("invalid");
                document.getElementById("error-password").textContent = "field is required!";
            }
            else{
                document.getElementById("password-input-box").classList.remove("invalid");
                document.getElementById("error-password").textContent = "";
            }
        }
})

async function isAdmin(username , password){

    try{
        let response = await fetch('http://localhost:8083/auth/admin/login' , {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                "username":username,
                "password":password
            })
        });
    
        if (response.ok){
            let token = await response.json();
            console.log(token.accessToken);
            sessionStorage.setItem("accessToken" , token.accessToken);
            return true;
        }
    }
    catch(error){
        return false;
    }
    
}

async function validateAdmin(){
   let username =  document.getElementById("username").value;
   let password = document.getElementById("password").value;
   if (!await isAdmin(username,password)){
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    showToast("invalid username/password" , "error");
   }
   else{
    window.location.href = './dashboard.html';
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