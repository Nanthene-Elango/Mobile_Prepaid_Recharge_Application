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

    // Validate the current step before moving to the next one
    function validateStep() {
        const currentFormStep = formSteps[currentStep];
        const inputs = currentFormStep.querySelectorAll('input, select, textarea');
        let valid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                valid = false;
                input.classList.add('is-invalid');  // Show invalid styling
                showErrorMessage(input); // Show error message
            } else {
                input.classList.remove('is-invalid');  // Remove invalid styling
                clearErrorMessage(input); // Clear error message
            }
        });

        return valid;
    }

    // Show error message under the input field
    function showErrorMessage(input) {
        let errorMsg = input.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('invalid-feedback')) {
            errorMsg = document.createElement('div');
            errorMsg.classList.add('invalid-feedback');
            input.parentNode.insertBefore(errorMsg, input.nextSibling);
        }
        
        // Custom error message based on the field's validity
        if (input.validity.valueMissing) {
            errorMsg.textContent = `${input.name || 'This field'} is required.`;
        } else if (input.validity.typeMismatch) {
            errorMsg.textContent = `Please enter a valid ${input.name || 'value'}.`;
        } else {
            errorMsg.textContent = "";
        }
    }

    // Clear the error message
    function clearErrorMessage(input) {
        let errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('invalid-feedback')) {
            errorMsg.textContent = "";
        }
    }

    nextBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            if (validateStep()) {
                if (currentStep < formSteps.length - 1) {
                    currentStep++;
                    updateStep();
                }
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

    // Remove error class as the user types a valid value
    formSteps.forEach((step) => {
        const inputs = step.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                if (input.checkValidity()) {
                    input.classList.remove('is-invalid');  // Remove invalid styling
                    clearErrorMessage(input);  // Clear the error message
                }
            });
        });
    });

    // File upload preview
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

    // Submit form and show success message
    document.getElementById("submitBtn").addEventListener("click", function (event) {
        event.preventDefault();
        if (validateStep()) {  // Ensure the last step is valid
            Swal.fire({
                title: "Success!",
                text: "Your Porting Request has been submitted successfully!",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: 'rgb(0,32,96)'
            }).then(() => {
                document.getElementById("portForm").reset();
                currentStep = 0;
                updateStep();
                window.location.href = "./index.html";
            });
        }
    });
});
