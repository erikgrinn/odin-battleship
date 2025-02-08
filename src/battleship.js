// import "./styles.css";

// tried using data types for constructor values, that is where typescript is used
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
    constructor(rows, cols) {
      this.rows = rows;
      this.cols = cols
      this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
      this.ships = [];
    }
}

export { Ship, Gameboard };

