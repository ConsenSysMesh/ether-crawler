var PlayOutcomeModal = React.createClass({
  playAgain: function() {
    // TODO
  },
  render: function() {
    var self = this;
    var blinking_outcome_class = self.props.playerWon ? "blink_me win" : "lose";
    var outcome_class = self.props.playerWon ? "win" : "lose";
    var outcome_title = self.props.playerWon ? "You Win!" : "You Are Dead.";
    var ether = self.props.ether;

    return (
      <div className="play-outcome-modal">
        <h2 className={"title " + blinking_outcome_class}>{outcome_title}</h2>
        <p className="bet_outcome">{ether} ETHER <span className={"ether " + outcome_class}></span> <span className={"tofrom " + outcome_class}></span> your challenger.</p>
        <div className={"outcome_image " + outcome_class}></div>
        <button className="button-primary play_again" onClick={this.playAgain}>Play Again</button>
      </div>
    );
  }
});
