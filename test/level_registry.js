contract('LevelRegistry', function(accounts) {
  it("should let you add a level", function(done) {
    var lr = LevelRegistry.at(LevelRegistry.deployed_address);

    lr.add_level(Level.deployed_address).
      then(lr.num_levels.call).
      then(function(result) { assert.equal(result, 1) }).
      then(function() { return lr.levels.call(0) }).
      then(function(result) {
        assert.equal(result, Level.deployed_address);
        done();
    }).catch(done);
  });
});
