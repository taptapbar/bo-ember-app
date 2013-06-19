App.ChartView = Ember.View.extend({
  tagName: 'div',
  classNames: ['highcharts'],
  title: 'Graph',
  type: 'column',
  didInsertElement: function() {
    var chartGenerator = new App.ChartGenerator();
    // var view = App.BigObjectView.find(1);
    var view = App.BigObjectView.createRecord();
    var that = this;
    // probably should have moved rendered Charts to global scope to maintain charts on each tab
    var renderedCharts = [];
    view.fetchChartData().then(function (chartDatas) {
      chartDatas.forEach(function (chartData) {
        renderedCharts.push(chartGenerator.render(that.elementId, that.type, chartData.get('dataValues'), chartData.get('categories'), that.title, chartData.get('measurement')));
      })
    });
        
    //view.then(function(){
    //  renderedChart = chartGenerator.render(that.elementId, that.type, chartData.get('dataValues'), chartData.get('categories'), that.title, view.get('measurement'));
    //});
    //return renderedChart;
  }
});