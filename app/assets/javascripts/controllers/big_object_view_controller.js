App.BigObjectViewController = Ember.ObjectController.extend(App.ModalControllerMixin, {  
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
        baseView: this.get('view')
      });
    this.showModalView(modalView);
  },
  
  confirmTimeScope: function() {
    // grab attributes
    // save into time_scope property
    this.closeModalView();
  },
  
  confirmFilter: function() {
    // grab attributes
    // save into filter property
    this.closeModalView();
  }
});