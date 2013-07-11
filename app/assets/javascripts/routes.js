App.Router.map(function(){
  this.resource('big_object_views', { path: '/multiview' }, function() {
    this.resource('big_object_view', { path: ':big_object_view_id' });
  });
  
  this.route('comparison', { path: "/comparison" });
  this.route('multiview_new', { path: "/multiview/new" });
  this.route('item_association', { path: "/item_association" });
  this.route('significance', { path: "/significance" });
  this.route('diagnosis', { path: "/diagnosis" });
  this.route('filter', { path: "/filter" });
  this.route('timeframe', { path: "/timeframe" });
});

App.BigObjectViewsRoute = Ember.Route.extend({
  model: function() {
    return App.BigObjectView.find();
  }
});

App.BigObjectViewsIndexRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('big_object_views');
  },
  
  redirect: function() {
    // Method 1 - http://stackoverflow.com/questions/14305255/ember-automatically-redirect-to-firstobject
    // but it's still not working
    //var bigObjectView = this.modelFor('big_object_views').get('firstObject');
    //this.transitionToRoute('big_object_view', bigObjectView);
    
    // Method 2 - try to grab the object after .then
    //this.modelFor('big_object_views').then(function(objects){
    //  var bigObjectView = objects.get('firstObject');
    //  if (bigObjectView !== undefined) {
    //    this.transitionTo('big_object_view', bigObjectView);
    //  }
    //});
  }
});
    