contract Level {
  struct Object { uint16 location; uint16 object_type; }
  Object[] objects;
  uint16[] public monsters;
  uint16[] public monster_attack;
  uint16[] public monster_hp;
  uint public total_royalties;
  address public owner;
  bool public finalized;

  modifier mutates { if ((owner == msg.sender) && (finalized == false)) _ }

  function Level() {
    owner = msg.sender;
  }

  function set_owner(address _owner) {
    if (msg.sender == owner) {
      owner = _owner;
    }
  }

  function add_potion(uint16 location) mutates {
    objects[objects.length++] = Object(location, 4);
  }

  function add_shield(uint16 location) mutates {
    objects[objects.length++] = Object(location, 5);
  }

  function add_sword(uint16 location) mutates {
    objects[objects.length++] = Object(location, 6);
  }

  function add_staircase(uint16 location) mutates {
    objects[objects.length++] = Object(location, 2);
  }

  function add_wall(uint16 location) mutates {
    objects[objects.length++] = Object(location, 1);
  }

  function num_objects() returns(uint) {
    return objects.length;
  }

  function object_locations(uint id) returns(uint16) {
    return objects[id].location;
  }

  function object_types(uint id) returns(uint16) {
    return objects[id].object_type;
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
    monsters.length = 0;
    monster_attack.length = 0;
    monster_hp.length = 0;
    objects.length = 0;
  }

  function finalize() mutates {
    finalized = true;
  }
  
  function pay_royalty() {
    total_royalties += msg.value;
    owner.send(msg.value);
  }
}
