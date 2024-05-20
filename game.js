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
    this.limes = [];
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

        if (Math.random() > 0.98 && this.limes.length < 1) {
            this.limes.push(new Lime(this.gameScreen));
          }
        }
    }


class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top; // Do not remove this
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.element = document.createElement("img");

        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`; // Also do not remove this one
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

    didCollide(lime) {
        const playerRect = this.element.getBoundingClientRect();
        const limeRect = lime.element.getBoundingClientRect();

        return (
            playerRect.left < limeRect.right &&
            playerRect.right > limeRect.left
        );
    }
}
class Lime {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = Math.floor(Math.random() * 300 + 70);
      this.top = 0;
      this.width = 100;
      this.height = 150;
      this.element = document.createElement("img");
      this.element.src = "./images/lime.jpeg";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
      this.gameScreen.appendChild(this.element);
    }
  
    updatePosition() {
      
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
     
      this.top += 3;
      
      this.updatePosition();
    }
  }