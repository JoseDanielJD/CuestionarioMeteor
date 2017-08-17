import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.startup(function helloOnCreated() {
  Meteor.subscribe('questionscollection');
  Meteor.subscribe('answercollection');
  pos=0;

  if(FlowRouter.current().route.path == "/vote"){//count the vizualizations
      var id = FlowRouter.current().queryParams.id;
      //update the views of the current item
        Meteor.call('Questions.updateViews', parseInt(id));
  }
  
});

Template.item.helpers({
    Mayor: function(id){
        let points = Answers.findOne({idRespuesta: id, userID: Meteor.userId()}, {sort: {points: -1}}).points;
        console.log("points: ",points);
        return points>0 ? Answers.findOne({idRespuesta: id, userID: Meteor.userId()}, {sort: {points: -1}}).answer : "-";
    }
});

Template.itemsLoaded.helpers({
    LoadItem(){
        return Questions.find({userID: Meteor.userId()}, { sort: { createdAt: -1 } });
    }
});

Template.item.events({
    'click #delete': function(e) {
        var param = e.currentTarget.name;
        Meteor.call('Questions.delete', param);
    },
    
    'click #link': function(e) {
        var param = e.currentTarget.name;//encodeURIComponent(e.currentTarget.name);
        var txt;
        var person = prompt("Comparte este enlace a todas las personas que desees que participen en la encuesta.", "https://meteortest1-jb28.c9users.io/vote?userid=111&id="+param);
    }
    
});

Template.loginButtons.rendered = function()
{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};
