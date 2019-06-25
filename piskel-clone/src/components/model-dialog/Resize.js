import './index.scss';

export default class Resize {
  constructor() {
    this.form = document;
    this.currentSize = null;
  }

  init() {
    const resizeButton = this.form.querySelector('.resize-button');
    resizeButton.addEventListener('mousedown', this.mouseDown.bind(this));
    const resizeArr = this.form.getElementsByName('resize');
    this.currentSize = +[].filter.call(resizeArr, item => item.checked)[0].value;
  }

  mouseDown() {
    console.log(this.form);
    // const canvas = this.form.querySelector('.canvas-conteiner__canvas');
    // const ctx = canvas.getContext('2d');
    // ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    // ctx.scale(2, 2);
  }
}