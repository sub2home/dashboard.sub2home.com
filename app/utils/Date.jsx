module.exports = {

    timestampToTime: function(timestamp) {
        var date = new Date(timestamp);
        var pad = (str) => str.toString().length < 2 ? pad('0' + str) : str;
        return pad(date.getHours()) + ':' + pad(date.getMinutes());
    },

};
