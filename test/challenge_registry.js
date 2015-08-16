contract('ChallengeRegistry', function(accounts) {
  it("should let you add a challenge", function(done) {
    var cr = ChallengeRegistry.at(ChallengeRegistry.deployed_address);
    var level = Level.at(Level.deployed_address);

    Challenge.new(1, [Level.deployed_address], {value: 1000}).
      then(function(challenge) {
        cr.add_challenge(challenge.address).
        then(function() { return cr.num_challenges.call() }).
        then(function(result) { assert.equal(result, 1) }).
        then(function() { return cr.get_all_players.call() }).
        then(function(result) { assert.isArray(result, [accounts[0]]) }).
        then(function() { return cr.get_all_num_levels.call() }).
        then(function(result) { assert.isArray(result, [1]) }).
        then(function() { return cr.get_all_bet_values.call() }).
        then(function(result) { assert.isArray(result, [1000]) }).
        then(function() { return cr.get_all_challenges.call() }).
        then(function(result) {
          assert.isArray(result, [challenge.address]);
          done();
      }).catch(done);
    }).catch(done);
  });
});
