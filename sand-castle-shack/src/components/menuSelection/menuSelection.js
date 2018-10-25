import React, { Component } from 'react';
import { FormGroup, Button, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';

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
        this.teensOrdering = this.teensOrdering.bind(this);
        this.defaultSetting = this.defaultSetting.bind(this);

        this.state = {
            currentQuestion: 1,
            maximumOrders: 0,
            members: '',
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
            message: '',
            orderPrices: [],
            orders: 0,
            originalPricing: [],
            position: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth'],
            totalOrdersMade: 0,
        }
    }


    componentWillReceiveProps(props) {
        if (props.attendingMembers !== undefined) {
            var orginal_pricing = []
            this.state.menu.forEach(element => {
                orginal_pricing.push(element.price);
            })

            this.setState({
                members: props.attendingMembers,
                orginalPricing: orginal_pricing,
                maximumOrders: props.attendingMembers.kids + props.attendingMembers.teens + props.attendingMembers.adults + props.attendingMembers.seniors
            }, () => {
                // this.kidsOrdering();
                console.log('State: ', this.state);
                console.log('props: ', props);
            })
        }
    }

    handleSubmit() {
        console.log('-------------------------------------------');
        console.log('ORDERING');
        var subtotal = 0;
        // checking what user checked
        this.state.menu.forEach((element, index) => {
            if (element.checked) {
                subtotal += element.price
            }
        })

        this.setState({
            orderPrices: [...this.state.orderPrices, subtotal],
            currentQuestion: 2
        }, () => {
            this.defaultSetting();
            console.log('order prices: ', this.state.orderPrices);
            this.kidsOrdering()
        })

        console.log('-------------------------------------------');
    }

    defaultSetting() {
        var meniItems = [];
        this.state.menu.forEach(element => {
            meniItems.push(element)
        });

        meniItems.forEach((element, index) => {
            element.price = this.state.originalPricing[index]
            if (element.checked) {
                element.checked = false
            }
        });

        this.setState({
            menu: meniItems
        });
    }

    handleToggle() {
        this.setState({ checkboxChecked: !this.state.checkboxChecked });
    }

    handleChange(event) {
        console.log('event: ', event.target)
    }

    teensOrdering() {
        console.log('-------------------------------------------');
        console.log(`Teens Ordering`)
        console.log('-------------------------------------------');
    }

    kidsOrdering() {
        console.log('-------------------------------------------');

        const { kids, teens, adults, seniors } = this.state.members;

        var total_kids_ordered = 0;
        var bool = this.state.currentQuestion <= kids;
        console.log('bool: ', bool);
        console.log(`current question: ${this.state.currentQuestion} and kids: ${kids}`)
        if (kids > 0 && this.state.currentQuestion <= kids) {
            // change pricing
            // var original_pricing = [];
            var all_menu_items = [];

            this.state.menu.forEach((x) => {
                // original_pricing.push(x.price);
                all_menu_items.push(x);
            });

            all_menu_items.forEach(x =>  x.price = 0)

            this.setState({
                menu: all_menu_items,
                // originalPricing: original_pricing
            });
            // --------------------------------------------------

            const position = this.state.position[this.state.currentQuestion - 1];
            this.setState({
                message: `What will the ${position} kid order?`
            }, () => this.handleSubmit());

            // for (let i = 0; i <= kids; i++) {
            //     console.log(i)

            // }

        } else {
            this.teensOrdering();
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
        }, () => console.log('menu: ', this.state.menu))
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
                    <Button type="submit" bsStyle='primary' onClick={this.kidsOrdering}>ORDER</Button>
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