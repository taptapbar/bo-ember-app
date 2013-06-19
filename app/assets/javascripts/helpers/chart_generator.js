App.ChartGenerator = Ember.Object.extend({
  chartConfig: function(type) {
    switch (type) {
      case 'column':
        return App.ColumnChartConfig;
    }
  },
  
  chartType: function(type) {
    switch (type) {
      case 'column':
        return 'column';
    }
  },
  
  render: function(render_to, type, data, categories, title, measurement) {
    var chart     = this.chartConfig(type).create();
    var chartType = this.chartType(type);
    var plotOptions = chart.get('plotOptions');
    // if data consists of 'stack' property for each serie, then render stacked chart
    if(data[0].hasOwnProperty('stack')){ 
      plotOptions['column'] = { stacking: 'normal' };
      chart.set('plotOptions', plotOptions)
    };
    chart.set('chartType', chartType);
    chart.set('renderToId', render_to);
    chart.set('series', data);
    chart.set('categories', categories);
    chart.set('title', title);
    chart.set('measurement', measurement);
    chart.initialize();
    return new Highcharts.Chart(chart);
  }
});

// Configs
App.ChartConfig = Ember.Object.create({
  chart: null,
  renderToId: null,
  chartType: null,
  series: null,
  categories: null,
  initialize: function() {
    var chart, title, xAxis, measurement;
    //this.sub_initialize();
    chart = {
      renderTo: this.get('renderToId'),
      type: this.get('chartType')
    };
    xAxis = {
      categories: this.get('categories'),
      max: 10
    };
    yAxis = {
      title: {
        text: this.get('measurement')
      }
    };
    title = {
      text: this.get('title')
    };
    this.set('chart', chart);
    this.set('xAxis', xAxis);
    this.set('yAxis', yAxis);
    return this.set('title', title);
  },
  credits: {
    enabled: false
  },
  colors: ["#2f69bf", "#a2bf2f", "#bf5a2f", "#bfa22f", "#772fbf", "#bf2f2f", "#00337f", "#657f00", "#7f2600", "#7f6500"]
});

App.ColumnChartConfig = Ember.Object.extend(App.ChartConfig, {
  init: function () {
    var yAxis, plotOptions;
    /*yAxis = {
      title: {
        text: "Measurement"
      }
    };*/
    plotOptions = {
      bar: {
        animation: false,
        borderWidth: 0,
        shadow: false,
        dataLabels: {
          enabled: true
        }
      }
    };
    tooltip = {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    };
    scrollbar = {
      enabled: true
    },
    //this.set('yAxis', yAxis);
    this.set('plotOptions', plotOptions);
    this.set('tooltip', tooltip);
    this.set('scrollbar', scrollbar);
    return;
  }
});