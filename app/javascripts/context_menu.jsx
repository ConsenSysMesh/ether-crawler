var ContextMenu = React.createClass({
  handleClick: function(event) {
    //this.props.onChoice()
    console.log(event);
  },
  render: function() {
    return (
      <div className="context-menu">
      {
        this.props.items.map(function(name) {
          return <div className="item" onClick={this.handleClick}>{item}</div>
        })
      }
      </div>
    );
  }
});
