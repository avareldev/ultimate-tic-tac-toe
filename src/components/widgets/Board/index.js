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
        let hasWinner = false;
        if (board[yPos][xPos] === '' && !this.state.hasWinner) {
            board[yPos][xPos] = this.state.currentPlayer;
            hasWinner = this.matchChecker.checkForWinner();
            this.setState({
                hasWinner: hasWinner,
                board: board,
                currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
            });
        }

        this.props.updatePlayer(this.state.currentPlayer === 'X' ? 'O' : 'X');

        if (hasWinner) {
            this.props.setWinner(this.state.currentPlayer);
        }
    }

    render() {
        return (
            <div className="board">
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