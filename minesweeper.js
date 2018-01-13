var grid = []
var w = 30
var gameOver = false

var cols, rows

var difficulty = 50

var bombLocs = []

var ticker
var draw


function setup(canvasName) {
  draw = new Shapes(canvasName)

  cols = Math.floor(draw.canvas.width / w)
  rows = Math.floor(draw.canvas.height / w)

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      grid.push(new Cell(i, j, w, canvasName))
    }
  }

  for (var i = 0; i < difficulty; i++) {
    var r = Math.floor(Math.random() * cols * rows)
    //console.log(r)
    if (grid[r].bomb === false) {
      grid[r].bomb = true;
      bombLocs.push(r);
    } else {
      i--
    }
  }

  for (var i = 0; i < grid.length; i++) {
    grid[i].neighborCount(grid)
  }

  ticker = setInterval(update, 1000)
  update()
}

function update() {
  console.log("tick")

  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }

  if (gameOver) {
    for (var i = 0; i < grid.length; i++) {
      if (grid[i].bomb && !hasWon()) {
        grid[i].revealed = true;
      }
    }

    setTimeout(clearInterval(ticker), 100)
    console.log('ending game loop');
  }

}

function mouseClick(event) {
  console.log("click")

  var x = event.x - draw.canvas.offsetLeft
  var y = event.y - draw.canvas.offsetTop

  for (var i = 0; i < grid.length && !gameOver; i++) {
    // console.log( grid[ i ] );

    if (grid[i].clicked(x, y)) {

      console.log(grid[i]);
      /*
          if cell with nothing around it is clicked
          click on everything around it until a non-zero number is found
          */

      grid[i].reveal();

      if (grid[i].bomb) {
        gameOver = true;
      } else if (hasWon()) {
        winner();
      }

    }
  }
}

function hasWon() {
  return grid.every(function(item, index, arr) {
    if (item.bomb) {
      return !item.revealed
    } else {
      return item.revealed
    }
  })
}

function winner() {
  setTimeout(function() {
    alert("YOU WON")
  }, 500)
  gameOver = true
}