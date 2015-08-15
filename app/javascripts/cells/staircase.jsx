var Staircase = React.createClass({
  mixins: [Cell],
  render: function() {
    var self = this;
    return (
      <div id={self.getCellId()} className="cell staircase" onClick={this.handleClick}>

      </div>
    );
  }
});
