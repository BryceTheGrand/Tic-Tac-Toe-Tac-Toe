var turn = 0;
var grid = [];
var endWin = 0;


function setup() {

	createCanvas(600, 600);

	for (let i = 0; i < 9; i++) {

		grid.push(new TicTacToe());

	}

	textAlign(CENTER);
	textSize(48);

}

function draw() {

	background(5);
	drawTicTacToe();

	fill(255, 100);
	noStroke();
	text((turn == 1 || turn == 0) ? "X" : "O", mouseX, mouseY + 20);

	noFill();
	stroke(255);

	for (let i = 0; i < 9; i++) {

		if (grid[i].active) {

			rect((i % 3) * width / 3, (floor(i / 3)) * height / 3, (width / 3) - 1, (height / 3) - 1);

		}

	}

	fill(255);
	noStroke();

	drawXOs();

	textSize(200);

	for (let i = 0; i < 9; i++) {

		if (grid[i].winner != 0) {

			text(((grid[i].winner == 1) ? "X" : "O"), (i % 3) * width / 3 + width / 6, (floor(i / 3)) * height / 3 + height / 3.5);

		}

	}

	textSize(48);


	if (endWin != 0) {

		textSize(width);
		text((endWin == 1 ? "X" : "O"), width / 2, height / 2 + 210);
		textSize(48);
		noLoop();

	}


}


function drawXOs() {

	for (let index = 0; index < 9; index++) {


		for (let i = 0; i < 3; i++) {

			for (let j = 0; j < 3; j++) {

				if (grid[index].grid[i][j] == 1) {

					text("X", (index % 3) * width / 3 + j * width / 9 + 35, (floor(index / 3)) * height / 3 + i * height / 9 + 48);

				} else if (grid[index].grid[i][j] == -1) {

					text("O", (index % 3) * width / 3 + j * width / 9 + 35, (floor(index / 3)) * height / 3 + i * height / 9 + 48);

				}

			}

		}


	}

}


function drawTicTacToe() {

	stroke(255);

	for (let row = 0; row < 3; row++) {

		for (let col = 0; col < 3; col++) {

			for (let x = 1; x < 3; x++) {

				line(x * width / 9 + row * width / 3, 20 + col * height / 3, x * width / 9 + row * width / 3, height / 3 - 20 + col * height / 3);

			}

			for (let y = 1; y < 3; y++) {

				line(20 + row * width / 3, y * height / 9 + col * height / 3, width / 3 - 20 + row * width / 3, y * height / 9 + col * height / 3);

			}

		}


	}


}


function mouseClicked() {

	let colBoard = floor(mouseX / width * 3);
	let rowBoard = floor(mouseY / height * 3);

	let col = floor(mouseX / width * 9);
	let row = floor(mouseY / height * 9);


	if (turn == 1 || turn == 0) {

		if ((grid[colBoard + rowBoard * 3].active || turn == 0) && grid[colBoard + rowBoard * 3].grid[row % 3][col % 3] == 0 && grid[colBoard + rowBoard * 3].winner == 0) {

			grid[colBoard + rowBoard * 3].grid[row % 3][col % 3] = 1;
			grid[colBoard + rowBoard * 3].active = false;

			if (grid[col % 3 + (row % 3) * 3].winner == 0) {

				grid[col % 3 + (row % 3) * 3].active = true;
				turn = 2;

			} else {

				turn = 3;

			}

		}

	} else if (turn == 2 || turn == 3) {

		if ((grid[colBoard + rowBoard * 3].active || turn == 3) && grid[colBoard + rowBoard * 3].grid[row % 3][col % 3] == 0 && grid[colBoard + rowBoard * 3].winner == 0) {

			grid[(colBoard + rowBoard * 3)].grid[row % 3][col % 3] = -1;
			grid[colBoard + rowBoard * 3].active = false;

			if (grid[col % 3 + (row % 3) * 3].winner == 0) {

				grid[col % 3 + (row % 3) * 3].active = true;
				turn = 1;

			} else {

				turn = 0;

			}

		}

	}

	checkTriplet(colBoard + rowBoard * 3);

	let count = 0;

	for (let i = 0; i < 9; i++) {

		if (grid[i].active) count++;

	}

	if (count == 0) {

		if (turn == 2) turn = 3;
		else if (turn == 1) turn = 0;

	}

}


function checkTriplet(index) {


	grid[index].checkWin();


}


function checkGameEnd() {

	for (let i = 0; i < 3; i++) {

		let rowSum = 0;

		for (let j = 0; j < 3; j++) {

			rowSum += grid[j + (i % 3) * 3].winner;

		}

		if (rowSum == 3)
			endWin = 1;

		else if (rowSum == -3)
			endWin = -1;

	}


	for (let i = 0; i < 3; i++) {

		let colSum = 0;

		for (let j = 0; j < 3; j++) {

			colSum += grid[i + (j % 3) * 3].winner;

		}

		if (colSum === 3)
			endWin = 1;

		else if (colSum === -3)
			endWin = -1;
	}


	if (grid[0].winner + grid[4].winner + grid[8].winner == 3)
		endWin = 1;

	else if (grid[0].winner + grid[4].winner + grid[8].winner == -3)
		endWin = -1;

	if (grid[6].winner + grid[4].winner + grid[2].winner == 3)
		endWin = 1;

	else if (grid[6].winner + grid[4].winner + grid[2].winner == -3)
		endWin = -1;

}


function keyPressed() {

	if (key == 'd') {

		print(grid, "\n", turn);

	}

}