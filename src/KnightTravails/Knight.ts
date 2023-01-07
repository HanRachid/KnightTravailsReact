import { Cell } from "./Cell";

export default class Knight {
  Chessboard: (number | null)[][];
  arrayCell: number[][] | null;
  moves: number[][];
  constructor() {
    this.Chessboard = this.createChessBoard();
    this.arrayCell = null;
    this.moves = [
      [1, 2],
      [1, -2],
      [2, 1],
      [2, -1],
      [-1, -2],
      [-1, 2],
      [-2, -1],
      [-2, 1],
    ];
  }
  createChessBoard() {
    let chessboard = [];
    let str = "";
    for (let i = -2; i < 10; i++) {
      for (let j = -2; j < 10; j++) {
        {
          if (i + 1 < 1 || j + 1 < 1 || i + 1 > 8 || j + 1 > 8) {
            chessboard[i * 10 + j] = [null, null];
            str += [0, 0] + " ";
          } else {
            chessboard[i * 10 + j] = [i + 1, j + 1];
            str += [i + 1, j + 1] + " ";
          }
        }
      }
      str += "\n";
    }

    return chessboard;
  }

  contains(coords: number[], array: (number | null)[][] = this.Chessboard) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === coords[0] && array[i][1] === coords[1]) return true;
    }
    return false;
  }

  Knightmoves(startPos: number[], endPos: number[]) {
    const queue = [new Cell(startPos)];
    console.log("trying to find " + endPos + " from " + startPos);
    console.log();

    const alreadyVisited: number[][] = [];
    while (queue.length > 0) {
      const cell = queue.shift();

      alreadyVisited.push(cell!.position);
      this.moves.forEach((move) => {
        const nextPos = [
          cell!.position[0] + move[0],
          cell!.position[1] + move[1],
        ];
        if (this.contains(nextPos) && !this.contains(nextPos, alreadyVisited)) {
          const newCell = new Cell(nextPos);

          newCell.previous = cell!;
          if (nextPos[0] == endPos[0] && nextPos[1] == endPos[1]) {
            this.cellTostring(newCell, endPos);
            this.arrayCell = this.celltoArray(newCell, endPos);
          }
          alreadyVisited.push(nextPos);
          queue.push(newCell);
        }
      });
    }
  }
  cellTostring(cell: Cell, endPos: number[]) {
    let str = "[" + endPos.toLocaleString() + "]";
    let current = cell;
    while (current.previous) {
      str = "[" + current.previous.position.toLocaleString() + "] -> " + str;
      current = current.previous;
    }
  }
  celltoArray(cell: Cell, endPos: number[]) {
    const arrayCell = [[endPos[0], endPos[1]]];
    let current = cell;
    while (current.previous) {
      arrayCell.unshift([
        current.previous.position[0],
        current.previous.position[1],
      ]);
      current = current.previous;
    }
    console.log(arrayCell);

    return arrayCell;
  }
}
