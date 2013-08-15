App.FilterSectionModalControllerMixin = Ember.Mixin.create({
  modalView: null,

  click: function() {
    this.showModalView();
  },

  close: function() {
    this.closeModalView();
  },

  closeModalView: function() {
    if (this.modalView) {
      this.modalView.close();
    }
  },

  // open modal view of relationship to show all details
  showModalView: function(customModalView) {
    this.closeModalView();
    this.modalView = customModalView;
    if (this.modalView) {
      this.modalView.append(); 
    }
  },
  
  showTimescopeModal: function() {
    modalView = App.TimeframeModalView.create({
        controller: this,
        baseView: this.get('view')
      });
    this.showModalView(modalView);
  },
  
  showFilterModal: function() {
    var self = this;
    this.get('model').fetchFilterList().then(function (listData) {
      console.log("listData: ", listData);
      modalView = App.FilterModalView.create({
          controller: self,
          baseView: self.get('view'),
          model: self.get('model'),
          filterList: listData.filter_list,
          filterValues: self.get('model').get('filters')
      });
      
      console.log('showFilterModal: ', self.get('model').get('filters'));
      self.showModalView(modalView);
      self.bindFilterDataToCurrentModal();
    });
    // this.get('model').fetchFilterList(function(listData) {
    //   console.log("listData: ", listData);
    //   modalView = App.FilterModalView.create({
    //       controller: self,
    //       baseView: self.get('view'),
    //       model: self.get('model')
    //     });
      
    //   console.log('showFilterModal: ', self.get('model').get('filters'));
    //   self.showModalView(modalView);
    // });
  },
  
  confirmTimeScope: function() {
    // grab attributes
    var model      = this.get('model');
    var attributes = this.getTimeScopeFormAttributes();
    
    // save into time_scope property
    model.set('timescope', attributes);
    console.log('confirmTimeScope: ', model.get('timescope'));
    this.rerenderChart(model.get('id'));
    this.closeModalView();
  },
  
  confirmFilter: function() {
    // grab attributes
    var model      = this.get('model');
    var attributes = this.getFilterFormAttributes();
    console.log("filters: ", attributes);
    
    // save into filter property
    model.set('filters', attributes);
    console.log('confirmFilter: ', model.get('filters'));
    this.rerenderChart(model.get('id'));
    this.closeModalView();
  },
  
  getTimeScopeFormAttributes: function() {
    var range = {};
    var cycle = { 'repeat': {}, 'calendar': {} };
    var timeScope = { 'range': range, 'cycle': cycle };
    rangeValue = $("input[name=timeframeRangeRadio]:radio:checked").val();
    if(rangeValue == "all") { range['period'] = rangeValue; }
    else { range['period'] = [$("#timeframe-range-from").val(), ":", $("#timeframe-range-to").val()].join(''); };
    
    cycleValue = $("input[name=cycle]:radio:checked").val();
    switch (cycleValue) {
      case ('all'):
        cycle.repeat.type = "none";
        break;
      case ('week'):
        cycle.repeat.type = "week";
        cycle.repeat.number = $("input[name=timeframe-cycle-week-repeat-number]").val();
        cycle.calendar.weekdays = {};
        cycle.calendar.weekdays.selected_days = $("input[name=timeframe-cycle-week-weekdays-checkbox]:checkbox:checked").map(function () {
          return this.value;
        }).get();
        break;
      case ('month'):
        cycle.repeat.type = "month";
        if ($("#timeframe-cycle-month-radio-1").is(':checked')) {
          cycle.calendar.days = {};
          cycle.calendar.days.number = $("#timeframe-cycle-month-select-1 option:selected").val();
          cycle.repeat.number = $("input[name=timeframe-cycle-month-repeat-number-1]").val();
        }
        else {
          cycle.calendar.weekdays = {};
          cycle.calendar.weekdays.number = $("#timeframe-cycle-month-select-2 option:selected").val();
          cycle.calendar.weekdays.selected_days = $("#timeframe-cycle-month-select-3 option:selected").map(function () {
            return this.value;
          }).get();
          cycle.repeat.number = $("input[name=timeframe-cycle-month-repeat-number-2]").val();
        }
        break;
      case ('year'):
        cycle.repeat.type = "year";
        if ($("#timeframe-cycle-year-radio-1").is(':checked')) {
          cycle.calendar.months = {};
          cycle.calendar.months.number = $("#timeframe-cycle-year-select-1 option:selected").val();
          cycle.calendar.months.selected_months = $("#timeframe-cycle-year-select-2 option:selected").map(function () {
            return this.value;
          }).get();
          cycle.repeat.number = $("input[name=timeframe-cycle-year-repeat-number-1]").val();
        }
        else {
          cycle.calendar.weekdays = {};
          cycle.calendar.months = {};
          cycle.calendar.weekdays.number = $("#timeframe-cycle-year-select-3 option:selected").val();
          cycle.calendar.weekdays.selected_days = $("#timeframe-cycle-year-select-4 option:selected").map(function () {
            return this.value;
          }).get();
          cycle.calendar.months.selected_months = $("#timeframe-cycle-year-select-5 option:selected").map(function () {
            return this.value;
          }).get();
          cycle.repeat.number = $("input[name=timeframe-cycle-year-repeat-number-2]").val();
        }
        break;
    };
    
    return { "time_scope": timeScope };
    //return { 'timescopeA': true, 'timescopeB': false };
  },
  
  getFilterFormAttributes: function() {
    // return selected filter attributes in hash 
    // ex { dimension-a: [sub-a, sub-b], dimension-b: [sub-c, sub-d] }
    var attributes = {};
    
    // get checkboxes values
    $(':checkbox:checked').filter('.option').each(function () {
      if(Ember.isNone(attributes[$(this).data('dimension')])) {
        attributes[$(this).data('dimension')] = [];
      }
      attributes[$(this).data('dimension')].push($(this).val());
    });

    // get autocomplete-select values
    $('.autocomplete-select').each(function (index, item) {
      console.log(index, item, $(item).val(), $(this), $(this).val());
      if(!Ember.isEmpty($(item).val())) {
        if(Ember.isNone(attributes[$(item).data('dimension')])) {
          attributes[$(item).data('dimension')] = [];
        }
        attributes[$(item).data('dimension')] = $(item).val();
      }
    });
    console.log("attributes: ", attributes);
    return attributes;
  },
  
  resetTimeScope: function() {
    console.log("resetTimeScope");
    $('#filter-window form').each(function (index) {
      this.reset();
    });
  },
  
  resetFilter: function() {
    console.log("resetFilter");
    $('#filter-window form').each(function (index) {
      this.reset();
    });
  },

  bindFilterDataToCurrentModal: function() {
    var filters        = this.get('model').get('filters');
    var isFiltersEmpty = Ember.isEmpty(Ember.keys(filters));
    console.log("bindFilterDataToCurrentModal");
    console.log("isFiltersEmpty: ", isFiltersEmpty);
    if(isFiltersEmpty){
      console.log("filters is empty");
      // do nothing
    } else {
      console.log(filters);
      // bind the filters attributes to the current modal
    }
  },

  rerenderChart: function(id) {
    console.log('rerender chart: ', id);
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
  },
});