// This helper accept 3 arguments: type, rangeFrom, rangeTo
// Type: "cardinal" renders cardinal sequence of numbers
//       "ordinal" renders ordinal numbers
// rangeFrom: the number of options starts at
// rangeTo: the number of options ends at
Ember.Handlebars.registerHelper('renderNumberSelectOptions', function(type, rangeFrom, rangeTo) {
  function formCardinalNumberArray(from, to) {
    var numberArray = [];
    for(var i=from;i<=to;i++)
      { numberArray.push(i) };
    return numberArray;
  };
  function getOrdinal(crdinalNumber) {
    var s = ["th","st","nd","rd"],
    v = crdinalNumber%100;
    return crdinalNumber+(s[(v-20)%10]||s[v]||s[0]);
  };
  function toOrdinalNumberArray(numberArray) {
    var ordinalNumberArray = [];
    $.each(numberArray, function(index, value) {
      ordinalNumberArray[index] = getOrdinal(value);
    });
    return ordinalNumberArray;
  };
  var cardinalNumberArray = formCardinalNumberArray(rangeFrom, rangeTo);
  var textArray = [];
  var selectOptionsHtml = "";
  if(type=="ordinal") { textArray = toOrdinalNumberArray(cardinalNumberArray) }
  else { textArray = cardinalNumberArray };
  $.each(cardinalNumberArray, function(index, value) {
    selectOptionsHtml += ["<option value='", value, "'>", textArray[index], "</option>"].join('');
  });
  return new Handlebars.SafeString(selectOptionsHtml);
});


Ember.Handlebars.registerHelper('renderMonthSelectOptions', function() {
  var monthArray = ['January', 'Febuary', 'March', 'April',
                    'May', 'June', 'July', 'August', 'September',
                    'October', 'November', 'December'];
  var selectOptionsHtml = "";
  $.each(monthArray, function(index, value) {
    selectOptionsHtml += ["<option value='", value.toLowerCase(), "'>", value, "</option>"].join('');
  });
  return new Handlebars.SafeString(selectOptionsHtml);
});

Ember.Handlebars.registerHelper('renderWeekdaySelectOptions', function() {
  var weekdayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
                    'Friday', 'Saturday', 'Sunday'];
  var selectOptionsHtml = "";
  $.each(weekdayArray, function(index, value) {
    selectOptionsHtml += ["<option value='", value.toLowerCase(), "'>", value, "</option>"].join('');
  });
  return new Handlebars.SafeString(selectOptionsHtml);
});