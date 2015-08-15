import "level";

contract Game {
  Level[] public levels;
  Level public current_level;
  uint8[160] public squares;
  uint8[1000] public monster_hp;
  uint8[1000] public monster_attack;
  uint8 public adventurer_attack;
  uint8 public adventurer_hp;

  function set_levels(Level[] _levels) {
    levels = _levels;
    load_level(0);
  }

  function set_adventurer(uint8 attack, uint8 hp) {
    adventurer_attack = attack;
    adventurer_hp = hp;
  }

  function load_level(uint8 id) {
    current_level = levels[id];

    uint num_walls = current_level.num_walls();
    for (uint8 i = 0; i < num_walls; i++) {
      squares[current_level.walls(i)] = 1;
    }

    uint num_staircases = current_level.num_staircases();
    for (i = 0; i < num_staircases; i++) {
      squares[current_level.staircases(i)] = 2;
    }

    uint num_monsters = current_level.num_monsters();
    for (i = 0; i < num_monsters; i++) {
      id = 100 + i;
      squares[current_level.monsters(i)] = id;
      monster_hp[id] = current_level.monster_hp(i);
      monster_attack[id] = current_level.monster_attack(i);
    }
  }
}
