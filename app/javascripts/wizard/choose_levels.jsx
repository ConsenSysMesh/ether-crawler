var ChooseLevels = React.createClass({
  getInitialState: function() {
    return {
      levels: []
    }
  },

  handleNext: function() {
    this.props.next(this.state.chosenCharacter);
  },

  render: function() {
    var self = this;

    return (
      <div className={"wizard-screen"}>
        <div className="title">2. Choose Levels</div>

        <button onClick={self.handleNext}>Next</button>
      </div>
    );
  }
});
