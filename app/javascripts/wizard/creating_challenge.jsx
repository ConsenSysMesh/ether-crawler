var CreatingChallenge = React.createClass({
  componentDidMount: function() {
    // if (this.state.challenger == null) {
    //   return;
    // }
    // this.props.next(this.state.challenger);
    var self = this;
    setTimeout(function() {
      self.props.next("0x...");
    }, 3000);
  },
  render: function() {
    var self = this;

    return (
      <div className={"wizard-screen"}>
        <div className="title">Creating Challenge...</div>

        <h5 className="subtitle">Building your game. Adding monsters. Injecting scariness.</h5>
        <br/>
      </div>
    );
  }
});
