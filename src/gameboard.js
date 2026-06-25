/* gameboard.js */
import { createElement } from "./element_creator.js";
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
import { Tree } from "./binary_search_tree.js";
import { LinkedList } from "./linked_list.js";
import { buttonPressed } from "./interactions.js";
import { Ship } from "./ship.js";

const boardWidth = 10;

class Gameboard {
  constructor(parentHtml) {
    console.log("Initializing Gameboard class");
    this.p1bst = new Tree();
    this.p1Board = [];
    this.parentHtml = parentHtml;
  }

  buildBoards() {
    // constants defined for board vertical and horizontal
    //  squares
    const boardVSq = 10;
    const boardHSq = 10;

    const boardId = this.parentHtml.id.replace("Board", "");
    // create the board squares for player1 gameboard
    for (let i = 0; i < boardVSq * boardHSq; i++) {
      let boardsq1 = createButton(
        ["square_" + i.toString(), "boardSq", boardId],
        "sqId_" + boardId + "-" + i.toString(),
      );
      this.parentHtml.append(boardsq1);
      // create a linked list to store all info
      let tmpList = new LinkedList();
      tmpList.append(i);
      tmpList.append("none");
      tmpList.append(boardsq1);
      this.p1Board.push(tmpList);

      boardsq1.addEventListener("click", this.receiveAttack);
    }
    // We're using the 'alt' version as there is no need to
    // sort the arrays
    this.p1bst.buildTreeAlt(this.p1Board);
  }

  // function to test placement
  placeShip(ship) {
    let tmpPos = JSON.parse(JSON.stringify(ship.getPos()));
    let shipLength = tmpPos.length;
    const shipWidth = 2;
    let square = [];

    for (let i = 0; i < shipLength; i++) {
      console.log("coordinate: " + tmpPos[i]);
      let tmpArray = tmpPos[i];
      square.push(tmpArray[0] * boardWidth + tmpArray[1]);
    }
    console.dir(square);
    square.forEach((x) => {
      let tmpNode = this.p1bst.findAlt(x);
      tmpNode.val.changeValueAt(2, ship.getName());
    });
  }

  }

  get_node(value) {
    // Have to use the modifications made during "knight travails" project
    let tmpNode = this.p1bst.findAlt(parseInt(value, 10));
    return tmpNode;
  }

  // receiveAttack() function to record the 'attack'
  //  from the opposing side
  receiveAttack(event) {
    console.log("button [" + event.target.id + "] was pressed");
    let index = event.target.id.substring(event.target.id.indexOf("-") + 1);
    let tmpNode = this.get_node(index);
    console.log(
      "tmpNode head val: " +
        tmpNode.val.head().val +
        ", tmpNode string value: " +
        tmpNode.val.valueAt(2) +
        ", index: " +
        index,
    );
    let tmpBtn = document.getElementById(event.target.id);

    let tmpMarker = document.createElement("div");
    // if the move is a 'miss'
    if (tmpNode.val.valueAt(2) === "none") {
      tmpMarker.classList.add("marker");
      tmpMarker.classList.add("miss");
    }
    // if the move is a 'hit'
    else {
      tmpMarker.textContent = "X";
      tmpMarker.classList.add("marker");
      tmpMarker.classList.add("hit");
      // code to inform the ship class that it receives a 'hit'
    }

    tmpBtn.append(tmpMarker);
    tmpBtn.removeEventListener("click", this.receiveAttack);
  }
}

export { Gameboard };
