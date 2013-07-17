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
  
  didCreate: function() {
    console.log('didCreate');
  }
});

App.BigObjectView.reopenClass({
  localObjects: {},
  
  saveLocally: function(model) {
    this.localObjects[model.get('id')] = model;
  },

  findLocally: function(objectId) {
    var model = this.localObjects[objectId];
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


