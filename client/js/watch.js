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

