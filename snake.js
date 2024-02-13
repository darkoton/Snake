class Snake {
  constructor() {
    this.elements = []
    this.moveInterval = null
    this.death = false
    this.rotatePos = []
    this.rotateState = false
  }

  spawn() {
    const names = ['head', 'body1', 'body2']
    const params = {
      head: {
        x: 4,
        y: 4,
        move: 'r'
      },
      body1: {
        x: 3,
        y: 4,
        move: 'r'
      },
      body2: {
        x: 2,
        y: 4,
        move: 'r'
      },
    }

    for (let i = 0; i < names.length; i++) {
      const element = document.createElement('div')
      element.classList.add(names[i])
      element.classList.add('snake')
      element.classList.add('body')

      Object.assign(element, params[names[i]])

      this.elements.push(element)
    }

    this.head = this.elements[0]

    return this.elements

  }

  move() {
    this.moveInterval = setInterval(() => {
      if (this.end()) {
        return
      }


      for (let index = 0; index < this.elements.length; index++) {

        if (this.elements[index].move == 'r') {
          ++this.elements[index].x
        } else if (this.elements[index].move == 'l') {
          --this.elements[index].x
        } else if (this.elements[index].move == 'u') {
          --this.elements[index].y
        } else if (this.elements[index].move == 'd') {
          ++this.elements[index].y
        }


        this.elements[index].style.gridColumn = `${this.elements[index].x}`
        this.elements[index].style.gridRow = `${this.elements[index].y}`

        const rotateIndex = this.rotatePos.findIndex(el => el = el.x == this.elements[index].x && el.y == this.elements[index].y)
        if (-1 < rotateIndex) {
          this.elements[index].move = this.rotatePos[rotateIndex].move
          ++this.rotatePos[rotateIndex].count

          if (this.rotatePos[rotateIndex].count == this.elements.length) {
            this.rotatePos.splice(rotateIndex, 1)
          }
        }
      }


      if (this.observer.eat.berry.x == this.head.x && this.observer.eat.berry.y == this.head.y) {
        this.observer.eatBerry()
        this.grow()
      }
      this.rotateState = false
    }, 200)
  }

  rotate(side) {
    if (!this.rotateState && !this.death) {
      if ((side == 'u' && this.head.move == 'd')
        || (side == 'd' && this.head.move == 'u')
        || (side == 'l' && this.head.move == 'r')
        || (side == 'r' && this.head.move == 'l')
        || side == this.head.move) {
        return
      }
      this.rotateState = true

      this.rotatePos.push({
        x: this.head.x,
        y: this.head.y,
        move: side,
        count: 1
      })

      this.head.move = side

      this.head.style.transform = `rotate(${side == 'r' ? 0 : side == 'd' ? 90 : side == 'l' ? 180 : side == 'u' ? 270 : ''}deg)`
    }
  }

  end() {

    if ((this.head.move == 'r' && (this.elements.find(el => el.x == this.head.x + 1 && el.y == this.head.y) || this.head.x + 1 >= 21))
      || (this.head.move == 'l' && (this.elements.find(el => el.x == this.head.x - 1 && el.y == this.head.y) || this.head.x - 1 <= 0))
      || (this.head.move == 'u' && (this.elements.find(el => el.x == this.head.x && el.y == this.head.y - 1) || this.head.y - 1 <= 0))
      || (this.head.move == 'd' && (this.elements.find(el => el.x == this.head.x && el.y == this.head.y + 1) || this.head.y + 1 >= 21))) {
      console.log('end');
      this.death = true
      this.stop()
      this.observer.onLose()
      return true
    }

    return false
  }

  stop() {
    clearInterval(this.moveInterval)
  }

  grow() {
    const end = this.elements[this.elements.length - 1]

    const element = document.createElement('div')
    element.classList.add('body')
    element.classList.add('snake')

    element.move = end.move
    element.x = end.move == 'r' ? end.x - 1 : end.move == 'l' ? end.x + 1 : end.x
    element.y = end.move == 'u' ? end.y + 1 : end.move == 'd' ? end.y - 1 : end.y

    this.elements.push(element)

    this.observer.growRender()
  }
}