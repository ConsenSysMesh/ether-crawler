contract Level {
  uint8[] public staircases;

  function add_staircase(uint8 location) {
    uint index = staircases.length;
    staircases.length++;
    staircases[index] = location;
  }

  function num_staircases() returns(uint) {
    return staircases.length;
  }
}
