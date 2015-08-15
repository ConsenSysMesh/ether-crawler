import "level";

contract Game {
  Level[] public levels;
  Level public current_level;
  uint8[120] public squares;

  function set_levels(Level[] _levels) {
    levels = _levels;
    load_level(0);
  }

  function load_level(uint8 id) {
    current_level = levels[id];
    uint num_staircases = current_level.num_staircases();
    for (uint8 i = 0; i < num_staircases; i++) {
      squares[current_level.staircases(i)] = 1;
    }
  }
}
