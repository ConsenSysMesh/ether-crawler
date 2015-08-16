var Bet = React.createClass({
  getInitialState: function() {
    return {
      levelModal: null,
      valid_bet: null,
      showModal: true,
      bets: [
        {
          id: 1,
          game_id: '0xABCDEF0000',
          levels: 3,
          player_id: '0x123450000',
          player_stake: '20'
        }
      ]
    };
  },

  render: function() {
    var self = this;
    var hide_modal = this.state.showModal ? ' ' : 'hidden';
    var bet_key = 0;

    return (
      <div className="bet">
        <div className="twelve columns">
          <h5 className="tab-title">Games Awaiting Bets</h5>
        </div>
        <div className="bet_table_container twelve columns" ref="bet_table">
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Game ID</th>
                <th>Levels</th>
                <th>Player ID</th>
                <th>Player&apos;s Stake</th>
                <th>Your Ether Wager</th>
                <th>Place Your Bet</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.bets.map(function(bet) {
                  return <tr className="bet" key={bet_key}>
                    <td className="id">{ bet.id }</td>
                    <td className="game_id"  onClick={self.handleInfoClick}>{ bet.game_id }</td>
                    <td className="levels">{ bet.levels }</td>
                    <td className="player_id">{ bet.player_id }</td>
                    <td className="player_stake">{ bet.player_stake } ETH</td>
                    <td className="bet_input"><input type="number" min="0" className="u-full-width" /></td>
                    <td className="bet_button"><button className="button-primary" onClick={this.submitBet}>Challenge</button></td>
                  </tr>
                })
              }
            </tbody>
          </table>
          {this.state.levelModal}
        </div>
      </div>
    );
  }
});
