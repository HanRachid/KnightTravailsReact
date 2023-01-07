export class Cell {
  position: number[];
  previous: Cell | null;

  constructor(position: number[]) {
    this.position = position;
    this.previous = null;
  }
}
