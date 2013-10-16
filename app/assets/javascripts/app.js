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
  $('#view-container').css('width', '100%').css('width', '-=200px');
  
  console.log('draw: ', id);
  var chartGenerator = new App.ChartGenerator();
  var view = App.BigObjectView.findLocallyAndRemotely(id);
  view.fetchChartData(id).then(function (chartData) {
        chartGenerator.render('highchart', 
                              'column', 
                              chartData.get('dataValues'), 
                              chartData.get('categories'),
                              chartData.get('params'), 
                              view.get('title'), 
                              view.get('measure'))
  });
});

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.trim = function(number) {
  return (this.length > number) ? this.slice(0, number-3) + '...' : this;
};

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

$(window).resize(function() {
  $('#view-container').css('width', '100%').css('width', '-=170px');
});

if(!document.getElementsByClassName){
    document.getElementsByClassName = function(className, element){
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i=0; i<children.length; i++){
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j=0; j<classNames.length; j++){
                if (classNames[j] == className){ 
                    elements.push(child);
                    break;
                }
            }
        } 
        return elements;
    };
}

// window.onbeforeunload = function(event)
// {
//   return confirm("Confirm refresh");
// };