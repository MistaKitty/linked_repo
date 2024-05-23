class Game {
    constructor() {
        // Initialize game elements and variables
        this.startScreen = document.getElementById("game-intro"); // Get the game intro screen element from the HTML document
        this.gameScreen = document.getElementById("game-screen"); // Get the game screen element from the HTML document
        this.gameEndScreen = document.getElementById("game-end"); // Get the game end screen element from the HTML document
        this.player = new Player(this.gameScreen, 200, 490, 90, 150, "./images/pinaColada.png"); // Create a new player object
        this.height = 600; // Set the game screen height
        this.width = 500; // Set the game screen width
        this.limes = []; // Initialize an empty array to store lime objects
        this.coconuts = []; // Initialize an empty array to store coconut objects
        this.pineapples = []; // Initialize an empty array to store pineapple objects
        this.stars = []; // Initialize an empty array to store star objects
        this.score = 0; // Initialize the score to 0
        this.lives = 3; // Initialize the lives to 3
        this.gameIsOver = false; // Set the game over status to false
        this.gameIntervalId = null; // Initialize the game interval ID to null
        this.gameLoopFrequency = 1000 / 60; // Set the game loop frequency (in milliseconds)
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`; // Set the game screen height in pixels
        this.gameScreen.style.width = `${this.width}px`; // Set the game screen width in pixels
        this.startScreen.style.display = "none"; // Hide the game intro screen
        this.gameScreen.style.display = "block"; // Show the game screen

        // Start the game loop
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency); // Set an interval to run the game loop at the specified frequency
    }

    gameLoop() {
        this.update(); // Update the game state
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId); // If the game is over, clear the game loop interval
        }
    }

    updateScore() {
        document.getElementById('score').textContent = this.score; // Update the score display in the HTML document
    }

    updateLives() {
        document.getElementById('lives').textContent = this.lives; // Update the lives display in the HTML document
    }

    update() {
        this.player.move(); // Move the player
        this.updateScore(); // Update the score
        this.updateLives(); // Update the lives

        this.updateObjects(this.limes, 10, Lime, 1); // Update the limes
        this.updateObjects(this.coconuts, 7, Coconut, 2); // Update the coconuts
        this.updateObjects(this.pineapples, 5, Pineapple, 5); // Update the pineapples
        this.updateObjects(this.stars, 1, Star, 0, true); // Update the stars

        if (this.lives === 0) {
            lifeLostSound.play(); // Play the life lost sound effect
            this.endGame(); // If there are no lives left, end the game
        }
    }

    updateObjects(objectsArray, maxObjects, ObjectType, scoreIncrement, star = false) {
        for (let i = 0; i < objectsArray.length; i++) {
            const object = objectsArray[i];
            object.move(); // Move the object

            if (this.player.didCollide(object)) {
                object.element.remove(); // If the player collided with the object, remove the object
                objectsArray.splice(i, 1); // Remove the object from the array
                this.score += scoreIncrement; // Increase the score
                if (star) this.lives++; // If the object is a star, increase the lives
                i--; // Decrement the index to account for the removed object
            } else if (object.top > this.height) {
                 if (!star) {this.lives--;} // If the object has moved off the screen, decrement the lives
                object.element.remove(); // Remove the object
                objectsArray.splice(i, 1); // Remove the object from the array
                i--; // Decrement the index to account for the removed object
            }
        }

        if (Math.random() > 0.99 && objectsArray.length < maxObjects) {
            objectsArray.push(new ObjectType(this.gameScreen)); // If a random number is greater than 0.98 and the number of objects is less than the maximum, add a new object
        }
    }

    endGame() {
        this.player.element.remove(); // Remove the player
        this.limes.forEach(lime => lime.element.remove()); // Remove all limes
        this.coconuts.forEach(coconut => coconut.element.remove()); // Remove all coconuts
        this.pineapples.forEach(pineapple => pineapple.element.remove()); // Remove all pineapples
        this.stars.forEach(star => star.element.remove()); // Remove all stars

        this.gameIsOver = true; // Set the game over status to true
        this.gameScreen.style.display = "none"; // Hide the game screen
        this.gameEndScreen.style.display = "block"; // Show the game end screen
        stopBackgroundMusic();
    }
}


class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen; // The game screen element
        this.left = left; // The left position of the player
        this.top = top; // The top position of the player
        this.width = width; // The width of the player
        this.height = height; // The height of the player
        this.directionX = 0; // The horizontal direction of the player
        this.element = document.createElement("img"); // Create an image element for the player

        this.element.src = imgSrc; // Set the source of the image
        this.element.style.position = "absolute"; // Position the player absolutely within the game screen
        this.element.style.width = `${width}px`; // Set the width of the player
        this.element.style.height = `${height}px`; // Set the height of the player
        this.element.style.left = `${left}px`; // Set the left position of the player
        this.element.style.top = `${top}px`; // Set the top position of the player
        this.gameScreen.appendChild(this.element); // Add the player to the game screen
    }

    move() {
        this.left += this.directionX; // Move the player horizontally
        if (this.left < 0) {
            this.left = 0; // Prevent the player from moving off the left edge of the screen
        }
        if (this.left > this.gameScreen.offsetWidth - this.width) {
            this.left = this.gameScreen.offsetWidth - this.width; // Prevent the player from moving off the right edge of the screen
        }
        this.updatePosition(); // Update the position of the player
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`; // Update the left position of the player
    }

    didCollide(object) {
        const playerRect = this.element.getBoundingClientRect(); // Get the bounding rectangle of the player
        const objectRect = object.element.getBoundingClientRect(); // Get the bounding rectangle of the object

        return (
            playerRect.left < objectRect.right && // Check if the player is to the left of the right edge of the object
            playerRect.right > objectRect.left && // Check if the right edge of the player is to the right of the left edge of the object
            playerRect.top < objectRect.bottom && // Check if the top of the player is above the bottom of the object
            playerRect.bottom > objectRect.top // Check if the bottom of the player is below the top of the object
        );
    }
}

class Lime {
    constructor(gameScreen) {
        this.gameScreen = gameScreen; // The game screen element
        this.left = Math.floor(Math.random() * 300 + 70); // The left position of the lime, randomly generated
        this.top = 0; // The top position of the lime
        this.width = 50; // The width of the lime
        this.height = 50; // The height of the lime
        this.element = document.createElement("img"); // Create an image element for the lime
        this.element.src = "./images/lime.png"; // Set the source of the image
        this.element.style.position = "absolute"; // Position the lime absolutely within the game screen
        this.element.style.width = `${this.width}px`; // Set the width of the lime
        this.element.style.height = `${this.height}px`; // Set the height of the lime
        this.element.style.left = `${this.left}px`; // Set the left position of the lime
        this.element.style.top = `${this.top}px`; // Set the top position of the lime
        this.gameScreen.appendChild(this.element); // Add the lime to the game screen
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`; // Update the left position of the lime
        this.element.style.top = `${this.top}px`; // Update the top position of the lime
    }

    move() {
        this.top += 3; // Move the lime down the screen
        this.updatePosition(); // Update the position of the lime
    }
}

// The Coconut, Pineapple, and Star classes are similar to the Lime class, but with different images, sizes, and speeds.

class Coconut {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = 0;
        this.width = 40;
        this.height = 40;
        this.element = document.createElement("img");
        this.element.src = "./images/coconut.png";
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
        this.top += 4;
        this.updatePosition();
    }
}

class Pineapple {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = 0;
        this.width = 30;
        this.height = 50;
        this.element = document.createElement("img");
        this.element.src = "./images/pineapple.png";
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

class Star {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = 0;
        this.width = 15;
        this.height = 15;
        this.element = document.createElement("img");
        this.element.src = "./images/star.png";
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
        this.top += 8;
        this.updatePosition();
    }
}
