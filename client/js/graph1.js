Template.Stadistics.events({
    'click #update': function(e){
    drawChart(Math.floor((Math.random() * 50) + 1),Math.floor((Math.random() * 50) + 1));
        value1Graph.set(Math.floor((Math.random() * 50) + 1));
        value2Graph.set(Math.floor((Math.random() * 50) + 1));
        FlowRouter.reload();
        console.log("update graph!-")
    }
})

/*------------------------------ graph1 ----------------------------------*/

Template.graph1.rendered = function(){
    Deps.autorun(function() { drawChart(value1Graph.get(),value2Graph.get()); });
}

if (Meteor.isClient) { 
    Tracker.autorun(function() {//seguidor de datos, genera reactividad. esto ejecuta el metodo, meteor.call cada vez que los datos en la bd cambien, 
        Meteor.call('Items.count', function(error, result){ //invoco al metodo contar items y me traigo el resultado en un callback
            console.log("recibido de backend: ",result);
            value1Graph.set(result);
            value2Graph.set(result+10);
        });
    });
 }
function drawChart(a,b) {
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
        if ($("#graph1").get(0)) {
            var ctx = $("#graph1").get(0).getContext("2d");
            var myNewChart = new Chart(ctx);
            new Chart(ctx).Pie(data, pieOptions);
        }   
    })
}