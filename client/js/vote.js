Template.vote.helpers({
    findAnswer: function(id){
        return Answers.find({idRespuesta: id});
    },
    modalPublicity: function(){
        swal({
          title: 'Welcome!',
          text: 'This is a Survey Pool questionnaire.',
          imageUrl: 'https://www.canddi.com/images/blog/2016-04-11/surveymonkey-logo.jpg',
          imageWidth: 200,
          imageHeight: 100,
          animation: false
        })
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
        swal(
          'Your answer was send!',
          'Thanks for participating!',
          'success'
        )
        FlowRouter.go('/thanks');
    }
});


Template.voteLoaded.helpers({
    findItem(){
        var param = FlowRouter.current().queryParams.id;
        return Questions.find({idpreguntas: parseInt(param)});
    }
});