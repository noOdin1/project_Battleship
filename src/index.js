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

  let player1Ships = [];

  p1gb.buildBoards();
  p2gb.buildBoards();

  let offsetX = 0;
  let offsetY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let isDragging = false;
  let dropTarget;
  let dragItemDim;
  let dragBlock; /* This represent the block that the cursor clicked on */
  function placement() {}
  const boardSquares = document.querySelectorAll(".boardSq.player1");
  boardSquares.forEach((sq) => {
    sq.addEventListener("drop", (e) => {
      dropTarget = e.target.id;
    });
    sq.addEventListener("dragOver", (e) => {
      console.log("square id: " + e.target.id);
    });
  });

  const dragStarted = (e) => {
    isDragging = true;
    e.target.classList.add("dragging");
    // offsetX = e.clientX - e.target.offsetLeft;
    // offsetY = e.clientY - e.target.offsetTop;
    const rect = e.target.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    // NOTE:
    //  event (or in this case 'e') with it's offset represents
    //  the cursor's location when it is clicked within this
    //  element, wrt top left corner
    let tmpX = Math.floor(e.offsetX / 24) + 1;
    let tmpY = Math.floor(e.offsetY / 24) + 1;
    xCoor.textContent = "x block: " + tmpX;
    yCoor.textContent = "y block: " + tmpY;
    dragBlock = e.target.getAttribute("class").includes("row") ? tmpX : tmpY;
    dragBlock -= 1;

    dragItemDim = e.target.getBoundingClientRect();
  };

  function round() {}

  return { placement, round };
})();

