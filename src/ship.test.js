/* ship.test.js */
import { Ship } from "./ship.js";

describe("Test for ship class", () => {
  let shipTest01;
  beforeEach(() => {});

  test("Constructor test01, no arguments supplied", () => {
    shipTest01 = new Ship();
    expect(shipTest01.getName()).toEqual(undefined);
    expect(shipTest01.getBlocks()).toEqual(undefined);
  });
  test("Constructor test02, only ship name supplied", () => {
    shipTest01 = new Ship("battleship01");
    expect(shipTest01.getName()).toEqual("battleship01");
    expect(shipTest01.getBlocks()).toEqual(undefined);
  });
  test("Constructor test03, only ship coordinates supplied", () => {
    shipTest01 = new Ship();
    shipTest01.setBlocks([46]);
    expect(shipTest01.getName()).toEqual(undefined);
    expect(shipTest01.getBlocks()).toEqual([[46, "none"]]);
  });
  test("Constructor test04, ship name and object of coordinates supplied [Error expected]", () => {
    expect(() => (shipTest01 = new Ship("battleship01", {}))).toThrow("Error");
  });

  test("setBlocks() tests01, passing in non-array into the function [Error expected]", () => {
    shipTest01 = new Ship();
    expect(() => shipTest01.setBlocks({})).toThrow("Error");
  });
  test('getBlocks() tests01, getting array that represents the ship block coordinate, expect [[2, "none" ]] ', () => {
    shipTest01 = new Ship();
    shipTest01.setBlocks([2]);
    expect(shipTest01.getBlocks()).toEqual([[2, "none"]]);
  });
  test('getBlocks() tests02, getting array that represents the ship block coordinate, expect [[2, "none" ], [12, "none"], [22, "none"]] ', () => {
    shipTest01 = new Ship();
    shipTest01.setBlocks([2, 12, 22]);
    expect(shipTest01.getBlocks()).toEqual([
      [2, "none"],
      [12, "none"],
      [22, "none"],
    ]);
  });

  test("setName() and getName() test01, setting the name for the ship", () => {
    shipTest01 = new Ship();
    shipTest01.setName("cruiser02");
    expect(shipTest01.getName()).toEqual("cruiser02");
  });
  test("setName() and getName() test02, setting the name for the ship", () => {
    shipTest01 = new Ship();
    shipTest01.setBlocks([5, 15, 25]);
    shipTest01.setName("cruiser02");
    expect(shipTest01.getName()).toEqual("cruiser02");
  });

  test("hit(pos) test01, testing with 2 ship blocks and miss condition", () => {
    shipTest01 = new Ship("destroyer03", [47, 48]);
    expect(shipTest01.hit(23)).toEqual(false);
  });
  test("hit(pos) test02, testing with 2 ship blocks and 1 hit condition", () => {
    shipTest01 = new Ship("destroyer03", [47, 48]);
    expect(shipTest01.hit(48)).toEqual(true);
  });
  test("hit(pos) test03, testing with 2 ship blocks and 2 hit condition", () => {
    shipTest01 = new Ship("destroyer03", [47, 48]);
    expect(shipTest01.hit(47)).toEqual(true);
    expect(shipTest01.hit(48)).toEqual(true);
  });

});
