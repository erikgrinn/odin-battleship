import "./styles.css";
import { Ship, Gameboard, Player } from "./battleship.js";

class Game {
  constructor(dimensions) {
    this.players = [
      new Player("Player 1", dimensions),
      new Player("Player 2", dimensions),
    ];
    this.players[0].turn = true;
    this.gameOver = false;
  }

  start() {
    console.log("Game started!");
    this.players[0].placeShip(3, "horizontal", [1, 1]);
    this.players[0].placeShip(2, "vertical", [3, 3]);
    this.players[1].placeShip(3, "horizontal", [0, 0]);
    this.players[1].placeShip(2, "vertical", [2, 2]);
    this.renderBoards();
  }

  handleTurn(playerIndex, coordinates) {
    if (this.gameOver) return; // Check if the game is over

    const currentPlayer = this.players[playerIndex];
    const opponent = this.players[(playerIndex + 1) % 2];

    currentPlayer.attack(opponent, coordinates);

    this.players[playerIndex].turn = false;
    this.players[(playerIndex + 1) % 2].turn = true;
    this.renderBoards();

    if (opponent.allShipsSunk()) {
      console.log(`${currentPlayer.name} wins!`);
      this.gameOver = true
    }
  }
  renderBoards() {
    this.players.forEach((player, index) => {
      const boardElement = document.getElementById(`player${index + 1}-board`);
      boardElement.innerHTML = "";
      player.gameboard.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellElement = document.createElement("div");
          cellElement.classList.add("cell"); // add default cell
          if (
            cell !== null &&
            typeof cell === "object" // if grid cell is ship object
          ) {
            if (cell.hit) {
              cellElement.classList.add("hit");
            } else if (!cell.hit) {
              cellElement.classList.add("ship");
            }
          } else if (cell === "miss") {
            cellElement.classList.add("miss");
          }
          cellElement.addEventListener("click", () => {
            if (this.players[index].turn) {
              this.handleTurn(index, [rowIndex, colIndex]);
            }
          });
          boardElement.appendChild(cellElement);
        });
      });
    });
  }
}

const game1 = new Game([8, 8]);
game1.start();
const currentPlayer = game1.players.find((player) => player.turn);
if (currentPlayer) {
  console.log(`${currentPlayer.name}'s turn`);
}
