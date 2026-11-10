/* index.js */
import "./style.css";
import { Player, shipDim, shipCount } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
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

const num2Array = x => [Math.floor(x / 10), (x % 10)];
const array2Num = arr => (10 * arr[1]) + arr[0];

// function gameRound() {
(() => { // Immediately Invoked Function Expression (IIFE)
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

  const draggables = document.querySelectorAll(".draggable");

  const mouseAction = (e) => {
    let x = document.getElementById("mouseX");
    let y = document.getElementById("mouseY");
    mouseX = e.pageX;
    mouseY = e.pageY;
    // console.log(`mouseX: ${mouseX}`);
    // console.log(`mouseY: ${mouseY}`);
    x.textContent = `mouse x: ${mouseX}`;
    y.textContent = `mouse y: ${mouseY}`;
  };

  window.addEventListener("mousemove", mouseAction);
  window.addEventListener("mousedown", mouseAction);
  window.addEventListener("mouseup", mouseAction);

  const boardSquares = document.querySelectorAll(".boardSq.player1");
  boardSquares.forEach((sq) => {
    sq.addEventListener("drop", (e) => {
      dropTarget = e.target.id;
    });
    sq.addEventListener("dragOver", (e) => {
      console.log("square id: " + e.target.id);
    });
    // function to handle touch screen devices. Users click on the ship and
    // then the square on the board where they want to place it.
    sq.addEventListener("click", (ev) => {
      let focusedShip = document.getElementsByClassName("currentClickFocus");
      if (!focusedShip.length == 0) {
        let shipOrient = focusedShip[0].classList.contains("row") ? "row" : "column";
        dragBlock = 0;
        let tmpRes = placeShip(focusedShip[0].id, ev.target.id.replace("sqId_player1-", ""), shipOrient);
        if (tmpRes !== undefined && player1.place(focusedShip[0].id, tmpRes)) {
          focusedShip[0].remove();
        }
      }
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

