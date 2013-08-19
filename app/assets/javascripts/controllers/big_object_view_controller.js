App.BigObjectViewController = Ember.ObjectController.extend(App.FilterSectionModalControllerMixin, {
  
  saveObject: function() {
    console.log("saveObject");
    var model = this.get('model');
    model.save(); // save() will also do commit()
  },
  
  deleteObject: function() {
    console.log('deleteObject');
    var model       = this.get('model');
	  var modelId     = model.get('id');
    var localObject = App.BigObjectView.findLocally(modelId);
    if (Ember.isNone(localObject)) {
      model.one('didDelete', this, function () {
        this.transitionToRoute('big_object_views.index');
      });
      model.deleteRecord();
      model.save();
    } else {
      App.BigObjectView.deleteLocally(modelId);
      model.deleteRecord();
      this.transitionToRoute('big_object_views.index');
    }
  },

  showZkPage: function() {
    console.log('showZkPage');
    var model       = this.get('model');
    var id          = model.get('id');
    var requestURI  = [appConfig.store.adapter.URL, 
                      '/', appConfig.store.adapter.namespace, '/', appConfig.multiview.zkURL.replace(":id", id), '.json'].join('');
    return $.getJSON(requestURI).then(
      function(response) {
        // fetching succeeded
        console.log("showZkPage succeeded");
      },
      function(error) {
        // fetching failed
        console.log("showZkPage failed");
      }
    );
  }
});