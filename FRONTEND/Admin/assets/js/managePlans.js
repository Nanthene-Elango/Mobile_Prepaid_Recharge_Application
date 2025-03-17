let plansData = [];
let categories = [];

function displayPlans(plans) {
    const tableBody = document.getElementById("plansTable");
    tableBody.innerHTML = "";
    plans.forEach((plan) => {
        let actionButton = plan.status === "ACTIVE" 
            ? `<span id="deleteBtn${plan.planId}" class="action-btn text-danger" style="cursor:pointer" onclick="deletePlan(${plan.planId})">
                    <abbr data-title="Delete"><i class="fas fa-trash text-danger"></i></abbr>
               </span>`
            : `<span id="restoreBtn${plan.planId}" class="action-btn text-success" style="cursor:pointer" onclick="restorePlan(${plan.planId})">
                    <abbr data-title="Restore"><i class="fas fa-undo text-success"></i></abbr>
               </span>`;

        tableBody.innerHTML += `
            <tr>
                <td>${plan.planId}</td>
                <td>${plan.category}</td>
                <td>${plan.price}</td>
                <td>${plan.data}</td>
                <td>${plan.validity}</td>
                <td>${plan.calls}</td>
                <td>${plan.sms}</td>
                <td>${plan.benefits}</td>
                <td>${plan.status}</td>
                <td class="d-flex justify-content-around">
                    <span id="editBtn${plan.planId}" class="action-btn text-primary" style="cursor:pointer;" onclick="editPlan(${plan.planId})">
                        <abbr data-title="Edit"><i class="fas fa-edit text-primary"></i></abbr>
                    </span>
                    ${actionButton}
                </td>
            </tr>`;
    });
}


function filterPlans(category) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");

    if (category === "All") {
        displayPlans(plansData);
    } else {
        const filteredPlans = plansData.filter(plan => plan.category === category);
        displayPlans(filteredPlans);
    }
}

async function loadPlans() {
    let response = await fetch('http://localhost:8083/plans/all');
    if (response.ok){
        plansData = await response.json();
    }
}

async function loadCategories() {
    let response = await fetch('http://localhost:8083/categories');
    if (response){
        categories  = await response.json();
    }   

    const categorySelect = document.getElementById("planCategory");
    categorySelect.innerHTML = "";
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.category;
        option.textContent = category.category;
        categorySelect.appendChild(option);
    });
}


function openAddModal() {
    document.getElementById("modalTitle").innerText = "Add Plan";
    document.getElementById("editPlanId").value = "";
    document.getElementById("planCategory").value = "";
    document.getElementById("planData").value = "";
    document.getElementById("planValidity").value = "";
    document.getElementById("planPrice").value = "";
    document.getElementById("planCalls").value = "";
    document.getElementById("planSMS").value = "";
    document.getElementById("planBenefits").value = "";
    new bootstrap.Modal(document.getElementById("planModal")).show();
}

function editPlan(planId) {
    const plan = plansData.find(p => p.planId === planId);
    document.getElementById("modalTitle").innerText = "Edit Plan";
    document.getElementById("editPlanId").value = plan.planId;
    document.getElementById("planCategory").value = plan.category;
    document.getElementById("planData").value = plan.data;
    document.getElementById("planValidity").value = plan.validity;
    document.getElementById("planPrice").value = plan.price;
    document.getElementById("planCalls").value = plan.calls;
    document.getElementById("planSMS").value = plan.sms;
    document.getElementById("planBenefits").value = plan.benefits;
    new bootstrap.Modal(document.getElementById("planModal")).show();
}

document.addEventListener("DOMContentLoaded", async () => {

    await loadCategories();
    await loadPlans();
    displayPlans(plansData);

    document.getElementById("savePlanBtn").addEventListener("click", function () {
        const id = document.getElementById("editPlanId").value;
        const category = document.getElementById("planCategory").value;
        const data = document.getElementById("planData").value;
        const validity = document.getElementById("planValidity").value;
        const calls = document.getElementById("planCalls").value === "" ? null :document.getElementById("planCalls").value;
        const sms = document.getElementById("planSMS").value === "" ? null :document.getElementById("planSMS").value;
        const price = document.getElementById("planPrice").value;
        const benefits = document.getElementById("planBenefits").value === "" ? null :document.getElementById("planBenefits").value;

        let addPlanJSON = JSON.stringify({
            "category":category,
            "price":price,
            "data":data,
            "calls":calls,
            "sms":sms,
            "validity":validity,
            "benefits":benefits
        })
        let updatePlanJSON = JSON.stringify({
            "planId":id,
            "category":category,
            "price":price,
            "data":data,
            "calls":calls,
            "sms":sms,
            "validity":validity,
            "benefits":benefits
        })
        if (id) {
            updatePlan(updatePlanJSON);
        } else {
            addPlan(addPlanJSON);
        }
        displayPlans(plansData);
        bootstrap.Modal.getInstance(document.getElementById("planModal")).hide();
    });
});

async function updatePlan(planJson) {
    let response = await fetch('http://localhost:8083/plans/update' , {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: planJson
    })

    if (response.ok){
        await loadPlans();
        displayPlans(plansData)
        showToast("Plan Updated Successfully!" , "success");
    }
    else{
        showToast("Failed to update plan" , "error");
    }

}

async function addPlan(planJson) {
    let response = await fetch('http://localhost:8083/plans/add' , {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: planJson
    })

    if (response.ok){
        await loadPlans();
        displayPlans(plansData);
        showToast("Plan Added Successfully!" , "success");
    }
    else{
        showToast("Failed to add plan" , "error");
    }

}

async function restorePlan(planId){
    let response = await fetch(`http://localhost:8083/plans/activate/${planId}`,{
        method:"POST"
    });
    if (response.ok){
        await loadPlans();
        displayPlans(plansData);
        showToast("Plan Restored Successfully!" , "success");
    }
    else{
        showToast("Failed to restore the plan!" , "error");
    }
}

function deletePlan(planId) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0d6efd",
        confirmButtonText: "Yes, delete it!"

    }).then(async(result) => {
        if (result.isConfirmed) {
            // plansData = plansData.filter(plan => plan.planid !== planId);
            // displayPlans(plansData);
            let response = await fetch(`http://localhost:8083/plans/delete/${planId}`,{
                method:"POST"
            });
            if (response.ok){
                await loadPlans();
                displayPlans(plansData);
                Swal.fire("Deleted!", "Your plan has been deleted.", "success");
            }
           
        }
    });
}

async function addCategory() {
    const newCategory = document.getElementById("newCategory").value.trim().toLowerCase();
    if (newCategory === "") {
        showToast(`Category is empty!`, "error");
        return;
    }
    let response = await fetch('http://localhost:8083/category/add', {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            "category":newCategory
        })
    });
    if (response.ok){
        categories.push(newCategory);
        loadCategories();
        document.getElementById("newCategory").value = "";
        showToast(`Category "${newCategory}" added successfully!`, "success");
    }
    else {
        document.getElementById("newCategory").value = "";
        showToast(`Category "${newCategory}" already exists!`, "error");
    }
}

function addCategoryTab(newCategory) {
    let newCat = document.createElement("div");
    newCat.textContent = newCategory;
    newCat.classList.add("tab");
    newCat.onclick = function () {
        filterPlans(newCategory);
    };
    document.getElementById("categoriesNav").appendChild(newCat);
}

function showToast(message, indicator) {
    const toastContainer = document.getElementById("toastContainer") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = "toast";
    if (indicator === "error") {
        toast.innerHTML = `<div class="toast-body text-danger"><i class="fa-solid fa-circle-exclamation me-1"></i>${message}</div>`;
    }
    else {
        toast.innerHTML = `<div class="toast-body text-success"><i class="fas fa-check-circle me-1"></i>${message}</div>`;
    }
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
