App = Ember.Application.create();

/*
App.MultiviewRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON("http://www.json-generator.com/j/eVjo?indent=4").then(function (response) {
      var chartTabs = [];
      response.result.forEach(function (BOView) {
        chartTabs.push(App.BigObjectView.createRecord({
          id: BOView.id,
          title: BOView.title,
          measure: BOView.measure,
          dimensions: BOView.dimensions
        }));
      });
      return chartTabs;
    });
  }
});
*/

Ember.Handlebars.registerBoundHelper('drawChart', function(id){
  console.log('draw: ', id);
  var chartGenerator = new App.ChartGenerator();
  var view = App.BigObjectView.find(id);
  view.fetchChartData(view).then(function (chartData) {
        chartGenerator.render('highchart', 
                              'column', 
                              chartData.get('dataValues'), 
                              chartData.get('categories'), 
                              view.get('title'), 
                              view.get('measure'))
  });
});

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// window.onbeforeunload = function(event)
// {
//   return confirm("Confirm refresh");
// };