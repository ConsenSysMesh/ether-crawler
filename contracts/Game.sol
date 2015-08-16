import "level";

contract Game {
  Level[] public levels;
  uint8 public level_number;
  uint8[160] public squares;
  uint8[1000] public monster_hp;
  uint8[1000] public monster_attack;
  uint8[1000] public monster_square;
  uint public num_monsters;
  uint8 public adventurer_attack;
  uint8 public adventurer_hp;
  uint8 public adventurer_level;
  uint8 public adventurer_square;
  bool public over;
  bool public won;
  address public player;
  address public admin;
  uint public verify;


  modifier auth(address user) { if (msg.sender == user) _ }

  function Game() {
    admin = msg.sender;
    verify = 42;
  }

  function get_all_squares() returns(uint8[160]) {
    return squares;
  }

  function add_level(address level) auth(admin) {
    levels[levels.length++] = Level(level);
    if (levels.length == 1) {
      load_level(0);
    }
  }

  function clear() auth(admin) {
    clear_level();
    delete levels;
    delete level_number;
    delete adventurer_attack;
    delete adventurer_hp;
    delete adventurer_level;
    delete adventurer_square;
    delete over;
    delete won;
  }

  function set_adventurer(uint8 attack, uint8 hp) auth(admin) {
    adventurer_attack = attack;
    adventurer_hp = hp;
    adventurer_level = 1;
  }

  function set_player(address _player) auth(admin) {
    player = _player;
  }

  function move(uint8 direction) auth(player) {
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

    move_monsters();
  }

  function move_to(uint8 target) private {
    uint target_object = squares[target];
    // empty
    if (target_object == 0) {
      squares[adventurer_square] = 0;
      squares[target] = 3;
      adventurer_square = target;
    }

    // staircase
    if (target_object == 2) {
      if (level_number + 1 == levels.length) {
        over = true;
        won = true;
      } else {
        load_level(level_number + 1);
      }
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

  function move_monsters() private {
    for (uint8 i = 0; i < num_monsters; i++) {
      if (monster_hp[100 + i] == 0) { return; }

      uint8 square = monster_square[100 + i];

      if (square > adventurer_square) { //adventurer is left or above
        if ((square / 16) == (adventurer_square / 16)) { //same row, aka to the left
          move_monster(100 + i, square - 1);
        } else { //above
          move_monster(100 + i, square - 16);
        }
      } else { //adventurer is right or below
        if ((square / 16) == (adventurer_square / 16)) { //same row, aka to the right
          move_monster(100 + i, square + 1);
        } else { //below
          move_monster(100 + i, square + 16);
        }
      }
    }
  }

  function move_monster(uint8 id, uint8 target) private {
    if (squares[target] == 0) {
      squares[monster_square[id]] = 0;
      squares[target] = id;
      monster_square[id] = target;
    }

    if (squares[target] == 3) {
      if (adventurer_hp <= monster_attack[id]) {
        adventurer_hp = 0;
        over = true;
      } else {
        adventurer_hp -= monster_attack[id];
      }
    }
  }

  function level_up() private {
    adventurer_level++;
    adventurer_attack += (adventurer_attack / 10);
    adventurer_hp += (adventurer_hp / 10);
  }

  function load_level(uint8 id) private {
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

    num_monsters = current_level.num_monsters();
    for (i = 0; i < num_monsters; i++) {
      id = 100 + i;
      uint8 square = current_level.monsters(i);
      squares[square] = id;
      monster_square[id] = square;
      monster_hp[id] = current_level.monster_hp(i);
      monster_attack[id] = current_level.monster_attack(i);
    }

    adventurer_square = 0;
    squares[0] = 3; // magic value for adventurer
  }

  function clear_level() private {
    delete squares;
    delete monster_hp;
    delete monster_attack;
    delete monster_square;
    delete num_monsters;
  }
}
