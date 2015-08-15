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
    console.log(grid_elements.length);

    console.log(grid_elements);
    return (
      <div className="grid">
      {
        grid_elements.map(function(cell) {
            return <Cell x={cell.x} y={cell.x} number={cell.number}/>
        })
      }
      </div>
    );
  }
});
