var Shield = React.createClass({
  mixins: [Cell],
  render: function() {
    var self = this;
    return (
      <div id={self.getCellId()} className="cell shield" onClick={this.handleClick}>

      </div>
    );
  }
});
