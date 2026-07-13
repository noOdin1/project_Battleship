/* player.js */
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

const shipDim = {
  battleship: 4,
  cruiser: 3,
  destroyer: 2,
  patrolBoat: 1,
};

const shipCount = { battleship: 1, cruiser: 2, destroyer: 3, patrolBoat: 4 };

class Player {
  constructor() {
    console.log("Initializing Player class");
  }
}

export { Player, shipDim, shipCount };
