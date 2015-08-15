var Grid = React.createClass({
  render: function() {
    var width = 16;
    var height = 10;
    var grid_elements = [];
    var grid_number = 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        grid_elements.push({x: x, y: y, number: grid_number});
        grid_number += 1;
      }
    }

    var cell_type = Cell;
    var self = this;
    var className = "grid";
    return (
      <div className={className}>
      {
        grid_elements.map(function(cell) {
          return <Cell x={cell.x} y={cell.y} number={cell.number} handleClick={self.props.cellClicked}/>
        })
      }
      </div>
    );
  }
});
