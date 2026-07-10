/* main.js - driver script to test the classes */
import { Ship } from "./src/ship.js";
import { argv } from "node:process";

const processArgs = (arr) => console.log("Args received: " + arr);
const testShips = (str, arr) => {
  return new Ship(str, arr);
};

(() => {
  processArgs(process.argv);

  let execFunction = process.argv[2];

  let arg2 = process.argv.splice(3, process.argv.length);
  console.log("arg2: " + arg2 + ", argv length: " + argv.length);

  // Executing process for 'ship'
  if (execFunction === "ship") {
    let tmpShip01 = testShips("battleship01");
    tmpShip01.setBlocks([45, 55, 65]);
    console.dir(tmpShip01);

    let tmpShip02 = testShips("battleship01", arg2);
    tmpShip02.hit(32);
    tmpShip02.hit(42);
    tmpShip02.hit(52);
    console.log("tmpShip has sunk: " + tmpShip02.isSunk());
  }
})();
