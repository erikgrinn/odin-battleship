import { Ship } from "./index";

test("Ship hit method increases hits", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Ship default hits is 0", () => {
  const ship = new Ship(1);
  expect(ship.hits).toBe(0);
});

test("Ship not sunk", () => {
    const ship = new Ship(4);
    ship.hit()
    ship.hit()
    expect(ship.hits).toBe(2)
    expect(ship.isSunk()).toBe(false)
})

test("Ship is sunk", () => {
    const ship = new Ship(4);
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.hits).toBe(5)
    expect(ship.isSunk()).toBe(true)
})
