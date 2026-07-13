/* gameboard.js */
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

class Gameboard {
  // NOTE:
  // This is how you create a 'const' inside a class
  static get sqNumIndex() {
    return 0;
  }
  static get statusIndex() {
    return 1;
  }
  static get boardWidth() {
    return 10;
  }
  static get squareNumber() {
    return "sqNum";
  }
  static get shipId() {
    return "shipName";
  }
  static get shipStatus() {
    return "status";
  }
  static get shipDiv() {
    return "div";
  }

  constructor(playerId, parentHtml = undefined) {
    console.log("Initializing Gameboard class");
    this.bst = new Tree();
    this.board = [];
    this.playerId = playerId;
    if (parentHtml != undefined) {
      this.parentHtml = parentHtml;
    }

    // This requires a bit of attention, as 'this' with an event listener
    //  is bound to the html and not to this class. The following line will
    //   bind this.receiveAttack() to 'this' class.
    // src:
    //  Google'd solution - "javascript a callback used as event listener cannot access class variables"
    this.receiveAttack = this.receiveAttack.bind(this);
  }

  setParentHTML(parentHtml) {
    this.parentHtml = parentHtml;
  }

  createBoard() {
    let tmpArray = [];
    for (let i = 0; i < Gameboard.boardWidth ** 2; i++) {
      let boardsq = createDiv(
        ["square_" + i.toString(), "boardSq", this.playerId],
        "sqId_" + this.playerId + "-" + i.toString(),
      );
      tmpArray.push({
        sqNum: i,
        shipName: "none",
        status: "none",
        div: boardsq,
      });
      this.parentHtml.append(boardsq);
    }
    this.bst.buildTreeAlt(tmpArray);
  }

  place(ship) {
    ship.getBlocks().forEach((x) => {
      let tmpNode = this.node(x[Gameboard.sqNumIndex]);
      tmpNode.val[Gameboard.shipId] = ship.getName();
    });
  }

  getRootNode() {
    return this.bst.returnRoot();
  }

  node(value) {
    // Have to use the modifications made during "knight travails" project
    return this.bst.findAlt(parseInt(value, 10), Gameboard.squareNumber);
  }

  getParentHtml() {
    return this.parentHtml;
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
