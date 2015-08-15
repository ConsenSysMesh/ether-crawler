var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        Hello, world! I am an app.
      </div>
    );
  }
});
window.onload = function() {
  React.render(<App />, document.getElementById("app"));
}
