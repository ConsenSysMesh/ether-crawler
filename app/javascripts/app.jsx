var App = React.createClass({

  getInitialState: function() {
    return {
      view: <Editor />
    }
  },

  render: function() {
    return (
      <div className="app container">
        <div className="tab-container">
          <div className="tab">Design Game Levels</div>
          <div className="tab">Play a Game</div>
          <div className="tab">Bet on Games</div>
        </div>
        {this.state.view}
      </div>
    );
  }
});
window.onload = function() {
  React.render(<App />, document.getElementById("app"));
}
