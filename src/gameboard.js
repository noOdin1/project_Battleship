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

  receiveAttack() {}
}

export { Gameboard };
