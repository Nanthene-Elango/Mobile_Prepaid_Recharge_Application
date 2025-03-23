const baseURL = 'http://localhost:8083/plans';
document.addEventListener("DOMContentLoaded", function () {
    loadCategories();
    initializeCarousel();
})

function generatePlanCard(plan) {
    return `
        <div class="card">
            <div class="col-12 card-body d-flex flex-column my-1 p-4">
                <div class="col-12 d-flex justify-content-between">
                    <div class="d-flex justify-content-between col-10">
                        <div><strong>Rs. ${plan.price}</strong><br>Price</div>
                        <div><strong>${plan.data}</strong><br>Data</div>
                        <div><strong>${plan.validity}</strong><br>Validity</div>
                    </div>
                    <a onclick='confirmPayment(${JSON.stringify(plan)})'>
                        <abbr data-title="Recharge"><i class="fa-solid fa-chevron-right fa-lg px-2" style="color: #002060; cursor:pointer"></i></abbr>
                    </a>
                </div>
                <hr>
                <div class="d-flex justify-content-end view-details">
                    <div>
                        <a class="text-primary text-decoration-none" style="cursor:pointer" 
                           onclick='showDetails(${JSON.stringify(plan)})'>View Details</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadCategories() {
    fetch(`${baseURL}/categories`)
        .then(reponse => reponse.json())
        .then(category => {
            let plansNav = document.getElementById("plan-items");
            category.forEach(data => {
                let nav = document.createElement("div");
                nav.classList.add("plan-item");
                nav.classList.add("text-center");
                let category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
                nav.innerHTML = `<a class="plan-link p-2" href="#${data.category}-plans">${category} Plans</a>`;
                plansNav.appendChild(nav);

                let plansContainer = document.getElementById("plansContainer");
                let planCard = document.createElement("div");
                planCard.classList.add("card");
                planCard.classList.add("m-md-4");
                planCard.classList.add("my-4");
                planCard.classList.add("plans");
                planCard.id = `${data.category}-plans`;
                planCard.innerHTML = `
                    <div class="card-header" style="border-radius: 5px;">
                        ${category} Plans
                    </div>
                    <div id="${data.category}-plan-cards">
                        
                    </div>`;
                plansContainer.appendChild(planCard);
                loadPlanByCategory(data.category);
            })
        });
}

function loadPlanByCategory(category) {
    fetch(`${baseURL}/category/${category}`)
        .then(reponse => reponse.json())
        .then(plans => {
            let allPlansCard = document.getElementById("all-plan-cards");
            let planCard = document.getElementById(`${category}-plan-cards`);
            plans.forEach(plan => {
                let card = generatePlanCard(plan);
                planCard.innerHTML += card;
                allPlansCard.innerHTML += card;
            })
        })
}

function displayFilteredPlans(filteredPlans) {
    let categories = extractCategories(filteredPlans);
    let plancontainer = document.getElementById("plansContainer");
    plancontainer.innerHTML = "";
    let plansNav = document.getElementById("plan-items");
    console.log(categories);
    plansNav.innerText = "";
    categories.forEach(data => {
        let nav = document.createElement("div");
        nav.classList.add("plan-item");
        nav.classList.add("text-center");
        let category = data.charAt(0).toUpperCase() + data.slice(1);
        nav.innerHTML = `<a class="plan-link p-2" href="#${data}-plans">${category} Plans</a>`;
        plansNav.appendChild(nav);

        let plansContainer = document.getElementById("plansContainer");
        let planCard = document.createElement("div");
        planCard.classList.add("card");
        planCard.classList.add("m-md-4");
        planCard.classList.add("my-4");
        planCard.classList.add("plans");
        planCard.id = `${data}-plans`;
        planCard.innerHTML = `
            <div class="card-header" style="border-radius: 5px;">
                ${category} Plans
            </div>
            <div id="${data}-plan-cards">
                
            </div>`
        plansContainer.appendChild(planCard)
        let plans = filterByCategory(filteredPlans, data);
        console.log(plans);
        let planCard1 = document.getElementById(`${data}-plan-cards`);
        plans.forEach(plan => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = generatePlanCard(plan);
            planCard1.appendChild(card);

        })
    })
}

async function fetchPlanById(id) {
    const response = await fetch(`${baseURL}/${id}`);
    const data = await response.json();
    return data;
}

async function initializeCarousel() {
    let carousel1 = document.getElementById("carousel-card-1");
    let carousel2 = document.getElementById("carousel-card-2");
    let carousel3 = document.getElementById("carousel-card-3");

    let plan1 = await fetchPlanById(1);
    let plan2 = await fetchPlanById(2);
    let plan3 = await fetchPlanById(3);

    carousel1.innerHTML = generateCarouselPlanHTML(plan1);
    carousel2.innerHTML = generateCarouselPlanHTML(plan2);
    carousel3.innerHTML = generateCarouselPlanHTML(plan3);
}

function generateCarouselPlanHTML(plan) {
    return `
        <h3>${plan.category} Plan</h3>
        <h4>Rs. ${plan.price}</h4>
        <p>Validity: ${plan.validity}</p>
        <p>${plan.calls} & ${plan.sms}</p>
        <p>Benefits: ${plan.benefits}</p>
        <button class="btn btn-primary col-6 col-lg-4" onclick='confirmPayment(${JSON.stringify(plan)})'>Recharge Now</button>
    `;
}

function filterPlans() {
    document.getElementById("clear").classList.remove("d-none");

    let filterCriteria = {
        maxPrice: document.getElementById("pricerange").value,
        selectedData: Array.from(document.querySelectorAll('#dataFilter input[type="checkbox"]:checked'))
            .map(cb => cb.value),
        selectedValidity: Array.from(document.querySelectorAll('#validityFilter input[type="checkbox"]:checked'))
            .map(cb => cb.value)
    };

    fetchFilteredPlans(JSON.stringify(filterCriteria))
}

async function fetchFilteredPlans(filterCriteria) {

    console.log(filterCriteria);
    let response = await fetch('http://localhost:8083/plans/filter', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: filterCriteria
    })
    let data = [];
    if (response.ok) {
        data = await response.json();
        displayFilteredPlans(data);
    } 
    else if(response.status == 404){
        document.getElementById("plansContainer").classList.add("d-none");
        document.getElementById("filterResult").classList.remove("d-none");
        document.getElementById("filterResult").innerHTML = "<div class = 'text-center text-danger'>OOPS! No plans Matches your search :(</div>"
    }
    else {
        console.error("Error fetching filtered plans:", response.statusText);
    }
}

function clearFilters(){
    window.location.reload();
}



function filterByCategory(filteredPlans, selectedCategory) {
    return filteredPlans.filter(plan => plan.category === selectedCategory);
}

function extractCategories(filteredPlans) {
    console.log(filteredPlans)
    let categories = new Set();

    filteredPlans.forEach(plan => {
        if (plan.category) {
            categories.add(plan.category);
        }
    });

    return Array.from(categories);
}


function showDetails(plan) {

    document.getElementById("price").textContent = `Rs. ${plan.price}`;
    document.getElementById("validity").textContent = plan.validity;
    document.getElementById("data").textContent = plan.data;
    let calls = document.getElementById("calls");
    let sms = document.getElementById("sms");

    if (plan.calls != null) {
        calls.textContent = plan.calls;
    }
    else {
        calls.textContent = "No Calls";
    }
    if (plan.sms != null) {
        sms.textContent = plan.sms;
    }
    else {
        sms.textContent = "No SMS";
    }
    let benefitsContainer = document.getElementById("benefits");
    if (plan.benefits != null) {
        benefitsContainer.innerHTML = "";
        for (let i of plan.benefits.split(',')) {
            let b = document.createElement("div");
            b.classList.add("benefits");
            b.innerHTML = `<i class = "fas fa-check text-success"></i> <span>${i.trim()}</span>`;
            benefitsContainer.appendChild(b);
        }
    } else {
        benefitsContainer.innerHTML = `<p>No additional benefits</p>`;
    }

    var myModal = new bootstrap.Modal(document.getElementById('planDetail'));
    myModal.show();
}

function confirmPayment(plan) {

    if (document.getElementById("rechargeNumber").value === "") {
        window.location.href = '#aside';
        document.getElementById("mobile-input").classList.add("invalid");
        document.getElementById("error-icon").classList.remove("d-none");
        document.getElementById("error-number").classList.remove("d-none");
        showToast("Recharge Number is Required!", "error");
        document.getElementById("error-number").innerText = "Recharge Number is Required!";
    }
    else {
        sessionStorage.setItem("rechargePlan", JSON.stringify(plan));
        document.getElementById("rechargeNumber").value = "";
        document.getElementById("mobile-input").classList.remove("invalid");
        document.getElementById("error-icon").classList.add("d-none");
        document.getElementById("error-number").classList.add("d-none");
        document.getElementById("planPrice").textContent = plan.price;
        document.getElementById("planValidity").textContent = plan.validity;
        document.getElementById("planData").textContent = plan.data;
        document.getElementById("planAmount").textContent = plan.price;

        var myModal = new bootstrap.Modal(document.getElementById('payConfirmation'));
        myModal.show();
    }


}

function showFilters() {

    var myModal = new bootstrap.Modal(document.getElementById('planFilter'));
    myModal.show();
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
    toastContainer.className = "toast-container p-3 mt-5";
    toastContainer.style.position = "fixed";
    toastContainer.style.top = "30px";
    toastContainer.style.right = "0px";
    document.body.appendChild(toastContainer);
    return toastContainer;
}

