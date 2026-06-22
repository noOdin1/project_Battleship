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
  }
  receiveAttack() {}
}

export { Gameboard };
