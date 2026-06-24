/* ship.js  */

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
