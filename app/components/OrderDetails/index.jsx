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
      var summaryListing = (
        <ol className="orderedArticlesList">
          {orderedItems.map(function(orderedItem) {
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
          })}
        </ol>
      );


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
                    {summaryListing}
                    <div className="overallSum">{order.total} €</div>
                  </div>
              </div>
          </section>
          <section className="orderDetailsItems">
            <div className="menuInOrder">
              <header>
                <h3><span className="amount">1x</span>Familienmenü</h3>
              </header>
              <div className="articleInOrder">
                <h3>
                  <span className="cat">Subs</span> Chicken Teriyaki (footlong)
                </h3>
                <div className="ingredientsInOrder">
                  <div>Brot <span>CO</span> </div>
                  <div>Käse <span>CC</span> </div>
                  <div>Gemüse <span>Sa</span> <span>Gu</span> </div>
                  <div>Extras <span>Toa</span> <span>DM</span> <span>ExBa</span> <span>ExSk</span> </div>
                  <div>Sauce <span>HM</span> </div>
                </div>
              </div>
              <div className="articleInOrder">
                <h3>
                  <span className="cat">Subs</span> Veggie Patty (footlong)
                </h3>
                <div className="ingredientsInOrder">
                  <div>Brot <span>CO</span> </div>
                  <div>Käse <span>CC</span> </div>
                  <div>Gemüse <span>Sa</span> <span>Gu</span> <span>Es</span> <span>Zw</span></div>
                  <div>Extras <span>Toa</span> <span>ExSk</span> </div>
                  <div>Sauce <span>SO</span> <span>HM</span> </div>
                </div>
              </div>
              <div className="articleInOrder">
                <h3><span className="cat">Snacks</span> Double Chocolate Chip</h3>
              </div>
              <div className="articleInOrder">
                <h3><span className="cat">Snacks</span> Chocolate Chip</h3>
              </div>
              <div className="articleInOrder">
                <h3><span className="cat">Getränke</span> Coca Cola (0.5l)</h3>
              </div>
              <div className="articleInOrder">
                <h3><span className="cat">Getränke</span> Coca Cola (0.5l)</h3>
              </div>
            </div>    
          </section>
        </div>
      </div>
    );
  },

});
