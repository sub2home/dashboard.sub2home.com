var Reflux = require('reflux');

var AuthActions = Reflux.createActions([
    'login',
    'loginSuccess',
    'loginFail',
]);

AuthActions.login.listen(function(number, password) {

  request = new XMLHttpRequest();
  request.open('POST', 'https://localhost:1070/login', true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      var data = JSON.parse(request.responseText);
      AuthActions.loginSuccess(data.token);
    } else {
      AuthActions.loginFail();
    }
  };

  request.onerror = function() {
      AuthActions.loginFail();
  };

  request.send(JSON.stringify({number, password}));
});

module.exports = AuthActions;
