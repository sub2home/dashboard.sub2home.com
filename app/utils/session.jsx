module.exports = {
  
  login: function(token) {
    localStorage.setItem('token', data.token);
  },

  logout: function() {
    localStorage.removeItem('token');
  },

  getToken: function() {
    return localStorage.getItem('token');
  },

  isLoggedIn: function() {
    return !!this.getToken();
  },

};
