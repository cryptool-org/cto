//////////////////////////
// 	© Phil Pilcrow 2016 //
//////////////////////////
var Routes = function(gridWide) {
	var routes = [];
	var gridWd = gridWide;

	this.getRoutes = function() {
		return routes;
	};

	this.getRouteNames = function() {
		return [
			'Rows from top left',
			'Rows from top right',
			'Rows from bottom left',
			'Rows from bottom right',
			'Alt Rows from top left',
			'Alt Rows from top right',
			'Alt Rows from bottom left',
			'Alt Rows from bottom right',
			'Columns from top left',
			'Columns from top right',
			'Columns from bottom left',
			'Columns from bottom right',
			'Alt Columns from top left',
			'Alt Columns from top right',
			'Alt Columns from bottom left',
			'Alt Columns from bottom right',
			'Diagonals from top left',
			'Diagonals from top right',
			'Diagonals from bottom left',
			'Diagonals from bottom right',
			'Alt Diagonals from top left',
			'Alt Diagonals from top right',
			'Alt Diagonals from bottom left',
			'Alt Diagonals from bottom right',
			'Reverse Diagonals from top left',
			'Reverse Diagonals from top right',
			'Reverse Diagonals from bottom left',
			'Reverse Diagonals from bottom right',
			'Reverse Alt Diagonals from top left',
			'Reverse Alt Diagonals from top right',
			'Reverse Alt Diagonals from bottom left',
			'Reverse Alt Diagonals from bottom right',
			'Clockwise from top left',
			'Clockwise from top right',
			'Clockwise from bottom left',
			'Clockwise from bottom right',
			'Counterclockwise from top left',
			'Counterclockwise from top right',
			'Counterclockwise from bottom left',
			'Counterclockwise from bottom right',
			'Clockwise from middle starting up',
			'Clockwise from middle starting right',
			'Clockwise from middle starting down',
			'Clockwise from middle starting left',
			'Counterclockwise from middle starting up',
			'Counterclockwise from middle starting right',
			'Counterclockwise from middle starting down',
			'Counterclockwise from middle starting left'
		];
	};

	this.keytoRoute = kyToRt;
	function kyToRt(kywd, rt) {
		var key = '';
		for (let i = 0; i < kywd.length; i++) {
			key = key + kywd.charAt(routes[rt][i]);
		}
		return key;
	}

	function flipKeywordRoutes(src, tgt) {
		// Flip matrix vertically
		var i, j;
		for (i = 0; i < gridWd / 2; i += 1) {
			for (j = 0; j < gridWd; j += 1) {
				routes[tgt][i * gridWd + j] = routes[src][(gridWd - i - 1) * gridWd + j];
				routes[tgt][(gridWd - i - 1) * gridWd + j] = routes[src][i * gridWd + j];
			}
		}
		// Copy middle row
		if (gridWd % 2 === 1) {
			i = (gridWd / 2) * gridWd;
			for (j = 0; j < gridWd; j += 1) {
				routes[tgt][i + j] = routes[src][i + j];
			}
		}
	}

	function mirrorKeywordRoutes(src, tgt) {
		// Mirror matrix horizontally
		var i, j;
		for (i = 0; i < gridWd; i += 1) {
			for (j = 0; j < gridWd; j += 1) {
				routes[tgt][i * gridWd + j] = routes[src][i * gridWd + (gridWd - j - 1)];
			}
		}
	}

	function rotateKeywordRoutes(src, tgt) {
		// Rotate matrix 90 deg right
		var i, j;
		for (i = 0; i < gridWd; i += 1) {
			for (j = 0; j < gridWd; j += 1) {
				routes[tgt][i * gridWd + j] = routes[src][(gridWd - j - 1) * gridWd + i];
			}
		}
	}

	this.genRoutes = genRoutes;
	function genRoutes() {
		var gridSize = gridWd * gridWd;
		var count, val, sum;
		var currDiag, loopFrom, loopTo, row, col, dir;
		for (let k = 0; k < 48; k++) {
			routes[k] = [];
		}
		for (let rt = 0; rt < 48; rt += 1) {
			let value = 0;
			switch (rt) {
				case 0: // Horizontal
					for (let k = 0; k < gridSize; k += 1) {
						routes[rt][k] = k;
					}
					break;
				case 1: // Reverse Horizontal
					mirrorKeywordRoutes(0, rt);
					break;
				case 2: // Inverted Horizontal
					flipKeywordRoutes(0, rt);
					break;
				case 3: // Inverted Reverse Horizontal
					flipKeywordRoutes(1, rt);
					break;
				case 4: // Alt Horizontal
					dir = true;
					for (let k = 0; k < gridSize; k += gridWd) {
						if (dir === true) {
							for (let j = 0; j < gridWd; j += 1) {
								routes[rt][k + j] = value;
								value += 1;
							}
						} else {
							for (let j = gridWd - 1; j >= 0; j -= 1) {
								routes[rt][k + j] = value;
								value += 1;
							}
						}
						dir = !dir;
					}
					break;
				case 5: // Reverse Alt Horizontal
					mirrorKeywordRoutes(4, rt);
					break;
				case 6: // Inverted Alt Horizontal
					flipKeywordRoutes(4, rt);
					break;
				case 7: // Inverted Reverse Alt Horizontal
					flipKeywordRoutes(5, rt);
					break;
				case 8: // Vertical
					for (let i = 0; i < gridWd; i += 1) {
						for (let j = 0; j < gridWd; j += 1) {
							routes[rt][j * gridWd + i] = routes[0][i * gridWd + j];
						}
					}
					break;
				case 9: // Reverse Vertical
					mirrorKeywordRoutes(8, rt);
					break;
				case 10: // Inverted Vertical
					flipKeywordRoutes(8, rt);
					break;
				case 11: // Inverted Reverse Vertical
					flipKeywordRoutes(9, rt);
					break;
				case 12: // Alt Vertical
					rotateKeywordRoutes(6, rt);
					break;
				case 13: // Reverse Alt Vertical
					mirrorKeywordRoutes(12, rt);
					break;
				case 14: // Inverted Alt Vertical
					flipKeywordRoutes(12, rt);
					break;
				case 15: // Inverted Reverse Alt Vertical
					flipKeywordRoutes(13, rt);
					break;
				case 16: // Diagonal
					currDiag = 0;
					do {
						if (currDiag < gridWd) { // doing the upper-left triangular half
							loopFrom = 0;
							loopTo = currDiag;
						} else { // doing the bottom-right triangular half
							loopFrom = currDiag - gridWd + 1;
							loopTo = gridWd - 1;
						}
						for (let i = loopFrom; i <= loopTo; i += 1) {
							row = i;
							col = loopTo - i + loopFrom;
							routes[rt][row * gridWd + col] = value;
							value += 1;
						}
						currDiag += 1;
					} while (value < gridSize);
					break;
				case 17: // Reverse Diagonal
					mirrorKeywordRoutes(16, rt);
					break;
				case 18: // Inverted Diagonal
					flipKeywordRoutes(16, rt);
					break;
				case 19: // Inverted Reverse Diagonal
					flipKeywordRoutes(17, rt);
					break;
				case 20: // Alt Diagonal
					// http://rosettacode.org/wiki/Zig-zag_matrix
					currDiag = 0;
					do {
						if (currDiag < gridWd) { // doing the upper-left triangular half
							loopFrom = 0;
							loopTo = currDiag;
						} else { // doing the bottom-right triangular half
							loopFrom = currDiag - gridWd + 1;
							loopTo = gridWd - 1;
						}
						for (let i = loopFrom; i <= loopTo; i += 1) {
							if (currDiag % 2 === 1) { // fill upwards
								row = loopTo - i + loopFrom;
								col = i;
							} else { // fill downwards
								row = i;
								col = loopTo - i + loopFrom;
							}
							routes[rt][row * gridWd + col] = value;
							value += 1;
						}
						currDiag += 1;
					} while (value < gridSize);
					break;
				case 21: // Alt Diagonal from top right
					mirrorKeywordRoutes(20, rt);
					break;
				case 22: // Alt Diagonal from top right
					flipKeywordRoutes(20, rt);
					break;
				case 23: // Alt Diagonal from top right
					flipKeywordRoutes(21, rt);
					break;
				case 24: // Reverse Diagonal top left
					rotateKeywordRoutes(18, rt);
					break;
				case 25: // Reverse Diagonal top right
					mirrorKeywordRoutes(24, rt);
					break;
				case 26: // Reverse Diagonal bottom right
					flipKeywordRoutes(24, rt);
					break;
				case 27: // Reverse Diagonal bottom left
					mirrorKeywordRoutes(26, rt);
					break;
				case 28: // Alt-Reverse-Diagonal
					rotateKeywordRoutes(22, rt);
					break;
				case 29: // Reverse Alt-Reverse-Diagonal
					mirrorKeywordRoutes(28, rt);
					break;
				case 30: // Inverted Alt-Reverse-Diagonal
					flipKeywordRoutes(28, rt);
					break;
				case 31: // Inverted Reverse Alt-Reverse-Diagonal
					flipKeywordRoutes(29, rt);
					break;
				case 32: // Clockwise
					// http://rosettacode.org/wiki/Spiral_matrix
					sum = -1;
					count = gridWd;
					val = -gridWd;
					do {
						val = -1 * val / gridWd;
						for (let i = 0; i < count; i += 1) {
							sum += val;
							routes[rt][sum] = value;
							value += 1;
						}
						val *= gridWd;
						count -= 1;
						for (let i = 0; i < count; i += 1) {
							sum += val;
							routes[rt][sum] = value;
							value += 1;
						}
					} while (count > 0);
					break;
				case 33: // Clockwise from top right
					rotateKeywordRoutes(32, rt);
					break;
				case 34: // Clockwise, bottom left
					rotateKeywordRoutes(33, rt + 1);
					break;
				case 35: // Clockwise from bottom right
					rotateKeywordRoutes(35, rt - 1);
					break;
				case 36: // Anti-Clockwise
					mirrorKeywordRoutes(33, rt);
					break;
				case 37: // Reverse Anti-Clockwise
					mirrorKeywordRoutes(32, rt);
					break;
				case 38: // Inverted Reverse Anti-Clockwise
					mirrorKeywordRoutes(35, rt);
					break;
				case 39: // Inverted Clockwise
					mirrorKeywordRoutes(34, rt);
					break;
				case 40: // Clockwise from middle starting up
					for (let i = 0; i < gridWd; i += 1) {
						for (let j = 0; j < gridWd; j += 1) {
							routes[rt][i * gridWd + j] = gridSize - 1 - routes[36][i * gridWd + j];
						}
					}
					break;
				case 41: // Clockwise from middle starting right
					rotateKeywordRoutes(40, rt);
					break;
				case 42: // Clockwise from middle starting down
					rotateKeywordRoutes(41, rt);
					break;
				case 43: // Clockwise from middle starting left
					rotateKeywordRoutes(42, rt);
					break;
				case 44: // Counterclockwise from middle starting up
					flipKeywordRoutes(42, rt);
					break;
				case 45: // Counterclockwise from middle starting right
					flipKeywordRoutes(41, rt);
					break;
				case 46: // Counterclockwise from middle starting down
					flipKeywordRoutes(40, rt);
					break;
				case 47: // Counterclockwise from middle starting left
					flipKeywordRoutes(43, rt);
					break;
				default:
					break;
			}
		}
		return routes;
	}
};
export default Routes;
