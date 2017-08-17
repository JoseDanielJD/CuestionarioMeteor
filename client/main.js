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
        
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm){
            if (isConfirm) {
                Meteor.call('Questions.delete', param);
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
        
        
        /*swal({
            title: "Are you sure?",
            //text: "Submit to run ajax request",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            },
        function(){
            Meteor.call('Questions.delete', param); 
            //colocar una promesa!
            swal("The survey was deleted!");
        });*/
        
        
    },
    
    'click #link': function(e) {
        var param = e.currentTarget.name;//encodeURIComponent(e.currentTarget.name);
        var txt;
        
        swal({
          title: "<small>Sharing</small>!",
          //imageUrl:"//www.esri.com/training/assets/catalogMetadata/574785c88733a8646d1d3a2e/Sharing_Publishing1.svg",
          text: "Share this link to everyone you want to participate in the survey <br><span style='color:#F8BB86'>https://meteortest1-jb28.c9users.io/vote?userid=111&id=<span>"+param,
          html: true
        });
        
        //var person = prompt("Comparte este enlace a todas las personas que desees que participen en la encuesta.", "https://meteortest1-jb28.c9users.io/vote?userid=111&id="+param);
    }
    
});

Template.loginButtons.rendered = function()
{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};
