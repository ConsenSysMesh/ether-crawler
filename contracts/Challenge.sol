contract Challenge {
  address[] public levels;
  uint8 public character;
  uint public bet_value;
  address public player;
  struct Offer { address sender; uint value; }
  Offer public best_offer;

  function Challenge(uint8 _character, address[] _levels) {
    character = _character;
    levels = _levels;
    bet_value = msg.value;
    player = msg.sender;
  }

  function num_levels() returns(uint) {
    return levels.length;
  }

  function make_offer() {
    if (msg.value > best_offer.value) {
      best_offer.sender.send(best_offer.value);
      best_offer = Offer(msg.sender, msg.value);
    }
  }
}
