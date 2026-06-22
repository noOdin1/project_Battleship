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
import { buttonPressed } from "./interactions.js";

class Gameboard {
  constructor() {
    console.log("Initializing Gameboard class");
    this.p1bst = new Tree();
    this.p2bst = new Tree();
    this.p1Board = [];
    this.p2Board = [];
  }

  buildBoards() {
    // constants defined for board vertical and horizontal
    //  squares
    const boardVSq = 10;
    const boardHSq = 10;
    // create the board squares for player1 gameboard
    for (let i = 0; i < boardVSq * boardHSq; i++) {
      let boardsq1 = createButton(
        ["square_" + i.toString(), "boardSq", "player1"],
        "sqId_player1_" + i.toString(),
      );
      let boardsq2 = createButton(
        ["square_" + i.toString(), "boardSq", "player2"],
        "sqId_player2_" + i.toString(),
      );
  }

  print_p1Board() {
    console.dir(this.p1Board);
  }

  print_p1bst() {
    console.dir(this.p1bst.returnRoot());
  }

  print_p2Board() {
    console.dir(this.p2Board);
  }

  receiveAttack() {}
}

export { Gameboard };
