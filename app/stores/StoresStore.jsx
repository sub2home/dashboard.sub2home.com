var Reflux = require('reflux');
var actions = require('../actions');
var api = require('../utils/api');

module.exports = Reflux.createStore({

  FETCH_ERROR: 1,

  listenables: actions,

  list: function() {
    var self = this;
    api.get('clients')
      .then(data => self.trigger(data.storesCollection))
      .catch(() => self.trigger(self.FETCH_ERROR));
  },

});
