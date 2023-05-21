// snake.js

// Define variables for canvas, context, snake, food, direction, and score
let canvas, ctx;
let snake, food;
let direction;
let score;

// Function to create the game canvas
function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.style.backgroundColor = '#0080FF'; // Set background color to gray
  canvas.width = 400;
  canvas.height = 400;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

// Function to create the initial snake
function createSnake() {
  snake = {
    body: [{ x: 10, y: 10 }]
  };
}

// Function to create the food at a random position
function createFood() {
  const cols = Math.floor(canvas.width / 20);
  const rows = Math.floor(canvas.height / 20);
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

// Function to update the game state
function update() {
  const head = { x: snake.body[0].x + direction.x, y: snake.body[0].y + direction.y };
  snake.body.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    createFood();
  } else {
    snake.body.pop();
  }

  if (gameOver()) {
    clearInterval(gameLoop);
    return;
  }

  draw();
}

// Function to draw the game on the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = '#00FF00';
  snake.body.forEach(segment => {
    ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
  });

  // Draw food
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

  // Draw score
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 25);
}

// Function to handle keypress events and change the snake direction
// Function to handle keypress events and change the snake direction
function handleKeyPress(event) {
    const key = event.keyCode;
  
    if (key === 65 && direction.x !== 1) { // 'A' key
      direction = { x: -1, y: 0 };
    } else if (key === 87 && direction.y !== 1) { // 'W' key
      direction = { x: 0, y: -1 };
    } else if (key === 68 && direction.x !== -1) { // 'D' key
      direction = { x: 1, y: 0 };
    } else if (key === 83 && direction.y !== -1) { // 'S' key
      direction = { x: 0, y: 1 };
    }
  }
  

// Function to check if the game is over
function gameOver() {
  const head = snake.body[0];

  if (head.x < 0 || head.y < 0 || head.x >= canvas.width / 20 || head.y >= canvas.height / 20) {
    return true;
  }

  for (let i = 1; i < snake.body.length; i++) {
    if (snake.body[i].x === head.x && snake.body[i].y === head.y) {
      return true;
    }
  }

  return false;
}

// Function to start the game
function startGame() {
  createCanvas();
  createSnake();
  createFood();
  direction = { x: 1, y: 0 };
  score = 0;
  draw();
  document.addEventListener('keydown', handleKeyPress);
  gameLoop = setInterval(update, 100);
}

// Call the startGame function to begin the game
startGame();
