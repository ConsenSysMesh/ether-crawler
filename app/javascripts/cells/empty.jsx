var Empty = React.createClass({
  mixins: [Cell],
  render: function() {
    var self = this;
    return (
      <div id={self.getCellId()} className="cell empty" onClick={this.handleClick}>

      </div>
    );
  }
});
