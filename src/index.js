/* index.js */
import "./style.css";
import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship, shipDim, shipCount } from "./ship.js";
import {
  createP,
  createA,
  createDiv,
  createButton,
  createImg,
  createForm,
  createFieldset,
  createLegend,
  createLabel,
  createInput,
  createSelect,
  createOption,
  htmlOps,
} from "./element_creator.js";

const num2Array = (x) => {
  x = Number(x);
  let row = Math.floor(x / 10);
  let col = x % 10;
  return [row, col];
};
const array2Num = (arr) => {
  let rows = arr[0];
  let cols = arr[1];
  return 10 * rows + cols;
};

// function gameRound() {
(() => {
  // board dimensions and mapping
  const boardWidth = 10;
  const boardHeight = 10;
  let p1gb = new Gameboard(document.getElementById("player1Board"));
  let p2gb = new Gameboard(document.getElementById("player2Board"));
  let player = new Player();

  let box = p1gb.get_parentHtml().getBoundingClientRect();
  let p1gbLeft = box.left;
  let p1gbTop = box.top;
  let p1gbBottom = box.bottom;
  let p1gbRight = box.right;

  function placement() {}

  function round() {}

  return { placement, round };
})();

