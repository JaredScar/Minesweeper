/*
THINGS TO ADD

- ability to change difficulty
- timer
- score board if possible, top 5
- button to start new game so the page does have to be reloaded
*/


let grid = []
let w = 30 // size of squares
let gameOver
let cols, rows
let difficulty = 50
let draw

let winner, loser

function load(canvasName) {
  setup(canvasName)
  alert("1) Click on a box\n2) The number in the box shows how many bombs are in the surrounding boxes\n3) Press alt and click on a box at the same time to flag the box as a bomb\n4) You won the game when theres nothing but bombs left\n\n Good Luck!\n(the game will start over after three seconds of the game ending)")
}

function setup(canvasName) {
  gameOver = false
  grid = []
  draw = new Shapes(canvasName)

  cols = Math.floor(draw.canvas.width / w)
  rows = Math.floor(draw.canvas.height / w)

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      grid.push(new Cell(i, j, w, canvasName))
    }
  }

  for (let i = 0; i < difficulty; i++) {
    let r = Math.floor(Math.random() * cols * rows)
    //console.log(r)
    if (grid[r].bomb === false) {
      grid[r].bomb = true;
    } else {
      i--
    }
  }

  for (let i = 0; i < grid.length; i++) {
    grid[i].neighborCount(grid)
  }

  update()
}

function update() {
  draw.clear()

  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }

  if (gameOver) {
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].bomb && !hasWon()) {
        grid[i].revealed = true;
      }
    }
    setTimeout(function() {
      setup(draw.canvas.id)

      if (hasWon()) {
        winner.style.display = "none"
      } else {
        loser.style.display = "none"
      }


    }, 3000);
  }

}

function mouseClick(event) {
  // console.log(event);

  let x = event.x - draw.canvas.offsetLeft
  let y = event.y - draw.canvas.offsetTop

  for (let i = 0; i < grid.length && !gameOver; i++) {

    if (event.shiftKey && grid[i].clicked(x, y)) {
      grid[i].flag()
    } else if (grid[i].clicked(x, y)) {
      /*
              if cell with nothing around it is clicked
              click on everything around it until a non-zero number is found
              */

      grid[i].reveal();

      // if (grid[i].flagged) {
      //   grid[i].flagged = false;
      // }

      if (grid[i].bomb) {
        gameOver = true;
        loser = document.getElementById("loser")
        loser.style.display = "inline"
        update()
      } else if (hasWon()) {
        gameOver = true
        winner = document.getElementById("winner")
        winner.style.display = "inline"
      }

    }
  }
  update()
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