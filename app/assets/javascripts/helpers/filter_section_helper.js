Ember.Handlebars.registerBoundHelper('renderFilterGroups', function(filterOption, filterValues) {
  function subFilters(filterOption) {
    var subFilters = filterOption.sub_filters;
    var subHtmlStr = "";
    
    $.each(subFilters, function(index, subFilter){
      var checkedHtml = 'checked';
      if ($.inArray(subFilter, filterValues[filterOption.name]) == -1) {
        checkedHtml = '';
      }
      var subHtml = ['<label class="inline"  class="checkbox">',
                     '<input type="checkbox" name="filter[:dimension][]" class="option" value="', subFilter, 
                         '" data-dimension="', filterOption.name, '" ', checkedHtml, '>', subFilter,
                     '</label>'
                     ].join('');
      subHtmlStr += subHtml;
    });
    return subHtmlStr;
  }
  
  // var topLevel = ["<input type='checkbox' name='' class='toggler' value='", filterOption.name, "'>", filterOption.name].join('');
  var secondLevelCss = "display:none;";
  if (!Ember.isNone(filterValues[filterOption.name])) {
    topLevel = ["<input type='checkbox' name='' class='toggler' value='", filterOption.name, "' checked>", filterOption.name].join('');
    secondLevelCss = '';
  }
    
  // var html = ['<div class="clearfix">',
  //               '<label class="checkbox">', topLevel, '</label>',
  //               '<div class="toggleable-panel" data-panel="', filterOption.name, '" style="', secondLevelCss, '">',
  //                 subFilters(filterOption),
  //               '</div>',
  //             '</div>'
  //             ].join('');

  var topLevel = ['<label class="toggler" value="', filterOption.name, '">', filterOption.name, "</label>"].join('');
  var html = ['<div class="clearfix">',
                topLevel,
                '<div class="toggleable-panel" data-panel="', filterOption.name, '" style="', secondLevelCss, '">',
                  subFilters(filterOption),
                '</div>',
              '</div>'
              ].join('');
              
  return new Handlebars.SafeString(html);
});