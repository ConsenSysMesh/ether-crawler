var Modal = React.createClass({
  getInitialState: function() {
    return {
      chosenCharacter: null,
      showModal: true
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

  handleStartGameClick: function(event) {
    if (this.state.chosenCharacter == null) {
      this.setState({ errorMessage: 'Please choose a character.' });
      return;
    }
    this.setState({ showModal: false });
  },

  render: function() {
    var self = this;
    var nick_class = this.state.chosenCharacter === 'nick'? "active" : "";
    var vitalik_class = this.state.chosenCharacter === 'vitalik'? "active" : "";
    var satoshi_class = this.state.chosenCharacter === 'satoshi'? "active" : "";
    var hide_modal = this.state.showModal ? ' ' : 'hidden';
    
    return (
      <div className={"start-modal " + hide_modal}>
        <div className="start-title">Crawl the Ether with Us</div>
        <h5 className="start-subtitle">Travel thru worlds others have created</h5>
        <h5 className="start-subtitle">Discover treasure, fight monsters, seek your fortune on the blockchain</h5>
        <h4 className="start-choose-character">Choose Your Character:</h4>
        <p className="err">{self.state.errorMessage}</p>
        <ul className="characters">
          <li><div onClick={self.handleClick} ref="nick" className={"smallphoto nick " + nick_class}></div>Nick</li>
          <li><div onClick={self.handleClick} ref="vitalik" className={"smallphoto vitalik " + vitalik_class}></div>Vitalik</li>
          <li><div onClick={self.handleClick} ref="satoshi" className={"smallphoto satoshi " + satoshi_class}></div>Satoshi</li>
        </ul>
        <p className="start-paragraph">To move use <span className="bolder">ARROW KEYS</span></p>
        <h2 className="start-play blink_me" onClick={self.handleStartGameClick} >Click Here to Start Play</h2>
      </div>
    );
  }
});
