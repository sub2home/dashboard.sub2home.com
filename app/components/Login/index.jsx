var Reflux = require('reflux');
var React = require('react');
var Navigation = require('react-router').Navigation;
var AuthActions = require('../../actions/AuthActions');
var AuthStore = require('../../stores/AuthStore');

require('./index.less');

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin, Navigation],
  getInitialState: function() {
    return {
      number: '',
      password: '',
    };
  },
  componentDidMount: function() {
    this.listenTo(AuthStore, this.onAuthChange);
  },
  onAuthChange: function(isLoggedIn) {
    if (isLoggedIn) {
      this.replaceWith('/list');
    }
  },
  handleNumberChange: function(e) {
    this.setState({number: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleEnter: function(e) {
    if (e.keyCode === 13) {
      this.handleSubmit();
      e.target.blur();
    }
  },
  handleSubmit: function() {
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
                  <input type="text" className="darkNote" placeholder="Benutzername" value={this.state.number} onKeyUp={this.handleEnter} onChange={this.handleNumberChange} />
                  <input type="password" className="darkNote" placeholder="Passwort" value={this.state.password} onKeyUp={this.handleEnter} onChange={this.handlePasswordChange} />
              </div>
              <div id="loginSubmitButton" className="darkNote" onClick={this.handleSubmit}>
                  <h2>Login</h2>
              </div>
          </div>
      </div>
    );
  }
});

