document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const formSteps = document.querySelectorAll(".form-step");
    const progressBar = document.getElementById("progressBar");
    const nextBtns = document.querySelectorAll(".next-step");
    const prevBtns = document.querySelectorAll(".prev-step");

    function updateStep() {
        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });
        progressBar.style.width = ((currentStep + 1) / formSteps.length) * 100 + "%";
    }

    nextBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            if (currentStep < formSteps.length - 1) {
                currentStep++;
                updateStep();
            }
        });
    });

    prevBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            if (currentStep > 0) {
                currentStep--;
                updateStep();
            }
        });
    });

    document.getElementById("fileInput").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("previewImg").src = e.target.result;
                document.getElementById("previewImg").style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("submitBtn").addEventListener("click", function (event) {
        event.preventDefault();
        Swal.fire({
            title: "Success!",
            text: "Your Porting Request has been submitted successfully!",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            document.getElementById("portForm").reset();
            currentStep = 0;
            updateStep();
            window.location.href = "../../index.html"
        });
    });
});