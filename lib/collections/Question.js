import { Meteor } from 'meteor/meteor';
Questions = new Mongo.Collection('questionscollection');
Answers = new Mongo.Collection('answercollection');

if (Meteor.isServer) {
 
   Meteor.publish('questionscollection', function() {
    return Questions.find();
  });
  
   Meteor.publish('answercollection', function() {
    return Answers.find();
  });
  
}


Meteor.methods({
  'Questions.insert'(title,duration) {
    Questions.insert({
      title,
      duration,
      createdAt: new Date() // current time
    });
  },
  
  'Answers.insert'(id,answer){
     Answers.insert({
      id,
      answer
     })
  },  
  
  'Questions.delete'(id){
     Questions.remove({idpreguntas:id});
     Answers.remove({idRespuesta:id});
     console.log("removido: "+id);
  },
  
  'Items.count'(){
      Questions.find().count();
  }
});
