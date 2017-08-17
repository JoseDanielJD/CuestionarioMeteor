Template.vote.helpers({
    findAnswer: function(id){
        return Answers.find({idRespuesta: id});
    },
    modalPublicity: function(){
        swal({
          title: "Survey Pool",
          text: "This is a Survey Pool questionnaire. Your response will be sent once you make your request.",
          imageUrl: "http://savet.com.ar/wp-content/uploads/2015/04/encuesta7.jpg"
        });
        
    }
});

Template.vote.events({
    'submit .new-vote'(e) {
        e.preventDefault();
        var voteValue = $('form input[type=radio]:checked').val();
        console.log("voto: ",voteValue);
        var id = FlowRouter.current().queryParams.id;
        Meteor.call('Answers.vote', parseInt(id),voteValue);
        $('#vote').hide();
        swal("Your answer was send!", "Thanks for participating!", "success")
        //FlowRouter.go('/thanks');
    }
});


Template.voteLoaded.helpers({
    findItem(){
        var param = FlowRouter.current().queryParams.id;
        return Questions.find({idpreguntas: parseInt(param)});
    }
});