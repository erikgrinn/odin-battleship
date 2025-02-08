// can also use factory functions instead of classes

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

// Another way to do this is to make a gridCell class


class Gameboard {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
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
      } else {
        if (row + i >= this.rows || this.grid[row + i][col] !== null) {
          return false;
        }
      }
    }

    // Place the ship
    for (let i = 0; i < size; i++) {
      if (orientation === "horizontal") {
        this.grid[row][col + i] = { ship: newShip, hit: false };
      } else {
        this.grid[row + i][col] = { ship: newShip, hit: false };
      }
    }

    // If the placement was successful, add the ship to the list of ships
    this.ships.push(newShip);
    return true;
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;
    if (this.grid[row][col] !== null && typeof this.grid[row][col] === 'object') {
      this.grid[row][col].hit = true; // Mark the specific cell as hit
      this.grid[row][col].ship.hit(); // Register a hit on the ship
      if (this.grid[row][col].ship.isSunk()) {
        console.log("Ship sunk!");
      }
      // Check if all ships are sunk
      if (this.ships.every(ship => ship.isSunk())) {
        console.log("All ships have been sunk!");
      }
    } else {
      this.grid[row][col] = "miss"; // Mark the cell as a miss
    }
  }

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
    const [rows, cols] = dimensions; // Unpack dimensions into rows and cols
    this.gameboard = new Gameboard(10, 10);
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

class Game {
  constructor() {
    this.players = [new Player("Player 1"), new Player("Player 2")];
    this.players[0].turn = true;
  }

  start() {
    console.log("Game started!");
    this.players[0].placeShip(3, "horizontal", [1, 1]);
    this.players[0].placeShip(2, "vertical", [3, 3]);
    this.players[1].placeShip(3, "horizontal", [0, 0]);
    this.players[1].placeShip(2, "vertical", [2, 2]);
  }

  handleTurn(playerIndex, coordinates) {
    const currentPlayer = this.players[playerIndex];
    const opponent = this.players[(playerIndex + 1) % 2];

    currentPlayer.attack(opponent, coordinates);

    if (opponent.allShipsSunk()) {
      console.log(`${currentPlayer.name} wins!`);
      return true;
    }

    this.players[playerIndex].turn = false;
    this.players[(playerIndex + 1) % 2].turn = true;
    return false;
  }
}

export { Game };