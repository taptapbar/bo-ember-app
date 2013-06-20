App.BigObjectView = DS.Model.extend({
  title: DS.attr('string'),
  measurement: DS.attr('string'),
  dimentions: DS.attr('array'),
  filters: DS.attr('array'),
  timescope: DS.attr('array'),

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

App.ChartData = Ember.Object.extend({
  categories: null,
  dataValues: null,
});

// App.BigObjectView.FIXTURES = [{
//   id: 1,
//   categories: [
//                 'Jan',
//                 'Feb',
//                 'Mar',
//                 'Apr',
//                 'May',
//                 'Jun',
//                 'Jul',
//                 'Aug',
//                 'Sep',
//                 'Oct',
//                 'Nov',
//                 'Dec'
//               ],
//   dataValues: [{
//                 name: 'Tokyo',
//                 data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4]
    
//               }, {
//                 name: 'New York',
//                 data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4]
    
//               }, {
//                 name: 'London',
//                 data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4]
    
//               }, {
//                 name: 'Berlin',
//                 data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4, 54.4]
    
//               }],
//   measurement: "Count"
// }];


