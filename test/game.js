contract('Game', function(accounts) {
  it("loads the first level", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.add_staircase(37).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.squares.call(37) }).
      then(function(result) {
        assert.equal(result, 1); // magic value for staircases
        done();
    }).catch(done)
  });
});
