const startButton = document.getElementById("start-button"); // Get reference to the start button
const restartButton = document.getElementById("restart-button"); // Get reference to the restart button
let game; // Variable to store the game object
let backgroundMusic; // Variable to store the background music object
let lifeLostSound = new Audio("./assets/loseSound.mp3"); // Path to losing audio file 


startButton.addEventListener("click", function() { // Add click event to the start button
    startGame(); // Call the startGame function when the start button is clicked
});

restartButton.addEventListener("click", function () { // Add click event to the restart button
    restartGame(); // Call the restartGame function when the restart button is clicked
});

function startGame() { // Function to start the game
    game = new Game(); // Create a new Game object
    game.start(); // Start the game
    playBackgroundMusic(); // Start the background music
}

function handleKeydown(event) { // Function to handle keydown events
    const key = event.key; // Get the pressed key

    if (key === "ArrowLeft") { // If the left arrow key is pressed
        game.player.directionX = -7; // Move the player to the left
    } else if (key === "ArrowRight") { // If the right arrow key is pressed
        game.player.directionX = 7; // Move the player to the right
    }
}

window.addEventListener("keydown", handleKeydown); // Add keydown event listener

function restartGame() { // Function to restart the game
    stopBackgroundMusic(); // Stop the background music
    location.reload(); // Reload the page
}

function playBackgroundMusic() { // Function to start the background music
    backgroundMusic = new Audio("./assets/background-music.mp3"); // Create a new background music object
    backgroundMusic.loop = true; // Set it to loop
    backgroundMusic.play(); // Start playing the music
}

function stopBackgroundMusic() { // Function to stop the background music
    if (backgroundMusic) {
        backgroundMusic.pause(); // Pause the music
        backgroundMusic.currentTime = 0; // Reset playback time to the beginning
    }
}
