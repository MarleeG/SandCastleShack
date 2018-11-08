import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel,
    Alert
} from 'react-bootstrap'

import './guestMembers.css'

class GuestMembers extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.form = this.form.bind(this)

        this.state = {
            disableInputs: false,
            inputsNotCorrect: false,
            partyCount: '',
            kidsTotal: '',
            teensTotal: '',
            adultsTotal: '',
            seniorsTotal: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const {
            kidsTotal,
            teensTotal,
            adultsTotal,
            seniorsTotal } = this.state;

        const INPUT_VALUES = [
            parseInt(kidsTotal.trim()),
            parseInt(teensTotal.trim()),
            parseInt(adultsTotal.trim()),
            parseInt(seniorsTotal.trim())
        ];

        var number_counter = 0;
        var guest_totals_counted = 0;

        INPUT_VALUES.forEach((element, index) => {
            if (typeof element === 'number') {
                number_counter++;
                guest_totals_counted += element;

                if (number_counter === 4) {
                    if (guest_totals_counted === this.props.totalAccountedGuests) {
                        // if total number of guests are correct
                        const GUEST_DATA = {
                            kids: INPUT_VALUES[0],
                            teens: INPUT_VALUES[1],
                            adults: INPUT_VALUES[2],
                            seniors: INPUT_VALUES[3]
                        }
                        this.setState({
                            inputsNotCorrect: false,
                            disableInputs: true
                        }, () => this.props.attendingMembers(GUEST_DATA));
                    } else {
                        // if total number of guest don't add up
                        this.setState({
                            inputsNotCorrect: true
                        })
                    }
                } else if (number_counter !== 4 && index === 3) {
                    this.setState({
                        inputsNotCorrect: true
                    })
                }
            } else {
                this.setState({
                    inputsNotCorrect: true
                });
            }
        })
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    form() {
        return (
            <Form inline className='guestMembersForm'>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Kids</ControlLabel>{' '}
                    <FormControl onChange={this.handleInputChange} disabled={this.state.disableInputs} value={this.state.kidsTotal.trim()} name='kidsTotal' className='kidsField' type="text" placeholder="ages between 0-12" />
                </FormGroup>{' '}
                <FormGroup controlId="formInlineName" className='mt-2'>
                    <ControlLabel>Teens</ControlLabel>{' '}
                    <FormControl onChange={this.handleInputChange} disabled={this.state.disableInputs} value={this.state.teensTotal.trim()} name='teensTotal' type="text" className='teensField' placeholder="ages between 13-19" />
                </FormGroup>{' '}
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Adults</ControlLabel>{' '}
                    <FormControl onChange={this.handleInputChange} disabled={this.state.disableInputs} value={this.state.adultsTotal.trim()} name='adultsTotal' type="text" className='adultsField' placeholder="ages between 20-65" />
                </FormGroup>{' '}
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Seniors</ControlLabel>{' '}
                    <FormControl onChange={this.handleInputChange} disabled={this.state.disableInputs} value={this.state.seniorsTotal.trim()} name='seniorsTotal' type="text" className='seniorsField' placeholder="ages 66+" />
                </FormGroup>{' '}
                <Button type="submit" bsStyle='primary' disabled={this.state.disableInputs} onClick={this.handleSubmit} className='mt-2'>Submit</Button>
            </Form>
        )
    }

    alertUser() {
        return (
            <Alert bsStyle="warning" className='alert-party'>
                <strong>Holy smokes!</strong> Values must be numbers and add up to <code>{this.props.totalAccountedGuests}</code>.
            </Alert>
        )
    }
    
    render() {
        return (
            <div>
                {this.props.appear ?
                    <div>
                        <h4 className='questionTwo'>
                            Whose on your guest list?
                        </h4>
                        <div className='contentsTwo'>
                            {this.form()}
                        </div>
                        {this.state.inputsNotCorrect ?
                            this.alertUser() :
                            null
                        }
                        <br/>
                        {!this.state.disableInputs ? <Alert bsStyle="info" className='alertInfo'>
                            <strong>Enter the total of each of these guests attending.</strong>
                            <p>If there aren't any kids enter <code>{0}</code></p>
                        </Alert> : null}
                        
                    </div> : null}
            </div>
        )
    }
}

export default GuestMembers;