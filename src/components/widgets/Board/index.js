import React from 'react';
import MatchChecker from '../../../helpers/MatchChecker';
import Field from '../Field';

import './Board.scss';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasWinner: false,
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            currentPlayer: 'X'
        }

        this.matchChecker = new MatchChecker(this.state.board);
    }

    setField = (yPos, xPos) => {
        let board = [...this.state.board];
        if (board[yPos][xPos] === '' && !this.state.hasWinner) {
            board[yPos][xPos] = this.state.currentPlayer;
            let hasWinner = this.matchChecker.checkForWinner();
            this.setState({
                hasWinner: hasWinner,
                board: board,
                currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
            });
        }
    }

    startNewGame = () => {
        this.setState({
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            currentPlayer: 'X',
            hasWinner: false
        }, () => {
            this.matchChecker = new MatchChecker(this.state.board);
        });
    }

    render() {
        return (
            <div className="board">
                { !this.state.hasWinner ? (
                    <h2>Current Player: {this.state.currentPlayer} </h2>
                ) : (
                    <h2>Winner: {this.state.hasWinner ? (this.state.currentPlayer  === 'X' ? 'O' : 'X') : ''} </h2>
                )}
                {
                    this.state.board.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex}>
                                {row.map((field, index) => {
                                    return (<Field key={index} yPos={rowIndex} xPos={index} content={field} setField={this.setField} />)
                                })}
                            </div>)
                    })
                }
            </div>
        )
    }
}