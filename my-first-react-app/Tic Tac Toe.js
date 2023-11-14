// the code is taken from official React and they are sole owner of it, I just added the comments and uploaded it for reference purposes only.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

//calls onClick and displays X O
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
      //2 deleted the constructor
      //8 delete the handleClick(i)
   
  //3 replace this.state.squares[i] --> this.props.squares[i]
  //4 replace this.handleClick(i) --> this.props.onClick(i)
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    render() {
      return (
        <div>
          <div className="status">{/*status*/}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    //1
    //constructor with 3 states history, stepNumber, XIsNext
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
        };
      }
      //6 added the handleClick method
      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1];//history[0], history[1]....
        const squares = current.squares.slice();//history.squares
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }
      
      jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

    render() {
        //5 updated the render 
        const history = this.state.history;
        const current = history[this.state.stepNumber]; // history[0]
        const winner = calculateWinner(current.squares); //history.squares

        //7  mapping history
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        let status;
        if (winner) {
        status = 'Winner: ' + winner;
        } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
       squares={current.squares}
       onClick={(i) => this.handleClick(i)}
     />
   </div>
   <div className="game-info">
     <div>{status}</div>
     <ol>{moves}</ol>
   </div>
 </div>
);
}
}

  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  /*
history.length		stepNumber		squares[]		xIsNext
						
    1		0		null		    TRUE
    2		1		null, X,O		FALSE
    3		2		null, X,O		TRUE
    4		3		null, X,O		FALSE
    5		4		null, X,O		TRUE
    6		5		null, X,O		FALSE
    7		6		null, X,O		TRUE
    8		7		null, X,O		FALSE
    9		8		null, X,O		TRUE

  
  */
