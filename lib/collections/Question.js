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
  'Questions.insert'(title,duration,idpreguntas,views) {
    Questions.insert({
      title,
      duration,
      idpreguntas,
      views,
      createdAt: new Date() // current time
    });
  },
  
  'Answers.insert'(answer,idRespuesta){
     Answers.insert({
      answer,
      idRespuesta
     })
  },  
  
  'Questions.delete'(id){
     Questions.remove({idpreguntas:parseInt(id)});
     Answers.remove({idRespuesta:parseInt(id)});
  },
  
  'Questions.updateViews'(title){
      //var v = Questions.find({title:title}).queries[1].results[0].views;
      var v = Questions.update(
            { title: title },
            { $inc: { views: 1 } }          
          );
  },
  'Questions.getID'(title){
      
     return Questions.find({title:title});
  },
  
  'Items.count'(){
      return Questions.find().count();
  }
});
