var Sword = React.createClass({
  mixins: [Cell],
  render: function() {
    var self = this;
    return (
      <div id={self.getCellId()} className="cell sword" onClick={this.handleClick}>

      </div>
    );
  }
});
