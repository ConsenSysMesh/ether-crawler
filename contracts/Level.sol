contract Level {
  uint16[] public staircases;
  uint16[] public walls;
  uint16[] public monsters;
  uint16[] public monster_attack;
  uint16[] public monster_hp;
  uint16[] public potions;
  uint public total_royalties;
  address public owner;
  bool public finalized;
  string public name;

  modifier mutates { if ((owner == msg.sender) && (finalized == false)) _ }

  function Level() {
    owner = msg.sender;
  }

  function set_owner(address _owner) {
    if (msg.sender == owner) {
      owner = _owner;
    }
  }

  function set_name(string _name) mutates {
    name = _name;
  }

  function add_potion(uint16 location) mutates {
    uint index = potions.length;
    potions.length++;
    potions[index] = location;
  }

  function set_potions(uint16[] _potions) mutates {
    potions = _potions;
  }

  function num_potions() returns(uint) {
    return potions.length;
  }

  function add_staircase(uint16 location) mutates {
    uint index = staircases.length;
    staircases.length++;
    staircases[index] = location;
  }

  function set_staircases(uint16[] _staircases) mutates {
    staircases = _staircases;
  }

  function num_staircases() returns(uint) {
    return staircases.length;
  }

  function add_wall(uint16 location) mutates {
    uint index = walls.length;
    walls.length++;
    walls[index] = location;
  }

  function set_walls(uint16[] _walls) mutates {
    walls = _walls;
  }

  function num_walls() returns(uint) {
    return walls.length;
  }

  function add_monster(uint16 location, uint16 attack, uint16 hp) mutates {
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

  function clear() mutates {
    staircases.length = 0;
    walls.length = 0;
    monsters.length = 0;
    monster_attack.length = 0;
    monster_hp.length = 0;
    potions.length = 0;
  }

  function finalize() mutates {
    finalized = true;
  }
  
  function pay_royalty() {
    total_royalties += msg.value;
    owner.send(msg.value);
  }
}
