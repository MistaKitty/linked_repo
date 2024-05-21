class Game {
    constructor() {
        // Initialize game elements and variables
        this.startScreen = document.getElementById("game-intro"); // Get reference to the start screen element
        this.gameScreen = document.getElementById("game-screen"); // Get reference to the game screen element
        this.gameEndScreen = document.getElementById("game-end"); // Get reference to the game end screen element
        this.player = new Player( // Create a new Player object
            this.gameScreen, // Pass the game screen element as a parameter
            200, // Initial left position of the player
            500, // Initial top position of the player
            100, // Width of the player
            150, // Height of the player
            "./images/pinaColada.png" // Image source for the player
        );
        this.height = 600; // Height of the game screen
        this.width = 500; // Width of the game screen
        this.limes = []; // Array to store lime objects
        this.score = 0; // Player's score
        this.lives = 3; // Number of lives the player has
        this.gameIsOver = false; // Flag to indicate if the game is over
        this.gameIntervalId = null; // Identifier for the game interval
        this.gameLoopFrequency = 1000 / 60; // Frequency of the game loop
    }

    start() {
        // Initial game setup
        this.gameScreen.style.height = `${this.height}px`; // Set the height of the game screen
        this.gameScreen.style.width = `${this.width}px`; // Set the width of the game screen

        this.startScreen.style.display = "none"; // Hide the start screen
        this.gameScreen.style.display = "block"; // Display the game screen

        // Start the game loop
        this.gameIntervalId = setInterval(() => {
            this.gameLoop(); // Call the gameLoop method
        }, this.gameLoopFrequency);
    }

    gameLoop() {
        // Update game state
        this.update(); // Call the update method

        // Check for game over
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId); // Stop the game loop
        }
    }

    updateScore(){
        // Update the score displayed on the screen
        document.getElementById('score').textContent = this.score;
    }

    updateLives(){
        // Update the number of lives displayed on the screen
        document.getElementById('lives').textContent = this.lives;
    }

    update() {
        // Update player and lime state
        this.player.move(); // Call the move method of the player
        this.updateScore(); // Call the updateScore method to update the score display
        this.updateLives(); // Call the updateLives method to update the lives display

        // Loop through limes in play
        for (let i = 0; i < this.limes.length; i++) {
            const lime = this.limes[i]; // Get the current lime object
            lime.move(); // Call the move method of the lime

            // Check for player-lime collisions
            if (this.player.didCollide(lime)) { // If there's a collision between player and lime
                lime.element.remove(); // Remove the lime element from the DOM
                this.limes.splice(i, 1); // Remove the lime object from the array
                this.score++; // Increment the score
                i--; // Decrement the loop counter

                // Check if player ran out of lives
                if (this.lives <= 0) {
                    this.endGame(); // Call the endGame method if the player ran out of lives
                }
            } else if (lime.top > this.height) { // If the lime goes past the screen height
                this.lives--; // Decrement the player's lives
                lime.element.remove(); // Remove the lime element from the DOM
                this.limes.splice(i, 1); // Remove the lime object from the array
                i--; // Decrement the loop counter
            }
        }

        // Check for game over
        if (this.lives === 0) {
            this.endGame(); // Call the endGame method if the player ran out of lives
        }

        // Add new limes randomly
        if (Math.random() > 0.98 && this.limes.length < 1) {
            this.limes.push(new Lime(this.gameScreen)); // Create a new Lime object and add it to the array
        }
    }

    endGame() {
        // Clear game elements and display game end screen
        this.player.element.remove(); // Remove the player element from the DOM
        this.limes.forEach(lime => lime.element.remove()); // Remove all lime elements from the DOM

        this.gameIsOver = true; // Set the game over flag to true

        this.gameScreen.style.display = "none"; // Hide the game screen
        this.gameEndScreen.style.display = "block"; // Display the game end screen
    }
}

class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        // Initialize player
        this.gameScreen = gameScreen; // Reference to the game screen element
        this.left = left; // Initial left position
        this.top = top; // Initial top position
        this.width = width; // Width of the player
        this.height = height; // Height of the player
        this.directionX = 0; // Horizontal movement direction
        this.element = document.createElement("img"); // Create a new img element for the player

        // Configure player image
        this.element.src = imgSrc; // Set the image source
        this.element.style.position = "absolute"; // Set the position style
        this.element.style.width = `${width}px`; // Set the width style
        this.element.style.height = `${height}px`; // Set the height style
        this.element.style.left = `${left}px`; // Set the left style
        this.element.style.top = `${top}px`; // Set the top style
        this.gameScreen.appendChild(this.element); // Append the player element to the game screen
    }

    move() {
        // Player movement
        this.left += this.directionX; // Update the left position based on the directionX

        // Screen boundaries
        if (this.left < 0) {
            this.left = 0; // Prevent player from going off the left edge of the screen
        }

        if (this.left > this.gameScreen.offsetWidth - this.width) {
            this.left = this.gameScreen.offsetWidth - this.width; // Prevent player from going off the right edge of the screen
        }

        this.updatePosition(); // Update the player's position on the screen
    }

    updatePosition() {
        // Update player position on screen
        this.element.style.left = `${this.left}px`; // Set the left style of the player element
    }

    didCollide(lime) {
        // Check for collision between player and lime
        const playerRect = this.element.getBoundingClientRect(); // Get the bounding rectangle of the player element
        const limeRect = lime.element.getBoundingClientRect(); // Get the bounding rectangle of the lime element

        return (
            playerRect.left < limeRect.right && // Check if player's left edge is to the left of the lime's right edge
            playerRect.right > limeRect.left && // Check if player's right edge is to the right of the lime's left edge
            playerRect.top < limeRect.bottom && // Check if player's top edge is above the lime's bottom edge
            playerRect.bottom > limeRect.top // Check if player's bottom edge is below the lime's top edge
        );
    }
}

class Lime {
    constructor(gameScreen) {
        // Initialize lime
        this.gameScreen = gameScreen; // Reference to the game screen element
        this.left = Math.floor(Math.random() * 300 + 70); // Randomize initial left position within the screen width
        this.top = 0; // Initial top position
        this.width = 50; // Width of the lime
        this.height = 50; // Height of the lime
        this.element = document.createElement("img"); // Create a new img element for the lime
        this.element.src = "./images/lime.png"; // Set the image source for the lime
        this.element.style.position = "absolute"; // Set the position style
        this.element.style.width = `${this.width}px`; // Set the width style
        this.element.style.height = `${this.height}px`; // Set the height style
        this.element.style.left = `${this.left}px`; // Set the left style
        this.element.style.top = `${this.top}px`; // Set the top style
        this.gameScreen.appendChild(this.element); // Append the lime element to the game screen
    }

    updatePosition() {
        // Update lime position on screen
        this.element.style.left = `${this.left}px`; // Set the left style of the lime element
        this.element.style.top = `${this.top}px`; // Set the top style of the lime element
    }

    move() {
        // Lime movement
        this.top += 5; // Move the lime downwards
        this.updatePosition(); // Update the lime's position on the screen
    }
}
