import * as React from 'react';
import { createBoard, updateClickedStatus, resetBoard } from './helpers.js';
import Cell from './Cell.js';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: createBoard(props.boardSize, props.numMines),
      endstate: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.boardShouldReset && this.props.boardShouldReset) {
      resetBoard(this.state.board);
      this.setState({ board: this.state.board, endstate: false });
      this.props.boardCleared();
    }
  }

  numClicked = 0;

  checkWin() {
    return (this.numClicked + this.props.numMines === this.props.boardSize**2)
  }

  performClick(row, col) {
    const { board } = this.state;

    if (board[row][col].isMine) {
      this.setState({ endstate: true });
      this.props.gameWon(false);
      return;
    }
    
    const additionalClicks = updateClickedStatus(board, row, col);

    this.numClicked += additionalClicks;
    this.setState({ board })

    if (this.checkWin()) {
      this.setState({ endstate: true });
      this.props.gameWon(true);
    }
  }

  flagCellToggle(row, col) {
    const { board } = this.state;
    board[row][col].flagged = !board[row][col].flagged;
    this.setState({ board })
  }

  render() {
    const { board } = this.state;
    if (!this.state.board) {
        return null;
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', alignItems: 'center'}}>
        {board.map((row, rowI) => (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            {row.map((cell, colI) => <Cell
              endstate={this.state.endstate}
              cheating={this.state.cheating}
              metadata={cell}
              onClick={() => this.performClick(rowI, colI)}
              onRightClick={(e) => { e.preventDefault(); this.flagCellToggle(rowI, colI) }}
            />)}
          </div>
        ))}

        <button 
          style={{ width: 150, backgroundColor: 'red', marginTop: '20px', }}
          onClick={() => {
            this.setState({ cheating: true})
            setTimeout(() => this.setState({ cheating: false}), 500)
          }}
        >Cheat?</button>
      </div>
    );
  }
}

export default Board;
