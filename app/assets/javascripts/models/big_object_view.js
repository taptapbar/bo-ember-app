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

  fetchChartData: function(id) {
    // single data http://www.json-generator.com/j/esKB?indent=4
    // for rendering http://server/any_prefix/big_object_views/:id
    var requestURI = [appConfig.store.adapter.URL, 
                      '/', appConfig.store.adapter.namespace, '/', appConfig.multiview.fetchChartDataURL.replace(":id", id), '.json'].join('');
    var data = this.getCurrentAttrs(id);
    //console.log("fetchChartData-data: ", data);
    // console.log('requestURI of big_object_view/fetchChartData: ', requestURI);
    return $.getJSON(requestURI, data).then(
      function(response) {
        // fetching succeeded
        var chartData = response;
        return App.ChartData.create({
          categories: chartData.xAxis.categories,
          dataValues: chartData.series,
          params: chartData.params
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
  },

  getCurrentAttrs: function(objectId) {
    model = App.BigObjectView.findLocallyAndRemotely(objectId);
    var attrs = {
                'dimensions': model.get('dimensions'),
                'measure': model.get('measure'),
                'title': model.get('title'),
                'filters': model.get('filters'),
                'timescope': model.get('timescope')
              };
    var data = {};
    $.each(attrs, function(index, value) {
      if (value !== undefined) { data[index] = value };
    });
    console.log("getCurrentAttrs_attrs: ", attrs);
    console.log("getCurrentAttrs_data: ", data);
    return data;
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
  params: null,
});

// App.DataStruct.timeScope = Ember.Object.extend({
//   range: { period: null },
//   cycle: { repeat: { type: null, number: null },
//            calendar: {
//               days: { selected_days: null,  },
//               weekdays: {},
//               months: {}
//            }
//   }
// });
