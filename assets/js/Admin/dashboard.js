document.addEventListener("DOMContentLoaded" , ()=>{
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Subscribers',
                data: [10, 20, 15, 25, 30],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });

    const chart = document.getElementById('myPieChart1').getContext('2d');
    new Chart(chart, {
        type: 'pie',
        data: {
            labels: ['Data', 'Validity', 'Unlimited', 'Popular'],
            datasets: [{
                data: [20, 25, 15, 30],
                backgroundColor: ['#1E88E5', '#64B5F6', '#90CAF9', '#BBDEFB']
                ,
            }]
        },
        options: {
            responsive: true
        }
    });
    const chart1 = document.getElementById('myLineChart').getContext('2d');
    new Chart(chart1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Recharge Rate',
                data: [10, 25, 15, 40, 30, 50],
                borderColor: 'blue',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true
        }
    });
})


$(document).ready(function () {
    $('#exampleTable').DataTable();
});


function logout() {
    sessionStorage.removeItem("adminUser");
    window.location.href = '../Admin/index.html';
}