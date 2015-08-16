import "Game";

contract Gamebuilder {
  function create_game() returns (Game) {
    Game game = new Game();
    return game;
  }
}
