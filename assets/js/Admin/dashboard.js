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
            labels: ["Data", "Validity", "Unlimited", "Popular" , "Student" , "Work from home" , "Streaming" , "Gaming" , "OTT Subscription" , "Short-Term" , "Annual"],
            datasets: [{
                data: [5 , 2 , 10 , 20 , 25 , 5 , 5 , 5 , 10 , 18],
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

    new DataTable("#exampleTable");

    
    // var table = new DataTable("#exampleTable", {
    //     paging: true,
    //     searching: true,
    //     ordering: true,
    //     info: true,
    //     lengthChange: true,
    //     pageLength: 10,
    //     dom: 'Bfrtip',
    //     buttons: [
    //         {
    //             extend: 'csvHtml5',
    //             text: 'Export to CSV',
    //             title: 'Subscriber Feedback & Issues'
    //         }
    //     ]
    // });

    // document.getElementById("exportCSV").addEventListener("click", function () {
    //     table.button('.buttons-csv').trigger();
    // });
})
