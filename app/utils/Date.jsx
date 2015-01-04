var pad = (str) => str.toString().length < 2 ? pad('0' + str) : str;

module.exports = {

  timestampToTime: function(timestamp) {
    var date = new Date(timestamp);
    return date.getHours() + ':' + pad(date.getMinutes());
  },

  minutesToTime: function(minutes) {
    return parseInt(minutes / 60, 10) + ':' + pad(minutes % 60);
  },

};
