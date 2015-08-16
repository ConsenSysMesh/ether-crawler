var ChooseLevels = React.createClass({
  getInitialState: function() {
    return {
      levels: ["none"],
      level_names: ["Loading..."],
      chosen_levels: [null,null,null,null]
    }
  },

  componentDidMount: function() {
    var registry = LevelRegistry.at(LevelRegistry.deployed_address);

    var levels = [];
    var level_names = [];
    var self = this;

    registry.get_all_levels.call().then(function(lvls) {
      levels = lvls;
      return registry.get_all_names.call();
    }).then(function(names) {
      level_names = names;
      for (var i = 0; i < level_names.length; i++) {
        level_names[i] = web3.toAscii(level_names[i]);
      }
      self.setState({
        levels: levels,
        level_names: level_names,
        chosen_levels: [levels[0], null, null, null]
      });
    }).catch(function(e) {
      alert("Error loading levels!");
      console.log(e);
    });
  },

  handleNext: function() {
    var chosen_levels = [];
    for (var i = 0; i < this.state.chosen_levels.length; i++) {
      var level = this.state.chosen_levels[i];
      if (level != null) {
        chosen_levels.push(level);
      }
    }

    this.props.next(chosen_levels);
  },

  handleSelectOne: function(event) {
    this.state.chosen_levels[0] = event.target.value;
    this.setState({
      chosen_levels: this.state.chosen_levels
    });
  },

  handleSelectTwo: function(event) {
    this.state.chosen_levels[1] = event.target.value;
    this.setState({
      chosen_levels: this.state.chosen_levels
    });
  },

  handleSelectThree: function(event) {
    this.state.chosen_levels[2] = event.target.value;
    this.setState({
      chosen_levels: this.state.chosen_levels
    });
  },

  handleSelectFour: function(event) {
    this.state.chosen_levels[3] = event.target.value;
    this.setState({
      chosen_levels: this.state.chosen_levels
    });
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
      options_and_none.push(<option value={self.state.levels[i]}>{self.state.level_names[i]}</option>);
    }

    return (
      <div className={"wizard-screen"}>
        <div className="title">2. Choose Levels</div>

        <h5 className="subtitle">Choose up to four levels to create a challenging game!</h5>
        <br/>

        <label>Level 1:</label><select ref="select_0" onChange={self.handleSelectOne}>
          {options}
        </select>
        <br/>
        <label>Level 2:</label><select ref="select_1" onChange={self.handleSelectTwo}>
          {options_and_none}
        </select>
        <br/>
        <label>Level 3:</label><select ref="select_2" onChange={self.handleSelectThree}>
          {options_and_none}
        </select>
        <br/>
        <label>Level 4:</label><select ref="select_3" onChange={self.handleSelectFour}>
          {options_and_none}
        </select>
        <br/>
        <br/>
        <button onClick={self.handleNext}>Next</button>
      </div>
    );
  }
});
