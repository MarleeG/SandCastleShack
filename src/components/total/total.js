import React, { Component } from 'react';
import './total.css';

class Total extends Component {
    render() {
        return (
            <div>
                {this.props.appear ? 
                <div className='guestCountBody'>
                    <h4 className='total-title'>Total </h4>
                    <div>
                        <p className='total'>
                            ${this.props.total.toFixed(2)}
                        </p>
                    </div>
                </div> : null

                }
            </div>
        )
    }
}

export default Total;