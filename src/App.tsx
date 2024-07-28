import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import useInterval from "./useInterval";
import "./App.css";



//probably should make a grid-like system?
const gridSize: number = 30;
const columns: number = 30;
const rows: number = 20;

const initialSnake = [
  [15, 10],
  [15, 11],
  [15, 12],
];
const initialApple = [[5, 15]];

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [difficultyValue, setDifficultyValue] = useState<number | null>(null); //to change difficulty later
  const [rangeValue, setRangeValue] = useState(200)
  const [snake, setSnake] = useState<number[][]>(initialSnake);
  const [apple, setApple] = useState<number[][]>(initialApple);
  const [snakeDirection, setSnakeDirection] = useState<number[]>([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0)


  useInterval(() => runGame(), difficultyValue);

  const placeRandomApple = () => {
    let newApple = initialApple.map(() => [
      Math.floor(Math.random() * columns),
      Math.floor(Math.random() * rows),
    ]);
    setApple(newApple);
  };

  const checkAppleColision = () => {
    if (apple[0][0] === snake[0][0] && apple[0][1] === snake[0][1]) {
      const newScore = score + 1;
      setScore(newScore);
      return true;
    }
  };


  const handleOutOfBounds = (newSnakeHead:number[]) => {
    if (newSnakeHead[0] === -1 && snakeDirection[0] === -1 ) {
      newSnakeHead[0] = 29
    }
    if (newSnakeHead[0] === 30 && snakeDirection[0] === 1) {
      newSnakeHead[0] = 0
    }
    if (newSnakeHead[1] === 20 && snakeDirection[1] === 1) {
      newSnakeHead[1] = 0
    }
    if (newSnakeHead[1] === -1 && snakeDirection[1] === -1) {
      newSnakeHead[1] = 19
    }
    return newSnakeHead
  }

  const handleGameOver = () => {
    if(gameOver){
      
    }
  }

  const snakeBitesItself = (snake:number[][]) => {
    for (let i = 3; i < snake.length; i++) {
      if (snake[0][0]===snake[i][0] && snake[0][1]===snake[i][1]) {
        setGameOver(true)
        setDifficultyValue(null)
        handleGameOver()
      }
    }
  }

  const runGame = () => {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + snakeDirection[0],
      newSnake[0][1] + snakeDirection[1],
    ];
    handleOutOfBounds(newSnakeHead)
    newSnake.unshift(newSnakeHead);
    if (checkAppleColision()) {
      placeRandomApple();
    }
    if (!checkAppleColision()) {
      newSnake.pop();
    }
    setSnake(newSnake);
    snakeBitesItself(newSnake)
  };


  
  const changeDirection = (event: KeyboardEvent) => {
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        if(snakeDirection[0] != 1) 
        {setSnakeDirection([-1, 0])};
        break;
      case "w":
      case "ArrowUp":
        if(snakeDirection[1] != 1)
        {setSnakeDirection([0, -1])};
        break;
      case "d":
      case "ArrowRight":
        if(snakeDirection[0] != -1)
        {setSnakeDirection([1, 0])};
        break;
      case "s":
      case "ArrowDown":
        if(snakeDirection[1] != -1)
        setSnakeDirection([0, 1]);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", changeDirection);
    return () => {
      document.removeEventListener("keydown", changeDirection);
    };
  }, [snakeDirection]);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let value = parseInt(event.target.value);
    setRangeValue(value);
  };
  const play = () => {
    setSnake(initialSnake);
    setApple(initialApple);
    setSnakeDirection([0, -1]);
    setDifficultyValue(rangeValue);
    setGameOver(false)
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const contex = canvas.getContext("2d");
      if (contex) {
        contex.clearRect(0, 0, window.innerWidth, window.innerHeight);
        contex.fillStyle = "red";
        contex.fillRect(
          apple[0][0] * gridSize,
          apple[0][1] * gridSize,
          gridSize,
          gridSize
        );

        contex.fillStyle = "#a3d001";
        contex.strokeStyle = "#000";
        snake.forEach(([x, y]) =>
          contex.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
        );
        snake.forEach(([x, y]) =>
          contex.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize)
        );
      }
    }

    // if (divRef.current) {
    //   divRef.current.focus();
    // }
  }, [snake, apple, gameOver]);

  return (
    <div
      className="App"
      //role="button"
      // tabIndex={0}
      // onKeyDown={(event) => changeDirection(event)}
    >
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
            defaultValue={200}
            onChange={handleRangeChange}
          />
        </form>
        <p>Score:{score}</p>
        <button type="button" onClick={play}>
          play
        </button>
      </div>
      <div className="canvasDiv">
        <canvas
          ref={canvasRef}
          id="myCanvas"
          width={gridSize * columns}
          height={gridSize * rows}
        ></canvas>
      </div>
    <div className="gameOverDiv" style={gameOver ? {display:'block'}:{}}>
      <h2>you lost dawg, might wanna try again</h2>
      <p>Your Score: {score}</p>
      <p>HighScore: {highScore}</p>
      <button type="button" onClick={play}>play again</button>
    </div>
    </div>
  );
}

export default App;

//modal
//setting window on keydown