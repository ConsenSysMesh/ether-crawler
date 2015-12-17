var WaitForChallenger = React.createClass({
  getInitialState: function() {
    return {
      challenger: null,
      interval: null,
      best_offer_address: null,
      best_offer_amount: null,
      show_waiting: false
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
    var self = this;
    if (this.state.best_offer_address == null) {
      console.log("hello");
      self.setState({ show_waiting: true });
      return;
    }
    self.setState({ show_waiting: false });
    this.props.next();
  },

  render: function() {
    var self = this;

    var offer = (
      <div>
      </div>
    );

    var waiting = (
      <p></p>
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

    if (this.state.show_waiting == true && this.state.best_offer_address == null) {
      waiting = (
        <p>Someone must wager against you for play to begin.<br/>
        To speed things up open EtherCrawler in a new tab,<br/>
        select &quot;Bet on Games&quot;, and enter a wager for the last game<br/>
        in the list. The come back here and click &quot;Start Play&quot; below.
        </p>
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
        {waiting}
        <br/>
        <button onClick={self.handleNext}>START PLAY!</button>
      </div>
    );
  }
});
