let plan = JSON.parse(localStorage.getItem("rechargePlan"));
document.addEventListener("DOMContentLoaded", function () {
    let phonePay = document.getElementById("phonePay");
    let googlePay = document.getElementById("googlePay");
    let paytm = document.getElementById("paytm");
    let amazonPay = document.getElementById("amazonPay");

    phonePay.addEventListener("click", () => {
        phonePay.style.opacity = "1";
        googlePay.style.opacity = "0.5";
        paytm.style.opacity = "0.5";
        amazonPay.style.opacity = "0.5";
        document.getElementById("upiId").classList.remove("d-none");
    })

    googlePay.addEventListener("click", () => {
        googlePay.style.opacity = "1";
        phonePay.style.opacity = "0.5";
        paytm.style.opacity = "0.5";
        amazonPay.style.opacity = "0.5";
        document.getElementById("upiId").classList.remove("d-none");
    })

    paytm.addEventListener("click", () => {
        paytm.style.opacity = "1";
        phonePay.style.opacity = "0.5";
        googlePay.style.opacity = "0.5";
        amazonPay.style.opacity = "0.5";
        document.getElementById("upiId").classList.remove("d-none");
    })

    amazonPay.addEventListener("click", () => {
        amazonPay.style.opacity = "1";
        phonePay.style.opacity = "0.5";
        googlePay.style.opacity = "0.5";
        paytm.style.opacity = "0.5";
        document.getElementById("upiId").classList.remove("d-none");
    })

    let user = JSON.parse(sessionStorage.getItem("rechargeUser"));
    document.getElementById("name").innerText = user.name;
    document.getElementById("number").innerText = user.mobile_number;
    document.getElementById("price").innerText = plan.price;
    document.getElementById("data").innerText = plan.data;
    document.getElementById("validity").innerText = plan.validity;
    document.getElementById("benefits").innerText = plan.benefits;
    document.getElementById("amount").innerText = plan.price;

    document.getElementById("backBtn").addEventListener("click", () => {
        localStorage.removeItem("rechargePlans");
        window.location.href = './recharge.html';
    })

    document.getElementById("cardNumber").addEventListener("change", validateCard);
    document.getElementById("mm").addEventListener("change", validateMM);
    document.getElementById("yy").addEventListener("change", validateYY);
    document.getElementById("cvv").addEventListener("change", validateCVV);

    document.getElementById("cardNumber").addEventListener("input", validateCard);
    document.getElementById("mm").addEventListener("input", validateMM);
    document.getElementById("yy").addEventListener("input", validateYY);
    document.getElementById("cvv").addEventListener("input", validateCVV);

    document.getElementById("upiInput").addEventListener("input", () => {
        console.log(document.getElementById("upiInput").value);
        if (document.getElementById("upiInput").value == "") {
            document.getElementById("upiInput").classList.add("is-invalid");
            document.getElementById("upiVerify").disabled = true;
            document.getElementById("error-upi").textContent = "UPI ID is required!"
        }
        else if (!(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$').test(document.getElementById("upiInput").value))) {
            document.getElementById("upiInput").classList.add("is-invalid");
            document.getElementById("upiVerify").disabled = true;
            document.getElementById("error-upi").textContent = "Enter a valid UPI ID!";
        }
        else {
            document.getElementById("upiInput").classList.remove("is-invalid");
            document.getElementById("error-upi").textContent = "";
            document.getElementById("upiVerify").disabled = false;
        }
    })
})

function validateCard() {
    let cardNumber = document.getElementById("cardNumber").value;
    let errorFeild = document.getElementById("error-card");
    if (cardNumber === "") {
        document.getElementById("cardNumber").classList.add("is-invalid");
        errorFeild.innerText = "Please fill your card number!";
        return false;
    }
    else if (isNaN(cardNumber)) {
        document.getElementById("cardNumber").classList.add("is-invalid");
        document.getElementById("cardNumber").value = cardNumber.replace(/\D/g, "");
        errorFeild.innerText = "card number must contains only digits!";
        return false;
    }
    else if (cardNumber.length !== 16) {
        document.getElementById("cardNumber").classList.add("is-invalid");
        errorFeild.innerText = "Enter a valid 16 digit card number!";
        return false;
    }
    else {
        document.getElementById("cardNumber").classList.remove("is-invalid");
        errorFeild.innerText = "";
        return true;
    }
}

function validateMM() {
    let mm = document.getElementById("mm").value;
    let errorField = document.getElementById("error-mm");
    let months = "01 02 03 04 05 06 07 08 09 10 11 12";
    if (mm === "") {
        document.getElementById("mm").classList.add("is-invalid");
        errorField.innerText = "MM is Required!";
    }
    else if (!months.includes(mm)) {
        document.getElementById("mm").classList.add("is-invalid");
        errorField.innerText = "Enter a valid month between ('01' - '12')";
    }
    else if (isNaN(mm) || mm.length !== 2) {
        document.getElementById("mm").classList.add("is-invalid");
        document.getElementById("mm").value = mm.replace(/\D/g, "");
        errorField.innerText = "Enter a valid month 'MM'";
    }
    else {
        document.getElementById("mm").classList.remove("is-invalid");
        errorField.innerText = "";
        return true;
    }
    return false;

}
function validateYY() {
    let yy = document.getElementById("yy").value;
    let errorField = document.getElementById("error-yy");
    if (yy === "") {
        document.getElementById("yy").classList.add("is-invalid");
        errorField.innerText = "YY is Required!";
    }
    else if (isNaN(yy) || yy.length !== 2) {
        document.getElementById("yy").classList.add("is-invalid");
        document.getElementById("yy").value = yy.replace(/\D/g, "");
        errorField.innerText = "Enter a valid year 'YY'";
    }
    else {
        document.getElementById("yy").classList.remove("is-invalid");
        errorField.innerText = "";
        return true;
    }
    return false;
}

function validateCVV() {
    let cvv = document.getElementById("cvv").value;
    let errorField = document.getElementById("error-cvv");
    if (cvv === "") {
        document.getElementById("cvv").classList.add("is-invalid");
        errorField.innerText = "CVV is Required!";
    }
    else if (isNaN(cvv) || cvv.length !== 3) {
        document.getElementById("cvv").classList.add("is-invalid");
        document.getElementById("cvv").value = cvv.replace(/\D/g, "");
        errorField.innerText = "Enter a valid 3 digit CVV";
    }
    else {
        document.getElementById("cvv").classList.remove("is-invalid");
        errorField.innerText = "";
        return true;
    }
    return false;

}

function validateBank() {
    if (document.getElementById("bank").value === "") {
        document.getElementById("bank").classList.add("is-invalid");
        document.getElementById("error-bank").innerText = "Please choose a bank to proceed!";
        return false;
    }
    else {
        document.getElementById("bank").classList.remove("is-invalid");
        document.getElementById("error-bank").innerText = "";
        return true;
    }
}
function processPayment(paymentMethod) {

    document.getElementById("payment_form1").addEventListener("submit", function (event) {
        event.preventDefault();
    })
    document.getElementById("payment_form2").addEventListener("submit", function (event) {
        event.preventDefault();
    })
    document.getElementById("payment_form3").addEventListener("submit", function (event) {
        event.preventDefault();
    })


    if (paymentMethod === "Credit/Debit Card") {
        if (!(validateCard() && validateMM() && validateYY() && validateCVV())) {
            return;
        }
    }

    if (paymentMethod === "Net Banking") {
        if (validateBank()) {
            sessionStorage.setItem("bank", document.getElementById("bank").value);
        }
        else {
            return;
        }
    }
    sessionStorage.setItem("paymentMethod", paymentMethod)
    Swal.fire({
        title: "Processing Payment...",
        text: "Please wait while we complete your transaction.",
        imageUrl: "https://i.gifer.com/7efs.gif",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
            setTimeout(() => {
                Swal.close();

                Swal.fire({
                    title: "Payment Successful!",
                    text: "Your payment has been processed successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: 'rgb(8, 158, 7)',
                    allowOutsideClick: false,
                    backdrop: true
                }).then(() => {
                    showInvoice();
                });

            }, 3000);
        }
    });
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}

function showInvoice() {
    let paymentMethod = sessionStorage.getItem("paymentMethod");
    let number = sessionStorage.getItem("rechargeNumber");
    let rechargeDate = formatDate(new Date());
    let transactionId = `#INV${Math.floor(Math.random() * 100000)}`;
    sessionStorage.setItem("rechargeDate", rechargeDate);
    sessionStorage.setItem("transactionId", transactionId);
    const invoiceHTML = `
   <table style = "width:100%;text-align: left; border-collapse: collapse;font-size:0.89rem;">
            <tr>
                <td style= "width:50%"><strong>Transaction ID:</strong></td>
                <td>${transactionId}</td>
            </tr>
            <tr >
                <td style= "width:50%"><strong>Mobile Number:</strong></td>
                <td>${number}</td>
            </tr>
            <tr>
                <td style= "width:50%"><strong>Recharge Date:</strong></td>
                <td>${rechargeDate}</td>
            </tr>
            <tr >
                <td style= "width:50%"><strong>Amount Paid:</strong></td>
                <td>Rs. ${plan.price}</td>
            </tr>
            <tr >
                <td style= "width:50%"><strong>Mode of Payment:</strong></td>
                <td>${paymentMethod}</td>
            </tr>
            <tr>
                <td colspan="2"><h4 style="margin-top: 15px;">Plan Details:</h4></td>
            </tr>
            <tr >
                <td style= "width:50%"><strong>Data:</strong></td>
                <td>${plan.data}</td>
            </tr>
            <tr >
                <td style= "width:50%"><strong>Validity:</strong></td>
                <td>${plan.validity}</td>
            </tr>
            <tr  >
                <td style= "width:50%; text-align: top"><strong>Benefits:</strong></td>
                <td>${plan.benefits.join(", ")}</td>
            </tr>
        </table>
        <hr>
        <p style="text-align: center; font-style: italic; margin-top: 10px;font-size:0.9rem;">Your plan has been activated. Enjoy uninterrupted service!</p>`;

    Swal.fire({
        title: "Payment History",
        html: invoiceHTML,
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonText: "Download Invoice",
        confirmButtonColor: '#f40808'
    }).then((result) => {
        if (result.isConfirmed) {
            downloadInvoicePDF();
        }
        else {
            redirect();
        }
    });
}



function downloadInvoicePDF() {

    let invoice = document.createElement("div");
    invoice.id = "invoice";
    invoice.classList.add("invoice-box");

    invoice.innerHTML = `<div class="logo">
            <img src="./assets/img/Logo.png" alt="Prepaid Go" height="60">
        </div>

        <h2 class="invoice-title">Invoice</h2>

        <div class="details">
            <div style="display: flex;justify-content: space-between;">
                <p><strong>Mobi-Comm Services Ltd.</strong></p>
                <p>Date: <span id="invoice-date">${sessionStorage.getItem("rechargeDate")}</span></p>
            </div>
            <p><strong>Transaction ID: </strong><span id="transaction-id">${sessionStorage.getItem("transactionId")}</span></p>
            <p><strong>Mode of Payment: </strong><span id="payment-mode">${sessionStorage.getItem("paymentMethod")}</span></p>
            <p><strong>Mobile Number: </strong><span id="mobile-number">${sessionStorage.getItem("rechargeNumber")}</span></p>

        </div>

        <div class="table-container">
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Plan Description</th>
                        <th>Quantity</th>
                        <th>Unit Price (Rs.)</th>
                        <th>Total (Rs.)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="plan-details">Plan: ${plan.data} - ${plan.validity}</td>
                        <td id="planQuantity">1</td>
                        <td id="invoice-unit-price">${plan.price}</td>
                        <td id="invoice-total">${plan.price}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p><strong>Total: Rs. </strong><span id="invoice-grand-total">${plan.price}</span></p>

        <p class="footer">Your plan has been activated. Enjoy uninterrupted service!</p>

        <div class="signature">
            <img src="./assets/img/signature.png" alt="signature" style="height: 30px;">
            <p>Authorized Signatory</p>
        </div>`

    document.body.appendChild(invoice);

    setTimeout(() => {
        html2pdf()
            .from(invoice)
            .set({
                margin: 10,
                filename: 'invoice.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { format: 'a4', orientation: 'portrait' }
            })
            .save()
            .then(() => {
                document.body.removeChild(invoice);
            });
    }, 500); 
    // const element = document.getElementById("invoice");
    // html2pdf().from(element).save("invoice.pdf");

    setTimeout(() => {
        document.body.removeChild(invoice);
        redirect();
    }, 2000);
}


function redirect() {
    setTimeout(() => {
        sessionStorage.removeItem("transactionId");
        localStorage.removeItem("rechargePlans");
        sessionStorage.removeItem("rechargeNumber");
        sessionStorage.removeItem("rechargeUser");
        sessionStorage.removeItem("paymentMethod");
        sessionStorage.removeItem("rechargeDate");
        window.location.href = "./index.html";
    }, 500);
}