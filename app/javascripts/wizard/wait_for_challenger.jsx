var WaitForChallenger = React.createClass({
  getInitialState: function() {
    return {
      challenger: null,
      interval: null,
      best_offer_address: null,
      best_offer_amount: null
    }
  },

  componentDidMount: function() {
    var self = this;
    var challenge = this.props.challenge;

    var interval = null;
    interval = setInterval(function() {
      challenge.best_offer.call().then(function(offer) {
        if (web3.toDecimal(offer[0]) != 0) {
          self.setState({
            best_offer_address: offer[0],
            best_offer_amount: offer[1].toNumber()
          });
        }
      });
    }, 2000);
    this.setState({
      interval: interval
    });
  },

  handleNext: function() {
    if (this.state.best_offer_address == null) {
      return;
    }
    this.props.next();
  },

  render: function() {
    var self = this;

    var offer = (
      <div>
      </div>
    );

    if (this.state.best_offer_address != null) {
      offer = (
        <div>
          Offer: {web3.fromWei(self.state.best_offer_amount, "ether")}
          <br/>
          From: {self.state.best_offer_address}
        </div>
      );
    }

    return (
      <div className={"wizard-screen"}>
        <div className="title">4. Waiting for Challenger!</div>

        <h5 className="subtitle">Game created. Wait for someone to challenge you!</h5>
        <h5 className="subtitle">They'll show up here when you have a challenger.</h5>
        <br/>

        {offer}

        <br/>
        <br/>
        <button onClick={self.handleNext}>Next</button>
      </div>
    );
  }
});
