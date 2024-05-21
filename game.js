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
            "./images/pinaColada.png"
        );
        this.height = 600;
        this.width = 500;
        this.limes = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000 / 60;
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    }

    gameLoop() {
        this.update();

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
    }

    update() {
        this.player.move();
    
        for (let i = 0; i < this.limes.length; i++) {
            const lime = this.limes[i];
            lime.move();
            if (this.player.didCollide(lime)) {
                lime.element.remove();
                this.limes.splice(i, 1);
                this.score++;
                i--;
                if (this.lives <= 0) {
                    this.endGame();
                }
            } else if (lime.top > this.height) {
                this.lives--;
                lime.element.remove();
                this.limes.splice(i, 1);
                i--;
            }
        }

        if (this.lives === 0) {
            this.endGame();
        }

        if (Math.random() > 0.98 && this.limes.length < 1) {
            this.limes.push(new Lime(this.gameScreen));
        }
    }

    endGame() {
        this.player.element.remove();
        this.limes.forEach(lime => lime.element.remove());

        this.gameIsOver = true;

        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";
    }
}

class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.element = document.createElement("img");

        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX;

        if (this.left < 0) {
            this.left = 0;
        }

        if (this.left > this.gameScreen.offsetWidth - this.width) {
            this.left = this.gameScreen.offsetWidth - this.width;
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
            playerRect.right > limeRect.left &&
            playerRect.top < limeRect.bottom &&
            playerRect.bottom > limeRect.top
        );
    }
}

class Lime {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = 0;
        this.width = 50;
        this.height = 50;
        this.element = document.createElement("img");
        this.element.src = "./images/lime.png";
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
        this.top += 5;
        this.updatePosition();
    }
}
