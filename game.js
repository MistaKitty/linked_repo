class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.player = new Player(
        this.gameScreen,
        200,
        500,
        100,
        150,
        "./images/pinaColada.png" //Player image
    );
    this.height = 600;
    this.width = 500;
    this.badFruits = [];
    this.fruits = [];
    this.score = 0;
    this.lives = 3,5; 
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = 1000 / 60;

}

start() {
    // The size of the game
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the starting screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "block";

    // Game Loop ferquency
    this.gameIntervalId = setInterval(() => {
        this.gameLoop();
    }, this.gameLoopFrequency);
}

    gameLoop(){
        console.log("Teste Loop");

        this.update();
        //If the game ends
        if (this.gameIsOver){
            clearInterval(this.gameIntervalId)
        }
    }

    update() {
        this.player.move();
    }
}

class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top; // Do not remove
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.element = document.createElement("img");

        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`; // Do not remove this to
        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX;

        if (this.left < 0) {
            this.left = 0;
        }

        if (this.left > this.gameScreen.offsetWidth - this.width - 0) {
            this.left = this.gameScreen.offsetWidth - this.width - 0;
        }

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        return (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left
        );
    }
}