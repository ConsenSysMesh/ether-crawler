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

  it("should let you set the name", function(done) {
    var level = Level.at(Level.deployed_address);

    level.set_name("DEATH AND DOOM").
      then(function() { return level.name.call() }).
      then(function(result) {
        assert.equal(result, "DEATH AND DOOM");
        done();
    }).catch(done)
  });

  it("should let you pass arrays of walls", function(done) {
    var level = Level.at(Level.deployed_address);

    level.set_walls([1,2,44]).
      then(function() { return level.walls.call(2) }).
      then(function(result) {
        assert.equal(result, 44);
        done();
    }).catch(done)
  })
});
