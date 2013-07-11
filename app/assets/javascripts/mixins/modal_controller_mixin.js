App.ModalControllerMixin = Ember.Mixin.create({
  modalView: null,

  click: function() {
    this.showModalView();
  },

  close: function() {
    this.closeModalView();
  },

  closeModalView: function() {
    console.log('closeModalView');
    if (this.modalView) {
      this.modalView.close();
    }
  },

  // open modal view of relationship to show all details
  showModalView: function() {
    console.log('showModalView');
    this.closeModalView();
    this.modalView = this.createModalView();
    if (this.modalView) {
      this.modalView.append(); 
    }    
  }
});
