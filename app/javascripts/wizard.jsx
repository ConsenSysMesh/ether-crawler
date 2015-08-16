var Wizard = React.createClass({
  getInitialState: function() {
    return {
      view: <ChooseCharacter next={this.handleCharacterChoice}/>,
      character: null
    }
  },
  handleCharacterChoice: function(character) {
    this.setState({
      character: character,
      view: <ChooseLevels next={this.handleCharacterChoice}/>
    });
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
