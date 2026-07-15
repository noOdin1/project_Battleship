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
  constructor(playerName, parentHtml) {
    // Player identifier
    this.playerName = playerName;

    // create the ship fleet for this player
    this.ships = [];
    Object.keys(shipDim).forEach((x) => {
      for (let i = 1; i <= shipCount[x]; i++) {
        let tmpShip = new Ship(`${x}0${i}`);
        this.ships.push(tmpShip);
      }
    });

    // gameboard creation
    this.gameboard = new Gameboard(playerName, parentHtml);
    this.gameboard.createBoard();
  }

  place(shipName, arrayBlocks) {
    let shipFound = false;

    this.ships.forEach((x) => {
      if (x["name"] == shipName) {
        // console.log(
        //   `shipName: ${shipName}, arrayBlocks: ${JSON.stringify(arrayBlocks)}, x: ${x["name"]},
        //    ships: ${JSON.stringify(this.ships)}, blocks: ${JSON.stringify(x["blocks"])}`,
        // );
        x.setBlocks(arrayBlocks);
        shipFound = true;
        arrayBlocks.forEach((y) => {
          let tmpNode = this.gameboard.node(y);
          tmpNode.val[Gameboard.shipId] = x["name"];
          tmpNode.val[Gameboard.shipDiv].classList.add(x["name"]);
        });
      }
    });

    return shipFound;
  }

  setParentHtml(parentHtml) {
    this.gameboard.setParentHTML(parentHtml);
  }

  getParentHtml() {
    return this.gameboard.getParentHtml();
  }

  getGameboard() {
    return this.gameboard;
  }

  getShips() {
    return this.ships;
  }
}

export { Player, shipDim, shipCount };
