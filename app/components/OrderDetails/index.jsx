var React = require('react');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    order: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <div>Very detail. Such {this.props.order.addressModel.firstName}. Wow.</div>
    );
  },

});
