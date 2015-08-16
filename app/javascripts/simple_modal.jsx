var SimpleModal = React.createClass({
  getInitialState: function() {
    return {
      top: null,
      left: null
    }
  },
  render: function() {
    var self = this;
    return (
      <div className="simple-modal">
        <h2>{self.props.title}</h2>
        {self.props.children}
      </div>
    );
  }
});
