let x = 180;
let y = 180;
let coords = [{ x: x, y: y }]

let applex = Math.floor(Math.random() * 20) * 20;
let appley = Math.floor(Math.random() * 20) * 20;

const canvas = document.getElementById("game-canvas");

const bg = canvas.getContext("2d");
bg.fillStyle = "green";
bg.fillRect(0, 0, 800, 800);

let snake = canvas.getContext("2d");
snake.fillStyle = "blue";
snake.fillRect(x, y, 20, 20);

let apple = canvas.getContext("2d");
apple.fillStyle = "red";
apple.fillRect(applex, appley, 20, 20);

function refresh() {
    bg.fillStyle = "green";
    bg.fillRect(0, 0, 800, 800);

    apple.fillStyle = "red";
    apple.fillRect(applex, appley, 20, 20);

    snake.fillStyle = "blue";
    for (const part of coords) {
        snake.fillRect(part.x, part.y, 20, 20);
    }
}

// runs after every move: adds the new head, then removes the tail unless the apple was eaten
function update() {
    const head = { x: x, y: y };

    // game over: hit a wall or hit yourself
    const hitWall = x < 0 || x >= canvas.width || y < 0 || y >= canvas.height;
    const hitSelf = coords.some(part => part.x === head.x && part.y === head.y);
    if (hitWall || hitSelf) {
        clearInterval(interval);
        alert("Game over! Score: " + (coords.length - 1));
        location.reload();
        return;
    }

    coords.unshift(head);   // add the new head at the front

    if (x === applex && y === appley) {
        applex = Math.floor(Math.random() * 20) * 20;   // ate it: new apple, keep the tail
        appley = Math.floor(Math.random() * 20) * 20;
    } else {
        coords.pop();       // didn't eat: remove the tail
    }

    refresh();
}

function moveUp() {
    y -= 20;
    update();
}


function moveDown() {
    y += 20;
    update();
}


function moveLeft() {
    x -= 20;
    update();
}


function moveRight() {
    x += 20;
    update();
}

let direction = "right";

let interval;
let started = false;

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", function () {
    started = true;
    startBtn.style.display = "none";
    interval = setInterval(moveRight, 200);
});

document.addEventListener("keydown", function (event) {
    if (!started) return;

    if (event.key === "ArrowUp" && direction !== "down") {
        event.preventDefault();
        direction = "up";
        clearInterval(interval);
        interval = setInterval(moveUp, 200);

    } else if (event.key === "ArrowDown" && direction !== "up") {
        event.preventDefault();
        direction = "down";
        clearInterval(interval);
        interval = setInterval(moveDown, 200);

    } else if (event.key === "ArrowLeft" && direction !== "right") {
        event.preventDefault();
        direction = "left";
        clearInterval(interval);
        interval = setInterval(moveLeft, 200);

    } else if (event.key === "ArrowRight" && direction !== "left") {
        event.preventDefault();
        direction = "right";
        clearInterval(interval);
        interval = setInterval(moveRight, 200);
    }
});