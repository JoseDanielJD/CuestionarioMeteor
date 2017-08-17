Template.vote.helpers({
    findAnswer: function(id){
        return Answers.find({idRespuesta: id});
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
        FlowRouter.go('/thanks');
    }
});


Template.voteLoaded.helpers({
    findItem(){
        var param = FlowRouter.current().queryParams.id;
        return Questions.find({idpreguntas: parseInt(param)});
    }
});