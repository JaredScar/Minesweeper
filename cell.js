function Cell(i, j, size) {
	this.i = i
	this.j = j
	this.bomb = false
	this.flagged = false
	this.number = 0
	this.revealed = false

	this.x = i * size
	this.y = j * size
	this.size = size

	this.neighbors = []

	this.show = (ctx) => {
		var draw = new Draw(ctx)
		draw.line(this.x, this.y, this.x + this.size, this.y + this.size)
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

	this.clicked = () => {

	}

	this.reveal = () => {
		this.revealed = true
		if (!this.bomb && this.number === 0) {
			for (let i = 0; i < this.neighbors.length; i++) {
				this.neighbors[i].reveal()
			}
		}
	}

	this.flag = () => {
		this.flagged = !this.flagged
	}
}