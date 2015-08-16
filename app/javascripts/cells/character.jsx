var Character = React.createClass({
  mixins: [Cell],
  render: function() {
    var self = this;
    return (
      <div id={self.getCellId()} className="cell character" onClick={this.handleClick}>

      </div>
    );
  }
});
