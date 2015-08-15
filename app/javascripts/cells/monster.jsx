var Monster = React.createClass({
  mixins: [Cell],
  render: function() {
    var self = this;
    return (
      <div id={self.getCellId()} className="cell monster" onClick={this.handleClick}>

      </div>
    );
  }
});
