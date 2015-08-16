contract('Challenge', function(accounts) {
  it("expects character, levels, and bet", function(done) {
    Challenge.new(1, [Level.deployed_address], {value: 1000}).
      then(function(challenge) {
        challenge.bet_value.call().
        then(function(result) { assert.equal(result, 1000) }).
        then(function() { return challenge.num_levels.call() }).
        then(function(result) { assert.equal(result, 1) }).
        then(function() { return challenge.character.call() }).
        then(function(result) {
          assert.equal(result, 1);
          done()
        }).catch(done)
    }).catch(done)
  });

  it("lets you make an offer", function(done) {
    var challenge = Challenge.at(Challenge.deployed_address);

    challenge.make_offer({value: 2000}).
      then(function() { return challenge.make_offer({value: 3000}) }).
      then(function() { return challenge.best_offer.call() }).
      then(function(result) {
        assert.equal(result[0], accounts[0]);
        assert.equal(result[1], 3000);
        done();
    }).catch(done)
  });

  it("lets player accept an offer, and initializes a game", function(done) {
    var gamebuilder = Gamebuilder.at(Gamebuilder.deployed_address);

    Challenge.new(1, [Level.deployed_address], {value: 1000}).
      then(function(challenge) {
        challenge.make_offer({value: 2000}).
        then(function() { return challenge.set_gamebuilder(gamebuilder.address) }).
        then(function() { return challenge.accept() }).
        then(function() { return challenge.game.call() }).
        then(function(result) {
          var game = Game.at(result);
          game.player.call().
            then(function(result) {
              assert.equal(result, accounts[0]);
              done();
          }).catch(done)
      }).catch(done)
    }).catch(done)
  })

  it("doesn't blow up when you claim", function(done) {
    var challenge = Challenge.at(Challenge.deployed_address);

    Challenge.new(1, [Level.deployed_address], {value: 1000}).
      then(function(challenge) {
        challenge.make_offer({value: 2000}).
        then(function() { return challenge.accept() }).
        then(function() { return challenge.claim() }).
        then(function() { done() }).catch(done)
      }).catch(done)
    });

  it("pays out royalties to levels", function(done) {
    var level = Level.at(Level.deployed_address);
    var gamebuilder = Gamebuilder.at(Gamebuilder.deployed_address);

    level.clear().
    then(function() { return level.add_monster(2, 200, 50) }).
    then(function() { return Challenge.new(1, [level.address], {value: 5000}) }).
    then(function(challenge) {
      challenge.make_offer({value: 5000}).
      then(function() { return challenge.set_gamebuilder(gamebuilder.address) }).
      then(function() { return challenge.accept() }).
      then(function() { return challenge.game.call() }).
      then(function(result) {
        var game = Game.at(result);

        game.move(1).
        then(function() { return game.over.call() }).
        then(function(result) { assert.equal(result, true) }).
        then(function() { return challenge.claim() }).
        then(function() { return level.total_royalties.call() }).
        then(function(result) {
          assert.equal(result, 1000);
          done();
        }).catch(done)
      }).catch(done)
    }).catch(done)
  })
});
