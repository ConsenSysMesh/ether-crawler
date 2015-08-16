var ProgressBar = React.createClass({

  render: function() {
    var completed = this.props.completed;
    if (completed < 0) {completed = 0};
    if (completed > 100) {completed = 100};

    var style = {
      width: completed + '%',
      transition: "width 200ms",
    };

    return (
      <div className="progressbar-container" >
        <div className="progressbar-progress" style={style}></div>
      </div>
    );
  }
});
