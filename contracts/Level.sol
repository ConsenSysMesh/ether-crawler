contract Level {
  struct Location { uint8 x; uint8 y; }
  Location[] public staircases;

  function add_staircase(uint8 x, uint8 y) {
    uint index = staircases.length;
    staircases.length++;
    staircases[index] = Location(x, y);
  }

  function num_staircases() returns(uint) {
    return staircases.length;
  }
}
