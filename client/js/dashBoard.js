Template.dashBoard.helpers({//infoItemNAdd
    CantItems() {
        return Questions.find({userID: Meteor.userId()}).count();
    }, 

    activesQty(){
        return Questions.find({userID: Meteor.userId(), status: "active"}).count();
    }, 
    
    endedQty(){
        return Questions.find({userID: Meteor.userId(), status: "inactive"}).count();
    },
        
    mostView(){
        return  Questions.findOne({userID: Meteor.userId()}, {sort: {views: -1}}).idpreguntas;
    }

});