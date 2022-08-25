const gameScreen = document.getElementById("screen");
const context = gameScreen.getContext("2d");
const currentPlayerId = "player1";

// ==============
// CREATE A GAME
// ==============

function createGame() {
  const state = {
    players: {
      player1: { x: 1, y: 1 },
      player2: { x: 9, y: 9 },
    },
    fruits: {
      fruit1: { x: 3, y: 1 },
    },
  };

  function movePlayer(command) {
    console.log(`moving ${command.playerId} to ${command.keyPressed}`);

    const acceptedMoves = {
      ArrowUp(player) {
        console.log("moving player up");
        if (player.y - 1 >= 0) {
          player.y = player.y - 1;
          return;
        }
      },
      ArrowRight(player) {
        console.log("moving player right");
        if (player.x + 1 < gameScreen.width) {
          player.x = player.x + 1;
          return;
        }
      },
      ArrowDown(player) {
        console.log("moving player down");
        if (player.y + 1 < gameScreen.height) {
          player.y = player.y + 1;
          return;
        }
      },
      ArrowLeft(player) {
        console.log("moving player left");

        if (player.x - 1 >= 0) {
          player.x = player.x - 1;
          return;
        }
      },
    };

    const keyPressed = command.keyPressed;
    const player = state.players[command.playerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (moveFunction) {
      moveFunction(player);
    }
  }

  return {
    movePlayer,
    state,
  };
}

const game = createGame();
const keyboardListenner = createKeyboardListenner();
keyboardListenner.subscribe(game.movePlayer);

// ==============
// INPUT SECTION
// ==============

function createKeyboardListenner() {
  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    console.log(`Notify ${state.observers.length} observers`);

    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  function handleKeyDown(event) {
    const keyPressed = event.key;

    const command = {
      playerId: "player1", // HARDCODED
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
  };
}
// ==================
// RENDER THE SCREEN
// ==================
renderScreen();

function renderScreen() {
  context.fillStyle = "white";
  context.clearRect(0, 0, 10, 10);

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId];
    context.fillStyle = "black";
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId];
    context.fillStyle = "red";
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  requestAnimationFrame(renderScreen);
}
