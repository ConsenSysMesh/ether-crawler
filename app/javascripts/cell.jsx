var Cell = {
  getCellId: function() {
    var cell_id = "cell_" + this.props.cell.x + "_" + this.props.cell.y;
    return cell_id;
  },
  handleClick: function(event) {
    var id = event.target.id;
    var intermediate = id.replace("cell_", "");
    intermediate = intermediate.split("_");
    var x = parseInt(intermediate[0]);
    var y = parseInt(intermediate[1]);
    this.props.handleClick(x, y, event);
  }
};
