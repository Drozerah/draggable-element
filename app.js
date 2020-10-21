// get the element to drag
const element = document.querySelector('.element')
// turn the element to a draggable element
dragElement(element)
// define element to drag
function dragElement (elm) {
  let pos1 = 0
  let pos2 = 0
  let pos3 = 0 // mouseX position when dragMouseDown start
  let pos4 = 0 // mouseY position when dragMouseDown start

  elm.onmousedown = dragMouseDown

  // ƒ to be called when the mouse is down on the drag element
  function dragMouseDown (e) {
    e.preventDefault()
    if (!e.target.classList.contains('dragIndicator')) {
      return false
    } else {
      // add class isDrag to elm
      elm.classList.add('dragActive')
      // get current mouse position
      pos3 = e.clientX // X axis
      pos4 = e.clientY // Y axis
      // ƒ to be call whenever the mouse move
      document.onmousemove = elementDrag
      // ƒ to be call when the mouseup event occur
      document.onmouseup = closeDragElement
    }
  }

  // ƒ to move the draggable element
  function elementDrag (e) {
    e.preventDefault()

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY

    // set the draggable element new position:
    if (elm.offsetTop <= 0) { // top limit
      elm.style.top = 1 + 'px'
      closeDragElement()
      elm.style.top = 1 + 'px'
    } else if (elm.offsetLeft - pos1 + elm.clientWidth >= window.innerWidth) { // right limit
      elm.style.right = 1 + 'px'
      closeDragElement()
      elm.style.right = 1 + 'px'
    } else if (elm.offsetTop - pos2 + elm.clientHeight >= window.innerHeight) { // bottom limit
      elm.style.bottom = 1 + 'px'
      closeDragElement()
      elm.style.bottom = 1 + 'px'
    } else if (elm.offsetLeft <= 0) { // left limit
      elm.style.left = 1 + 'px'
      closeDragElement()
      elm.style.left = 1 + 'px'
    } else { // drag the element inside limits
      elm.style.top = (elm.offsetTop - pos2) + 'px'
      elm.style.left = (elm.offsetLeft - pos1) + 'px'
    }
  }

  // stop moving the element when the mouse button is released
  function closeDragElement () {
    // remove class isDrag from elm
    elm.classList.remove('dragActive')
    document.onmouseup = null
    document.onmousemove = null
  }
}
