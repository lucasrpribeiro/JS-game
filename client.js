const gameScreen = document.getElementById("screen"); // Selecionando o canva do html
const context = gameScreen.getContext("2d"); // Criando o contexto de render

const game = {
  players: {
    player1: { x: 1, y: 1 },
    player2: { x: 9, y: 9 },
  },
  fruits: {
    fruit1: { x: 3, y: 1 },
  },
}; // Definindo o objeto de jogo que vai conter as variaveis do meu jogo

renderScreen();

function renderScreen() {
  context.fillStyle = "white";
  context.clearRect(0, 0, 10, 10);

  for (const playerId in game.players) {
    const player = game.players[playerId];
    context.fillStyle = "black";
    context.fillRect(player.x, player.y, 1, 1);
  } // Seta uma cor e uma posição na tela para as minhas variáveis do objeto game

  for (const fruitId in game.fruits) {
    const fruit = game.fruits[fruitId];
    context.fillStyle = "red";
    context.fillRect(fruit.x, fruit.y, 1, 1);
  } // Seta uma cor e uma posição na tela para as minhas variáveis do objeto game

  requestAnimationFrame(renderScreen);
}
