var Grid = React.createClass({
  gridWidth: function() {
    return 16;
  },
  gridHeight: function() {
    return 10;
  },

  cellClicked: function(x, y, event) {
    var cell_index = (y * this.gridWidth()) + x;
    var cell = this.state.grid[cell_index];
    this.props.cellClicked(cell, event);
  },
  getInitialState: function() {
    var grid_elements = [];
    var grid_location = 0;

    for (var y = 0; y < this.gridHeight(); y++) {
      for (var x = 0; x < this.gridWidth(); x++) {
        grid_elements.push({type: "empty", x: x, y: y, location: grid_location});
        grid_location += 1;
      }
    }

    return {
      grid: grid_elements
    };
  },

  convertIndexToXY: function(index) {
    if (index < 16) {
      return [0, index];
    } else {
      return [index % 16, index/16];
    }
  },

  render: function() {
    var self = this;
    var className = "grid";
    return (
      <div className={className}>
      {
        self.state.grid.map(function(cell) {
          var key = "cell_" + cell.x + "_" + cell.y;
          if (cell.type == "empty") {
            return <Empty key={key} cell={cell} handleClick={self.cellClicked}/>
          }

          if (cell.type == "monster") {
            return <Monster key={key} cell={cell} handleClick={self.cellClicked}/>
          }

          if (cell.type == "wall") {
            return <Wall key={key} cell={cell} handleClick={self.cellClicked}/>
          }

          if (cell.type == "staircase") {
            return <Staircase key={key} cell={cell} handleClick={self.cellClicked}/>
          }

          if (cell.type == "character") {
            return <Character key={key} cell={cell} handleClick={self.cellClicked}/>
          }
        })
      }
      </div>
    );
  }
});
