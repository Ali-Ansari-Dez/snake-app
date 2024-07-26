import React, { useState, useRef, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";


// type CanvasProps = React.DetailedHTMLProps<
//   React.CanvasHTMLAttributes<HTMLCanvasElement>,
//   HTMLCanvasElement
// >;

//probably should make a grid-like system?
const gridSize: number = 30;
const columns: number = 30;
const rows: number = 20;



function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [difValue, setDifValue] = useState(100); //to change difficulty later
  const [Snake,setSnake] = useState()
  const [apple,setApple] = useState()
  const [snakeDirection,setSnakeDirection] = useState();
  const [gameOver,setGameOver] = useState()


  const moveSnake = (e: React.KeyboardEvent<HTMLDivElement>) => {};



  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    let value = parseInt(event.target.value)
    setDifValue(value)
  }

  return (
    <div className="App" role="button" onKeyDown={(e) => moveSnake(e)}>
      <h1>my Snake game app thingy</h1>
      <div className="difficultyAndScore">
        <form>
          <label htmlFor="difficultySlider">movement speed slider</label>
          <input
            type="range"
            name="difficultySlider"
            id="difficultySlider"
            min="50"
            max="500"
            step="50"
            defaultValue={difValue}
            onChange={handleChange}
          />
        </form>
      </div>
      <canvas
      ref={canvasRef}
        id="myCanvas"
        width={gridSize * columns}
        height={gridSize * rows}
      ></canvas>
    </div>
  );
}

export default App;
