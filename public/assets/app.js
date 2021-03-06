App = Ember.Application.create();

App.MultviewRoute = Ember.Route.extend({
  model: function() {
    return App.BigObjectView.find();
  }
});

Ember.Handlebars.registerBoundHelper('drawChart', function(id){
  console.log('draw: ', id);
  var chartGenerator = new App.ChartGenerator();
  // probably should have moved rendered Charts to global scope to maintain charts on each tab
  var renderedCharts = [];
  var view = App.BigObjectView.find(id);
  view.fetchChartData().then(function (chartDatas) {
    chartDatas.forEach(function (chartData) {
      renderedCharts.push(
        chartGenerator.render('highchart', 
                              'column', 
                              chartData.get('dataValues'), 
                              chartData.get('categories'), 
                              view.get('title'), 
                              chartData.get('measurement'))
      );
    })
  });
});
