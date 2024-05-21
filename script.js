window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function() {
      startGame();
  });

  restartButton.addEventListener("click", function () {
      restartGame();
  });

  function startGame() {
      game = new Game();
      game.start();
  }

  function handleKeydown(event) {
      const key = event.key;
      const possibleKeystrokes = ["ArrowLeft", "ArrowRight"];

      if (possibleKeystrokes.includes(key)) {
          event.preventDefault();
          switch (key) {
              case "ArrowLeft":
                  game.player.directionX = -4;
                  break;
              case "ArrowRight":
                  game.player.directionX = 4;
                  break;
          }
      }
  }

  window.addEventListener("keydown", handleKeydown);

  function restartGame() {
      location.reload();
  }
};
