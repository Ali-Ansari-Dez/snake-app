import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import useInterval from "./useInterval";
import "./App.css";

// type CanvasProps = React.DetailedHTMLProps<
//   React.CanvasHTMLAttributes<HTMLCanvasElement>,
//   HTMLCanvasElement
// >;

//probably should make a grid-like system?
const gridSize: number = 30;
const columns: number = 30;
const rows: number = 20;

const initialSnake = [ [ 15, 10 ], [ 15, 11 ],[15,12] ]
const initialApple = [[4,4]]

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [difValue, setDifValue] = useState(500); //to change difficulty later
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [snakeDirection, setSnakeDirection] = useState([0, -1]);
  const [gameOver, setGameOver] = useState();

  useInterval(() => runGame(), difValue)
  
  




  const randomApplePlacement = () => {
    let newApple = initialApple.map(([x,y])=>[
      Math.floor(Math.random() * x),
      Math.floor(Math.random() * y)
    ])
    setApple(newApple)
  }

  

  const runGame = () => {
    const newSnake = [ ...snake ]
    const newSnakeHead = [ newSnake[0][0] + snakeDirection[0], newSnake[0][1] + snakeDirection[1] ]
    newSnake.unshift(newSnakeHead)
    setSnake(newSnake)
  }

  
  const changeDirection = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "A":
      case "ArrowLeft":
        setSnakeDirection([-1, 0]);
        break;
      case "W":
      case "ArrowUp":
        setSnakeDirection([0, -1]);
        break;
      case "D":
      case "ArrowRight":
        setSnakeDirection([1, 0]);
        break;
      case "S":
      case "ArrowDown":
        setSnakeDirection([0, 1]);
        break;
    }
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let value = parseInt(event.target.value);
    setDifValue(value);
  };
  const play =() => {
		setSnake(initialSnake)
		setApple(initialApple)
		setSnakeDirection([ 0, -1 ])
    runGame()
	}

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const contex = canvas.getContext("2d")
      if (contex) {
        contex.clearRect(0, 0, window.innerWidth, window.innerHeight);
        contex.fillStyle ="red"
        contex.fillRect(apple[0][0]*gridSize,apple[0][1]*gridSize,gridSize,gridSize)

        contex.fillStyle = "#a3d001"
        contex.strokeStyle = "#000"
        snake.forEach(([ x, y ]) => contex.fillRect(x * gridSize , y * gridSize, gridSize, gridSize))
        snake.forEach(([x,y]) =>contex.strokeRect(x * gridSize , y * gridSize, gridSize, gridSize))
      }
    }

    // if (divRef.current) {
    //   divRef.current.focus();
    // }
  }, [snake, apple, gameOver]);

  
  return (
    <div className="App" role="button" tabIndex={0} onKeyDown={(event) => changeDirection(event)}>
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
            onChange={handleRangeChange}
          />
        </form>
        <button type="button" onClick={play}>play</button>
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
