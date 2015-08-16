import "Challenge";

contract ChallengeRegistry {
  Challenge[] public challenges;
  uint[] public num_levels;
  address[] public players;
  uint[] public bet_values;

  function add_challenge(Challenge challenge) {
    challenges[challenges.length++] = challenge;
    num_levels[num_levels.length++] = challenge.num_levels();
    players[players.length++] = challenge.player();
    bet_values[bet_values.length++] = challenge.bet_value();
  }

  function num_challenges() returns(uint) {
    return challenges.length;
  }

  function get_all_challenges() returns(Challenge[]) {
    return challenges;
  }

  function get_all_num_levels() returns(uint[]) {
    return num_levels;
  }

  function get_all_players() returns(address[]) {
    return players;
  }

  function get_all_bet_values() returns(uint[]) {
    return bet_values;
  }
}
