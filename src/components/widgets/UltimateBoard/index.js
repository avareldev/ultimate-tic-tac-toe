import React from 'react';
import Board from "../Board";
import MatchChecker from "../../../helpers/MatchChecker";

import './UltimateBoard.scss';

export default class UltimateBoard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            hasWinner: false,
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            currentPlayer: 'X',
            lastMove: null
        };

        this.children = [];
        this.matchChecker = new MatchChecker(this.state.board);
    }

    restart = () => {
        this.setState({
            hasWinner: false,
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            currentPlayer: 'X',
            lastMove: null
        });

        this.children.forEach((child) => {child.restart()});
    }

    setWinner = (winner, yPos, xPos) => {
        let board = [...this.state.board];
        let hasWinner = false;
        if (board[yPos][xPos] === '' && !this.state.hasWinner) {
            board[yPos][xPos] = winner;
            console.log(board);
            hasWinner = this.matchChecker.checkForWinner();
            this.setState({
                hasWinner: this.matchChecker.checkForWinner(),
                board: board
            })
        }

        if (hasWinner) {
            this.props.setWinner(this.state.currentPlayer);
        }
    }

    setActiveBoard = (yPos, xPos) => {
        this.setState({
            lastMove: {
                yPos: yPos,
                xPos: xPos
            }
        });
    }

    isActive = (yPos, xPos) => {
        if (this.state.hasWinner) {
            return false;
        }
        if (!this.state.lastMove) {
            return true;
        }
        if (this.state.board[yPos][xPos] !== '') {
            return false;
        }
        if (this.state.board[this.state.lastMove.yPos][this.state.lastMove.xPos] !== '') {
            return true;
        }
        if (this.state.lastMove.yPos === yPos && this.state.lastMove.xPos === xPos) {
            return true;
        }
        return false;
    }

    updatePlayer = () => {
        let currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
        this.props.updatePlayer(currentPlayer);
        this.setState({
            currentPlayer: currentPlayer
        });
    }

    render(){
        return(
            <div className="board-row">
                {
                    this.state.board.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex}>
                                {row.map((field, index) => {
                                    return (<Board ref={instance => { this.children.push(instance); }} key={'board' + rowIndex + index} active={this.isActive(rowIndex, index)} currentPlayer={this.state.currentPlayer} isUltimate={true} yPos={rowIndex} xPos={index} setActiveBoard={this.setActiveBoard} updatePlayer={this.updatePlayer} setWinner={this.setWinner} />)
                                })}
                            </div>)
                    })
                }
            </div>
        );
    }
}