var Wizard = React.createClass({
  getInitialState: function() {
    return {
      view: <ChooseCharacter next={this.handleCharacterChoice}/>,
      character: null,
      levels: [],
      modal: null,
      bet: 1
    }
  },
  handleCharacterChoice: function(character) {
    this.setState({
      character: character,
      view: <ChooseLevels next={this.handleLevelChoice}/>
    });
  },
  handleLevelChoice: function(levels) {
    this.setState({
      levels: levels,
      view: <ChooseBet next={this.handleBetChoice}/>
    });
  },
  handleBetChoice: function(bet) {
    this.setState({
      bet: bet,
      view: <CreatingChallenge next={this.handleChallengeCreated}/>
    });
  },
  handleChallengeCreated: function(challenge) {
    this.setState({
      challenge: challenge,
      view: <WaitForChallenger next={this.handleChallenger}/>
    });
  },
  handleChallenger: function() {

  },
  render: function() {
    var self = this;
    return (
      <div className="wizard">
        {self.state.view}
      </div>
    );
  }
});
