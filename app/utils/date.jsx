var pad = (str) => str.toString().length < 2 ? pad('0' + str) : str;

module.exports = {

  // return 01.01. if current year else 01.01.14
  timestampToDate: function(timestamp) {
    var now = new Date();
    var date = new Date(timestamp);
    var fullYear = date.getFullYear();
    var year = now.getFullYear() === fullYear ? '' : fullYear % 100;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    return pad(day) + '.' + pad(month) + '.' + year;
  },

  timestampToTime: function(timestamp) {
    var date = new Date(timestamp);
    return date.getHours() + ':' + pad(date.getMinutes());
  },

  minutesToTime: function(minutes) {
    return parseInt(minutes / 60, 10) + ':' + pad(minutes % 60);
  },

};
