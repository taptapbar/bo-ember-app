App.BigObjectView = DS.Model.extend({
  title: DS.attr('string'),
  measure: DS.attr('string'),
  dimensions: DS.attr('array'),
  filters: DS.attr('object'),
  timescope: DS.attr('object'),
  
  state: function() {
    var state = '';
    if (this.get('isNew')) {
      state = "new";
    } else if (this.get('isDirty')) {
      state = "unsaved";
    }
    return state;
  }.property('isDirty', 'isNew'),

  fetchChartData: function(view) {
    // single data http://www.json-generator.com/j/esKB?indent=4
    // for rendering http://server/any_prefix/big_object_views/:id
    var requestURI = [appConfig.store.adapter.URL, 
                      '/', appConfig.store.adapter.namespace, '/', appConfig.multiview.fetchChartDataURL.replace(":id", this.get('id')), '.json'].join('');
    console.log('requestURI of big_object_view/fetchChartData: ', requestURI);
    return $.getJSON(requestURI).then(
      function(response) {
        // fetching succeeded
        var chartData = response;
        return App.ChartData.create({
          categories: chartData.xAxis.categories,
          dataValues: chartData.series
        });
      },
      function(error) {
        // fetching failed
        console.log("fetchChartData failed");
      }
    );
  },
  
  fetchFilterList: function() {
    var requestURI = [appConfig.store.adapter.URL, 
                      '/', appConfig.store.adapter.namespace, 
                      appConfig.multiview.filterListURL.replace(':id', this.get('id')), '.json'].join('');
    return $.getJSON(requestURI).then(
      function(response) {
        //fetching succeeded
        //callback(response);
        return response;
      },
      function(error) {
        //fetching failed
        console.log("fetchFilterList failed");
      }
    );
  },
  
  didCreate: function() {
    console.log('didCreate');
    this.set('id', null);
  },
  
  didUpdate: function() {
    console.log('didUpdate');
  }
});

App.BigObjectView.reopenClass({
  localObjects: {},
  
  deleteLocally: function(objectId) {
    this.localObjects[objectId] = undefined;
  },
  
  saveLocally: function(model) {
    this.localObjects[model.get('id')] = model;
  },

  findLocally: function(objectId) {
    var model = this.localObjects[objectId];
    return model;
  },
  
  findLocallyAndRemotely: function(objectId) {
    var model = this.findLocally(objectId);
    if (model === undefined) {
      console.log('cannot be found locally.', objectId);
      model = this.find(objectId);
    }
    return model;
  }
});

App.ChartData = Ember.Object.extend({
  categories: null,
  dataValues: null,
});


