contract('Level', function(accounts) {
  it("should let you add a staircase", function(done) {
    var level = Level.at(Level.deployed_address);

    level.add_staircase(72).
      then(function() { return level.num_staircases.call() }).
      then(function(result) { assert.equal(result, 1) }).
      then(function() { return level.staircases.call(0) }).
      then(function(result) {
        assert.equal(result, 72);
        done();
    }).catch(done)
  });
});
