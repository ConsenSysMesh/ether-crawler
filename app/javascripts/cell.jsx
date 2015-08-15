var Cell = React.createClass({
  handleClick: function(event) {
    console.log(event.target.id);
    var id = event.target.id;
    var intermediate = id.replace("cell_", "");
    intermediate = intermediate.split("_");
    var x = intermediate[0];
    var y = intermediate[1];
    this.props.handleClick(x, y, event);
  },
  render: function() {
    var cell_id = "cell_" + this.props.x + "_" + this.props.y;

    return (
      <div id={cell_id} className="cell" onClick={this.handleClick}>

      </div>
    );
  }
});
