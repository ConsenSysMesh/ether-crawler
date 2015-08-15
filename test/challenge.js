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
    var challenge = Challenge.at(Challenge.deployed_address);

    challenge.make_offer({value: 2000}).
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
  })

  it("doesn't blow up when you claim", function(done) {
    var challenge = Challenge.at(Challenge.deployed_address);

    challenge.make_offer({value: 2000}).
      then(function() { return challenge.accept() }).
      then(function() { return challenge.claim() }).
      then(function() { done() }).catch(done)
  });
});
