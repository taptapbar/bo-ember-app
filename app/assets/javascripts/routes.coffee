App.Router.map ->
  @resource 'multiview', ->
    @resource 'big_object_view', 
      path: ':big_object_view_id'
      
  @route 'comparison',       
    path: "/comparison"
  @route 'multiview_new',
    path: "/multiview/new"
  @route 'item_association',
    path: "/item_association"
  @route 'significance',
    path: "/significance"
  @route 'diagnosis',   
    path: "/diagnosis"
  @route 'filter',      
    path: "/filter"
  @route 'timeframe',   
    path: "/timeframe"
    
App.MultiviewRoute = Ember.Route.extend
  model: ->
    return App.BigObjectView.find()