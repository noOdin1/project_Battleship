/* ship.js  */

const shipDim = {
  battleship: 4,
  cruiser: 3,
  destroyer: 2,
  patrolBoat: 1,
};

const shipCount = { battleship: 1, cruiser: 2, destroyer: 3, patrolBoat: 4 };

class Ship {
  constructor(name = undefined, blocks = undefined) {
    this.name = name;
    if (blocks != undefined) {
      this.blocks = [];
      if (Array.isArray(blocks)) {
        blocks.forEach((x) => {
          this.blocks.push([parseInt(x, 10), "none"]);
        });
      } else {
        throw new Error("Error assigning square numbers to ship array");
      }
    }
  }

  setBlocks(arr) {
    if (Array.isArray(arr)) {
      this.blocks = arr.map((x) => [parseInt(x, 10), "none"]);
      return;
    }
    throw new Error(`Error setting ${this.name} blocks`);
  }

  getBlocks() {
    return this.blocks;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  hit(pos) {
    let found = false;
    this.blocks.forEach((x) => {
      if (pos === x[0]) {
        x[1] = "hit";
        found = true;
      }
    });
    return found;
  }

}

export { Ship };
