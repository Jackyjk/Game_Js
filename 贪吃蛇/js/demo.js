//点击开始游戏--> stratpage消失-->游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右 --> 控制蛇的运动
//判断是否吃到食物--> 食物消失 --> 蛇加一
//判断游戏结束，弹出game over


//move 模块   以及后面碰墙 有问题


var startBtn = document.getElementById('startBtn');
var startPage = document.getElementById('startPage');
var startPaush = document.getElementById('startPaush');
var loser = document.getElementById('loser');
var scoreBox = document.getElementById('score');
var content = document.getElementById('content');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var snakeMove;      //蛇的运动
var speed = 200;       //蛇的速度
var startGameBool = true;
var startPaushBool = true;

initGame();

function initGame() {
    //Map
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;

    //Food
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    //snake
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']]


    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    this.score = 0;

    scoreBox.innerHTML = this.score;
    //问题所在
    bindEvent();

}

function startGame() {
    startPage.style.display = 'none';
    startPaush.style.display = 'block';
    food();
    snake();

    // bindEvent();

}

function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snake() {
    for (var i = 0; i < this.snakeBody.length   ; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');

        switch (this.direct) {
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}

function move() {

    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    //删除之前蛇的节点 再渲染
    removeClass('snake');
    snake();
    // 如果蛇头和食物x y同时相等 代表吃到食物
    if ((this.snakeBody[0][0] == this.foodX ) && (this.snakeBody[0][1] == this.foodY)) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }

        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }

    //撞到设置的边框
    
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / this.snakeW) {
            // console.log(123);
            this.reloadGame();
        }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / this.snakeH) {
            // console.log(124);
            this.reloadGame();
        }


    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];

    for (var i = 1; i < this.snakeBody.length; i++) {

       var snakeBodyX = this.snakeBody[i][0];
        var snakeBodyY = this.snakeBody[i][1];
        if (snakeHX == snakeBodyX && snakeHY == snakeBodyY) {
            // console.log(126);
            this.reloadGame();
        }
    }
}



function reloadGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    startPaush.setAttribute('src', 'C:/Users/Lenovo/Desktop/贪吃蛇/images/start.png');
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];

    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    loser.style.display = 'block';
    loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startGameBool = true;
    startPaushBool = true;
    
}
function removeClass(className) {
    var elem = document.getElementsByClassName(className);
    while (elem.length > 0) {
        elem[0].parentNode.removeChild(elem[0]);
    }
}

function setDirect(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;

    }
}

function bindEvent() {

    close.onclick = function () {
        loser.style.display = 'none';
    }
    startBtn.onclick = function () {
        startAndPaush();
    }
    startPaush.onclick = function () {
        startAndPaush();
    }
}


function startAndPaush() {
    if (startPaushBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        startPaush.setAttribute('src', 'C:/Users/Lenovo/Desktop/贪吃蛇/images/pause.png');

        snakeMove = setInterval(function () {
            move();
        }, speed);
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDirect(code);
        };       
        startPaushBool = false;
    } else {
        //pause
        startPaush.setAttribute('src', 'C:/Users/Lenovo/Desktop/贪吃蛇/images/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        };
        startPaushBool = true;
    }
}