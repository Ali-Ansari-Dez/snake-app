import React from "react";
import logo from "./logo.svg";
import "./App.css";

//probably should make a grid-like system?
const gridSize: number = 30;
const columns: number = 30;
const rows: number = 20;

function App() {
  return (
    <div className="App">
      <h1>my Snake game app thingy</h1>
      <div className="difficultyAndScore">
        <form>
          <label htmlFor="difficultySlider">movement speed slider</label>
          <input
            type="range"
            name="difficultySlider"
            id="difficultySlider"
            min="50"
            max="1000"
            step="50"
          />
        </form>
      </div>
      <canvas
        id="myCanvas"
        width={gridSize * columns}
        height={gridSize * rows}
      ></canvas>
    </div>
  );
}

export default App;
