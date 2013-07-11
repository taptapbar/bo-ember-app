App.BigObjectViewController = Ember.ObjectController.extend(App.ModalControllerMixin, {  
  showTimeframeModal: function() {
    this.showModalView();
  },
  
  createModalView: function() {
    return App.TimeframeModalView.create({
      controller: this,
      baseView: this.get('view')
    });
  }
});