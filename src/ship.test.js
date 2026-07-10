/* ship.test.js */
import { Ship } from "./ship.js";

describe("Test for ship class", () => {
  let shipTest01;
  beforeEach(() => {});

  test("Constructor test, no arguments supplied", () => {
    shipTest01 = new Ship();
    expect(shipTest01.getName()).toEqual(undefined);
    expect(shipTest01.getBlocks()).toEqual(undefined);
  });

  test("Constructor test, only ship name supplied", () => {
    shipTest01 = new Ship("battleship01");
    expect(shipTest01.getName()).toEqual("battleship01");
    expect(shipTest01.getBlocks()).toEqual(undefined);
  });

  test("Constructor test, only ship coordinates supplied", () => {
    shipTest01 = new Ship();
    shipTest01.setBlocks([46]);
    expect(shipTest01.getName()).toEqual(undefined);
    expect(shipTest01.getBlocks()).toEqual([[46, "none"]]);
  });
  test("Constructor test, ship name and object of coordinates supplied [Error expected]", () => {
    expect(() => (shipTest01 = new Ship("battleship01", {}))).toThrow("Error");
  });
});
