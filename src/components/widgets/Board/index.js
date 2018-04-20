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
            board[yPos][xPos] = this.getCurrentPlayer();
            hasWinner = this.matchChecker.checkForWinner();
            this.setState({
                hasWinner: hasWinner,
                board: board,
                currentPlayer: this.getCurrentPlayer() === 'X' ? 'O' : 'X'
            });
        }

        if (hasWinner) {
            if (this.props.isUltimate) {
                this.props.setWinner(this.getCurrentPlayer(), this.props.xPos, this.props.yPos);
            } else {
                this.props.setWinner(this.getCurrentPlayer());
            }
        }

        this.props.updatePlayer(this.getCurrentPlayer() === 'X' ? 'O' : 'X');
    }

    getCurrentPlayer = () => {
        if (this.props.isUltimate) {
            return this.props.currentPlayer;
        }
        return this.state.currentPlayer;
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