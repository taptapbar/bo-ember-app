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
  
  render: function(render_to, type, data, categories, params, title, measure) {
    var chart     = this.chartConfig(type).create();
    var chartType = this.chartType(type);
    var plotOptions = chart.get('plotOptions');
    // if data consists of 'stack' property for each serie, then render stacked chart
    if(data[0].hasOwnProperty('stack')){ 
      plotOptions.column.stacking = 'normal';
      chart.set('plotOptions', plotOptions);
    }
    chart.set('chartType', chartType);
    chart.set('renderToId', render_to);
    chart.set('series', data);
    chart.set('categories', categories);
    chart.set('title', title);
    chart.set('measure', measure);
    chart.initialize(data, categories);
    if(!Ember.isEmpty(params)) {
      $.each(params, function(index, value) {
        // insert other params here
      });
    }
    // add redraw callback to move stacklabels to the top
    chart.set('chart.events', {
      redraw: function(event) {
        $("g.highcharts-stack-labels").attr('display', 'none');
        window.setTimeout(function() { moveStacklabels("bottom"); }, 400);
      },
      load: function(event) {
        stackLabelsOriginY = parseInt($("g.highcharts-stack-labels").children('text').first().attr('y'));
        $("g.highcharts-stack-labels").attr('display', 'none');
        window.setTimeout(function() { moveStacklabels("bottom"); }, 400);
      }
    });
    console.log("params: ", params);
    console.log("chart: ", chart);
    

    // IMPORTANT HACK FOR IE ONLY (all funcstion related to chart variable should be added back here again)
    //===========================================================================================================================
    // in order to fix the IE JSON.parse bug which couse conflicts with Highcharts and Ember
    // the parameters pass into Highcharts.Chart() has to be stringify() first.
    // because stringify() ignores all functions, therefore we have to add functions back before passing into Highcharts.chart()
    chart = jQuery.parseJSON(JSON.stringify(chart));
    chart['chart']['events'] = {
      redraw: function(event) {
        $("g.highcharts-stack-labels").attr('display', 'none');
        window.setTimeout(function() { moveStacklabels("bottom", event); }, 400);
      },
      load: function(event) {
        stackLabelsOriginY = parseInt($("g.highcharts-stack-labels").children('text').first().attr('y'));
        $("g.highcharts-stack-labels").attr('display', 'none');
        window.setTimeout(function() { moveStacklabels("bottom", event); }, 400);
      }
    };
    if(chart['yAxis'].hasOwnProperty('stackLabels')) {
      chart['yAxis']['stackLabels']['formatter'] = function() {
        return this.stack.slice(0,appConfig.chartSettings.stackLabels.length).capitalize();
      }
    }
    console.log("chart_after_parse: ", chart);
    //===========================================================================================================================
    
    return new Highcharts.Chart(chart);
  }
});

// javascript function for moving stacklabels
var stackLabelsOriginY;
function moveStacklabels(position, event) {
  if(Ember.isNone(document.getElementsByClassName('highcharts-stack-labels')[0].getAttribute('transform')))
  {
    // If the browser is IE, then execute this part to move the stacklabels
    var stackLabelsStyle = document.getElementsByClassName('highcharts-stack-labels')[0].getAttribute('style').split(' ');
    console.log("stackLabelsStyle 1: ", stackLabelsStyle, "\nfrom:", event);
    for(var i=0;i<stackLabelsStyle.length;i++) {
      if(!Ember.isNone(stackLabelsStyle[i].toUpperCase().match("MARGIN-TOP"))) {
        var marginTop = parseInt(stackLabelsStyle[i+1].match(/\d+/g)) + 10;
        stackLabelsStyle[i+1] = [marginTop.toString(), "px;"].join('');
      }
    }
    console.log("stackLabelsStyle 2: ", stackLabelsStyle, "\nfrom:", event);
    document.getElementsByClassName('highcharts-stack-labels')[0].setAttribute('style', stackLabelsStyle.join(' '));
  }
  else {
    // If the browser is none-IE, then execute this part to move the stacklabels
    if(parseInt($("g.highcharts-stack-labels").children('text').first().attr('y')) < stackLabelsOriginY + 20) {
      $("g.highcharts-stack-labels").children('text').each(function(index) {
        var transformStringArray = $(this).attr('transform').split(' ');
        var y = parseInt($(this).attr('y')) + 20;
        if(transformStringArray.indexOf("rotate") == -1) {
          transformStringArray[transformStringArray.length-1] = y + ')';
          $(this).attr('y', y).attr('transform', transformStringArray.join(' '));
        }
        else { $(this).attr('y', y); }
      });
    }
  }
  $("g.highcharts-stack-labels").attr('display', 'block');
};

// Configs
App.ChartConfig = Ember.Object.create({
  chart: null,
  renderToId: null,
  chartType: null,
  series: null,
  categories: null,
  colors: null,
  initialize: function(data) {
    var chart, title, xAxis, measure;
    var minHeight = appConfig.chartSettings.chart.minHeight;
    var calcHeight = $(window).height() - $('#nav').height() - $('div.tabs').height() - $('div.filters-container').height() - 55;
    //this.sub_initialize();
    chart = {
      renderTo: this.get('renderToId'),
      type: this.get('chartType'),
      height: ((calcHeight < minHeight) ? minHeight : calcHeight)
    };
    xAxis = {
      categories: this.get('categories')
      //labels: appConfig.chartSettings.xAxis.labels
      //max: appConfig.chartSettings.xAxis.max
    };
    yAxis = {
      title: {
        text: this.get('measure')
      }
    };
    title = {
      text: this.get('title')
    };
    colors = appConfig.chartSettings.colors;
    this.set('chart', chart);
    this.set('xAxis', xAxis);
    this.set('yAxis', yAxis);
    this.set('title', title);
    this.set('colors', colors);
    //implement this function in individual place such as App.ColumnChartConfig
    this.chartTypeRelatedSettings(data);
  },
  credits: {
    enabled: false
  }
});

App.ColumnChartConfig = Ember.Object.extend(App.ChartConfig, {
  init: function () {
    var yAxis, plotOptions;
    plotOptions = {
      column: {
        borderWidth: 1,
        shadow: false,
        groupPadding: appConfig.chartSettings.plotOptions.column.groupPadding,
        pointPadding: appConfig.chartSettings.plotOptions.column.pointPadding
      }
    };
    if(appConfig.chartSettings.groupTooltip.enabled) {
      tooltip = {
        headerFormat: '<span style="font-size:10px">{point.key}</span><hr><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      };
      this.set('tooltip', tooltip);
    }
    
    var scrollbar = {
      enabled: false
    };
    this.set('plotOptions', plotOptions);
    this.set('scrollbar', scrollbar);
    return;
  },

  chartTypeRelatedSettings: function(data) {
    console.log("chartTypeRelatedSettings");
    var categoryNumber = data[0]['data'].length;
    var maxVisibleSerieNumber = appConfig.chartSettings.xAxis.maxColumn;
    var serieNumber = data.length;
    var stackNumber = 0;
    var stackNames = [];
    var groupPadding = appConfig.chartSettings.plotOptions.column.groupPadding;
    var visibleCatNumber = 0;
    //calculate the stack number
    if (data[0].hasOwnProperty('stack')) { 
      $.each(data, function(index, value) {
        stackNames.push(value.stack);
      });
      stackNames = stackNames.getUnique();
      stackNumber = stackNames.length;
    }

    //set the columnNumber(how many columns within one category)
    // for 1D
    if (data.length == 1) {
      console.log("this is a 1D chart");
      columnNumber = 1;
    }
    // for 2D
    else if (stackNumber == 0) {
      console.log("this is a 2D chart");
      columnNumber = serieNumber;
      // In order to make it look more comfortable, groupPadding will be set to 0.1 in 2D chart
      this.set('plotOptions.column.groupPadding', 0.1);
    }
    // for 3D
    else {
      console.log("this is a 3D chart");
      columnNumber = stackNumber;
      // set the stacked colum label to the first charactor of stack name
      this.set('yAxis.stackLabels', {
        enabled: true,
        rotation: appConfig.chartSettings.stackLabels.rotation,
        textAlign: "right",
        verticalAlign: "bottom",
        style: {
          'font-size': '10px',
          color: appConfig.chartSettings.stackLabels.color
        },
        formatter: function() {
          return this.stack.slice(0,appConfig.chartSettings.stackLabels.length).capitalize();
        }
      });
      
      console.log("yAxis: ", yAxis);

      // move xAxis lower to put stackLabels at the bottom
      this.set('xAxis.offset', 45);

      //overwrite grouped tooltip for 3D stacked chart
      if(appConfig.chartSettings.groupTooltip.enabled) {
        tooltip = {
          headerFormat: '<span style="font-size:10px">{point.key}</span><hr><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}({series.options.stack}): </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        };
        this.set('tooltip', tooltip);
      }
    }

    //set the limit of how many series(columns) will be see 
    //enable the scrollbar if necessary
    if (categoryNumber*columnNumber > maxVisibleSerieNumber && categoryNumber > 1) {
      visibleCatNumber = (maxVisibleSerieNumber<=columnNumber) ? (Math.ceil(maxVisibleSerieNumber/columnNumber)) : (Math.floor(maxVisibleSerieNumber/columnNumber));
      this.set('xAxis.max', visibleCatNumber);
      this.set('scrollbar.enabled', true);
    } else {
      visibleCatNumber = categoryNumber;
    }

    if (visibleCatNumber > appConfig.chartSettings.xAxis.maxGroup) {
      this.set('xAxis.labels', appConfig.chartSettings.xAxis.labels);
    }
  }
});