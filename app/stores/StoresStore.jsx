var Reflux = require('reflux');
var StoresActions = require('../actions/StoresActions');
var Api = require('../utils/Api');

module.exports = Reflux.createStore({

  FETCH_ERROR: 1,

  listenables: StoresActions,

  list: function() {
    var self = this;
    Api.get('clients')
      .then(data => self.trigger(data.storesCollection))
      .catch(() => self.trigger(self.FETCH_ERROR));
  },

});
