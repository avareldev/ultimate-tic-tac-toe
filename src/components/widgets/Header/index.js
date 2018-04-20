import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../../../resources/images/logo.png';

import './Header.scss';

@connect(({router:{location}})=>({
    path: location && location.pathname || "/"
}),{})
export default class Header extends React.Component {
    render(){
        return (
            <header className="header">
                <div className="logo">
                    <img src={logo} />
                </div>
                <ul className="menu">
                    <li><Link to="/" className={this.props.path === "/" ? "active" : ""}>Home</Link></li>
                    <li><Link to="/tic-tac-toe" className={this.props.path === "/tic-tac-toe" ? "active" : ""}>Tic Tac Toe</Link></li>
                    <li><Link to="/ultimate-tic-tac-toe" className={this.props.path === "/ultimate-tic-tac-toe" ? "active" : ""}>Ultimate Tic Tac Toe</Link></li>
                    <li><Link to="/rules" className={this.props.path === "/rules" ? "active" : ""}>Rules</Link></li>
                    <li><Link to="/about" className={this.props.path === "/about" ? "active" : ""}>About</Link></li>
                </ul>
            </header>
        );
    }
}