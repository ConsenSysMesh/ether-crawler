import "Game";

contract Gamebuilder {
  function create_game(uint16 character, address player, Level[] levels) returns (Game) {
    Game game = new Game();
    game.set_player(player);

    for (uint i = 0; i < levels.length; i++) {
      game.add_level(levels[i]);
    }

    if (character == 0) {
      game.set_adventurer(15, 150);
    } else if (character == 1) {
      game.set_adventurer(45, 50);
    } else {
      game.set_adventurer(30, 100);
    }

    return game;
  }
}
