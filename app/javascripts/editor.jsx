var Editor = React.createClass({
  getInitialState: function() {
    return {
      menu: null
    };
  },
  cellClicked: function(x, y, event) {
    var element = event.target;
    var grid_container = this.refs.grid_container.getDOMNode();

    var choices = [
      {id: "choice_1", name: "Add Monster"},
      {id: "choice_2", name: "Add Wall"},
      {id: "choice_3", name: "Add Item"},
      {id: "choice_4", name: "Add Staircase"},
      {id: "choice_5", name: "Delete What's Here"},
    ];

    var elementRect = element.getBoundingClientRect();
    var containerRect = grid_container.getBoundingClientRect();

    var left = (elementRect.left + elementRect.width / 2) - containerRect.left;
    var top = (elementRect.top + elementRect.height / 2) - containerRect.top;

    this.setState({
      menu: <ContextMenu choices={choices} top={top} left={left} choiceClicked={this.menuItemClicked}/>
    });
  },
  menuItemClicked: function(id, event) {
    console.log("menu item clicked: " + id)
    this.setState({
      menu: null
    });
  },
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
        <div className="grid-container twelve columns" ref="grid_container">
          <Grid editor={true} cellClicked={this.cellClicked} ref="grid"/>
          {this.state.menu}
        </div>
      </div>
    );
  }
});
