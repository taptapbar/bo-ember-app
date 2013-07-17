App.BigObjectView = DS.Model.extend({
  title: DS.attr('string'),
  measure: DS.attr('string'),
  dimensions: DS.attr('array'),
  filters: DS.attr('object'),
  timescope: DS.attr('object'),

  fetchChartData: function(view) {
    // single data http://www.json-generator.com/j/esKB?indent=4
    // for rendered http://server/any_prefix/big_object_view/:id
    return $.getJSON("http://www.json-generator.com/j/esKB?indent=4").then(
      function(response) {
        // fetching succeeded
        var chartData = response.result[0];
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
  
  fetchFilterList: function(callback) {
    $.getJSON("http://www.json-generator.com/j/esKB?indent=4").then(
      function(response) {
        callback(response);
      },
      function(error) {
        console.log("fetchFilterList failed");
      }
    );
  },
  
  didCreate: function() {
    console.log('didCreate');
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


