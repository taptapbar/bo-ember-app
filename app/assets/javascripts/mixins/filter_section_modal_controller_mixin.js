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
    closeModalView();
  },
  
  getTimeScopeFormAttributes: function() {
    return { 'timescopeA': true, 'timescopeB': false };
  },
  
  getFilterFormAttributes: function() {
    // return selected filter attributes in hash 
    // ex { dimension-a: [sub-a, sub-b], dimension-b: [sub-c, sub-d] }
    var attributes = {};
    $(':checkbox:checked').filter('.option').each(function () {
      if(attributes[$(this).data('dimension')] === undefined) {
        attributes[$(this).data('dimension')] = [];
      }
      attributes[$(this).data('dimension')].push($(this).val());
    });
    //console.log("attributes: ", attributes);
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
});