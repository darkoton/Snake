class Eat {
  constructor() {
    this.berry = null;
  }
  spawn() {
    this.berry = document.createElement('div')
    this.berry.classList.add('berry')
  }
  remove() {
    this.berry.remove()
  }
}