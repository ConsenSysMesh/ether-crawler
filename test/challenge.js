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
      then(function() { return challenge.num_offers.call() }).
      then(function(result) { assert.equal(result, 1) }).
      then(function() { return challenge.offers.call(0) }).
      then(function(result) {
        assert.equal(result[0], accounts[0]);
        assert.equal(result[1], 2000);
        done();
    }).catch(done)
  });
});
