var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation } = require('react-router');
var AuthActions = require('../../actions/AuthActions');
var AuthStore = require('../../stores/AuthStore');

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
    if (AuthStore.isLoggedIn()) {
      this.replaceWith('/orders');
      return;
    }
    this.listenTo(AuthStore, this._onAuthChange);
  },

  _onAuthChange: function(status) {
    if (status === AuthStore.LOGIN_SUCCESS) {
      this.replaceWith('/orders');
    }
  },

  _handleNumberChange: function(e) {
    this.setState({number: e.target.value});
  },

  _handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  _handleEnter: function(e) {
    if (e.keyCode === 13) {
      this._handleSubmit();
      e.target.blur();
    }
  },

  _handleSubmit: function() {
    AuthActions.login(this.state.number, this.state.password);
  },

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
                  <input type="text" className="darkNote" placeholder="Benutzername" value={this.state.number} onKeyUp={this._handleEnter} onChange={this._handleNumberChange} />
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

