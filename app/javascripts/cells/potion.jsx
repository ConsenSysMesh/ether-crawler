var Potion = React.createClass({
  mixins: [Cell],
  render: function() {
    var self = this;
    return (
      <div id={self.getCellId()} className="cell potion" onClick={this.handleClick}>

      </div>
    );
  }
});
