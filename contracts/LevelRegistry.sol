contract LevelRegistry {
  address[] public levels;

  function add_level(address level) {
    levels[levels.length++] = level;
  }

  function num_levels() returns(uint) {
    return levels.length;
  }
}
