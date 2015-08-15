contract Level {
  uint8[] public staircases;
  uint8[] public walls;

  function add_staircase(uint8 location) {
    uint index = staircases.length;
    staircases.length++;
    staircases[index] = location;
  }

  function num_staircases() returns(uint) {
    return staircases.length;
  }

  function add_wall(uint8 location) {
    uint index = walls.length;
    walls.length++;
    walls[index] = location;
  }

  function num_walls() returns(uint) {
    return walls.length;
  }
}
