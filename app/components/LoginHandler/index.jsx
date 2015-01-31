var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation } = require('react-router');
var actions = require('../../actions');
var text = require('../../utils/text');
var session = require('../../utils/session');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin, Navigation],

  getInitialState: function() {
    return {
      number: '',
      password: '',
    };
  },

  componentDidMount: function() {
    this.listenTo(actions.loginSuccess, this._onLoginSuccess);
    this.listenTo(actions.loginError, this._onLoginError);
    this.listenTo(actions.storesUpdated, this._onStoresChange);

    if (session.isLoggedIn()) {
      actions.fetchStores();
    }
  },

  _onLoginSuccess: function() {
    actions.fetchStores();
  },

  _onLoginError: function() {
    actions.pushNotification(text.LOGIN_ERROR);
  },

  _onStoresChange: function(stores) {
    this.replaceWith('/' + stores[0].alias);
  },

  _handleNumberChange: function(e) {
    this.setState({ number: e.target.value });
  },

  _handlePasswordChange: function(e) {
    this.setState({ password: e.target.value });
  },

  _handleEnter: function(e) {
    if (e.keyCode === 13) {
      this._handleSubmit();
      e.target.blur();
    }
  },

  _handleSubmit: function() {
    actions.login(this.state.number, this.state.password);
  },

  render: function() {
    return (
      <div id="login" className="content note fillPage">
          <div id="loginAppTitle" className="fillSpace">
              <div>
                  <div id="loginAppTitleContainer">
                      <div className="logo"></div>
                      <h2>Dashboard</h2>
                  </div>
              </div>
          </div>
          <div id="loginStickToBottom">
              <div id="loginInputGroup">
                  <input type="tel" className="darkNote" placeholder="Benutzername" value={this.state.number} onKeyUp={this._handleEnter} onChange={this._handleNumberChange} />
                  <input type="password" className="darkNote" placeholder="Passwort" value={this.state.password} onKeyUp={this._handleEnter} onChange={this._handlePasswordChange} />
              </div>
              <div id="loginSubmitButton" className="darkNote btn" onClick={this._handleSubmit}>
                  <h2>Login</h2>
              </div>
          </div>
      </div>
    );
  },

});
