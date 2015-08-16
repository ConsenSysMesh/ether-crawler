import "Challenge";

contract ChallengeRegistry {
  Challenge[] public challenges;
  uint[] public num_levels;
  address[] public players;
  uint[] public bet_values;
  uint[] public best_offers;
  bool[] public accepted;

  function register() returns (uint id) {
    Challenge challenge = Challenge(msg.sender);
    id = challenges.length;

    challenges[challenges.length++] = challenge;
    num_levels[num_levels.length++] = challenge.num_levels();
    players[players.length++] = challenge.player();
    bet_values[bet_values.length++] = challenge.bet_value();
    accepted[accepted.length++] = false;
    best_offers[best_offers.length++] = 0;
  }

  function new_offer(uint id, uint amount) {
    best_offers[id] = amount;
  }

  function accept(uint id) {
    accepted[id] = true;
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

  function get_all_best_offers() returns(uint[]) {
    return best_offers;
  }

  function get_all_accepted() returns(bool[]) {
    return accepted;
  }
}
