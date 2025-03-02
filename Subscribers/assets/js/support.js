
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("name").addEventListener("input", validateName);
    document.getElementById("mobile").addEventListener("input", validatePhone);
    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("query").addEventListener("input", validateQuery);
})

function validateName() {
    document.getElementById('nameError').style.display = 'none';
    const name = document.getElementById('name').value;
    if (name.length < 2 || name.length > 50) {
        document.getElementById('name').classList.add("is-invalid");
        document.getElementById('nameError').style.display = 'block';
        return false;
    }
    document.getElementById('name').classList.remove("is-invalid");
    return true;
}
function validatePhone() {
    document.getElementById('mobileError').style.display = 'none';
    const mobile = document.getElementById('mobile').value;
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(mobile)) {
        document.getElementById('mobile-input').classList.add("invalid");
        document.getElementById('error-icon').classList.remove("d-none");
        document.getElementById('mobile').value = mobile.replace(/\D/g, "");
        document.getElementById('mobileError').style.display = 'block';
        return false;
    }
    document.getElementById('mobile-input').classList.remove("invalid");
    document.getElementById('error-icon').classList.add("d-none");
    return true;
}

function validateEmail() {
    document.getElementById('emailError').style.display = 'none';
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email').classList.add("is-invalid");
        document.getElementById('emailError').style.display = 'block';
        return false;
    }
    document.getElementById('email').classList.remove("is-invalid");
    return true;
}

function validateQuery() {
    document.getElementById('queryError').style.display = 'none';
    const query = document.getElementById('query').value;
    if (query.trim() === '') {
        document.getElementById('query').classList.add("is-invalid");
        document.getElementById('queryError').style.display = 'block';
        return false;
    }
    document.getElementById('query').classList.remove("is-invalid");
    return true;
}
function validateForm() {

    if (validateName() && validatePhone() && validateEmail() && validateQuery()) {
        Swal.fire({
            title: "Success!",
            text: "Your Issue Has been Submitted , Our team will resolve it soon!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: 'rgb(0,32,96)'
        }).then(() => {
            document.getElementById("supportForm").reset();
            return true;
        });
    }
    return false;
}