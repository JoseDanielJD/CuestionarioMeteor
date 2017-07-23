import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.startup(function helloOnCreated() {
  Meteor.subscribe('questionscollection');
});

Template.bar.events({
  'click #add-button': function(e) {

    $('#modalAdd').modal('show');
        console.log("click")
  }
});

Template.bar.helpers({
    CantItems() {
        return Questions.find().count();
    } 
});

Template.AddItemTemplate.events({
     'click .add-more': function(e) { //add new posible answer
        var dv1,div2,div3,input,button;
        
        div1=document.createElement('div');
        div2=document.createElement('div');
        div3=document.createElement('div');
        
        div1.className="copy-fields";
        div2.className="control-group input-group";
        div3.className="input-group-btn";
        
        div2.innerHTML='<input type="text" name="addmore" class="form-control" placeholder="Type a posible answer">';
        div3.innerHTML='<button class="btn btn-danger remove" type="button"><i class="glyphicon glyphicon-remove"></i></button>"';
        
        div2.appendChild(div3);
        div1.appendChild(div2);
        
        var html = div1;
        $(".after-add-more").after(html);        
     },
 
     'click .remove': function(e) { //delete the posible answer
        console.log("this:",this);
         $(this).parents(".control-group").remove();
     },
     
     'submit .new-item'(event) {
          // Prevent default browser form submit
         event.preventDefault();
         var newQuestions = new Array();
         
         console.log("target: ",event.target.addmore2);
         console.log("target2: ",event.target.addmore);

         /*title = event.target.addmoreTitle[0].value;
         
         newQuestions.push(event.target.addmoreCuestion[1].value);//title
         
         
          console.log("en variables: ",title,newQuestions);*/
         
        // Insert a item into the collection
       /* Item.insert({
            title,
            duracion, 
            preguntas,
            createdAt: new Date() // current time
        });*/
     }
 
});

