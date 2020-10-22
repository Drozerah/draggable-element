// Copyright (c) 2020 Thomas G. drozerah@gmail.com
// All rights reserved.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.


/**
 * Creates a new draggable element.
 *
 * @class
 * @fileOverview Various tool functions.
 * @author Drozerah
 * @version 1.1.0
 * @description - This class instanciate a draggable element
 */
class Draggable {
  /**
   * @constructs Draggable
   * @param  {Object} element - The DOM element to instanciate
   * @property {Number} pos1 - The element x calculated position
   * @property {Number} pos2 - The element y calculated position
   * @property {Number} pos3 - The mouse x position when DragOnMouseDown start
   * @property {Number} pos4 - The mouse y position when DragOnMouseDown start
   * @property {Boolean} isLimit - Define whether or not the element stay in the visible window
   * @description - This class instanciate a draggable element
   */
  constructor (element) {
    this.element = element
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
    this.isLimit = true
  }

  /**
   * DragOnMouseDown
   *
   * @description - Method to be called when the mouse is down on the draggable element
   * @param {onmousedown} e - The observable on mouse down event.
   * @listens onmousedown
   * @returns {void}
   */
  DragOnMouseDown (e) {
    // console.log('ƒ DragOnMouseDown call') // !DEBUG
    e.preventDefault()
    if (!e.target.classList.contains('dragIndicator')) {
      return false
    } else {
      // ordering element z-index
      this.zOrder()
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
   * zOrder
   * 
   * - check all draggable elements by there computed CSS z-index properties
   * - then get the higher existing z-index zIndexMax from group
   * - then increase the current draggable element by zIndexMax + 1
   * @description - Order multiple draggagle elements by there z-index CSS properties
   * @returns {void}
   */
  zOrder () {
    // console.log('ƒ zOrder call') // !DEBUG
    const zIndexAll = []
    Array.from(document.querySelectorAll('.draggable'))
      .filter(element => element !== this.element) // exclude current draggable element
      .forEach(element => zIndexAll.push(getComputedStyle(element).zIndex)) // update zIndexAll array
    if (zIndexAll.length) {
      const zIndexMax = Math.max.apply(Math, zIndexAll) // get largest z-index
      this.element.style.zIndex = zIndexMax + 1 // increase current z-index
    }
  }

  /**
   * DragOnMouseMove
   *
   * @description - Method to be called to move the draggable element
   * @param {onmousemove} e - The observable mouse move event.
   * @listens onmousemove
   * @returns {void}
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

    if (this.isLimit) {
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
    } else {
      element.style.top = (element.offsetTop - this.pos2) + 'px'
      element.style.left = (element.offsetLeft - this.pos1) + 'px'
    }
  }

  /**
   * DragOnMouseUp
   *
   * @description - Stop moving the element when the mouse button is realeased
   * @returns {void}
   */
  DragOnMouseUp () {
    // console.log('ƒ DragOnMouseUp call') // !DEBUG
    // remove class isDrag from this.element
    this.element.classList.remove('dragActive')
    document.onmouseup = null
    document.onmousemove = null
  }

  /**
   * startAt
   * 
   * - this method is chainable with isLimit method
   * @description - Set the x and y start position of the draggable element
   * @param {Object} option The starting x and y position
   * @returns {this} The draggable element from the constructor
   */
  startAt (option) {
    // console.log('ƒ startAt call') // !DEBUG
    if (!option) throw new Error('missing function parameter')
    this.element.style.left = option.x + 'px'
    this.element.style.top = option.y + 'px'
    return this
  }

  /**
   * isLimited
   *
   * @description - Set whether or not the draggable element must stay in the visible window
   * @param {Boolean} boolean
   * @returns {this} The draggable element from the constructor
   */
  isLimited (boolean) {
    // console.log('ƒ isLimited call') // !DEBUG
    if (typeof boolean !== 'boolean') throw new TypeError('parameter must be a boolean')
    if (boolean) {
      this.isLimit = boolean // true
    } else {
      this.isLimit = boolean // false
    }
    return this
  }

  /**
   * init
   *
   * - this method is chainable with the startAt and isLimit methods
   * @description - Initialize a draggable element
   * @returns {this} The draggable element from the constructor
   */
  init () {
    // console.log('ƒ Draggable call init') // !DEBUG
    // console.log(this.element)
    this.element.onmousedown = this.DragOnMouseDown.bind(this)
    return this
  }
}

export default Draggable
