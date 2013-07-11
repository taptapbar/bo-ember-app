App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    url: appConfig.store.adapter.URL,
    namespace: appConfig.store.adapter.namespace
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

DS.RESTAdapter.registerTransform('object', {
  deserialize: function(serialized) {
    return Em.isNone(serialized) ? {} : serialized;
  },
  serialize: function(deserialized) {
    return Em.isNone(deserialized) ? {} : deserialized;
  }
});