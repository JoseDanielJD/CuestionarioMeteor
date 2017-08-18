Template.Stadistics.rendered = function(){
    Deps.autorun(function() { drawChart(); });
}

function drawChart() {
    var oldCount = 2;
    var newCount = 4;
    var data = [{
        value: newCount,
        color: "#e53935",
        highlight: "#c62828",
        label: "New"
    }, {
        value: oldCount,
        color: "#3949ab",
        highlight: "#1a237e",
        label: "Regular"
    }];

    var pieOptions = {
        animation: false,
    }
    // Added a callback here.
    setTimeout( function(){
        if ($("#myChart").get(0)) {
            var ctx = $("#myChart").get(0).getContext("2d");
            var myNewChart = new Chart(ctx);
            console.log(myNewChart);
            new Chart(ctx).Pie(data, pieOptions);
        }   
    })
}