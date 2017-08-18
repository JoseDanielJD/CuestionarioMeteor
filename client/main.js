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
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then(function () {
                Meteor.call('Questions.delete', param);
                swal('Deleted!','The survey was deleted!','success')
        })
    },
    
    'click #link': function(e) {
        var param = e.currentTarget.name;//encodeURIComponent(e.currentTarget.name);
        var txt;
        
        swal({
            title: '<small>Sharing</small>!',
            html:
            "<span>Share this link to everyone you want to participate in the survey <br><span style='color:#F8BB86'>https://meteortest1-jb28.c9users.io/vote?userid=111&id=</span>"+param,
            showCloseButton: true,
            showCancelButton: false,
            confirmButtonText:'<i class="fa fa-files-o"></i> Copy',
        })
     }
    
});

Template.loginButtons.rendered = function()
{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};
