function Shapes(canvasName) {
  this.canvas = document.getElementById(canvasName)
  this.ctx = this.canvas.getContext("2d")

  this.line = (x1, y1, x2, y2) => {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  this.circle = (x, y, radius, color) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (color) {
      this.ctx.fillStyle = color
      this.ctx.fill();
    }
    this.ctx.stroke();
  }

  this.square = (x, y, size, color) => {

    this.ctx.beginPath();
    this.ctx.rect(x, y, x + size, y + size)
    if (color) {
      this.ctx.fillStyle = color
      this.ctx.fill();
    }
    this.ctx.stroke();
  }

  this.text = (x, y, message) => {
    this.ctx.fillStyle = "black"

    this.ctx.font = "20px Arial"
    this.ctx.fillText(message, x, y)
  }
}