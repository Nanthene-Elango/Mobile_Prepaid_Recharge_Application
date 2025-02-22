let users;

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
   if (isAdmin(username,password)){
    document.getElementById("error").textContent = "";
    window.location.href = '../Admin/dashboard.html';
   }
   else{
    document.getElementById("error").textContent = "invalid username/password";
   }
}