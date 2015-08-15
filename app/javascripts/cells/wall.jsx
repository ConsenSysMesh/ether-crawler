var Wall = React.createClass({
  mixins: [Cell],
  render: function() {
    var self = this;
    return (
      <div id={self.getCellId()} className="cell wall" onClick={this.handleClick}>

      </div>
    );
  }
});
