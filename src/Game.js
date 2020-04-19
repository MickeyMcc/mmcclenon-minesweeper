import * as React from 'react';
import './App.css';

import Board from './Board.js';

class App extends React.Component {
  state={
    gameStarted: false,
    gameEnded: false,
    gameWasWon: false,
    gameParameters: [4, 4],
    difficulty: 0,
  }

  difficulties = [
    { name: 'Easy', value: 0 },
    { name: 'Medium', value: 1 },
    { name: 'Hard', value: 2 },
    { name: 'Extreme!!!', value: 3 },
  ]

  boardSize = {
    0: 6, // 16
    1: 10, // 36
    2: 14, // 64
    3: 15, // 225
  }

  mines = {
    0: 6, // 4/16 - .25
    1: 24, // 10/36 - .33
    2: 40, // 25/64 - 0.39
    3: 60, // 90/225 
  }

  resetGame = () => {
    this.setState({
      gameEnded: false,
      gameWasWon: false,
      gameStarted: false,
      boardShouldReset: false,
    })
  }

  Header = () => {
    const { TryAgainButton, NewBoardButton } = this;
    if (!this.state.gameStarted) {
      return (<div>
        <h4>Start</h4>
        <select value={this.state.difficulty} onChange={(e) => this.setState({ difficulty: e.target.value })}>
          {this.difficulties.map(diff => <option value={diff.value}>{diff.name}</option>)}
        </select>
        <button onClick={() => this.setState({ gameStarted: true })}>Start Game?</button>
      </div>)
    }
    if (!this.state.gameEnded) {
      return (
        <div>
          <h4>Have Fun!</h4>
          <NewBoardButton text="Different Board?" />
          <TryAgainButton text="Start Over" />
        </div>
      );
    }
    if (!this.state.gameWasWon) {
      return (
        <div>
          <h4>BOOM! Better luck next time!</h4>
          <NewBoardButton text="Try Again?" />
          <TryAgainButton text="Replay board" />
        </div>
      );
    }
    if (this.state.gameWasWon) {
      return (
        <div>
          <h4>You Won!</h4>
          <NewBoardButton text="Play Again?" />
          <TryAgainButton text="Replay board" />
        </div>)
    }
  }

  NewBoardButton = ({text}) => <button onClick = {() => this.resetGame()}>{text}</button >
  TryAgainButton = ({text}) => <button onClick={() => this.setState({ boardShouldReset: true })}>{text}</button>

  render() {
    const { Header } = this;
    return (
      <div className="Minesweeper">
        <h2>{this.props.title}</h2>
        <Header />
        {this.state.gameStarted && <Board 
          boardSize={this.boardSize[this.state.difficulty]}
          numMines={this.mines[this.state.difficulty]}
          gameWon={(gameWasWon) => this.setState({ gameWasWon, gameEnded: true })}
          boardShouldReset={this.state.boardShouldReset}
          boardCleared={() => this.setState({ boardShouldReset: false, gameEnded: false, gameWasWon: false })}
        />}
      </div>
    );
  }
}

export default App;
