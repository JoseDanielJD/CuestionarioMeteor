FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {main: "mainView"});
  }
});

FlowRouter.route('/AddItem', {
  action: function() {
    BlazeLayout.render("mainLayout", {main: "AddItemTemplate"});  
  }
});

FlowRouter.route('/watch', {
  action: function() {
    BlazeLayout.render("mainLayout", {main: "watchLoaded"});  
  }
});

FlowRouter.route('/vote', {
  action: function() {
    BlazeLayout.render("mainLayout", {main: "voteLoaded"});  
  }
});