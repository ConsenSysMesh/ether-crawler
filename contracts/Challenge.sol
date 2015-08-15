import "Game";

contract Challenge {
  address[] public levels;
  uint8 public character;
  uint public bet_value;
  address public player;
  struct Offer { address sender; uint value; }
  Offer public best_offer;
  bool public started;
  Game public game;

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
    if (started == true) { return; }
    if (msg.value > best_offer.value) {
      best_offer.sender.send(best_offer.value);
      best_offer = Offer(msg.sender, msg.value);
    }
  }

  function accept() {
    started = true;
    game = new Game();

    game.set_player(player);

    for (uint i = 0; i < levels.length; i++) {
      game.add_level(levels[i]);
    }

    if (character == 0) {
      game.set_adventurer(20, 100);
    } else {
      game.set_adventurer(40, 50);
    }
  }

  function claim() {
    if (game.over() == false) { return; }

    if (game.won() == true) {
      player.send(this.balance);
    } else {
      best_offer.sender.send(this.balance);
    }
  }
}
