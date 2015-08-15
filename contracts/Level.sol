contract Level {
  uint8[] public staircases;
  uint8[] public walls;
  uint8[] public monsters;
  uint8[] public monster_attack;
  uint8[] public monster_hp;

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

  function add_monster(uint8 location, uint8 attack, uint8 hp) {
    uint index = monsters.length;
    monsters.length++;
    monster_attack.length++;
    monster_hp.length++;
    monsters[index] = location;
    monster_attack[index] = attack;
    monster_hp[index] = hp;
  }

  function num_monsters() returns(uint) {
    return monsters.length;
  }

  function clear() {
    staircases.length = 0;
    walls.length = 0;
    monsters.length = 0;
    monster_attack.length = 0;
    monster_hp.length = 0;
  }
}
