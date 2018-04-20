import React from 'react';
import {Helmet} from "react-helmet";
import UltimateBoard from "../../widgets/UltimateBoard";
import {Link} from 'react-router-dom';

import './UltimateTicTacToe.scss';

export default class UltimateTicTacToe extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            currentPlayer: 'X'
        }
    }

    updatePlayer = (player) => {
        this.setState({
            currentPlayer: player
        })
    }

    setWinner = (winner) => {
        this.setState({
            winner: winner
        })
    }

    restart = () => {
        this.child.restart();
    };

    render() {
        return (
            <div className="page">
                <Helmet>
                    <title>Ultimate Tic Tac Toe</title>
                </Helmet>
                <h1>Ultimate Tic Tac Toe</h1>
                { !this.state.winner ? (
                    <h2 className={'current-player-' +this.state.currentPlayer.toLowerCase()}>Current Player: {this.state.currentPlayer} </h2>
                ) : (
                    <h2>Winner: {this.state.winner} </h2>
                )}
                <UltimateBoard ref={instance => { this.child = instance; }} updatePlayer={this.updatePlayer} setWinner={this.setWinner} />


                <p><a href="#" onClick={() => { this.child.restart(); }}>Restart</a></p>
            </div>
        )
    }
}