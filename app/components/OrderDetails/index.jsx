var _ = require('lodash');
var React = require('react');
var { ListenerMixin } = require('reflux');
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
  },

  render: function() {
    var order = this.state.order;
    var address = order.addressModel;
    var orderedItems = order.orderedItemsCollection;

    var summaryListing, detailListing;
    if (orderedItems && orderedItems.length > 0) {
      var summaryListing = orderedItems.map(function(orderedItem) {
        var articles = orderedItem.orderedArticlesCollection.map(o => o.articleModel).map(function(article) {
          var paidIngredients = _(article.ingredientCategoriesCollection)
                                  .map('ingredientsCollection')
                                  .flatten()
                                  .filter(i => i.price > 0)
                                  .value();
          return (
            <div className="orderedArticlesListItemInfo">
              <div className="orderDetailsAmount">{orderedItem.amount}x</div>
              <div className="orderDetailsCategory">{article.categoryModel.title}</div>
              <div className="orderDetailsTitle">{article.title}</div>{paidIngredients.map(i => <span className="orderDetailsExtra">{i.shortcut}</span>)}
            </div>
          );
        });
        var menu = orderedItem.menuBundleModel || orderedItem.menuUpgradeModel;
        // var amount = orderedItem.amount > 1 ? : '';
        var orderItemInfo = menu ? menu.title : articles;
        var menuString = menu ? articles : '';
        return (
          <li>
            <div className="orderedArticlesListItem">
              <header>
                <div className="orderedArticlesListItemBase">
                  {orderItemInfo}
                </div>
                <div className="orderedArticlesListItemPrice">{orderedItem.total}</div>
              </header>
              {menuString}
            </div>
          </li>
        );
      });

      var detailListing = orderedItems.map(function(orderedItem) {
        var menu = orderedItem.menuBundleModel || orderedItem.menuUpgradeModel;
        var articles = orderedItem.orderedArticlesCollection.map(o => o.articleModel).map(function(article) {
          var ingredientCategories;
          if (article.ingredientCategoriesCollection) {
            ingredientCategories = article.ingredientCategoriesCollection.map(function(ingredientCategory) {
              var ingredients = ingredientCategory.ingredientsCollection.map(i => <span>{i.title}</span>);
              return <div>{ingredientCategory.title} {ingredients}</div>;
            });
          }
          var info = article.info ? '(' + article.info + ')' : '';
          var amount = menu ? '' : <span className="orderDetailsAmount">{orderedItem.amount}x</span>;
          return (
            <div className="articleInOrder">
              <h3>
                {amount}
                <span className="orderDetailsCategory">{article.categoryModel.title}</span> {article.title} {info}
              </h3>
              <div className="ingredientsInOrder">
              {ingredientCategories}
              </div>
            </div>
          );
        });

        if (menu) {
          return (
            <div className="menuInOrder">
              <header>
                <h3><span className="orderDetailsAmount">{orderedItem.amount}x</span>{menu.title}</h3>
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
            Best.-Nr. <span>{pad(order.id, 8)}</span> (eingegangen am {timestampToDate(order.createdAt)} um {timestampToTime(order.createdAt)})
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
                  Hier noch eine kurze Nachricht. Die bestimmt mehrere Zeilen lang ist, aber das ist ja auch gut so.
                </div>
              </div>
            </div>
            <div className="orderDeliveryDetails">
              <div className="orderTimeQrCode">
                {timestampToTime(order.dueAt)}
                <img className="orderQrCode" src="" alt=""/>
              </div>
              <div className="orderedArticlesListing">
                <ol className="orderedArticlesList">
                {summaryListing}
                </ol>
                <div className="orderArticlesListOverallSum"><span className="label orderPaymentMethod">{paymentMethod}</span><span>{order.total}</span></div>
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
