import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Alert } from 'react-bootstrap'

import './guestCount.css'

class GuestCount extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.informPartyAlert = this.informPartyAlert.bind(this);

        this.state = {
            partyCount: '',
            alertVisible: false,
            partyCountEntered: false,
            alertVisibility: STYLES.ALERT
        }
    }

    componentDidMount() {
    }

    handleSubmit() {
        const { partyCount } = this.state
        const ROUNDED_PARTY_COUNT = Math.floor(partyCount)

        if (ROUNDED_PARTY_COUNT <= 10 && ROUNDED_PARTY_COUNT > 0 && typeof ROUNDED_PARTY_COUNT === 'number') {
            this.setState({
                partyCountEntered: true
            }, () => {
                this.props.totalGuests(ROUNDED_PARTY_COUNT);
            });
        } else {
            this.setState({
                alertVisible: true
            });
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    informPartyAlert() {
        return (
            <Alert bsStyle="warning" className='alert-party'>
                <strong>Holy guacamole!</strong> Enter a guest total between 1-10.
            </Alert>
        )
    }

    render() {
        return (
            <div className='guestCountBody'>
                <h4 className='questionOne'>
                    How many guest(s) do you have?
                </h4>
                <div className='contentsOne'>
                    <Form inline className='form'>
                        <FormGroup controlId="formInlineName">
                            <FormControl disabled={this.state.partyCountEntered} type="text" onChange={this.handleInputChange} value={this.state.partyCount} name='partyCount' placeholder="Ex: 5" />
                        </FormGroup>{' '}
                    </Form>
                    <div className='submit-form-button'>
                        <Button onClick={this.handleSubmit} disabled={this.state.partyCountEntered} type="submit" bsStyle='primary'>Submit</Button>
                    </div>
                </div>
                {this.state.alertVisible ? this.informPartyAlert() : null}
            </div>
        )
    }
}

const STYLES = {
    ALERT: {
        visibility: 'hidden'
    }
}

export default GuestCount;