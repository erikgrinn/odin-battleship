import { Ship, Gameboard, Player } from "./battleship.js";

class Game {
  constructor(dimensions) {
    this.players = [new Player("Player 1", dimensions), new Player("Player 2", dimensions)];
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

const game1 = new Game([8,8])
game1.start();