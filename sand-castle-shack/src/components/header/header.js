import React, { Component } from 'react';
import { Jumbotron} from 'react-bootstrap';
import './header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <Jumbotron className='header'>
                    <h1 className='text-center header-title'>Sand Castle Shack</h1>
                    <p className='text-center header-subtitle'>
                        Tropical Desires
                    </p>
                </Jumbotron>
            </div>
        )
    }
}

export default Header;