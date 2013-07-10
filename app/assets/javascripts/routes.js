App.Router.map(function(){
  this.resource('multiview', function() {
    this.resource('big_object_view', { path: ':big_object_view_id' }, function(){
      this.route('timeframe');
    });
  });
  
  
  this.route('comparison', { path: "/comparison" });
  this.route('multiview_new', { path: "/multiview/new" });
  this.route('item_association', { path: "/item_association" });
  this.route('significance', { path: "/significance" });
  this.route('diagnosis', { path: "/diagnosis" });
  this.route('filter', { path: "/filter" });
  this.route('timeframe', { path: "/timeframe" });
});

App.MultiviewRoute = Ember.Route.extend(function(){
  model: function() {
    return App.BigObjectView.find();
  }
});
    