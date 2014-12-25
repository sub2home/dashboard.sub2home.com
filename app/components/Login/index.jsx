var React = require('react');

require('./index.less');

module.exports = React.createClass({
  render: function() {
    return (
      <div id="login" className="content note fillPage sc-tr">
          <div id="loginAppTitle" className="fillSpace">
              <div className="fix-tr">
                  <div id="loginAppTitleContainer">
                      <div className="logo"></div>
                      <h2>Dashboard</h2>
                  </div>
              </div>
          </div>
          <div id="loginStickToBottom">
              <div id="loginInputGroup">
                  <input type="text" className="darkNote" placeholder="Benutzername" />
                  <input type="password" className="darkNote" placeholder="Passwort" />
              </div>
              <div id="loginSubmitButton" className="darkNote">
                  <h2>Login</h2>
              </div>
          </div>
      </div>
    );
  }
});

