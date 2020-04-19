export const createBoard = (n, numMines) => {

	if (numMines > (n**2)) {
		throw new Error('number of mines exceeds size of board!');
	}
	const board = [];
	for (let i = 0; i < n; i++) {
		board[i] = createRow(n);
	}
	placeMines(board, n, numMines);
	return board;
};

const createRow = (n) => {
	const newRow = [];
	for (let j = 0; j < n; j++) {
		newRow[j] = { clicked: false, nearby: 0, isMine: false, flagged: false, };
	}
	return newRow;
};

const placeMines = (board, n, numsMines) => {
	let minesPlaced = 0;
	while(minesPlaced < numsMines) {
		const row = Math.floor(Math.random() * n);
		const col = Math.floor(Math.random() * n);
		if (!board[row][col].isMine) {
			board[row][col].isMine = true;
			minesPlaced++;
			tallyAdjacents(board, row, col, n);
		}
	}
}

const tallyAdjacents = (board, row, col, n) => {
	// staight up
	if ((row - 1) >= 0) {
		board[row - 1][col].nearby++;
	}
	// diagonal up-right
	if ((row - 1) >= 0 && (col + 1) < n) {
		board[row - 1][col + 1].nearby++;
	}
	// straight right
	if ((col + 1) < n) {
		board[row][col + 1].nearby++;
	}
	// diagonal down-right
	if ((row + 1) < n && (col + 1) < n) {
		board[row + 1][col + 1].nearby++;
	}
	// straight down
	if ((row + 1) < n) {
		board[row + 1][col].nearby++;
	}
	// diagonal down-left
	if ((row + 1) < n && (col - 1) >= 0) {
		board[row + 1][col - 1].nearby++;
	}
	// straight left
	if ((col - 1) >= 0) {
		board[row][col - 1].nearby++;
	}
	// diagonal up-left
	if ((row - 1) >= 0 && (col - 1) >= 0) {
		board[row - 1][col - 1].nearby++;
	}
}

export const updateClickedStatus = (board, row, col) => {
	let numClicks = 0;
	const cell = board[row][col]
	cell.clicked = true;
	numClicks++;
	if (cell.nearby === 0) {
		numClicks += radiateClicked(board, row, col)
	}
	return numClicks;
}

const radiateClicked = (board, row, col) =>{
	const n = board.length; // breaks if not square
	let numClicks = 0;
	// staight up
	if ((row - 1) >= 0 && !board[row - 1][col].clicked) {
		numClicks += updateClickedStatus(board, row - 1, col)
	}
	// diagonal up-right
	if ((row - 1) >= 0 && (col + 1) < n && !board[row-1][col+1].clicked) {
		numClicks += updateClickedStatus(board, row - 1, col + 1)
	}
	// straight right
	if ((col + 1) < n && !board[row][col + 1].clicked) {
		numClicks += updateClickedStatus(board, row,col + 1);
	}
	// diagonal down-right
	if ((row + 1) < n && (col + 1) < n && !board[row + 1][col + 1].clicked) {
		numClicks += updateClickedStatus(board, row + 1,col + 1);
	}
	// straight down
	if ((row + 1) < n && !board[row + 1][col].clicked) {
		numClicks += updateClickedStatus(board, row + 1,col)
	}
	// diagonal down-left
	if ((row + 1) < n && (col - 1) >= 0 && !board[row + 1][col - 1].clicked) {
		numClicks += updateClickedStatus(board, row + 1,col - 1)
	}
	// straight left
	if ((col - 1) >= 0 && !board[row][col - 1].clicked) {
		numClicks += updateClickedStatus(board, row, col - 1);
	}
	// diagonal up-left
	if ((row - 1) >= 0 && (col - 1) >= 0 && !board[row - 1][col - 1].clicked) {
		numClicks += updateClickedStatus(board, row - 1,col - 1)
	}

	return numClicks;
}

export const resetBoard = (board) => {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board.length; j++) {
			board[i][j].clicked = false;
			board[i][j].flagged = false;
		}
	}
}


