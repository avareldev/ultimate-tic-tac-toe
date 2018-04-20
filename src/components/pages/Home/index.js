import React from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {homeSetInitialData} from '../../../actions/home';

import './Home.scss';

@connect(({home:{data}})=>({
    data: data
}),{
    homeSetInitialData
})
export default class Home extends React.Component{
    componentDidMount(){
        if(!this.props.data){
            this.props.homeSetInitialData();
        }
    }
    render(){
        return(
            <div className="page">
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <h1>Welcome</h1>
                <p><Link to="/tic-tac-toe" className={this.props.path === "/game" ? "active" : ""}>Tic Tac Toe</Link></p>
                <p><Link to="/ultimate-tic-tac-toe" className={this.props.path === "/game" ? "active" : ""}>Ultimate Tic Tac Toe</Link></p>
            </div>
        );
    }
}