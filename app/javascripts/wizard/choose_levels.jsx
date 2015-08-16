var ChooseLevels = React.createClass({
  getInitialState: function() {
    return {
      levels: ["none"],
      level_names: ["Loading..."]
    }
  },

  componentDidMount: function() {
    var registry = LevelRegistry.at(LevelRegistry.deployed_address);

    var levels = [];
    var level_names = [];
    var self = this;

    registry.get_all_levels.call().then(function(lvls) {
      console.log(lvls);
      levels = lvls;
      return registry.get_all_names.call();
    }).then(function(names) {
      console.log(names);
      level_names = names;
      for (var i = 0; i < level_names.length; i++) {
        level_names[i] = web3.toAscii(level_names[i]);
      }
      self.setState({
        levels: levels,
        level_names: level_names
      });
    }).catch(function(e) {
      alert("Error loading levels!");
      console.log(e);
    });
  },

  handleNext: function() {
    this.props.next(this.state.chosenCharacter);
  },

  render: function() {
    var self = this;

    var options = [];
    var options_and_none = [];

    if (this.state.levels[0] == "none") {
      options_and_none.push(<option value="none">Loading...</option>);
    } else {
      options_and_none.push(<option value="none">None</option>);
    }

    for (var i = 0; i < self.state.levels.length; i++) {
      options.push(<option value={self.state.levels[i]}>{self.state.level_names[i]}</option>);
      options_and_none.push(<option>{self.state.level_names[i]}</option>);
    }

    return (
      <div className={"wizard-screen"}>
        <div className="title">2. Choose Levels</div>

        <h5 className="subtitle">Choose up to four levels to create a challenging game!</h5>
        <br/>

        <label>Level 1:</label><select ref="select_0">
          {options}
        </select>
        <br/>
        <label>Level 2:</label><select ref="select_1">
          {options_and_none}
        </select>
        <br/>
        <label>Level 3:</label><select ref="select_2">
          {options_and_none}
        </select>
        <br/>
        <label>Level 4:</label><select ref="select_3">
          {options_and_none}
        </select>
        <br/>
        <br/>
        <button onClick={self.handleNext}>Next</button>
      </div>
    );
  }
});
