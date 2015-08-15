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
});
