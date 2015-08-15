var ContextMenu = React.createClass({
  handleClick: function(id, event) {
    //this.props.onChoice()
    console.log(id, event);
  },
  render: function() {
    var self = this;
    return (
      <div style={{top: self.props.top, left: self.props.left}} className="context-menu">
      {
        this.props.choices.map(function(choice) {
          return <div className="choice" onClick={self.props.choiceClicked.bind(null, choice.id)}>{choice.name}</div>
        })
      }
      </div>
    );
  }
});
