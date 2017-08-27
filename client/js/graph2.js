Template.graph2.rendered = function(){
    Deps.autorun(function() { drawChart2(value1Graph.get(),value2Graph.get()); });
}

if (Meteor.isClient) { 
    Tracker.autorun(function() {//seguidor de datos, genera reactividad. esto ejecuta el metodo, meteor.call cada vez que los datos en la bd cambien, 
        Meteor.call('Items.count', function(error, result){ //invoco al metodo contar items y me traigo el resultado en un callback
            console.log("recibido de backend: ",result);
            value1Graph.set(result);
            value2Graph.set(result+71);
        });
    });
 }

function drawChart2(a,b) {
    var oldCount = a;
    var newCount = b;
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
        if ($("#graph2").get(0)) {
            var ctx = $("#graph2").get(0).getContext("2d");
            var myNewChart = new Chart(ctx);
            console.log(myNewChart);
            new Chart(ctx).Pie(data, pieOptions);
        }   
    })
}