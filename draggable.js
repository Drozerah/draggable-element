class Draggable {
  constructor (element) {
    this.element = element
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0 // mouseX position when DragOnMouseDown start
    this.pos4 = 0 // mouseY position when DragOnMouseDown start
  }

  /**
   * DragOnMouseDown
   * - method to be called when the mouse is down on the drag element
   * @param {onmousedown} e - The observable mouse down event.
   * @listens onmousedown
   */
  DragOnMouseDown (e) {
    // console.log('ƒ DragOnMouseDown call') // !DEBUG
    e.preventDefault()
    if (!e.target.classList.contains('dragIndicator')) {
      return false
    } else {
      // add class isDrag to this.element
      this.element.classList.add('dragActive')
      // get current mouse position
      this.pos3 = e.clientX // X axis
      this.pos4 = e.clientY // Y axis
      // ƒ to be call whenever the mouse move
      document.onmousemove = this.DragOnMouseMove.bind(this)
      document.onmouseup = this.DragOnMouseUp.bind(this)
    }
  }

  /**
   * DragOnMouseMove
   * - method to be called to move the draggable element
   * @param {onmousemove} e - The observable mouse move event.
   * @listens onmousemove
   */
  DragOnMouseMove (e) {
    // console.log('ƒ DragOnMouseMove call') // !DEBUG
    e.preventDefault()
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX
    this.pos2 = this.pos4 - e.clientY
    this.pos3 = e.clientX
    this.pos4 = e.clientY

    const element = this.element

    // set the draggable element new position:
    if (element.offsetTop <= 0) { // top limit
      element.style.top = 1 + 'px'
      this.DragOnMouseUp()
      element.style.top = 1 + 'px'
    } else if (element.offsetLeft - this.pos1 + element.clientWidth >= window.innerWidth) { // right limit
      element.style.right = 1 + 'px'
      this.DragOnMouseUp()
      element.style.right = 1 + 'px'
    } else if (this.element.offsetTop - this.pos2 + element.clientHeight >= window.innerHeight) { // bottom limit
      element.style.bottom = 1 + 'px'
      this.DragOnMouseUp()
      element.style.bottom = 1 + 'px'
    } else if (element.offsetLeft <= 0) { // left limit
      element.style.left = 1 + 'px'
      this.DragOnMouseUp()
      element.style.left = 1 + 'px'
    } else { // drag the element inside limits
      element.style.top = (element.offsetTop - this.pos2) + 'px'
      element.style.left = (element.offsetLeft - this.pos1) + 'px'
    }
  }

  /**
   * DragOnMouseUp
   * - stop moving the element when the mouse button is released
   */
  DragOnMouseUp () {
    // console.log('ƒ DragOnMouseUp call') // !DEBUG
    // remove class isDrag from this.element
    this.element.classList.remove('dragActive')
    document.onmouseup = null
    document.onmousemove = null
  }

  init () {
    // console.log('ƒ Draggable call init') // !DEBUG
    // console.log(this.element)
    this.element.onmousedown = this.DragOnMouseDown.bind(this)
  }
}

new Draggable(document.querySelector('.element_2')).init()
new Draggable(document.querySelector('.element_3')).init()
