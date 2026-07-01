/* index.js */
import "./style.css";
import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

// function gameRound() {
(() => {
  // board dimensions and mapping
  const boardWidth = 10;
  const boardHeight = 10;
  let p1gb = new Gameboard(document.getElementById("player1Board"));
  let p2gb = new Gameboard(document.getElementById("player2Board"));
  let player = new Player();

  function placement() {}

  function round() {}

  return { placement, round };
})();

