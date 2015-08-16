contract('LevelRegistry', function(accounts) {
  it("should let you add a level", function(done) {
    var lr = LevelRegistry.at(LevelRegistry.deployed_address);
    var level = Level.at(Level.deployed_address);

    lr.add_level(level.address, "Eat your face").
      then(function() { return lr.num_levels.call() }).
      then(function(result) { assert.equal(result, 1) }).
      then(function() { return lr.levels.call(0) }).
      then(function(result) {
        assert.equal(result, Level.deployed_address);
        done();
    }).catch(done);
  });

  it("should let you get all levels at once", function(done) {
    var lr = LevelRegistry.at(LevelRegistry.deployed_address);
    var level = Level.at(Level.deployed_address);

    lr.add_level(level.address, "Eat your face").
    then(function() { return lr.get_all_levels.call() }).
    then(function(result) {
      assert.isArray(result, [level.address, level.address]);
      done();
    }).catch(done)
  })
});
