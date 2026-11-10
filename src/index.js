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

  // Adding EventListeners to each boardSq of player1
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
    tmpX = Math.floor(e.offsetX / 24) + 1;
    tmpY = Math.floor(e.offsetY / 24) + 1;
    xCoor.textContent = "x block: " + tmpX;
    yCoor.textContent = "y block: " + tmpY;
    dragBlock = e.target.getAttribute("class").includes("row") ? tmpX : tmpY;
    dragBlock -= 1;

    dragItemDim = e.target.getBoundingClientRect();
  };

  const validatePlacing = (arr) => {
    let collision = false;

    if (placementTurn === "player1") {
      let tmpGameboard = player1.getGameboard();
      arr.forEach((x) => {
        let tmpNode = tmpGameboard.node(x);
        Object.keys(shipDim).forEach((x) => {
          let classList = tmpNode.val[Gameboard.shipDiv].classList.value;
          if (classList.includes(x) || classList.includes("invalid")) {
            console.log(`This square is occupied`);
            collision = true;
          }
        });
      });
    }
    return collision;
  };

  const markInvalidArea = (arr) => {
    let leftBorder = false;
    let rightBorder = false;
    let topBorder = false;
    let bottomBorder = false;

    let invalidArea = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 10 == 0) {
        leftBorder = true;
      }
      if (arr[i] % 10 == 9) {
        rightBorder = true;
      }
      if (arr[i] >= 0 && arr[i] <= 9) {
        topBorder = true;
      }
      if (arr[i] >= 90 && arr[i] <= 99) {
        bottomBorder = true;
      }
      console.log(`Line 139 - i: ${i}, arr[i]: ${arr[i]}`);
      let [y, x] = num2Array(arr[i]);

      // for square not near any borders
      invalidArea = [[x - 1, y], [x - 1, y - 1], [x - 1, y + 1],
      [x, y - 1], [x, y], [x, y + 1],
      [x + 1, y], [x + 1, y - 1], [x + 1, y + 1]];
      if (leftBorder) {
        invalidArea = [[x, y - 1], [x, y], [x, y + 1],
        [x + 1, y], [x + 1, y - 1], [x + 1, y + 1]];
      }
      if (rightBorder) {
        invalidArea = [[x - 1, y], [x - 1, y - 1], [x - 1, y + 1],
        [x, y - 1], [x, y], [x, y + 1]];
      }

      if (topBorder) {
        invalidArea = [[x - 1, y], [x - 1, y + 1],
        [x, y], [x, y + 1],
        [x + 1, y], [x + 1, y + 1]];
      }
      if (bottomBorder) {
        invalidArea = [[x - 1, y], [x - 1, y - 1],
        [x, y - 1], [x, y],
        [x + 1, y], [x + 1, y - 1]];
      }
      if (leftBorder && topBorder) {
        invalidArea = [[x, y], [x, y + 1],
        [x + 1, y], [x + 1, y + 1]];
      }
      if (leftBorder && bottomBorder) {
        invalidArea = [[x, y - 1], [x, y],
        [x + 1, y], [x + 1, y - 1]];
      }
      if (rightBorder && topBorder) {
        invalidArea = [[x - 1, y], [x - 1, y + 1],
        [x, y], [x, y + 1]];
      }
      if (rightBorder && bottomBorder) {
        invalidArea = [[x - 1, y], [x - 1, y - 1],
        [x, y - 1], [x, y]];
      }
      for (let j = 0; j < invalidArea.length; j++) {
        let tmpSq = array2Num(invalidArea[j]);
        let tmpElement = document.getElementById("sqId_player1-" + tmpSq);
        if (!tmpElement.classList.contains("invalid")) {
          tmpElement.classList.add("invalid");
        }
      }
    }
  }

  const placeShip = (shipId, sqNum, orientation) => {
    sqNum = parseInt(sqNum, 10);
    if (
      shipId.includes("battleship") ||
      shipId.includes("cruiser") ||
      shipId.includes("destroyer") ||
      shipId.includes("patrolBoat")
    ) {
      let shipLen = shipDim[shipId.replace(/..$/, "")];
      let [nthBlockTop, nthBlockLeft] = num2Array(sqNum);
      let altSqNum;
      let invertedDragBlock;

      // console.log(
      //   `placing ${shipId}, dim: ${shipDim[shipId.replace(/..$/, "")]}, sqNum: ${sqNum}, dragBlock: ${dragBlock}, altSqNum: ${altSqNum}, shipLen: ${shipLen}, nthBlockTop: ${nthBlockTop}, nthBlockLeft: ${nthBlockLeft}, invertedDragBlock: ${invertedDragBlock}`,
      // );
      let tmpRes = Array.from(
        { length: shipDim[shipId.replace(/..$/, "")] },
        (element, index) => index,
      )
        .map((x) => {
          return orientation === "column"
            ? 10 * (x - dragBlock)
            : x - dragBlock;
        })
        .map((x) => sqNum + x);

      let overflowBlocks = 0;
      let [row, col] = num2Array(sqNum);

      tmpRes.forEach((x, idx) => {
        let [tgtrow, tgtcol] = num2Array(x);
        if (orientation === "row") {
          if (row != tgtrow) {
            overflowBlocks++;
          }
        }
        if (orientation === "column") {
          if (x > 100 || x < 0) {
            overflowBlocks++;
          }
        }
      });
      let shiftedArray;
      if (overflowBlocks != 0) {
        if (orientation === "row") {
          if (col < 4) {
            shiftedArray = Array.from(
              { length: shipDim[shipId.replace(/..$/, "")] },
              (_, i) => i + row * 10,
            );
          }
          if (col > 7) {
            shiftedArray = Array.from(
              { length: shipDim[shipId.replace(/..$/, "")] },
              (_, i) => 9 - i + row * 10,
            );
          }
        }
        if (orientation === "column") {
          if (row < 3) {
            shiftedArray = Array.from(
              { length: shipDim[shipId.replace(/..$/, "")] },
              (_, i) => i * 10 + col,
            );
          }
          if (row > 6) {
            shiftedArray = Array.from(
              { length: shipDim[shipId.replace(/..$/, "")] },
              (_, i) => (9 - i) * 10 + col,
            );
          }
        }
      }
      if (shiftedArray != undefined) {
        tmpRes = JSON.parse(JSON.stringify(shiftedArray.sort()));
      }
      if (validatePlacing(tmpRes)) {
        console.log("Invalid coordinate");
        tmpRes = undefined;
      }
      // mark 1 square around the ship as invalid placement area
      if (tmpRes != undefined) {
        markInvalidArea(tmpRes);
      }
      // console.dir(tmpRes);

      return tmpRes;
    }
  };

  const dragEnded = (e) => {
    let board = document.getElementById("player1Board");
    // let xCoor = document.getElementById("mouseX");
    // let yCoor = document.getElementById("mouseY");
    // let x = xCoor.textContent.replace("mouse x:", "");
    // let y = yCoor.textContent.replace("mouse y:", "");
    let x = document
      .getElementById("mouseX")
      .textContent.replace("mouse x:", "");
    let y = document
      .getElementById("mouseY")
      .textContent.replace("mouse y:", "");

    let orientation = e.target.getAttribute("class").includes("row")
      ? "row"
      : "column";

    // let dragBlock = document
    //   .getElementById("yCoor")
    //   .textContent.replace("y block: ", "");
    let dragBlock = tmpY;

    console.log(
      `mouseX: ${mouseX}, mouseY: ${mouseY}, x: ${x}, y: ${y}, offsetX: ${offsetX}, offsetY: ${offsetY}`,
    );

    if (p1gbTop < y && p1gbBottom > y && p1gbLeft < x && p1gbRight > x) {
      // if (
      //   p1gbTop < mouseY &&
      //   p1gbBottom > mouseY &&
      //   p1gbLeft < mouseX &&
      //   p1gbRight > mouseX
      // ) {
      let targetSq = document.getElementById(dropTarget);
      let tmpStr = dropTarget.replace("sqId_player1-", "");

      // let tmpArray = player1.placeShip(
      let tmpArray = placeShip(e.target.id, tmpStr, orientation, dragBlock);

      if (tmpArray !== undefined && player1.place(e.target.id, tmpArray)) {
        e.target.remove();
        isDragging = false;
        e.target.classList.remove("dragging");
      }

      // check if the footer div is empty or not
      let footerUpperDiv = document.getElementById("footerUpper");
      let footerLowerDiv = document.getElementById("footerLower");
      // console.dir(footerUpperDiv.children);
      if (footerUpperDiv.children.length === 0) {
        console.log("footer Upper Div has no more children");
      }
      if (footerLowerDiv.children === 0) {
        console.log("footer Lower Div has no more children");
      }
    }
    // isDragging = false;
    // e.target.classList.remove("dragging");
  };

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStarted);

    draggable.addEventListener("dragend", dragEnded);
  });

  document.body.addEventListener("dragover", (e) => {
    e.preventDefault();
    let x = document.getElementById("mouseX");
    let y = document.getElementById("mouseY");
    x.textContent = "mouse x: " + `${e.pageX}`;
    y.textContent = "mouse y: " + `${e.pageY}`;
  });

  // The click on each ship will change it's orientation. But I need to 
  // add another functionality. 
  // NOTE: 
  // The functionality will be to mark the ship for placement. Once marked
  // and the user clicks on the board square, that will be the placement for
  // the ship. This is necessary to handle touch screen devices. 
  const changeOrientation = (e) => {
    // NOTE: 
    // tmpElements will point to the html element that has the 'currentClickFocus'
    // class. 
    let tmpElements = document.getElementsByClassName("currentClickFocus");
    if (tmpElements.length == 0) {
      // NOTE:
      // This will initiate the first element to have 'currentClickFocus' class 
      // name
      e.target.parentElement.classList.add("currentClickFocus");
    } else {
      // currently clicked ship
      const clickedItemParentHTML = e.target.parentElement;
      // previously clicked ship
      const prevItemParentHTML = tmpElements[0];

      if (clickedItemParentHTML.id == prevItemParentHTML.id) {
        clickedItemParentHTML.classList.toggle("row");
      } else {
        prevItemParentHTML.classList.remove("currentClickFocus");
        clickedItemParentHTML.classList.add("currentClickFocus");
      }
    }
  };

  return { placement, round };
})();

