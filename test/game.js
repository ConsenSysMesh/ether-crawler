contract('Game', function(accounts) {
  it("loads the first level", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.add_staircase(37).
      then(function() { return level.add_wall(22) }).
      then(function() { return level.add_monster(25, 0, 0) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.squares.call(22) }).
      then(function(result) { assert.equal(result, 1) }). // 1 is magic value for walls
      then(function() { return game.squares.call(25) }).
      then(function(result) { assert.equal(result, 100) }). // monster ids start at 100
      then(function() { return game.squares.call(37) }).
      then(function(result) {
        assert.equal(result, 2); // magic value for staircases
        done();
    }).catch(done)
  });

  it("stores extra information about monsters", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return level.add_monster(37, 80, 40) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.squares.call(37) }).
      then(function(result) { assert.equal(result, 100) }). // monster ids start at 100
      then(function() { return game.monster_hp.call(100) }).
      then(function(result) { assert.equal(result, 40) }).
      then(function() { return game.monster_attack.call(100) }).
      then(function(result) {
        assert.equal(result, 80);
        done();
    }).catch(done)
  });

  it("stores information about adventurer", function(done) {
    var game = Game.at(Game.deployed_address);

    game.set_adventurer(100, 50).
      then(function() { return game.adventurer_hp.call() }).
      then(function(result) { assert.equal(result, 50) }).
      then(function() { return game.adventurer_attack.call() }).
      then(function(result) {
        assert.equal(result, 100);
        done();
      }).catch(done)
  });

  it("starts the adventurer in the upper left corner", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    game.set_levels([level.address]).
      then(function() { return game.adventurer_square.call() }).
      then(function(result) {
        assert.equal(result, 0);
        done();
    }).catch(done);
  })

  it("lets adventurer move to an empty adjacent square", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.move(3) }).
      then(function() { return game.squares.call(16) }).
      then(function(result) { assert.equal(result, 3) }). // magic value for adventurer
      then(function() { return game.adventurer_square.call() }).
      then(function(result) {
        assert.equal(result, 16);
        done();
    }).catch(done)
  });

  it("doesn't let adventurer move onto walls", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return level.add_wall(1) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.move(1) }).
      then(function() { return game.adventurer_square.call() }).
      then(function(result) {
        assert.equal(result, 0);
        done();
    }).catch(done)
  })

  it("doesn't let adventurer move off the edge of the world", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.move(0) }).
      then(function() { return game.adventurer_square.call() }).
      then(function(result) {
        assert.equal(result, 0);
        done();
    }).catch(done)
  });

  it("sends adventurer to the next level if they enter a staircase", function(done) {
    var level_1 = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level_1.clear().
    then(Level.new).
    then(function (level_2) {
      level_1.add_staircase(16).
      then(function() { return level_2.add_wall(42) }).
      then(function() { return game.set_levels([level_1.address, level_2.address]) }).
      then(function() { return game.move(3) }).
      then(function() { return game.squares.call(16) }).
      then(function(result) { assert.equal(result, 0) }).
      then(function() { return game.squares.call(42) }).
      then(function(result) {
        assert.equal(result, 1);
        done();
      }).catch(done);
    }).catch(done);
  });

  it("attacks monster if adventurer tries to move onto it", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return level.add_monster(1, 50, 100) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.set_adventurer(20, 50) }).
      then(function() { return game.move(1) }).
      then(function() { return game.adventurer_square.call() }).
      then(function(result) { assert.equal(result, 0) }).
      then(function() { return game.monster_hp(100) }).
      then(function(result) {
        assert.equal(result, 80);
        done();
    }).catch(done)
  });

  it("kills monster when it drops below 0hp", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return level.add_monster(16, 50, 10) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.set_adventurer(20, 50) }).
      then(function() { return game.move(3) }).
      then(function() { return game.adventurer_square.call() }).
      then(function(result) { assert.equal(result, 0) }).
      then(function() { return game.squares.call(16) }).
      then(function(result) { assert.equal(result, 0) }).
      then(function() { return game.monster_hp.call(100) }).
      then(function(result) {
        assert.equal(result, 0);
        done();
    }).catch(done)
  });

  it("levels adventurer up when they kill monster", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return level.add_monster(16, 50, 10) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.set_adventurer(20, 50) }).
      then(function() { return game.move(3) }).
      then(function() { return game.adventurer_level.call() }).
      then(function(result) { assert.equal(result, 2) }).
      then(function() { return game.adventurer_attack.call() }).
      then(function(result) { assert.equal(result, 22) }).
      then(function() { return game.adventurer_hp.call() }).
      then(function(result) {
        assert.equal(result, 55);
        done();
    }).catch(done)
  });

  it("moves monsters when player moves", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return level.add_monster(18, 50, 10) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.move(1) }).
      then(function() { return game.monster_square.call(100) }).
      then(function(result) {assert.equal(result, 2) }).
      then(function() { return game.squares.call(16) }).
      then(function(result) { assert.equal(result, 0) }).
      then(function() { return game.squares.call(2) }).
      then(function(result) {
        assert.equal(result, 100);
        done();
    }).catch(done)
  })

  it("attacks when player is adjacent", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return level.add_monster(17, 10, 50) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.set_adventurer(20, 50) }).
      then(function() { return game.move(1) }).
      then(function() { return game.monster_square.call(100) }).
      then(function(result) { assert.equal(result, 17) }).
      then(function() { return game.adventurer_hp.call() }).
      then(function(result) {
        assert.equal(result, 40);
        done();
    }).catch(done)
  })

  it("ends game if player goes to 0hp", function(done) {
    var level = Level.at(Level.deployed_address);
    var game = Game.at(Game.deployed_address);

    level.clear().
      then(function() { return level.add_monster(2, 10, 50) }).
      then(function() { return game.set_levels([level.address]) }).
      then(function() { return game.set_adventurer(20, 5) }).
      then(function() { return game.move(1) }).
      then(function() { return game.over.call() }).
      then(function(result) { assert.equal(result, true) }).
      then(function() { return game.adventurer_hp.call() }).
      then(function(result) {
        assert.equal(result, 0);
        done();
    }).catch(done)
  })
});
