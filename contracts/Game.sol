import "Level";

contract Game {
  Level[] public levels;
  uint16 public level_number;
  uint16[160] public squares;
  uint16[1000] public monster_hp;
  uint16[1000] public monster_attack;
  uint16[1000] public monster_square;
  uint public num_monsters;
  uint16 public adventurer_attack;
  uint16 public adventurer_hp;
  uint16 public adventurer_level;
  uint16 public adventurer_square;
  bool public over;
  bool public won;
  address public player;
  address public admin;
  uint public verify;
  uint16 public equipped_item;

  modifier auth(address user) { if (msg.sender == user) _ }

  function Game() {
    admin = msg.sender;
    verify = 42;
  }

  function get_all_squares() returns(uint16[160]) {
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

  function set_adventurer(uint16 attack, uint16 hp) auth(admin) {
    adventurer_attack = attack;
    adventurer_hp = hp;
    adventurer_level = 1;
  }

  function set_player(address _player) auth(admin) {
    player = _player;
  }

  function move(uint16 direction) auth(player) {
    if (direction == 0 && ((adventurer_square % 16) != 0)) {
      uint16 target = adventurer_square - 1;
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

  function move_to(uint16 target) private {
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

    // potion
    if (target_object == 4) {
      adventurer_hp += 30;
      squares[adventurer_square] = 0;
      squares[target] = 3;
      adventurer_square = target;
    }

    // shield
    if (target_object == 5) {
      equipped_item = 5;
      squares[adventurer_square] = 0;
      squares[target] = 3;
      adventurer_square = target;
    }

    // monster
    if (target_object > 99) {
      uint16 damage = random_damage(adventurer_attack);
      if (monster_hp[target_object] <= damage) {
        monster_hp[target_object] = 0;
        squares[target] = 0;
        level_up();
      } else {
        monster_hp[target_object] -= damage;
      }
    }
  }

  function move_monsters() private {
    for (uint16 i = 0; i < num_monsters; i++) {
      if (monster_hp[100 + i] == 0) { return; }

      uint16 square = monster_square[100 + i];
      
      uint16 lr_loc;
      uint16 ud_loc;

      if (square % 16 > adventurer_square % 16) { //adventurer is to the left
        lr_loc = square - 1;
      } else {
        lr_loc = square + 1;
      }

      if (square > adventurer_square && square > 16) { //adventurer is above
        ud_loc = square - 16;
      } else {
        ud_loc = square + 16;
      }

      if (square % 16 == adventurer_square % 16) { //same column
        move_monster(100 + i, ud_loc);
      } else if (square / 16 == adventurer_square / 16) { //same row
        move_monster(100 + i, lr_loc);
      } else if ((uint(block.blockhash(block.number - 1)) % 2) == 0) {
        move_monster(100 + i, lr_loc);
      } else {
        move_monster(100 + i, ud_loc);
      }
    }
  }

  function move_monster(uint16 id, uint16 target) private {
    if (squares[target] == 0) {
      squares[monster_square[id]] = 0;
      squares[target] = id;
      monster_square[id] = target;
    }

    if (squares[target] == 3) {
      uint16 damage = random_damage(monster_attack[id]);
      if (equipped_item == 5) {
        damage -= (damage * 25 / 100); //protected by shield
      }
      
      if (adventurer_hp <= damage) {
        adventurer_hp = 0;
        over = true;
      } else {
        adventurer_hp -= damage;
      }
    }
  }

  function random_damage(uint attack) private returns(uint16) {
    uint base = attack * 8 / 10;  
    uint bonus_percent = uint(block.blockhash(block.number - 1)) % 42;
    uint result = base + (attack * bonus_percent / 100);

    return uint16(result);
  }

  function level_up() private {
    adventurer_level++;
    adventurer_attack += (adventurer_attack / 10);
    adventurer_hp += (adventurer_hp / 10);
  }

  function load_level(uint16 id) private {
    clear_level();

    level_number = id;
    Level current_level = levels[id];

    uint num_walls = current_level.num_walls();
    for (uint16 i = 0; i < num_walls; i++) {
      squares[current_level.walls(i)] = 1;
    }

    uint num_staircases = current_level.num_staircases();
    for (i = 0; i < num_staircases; i++) {
      squares[current_level.staircases(i)] = 2;
    }

    uint num_potions = current_level.num_potions();
    for (i = 0; i < num_potions; i++) {
      squares[current_level.potions(i)] = 4;
    }

    uint num_shields = current_level.num_shields();
    for (i = 0; i < num_shields; i++) {
      squares[current_level.shields(i)] = 5;
    }

    num_monsters = current_level.num_monsters();
    for (i = 0; i < num_monsters; i++) {
      id = 100 + i;
      uint16 square = current_level.monsters(i);
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
