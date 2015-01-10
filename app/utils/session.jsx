module.exports = {
  
  login: function(token) {
    localStorage.setItem('token', token);
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
