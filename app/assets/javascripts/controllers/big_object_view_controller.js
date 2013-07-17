App.BigObjectViewController = Ember.ObjectController.extend(App.FilterSectionModalControllerMixin, {
  
  saveObject: function() {
    console.log("saveObject");
    var model = this.get('model');
    model.save(); // save() will also do commit()
  },
  
  deleteObject: function() {
    console.log('deleteObject');
    var model = this.get('model');
    model.one('didDelete', this, function () {
      this.transitionTo('big_object_views.index');
    });
    model.deleteRecord();
    model.get('store').commit();
  }
});