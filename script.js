window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game
    startButton.addEventListener("click", function() {
        startGame();
    });

function startGame() {
    console.log("Teste")

    game = new Game();

    game.start();
}

function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = ["ArrowLeft", "ArrowRight",];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -3; // Player speed left
          break;
        case "ArrowRight":
          game.player.directionX = 3; //Player speed right
          break;
      }
    }
  }

  // Add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);

};

