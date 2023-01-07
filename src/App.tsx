import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Knight from "./KnightTravails/Knight";
import { render } from "react-dom";
function App() {
  const knight = new Knight();

  const [board, setBoard] = useState<(number | null)[][]>(knight.Chessboard);
  const [bool, setBool] = useState(false);
  const [secondbool, setsecondBool] = useState(false);
  const [boardmove, setboardmove] = useState<(number | null)[]>([]);

  function htmltopos(html: string) {
    return [Number(html[0]), Number(html[2])];
  }

  function handleClick(event) {
    let move = htmltopos(event.target.innerHTML);
    if (!bool) {
      event.target.style.backgroundColor = "purple";
      event.target.style.color = "purple";

      setBool(true);
      let move = htmltopos(event.target.innerHTML);
      setboardmove(move);
    } else if (
      bool &&
      event.target.style.backgroundColor != "purple" &&
      secondbool == false
    ) {
      event.target.style.backgroundColor = "green";
      event.target.style.color = "green";

      setsecondBool(true);
      let move = htmltopos(event.target.innerHTML);

      knight.Knightmoves(boardmove, move);
      let counter = 0;
      knight.arrayCell!.forEach((cellule, index) => {
        counter++;
        setTimeout(() => {
          console.log(cellule);
          const cells = document.querySelectorAll(".cell");
          cells.forEach((cell) => {
            let pos = htmltopos(cell.innerHTML);
            if (pos[0] === cellule[0] && pos[1] === cellule[1]) {
              cell.style.backgroundColor = "blue";

              cell.style.color = "blue";
            }
          });
        }, 700 * (index + 1));
      });
      console.log(counter);

      setTimeout(function () {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
          cell.style.backgroundColor = "white";
          cell.style.color = "white";
          setBool(false);
          setsecondBool(false);
          render;
        });
      }, 700 * (counter + 2));
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Knight shortest path</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div
          style={{
            color: "white",
            marginBottom: "30px",
          }}
        >
          {[...Array(8).keys()].map((element, index) => {
            return (
              <div
                style={{
                  width: "50px",
                  height: "53px",
                  fontWeight: "300",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {8 - index}
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "grid",
            gap: "3px",
            width: "420px",
            gridTemplateColumns: "repeat(8,50px)",
          }}
        >
          {board.map((cell) => {
            if (cell[0] != null) {
              return (
                <div
                  className="cell"
                  style={{
                    backgroundColor: "white",
                    width: "50px",
                    height: "50px",
                    color: "white",
                    fontWeight: "300",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                  }}
                  onClick={handleClick}
                >
                  {cell.toLocaleString()}
                </div>
              );
            }
          })}

          {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => {
            return (
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>
      </div>
      <h2>Click on the begining position, and then on the end position</h2>
    </div>
  );
}

export default App;
