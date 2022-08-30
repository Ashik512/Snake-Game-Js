/*
// const of our game
const gameBoard = document.querySelector("#gameBoard")
const ctx = gameBoard.getContext("2d")
const scoreText = document.querySelector("#scoreText")
const resetButton = document.querySelector("#resetButton")

//getting the width and height of board
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height

//colors of object
const boardBackground = "white"
const snakeColor = "lightgreen"
const snakeBorder = "black"
const foodColor = "red"
const unitSize = 25

let running = false
let direction = 'right'

//food coordinate
let foodX = 200
let foodY = 0

//snake array
let score = 0
let xVelocity = unitSize
let yVelocity = 0
let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
]

window.addEventListener('keydown', changeDirection)
resetButton.addEventListener('click', resetGame)

gameStart()

function gameStart(){
    running = true
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()
}

function createFood() {
    function randomFood(min, max){
      const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * 25
        return randNum
    }
    foodX = randomFood(0,gameWidth - unitSize)
    foodY = randomFood(0,gameWidth - unitSize)
}

function drawFood(){
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
}

function nextTick(){
 if(running) {
     setTimeout(() => {
         clearBoard()
         drawFood()
         drawSnake()
         moveSnake()
         checkGameOver()
         nextTick()
     },200)
 }
 else{
   displayGameOver()
 }
}

function clearBoard() {
    ctx.fillStyle = boardBackground
    ctx.fillRect(0,0, gameWidth, gameHeight)
}

function drawSnake(){
    snake.forEach(snakePart => {
        ctx.fillStyle = snakeColor
        ctx.strokeStyle = snakeBorder
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
    })
}

function moveSnake(){
    let snakeHead = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity}
    snake.unshift(snakeHead)

    //checking if snake is going outside the board
    if(snake[0].x > gameWidth-unitSize) {
        snake[0].x = 0
    }
    else if(snake[0].x < 0) {
        snake[0].x = gameWidth-unitSize
    }
    else if(snake[0].y > gameHeight-unitSize) {
        snake[0].y = 0
    }
    else if(snake[0].y < 0) {
        snake[0].y = gameHeight-unitSize
    }
    //if food is eaten
    if(snake[0].x === foodX && snake[0].y === foodY){
      score++
      scoreText.textContent = score
      createFood()
    }
    else{
        snake.pop()
    }
}

function changeDirection({key}){
   if(key === 'ArrowRight' && direction !== 'left'){
       direction = 'right'
       xVelocity = unitSize
       yVelocity = 0
   }
   else if(key === 'ArrowLeft' && direction !== 'right'){
        direction = 'left'
        xVelocity = -unitSize
        yVelocity = 0
    }
    else if(key === 'ArrowUp' && direction !== 'down'){
        direction = 'up'
        xVelocity = 0
        yVelocity = -unitSize
    }
    else if(key === 'ArrowDown' && direction !== 'up'){
        direction = 'down'
        xVelocity = 0
        yVelocity = unitSize
    }

}

function checkGameOver(){
    for(let i=1; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            running = false
        }
    }
}

function displayGameOver(){
    ctx.font = "50px MV Boli"
    ctx.fillStyle= "black"
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2)
    //running = false
}

function resetGame(){
    score = 0
    xVelocity = unitSize
    yVelocity = 0
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ]
    gameStart()
}
*/

//trying to implement a snake game
const gameBoard = document.getElementById('gameBoard')
const ctx = gameBoard.getContext('2d')
const scoreText = document.getElementById('scoreText')
const resetButton = document.getElementById('resetButton')
let direction
let food = {}
let snake = []
let velocity = {}
let score = 0
let running

const init = () => {
     direction = 'right'
     food = {
        x: 0,
        y: 0
    }
     snake = [
        {
            x: 75,
            y: 0
        },
        {
            x: 50,
            y: 0
        },
        {
            x: 25,
            y: 0
        },
        {
            x: 0,
            y: 0
        }
    ]
     velocity = {
        x: 25,
        y: 0
    }
    score = 0
    running = false
    scoreText.textContent = score
}

const createFood = () => {
    food = {
        x: Math.floor(Math.random() * 19) * 25,
        y: Math.floor(Math.random() * 19) * 25
    }
}

const createSnake = () => {
    snake.forEach(snakePart => {
        ctx.fillStyle = 'lightgreen'
        ctx.strokeStyle = 'black'
        ctx.fillRect(snakePart.x, snakePart.y, 25, 25)
    })
}

const startGame = () => {
    init()
    running = true
    createFood()
}

const checkIfSnakeGoOutside = () => {
    if(snake[0].x > 475){
        snake[0].x = 0
    }
    else if(snake[0].x < 0){
        snake[0].x = 475
    }
    else if(snake[0].y > 475){
        snake[0].y = 0
    }
    else if(snake[0].y < 0){
        snake[0].y = 475
    }

}

const checkGameOver = () => {
    const length = snake.length
    for(let i=1; i<length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            //alert("Game Over! "+score)
            running = false
        }
    }
}

const displayGameOver = () => {
    ctx.font = '50px MV Boli'
    ctx.fillStyle = 'Black'
    ctx.textAlign = "center"
    ctx.fillText("Game Over!",500/2,500/2)
}

const moveSnake = () => {
    if(running) {
        //clearing board
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 500, 500)

        //drawing food
        ctx.fillStyle = 'red'
        ctx.fillRect(food.x, food.y, 25, 25)

        //new snake creating
        createSnake()

        //snake new head
        let snakeHead = {
            x: snake[0].x + velocity.x,
            y: snake[0].y + velocity.y,
        }
        snake.unshift(snakeHead)

        checkIfSnakeGoOutside()
        //if food is eaten
        if (snake[0].x === food.x && snake[0].y === food.y) {
            score++
            scoreText.textContent = score
            createFood()
        } else {
            snake.pop()
        }
        //check if game is over
        checkGameOver()
    }
    else {
      displayGameOver()
    }
}

const changeDirection = (e) => {
    if(e.key === 'ArrowRight' && direction !== 'left'){
        direction = 'right'
        velocity.x = 25
        velocity.y = 0
    }
    else if(e.key === 'ArrowLeft' && direction !== 'right'){
        direction = 'left'
        velocity.x = -25
        velocity.y = 0
    }
    else if(e.key === 'ArrowUp' && direction !== 'down'){
        direction = 'up'
        velocity.x = 0
        velocity.y = -25
    }
    else if(e.key === 'ArrowDown' && direction !== 'up'){
        direction = 'down'
        velocity.x = 0
        velocity.y = 25
    }
}

startGame()
setInterval(moveSnake,200)
document.addEventListener('keydown',changeDirection)
resetButton.addEventListener('click', startGame)




























