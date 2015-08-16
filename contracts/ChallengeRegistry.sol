contract ChallengeStub {
  function player() returns(address) {}
  function bet_value() returns(uint) {}
}

contract ChallengeRegistry {
  ChallengeStub[] public challenges;
  uint[] public num_levels;
  address[] public players;
  uint[] public bet_values;
  uint[] public best_offers;
  bool[] public accepted;

  function register(address player, uint bet_value) returns (uint id) {
    ChallengeStub challenge = ChallengeStub(msg.sender);
    id = challenges.length;

    challenges[challenges.length++] = challenge;
    num_levels[num_levels.length++] = 0;
    players[players.length++] = player;
    bet_values[bet_values.length++] = bet_value;
    accepted[accepted.length++] = false;
    best_offers[best_offers.length++] = 0;

    return id;
  }

  function set_num_levels(uint id, uint num) {
    num_levels[id] = num;
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

  function get_all_challenges() returns(ChallengeStub[]) {
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
