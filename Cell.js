function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function Cell(i, j, size, canvasName) {
  this.i = i
  this.j = j
  this.bomb = false
  this.number = 0
  this.revealed = false
  this.flagged = false

  this.x = i * size
  this.y = j * size
  this.size = size

  this.neighbors = []

  this.draw = new Shapes(canvasName)

  this.show = () => {

    this.draw.square(this.x, this.y, this.size, "", 1)
    if (this.revealed) {
      if (this.bomb) {

        this.draw.circle(
          this.x + (this.size / 2),
          this.y + (this.size / 2),
          this.size / 4,
          "red",
          3
        )
      } else {

        this.draw.square(this.x, this.y, this.size, "grey", 1)

        if (this.number !== 0) {
          this.draw.text(
            this.x + (this.size / 3),
            this.y + (this.size / 1.5),
            this.number
          )
        }
      }
    }

    if (this.flagged) {
      this.draw.text(
        this.x + 10,
        this.y + 23,
        "?"
      )
    }
  }

  this.neighborCount = (grid) => {
    var total = 0

    // start in the top left and go clockwise
    var is = [-1, -1, -1, 0, 1, 1, 1, 0]
    var js = [-1, 0, 1, 1, 1, 0, -1, -1]

    // console.log( "clicked on: " + this.i + ', ' + this.j )

    for (var i = 0; i < 8; i++) {
      var pos = grid[index(this.i + is[i], this.j + js[i])]

      if (pos) {
        this.neighbors.push(pos);
        if (pos.bomb) {
          total++
        }
      }

      // console.log( pos )

      // console.log( "neighbor " + i + ': ' + pos.i + ', ' + pos.j )
      // console.log( pos.bomb )

    }

    this.number = total
    // console.log( this.number )
  }

  this.clicked = (x, y) => {
    return (
      x > this.x &&
      x < this.x + this.size &&
      y > this.y &&
      y < this.y + this.size
    )
  }

  this.reveal = () => {
    this.revealed = true;
    if (this.flagged) {
      this.flagged = false
    }
    if (!this.bomb && this.number === 0) {
      for (var i = 0; i < this.neighbors.length; i++) {
        if (!this.neighbors[i].revealed) {
          this.neighbors[i].reveal()
        }
      }
    }
  }

  this.flag = () => {
    this.flagged = !this.flagged
  }
}