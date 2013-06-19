App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    url: ''
  })
});

DS.RESTAdapter.registerTransform('array', {
  serialize: function(value) {
    if (Em.typeOf(value) === 'array') {
      return value;
    } else {
      return [];
    }
  },
  deserialize: function(value) {
    return value;
  }
});