var WaitForChallenger = React.createClass({
  getInitialState: function() {
    return {
      challenger: null
    }
  },

  handleNext: function() {
    if (this.state.challenger == null) {
      return;
    }
    this.props.next(this.state.challenger);
  },

  handleChange: function(event) {
    this.setState({bet: event.target.value});
  },

  render: function() {
    var self = this;

    return (
      <div className={"wizard-screen"}>
        <div className="title">4. Waiting for Challenger!</div>

        <h5 className="subtitle">Game created. Wait for someone to challenge you!</h5>
        <h5 className="subtitle">They'll show up here when you have a challenger.</h5>
        <br/>

        <br/>
        <br/>
        <button onClick={self.handleNext}>Next</button>
      </div>
    );
  }
});
