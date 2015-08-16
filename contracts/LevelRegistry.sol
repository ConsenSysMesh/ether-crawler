contract LevelRegistry {
  address[] public levels;
  string[] public level_names;

  function add_level(address level, string name) {
    levels[levels.length++] = level;
    level_names[level_names.length++] = name;
  }

  function num_levels() returns(uint) {
    return levels.length;
  }
}
