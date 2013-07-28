App.ChartView = Ember.View.extend({
  tagName: 'div',
  classNames: ['highcharts'],
  type: 'column',
  didInsertElement: function() {
    var that = this;
    var view = this.get('content');
    console.log('rendered: ', view.get('id'));
    
    var chartGenerator = new App.ChartGenerator();
    // probably should have moved rendered Charts to global scope to maintain charts on each tab
    var renderedCharts = [];
    this.fetchChartData().then(function (chartDatas) {
      chartDatas.forEach(function (chartData) {
        renderedCharts.push(
          chartGenerator.render(that.elementId, 
                                that.type, 
                                chartData.get('dataValues'), 
                                chartData.get('categories'), 
                                view.get('title'), 
                                chartData.get('measurement'))
        );
      })
    });
        
    //view.then(function(){
    //  renderedChart = chartGenerator.render(that.elementId, that.type, chartData.get('dataValues'), chartData.get('categories'), that.title, view.get('measure'));
    //});
    //return renderedChart;
  }
});