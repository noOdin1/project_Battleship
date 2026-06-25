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
      );
      this.parentHtml.append(boardsq1);
    }
    // We're using the 'alt' version as there is no need to
    // sort the arrays
    this.p1bst.buildTreeAlt(this.p1Board);
  }

  }

  }

  }

}

export { Gameboard };
