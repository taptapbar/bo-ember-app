App.Router.map(function(){
  this.resource('big_object_views', { path: '/multiview' }, function() {
    this.resource('big_object_view', { path: ':big_object_view_id' });
    this.route('new');
  });
  
  this.resource('comparison_views', { path: '/comparison' }, function() {
    this.resource('comparison', { path: ':comparison_view_id' });
    this.route('new');
  });
  
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
    //App.BigObjectView.find().then(function(objects){
    //  var bigObjectView = objects.get('firstObject');
    //  if (bigObjectView !== undefined) {
    //    this.transitionTo('big_object_view', bigObjectView);
    //  }
    //});
    
    App.Func.fetchDimensionAndMeasureData(function() {});
    var bigObjectView = App.BigObjectView.find({ limit: 1 });
    bigObjectView.one('didLoad', this, function () {
      var firstObject = this.modelFor('big_object_views').get('firstObject');
      if (!Ember.isNone(firstObject)) {
        this.transitionTo('big_object_view', firstObject);   
      }
    });
  }
});

App.BigObjectViewRoute = Ember.Route.extend({
  model: function(params) {
    return App.BigObjectView.findLocallyAndRemotely(params.big_object_view_id);
  },
  
  renderTemplate: function() {
    var self = this;
    if (Ember.isNone(App.formData)) {
      App.Func.fetchDimensionAndMeasureData(function() {
        self.renderBigObjectView();
      });
    } else {
      self.renderBigObjectView();
    }    
  },
  
  renderBigObjectView: function() {
    console.log('renderBigObjectView');
    this.render('bigObjectView', {   // the template to render
      into: 'big_object_views',      // the template to render into
      outlet: 'chart',               // the name of the outlet in that template
      controller: 'bigObjectView'    // the controller to use for the template
    });
    this.render('bigObjectViewSidebar', {
      into: 'big_object_views',
      outlet: 'big_object_view_sidebar',
      controller: 'bigObjectView'
    });
  }
});

App.BigObjectViewsNewRoute = Ember.Route.extend({
  model: function() {
    var newObject = App.BigObjectView.createRecord();
    newObject.set('filters', {});
    newObject.set('timescope', {});
    return newObject;
  },
  
  renderTemplate: function() {
    this.render({ outlet: 'big_object_views_new' });
  }
});


// For render comparison_views/new.handlebars
App.ComparisonViewsNewRoute = Ember.Route.extend({
  model: function() {
    var newObject = App.BigObjectView.createRecord();
    newObject.set('filters', {});
    newObject.set('timescope', {});
    return newObject;
  },
  
  renderTemplate: function() {
    console.log("render comparison_views_new");
    this.render({ outlet: 'comparison_views_new' });
  }
});
    