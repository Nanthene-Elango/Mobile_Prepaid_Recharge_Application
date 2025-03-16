const baseURL = 'http://localhost:8083/plans';
document.addEventListener("DOMContentLoaded", function () {
        loadCategories();
        initializeCarousel();
})

function loadCategories(){
    fetch('http://localhost:8083/categories')
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
            planCard.id =  `${data.category}-plans`;
            planCard.innerHTML = `
            <div class="card-header" style="border-radius: 5px;">
                ${category} Plans
            </div>
            <div id="${data.category}-plan-cards">
                
            </div>`
            plansContainer.appendChild(planCard)
            loadPlanByCategory(data.category);
        })
    })
}


function loadPlanByCategory(category){
    fetch(`${baseURL}/category/${category}`)
    .then(reponse => reponse.json())
    .then(plans => {
        let allPlansCard = document.getElementById("all-plan-cards");
        let planCard = document.getElementById(`${category}-plan-cards`);
        plans.forEach(plan => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
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
            `
            planCard.appendChild(card);
            allPlansCard.appendChild(card.cloneNode(true));
        })
    })
}

async function fetchPlanById(id) {
    const response = await fetch(`${baseURL}/${id}`);
    const data = await response.json();
    return data; // Return the fetched plan object
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

    let maxPrice = document.getElementById("pricerange").value;

    let selectedData = Array.from(document.querySelectorAll('#dataFilter input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    let selectedValidity = Array.from(document.querySelectorAll('#validityFilter input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    let filteredPlans;
    if (selectedData.length == 0 && selectedValidity.length == 0) {
        filteredPlans = plans.filter(plan =>
            plan.price <= maxPrice
        );
    }
    else {
        filteredPlans = plans.filter(plan =>
            plan.price <= maxPrice &&
            (selectedData.length !== 0 && selectedData.some(data => plan.data.toLowerCase().startsWith(data.toLowerCase()))) ||
            (selectedValidity.length !== 0 && selectedValidity.some(validity => plan.validity.toLowerCase().startsWith(validity.toLowerCase())))
        );
    }

    console.log("Filtered Plans:", filteredPlans);
    displayFilteredPlans(filteredPlans);
}


function clearFilters() {

    let rangeInput = document.getElementById("pricerange");
    rangeInput.value = 2500;
    document.getElementById("rangeValue").innerText = "2500";

    document.getElementById("searchInput").value = "";

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    if (document.getElementById("plansContainer").classList.contains("d-none")) {
        document.getElementById("plansContainer").classList.remove("d-none");
    }
    else {
        if (document.getElementById("popular-plans").classList.contains("d-none")) {
            document.getElementById("popular-plans").classList.remove("d-none")
        }
        if (document.getElementById("validity-plans").classList.contains("d-none")) {
            document.getElementById("validity-plans").classList.remove("d-none")
        }
        if (document.getElementById("data-plans").classList.contains("d-none")) {
            document.getElementById("data-plans").classList.remove("d-none")
        }
        if (document.getElementById("unlimited-plans").classList.contains("d-none")) {
            document.getElementById("unlimited-plans").classList.remove("d-none")
        }
        if (document.getElementById("annual-plans").classList.contains("d-none")) {
            document.getElementById("annual-plans").classList.remove("d-none")
        }
        if (document.getElementById("streaming-plans").classList.contains("d-none")) {
            document.getElementById("streaming-plans").classList.remove("d-none")
        }
        if (document.getElementById("student-plans").classList.contains("d-none")) {
            document.getElementById("student-plans").classList.remove("d-none")
        }
        if (document.getElementById("ott-plans").classList.contains("d-none")) {
            document.getElementById("ott-plans").classList.remove("d-none")
        }
        if (document.getElementById("gaming-plans").classList.contains("d-none")) {
            document.getElementById("gaming-plans").classList.remove("d-none")
        }
        if (document.getElementById("wfh-plans").classList.contains("d-none")) {
            document.getElementById("wfh-plans").classList.remove("d-none")
        }
        if (document.getElementById("short-term-plans").classList.contains("d-none")) {
            document.getElementById("short-term-plans").classList.remove("d-none")
        }
    }

    displayPlans(plans);
    document.getElementById("clear").classList.add("d-none");
}

function displayFilteredPlans(filteredPlans) {


    if (document.getElementById("plansContainer").classList.contains("d-none")) {
        document.getElementById("plansContainer").classList.remove("d-none");
    }
    else {
        if (document.getElementById("popular-plans").classList.contains("d-none")) {
            document.getElementById("popular-plans").classList.remove("d-none")
        }
        if (document.getElementById("validity-plans").classList.contains("d-none")) {
            document.getElementById("validity-plans").classList.remove("d-none")
        }
        if (document.getElementById("data-plans").classList.contains("d-none")) {
            document.getElementById("data-plans").classList.remove("d-none")
        }
        if (document.getElementById("unlimited-plans").classList.contains("d-none")) {
            document.getElementById("unlimited-plans").classList.remove("d-none")
        }
        if (document.getElementById("annual-plans").classList.contains("d-none")) {
            document.getElementById("annual-plans").classList.remove("d-none")
        }
        if (document.getElementById("streaming-plans").classList.contains("d-none")) {
            document.getElementById("streaming-plans").classList.remove("d-none")
        }
        if (document.getElementById("student-plans").classList.contains("d-none")) {
            document.getElementById("student-plans").classList.remove("d-none")
        }
        if (document.getElementById("ott-plans").classList.contains("d-none")) {
            document.getElementById("ott-plans").classList.remove("d-none")
        }
        if (document.getElementById("gaming-plans").classList.contains("d-none")) {
            document.getElementById("gaming-plans").classList.remove("d-none")
        }
        if (document.getElementById("wfh-plans").classList.contains("d-none")) {
            document.getElementById("wfh-plans").classList.remove("d-none")
        }
        if (document.getElementById("short-term-plans").classList.contains("d-none")) {
            document.getElementById("short-term-plans").classList.remove("d-none")
        }
    }


    let allPlans = document.getElementById("all-plan-cards");
    let popular = document.getElementById("popular-plan-cards");
    let validity = document.getElementById("validity-plan-cards");
    let data_plans = document.getElementById("data-plan-cards");
    let unlimited = document.getElementById("unlimited-plan-cards");
    let streaming = document.getElementById("streaming-plan-cards");
    let student = document.getElementById("student-plan-cards");
    let ott = document.getElementById("ott-plan-cards");
    let gaming = document.getElementById("gaming-plan-cards");
    let wfh = document.getElementById("wfh-plan-cards");
    let annual = document.getElementById("annual-plan-cards");
    let shortterm = document.getElementById("short-term-plan-cards");

    allPlans.innerHTML = "";
    popular.innerHTML = "";
    validity.innerHTML = "";
    data_plans.innerHTML = "";
    unlimited.innerHTML = "";
    streaming.innerHTML = "";
    student.innerHTML = "";
    ott.innerHTML = "";
    gaming.innerHTML = "";
    wfh.innerHTML = "";
    annual.innerHTML = "";
    shortterm.innerHTML = "";

    console.log(filteredPlans)

    if (filteredPlans.length == 0) {
        document.getElementById("plansContainer").classList.add("d-none");
        document.getElementById("filterResult").classList.remove("d-none");
        document.getElementById("filterResult").innerText = "Oops! No plans matches your search :(";
        return;
    }


    if (!document.getElementById("filterResult").classList.contains("d-none")) {
        document.getElementById("filterResult").classList.add("d-none");
    }
    filteredPlans.forEach(plan => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
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
        `;

        allPlans.appendChild(card.cloneNode(true));
        if (plan.category === "Popular") popular.appendChild(card);
        if (plan.category === "Validity") validity.appendChild(card);
        if (plan.category === "Data") data_plans.appendChild(card);
        if (plan.category === "Unlimited") unlimited.appendChild(card);
        if (plan.category === "Streaming") streaming.appendChild(card);
        if (plan.category === "Gaming") gaming.appendChild(card);
        if (plan.category === "OTT Subscriptions") ott.appendChild(card);
        if (plan.category === "Student") student.appendChild(card);
        if (plan.category === "Work From Home") wfh.appendChild(card);
        if (plan.category === "Annual") annual.appendChild(card);
        if (plan.category === "Short-term") shortterm.appendChild(card);

        if (popular.children.length == 0) {
            document.getElementById("popular-plans").classList.add("d-none");
        }
        if (validity.children.length == 0) {
            document.getElementById("validity-plans").classList.add("d-none");
        }
        if (data_plans.children.length == 0) {
            document.getElementById("data-plans").classList.add("d-none");
        }
        if (unlimited.children.length == 0) {
            document.getElementById("unlimited-plans").classList.add("d-none");
        }
        if (annual.children.length == 0) {
            document.getElementById("annual-plans").classList.add("d-none");
        }
        if (streaming.children.length == 0) {
            document.getElementById("streaming-plans").classList.add("d-none");
        }
        if (student.children.length == 0) {
            document.getElementById("student-plans").classList.add("d-none");
        }
        if (wfh.children.length == 0) {
            document.getElementById("wfh-plans").classList.add("d-none");
        }
        if (ott.children.length == 0) {
            document.getElementById("ott-plans").classList.add("d-none");
        }
        if (shortterm.children.length == 0) {
            document.getElementById("short-term-plans").classList.add("d-none");
        }
        if (gaming.children.length == 0) {
            document.getElementById("gaming-plans").classList.add("d-none");
        }

    });
}
function displayPlans(plans) {

    let allPlans = document.getElementById("all-plan-cards");
    let popular = document.getElementById("popular-plan-cards");
    let validity = document.getElementById("validity-plan-cards");
    let data_plans = document.getElementById("data-plan-cards");
    let unlimited = document.getElementById("unlimited-plan-cards");

    let streaming = document.getElementById("streaming-plan-cards");
    let student = document.getElementById("student-plan-cards");
    let ott = document.getElementById("ott-plan-cards");
    let gaming = document.getElementById("gaming-plan-cards");
    let wfh = document.getElementById("wfh-plan-cards");
    let annual = document.getElementById("annual-plan-cards");
    let shortterm = document.getElementById("short-term-plan-cards");

    plans.forEach(plan => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="col-12 card-body d-flex flex-column my-1 p-4">
                <div class="col-12 d-flex justify-content-between">
                    <div class="d-flex justify-content-between col-10">
                        <div><strong>Rs. ${plan.price}</strong><br>Price</div>
                        <div><strong>${plan.data}</strong><br>Data</div>
                        <div><strong>${plan.validity}</strong><br>Validity</div>
                    </div>
                    <a onclick='confirmPayment(${JSON.stringify(plan)})' id="recharge">
                        <abbr data-title = "Recharge"><i class="fa-solid fa-chevron-right fa-lg px-2" style="color: #002060; cursor:pointer"></i></abbr>
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
        `;

        allPlans.appendChild(card.cloneNode(true));
        if (plan.category === "Popular") popular.appendChild(card);
        if (plan.category === "Validity") validity.appendChild(card);
        if (plan.category === "Data") data_plans.appendChild(card);
        if (plan.category === "Unlimited") unlimited.appendChild(card);
        if (plan.category === "Streaming") streaming.appendChild(card);
        if (plan.category === "Gaming") gaming.appendChild(card);
        if (plan.category === "OTT Subscriptions") ott.appendChild(card);
        if (plan.category === "Student") student.appendChild(card);
        if (plan.category === "Work From Home") wfh.appendChild(card);
        if (plan.category === "Annual") annual.appendChild(card);
        if (plan.category === "Short-term") shortterm.appendChild(card);
    });
}

function showDetails(plan) {

    document.getElementById("price").textContent = `Rs. ${plan.price}`;
    document.getElementById("validity").textContent = plan.validity;
    document.getElementById("data").textContent = plan.data;
    let calls = document.getElementById("calls");
    let sms = document.getElementById("sms");

    if (plan.calls != null){
        calls.textContent = plan.calls;
    }
    else{
        calls.textContent = "No Calls";
    }
    if (plan.sms != null){
        sms.textContent = plan.sms;
    }
    else{
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

function searchPlans(searchInput) {

    if (searchInput === "") {
        showToast("please enter a search Value!", "error");
        return;
    }
    document.getElementById("clear").classList.remove("d-none");
    let filteredPlans;
    filteredPlans = plans.filter(plan => {
        searchInput = searchInput.trim().toLowerCase();
        if (isNaN(searchInput)) {
            if (plan.data.toLowerCase().includes(searchInput) || plan.validity.toLowerCase().includes(searchInput)) {

                return plan;
            }
        }
        else {
            if (((searchInput.length > 1) && (plan.price.toString().includes(searchInput))) || (plan.price.toString().charAt(0) === searchInput) || plan.data.includes(searchInput) || plan.validity.includes(searchInput)) {
                return plan;
            }
        }
    })


    displayFilteredPlans(filteredPlans);
}
