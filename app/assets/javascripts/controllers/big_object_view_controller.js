App.BigObjectViewController = Ember.ObjectController.extend(App.FilterSectionModalControllerMixin, {
  
  saveObject: function() {
    console.log("saveObject");
    var model = this.get('model');
    model.save(); // save() will also do commit()
  },
  
  deleteObject: function() {
    console.log('deleteObject');
    var model       = this.get('model');
    var localObject = App.BigObjectView.findLocally(model.get('id'));
    if (localObject === undefined) {
      model.one('didDelete', this, function () {
        this.transitionTo('big_object_views.index');
      });
      model.deleteRecord();
      model.get('store').commit();
    } else {
      App.BigObjectView.deleteLocally(model.get('id'));
      model.deleteRecord();
      this.transitionTo('big_object_views.index');
    }
  }
});