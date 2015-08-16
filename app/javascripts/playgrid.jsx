var KEYS = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  spacebar: 32
};

var Playgrid = React.createClass({

  getInitialState: function() {
    return {
      focussed_cell: null,
      defense: 1000,
      attack: 1000,
      level: "Some Level Name",
      game: null,
      adventurer_hp: null,
      adventurer_attack: null,
      adventurer_level: null,
      turn_changing: true,
      modal: null
    };
  },
  getAttack: function() {
    return this.state.attack;
  },
  getDefense: function() {
    return this.state.defense;
  },
  getLevelName: function() {
    return this.state.level;
  },

  componentDidMount: function() {
    var address = prompt("Please enter your game address", "0x792de2f00f40319ec0eeff15291da431e45fc6cc");

    var self = this;
    var game = Game.at(address);

    this.setState({
      game: game,
      modal: <SimpleModal title="Loading level..." />
    }, function() {
      var self = this;
      this.reloadGrid().then(function() {
        return self.updateStats();
      }).then(function() {
        self.setState({
          turn_changing: false,
          modal: null
        });
      });
    });

    document.addEventListener('keydown', this.onKeyDown);
  },
  updateStats: function() {
    var self = this;
    return new Promise(function(resolve, reject) {
      var game = self.state.game;
      var adventurer_hp;
      var adventurer_attack;
      var adventurer_level;
      game.adventurer_hp.call().then(function(hp) {
        adventurer_hp = hp.toNumber();
        return game.adventurer_attack.call();
      }).then(function(attack) {
        adventurer_attack = attack.toNumber();
        return game.adventurer_level.call();
      }).then(function(level) {
        adventurer_level = level.toNumber();
        self.setState({
          adventurer_hp: adventurer_hp,
          adventurer_attack: adventurer_attack,
          adventurer_level: adventurer_level
        }, resolve);
      }).catch(reject);
    });
  },
  reloadGrid: function() {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.state.game.get_all_squares.call().then(function(squares) {
        var grid = [];

        for (var location = 0; location < squares.length; location++) {
          var type_id = squares[location].toNumber();
          var x = (location % 16);
          var y = parseInt(location / 16);
          var type = "empty";

          if (type_id == 1) {
            type = "wall";
          }

          if (type_id == 2) {
            type = "staircase";
          }

          if (type_id == 3) {
            type = "character";
          }

          if (type_id >= 100) {
            type = "monster";
          }

          grid.push({type: type, x: x, y: y, location: location});
        }

        self.refs.grid.setState({
          grid: grid
        }, resolve);
      }).catch(reject);
    });
  },

  componentWillUnmount: function() {
    document.removeEventListener('keydown', this.onKeyDown);
  },

  takeTurn: function(direction) {
    var self = this;
    var game = this.state.game;

    this.setState({
      turn_changing: true,
      modal: <SimpleModal title="Changing turns..." />
    });

    game.move(direction).then(function() {
      console.log("move done");
      return self.reloadGrid();
    }).then(function() {
      return self.updateStats();
    }).then(function() {
      self.setState({
        turn_changing: false,
        modal: false
      });
    }).catch(function(e) {
      alert("Error! Oh no!");
      console.log(e);
    });
  },

  checkOutOfBounds: function(val) {
    if (val < 0 || val > 160) {
      return true;
    } else {
      return false;
    }
  },

  onKeyDown: function(e) {
    if (this.state.turn_changing) {
      return;
    }

    switch(e.which) {
      case KEYS.left:
        this.takeTurn(0);
        break;

      case KEYS.right:
        this.takeTurn(1);
        break;

      case KEYS.up:
        this.takeTurn(2);
        break;

      case KEYS.down:
        this.takeTurn(3);
        break;
    }
  },

  render: function() {
    var self = this;
    return (
      <div className="playgrid">
        <div className="four columns">
          <dl className="your_score">
            <dt><strong>YOU (Vitalik)</strong><span className="num">{self.state.adventurer_hp}</span></dt>
            <dt>Attack: <span className="num">{self.state.adventurer_attack}</span></dt>
            <dt>Level: <span className="num">{self.state.adventurer_level}</span></dt>
          </dl>
        </div>
        <div className="four columns">

        </div>
        <div className="four columns right end">
          <p>LEVEL: <span className="levelname">{self.getLevelName()}</span></p>

          <button id="end_game" className="button-primary">End Game</button>
          <label for="end_game"><small>Give up?</small></label>
        </div>

        <div className="grid-container twelve columns" ref="grid_container">
          <Grid key="__editor" editor={false} cellClicked={this.cellClicked} ref="grid"/>
          {this.state.menu}
        </div>
        {this.state.modal}
      </div>
    );
  }
});
