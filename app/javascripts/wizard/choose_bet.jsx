var ChooseBet = React.createClass({
  getInitialState: function() {
    return {
      bet: 1
    }
  },

  handleNext: function() {
    var bet = parseInt(this.state.bet);
    if (isNaN(bet)) {
      bet = 1;
    }
    this.props.next(bet);
  },

  handleChange: function(event) {
    this.setState({bet: event.target.value});
  },

  render: function() {
    var self = this;

    return (
      <div className={"wizard-screen"}>
        <div className="title">3. Choose Bet</div>

        <h5 className="subtitle">Place a bet that you'll win, and beat your challenger!</h5>
        <h5 className="subtitle">If you lose, your bet goes to the challenger.</h5>
        <br/>
        <label>Ether:</label><input type="text" value={self.state.bet} onChange={self.handleChange}></input>
        <br/>
        <br/>
        <button onClick={self.handleNext}>Next</button>
      </div>
    );
  }
});
