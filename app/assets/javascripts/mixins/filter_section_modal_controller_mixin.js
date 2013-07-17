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
    modalView = App.FilterModalView.create({
        controller: this,
        baseView: this.get('view'),
        model: this.get('model')
      });
      
    console.log('showFilterModal: ', this.get('model').get('filters'));
    this.showModalView(modalView);
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
    
    // save into filter property
    model.set('filters', attributes);
    console.log('confirmFilter: ', model.get('filters'));
    this.closeModalView();
  },
  
  getTimeScopeFormAttributes: function() {
    return { 'timescopeA': true, 'timescopeB': false };
  },
  
  getFilterFormAttributes: function() {
    return { 'filterA': true, 'filterB': false };
  }
});