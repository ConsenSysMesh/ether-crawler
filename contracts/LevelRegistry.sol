contract LevelRegistry {
  address[] public levels;
  bytes32[] public level_names;

  function add_level(address level, bytes32 name) {
    levels[levels.length++] = level;
    level_names[level_names.length++] = name;
  }

  function num_levels() returns(uint) {
    return levels.length;
  }

  function get_all_levels() returns(address[]) {
    return levels;
  }

  function get_all_names() returns(bytes32[]) {
    return level_names;
  }
}
