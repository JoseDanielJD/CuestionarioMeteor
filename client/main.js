import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.startup(function helloOnCreated() {
  Meteor.subscribe('questionscollection');
  Meteor.subscribe('answercollection');
});


Template.watch.helpers({
    findAnswer: function(id){
        return Answers.find({idRespuesta: id});
    }
});

Template.watchLoaded.helpers({
    findItem(){
        var param = FlowRouter.current().queryParams.title;
        return Questions.find({title: param});
    }
});

Template.itemsLoaded.helpers({
    LoadItem(){
        return Questions.find({}, { sort: { createdAt: -1 } });
    }
});


Template.infoItemNAdd.helpers({
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
        
        div2.innerHTML='<input type="text" name="addmore" id="questionItem" class="form-control" placeholder="Type a posible answer">';
        div3.innerHTML='<button class="btn btn-danger remove" type="button"><i class="glyphicon glyphicon-remove"></i></button>"';
        
        div2.appendChild(div3);
        div1.appendChild(div2);
        
        var html = div1;
        $(".after-add-more").after(html);        
     },
 
     'click .remove': function(e) { //delete the posible answer y add new Item
        console.log("this:",this);
         $(this).parents(".control-group").remove();
     },
     

     
     'submit .new-item'(event) {
        event.preventDefault();
         var Iteminfo = new Array();
         var ItemAnswer = new Array();
         var Item = event.target;
         
         
         for(i=0; i<event.target.addmore.length; i++){
             if(Item.addmore[i].id == "questionItem"){ //Store the question in an array
                ItemAnswer.push(event.target.addmore[i].value);
             }else{
                 Iteminfo.push(event.target.addmore[i].value);
             }
         }

        console.log(ItemAnswer);
        console.log(Iteminfo);
        title = Iteminfo[0];
        duration = Iteminfo[1];

         id=1;//el id se obtendra del ultimo item creado si existe.
         
        // Insert a item into the collection
        Meteor.call('Questions.insert', title, duration);
        
        for(i=0; i<ItemAnswer.length; i++){//store the answers asociate with the title
            Meteor.call('Answers.insert', id, ItemAnswer[i]);  
        }
     }
 
});

Template.item.events({

    'click #delete': function(e) {
        console.log(e.currentTarget.name);
        var param = e.currentTarget.name;
        Meteor.call('Questions.delete', param);
    },
    
    'click #link': function(e) {
        var param = e.currentTarget.name;
        alert("Comparte este enlace a todas las personas que desees que participen en la encuesta. \n https://meteortest1-jb28.c9users.io/vote/userID/"+param);
    }
    
});