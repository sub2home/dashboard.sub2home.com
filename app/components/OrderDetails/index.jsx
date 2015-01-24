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
    this.stopListeningTo(actions.orderUpdated);
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
            <div className="orderedArticleItem">
              <div className="orderedArticleItemBase">
                <div className="orderedArticleItemAmount">{orderedItem.amount}x</div>
                <div className="orderedArticleItemCategory">{article.categoryModel.title}</div>
                <div className="orderedArticleItemTitle">{article.title}</div>
                <div className="orderedArticleItemLabel"><span className="label">6-inch</span></div>
              </div>
              <div className="orderedArticleItemPaidExtras">{paidIngredients.map(i => <span className="label framed">{i.shortcut}</span>)}</div>
            </div>
          );
        });
        var menu = orderedItem.menuBundleModel || orderedItem.menuUpgradeModel;
        // var amount = orderedItem.amount > 1 ? : '';
        var orderItemInfo = menu ? menu.title : articles;
        var menuString = menu ? articles : '';
        return (
          <li>
          {/* <div className="orderedArticle">
              <header>
                <div className="orderedArticleBase">
                  {orderItemInfo}
                </div>
                <div className="orderedArticlePrice">{orderedItem.total}</div>
              </header>
              {menuString}
            </div>  */}
            
            {/* ordered Article – Change to previous version: moved .orderedArticleItemPaidExtras from .orderedArticleItems to .orderedArticleBase
            
            <div className="orderedArticle">
              <div className="orderedArticleBase">
                <div className="orderedItem">
                  <div className="orderedItemBase">
                    <div className="orderedItemAmount">3x</div>
                    <div className="orderedItemCategory">Subs</div>
                    <div className="orderedItemTitle">BBQ-Rib</div>
                    <div className="orderedItemLabel"><span className="label">6-inch</span></div>
                  </div>
                </div>
                <div className="orderedItemPrice">15,56</div>
              </div>
              <div className="orderedItemPaidExtras"><span className="label framed">DM</span><span className="label framed">ExSk</span></div>
            </div>
            
            */}
            
            {/* ordered Menu – orderedItem stays the same, orderedMenu header is different */}
            
            <div className="orderedMenu">
              <header>
                <div className="orderedItem">
                  <div className="orderedItemBase">
                    <div className="orderedItemAmount">3x</div>
                    <div className="orderedItemCategory">Menü</div>
                    <div className="orderedItemTitle">Familienmenü</div>
                  </div>
                </div>
                <div className="orderedItemPrice">15,56</div>
              </header>
              <div className="orderedItem">
                <div className="orderedItemBase">
                  <div className="orderedItemCategory">Subs</div>
                  <div className="orderedItemTitle">BBQ-Rib</div>
                  <div className="orderedItemLabel"><span className="label">6-inch</span></div>
                </div>
                <div className="orderedItemPaidExtras"><span className="label framed">DM</span><span className="label framed">ExSk</span></div>
              </div>
              <div className="orderedItem">
                <div className="orderedItemBase">
                  <div className="orderedItemCategory">Subs</div>
                  <div className="orderedItemTitle">Chicken Teriyaki</div>
                  <div className="orderedItemLabel"><span className="label">footlong</span></div>
                </div>
              </div>
              <div className="orderedItem">
                <div className="orderedItemBase">
                  <div className="orderedItemCategory">Getränke</div>
                  <div className="orderedItemTitle">Coca-Cola</div>
                  <div className="orderedItemLabel"><span className="label">0,5l</span></div>
                </div>
              </div>
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
            <div className="orderNumber">
              Best.-Nr. <span>{pad(order.id, 8)}</span> (eingegangen am {timestampToDate(order.createdAt)} um {timestampToTime(order.createdAt)}) <span className="orderDetailsDueTime">{timestampToTime(order.dueAt)}</span>
            </div>
            <div className="icn i"></div>
            <div className="icn iMail"></div>
            
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
