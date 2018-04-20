import React from 'react';
import {Helmet} from "react-helmet";

import './Rules.scss';

export default class Rules extends React.Component{
    render(){
        return(
            <div className="page">
                <Helmet>
                    <title>Rules</title>
                </Helmet>
                <h1>Rules</h1>
                <h1>Game Basics</h1>
                <p>
                    You probably know the original Tic Tac Toe game.<br />
                    If not: it's a simple game where one player is the X and the other player is the O, playing on a field of 3x3 squares.<br />
                    The players take turns picking one of the squares that is not occupied.<br />
                    When one of the players gets three squares in a row, horizontal, vertical, or diagonal, that player wins.
                </p>
                <p>
                    Ultimate Tic Tac Toe is quite similar.<br />
                    Each square in the field is actually a small game of Tic Tac Toe.<br />
                    Winning a small game, earns you the square for the big game.<br />
                    The goal again is to get three (big) squares in a row.<br />
                    Further rules will be explained below.<br />
                    This game requires quite a bit of strategy because you can influence which of the big squares your opponent has to play in.
                </p>
            </div>
        );
    }
}