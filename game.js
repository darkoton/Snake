class Game {
  constructor(element) {
    this.positions = []

    this.body = document.querySelector(element)
    this.body.classList.add('game-body')
    this.pauseState = true

    this.score = document.createElement('span')
    this.score.classList.add('score')
    this.score.textContent = 0


    for (let x = 1; x < 21; x++) {
      for (let y = 1; y < 21; y++) {
        {
          this.positions.push({
            x,
            y
          })
        }
      }
    }

    Array.from(new Array(4)).forEach(() => {
      const line = document.createElement('line')
      line.classList.add('line')
      this.body.appendChild(line)
    })

    this.body.appendChild(this.score)

    this.keyEvents()

    this.eat = new Eat()
    this.snake = new Snake()
    this.snake.observer = this
    this.spawnSnake()
    this.spawnEat()
    this.pauseState = false
  }

  start() {
    this.snake.move()
  }
  pause() {
    this.snake.stop()
  }

  keyEvents() {
    window.addEventListener('keyup', (event) => {
      // if (event.code == 'Space') {
      //   this.pauseState = !this.pauseState
      //   if (!this.pauseState) {
      //     this.start()
      //   } else {
      //     this.pause()
      //   }
      // }

      if (event.code == 'ArrowUp' || event.code == 'KeyW') {
        this.snake.rotate('u');
      }
      if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        this.snake.rotate('r');
      }
      if (event.code == 'ArrowDown' || event.code == 'KeyS') {
        this.snake.rotate('d');
      }
      if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        this.snake.rotate('l');
      }
    })
  }

  spawnSnake() {
    this.snake.spawn()
    this.renderSnake()
  }

  renderSnake() {
    for (let index = 0; index < this.snake.elements.length; index++) {
      this.snake.elements[index].style.gridColumn = this.snake.elements[index].x
      this.snake.elements[index].style.gridRow = this.snake.elements[index].y
    }

    this.body.append(...this.snake.elements)
  }

  spawnEat() {
    this.eat.spawn()
    this.renderEat()
  }

  renderEat() {
    const emptyPositions = this.positions.filter(position => {
      return !this.snake.elements.some(el => el.x == position.x && el.y == position.y)
    })

    const random = Math.random()

    const position = emptyPositions[(emptyPositions.length * random).toFixed()]

    Object.assign(this.eat.berry, position)
    this.eat.berry.style.gridColumn = position.x
    this.eat.berry.style.gridRow = position.y

    this.body.appendChild(this.eat.berry)
  }

  eatBerry() {
    this.eat.remove()
    this.spawnEat()
    this.score.textContent = Number(this.score.textContent) + 1
  }

  growRender() {
    const element = this.snake.elements[this.snake.elements.length - 1]

    element.style.gridColumn = element.x
    element.style.gridRow = element.y
    console.dir(element);
    this.body.appendChild(element)
  }

  onLose() {
    this.loseCallback ? this.loseCallback() : ''
  }

  lose(callback) {
    this.loseCallback = callback
  }

}


const game = new Game('#game')

