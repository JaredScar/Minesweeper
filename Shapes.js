function Shapes(canvasName) {
  this.canvas = document.getElementById(canvasName)
  this.ctx = this.canvas.getContext("2d")

  this.circle = (x, y, radius, color, lineWidth) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (color) {
      this.ctx.fillStyle = color
      this.ctx.fill();
    }

    if (lineWidth) {
      this.ctx.lineWidth = lineWidth
    }
    this.ctx.stroke();
  }

  this.square = (x, y, size, color, lineWidth) => {

    this.ctx.beginPath();
    this.ctx.rect(x, y, size, size)
    if (color) {
      this.ctx.fillStyle = color
      this.ctx.fill();
    }

    if (lineWidth) {
      this.ctx.lineWidth = lineWidth
    }
    this.ctx.stroke();
  }

  this.text = (x, y, message) => {
    this.ctx.fillStyle = "black"

    this.ctx.font = "20px Arial"
    this.ctx.fillText(message, x, y)
  }

  this.clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}