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
    //  renderedChart = chartGenerator.render(that.elementId, that.type, chartData.get('dataValues'), chartData.get('categories'), that.title, view.get('measurement'));
    //});
    //return renderedChart;
  },
  
  fetchChartData: function() {
    // single data http://www.json-generator.com/j/esKB?indent=4
    // 2-4 data http://www.json-generator.com/j/erYf?indent=4
    // 2-4 data w/o stacking http://www.json-generator.com/j/eqSt?indent=4
    // for rendered http://server/any_prefix/big_object_view?
    return $.getJSON("http://www.json-generator.com/j/eqSt?indent=4").then(
      function(response) {
        // fetching succeeded
        var chartDatas = [];
        response.result.forEach(function (chartData) {
          chartDatas.push(App.ChartData.create({
            // subject to the JSON format
            categories: chartData.xAxis.categories,
            dataValues: chartData.series
          }));
        })
        return chartDatas;
      },
      function(error) {
        // fetching failed
        console.log("getJSON failed");
      }
    );
  }
});