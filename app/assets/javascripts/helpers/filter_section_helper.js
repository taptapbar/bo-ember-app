Ember.Handlebars.registerBoundHelper('renderFilterMethod', function(filterMethod) {
  var radioClass = ["",""];
  var isChecked = ["",""];
  var value = ["view", "exclude"];
  var text = ["View", "Exclude"];
  if(filterMethod == "exclude") {
    radioClass[1] = "radio-pill-selected";
    isChecked[1] = "checked";
  } else {
    radioClass[0] = "radio-pill-selected";
    isChecked[0] = "checked";
  }
  var html = '<div class="clearfix">';
  for(var i=0;i<=1;i++) {
    html += ['<div class="radio-input inline-block">',
              '<label class="radio radio-pill ', radioClass[i], '"><input type="radio" name="filter-method"  value="', value[i], '" ', isChecked[i], '>', text[i], '</label>',
            '</div>'].join('');
  }
  html += '</div>';
  return new Handlebars.SafeString(html);
});


Ember.Handlebars.registerBoundHelper('renderFilterGroups', function(beforeParseFilterOption, filterValues) {
  
  // parse the filter format from {"CATEGORY-C": ['sub-a','sub-b','sub-c', 'sub-d']}
  // to { name: 'Dimension-C', sub_filters: ['sub-a', 'sub-b', 'sub-c', 'sub-d']}
  var filterOption = {};
  $.each(beforeParseFilterOption, function (index, value) { 
    console.log("index: ", index, "value: ", value);
    filterOption['name'] = index;
    filterOption['sub_filters'] = value;
  });

  function subFilters(filterOption) {

    var subFilters = filterOption.sub_filters;
    var subHtmlStr = "";

    if (subFilters.length <= appConfig.filter.maxFiltersPerColumn*4) {
      var subHtml = '<ul class="inline-block none-style clearfix">';
      $.each(subFilters, function(index, subFilter){
        var checkedHtml = 'checked';
        if ($.inArray(subFilter, filterValues[filterOption.name]) == -1) {
          checkedHtml = '';
        }
        if ((index%appConfig.filter.maxFiltersPerColumn) == 0) {
          if(index != 0) { subHtml += "</li>"; }
          subHtml += "<li>";
        }
        subHtml += ['<label class="checkbox" title="', subFilter, '">',
                     '<input type="checkbox" name="filter[:dimension][]" class="option" value="', subFilter, 
                         '" data-dimension="', filterOption.name, '" ', checkedHtml, '>', subFilter,
                     '</label>'
                     ].join('');
      });
      subHtml += "</ul>";
    }

    else {
      var subHtml = ['<select class="autocomplete-select" data-dimension="', filterOption.name, '" data-placeholder="Select your options" multiple>'].join('');
      $.each(subFilters, function(index, subFilter) {
        var selectedHtml = 'selected';
        if($.inArray(subFilter, filterValues[filterOption.name]) == -1) {
          selectedHtml = '';
        }
        subHtml += ['<option value="', subFilter, '" data-dimension="', filterOption.name, '" ', selectedHtml, '>',
                     subFilter, '</option>'].join('');
      });
      subHtml += '</select>'
    }

    subHtmlStr += subHtml;
    return subHtmlStr;
  }

  console.log("filterOption: ", filterOption, "filterValues: ", filterValues );
  // var topLevel = ["<input type='checkbox' name='' class='toggler' value='", filterOption.name, "'>", filterOption.name].join('');
  var secondLevelCss = "display:none;";
  var topLevelArrow = "i-arrow-right";
  if (!Ember.isNone(filterValues[filterOption.name])) {
    secondLevelCss = '';
    topLevelArrow = "i-arrow-down"
  }
    
  // var html = ['<div class="clearfix">',
  //               '<label class="checkbox">', topLevel, '</label>',
  //               '<div class="toggleable-panel" data-panel="', filterOption.name, '" style="', secondLevelCss, '">',
  //                 subFilters(filterOption),
  //               '</div>',
  //             '</div>'
  //             ].join('');

  var topLevel = ['<div class="list-title toggler clickable clearfix" data-value="', filterOption.name, '"><div class="', topLevelArrow, ' pull-left"></div><div class="pull-left inline-text-with-icon font-bold">', filterOption.name, "</div></div>"].join('');
  var html = ['<div class="clearfix expandable-list-header">',
                topLevel,
                '<div class="toggleable-panel" data-panel="', filterOption.name, '" style="', secondLevelCss, '">',
                  subFilters(filterOption),
                '</div>',
              '</div>'
              ].join('');
              
  return new Handlebars.SafeString(html);
});