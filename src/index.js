// import "./styles.css";

// tried using data types for constructor values, that is where typescript is used
class Ship {
  constructor(size, hits = 0) {
    this.size = size;
    this.hits = hits;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.size;
  }
}

export { Ship };

// class Gameboard {
//     constructor()
// }
