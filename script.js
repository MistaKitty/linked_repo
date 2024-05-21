const startButton = document.getElementById("start-button"); // Get reference to the start button
const restartButton = document.getElementById("restart-button"); // Get reference to the restart button
let game; // Variable to store the game object

startButton.addEventListener("click", function() { // Add event listener for the start button
    startGame(); // Call startGame function when the start button is clicked
});

restartButton.addEventListener("click", function () { // Add event listener for the restart button
    restartGame(); // Call restartGame function when the restart button is clicked
});

function startGame() { // Function to start the game
    game = new Game(); // Create a new Game object
    game.start(); // Start the game
}

function handleKeydown(event) { // Function to handle keydown events
    const key = event.key; // Get the pressed key

    if (key === "ArrowLeft") { // If the left arrow key is pressed
        game.player.directionX = -7; // Move the player left
    } else if (key === "ArrowRight") { // If the right arrow key is pressed
        game.player.directionX = 7; // Move the player right
    }
}

window.addEventListener("keydown", handleKeydown); // Add event listener for keydown events

function restartGame() { // Function to restart the game
    location.reload(); // Reload the page
}
