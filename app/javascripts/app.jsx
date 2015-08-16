var App = React.createClass({

  getInitialState: function() {
    return {
      view: <Wizard />,
      activeTab: "tab-play"
    }
  },

  showEditorView: function() {
    this.setState( { view: <Editor />, activeTab: "tab-editor"});
  },

  showWizard: function() {
    this.setState( { view: <Wizard />, activeTab: "tab-play" });
  },

  showPlayView: function() {
    this.setState( { view: <Playgrid />, activeTab: "tab-play" });
  },

  showBetView: function() {
    this.setState( { view: <Editor />, activeTab: "tab-bet" });
  },

  render: function() {
    var self=this;
    var activeEditorTab = this.state.activeTab==="tab-editor"? "active" : "";
    var activePlayTab = this.state.activeTab==="tab-play"? "active" : "";
    var activeBetTab = this.state.activeTab==="tab-bet"? "active" : "";
    return (
      <div className="app container">
        <div className="logo">EtherCrawler</div>
        <div className="tab-container">
          <div className={"tab " + activeEditorTab} onClick={self.showEditorView}>Design Game Levels</div>
          <div className={"tab " + activePlayTab} onClick={self.showPlayView}>Play a Game</div>
          <div className={"tab " + activeBetTab} onClick={self.showBetView}>Bet on Games</div>
        </div>
        {this.state.view}
      </div>
    );
  }
});
window.onload = function() {
  web3.eth.getCoinbase(function(error, coinbase) {
    if (error != null) {
      alert("Couldn't connect to your web3 provider. Is your client connected?");
    } else {
      // Set default value for transactions.
      Pudding.defaults({
        from: coinbase,
        gas: 3141592
      });
      React.render(<App />, document.getElementById("app"));
    }
  });
}
