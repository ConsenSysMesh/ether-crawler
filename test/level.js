contract('Level', function(accounts) {
  it("should let you add a staircase", function(done) {
    var level = Level.at(Level.deployed_address);

    level.add_staircase(4, 5).
      then(function() { return level.num_staircases.call() }).
      then(function(result) { assert.equal(result, 1) }).
      then(function() { return level.staircases.call(0) }).
      then(function(result) {
        assert.equal(result[0], 4);
        assert.equal(result[1], 5);
        done();
    }).catch(done)
  });
});
