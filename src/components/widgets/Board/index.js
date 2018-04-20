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
        if (this.props.isUltimate && !this.props.active) {
            return;
        }
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
            this.setState({
                winner: this.getCurrentPlayer()
            });
            if (this.props.isUltimate) {
                console.log('the tile has as winner', yPos, xPos);
                this.props.setWinner(this.getCurrentPlayer(), this.props.yPos, this.props.xPos);
            } else {
                this.props.setWinner(this.getCurrentPlayer());
            }
        }

        if (this.props.isUltimate) {
            this.props.setActiveBoard(yPos, xPos);
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
        let className = 'board';
        if (this.props.active) {
            className += ' active player-' + this.getCurrentPlayer().toLowerCase();
        }
        if (this.state.winner) {
            className += ' winner-'+ this.state.winner.toLowerCase();
        }

        return (
            <div className={className}>
                {
                    this.state.board.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex}>
                                {row.map((field, index) => {
                                    return (<Field key={'field' + rowIndex + index} yPos={rowIndex} xPos={index} content={field} setField={this.setField} />)
                                })}
                            </div>)
                    })
                }
            </div>
        )
    }
}