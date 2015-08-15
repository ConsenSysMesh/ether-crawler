contract Challenge {
  address[] public levels;
  uint8 public character;
  uint public bet_value;
  address public player;

  function Challenge(uint8 _character, address[] _levels) {
    character = _character;
    levels = _levels;
    bet_value = msg.value;
    player = msg.sender;
  }

  function num_levels() returns(uint) {
    return levels.length;
  }
}
