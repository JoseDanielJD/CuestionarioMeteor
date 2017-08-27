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
  'Questions.insert'(title,duration,idpreguntas,views,userID) {
    Questions.insert({
      title,
      duration,
      idpreguntas,
      views,
      userID,
      createdAt: new Date() // current time
    });
  },
  
  'Answers.insert'(answer,idRespuesta,points,userID){
     Answers.insert({
      answer,
      idRespuesta,
      points,
      userID
     })
  },  
  
  'Questions.delete'(id){
     Questions.remove({idpreguntas:parseInt(id)});
     Answers.remove({idRespuesta:parseInt(id)});
  },
  
  'Questions.updateViews'(id){
      //var v = Questions.find({title:title}).queries[1].results[0].views;
      var v = Questions.update(
            { idpreguntas: id },
            { $inc: { views: 1 } }          
          );
  },
  'Answers.vote'(id,answer){
     return Answers.update(
            { idRespuesta: id , answer: answer},
            { $inc: { points: 1 } }          
          );
  },
  
  'Items.count'(){
      return Questions.find().count();
  }
});
