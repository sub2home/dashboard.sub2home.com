var React = require('react');

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
            Best.-Nr. <span>008978</span> (eingegangen um <span>20:24</span> - 10.01.2015)
          </section>



          <section className="orderDetailsAbstract">



              <div className="ordererDetails">
                  <div className="ordererAddress">
                      <p>
                          An<br/>
                          <span>
                              Marcus Harzenetter<br/>
                              Beim Samesbauer 4 <br/>
                              87700 Memmingen<br/>
                          </span>
                      </p>

                      <p className="ordererDeliveryArea">
                          Dickenreishausen
                      </p>

                  </div>
                  <div className="ordererContact">
                      Tel: 015164044539<br/>
                      random@mail.org
                  </div>




              </div><div className="orderDeliveryDetails">
                  <div className="orderTimeQrCode">
                      Bis 21:05
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
