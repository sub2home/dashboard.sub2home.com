var React = require('react');
var { timestampToTime, timestampToDate } = require('../../utils/date');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    order: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <div className="orderDetails"> 
        <div className="orderDetailsContent">
          <section className="orderDetailsHead">
            Best.-Nr. <span>{this.props.order.id}</span> (eingegangen um <span>{timestampToTime(this.props.order.createdAt)}</span> - {timestampToDate(this.props.order.createdAt)})
          </section>



          <section className="orderDetailsAbstract">



              <div className="ordererDetails">
                  <div className="ordererAddress">
                      <p>
                          An<br/>
                          <span>
                              {this.props.order.addressModel.firstName} {this.props.order.addressModel.lastName}<br/>
                              {this.props.order.addressModel.street} {this.props.order.addressModel.streetNumber} {this.props.order.addressModel.streetAdditional}<br/>
                              {this.props.order.addressModel.postal} {this.props.order.addressModel.city}<br/>
                          </span>
                      </p>

                      <p className="ordererDeliveryArea">
                          {this.props.order.addressModel.district}
                      </p>

                  </div>
                  <div className="ordererContact">
                      Tel: {this.props.order.addressModel.phone}<br/>
                      {this.props.order.addressModel.email}
                  </div>




              </div><div className="orderDeliveryDetails">
                  <div className="orderTimeQrCode">
                      Bis {timestampToTime(this.props.order.dueAt)}
                      <img className="orderQrCode" src="" alt=""/>
                  </div>
                  <div className="orderPaymentMethod">
                      Bezahlmethode: Bar
                  </div>
                  <div className="orderedArticlesListing">
                    <ol className="orderedArticlesList">
                      <li>
                        <header>
                            <h4>Familienmenü</h4>
                            <p>21.89 €</p>
                        </header>
                          <span className="cat">Subs</span> Chicken Teriyaki <span className="extra">DM</span> <span className="extra">ExBa</span> <span className="extra">ExSk</span>, <span className="cat">Subs</span> Veggie Patty <span className="extra">ExSk</span>, <span className="cat">Snacks</span> Double Chocolate Chip, <span className="cat">Snacks</span> Chocolate Chip, <span className="cat">Getränke</span> Coca Cola, <span className="cat">Getränke</span> Coca Cola
                      </li>
                    </ol>
                    <div className="overallSum">21.89 €</div>
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
