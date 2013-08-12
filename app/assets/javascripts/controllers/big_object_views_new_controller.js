App.BigObjectViewsNewController = Ember.ObjectController.extend(App.FilterSectionModalControllerMixin, {
  newObject: {},
  
  createNewView: function() {
    console.log('createNewView');
    var model = this.get('model');
    
    this.newObject = this.getFormAttributes();
    result = this.validateNewObject(this.newObject);
    
    if (result.isValid) {
      this.setAttributesIntoModel(this.newObject);
      // .save() will send request to server, which we don't want
      App.BigObjectView.saveLocally(model);
      
      //this.createNewBOViewInstance(this.newObject);
      
      // console.log('Model: ', model);
      this.transitionToRoute('big_object_view', model);
    } else {
      $('#create-new-view-container .error-message').html(result.message);
      return false;
    }
  },
  
  cancelCreateView: function() {
    var model = this.get('model');
    model.deleteRecord();
    
    this.transitionToRoute('big_object_views');
  },
  
  setAttributesIntoModel: function(attributes) {
    var newObject = this.get('model');
    var tempId = new Date().getTime();
    var encodedTempId = Math.floor(Math.random(tempId)*(999999999999)+1);
    newObject.set('id', encodedTempId);
    newObject.set('title', attributes.title);
    newObject.set('measure', attributes.measure);
    newObject.set('dimensions', attributes.dimensions);
  },
  
  validateNewObject: function(newObject) {
    var result = { isValid: true, field: null, message: '' };
    
    if (!(newObject.dimensions && (newObject.dimensions.length > 0))) {
      result.field   = 'dimensions';
      result.message = "Please select at least one dimension.";
      result.isValid = false;
      return result;
    }
    
    if (!(newObject.measure && (newObject.measure.length > 0))) {
      result.field   = 'measure';
      result.message = "Please select a measure.";
      result.isValid = false;
      return result;
    }
    
    if (!(newObject.title && (newObject.title.length > 0))) {
      result.field   = 'title';
      result.message = "Title can\'t be blank.";
      result.isValid = false;
      return result;
    }
    
    return result;
  },
  
  resetForm: function() {
    //console.log('resetForm');
    $.each(Ember.View.views,function(){
      var templateName = 'big_object_views/select_dimensions';
      if (this.get('templateName') == templateName) {
        this.rerender();
      }
    });
    
    $('#create-new-view-container form').each(function (index) {
      this.reset();
    });
    
    $('#create-new-view-container .error-message').html('');
  },
  
  getFormAttributes: function() {
    var title      = '';
    var measure    = '';
    var dimensions = [];
    
    title = $('#create-new-view-title').val();
    
    if ($('input[name="measure"]:checked').length > 0) {
      measure = $('input[name="measure"]:checked').val();
    }
    
    $('#sortable-di-selected li[class*=option]:lt(3)').each(function(index) {
      dimensions.push([$(this).attr('data-dimension'), $(this).attr('data-sub')].join('.'));
    });
    
    return { dimensions: dimensions, 
             measure: measure, 
             title: title };
  },
  
  createNewBOViewInstance: function(newObject) {    
    newBOViewID(newObject).then(function (chartID) {
      newObject.id = chartID;
      try {
        if(App.BigObjectView.find().filterProperty('id', chartID).length == 0) {
          App.BigObjectView.createRecord(newObject);
        }
        else console.log("The ID:" + chartID + " has been used");
      }
      catch(err) {
        // if the hs been used, this error will be thrown out
        console.log(err);
        alert("Something went wrong at creating new charts");
      }
      finally {
        return document.location = "/#/multiview/"+chartID;
      }
    });
  }
});