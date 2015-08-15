var Editor = React.createClass({
  render: function() {
    return (
      <div className="editor">
        <div className="one columns">
          Steps:
        </div>
        <div className="five columns">
          <ol>
            <li>Create a level (click on squares below)</li>
            <li>Submit your level for others to play</li>
            <li>Earn Ether</li>
          </ol>
        </div>
        <div className="six columns right">
          <label for="level_name">Level Name:</label><input id="level_name" type="text" />
          <br/>
          <label for="submit_level">Finished designing?</label><button id="submit_level">Submit Level</button>
        </div>
        <div className="twelve columns">
          <Grid editor={true} />
        </div>
      </div>
    );
  }
});
