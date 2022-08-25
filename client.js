const gameScreen = document.getElementById("screen");
const context = gameScreen.getContext("2d");
const currentPlayerId = "player1";

// ==============
// CREATE A GAME
// ==============

function createGame() {
  const state = {
    players: {},
    fruits: {},
  };

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = command.playerX;
    const playerY = command.playerY;

    state.players[playerId] = {
      x: playerX,
      y: playerY,
    };
  }

  function removePlayer(command) {
    const playerId = command.playerId;

    delete state.players[playerId];
  }

  function addFruit(command) {
    const fruitId = command.fruitId;
    const fruitX = command.fruitX;
    const fruitY = command.fruitY;

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
    };
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;

    delete state.fruits[fruitId];
  }

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
    const playerId = command.playerId;
    const player = state.players[playerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (player && moveFunction) {
      moveFunction(player);
      hasColision(playerId);
    }
  }

  function hasColision(playerId) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];

      console.log("checking", player, fruit);

      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({ fruitId });
      }
    }
  }

  return {
    movePlayer,
    addPlayer,
    addFruit,
    removePlayer,
    removeFruit,
    state,
  };
}

const game = createGame();

game.addPlayer({ playerId: "player1", playerX: 0, playerY: 0 });
game.addFruit({ fruitId: "fruit1", fruitX: 5, fruitY: 6 });

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
