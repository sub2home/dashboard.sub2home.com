var pad = (x, n) => x.toString().length < n ? pad('0' + x, n) : x;

module.exports = {
  pad,
  phoneNumber: function(number) {
    return number.toString().substr(0, 1) === '0' ? number : '0' + number;
  },
};
