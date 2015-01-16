var _ = require('lodash');
var React = require('react');
var { ListenerMixin } = require('reflux');
var actions = require('../../actions');
var { timestampToTime, timestampToDate } = require('../../utils/date');

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
    console.log(order);
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
            <span>
              <span className="cat">{article.categoryModel.title}</span> {article.title}
              {paidIngredients.map(i => <span className="extra">{i.shortcut}</span>)}
            </span>
          );
        });
        var menu = orderedItem.menuBundleModel || orderedItem.menuUpgradeModel;
        var amount = orderedItem.amount > 1 ? <span class="amount">{orderedItem.amount}x</span> : '';
        var h4String = menu ? menu.title : articles;
        var menuString = menu ? articles : '';
        return (
          <li>
            <header>
                <h4>
                  {amount}
                  {h4String}
                </h4>
                <p>{orderedItem.total} €</p>
            </header>
            {menuString}
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
          var amount = menu ? '' : <span className="amount">{orderedItem.amount}x</span>;
          return (
            <div className="articleInOrder">
              <h3>
                {amount}
                <span className="cat">{article.categoryModel.title}</span> {article.title} {info}
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
                <h3><span className="amount">{orderedItem.amount}x</span>{menu.title}</h3>
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
      ec: 'EC Karte',
    };
    var paymentMethod = paymentMethods[order.paymentMethod];

    return (
      <div className="orderDetails"> 
        <div className="orderDetailsContent">
          <section className="orderDetailsHead">
            Best.-Nr. <span>{order.id}</span> (eingegangen um <span>{timestampToTime(order.createdAt)}</span> - {timestampToDate(order.createdAt)})
          </section>
          <section className="orderDetailsAbstract">
              <div className="ordererDetails">
                  <div className="ordererAddress">
                      <p>
                          An<br/>
                          <span>
                              {address.firstName} {address.lastName}<br/>
                              {address.street} {address.streetNumber} {address.streetAdditional}<br/>
                              {address.postal} {address.city}<br/>
                          </span>
                      </p>
                      <p className="ordererDeliveryArea">
                          {address.district}
                      </p>
                  </div>
                  <div className="ordererContact">
                      Tel: {address.phone}<br/>
                      {address.email}
                  </div>
              </div><div className="orderDeliveryDetails">
                  <div className="orderTimeQrCode">
                      Bis {timestampToTime(order.dueAt)}
                      <img className="orderQrCode" src="" alt=""/>
                  </div>
                  <div className="orderPaymentMethod">
                      Bezahlmethode: {paymentMethod}
                  </div>
                  <div className="orderedArticlesListing">
                    <ol className="orderedArticlesList">
                    {summaryListing}
                    </ol>
                    <div className="overallSum">{order.total} €</div>
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
