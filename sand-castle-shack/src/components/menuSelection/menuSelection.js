import React, { Component } from 'react';
import { FormGroup, Button, Checkbox, Table, ControlLabel, FormControl } from 'react-bootstrap';

import './menuSelection.css'

class MenuSelection extends Component {
    constructor(props) {
        super(props);
        this.menu = this.menu.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.menuOptions = this.menuOptions.bind(this);
        this.menuItemsSelected = this.menuItemsSelected.bind(this)
        this.kidsOrdering = this.kidsOrdering.bind(this);

        this.state = {
            menu: [
                { type: 'Soup', price: 2.5, checked: false },
                { type: 'Wing(s)', price: .15, checked: false },
                { type: 'Burger', price: 4.95, checked: false },
                { type: 'Chicken Sandwhich', price: 5.95, checked: false },
                { type: 'Fries', price: 1.99, checked: false },
                { type: 'Pie', price: 2.95, checked: false },
                { type: 'Ice Cream', price: 2.99, checked: false },
                { type: 'Soft Drink', price: 1.5, checked: false },
                { type: 'Coffee', price: 1, checked: false }
            ],
            position: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth'],
            message: '',
            members: '',
            orders: 0

        }
    }


    componentWillReceiveProps(props) {
        if (props.attendingMembers !== undefined) {
            this.setState({
                members: props.attendingMembers
            }, () => this.kidsOrdering())
        }
    }

    handleSubmit() {
        console.log('ORDERING');
    }

    table() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Menu Item</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td colSpan="2">Larry the Bird</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td colSpan="2">Larry the Bird</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td colSpan="2">Larry the Bird</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td colSpan="2">Larry the Bird</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td colSpan="2">Larry the Bird</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td colSpan="2">Larry the Bird</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    handleToggle() {
        this.setState({ checkboxChecked: !this.state.checkboxChecked });
    }

    handleChange(event) {
        console.log('event: ', event.target)
    }

    kidsOrdering() {
        console.log('-------------------------------------------');

        const { kids, teens, adults, seniors } = this.state.members;
        console.log(`kids: ${kids}`)

        var total_kids_ordered = 0;
        if (kids > 0) {
            // change pricing
            var original_pricing = [];
            var all_menu_items = [];

            this.state.menu.forEach((x) => {
                original_pricing.push(x.price);
                all_menu_items.push(x);
            });

            all_menu_items.forEach((x) => {
                x.price = 0;
            })

            this.setState({
                menu: all_menu_items
            });
            // --------------------------------------------------

            // for (let i = 0; i <= kids; i++) {
            //     console.log(i)

            // }

            // DO NOT UNCOMMENT DO-WHILE LOOP 
            // do {
            //     // 
            //     var position = this.state.position[total_kids_ordered]
            //     this.setState({
            //         message: `What will the ${position} kid order?`
            //     }, () => {
            //         total_kids_ordered++;
            //     })

            // } while (total_kids_ordered < kids);
        }



        console.log('-------------------------------------------');
    }

    menuItemsSelected(menuItem, index) {
        console.log('-------------------------------------------');
        var all_menu_items = [];
        this.state.menu.forEach(x => all_menu_items.push(x));
        all_menu_items[index].checked = !this.state.menu[index].checked;

        this.setState({
            menu: all_menu_items
        }, () => console.log(this.state.menu))

        console.log('-------------------------------------------');
    }

    menuOptions() {
        return (
            this.state.menu.map((menuItem, index) => {
                return (
                    <option key={index} onClick={() => this.menuItemsSelected(menuItem, index)} value={menuItem.type}>{menuItem.type}..........${menuItem.price}</option>
                )
            })
        )
    }
    menu() {
        return (
            <div className='menuOptions'>
                <FormGroup controlId="formControlsSelectMultiple">
                    <ControlLabel>Select from the menu below</ControlLabel>
                    <ControlLabel>Hold <code>CMD</code> down to select multiple</ControlLabel>

                    <FormControl componentClass="select" multiple>
                        <option value="select">Select which menu item(s) you would like?</option>
                        {this.menuOptions()}
                    </FormControl>
                    <br />
                    <Button type="submit" bsStyle='primary' onClick={this.handleSubmit}>ORDER</Button>
                </FormGroup>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.appear ?
                    <div>
                        <h4 className='questionThree'>
                            What's on the Castle Shack menu?
                        </h4>

                        <div className='contentsThree'>
                            {this.menu()}
                        </div>

                        <div>
                            <h4>
                                {this.state.message}
                            </h4>
                        </div>

                    </div> : null}
            </div>
        )
    }
}

export default MenuSelection;