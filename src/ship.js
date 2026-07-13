/* ship.js  */

const sqNum = 0;
const status = 1;

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
      if (pos === x[sqNum]) {
        x[status] = "hit";
        found = true;
      }
    });
    return found;
  }

  isSunk() {
    let sunk = true;
    this.blocks.forEach((x) => {
      if (x[status] === "none") {
        sunk = false;
      }
    });
    return sunk;
  }
}

export { Ship };
