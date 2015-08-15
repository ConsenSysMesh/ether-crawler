import "level";

contract Game {
  Level[] public levels;
  uint8 public level_number;
  uint8[160] public squares;
  uint8[1000] public monster_hp;
  uint8[1000] public monster_attack;
  uint8 public adventurer_attack;
  uint8 public adventurer_hp;
  uint8 public adventurer_level;
  uint8 public adventurer_square;

  function set_levels(Level[] _levels) {
    levels = _levels;
    load_level(0);
  }

  function set_adventurer(uint8 attack, uint8 hp) {
    adventurer_attack = attack;
    adventurer_hp = hp;
    adventurer_level = 1;
  }

  function move(uint8 direction) {
    if (direction == 0 && ((adventurer_square % 16) != 0)) {
      uint8 target = adventurer_square - 1;
      move_to(target);
    }

    if (direction == 1 && ((adventurer_square % 16) != 15)) {
      target = adventurer_square + 1;
      move_to(target);
    }

    if (direction == 2 && adventurer_square > 15) {
      target = adventurer_square - 16;
      move_to(target);
    }

    if (direction == 3 && adventurer_square < 144) {
      target = adventurer_square + 16;
      move_to(target);
    }
  }

  function move_to(uint8 target) {
    uint target_object = squares[target];
    // empty
    if (target_object == 0) {
      squares[adventurer_square] = 0;
      squares[target] = 3;
      adventurer_square = target;
    }

    // staircase
    if (target_object == 2) {
      load_level(level_number + 1);
    }

    // monster
    if (target_object > 99) {
      if (monster_hp[target_object] <= adventurer_attack) {
        monster_hp[target_object] = 0;
        squares[target] = 0;
        level_up();
      } else {
        monster_hp[target_object] -= adventurer_attack;
      }
    }
  }

  function level_up() {
    adventurer_level++;
    adventurer_attack += (adventurer_attack / 10);
    adventurer_hp += (adventurer_hp / 10);
  }

  function load_level(uint8 id) {
    clear_level();

    level_number = id;
    Level current_level = levels[id];

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

    adventurer_square = 0;
    squares[0] = 3; // magic value for adventurer
  }

  function clear_level() {
    delete squares;
    delete monster_hp;
    delete monster_attack;
  }
}
