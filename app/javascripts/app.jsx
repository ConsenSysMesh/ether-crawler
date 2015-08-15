var App = React.createClass({

  getInitialState: function() {
    return {
      view: <Editor />,
      activeTab: "tab-editor"
    }
  },

  showEditorView: function() {
    this.setState( { view: <Editor />, activeTab: "tab-editor"});
  },

  showPlayView: function() {
    this.setState( { view: <Editor />, activeTab: "tab-play" });
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
        <div className="title">EtherCrawler</div>
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
  React.render(<App />, document.getElementById("app"));
}
