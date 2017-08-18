Template.Stadistics.events({
    'click #update': function(e){
    drawChart(Math.floor((Math.random() * 50) + 1),Math.floor((Math.random() * 50) + 1));
        value1Graph.set(Math.floor((Math.random() * 50) + 1));
        value2Graph.set(Math.floor((Math.random() * 50) + 1));
        FlowRouter.reload();
        console.log("update graph!-")
    }
})

Template.Stadistics.rendered = function(){
    /*Meteor.call('Items.count', function(error, result){ //invoco al metodo contar items y me traigo el resultado en un callback
        console.log("recibido de backend: ",result);
        value1Graph.set(result);
        value2Graph.set(result+10);
    });*/
    Deps.autorun(function() { drawChart(value1Graph.get(),value2Graph.get()); });
}

if (Meteor.isClient) {
    Tracker.autorun(function() {
        Meteor.call('Items.count', function(error, result){ //invoco al metodo contar items y me traigo el resultado en un callback
            console.log("recibido de backend: ",result);
            value1Graph.set(result);
            value2Graph.set(result+10);
        });
    });
    //Tracker.autorun(drawChart());
     //Tracker.autorun(function() { drawChart(value1Graph.get(),value2Graph.get()); });
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
        if ($("#myChart").get(0)) {
            var ctx = $("#myChart").get(0).getContext("2d");
            var myNewChart = new Chart(ctx);
            console.log(myNewChart);
            new Chart(ctx).Pie(data, pieOptions);
        }   
    })
}