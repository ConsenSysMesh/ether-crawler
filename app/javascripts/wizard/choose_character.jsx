var ChooseCharacter = React.createClass({
  getInitialState: function() {
    return {
      chosenCharacter: "nick"
    }
  },

  handleClick: function(event) {
    var element = event.target;
    if (element == this.refs.nick.getDOMNode()) {
      this.setState({ chosenCharacter: 'nick' });
    } else if (element == this.refs.vitalik.getDOMNode()) {
      this.setState({ chosenCharacter: 'vitalik' });
    } else if (element == this.refs.satoshi.getDOMNode()) {
      this.setState({ chosenCharacter: 'satoshi' });
    }
  },

  // handleStartGameClick: function(event) {
  //   if (this.state.chosenCharacter == null) {
  //     this.setState({ errorMessage: 'Please choose a character.' });
  //     return;
  //   }
  //   this.setState({ showModal: false });
  // },
  handleNext: function() {
    this.props.next(this.state.chosenCharacter);
  },

  render: function() {
    var self = this;
    var nick_class = this.state.chosenCharacter === 'nick'? "active" : "";
    var vitalik_class = this.state.chosenCharacter === 'vitalik'? "active" : "";
    var satoshi_class = this.state.chosenCharacter === 'satoshi'? "active" : "";

    return (
      <div className={"wizard-screen"}>
        <div className="title">1. Choose Your Character</div>
        <h5 className="subtitle">Travel through worlds others have created</h5>
        <h5 className="subtitle">Discover treasure, fight monsters, seek your fortune on the blockchain</h5>

        <p className="err">{self.state.errorMessage}</p>
        <ul className="characters">
          <li><div>Nick</div><div onClick={self.handleClick} ref="nick" className={"smallphoto nick " + nick_class}></div>Balanced</li>
          <li><div>Vitalik</div><div onClick={self.handleClick} ref="vitalik" className={"smallphoto vitalik " + vitalik_class}></div>Composed</li>
          <li><div>Satoshi</div><div onClick={self.handleClick} ref="satoshi" className={"smallphoto satoshi " + satoshi_class}></div>Aggressive</li>
        </ul>
        <button onClick={self.handleNext}>Next</button>
      </div>
    );
  }
});
