 Questions = new Mongo.Collection('questionscollection');

if (Meteor.isServer) {
   Meteor.publish('questionscollection', function() {
    return Questions.find();
  });
}

