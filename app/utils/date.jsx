var { pad } = require('./format');
var pad2 = x => pad(x, 2);

module.exports = {

  // return 01.01. if current year else 01.01.14
  timestampToDate: function(timestamp) {
    var now = new Date();
    var date = new Date(timestamp);
    var fullYear = date.getFullYear();
    var year = now.getFullYear() === fullYear ? '' : fullYear % 100;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    return pad2(day) + '.' + pad2(month) + '.' + year;
  },

  timestampToTime: function(timestamp) {
    var date = new Date(timestamp);
    return date.getHours() + ':' + pad2(date.getMinutes());
  },

  minutesToTime: function(minutes) {
    return parseInt(minutes / 60, 10) + ':' + pad2(parseInt(minutes, 10) % 60);
  },

};
