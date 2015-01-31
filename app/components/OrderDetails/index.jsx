var _ = require('lodash');
var React = require('react');
var { ListenerMixin } = require('reflux');
var text = require('../../utils/text');
var actions = require('../../actions');
var { timestampToTime, timestampToDate } = require('../../utils/date');
var { pad, phoneNumber } = require('../../utils/format');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin],

  propTypes: {
    order: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      order: this.props.order,
    };
  },

  componentWillMount: function() {
    this.listenTo(actions.orderUpdated, this._onOrderUpdated);
    actions.fetchOrder(this.state.order.id);
  },

  _onOrderUpdated: function(order) {
    this.setState({ order });
    this.stopListeningTo(actions.orderUpdated);
  },

  _resendMail: function() {
    this.listenTo(actions.resendOrderMailSuccess, this._onResendMailSuccess);
    actions.resendOrderMail(this.state.order.id);
  },

  _onResendMailSuccess: function() {
    actions.pushNotification(text.RESEND_MAIL_SUCCESS);
    this.stopListeningTo(actions.resendOrderMailSuccess);
  },

  render: function() {
    var order = this.state.order;
    var address = order.addressModel;
    var orderedItems = order.orderedItemsCollection;

    var summaryListing, detailListing;
    if (orderedItems && orderedItems.length > 0) {
      var summaryListing = orderedItems.map(function(orderedItem) {
        var menu = orderedItem.menuBundleModel || orderedItem.menuUpgradeModel;
        var amount = menu ? null : <div className="orderedItemAmount">{orderedItem.amount}x</div>;
        var articles = orderedItem.orderedArticlesCollection.map(o => o.articleModel).map(function(article) {
          var info = article.info ? <div className="orderedItemLabel"><span className="label">{article.info}</span></div> : null;
          var paidIngredients = _(article.ingredientCategoriesCollection)
                                  .map('ingredientsCollection')
                                  .flatten()
                                  .filter(i => i.price > 0)
                                  .value();
          return (
            <div className="orderedItem">
              <div className="orderedItemBase">
                {amount}
                <div className="orderedItemCategory">{article.categoryModel.title}</div>
                <div className="orderedItemTitle">{article.title}</div>
                {info}
              </div>
              <div className="orderedItemPaidExtras">
              
              {paidIngredients.map(i => <span className="label framed">{i.shortcut}</span>)}
              </div>
            </div>
          );
        });

        if (menu) {
          return (
            <li>
              <div className="orderedMenu">
                <header>
                  <div className="orderedMenuBase">
                    <div className="orderedItem">
                      <div className="orderedItemBase">
                        <div className="orderedItemAmount">{orderedItem.amount}x</div>
                        <div className="orderedItemTitle">{menu.title}</div>
                      </div>
                    </div>
                    <div className="orderedItemPrice">15,56</div>
                  </div>
                </header>
                {articles}
              </div>
            </li>
          );
        } else {
          return (
            <li>
              <div className="orderedArticle">
                <div className="orderedArticleBase">
                {articles}
                
                <div className="orderedItemPrice">15,56</div>
                </div>
              </div>
            </li>
          );
        }
      });

      var detailListing = orderedItems.map(function(orderedItem) {
        var menu = orderedItem.menuBundleModel || orderedItem.menuUpgradeModel;
        var amount = menu ? null : <div className="orderedItemAmount">{orderedItem.amount}x</div>;
        var articles = orderedItem.orderedArticlesCollection.map(o => o.articleModel).map(function(article) {
          var ingredientCategories;
          if (article.ingredientCategoriesCollection) {
            ingredientCategories = article.ingredientCategoriesCollection.map(function(ingredientCategory) {
              return (
                <div className="orderedItemIngredientCategory">
                  <header>{ingredientCategory.title}</header>
                  <div className="orderedItemIngredientLabels">
                    <div>
                      {ingredientCategory.ingredientsCollection.map(i => <span className="label framed">{i.shortcut}</span>)}
                    </div>
                  </div>
                </div>
              );
            });
          }

          var info = article.info ? <div className="orderedItemLabel"><span className="label">{article.info}</span></div> : null;

          return (
            <div className="orderedItem">
              <div className="orderedItemBase">
                {amount}
                <div className="orderedItemCategory">{article.categoryModel.title}</div>
                <div className="orderedItemTitle">{article.title}</div>
                {info}
              </div>
              <div className="orderedItemIngredients">
                {ingredientCategories}
              </div>
            </div>
          );
        });

        if (menu) {
          return (
            <div className="orderedMenu">
              <header>
                <div className="orderedItem">
                  <div className="orderedItemBase">
                    <div className="orderedItemAmount">{orderedItem.amount}x</div>
                    <div className="orderedItemTitle">{menu.title}</div>
                    <div className="orderedItemLabel"><span className="label">Menü</span></div>
                  </div>
                </div>
              </header>
              {articles}
            </div>
          );
        } else {
          return articles;
        }
      });
    }

    var paymentMethods = {
      cash: 'Bar',
      ec: 'EC-Karte',
    };
    var paymentMethod = paymentMethods[order.paymentMethod];

    return (
      <div className="orderDetails">
        <div className="orderDetailsContent">
          <section className="orderDetailsHead">
            <div className="orderNumber">
              <span className="orderNumberBase">Best.-Nr. {pad(order.id, 8)}</span><span className="orderNumberAdditionalInfo"> {timestampToDate(order.createdAt)} um {timestampToTime(order.createdAt)})</span>
            </div>
            <div className="orderDetailsDueTime">{timestampToTime(order.dueAt)}</div>
            <div className="icn iResendMail" onClick={this._resendMail}></div>
          </section>
          <section className="orderDetailsAbstract">
            <div className="ordererDetails">
              <div className="ordererAddress">
                {address.firstName} {address.lastName}<br/>
                {address.street} {address.streetNumber} {address.streetAdditional}<br/>
                <span className="ordererDeliveryArea">
                  {address.postal} {address.city}<br/>
                  {address.district}
                </span>
              </div>
              <div className="ordererContact">
                <i className="icn iPhone"></i>{phoneNumber(address.phone)}<br/>
                <i className="icn iMail"></i>{address.email}
              </div>
              <div className="ordererMessage">
                <i className="icn iComment"></i>
                <div className="ordererMessageContent">
                  {order.comment}
                </div>
              </div>
            </div>
            <div className="orderDeliveryDetails">
              <div className="orderedArticlesListing">
                <ol className="orderedArticlesList">
                  {summaryListing}
                </ol>
                <div className="orderedArticlesListOverallSum">
                  <span className="label orderPaymentMethod">{paymentMethod}</span><span>{order.total}</span>
                </div>
              </div>
            </div>
          </section>
          <section className="orderDetailsItems">
            {detailListing}
          </section>
        </div>
      </div>
    );
  },

});
