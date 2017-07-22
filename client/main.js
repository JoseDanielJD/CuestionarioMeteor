import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.bar.events({
  'click #add-button': function(e) {

    
    $('#modalAdd').modal('show');
        console.log("click")
  }
});

