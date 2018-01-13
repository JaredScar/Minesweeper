var grid = []
var w = 30

var cols, rows

var difficulty = 50;


function setup(ctx) {
	var draw = new Draw(ctx)

	cols = Math.floor(ctx.width / w)
	console.log(cols);


}

function update() {


}


var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
setup(ctx)