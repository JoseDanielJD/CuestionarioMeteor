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