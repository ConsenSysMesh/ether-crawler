var Cell = React.createClass({
  render: function() {
    var cell_id = "cell_" + this.props.x + "_" + this.props.y;

    return (
      <div id={cell_id} className="cell" >
        {this.props.number}
      </div>
    );
  }
});
