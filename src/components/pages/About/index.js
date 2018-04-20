import React from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';

import './About.scss';

export default class Home extends React.Component{
    render(){
        return(
            <div className="page">
                <Helmet>
                    <title>About</title>
                </Helmet>
                <h1>About</h1>
            </div>
        );
    }
}