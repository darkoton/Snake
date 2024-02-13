let isMobile = {
  Android: function () { return navigator.userAgent.match(/Android/i); },
  BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
  iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
  Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
  Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
  any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any()) {
  document.body.classList.add("_touch");
} else {
  document.body.classList.add("_pc");
}

const menu = document.querySelector('.game-menu')
const lose = document.querySelector('.game-lose')

function menuStart() {
  menu.classList.add('hidden')
  game.start();
  game.pauseState = false;

}

window.addEventListener('keyup', (event) => {
  if (event.code == 'Escape') {
    menu.classList.remove('hidden')
    game.pause()
  }
})

game.lose(() => {
  lose.classList.add('visible')
})

function loseClose() {
  lose.classList.remove('visible')
}

function rotateUp() {
  game.snake.rotate('u')
}
function rotateRight() {
  game.snake.rotate('r')
}
function rotateDown() {
  game.snake.rotate('d')
}
function rotateLeft() {
  game.snake.rotate('l')
}