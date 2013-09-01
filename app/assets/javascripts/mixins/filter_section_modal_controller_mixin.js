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
      $('body').css('overflow-y', 'visible');
    }
  },

  // open modal view of relationship to show all details
  showModalView: function(customModalView) {
    this.closeModalView();
    this.modalView = customModalView;
    if (this.modalView) {
      this.modalView.append();
      $('body').css('overflow-y', 'hidden');
    }
  },
  
  showTimescopeModal: function() {
    modalView = App.TimeframeModalView.create({
        controller: this,
        baseView: this.get('view'),
        model: this.get('model'),
        timescope: this.get('model').get('timescope'),
      });
    this.showModalView(modalView);
    this.bindTimescopeDataToCurrentModal();
  },
  
  showFilterModal: function() {
    var self = this;
    this.get('model').fetchFilterList().then(function (listData) {
      console.log("listData: ", listData);
      if (Ember.isNone(self.get('model').get('filters.filter_content'))) { self.get("model").set('filters.filter_content', {}).set('filters.filter_method', ""); }
      var filterValues = self.get("model").get('filters.filter_content');
      var filterMethod = self.get('model').get('filters.filter_method');
      modalView = App.FilterModalView.create({
          controller: self,
          baseView: self.get('view'),
          model: self.get('model'),
          filterList: listData.filter_list,
          filterValues: filterValues,
          filterMethod: filterMethod
      });
      
      console.log('showFilterModal: ', filterValues);
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
    model.rerenderChart();
    this.closeModalView();
  },
  
  confirmFilter: function() {
    // grab attributes
    var model      = this.get('model');
    var filters = this.getFilterFormAttributes();
    console.log("filters: ", filters);
    
    // save into filter property
    model.set('filters', filters);
    console.log('confirmFilter: ', model.get('filters'));
    model.rerenderChart();
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
        cycle.repeat.number = $("#timeframe-cycle-week-repeat-number").val();
        cycle.calendar.weekdays = {};
        cycle.calendar.weekdays.selected_days = $("input[name=timeframe-cycle-week-weekdays-checkbox]:checkbox:checked").map(function () {
          return this.value;
        }).get();
        break;
      case ('month'):
        cycle.repeat.type = "month";
        if ($('#timeframe-container input[type="radio"][name="cycle-month"][value="1"]').is(':checked')) {
          cycle.calendar.days = {};
          cycle.calendar.days.number = $("#timeframe-cycle-month-select-1 option:selected").val();
          cycle.repeat.number = $("#timeframe-cycle-month-repeat-number-1").val();
        }
        else {
          cycle.calendar.weekdays = {};
          cycle.calendar.weekdays.number = $("#timeframe-cycle-month-select-2 option:selected").val();
          cycle.calendar.weekdays.selected_days = $("#timeframe-cycle-month-select-3 option:selected").map(function () {
            return this.value;
          }).get();
          cycle.repeat.number = $("#timeframe-cycle-month-repeat-number-2").val();
        }
        break;
      case ('year'):
        cycle.repeat.type = "year";
        if ($('#timeframe-container input[type="radio"][name="cycle-year"][value="1"]').is(':checked')) {
          cycle.calendar.months = {};
          cycle.calendar.months.selected_months = $("#timeframe-cycle-year-select-1 option:selected").map(function () {
            return this.value;
          }).get();
          cycle.calendar.months.number = $("#timeframe-cycle-year-select-2 option:selected").val();
          cycle.repeat.number = $("#timeframe-cycle-year-repeat-number-1").val();
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
          cycle.repeat.number = $("#timeframe-cycle-year-repeat-number-2").val();
        }
        break;
    };
    
    return timeScope;
    //return { 'timescopeA': true, 'timescopeB': false };
  },
  
  getFilterFormAttributes: function() {
    // return selected filter attributes in hash 
    // ex { dimension-a: [sub-a, sub-b], dimension-b: [sub-c, sub-d] }
    var attributes = {};
    var filterMethod;

    // get filterMethod value
    filterMethod = $('input[name=filter-method]:checked').val()
    
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
    return { 'filter_method': filterMethod,  'filter_content': attributes };
  },
  
  resetTimeScope: function() {
    console.log("resetTimeScope");
    $('#filter-window form').each(function (index) {
      this.reset();
    });
    bindTimescopeDataToCurrentView(this.get('model').get('timescope'));
  },
  
  resetFilter: function() {
    //console.log("resetFilter");

    $('#filter-window form').each(function (index) {
      console.log("reset: ", this)
      // unchosen all autocomplete select, 
      $(".autocomplete-select").chosen('destroy');
      // reset the form
      this.reset();
      //initialize the autocomplete select again
      $(".autocomplete-select").on('chosen:showing_dropdown', function(evt, params) {
        console.log(evt, params);
      }).on('chosen:hiding_dropdown', function(evt, params) {
        console.log(evt, params);
      }).chosen({
        width: "500px",
        no_results_text: "Oops, nothing found!",
      });
    });
    resetFilterModal(this.get('model').get('filters.filter_method'))

  },

  bindFilterDataToCurrentModal: function() {
    var filters        = this.get('model').get('filters.filter_content');
    var isFiltersEmpty = Ember.isEmpty(Ember.keys(filters));
    var filterMethod   = this.get('model').get('filters.filter_method')
    console.log("isFiltersEmpty: ", isFiltersEmpty);
    if(isFiltersEmpty){
      console.log("filters is empty");
      // do nothing
    } else {
      console.log(filters);
      // bind the filters attributes to the current modal
    }
  },

  bindTimescopeDataToCurrentModal: function() {

  },
});