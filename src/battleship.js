// import "./styles.css";

// tried using data type validation, that is where typescript is used
class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.size;
  }
}

class Gameboard {
  constructor(dimensions) {
    const [rows, cols] = dimensions; // Unpack dimensions into rows and cols
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    this.ships = [];
  }

  placeShip(size, orientation, coordinates) {
    const [row, col] = coordinates;
    const newShip = new Ship(size);

    // Check if the ship can be placed
    for (let i = 0; i < size; i++) {
      if (orientation === "horizontal") {
        if (col + i >= this.cols || this.grid[row][col + i] !== null) {
          return false;
        }
      } else if (orientation === "vertical") {
        if (row + i >= this.rows || this.grid[row + i][col] !== null) {
          return false;
        }
      }
    }

    // Place the ship
    for (let i = 0; i < size; i++) {
      if (orientation === "horizontal") {
        this.grid[row][col + i] = { ship: newShip, hit: false }; // hit is probably extra here
      } else if (orientation === "vertical") {
        this.grid[row + i][col] = { ship: newShip, hit: false }; // hit is probably extra here
      }
    }

    // If the placement was successful, add the ship to the list of ships
    this.ships.push(newShip);
    // return true;
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;
    if (
      this.grid[row][col] !== null &&
      typeof this.grid[row][col] === "object" // if grid cell is ship object
    ) {
      this.grid[row][col].hit = true; // Mark the specific cell as hit
      this.grid[row][col].ship.hit(); // Register a hit on the ship
      if (this.grid[row][col].ship.isSunk()) {
        console.log("Ship sunk!");
      }
      // Check if all ships are sunk
      if (this.ships.every((ship) => ship.isSunk())) {
        console.log("All ships have been sunk!");
      }
    } else {
      this.grid[row][col] = "miss"; // Mark the cell as a miss
    }
  }

  // here or in index.js?
  display() {
    this.grid.forEach((row) => {
      console.log(
        row
          .map((cell) => {
            if (cell === null) {
              return ".";
            } else if (cell === "miss") {
              return "O";
            } else if (typeof cell === "object" && cell.hit) {
              return "X";
            } else if (typeof cell === "object" && !cell.hit) {
              return "S";
            }
          })
          .join(" ")
      );
    });
  }
}

class Player {
  constructor(name, dimensions) {
    this.name = name;
    this.gameboard = new Gameboard(dimensions);
    this.turn = false;
  }

  placeShip(size, orientation, coordinates) {
    return this.gameboard.placeShip(size, orientation, coordinates);
  }

  attack(opponent, coordinates) {
    opponent.gameboard.receiveAttack(coordinates);
  }

  allShipsSunk() {
    return this.gameboard.ships.every(ship => ship.isSunk());
  }
}

export { Ship, Gameboard, Player };
