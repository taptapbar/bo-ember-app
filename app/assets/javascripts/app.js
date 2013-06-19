App = Ember.Application.create();

App.MultviewRoute = Ember.Route.extend({
  model: function() {
    return App.BigObjectView.find();
  }
});
