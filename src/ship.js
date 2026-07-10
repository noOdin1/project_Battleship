/* ship.js  */

const shipDim = {
  battleship: 4,
  cruiser: 3,
  destroyer: 2,
  patrolBoat: 1,
};

const shipCount = { battleship: 1, cruiser: 2, destroyer: 3, patrolBoat: 4 };

class Ship {
  constructor(pos, name) {
    console.log("Initializing Ship class");
    this.pos = JSON.parse(JSON.stringify(pos));
    this.name = name;
  }

  getPos() {
    return this.pos;
  }

  getName() {
    return this.name;
  }

  hit() {}
  isSunk() {}
}

export { Ship };
