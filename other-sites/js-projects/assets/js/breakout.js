const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

//Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

//Create paddle props

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 4,
  dx: 0,
};

//Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

//Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

//Draw ball on canvas
function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  context.fillStyle = '#000';
  context.fill();
  context.closePath();
}

//Draw paddle on canvas
function drawPaddle() {
  context.beginPath();
  context.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  context.fillStyle = '#000';
  context.fill();
  context.closePath();
}

//Draw score on canvas
function drawScore() {
  context.font = '20px Arial';
  context.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//Draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      context.beginPath();
      context.rect(brick.x, brick.y, brick.w, brick.h);
      context.fillStyle = brick.visible ? '#000' : 'transparent';
      context.fill();
      context.closePath();
    });
  });
}

//Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  //Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

//Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //Wall collision (x-axis)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  //Wall collision (y-axis)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y - ball.size < brick.y + brick.h &&
          ball.y + ball.size > brick.y
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });

  //Hit bottom border
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

//Make all bricks apper again
function showAllBricks() {
  bricks.forEach((column) => column.forEach((brick) => (brick.visible = true)));
}

//Increasing score
function increaseScore() {
  score++;
  if (score % (brickRowCount * brickRowCount) == 0) {
    showAllBricks();
  }
}

//Draw everything
function draw() {
  //Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

//Animate everything
function update() {
  movePaddle();
  moveBall();

  //Draw everything
  draw();

  requestAnimationFrame(update);
}

update();

//Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') paddle.dx = paddle.speed;
  if (e.key === 'Left' || e.key === 'ArrowLeft') paddle.dx = -paddle.speed;
}

//Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  )
    paddle.dx = 0;
}

//Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

//Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show-rules'));

closeBtn.addEventListener('click', () => rules.classList.remove('show-rules'));
